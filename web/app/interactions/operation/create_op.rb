class Operation::CreateOp < ActiveInteraction::Base
  include Operation::OpHelpers

  # TODO think to move to  Operation::Create
  string :item_id, default: ->() { SecureRandom.uuid_v7 }
  string :parent_id
  string :value

  def execute
    # TODO check item_id not exist
    # TODO check parent_id exist
    op = Operation::Create.new(inputs)
    apply_to_cache_origin(op)
  end
end
