module Api
  module V1
    module Users::Operation
      class SignUp < Trailblazer::Operation
        step Model(User, :new)
        step Contract::Build(constant: Users::Contract::SignUp)
        step Contract::Validate()
        step Contract::Persist()
        step Users::Operation::PrepareTokenData
        step Users::Operation::GenerateToken
        step Users::Operation::RendererOptions
      end
    end
  end
end
