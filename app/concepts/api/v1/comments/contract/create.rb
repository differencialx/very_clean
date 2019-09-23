module Api
  module V1
    module Comments::Contract
      class Create < BaseForm
        property :text
        property :attachment
        property :task_id

        validation do
          required(:text).filled
          required(:task_id).filled
          optional(:attachment).filled
        end
      end
    end
  end
end
