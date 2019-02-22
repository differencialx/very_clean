module JsonWebToken::Contract
  class Encode < BaseForm
    include Dry
    DEFAULT_EXPIRATION = 24.hours.from_now.to_i

    with_options virtual: true do
      property :payload
      property :expiration, default: DEFAULT_EXPIRATION
    end

    validation do
      required(:payload).filled(:hash?)
      required(:expiration).filled(:int?, gt?: Time.current.to_i)
    end
  end
end
