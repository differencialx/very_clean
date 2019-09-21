RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'POST #sign_in' do
    subject(:make_request) { post :sign_in, params: params }

    let(:email) { 'test@test.com' }
    let(:password) { 'password' }
    let(:params) do
      {
        email: email,
        password: password
      }
    end

    it 'returns unauthorized' do
      make_request
      expect_status(401)
      expect_json('errors.0.title', 'User')
      expect_json('errors.0.detail', 'email or password are invalid')
    end

    describe 'Authorized' do
      let(:user) { create(:user, password: password) }
      let(:email) { user.email }

      it 'returns jwt token' do
        make_request
        expect_status(200)
        expect(json_body[:user]).to eq user.email
        expect(cookies[JWTSessions.access_cookie]).to be_present
      end
    end
  end

  describe 'POST #sign_up' do
    subject(:make_request) { post :sign_up, params: params }

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
      expect { make_request }.to change(User, :count).from(0).to(1)
      expect_status(200)
      expect(json_body[:user]).to eq email
      expect(cookies[JWTSessions.access_cookie]).to be_present
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
        expect { make_request }.not_to change(User, :count)
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
        expect { make_request }.not_to change(User, :count)
        expect_status(422)
        expect_json_sizes('errors', 1)
        expect_json('errors.0.title', 'Email')
        expect_json('errors.0.detail', "user with such email already exists")
      end
    end
  end
end
