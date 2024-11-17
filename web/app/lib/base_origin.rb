class BaseOrigin
  include OpRegisterable

  register_op Operation::Create, :apply_create
  register_op Operation::Update, :apply_update
  register_op Operation::Remove, :apply_remove

  def apply(operations)
    operations.each do |op|
      method_name = op_handler(op)
      method(method_name).call(op) if method_name
    end
  end

  # @param op [Operation::Create]
  def apply_create(op)
    item_class.create!(op.data)
  end

  # @param op [Operation::Remove]
  def apply_update(op)
    item_class.update!(op.item_id, value: op.value)
  end

  # @param op [Operation::Remove]
  def apply_remove(op)
    item_class.update!(op.item_id, is_deleted: true)
  end

  protected

  def item_class = BaseItem
end
