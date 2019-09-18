module Api
  module V1
    class ApiController < ActionController::API
      include JWTSessions::RailsAuthorization
      include SimpleEndpoint::Controller
      include ::ActionController::Cookies
      rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

      private

      def default_handler
        {
          success: -> (result) { render jsonapi: result[:model], **result[:renderer_options], status: :created },
          invalid: -> (result) { render json: json_api_errors(result['contract.default'].errors.messages), status: :unprocessable_entity },
          unauthorized: ->(result) { render json: json_api_errors(result['contract.default'].errors.messages), status: :unauthorized }
        }
      end

      def default_cases
        {
          success:   -> (result) { result.success? },
          unauthorized: ->(result) { result.failure? && result['contract.status'] == :unauthorized },
          destroyed: -> (result) { result.success? && result["model.action"] == :destroy },
          not_found: -> (result) { result.failure? && result["result.model"] && result["result.model"].failure? },
          forbidden: -> (result) { result.failure? && result["result.policy.default"] && result["result.policy.default"].failure? },
          invalid:   -> (result) { result.failure? }
        }
      end

      def json_api_errors(messages)
        JsonApi::ObjectErrorsConverter.new(messages).call
      end

      def not_authorized
        render json: { errors: [{ title: 'Authorization', detail: 'Not authorized' }] }, status: :unauthorized
      end

      def current_user
        @current_user ||= User.find(payload["user_id"])
      end
    end
  end
end
