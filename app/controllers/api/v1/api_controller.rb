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
          destroyed: ->(result) { head :no_content },
          created: ->(result) { render jsonapi: result[:model], **result[:renderer_options], status: :created },
          success: ->(result) { render jsonapi: result[:model], **result[:renderer_options], status: :ok },
          forbidden: ->(result) { render json: { errors: [{ title: 'Forbidden', detail: 'Access Denied' }] }, status: :forbidden },
          not_found: ->(result) { head :not_found },
          unauthorized: ->(result) { render json: json_api_errors(result['contract.default'].errors.messages), status: :unauthorized },
          invalid: ->(result) { render json: json_api_errors(result['contract.default'].errors.messages), status: :unprocessable_entity }
        }
      end

      def default_cases
        {
          destroyed: ->(result) { result.success? && result[:model].respond_to?(:destroyed?) && result[:model].destroyed? },
          created: ->(result) { result.success? && result['model.action'] == :new },
          success: ->(result) { result.success? },
          forbidden: ->(result) { result.failure? && result['result.policy.default'] && result['result.policy.default'].failure? },
          unauthorized: ->(result) { result.failure? && result['contract.status'] == :unauthorized },
          not_found: ->(result) { result.failure? && result[:model].blank? },
          invalid: ->(result) { result.failure? }
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
