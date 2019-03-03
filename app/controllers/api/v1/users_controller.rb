module Api
  module V1
    class UsersController < ApiController
      def sign_in
        endpoint operation: Users::Operation::SignIn, &user_response_handler
      end

      def sign_up
        endpoint operation: Users::Operation::SignUp, &user_response_handler
      end

      private

      def user_response_handler
        -> (kase, result) do
          case kase
          when :success
            response.headers['Authorization'] = result[:json_web_token]
          end
        end
      end
    end
  end
end
