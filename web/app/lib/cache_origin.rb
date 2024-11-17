class CacheOrigin < BaseOrigin
  register_op Operation::Load, :apply_load

  # @param op [Operation::Load]
  def apply_load(op)
    return if item_class.find_by(id: op.item_id)
    item_class.create!(op.data)
  end

  protected

  def item_class = CachedItem
end
