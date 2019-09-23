module Api
  module V1
    module Comments::Representer
      class Base < JSONAPI::Serializable::Resource
        include Rails.application.routes.url_helpers

        type 'comments'

        belongs_to :task, serializer: Tasks::Representer::Base

        attributes :text

        attribute :attachment do
          if Rails.env.development? || Rails.env.test?
            rails_blob_path(@object.attachment, disposition: 'attachment', only_path: true)
          else
            @object.attachment.service_url
          end
        end
      end
    end
  end
end
