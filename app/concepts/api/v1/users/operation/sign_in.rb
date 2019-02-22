module Api
  module V1
    module Users::Operation
      class SignIn < Trailblazer::Operation
        step Contract::Build( constant: Users::Contract::SignIn )
        step Contract::Validate(), fail_fast: true
        step :fetch_user!
        step :authenticate_user!
        fail :set_auth_errors!
        step :prepare_token_data!
        step :generate_token!

        def fetch_user!(options, params:, **)
          options[:model] = User.find_by(email: params[:email])
        end
  
        def authenticate_user!(options, params:, **)
          options[:model].authenticate(params[:password])
        end

        def set_auth_errors!(options, params:, **)
          options['contract.default'].errors.add(:user, 'email or password are invalid')
        end

        def prepare_token_data!(options, params:, **)
          options[:token_data] = { payload: { user_id: options[:model].id } }
        end
  
        def generate_token!(options, params:, **)
          result = JsonWebToken::Operation::Encode.(params: options[:token_data])
          options[:json_web_token] = result[:json_web_token]
        end
      end
    end
  end
end
