class AddParentIdToItems < ActiveRecord::Migration[7.2]
  def change
    add_column :items, :parent_id, :uuid
  end
end
