require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'POST#sign_in' do
    let(:email) { 'some@email.com' }
    let(:password) { 'password' }
    let(:user) { create(:user, email: email, password: password) }
    let(:params_email) { email }
    let(:params_password) { password }
    let(:params) do
      {
        email: params_email,
        password: params_password
      }
    end

    before do
      user
    end

    context 'email does not exist' do
      let(:params_email) { '33paski@lol4to.com' }

      it do
        post :sign_in, params: params
        expect_status('422')
        expect_json('errors.0.title', 'User')
        expect_json('errors.0.detail', 'email or password are invalid')
      end
    end

    context 'invalid password' do
      let(:params_password) { '12345678' }

      it do
        post :sign_in, params: params
        expect_status('422')
        expect_json('errors.0.title', 'User')
        expect_json('errors.0.detail', 'email or password are invalid')
      end
    end

    context 'valid credentials' do
      it do
        post :sign_in, params: params
        expect_status('200')
        expect(response.headers['Authorization']).to be_present
      end
    end
  end
end
