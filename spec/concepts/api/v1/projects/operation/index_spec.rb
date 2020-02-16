RSpec.describe Api::V1::Projects::Operation::Index do
  subject(:operation) { described_class.call(params: params, current_user: user) }

  let(:user) { create(:user) }
  let(:projects) { create_list(:project, 3, user: user) }
  let(:other_projects) { create_list(:project, 3) }
  let(:params) { {} }

  describe 'success' do
    let(:model) { operation[:model] }

    it 'success' do
      expect(operation).to be_success
    end

    it 'returns projects project' do
      projects
      other_projects
      expect(model.count).to eq 3
      expect(model).to match user.projects
    end
  end
end
