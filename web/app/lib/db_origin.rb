class DbOrigin < BaseOrigin
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

  def apply_create(op)
    item_class.transaction do
      item = super(op)
      if item.ancestors.any?(&:is_deleted?)
        item.is_deleted = true
        item.save!
      end
    end
  end

  protected

  def item_class = Item
end
