class CacheOrigin < BaseOrigin
  register_op Operation::Load, :apply_load
  register_op Operation::Create, :apply_create
  register_op Operation::Update, :apply_update
  register_op Operation::Remove, :apply_remove

  # @param op [Operation::Load]
  def apply_load(op)
    CachedItem.create!(op.data)
  end

  # @param op [Operation::Create]
  def apply_create(op)
    CachedItem.create!(op.data)
  end

  # @param op [Operation::Update]
  def apply_update(op)
    CachedItem.update!(op.item_id, value: op.value)
  end

  # @param op [Operation::Remove]
  def apply_remove(op)
    CachedItem.update!(op.item_id, is_deleted: true)
  end
end
