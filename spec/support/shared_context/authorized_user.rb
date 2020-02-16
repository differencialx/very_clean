RSpec.shared_context 'Authorized user' do
  let(:user) { create(:user) }
  let(:jwt_session_tokens) do
    JWTSessions::Session.new(
      payload: {
        user_id: user.id
      }
    ).login
  end

  before do
    cookies[JWTSessions.access_cookie] = { value: jwt_session_tokens[:access], httponly: true }
    request.headers['X-CSRF-Token'] = jwt_session_tokens[:csrf]
  end
end
