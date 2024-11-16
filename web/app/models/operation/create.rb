class Operation::Create < Operation::Base
  store_accessor :data, :parent_id, :value
  after_initialize :init_defaults, if: :new_record?

  validates :parent_id, :value, presence: true

  private

  def init_defaults
    self.item_id ||= SecureRandom.uuid_v7
  end
end
