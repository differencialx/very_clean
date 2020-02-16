RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:text) { FFaker::Lorem.sentence }

  describe 'POST #create' do
    subject(:make_request) { post :create, params: params }
    let(:task_id) { '1' }
    let(:attachment) { '' }
    let(:params) do
      {
        text: text,
        task_id: task_id,
        attachment: attachment
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
      let(:attachment) { fixture_file_upload('attachment.jpg') }

      it 'creates new comment' do
        make_request
        expect_status(200)
        expect_json('data.id', Comment.last.id.to_s)
        expect_json('data.attributes.text', text)
        expect_json('data.type', 'comments')
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
    let(:comment_id) { '1' }
    let(:params) { { id: comment_id } }

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
      let(:comment) { create(:comment, task: task) }
      let(:comment_id) { comment.id }

      it 'deletes comment' do
        comment
        expect { make_request }.to change(Comment, :count).from(1).to(0)
        expect_status(204)
      end

      context 'Not found' do
        let(:comment_id) { 'wrong_id' }

        it 'returns 404' do
          make_request
          expect_status(404)
        end
      end

      context 'Access denied' do
        let(:comment) { create(:comment) }

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
