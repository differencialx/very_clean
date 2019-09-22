RSpec.describe Api::V1::TasksController, type: :controller do
  let(:name) { FFaker::Lorem.word }

  describe 'POST #create' do
    subject(:make_request) { post :create, params: params }
    let(:project_id) { '1' }
    let(:params) { { name: name, project_id: project_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }
      let(:project_id) { project.id }

      it 'creates new task' do
        make_request
        expect_status(200)
        expect_json('data.id', Task.last.id.to_s)
        expect_json('data.attributes.name', name)
        expect_json('data.attributes.deadline_at', nil)
        expect_json('data.attributes.completed', nil)
        expect_json('data.attributes.position', 1)
        expect_json('data.type', 'tasks')
      end

      context 'Access denied' do
        let(:project) { create(:project) }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end

  describe 'PUT #update' do
    subject(:make_request) { put :update, params: params }
    let(:deadline_at) { Time.current.change(usec: 0) }
    let(:completed) { '1' }
    let(:task_id) { '1' }
    let(:params) do
      {
        id: task_id,
        name: name,
        deadline_at: deadline_at,
        completed: completed
      }
    end

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'

      let(:project) { create(:project, user: user) }
      let(:task) { create(:task, project: project) }
      let(:task_id) { task.id }

      it 'updates task' do
        make_request
        expect_status(200)
        expect_json('data.id', task.id.to_s)
        expect_json('data.type', 'tasks')
        expect_json('data.attributes.name', name)
        expect_json('data.attributes.deadline_at', deadline_at.as_json)
        expect_json('data.attributes.completed', true)
        expect_json('data.attributes.position', 1)
      end

      context 'Not found' do
        let(:task_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:task) { create(:task) }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    subject(:make_request) { delete :destroy, params: params }
    let(:task_id) { '1' }
    let(:params) { { id: task_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }
      let(:task) { create(:task, project: project) }
      let(:task_id) { task.id }

      it 'deletes task' do
        task
        expect { make_request }.to change(Task, :count).from(1).to(0)
        expect_status(204)
      end

      context 'Not found' do
        let(:task_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:task) { create(:task) }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end

  describe 'GET #index' do
    subject(:make_request) { get :index, params: params }
    let(:project_id) { '1' }
    let(:params) { { project_id: project_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }
      let(:tasks) { create_list(:task, 3, project: project) }
      let(:other_tasks) { create_list(:task, 3) }
      let(:project_id) { project.id }

      it 'returns tasks' do
        tasks
        other_tasks
        make_request
        expect_status(200)
        expect_json_sizes('data', 3)
        tasks.each_with_index do |task, idx|
          expect_json("data.#{idx}.id", task.id.to_s)
          expect_json("data.#{idx}.type", 'tasks')
          expect_json("data.#{idx}.attributes.name", task.name)
          expect_json("data.#{idx}.attributes.deadline_at", task.deadline_at.as_json)
          expect_json("data.#{idx}.attributes.completed", task.completed)
          expect_json("data.#{idx}.attributes.position", task.position)
        end
      end

      context 'Not found' do
        let(:project_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:project) { create(:project) }
        let(:project_id) { project.id }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end

  describe 'PUT #move_higher' do
    subject(:make_request) { put :move_higher, params: params }
    let(:task_id) { '1' }
    let(:params) { { id: task_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }
      let(:position) { 2 }
      let(:task_1) { create(:task, project: project, position: position) }
      let(:task_2) { create(:task, project: project, position: position - 1) }
      let(:task_id) { task_1.id }
      let(:expected_position) { position - 1 }

      it 'moves task higher' do
        task_2
        make_request
        expect_status(200)
        expect_json('data.id', task_1.id.to_s)
        expect_json('data.type', 'tasks')
        expect_json('data.attributes.position', expected_position)
      end

      context 'Not found' do
        let(:task_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:task) { create(:task) }
        let(:task_id) { task.id }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end

  describe 'PUT #move_lower' do
    subject(:make_request) { put :move_lower, params: params }
    let(:task_id) { '1' }
    let(:params) { { id: task_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }
      let(:position) { 2 }
      let(:task_1) { create(:task, project: project, position: position + 1) }
      let(:task_2) { create(:task, project: project, position: position) }
      let(:task_id) { task_1.id }
      let(:expected_position) { position + 1 }

      it 'moves task lower' do
        task_2
        make_request
        expect_status(200)
        expect_json('data.id', task_1.id.to_s)
        expect_json('data.type', 'tasks')
        expect_json('data.attributes.position', expected_position)
      end

      context 'Not found' do
        let(:task_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:task) { create(:task) }
        let(:task_id) { task.id }

        it 'returns 403' do
          make_request
          expect_status(403)
          expect_json('errors.0.title', 'Forbidden')
          expect_json('errors.0.detail', 'Access Denied')
        end
      end
    end
  end
end
