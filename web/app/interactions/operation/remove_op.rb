class Operation::RemoveOp < ActiveInteraction::Base
  include Operation::OpHelpers

  string :item_id

  def execute
    apply_to_cache_origin(Operation::Remove.new(inputs))
  end
end
