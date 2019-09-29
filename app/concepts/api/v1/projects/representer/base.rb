module Api
  module V1
    module Projects::Representer
      class Base < JSONAPI::Serializable::Resource
        type 'projects'

        belongs_to :user, serializer: Users::Representer::Authentication
        has_many :tasks, serializer: Tasks::Representer::Base

        attributes :name
      end
    end
  end
end
