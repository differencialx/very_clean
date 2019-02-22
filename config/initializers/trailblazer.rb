require 'reform'
require 'reform/form/dry'
require 'jsonapi/serializable'

Rails.application.configure do
  config.trailblazer.enable_loader = false
  # config.trailblazer.application_controller = 'Api::V1::ApiController'
end
