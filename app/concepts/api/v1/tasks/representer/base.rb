module Api
  module V1
    module Tasks::Representer
      class Base < JSONAPI::Serializable::Resource
        type 'tasks'

        belongs_to :project, serializer: Projects::Representer::Base
        has_many :comments, serializer: Comments::Representer::Base

        attributes :name, :deadline_at, :completed, :position, :project_id
      end
    end
  end
end
