RSpec.describe 'Sign up requests', type: :request do
  describe 'POST /api/web/sign_up' do
    let(:email) { FFaker::Internet.email }
    let(:password) { 'password' }
    let(:user) { create(:user, email: email, password: password) }
    let(:params) do
      {
        email: email,
        password: password,
        password_confirmation: password
      }
    end

    it 'creates new user' do
      expect do
        post '/api/v1/sign_up', params: params
      end.to change(User, :count).from(0).to(1)
      expect_status(200)
      expect(json_body[:user]).to eq email
      expect(cookies[:jwt]).to be_present
    end

    context 'wrong confirmation' do
      let(:params) do
        {
          email: email,
          password: password,
          password_confirmation: 'wrong confirmation'
        }
      end

      it 'unprocessable entity' do
        expect do
          post '/api/v1/sign_up', params: params
        end.not_to change(User, :count)
        expect_status(422)
        expect_json_sizes('errors', 1)
        expect_json('errors.0.title', 'Password confirmation')
        expect_json('errors.0.detail', "must be equal to password")
      end
    end

    context 'user already exists' do
      before do
        user
      end

      it 'unprocessable entity' do
        expect do
          post '/api/v1/sign_up', params: params
        end.not_to change(User, :count)
        expect_status(422)
        expect_json_sizes('errors', 1)
        expect_json('errors.0.title', 'Email')
        expect_json('errors.0.detail', "user with such email already exists")
      end
    end
  end
end
