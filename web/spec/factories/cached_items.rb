FactoryBot.define do
  factory :cached_item do
    sequence(:value) { |n| "Node #{n}" }
  end
end
