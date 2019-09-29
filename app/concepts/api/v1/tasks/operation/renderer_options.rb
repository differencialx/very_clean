module Api
  module V1
    module Tasks::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              Project: Api::V1::Projects::Representer::Base,
              Task: Api::V1::Tasks::Representer::Base,
              Comment: Api::V1::Comments::Representer::Base
            },
            include: [:project, :comments]
          }
        end
      end
    end
  end
end
