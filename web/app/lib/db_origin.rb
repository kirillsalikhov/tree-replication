class DbOrigin < BaseOrigin
  register_op Operation::Create, :apply_create
  register_op Operation::Update, :apply_update
  register_op Operation::Remove, :apply_remove

  def apply_create(op)
    Item.create!(op.data)
  end

  def apply_update(op)
    Item.update!(op.item_id, value: op.value)
  end

  def apply_remove(op)
    item = Item.find(op.item_id)
    item.is_deleted = true
    descendants = item.descendants
    descendants.each { |d| d.is_deleted = true }
    Item.transaction do
      item.save!
      descendants.each(&:save!)
    end
  end
end
