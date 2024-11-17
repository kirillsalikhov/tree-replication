class Operation::LoadOp < ActiveInteraction::Base
  include Operation::OpHelpers
  string :item_id

  def execute
    item = Item.find(item_id)
    op = Operation::Load.new(data: item.slice(:id, :value, :parent_id, :is_deleted))
    apply_to_cache_origin(op)
  end
end
