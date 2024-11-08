class Operation::Base < ApplicationRecord
  self.table_name = "operations"

  store :data, accessors: [ :id ], prefix: :item
  validates :item_id, presence: true

  def initialize(attributes = {})
    # self.abstract_class doesn't work with STI
    raise NotImplementedError if self.class == Operation::Base
    super
  end
end
