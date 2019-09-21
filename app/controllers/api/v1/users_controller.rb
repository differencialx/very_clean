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
          created: ->(result) { render json: { user: result[:model].email }, status: :ok },
          success: ->(result) { render json: { user: result[:model].email }, status: :ok }
        }
      end

      def user_response_handler
        {
          created: ->(result) { cookies[JWTSessions.access_cookie] = { value: result[:jwt_session], httponly: true } },
          success: ->(result) { cookies[JWTSessions.access_cookie] = { value: result[:jwt_session], httponly: true } }
        }
      end
    end
  end
end
