RSpec.describe Api::V1::Projects::Operation::Delete do
  subject(:operation) { described_class.call(params: params, current_user: user) }

  let(:name) { FFaker::Lorem.word }
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:params) { { id: project.id } }

  describe 'success' do
    let(:model) { operation[:model] }

    it 'success' do
      expect(operation).to be_success
    end

    it 'destroys project' do
      project
      expect { operation }.to change(Project, :count).from(1).to(0)
    end
  end
end
