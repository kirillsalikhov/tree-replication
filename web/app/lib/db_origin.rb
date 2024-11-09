class DbOrigin < BaseOrigin
  register_op Operation::Remove, :apply_remove

  # @param op [Operation::Remove]
  def apply_remove(op)
    item = item_class.find(op.item_id)
    item.is_deleted = true

    descendants = item.descendants
    descendants.each { |d| d.is_deleted = true }

    item_class.transaction do
      item.save!
      descendants.each(&:save!)
    end
  end

  protected

  def item_class = Item
end
