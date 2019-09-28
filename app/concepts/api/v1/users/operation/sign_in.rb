module Api
  module V1
    module Users::Operation
      class SignIn < Trailblazer::Operation
        step Contract::Build( constant: Users::Contract::SignIn )
        step Contract::Validate(), fail_fast: true
        step :fetch_user!
        step :authenticate_user!
        fail :set_auth_errors!
        step Users::Operation::PrepareTokenData
        step Users::Operation::GenerateToken
        step Users::Operation::RendererOptions

        def fetch_user!(options, params:, **)
          binding.pry
          options[:model] = User.find_by(email: params[:email])
        end

        def authenticate_user!(options, params:, **)
          binding.pry
          options[:model].authenticate(params[:password])
        end

        def set_auth_errors!(options, params:, **)
          binding.pry
          options['contract.status'] = :unauthorized
          options['contract.default'].errors.add(:user, 'email or password are invalid')
        end
      end
    end
  end
end
