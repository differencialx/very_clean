require 'rails_helper'

RSpec.describe Api::V1::Users::Operation::SignIn do
  subject { described_class.(params: params) }

  let(:params) do
    {
      email: email,
      password: password
    }
  end
  let(:email) { FFaker::Internet.email }
  let(:password) { 'password' }

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

    context 'authentification' do
      let(:expected_errors) { { user: ['email or password are invalid'] } }

      context 'user does not exist' do
        let(:email) { 'some.another@email.com' }

        it do
          check_operation_failure
        end
      end

      context 'invalid password' do
        let(:user) { create(:user, email: email) }
        let(:password) { 'i_dont_give_a_fuck' }

        it do
          user
          check_operation_failure
        end
      end
    end
  end

  describe 'success' do
    let(:user) { create(:user, email: email, password: password) }

    it 'returns jwt session login object' do
      user
      expect(subject).to be_success
      jwt_session = subject[:jwt_session]
      decoded_token = JWT.decode(jwt_session[:access], Rails.application.credentials[:secret_key_base], true, algorithm: 'HS256').first
      expect(decoded_token['payload']['user_id']).to eq user.id
    end
  end
end
