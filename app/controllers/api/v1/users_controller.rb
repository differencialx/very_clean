module Api
  module V1
    class UsersController < ApiController
      def sign_in
        endpoint operation: Users::Operation::SignIn,
                 different_handler: different_handler,
                 before_response: user_response_handler
      end

      def sign_up
        endpoint operation: Users::Operation::SignUp,
                 different_handler: different_handler,
                 before_response: user_response_handler
      end

      private

      def different_handler
        {
          created: ->(result) { render_success(result) },
          success: ->(result) { render_success(result) }
        }
      end

      def user_response_handler
        {
          created: ->(result) { set_tokens(result) },
          success: ->(result) { set_tokens(result) }
        }
      end

      def set_tokens(result)
        cookies[JWTSessions.access_cookie] = { value: result[:jwt_session][:access], httponly: true }
        response.set_header(JWTSessions.csrf_header, result[:jwt_session][:csrf])
      end

      def render_success(result)
        render json: { user: result[:model].email }, status: :ok
      end
    end
  end
end
