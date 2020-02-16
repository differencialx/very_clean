module Api
  module V1
    module Tasks::Contract
      class Create < BaseForm
        property :name
        property :project_id

        validation do
          required(:name).filled
          required(:project_id).filled
        end
      end
    end
  end
end
