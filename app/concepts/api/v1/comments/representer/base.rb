module Api
  module V1
    module Comments::Representer
      class Base < JSONAPI::Serializable::Resource
        include Rails.application.routes.url_helpers

        type 'comments'

        belongs_to :task, serializer: Tasks::Representer::Base

        attributes :text, :task_id

        attribute :attachment do
          if @object.attachment.attached?
            # if Rails.env.development? || Rails.env.test?
              rails_representation_url(@object.thumbnail, disposition: 'attachment', only_path: true)
            # else
              # @object.attachment.service_url
            # end
          else
            ''
          end
        end
      end
    end
  end
end
