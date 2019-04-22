module Api
  module V1
    module Users::Operation
      class PrepareTokenData < BaseCallable
        def self.call(options, **)
          options[:token_data] = { payload: { user_id: options[:model].id } }
        end
      end
    end
  end
end
 