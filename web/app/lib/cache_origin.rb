class CacheOrigin < BaseOrigin
  register_op Operation::Load, :apply_load
  register_op Operation::Remove, :apply_remove

  # @param op [Operation::Load]
  def apply_load(op)
    item_class.create!(op.data)
  end

  # @param op [Operation::Remove]
  def apply_remove(op)
    item_class.update!(op.item_id, is_deleted: true)
  end

  protected

  def item_class = CachedItem
end
