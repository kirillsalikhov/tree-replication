class Operation::Load < Operation::Base
  store_accessor :data, :parent_id, :value
  validates :value, presence: true
  validate :item_id_is_unique, on: :create

  private

  def item_id_is_unique
    if self.class.by_item_id(item_id).exists?
      errors.add(:item_id, :taken, message: "already loaded to cache")
    end
  end
end
