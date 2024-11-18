class Operation::Update < Operation::Base
  store_accessor :data,  :value
  validates :value, presence: true
end
