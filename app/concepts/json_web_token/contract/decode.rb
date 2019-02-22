module JsonWebToken::Contract
  class Decode < BaseForm
    property :token, virtual: true

    validation do
      required(:token).filled(:str?)
    end
  end
end
