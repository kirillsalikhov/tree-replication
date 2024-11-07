def create_items
  return if Item.any?

  new_item = _create_item_seq

  root = new_item.()
  root.children << new_item.()
  root.children << new_item.()
    .tap { |child| child.children << new_item.() }
  root.children << new_item.()

  root.save
end

def _create_item_seq
  name = "Node 00"

  -> () do
    Item.new(value: (name = name.succ))
  end
end

create_items
