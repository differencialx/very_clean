RSpec.describe Api::V1::ProjectsController, type: :controller do
  describe 'POST #create' do
    subject(:make_request) { post :create, params: params }
    let(:name) { FFaker::Lorem.word }
    let(:params) { { name: name } }
    let(:headers) { {} }

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
end
