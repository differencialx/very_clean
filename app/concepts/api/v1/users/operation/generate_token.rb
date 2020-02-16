module Api
  module V1
    module Users::Operation
      class GenerateToken < BaseCallable
        def self.call(options, **)
          result = JWTSessions::Session.new(payload: options[:token_data],
                                            refresh_by_access_allowed: true)
          options[:jwt_session] = result.login
        end
      end
    end
  end
end
