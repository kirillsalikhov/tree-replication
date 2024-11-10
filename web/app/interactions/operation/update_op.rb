class Operation::UpdateOp < ActiveInteraction::Base
  include Operation::OpHelpers

  string :item_id
  string :value

  def execute
    # TODO validate if item_id exists
    apply_op(Operation::Update.new(inputs))
  end
end
