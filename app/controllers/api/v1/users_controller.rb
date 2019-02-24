module Api
  module V1
    class UsersController < ApiController
      def sign_in
        run Users::Operation::SignIn do |result|
          response.headers['Authorization'] = result[:json_web_token]
          return head :ok
        end
        render json: json_api_errors(result['contract.default'].errors.messages), 
                     status: :unprocessable_entity
      end

      def sign_up
        run Users::Operation::SignUp do |result|
          response.headers['Authorization'] = result[:json_web_token]
          return head :ok
        end
        render json: json_api_errors(result['contract.default'].errors.messages), 
                     status: :unprocessable_entity
      end
    end
  end
end
