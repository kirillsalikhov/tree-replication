class BaseItem < ApplicationRecord
  self.abstract_class = true

  scope :ordered, -> { order(:id) }
end
