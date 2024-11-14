class CreateOperations < ActiveRecord::Migration[7.2]
  def change
    create_table :operations, id: :uuid do |t|
      t.json :data
      t.string :type
      t.boolean :applied_to_db, default: false

      t.timestamps
    end
  end
end
