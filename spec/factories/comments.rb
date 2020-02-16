include ActionDispatch::TestProcess

FactoryBot.define do
  factory :comment do
    text { FFaker::Lorem.sentence }
    attachment { fixture_file_upload(Rails.root.to_s + '/spec/fixtures/attachment.jpg', 'img/jpeg') }
    task
  end
end
