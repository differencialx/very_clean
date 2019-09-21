module Api
  module V1
    module Tasks::Contract
      class Update < BaseForm
        property :name
        property :deadline_at
        property :completed

        validation do
          optional(:name).filled
          optional(:deadline_at).filled
          optional(:completed).filled
        end
      end
    end
  end
end
