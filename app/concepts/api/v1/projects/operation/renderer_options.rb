module Api
  module V1
    module Projects::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              Project: Api::V1::Projects::Representer::Base
            }
          }
        end
      end
    end
  end
end
