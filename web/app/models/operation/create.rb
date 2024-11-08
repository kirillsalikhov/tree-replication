class Operation::Create < Operation::Base
  store_accessor :data, :parent_id, :value
  validates :parent_id, :value, presence: true
end
