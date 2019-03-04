require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:email) { 'some@email.com' }
  let(:password) { 'password' }
  let(:user) { create(:user, email: email, password: password) }
  let(:params_email) { email }
  let(:params_password) { password }

  describe 'POST#sign_in' do
    let(:params) do
      {
        email: params_email,
        password: params_password
      }
    end
    let(:request) { post :sign_in, params: params }

    before do
      user
      request
    end

    context 'email does not exist' do
      let(:params_email) { '33paski@lol4to.com' }

      it do
        expect_status 422
        expect_json('errors.0.title', 'User')
        expect_json('errors.0.detail', 'email or password are invalid')
      end
    end

    context 'invalid password' do
      let(:params_password) { '12345678' }

      it do
        expect_status 422
        expect_json('errors.0.title', 'User')
        expect_json('errors.0.detail', 'email or password are invalid')
      end
    end

    context 'valid credentials' do
      it do
        expect_status 201
        expect(response.headers['Authorization']).to be_present
        expect_json('data.id', user.id.to_s)
        expect_json('data.type', 'users')
        expect_json('data.attributes.email', user.email)
        expect_json('data.attributes.first_name', user.first_name)
        expect_json('data.attributes.last_name', user.last_name)
      end
    end
  end

  describe 'POST#sign_up' do
    let(:password_confirmation) { 'password' }
    let(:params_password_confirmation) { password }
    let(:params) do
      {
        email: params_email,
        password: params_password,
        password_confirmation: params_password_confirmation
      }
    end
    let(:request) { post :sign_up, params: params }

    context 'email does already exist' do
      it do
        user
        request
        expect_status 422
        expect_json('errors.0.title', 'Email')
        expect_json('errors.0.detail', 'user with such email already exists')
      end
    end

    context 'invalid password confirmation' do
      let(:params_password_confirmation) { '12345678' }

      it do
        request
        expect_status 422
        expect_json('errors.0.title', 'Password confirmation')
        expect_json('errors.0.detail', 'must be equal to password')
      end
    end

    context 'valid credentials' do
      it do
        expect { request }.to change { User.count }.by(1)
        expect_status 201
        expect(response.headers['Authorization']).to be_present
        user = User.last
        expect_json('data.id', user.id.to_s)
        expect_json('data.type', 'users')
        expect_json('data.attributes.email', user.email)
        expect_json('data.attributes.first_name', user.first_name)
        expect_json('data.attributes.last_name', user.last_name)
      end
    end
  end
end
