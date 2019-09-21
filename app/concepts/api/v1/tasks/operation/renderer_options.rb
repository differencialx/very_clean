module Api
  module V1
    module Tasks::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              Project: Api::V1::Projects::Representer::Base,
              Task: Api::V1::Tasks::Representer::Base
            },
            include: [:project]
          }
        end
      end
    end
  end
end
