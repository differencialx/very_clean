module Api
  module V1
    module Projects::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              Project: Api::V1::Projects::Representer::Base,
              Task: Api::V1::Tasks::Representer::Base,
              User: Api::V1::Users::Representer::Authentication,
              Comment: Api::V1::Comments::Representer::Base
            },
            include: [:user, { tasks: [:comments] }]
          }
        end
      end
    end
  end
end
