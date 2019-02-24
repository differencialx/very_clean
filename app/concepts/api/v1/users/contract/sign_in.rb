module Api
  module V1
    module Users::Contract
      EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

      class SignIn < BaseForm
        with_options virtual: true do
          property :email
          property :password
        end

        validation do
          required(:email).filled(format?: EMAIL_REGEX)
          required(:password).filled
        end
      end
    end
  end
end
