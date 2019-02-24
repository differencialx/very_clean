module Api
  module V1
    module Users::Contract
      class SignUp < SignIn
        property :email
        property :password
        property :password_confirmation

        validation do
          required(:email).filled(format?: EMAIL_REGEX)
          required(:password).filled.confirmation
        end

        validation :email_exists do
          configure do
            config.messages_file = 'config/locales/error_messages.yml'
            config.namespace = :users

            def email_exists?(email)
              ! User.exists?(email: email)
            end
          end

          required(:email).filled(:email_exists?)
        end
      end
    end
  end
end
