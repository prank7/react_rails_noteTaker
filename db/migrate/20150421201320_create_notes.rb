class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.date :date
      t.string :header
      t.text :content

      t.timestamps null: false
    end
  end
end
