module Api
  module V1
    module Comments::Operation
      class RendererOptions < BaseCallable
        def self.call(options, **)
          options[:renderer_options] = {
            class: {
              Comment: Api::V1::Comments::Representer::Base,
              Task: Api::V1::Tasks::Representer::Base
            },
            include: [:task]
          }
        end
      end
    end
  end
end
