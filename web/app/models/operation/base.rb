class Operation::Base < ApplicationRecord
  self.table_name = "operations"

  scope :not_applied, -> { where(applied_to_db: false).order(:id) }

  store_accessor :data,  :id, prefix: :item
  validates :item_id, presence: true

  def initialize(attributes = {})
    # self.abstract_class doesn't work with STI
    raise NotImplementedError if self.class == Operation::Base
    super
  end
end
