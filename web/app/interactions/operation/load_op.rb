class Operation::LoadOp < ActiveInteraction::Base
  include Operation::OpHelpers
  string :item_id

  def execute
    item = Item.find(item_id)
    # TODO !!! think about is_deleted
    op = Operation::Load.new(data: item.slice(:id, :value, :parent_id))
    apply_to_cache_origin(op)
  end
end
