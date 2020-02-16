class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.datetime :deadline_at
      t.boolean :completed
      t.integer :position
      t.references :project
      t.timestamps
    end
  end
end
