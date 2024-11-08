class CreateOperations < ActiveRecord::Migration[7.2]
  def change
    create_table :operations, id: :uuid do |t|
      t.json :data
      t.string :type

      t.timestamps
    end
  end
end
