FactoryBot.define do
  factory :item do
    sequence(:value) { |n| "Node #{n}" }

    trait :with_children do
      after(:create) do |model|
        create_list :item, 3, parent: model
      end
    end

    trait :with_grandchildren do
      after(:create) do |model|
        create_list :item, 2, :with_children, parent: model
      end
    end
  end
end
