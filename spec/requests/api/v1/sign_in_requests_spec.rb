RSpec.describe "Sign in requests", type: :request do
  describe "POST /api/v1/sign_in" do
    it 'returns unauthorized' do
      params = {
        email: 'test@test.com',
        password: 'password'
      }
      post '/api/v1/sign_in', params: params
      expect_status(401)
      expect_json('errors.0.title', 'User')
      expect_json('errors.0.detail', 'email or password are invalid')
    end

    describe 'Authorized' do
      let(:password) { 'password' }
      let(:user) { create(:user, password: password) }

      it 'returns jwt token' do
        params = {
          email: user.email,
          password: password
        }
        post '/api/v1/sign_in', params: params
        expect_status(200)
        expect(json_body[:user]).to eq user.email
        expect(cookies[:jwt]).to be_present
      end
    end
  end
end
