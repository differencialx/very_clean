RSpec.describe Api::V1::Projects::Operation::Update do
  subject(:operation) { described_class.call(params: params, current_user: user) }

  let(:name) { FFaker::Lorem.word }
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:params) { { name: name, id: project.id } }

  describe 'failure' do
    context 'name' do
      context 'empty' do
        let(:name) { '' }
        let(:expected_errors) { { name: ['must be filled'] } }

        it do
          check_operation_failure
        end
      end
    end
  end

  describe 'success' do
    let(:model) { operation[:model] }

    it 'success' do
      expect(operation).to be_success
    end

    it 'updates project' do
      project
      expect { operation }.not_to change(Project, :count)
    end

    it 'sets proper fields' do
      expect(model.name).to eq name
    end
  end
end
