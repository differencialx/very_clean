module Api
  module V1
    module Projects::Contract
      class Create < BaseForm
        property :name

        validation do
          required(:name).filled
        end
      end
    end
  end
end
