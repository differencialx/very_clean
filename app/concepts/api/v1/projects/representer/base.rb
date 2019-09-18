module Api
  module V1
    module Projects::Representer
      class Base < JSONAPI::Serializable::Resource
        type 'projects'

        belongs_to :user, serializer: Users::Representer::Authentication

        attributes :name
      end
    end
  end
end
