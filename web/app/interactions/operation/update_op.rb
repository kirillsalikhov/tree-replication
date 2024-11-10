class Operation::UpdateOp < ActiveInteraction::Base
  include Operation::OpHelpers

  string :item_id
  string :value

  def execute
    # TODO validate if item_id exists
    apply_to_cache_origin(Operation::Update.new(inputs))
  end
end
