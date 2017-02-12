class CreateReportes < ActiveRecord::Migration
  def change
    create_table :reportes do |t|
      t.string :name
      t.text :description
      t.float :geo_latitude
      t.float :geo_longitude
      t.references :users
      t.boolean :closed

      t.timestamps null: false
    end
  end
end