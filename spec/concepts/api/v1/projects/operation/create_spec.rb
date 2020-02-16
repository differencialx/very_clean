RSpec.describe Api::V1::Projects::Operation::Create do
  subject(:operation) { described_class.call(params: params, current_user: user) }

  let(:name) { FFaker::Lorem.word }
  let(:user) { create(:user) }
  let(:params) { { name: name } }

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

    it 'creates new project' do
      expect { operation }.to change(Project, :count).from(0).to(1)
    end

    it 'sets proper fields' do
      expect(model).to be_persisted
      expect(model.name).to eq name
      expect(model.user).to eq user
    end
  end
end
