FactoryBot.define do
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    sequence :email do |n|
      "test#{n}@email.com"
    end
    password { '12345678' }
  end
end
