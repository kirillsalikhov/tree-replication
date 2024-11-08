class CacheOrigin < BaseOrigin
  register_op Operation::Load, :apply_load
  register_op Operation::Create, :apply_create
  register_op Operation::Update, :apply_update
  register_op Operation::Remove, :apply_remove

  # @param op [Operation::Load]
  def apply_load(op)
    puts "apply_load"
    # TODO check exist
    c = CachedItem.new(op.data.except(:parent_id))
    c.save!
  end

  def apply_create(op)
  end

  def apply_remove(op)
  end
end
