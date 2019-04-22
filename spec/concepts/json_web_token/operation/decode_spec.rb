require 'rails_helper'

RSpec.describe JsonWebToken::Operation::Decode do
  subject { described_class.(params: params) }

  let(:info_to_encode) { 'some_info' }
  let(:expiration) { 24.hours.from_now.to_i }
  let(:payload) { { some_info_for_encode: 'some_info', exp: expiration } }
  let(:token) { JWT.encode(payload, Rails.application.credentials[:secret_key_base], 'HS256') }
  let(:params) { { token: token } }

  describe 'failure' do
    context 'validation' do
      context 'token is not a String' do
        let(:token) { ['not', 'a', 'string'] }
        let(:expected_errors) { { token: ['must be a string'] } }

        it do
          subject
          check_operation_failure
        end
      end

      context 'token is blank' do
        let(:token) { nil }
        let(:expected_errors) { { token: ['must be filled'] } }

        it do
          subject
          check_operation_failure
        end
      end
    end
  end

  describe 'success' do
    context 'returns decoded body' do
      it do
        expect(subject).to be_success
        expect(subject[:decoded_body][:some_info_for_encode]).to eq info_to_encode
      end
    end
  end
end
