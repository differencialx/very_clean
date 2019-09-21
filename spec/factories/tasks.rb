FactoryBot.define do
  factory :task do
    name { FFaker::Lorem.word }
    completed { false }
    project
  end
end
