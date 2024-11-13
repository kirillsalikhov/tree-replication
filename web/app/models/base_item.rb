class BaseItem < ApplicationRecord
  self.abstract_class = true

  scope :ordered, -> { order(:created_at, :id) }
end
