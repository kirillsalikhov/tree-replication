class Operation::Load < Operation::Base
  store_accessor :data, :parent_id, :value
  validates :value, presence: true
end
