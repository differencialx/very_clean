module Api
  module V1
    module Users::Operation
      class GenerateToken < BaseCallable
        def self.call(options, **)
          result = JsonWebToken::Operation::Encode.(params: options[:token_data])
          options[:json_web_token] = result[:json_web_token]
        end
      end
    end
  end
end
