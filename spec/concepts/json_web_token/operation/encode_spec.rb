require 'rails_helper'

RSpec.describe JsonWebToken::Operation::Encode do
  subject { described_class.(params: params) }

  let(:info_to_encode) { 'some_info' }
  let(:payload) { { some_info_for_encode: 'some_info' } }
  let(:expiration) { 24.hours.from_now.to_i }
  let(:params) do
    {
      payload: payload,
      expiration: expiration
    }
  end

  describe 'failure' do
    context 'validation' do
      context 'payload is not a Hash' do
        let(:payload) { 'not a Hash' }
        let(:expected_errors) { { payload: ['must be a hash'] } }

        it do
          subject
          check_operation_failure
        end
      end

      context 'payload is blank' do
        let(:payload) { nil }
        let(:expected_errors) { { payload: ['must be filled'] } }

        it do
          subject
          check_operation_failure
        end
      end

      context 'expiration is not an Integer' do
        let(:expiration) { 'not an Integer' }
        let(:expected_errors) { { expiration: ['must be an integer', "must be greater than"] } }

        it do
          subject
          check_operation_failure
        end
      end

      context 'expiration date is less then Time.current' do
        let(:expiration) { 1.second.ago.to_datetime }
        let(:expected_errors) { { expiration: ['must be greater than'] } }

        it do
          subject
          check_operation_failure
        end
      end
    end
  end

  describe 'success' do
    context 'returns json web token' do
      it do
        expect(subject).to be_success
        json_web_token = subject[:json_web_token]
        decoded_token = JWT.decode(json_web_token, Rails.application.credentials[:secret_key_base], true, algorithm: 'HS256').first
        expect(decoded_token['some_info_for_encode']).to eq info_to_encode
      end
    end
  end
end
