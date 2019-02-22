module Api
  module V1
    class ApiController < ActionController::API
      include Trailblazer::Rails::Controller

      def json_api_errors(messages)
        JsonApi::ObjectErrorsConverter.new(messages).call
      end
    end
  end
end
