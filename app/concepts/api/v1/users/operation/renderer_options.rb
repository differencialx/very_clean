module Api
  module V1
    module Users::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              User: Api::V1::Users::Representer::Authentication
            }
          }
        end
      end
    end
  end
end
