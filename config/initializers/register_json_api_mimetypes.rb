api_mime_types = %w[
  text/x-json
  application/json
]

json_api_mime_types = %w[
  application/vnd.api+json
]

Mime::Type.unregister :json
Mime::Type.register 'application/json', :json, api_mime_types
Mime::Type.register 'application/vnd.api+json', :json_api, json_api_mime_types
