require 'rails_helper'

describe JsonApi::ObjectErrorsConverter do
  subject { described_class.new(messages).call }

  let(:messages) do
    {
      object_one: ['First error', 'Second error', 'Third error'],
      object_two: ['Fourth error', 'Fifth error']
    }
  end
  let(:expected_result) do
    {
      errors: [
        { title: 'Object one', detail: 'First error' },
        { title: 'Object one', detail: 'Second error' },
        { title: 'Object one', detail: 'Third error' },
        { title: 'Object two', detail: 'Fourth error' },
        { title: 'Object two', detail: 'Fifth error' }
      ]
    }
  end

  describe 'converts object with errors to json api format' do
    it do
      expect(subject).to match expected_result
    end
  end
end
