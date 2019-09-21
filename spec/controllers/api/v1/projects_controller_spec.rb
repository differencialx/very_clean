RSpec.describe Api::V1::ProjectsController, type: :controller do
  let(:name) { FFaker::Lorem.word }

  describe 'POST #create' do
    subject(:make_request) { post :create, params: params }
    let(:params) { { name: name } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'

      it 'creates new project' do
        make_request
        expect_status(201)
        expect_json('data.id', Project.last.id.to_s)
        expect_json('data.attributes.name', name)
        expect_json('data.type', 'projects')
      end
    end
  end

  describe 'PUT #update' do
    subject(:make_request) { put :update, params: params }
    let(:user) { create(:user) }
    let(:project) { create(:project, user: user) }
    let(:project_id) { project.id }
    let(:params) { { name: name, id: project_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'

      it 'updates project' do
        make_request
        expect_status(200)
        expect_json('data.id', project.id.to_s)
        expect_json('data.attributes.name', name)
        expect_json('data.type', 'projects')
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
    let(:project) { create(:project) }
    let(:project_id) { project.id }
    let(:params) { { id: project_id } }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'
      let(:project) { create(:project, user: user) }

      it 'deletes project' do
        project
        expect { make_request }.to change(Project, :count).from(1).to(0)
        expect_status(204)
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
    subject(:make_request) { get :index }
    let(:projects) { create_list(:project, 3, user: user) }
    let(:projects_other) { create_list(:project, 3) }

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'Authorization')
      expect_json('errors.0.detail', 'Not authorized')
    end

    describe 'Authorized' do
      include_context 'Authorized user'

      it 'returns projects' do
        projects
        projects_other
        make_request
        expect_status(200)
        expect_json_sizes('data', 3)
        projects.each_with_index do |project, idx|
          expect_json("data.#{idx}.id", project.id.to_s)
          expect_json("data.#{idx}.type", 'projects')
          expect_json("data.#{idx}.attributes.name", project.name)
        end
      end
    end
  end
end
