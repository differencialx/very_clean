require 'rails_helper'

RSpec.describe Api::V1::Users::Operation::SignUp do
  subject { described_class.(params: params) }

  let(:params) do
    {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
  end
  let(:email) { FFaker::Internet.email }
  let(:password) { 'password' }
  let(:password_confirmation) { 'password' }

  describe 'failure' do
    context 'email' do
      context 'invalid format' do
        let(:email) { 'invalid_email' }
        let(:expected_errors) { { email: ['is in invalid format'] } }

        it do
          check_operation_failure
        end
      end

      context 'empty' do
        let(:email) { '' }
        let(:expected_errors) { { email: ['must be filled'] } }

        it do
          check_operation_failure
        end
      end
    end

    context 'password' do
      context 'empty' do
        let(:password) { '' }
        let(:expected_errors) { { password: ['must be filled'] } }

        it do
          check_operation_failure
        end
      end
    end

    context do
      context 'empty' do
        let(:password) { '' }
        let(:expected_errors) { { password: ['must be filled'] } }

        it do
          check_operation_failure
        end
      end
    end

    context 'user with such email already exists' do
      let(:user) { create(:user, email: email) }
      let(:expected_errors) { { email: ['user with such email already exists'] } }

      it do
        user
        check_operation_failure
      end
    end
  end

  describe 'success' do
    it 'returns json_web_token' do
      expect { subject }. to change { User.count }.by(1)
      expect(subject).to be_success
      user = subject[:model]
      json_web_token = subject[:json_web_token]
      decoded_token = JWT.decode(json_web_token, Rails.application.credentials[:secret_key_base], true, algorithm: 'HS256').first
      expect(decoded_token['user_id']).to eq user.id
    end
  end
end
