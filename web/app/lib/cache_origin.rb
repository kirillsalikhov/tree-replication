class CacheOrigin < BaseOrigin
  register_op Operation::Load, :apply_load
  register_op Operation::Create, :apply_create
  register_op Operation::Update, :apply_update
  register_op Operation::Remove, :apply_remove

  # @param op [Operation::Load]
  def apply_load(op)
    puts "apply_load"
    # TODO check exist
    CachedItem.create!(op.data)
  end

  # @param op [Operation::Create]
  def apply_create(op)
    puts "apply_create"
    CachedItem.create!(op.data)
  end

  # @param op [Operation::Update]
  def apply_update(op)
    puts "apply_update"
    CachedItem.update!(op.item_id, value: op.value)
  end

  # @param op [Operation::Remove]
  def apply_remove(op)
    puts "apply_remove"
    c = CachedItem.find(op.item_id)
    c.is_deleted = true
    c.save!
  end
end
