class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items, id: :uuid do |t|
      t.string :value, default: ''
      t.boolean :is_deleted, default: false

      t.timestamps
    end
  end
end
