FactoryBot.define do
  factory :operation, class: Operation::Base do
    transient do
      item { nil }
    end

    before :create do |model, options|
      model.item_id = options.item.id if options.item&.id
    end
  end

  factory :operation_update, parent: :operation, class: Operation::Update do
    value { Faker::Book.title }
  end

  factory :operation_create, parent: :operation, class: Operation::Create do
    value { Faker::Book.title }
  end

  factory :operation_remove, parent: :operation, class: Operation::Remove
end
