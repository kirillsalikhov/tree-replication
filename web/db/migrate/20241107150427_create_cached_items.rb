class CreateCachedItems < ActiveRecord::Migration[7.2]
  def change
    create_table :cached_items, id: :uuid do |t|
      t.string :value
      t.boolean :is_deleted

      t.timestamps
    end
  end
end