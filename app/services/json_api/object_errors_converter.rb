module JsonApi
  class ObjectErrorsConverter
    def initialize(messages, status = 422)
      @messages = messages
    end

    def call
      { errors: packed_errors }
    end

    private

    def packed_errors
      @messages.map do |key, values|
        values.map do |error_message|
          {
            title: key.to_s.humanize,
            detail: "#{error_message}"
          }
        end
      end.flatten
    end
  end
end
