FactoryBot.define do
  factory :item do
    sequence(:value) { |n| "Node #{n}" }
  end
end
