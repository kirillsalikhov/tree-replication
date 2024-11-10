class Operation::RemoveOp < ActiveInteraction::Base
  include Operation::OpHelpers

  string :item_id

  def execute
    # TODO validate if item_id exists ??? (probably not need)
    apply_op(Operation::Remove.new(inputs))
  end
end
