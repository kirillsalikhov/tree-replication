class CreateCachedItems < ActiveRecord::Migration[7.2]
  def change
    create_table :cached_items, id: :uuid do |t|
      t.string :value
      t.uuid :parent_id
      t.boolean :is_deleted, default: false

      t.timestamps
    end
  end
end
