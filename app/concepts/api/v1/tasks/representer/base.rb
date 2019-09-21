module Api
  module V1
    module Tasks::Representer
      class Base < JSONAPI::Serializable::Resource
        type 'tasks'

        belongs_to :project, serializer: Projects::Representer::Base

        attributes :name, :deadline_at, :completed, :position
      end
    end
  end
end
