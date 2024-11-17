class Operation::CreateOp < ActiveInteraction::Base
  include Operation::OpHelpers

  string :item_id, default: nil
  string :parent_id
  string :value

  def execute
    op = Operation::Create.new(inputs)
    apply_to_cache_origin(op)
  end
end
