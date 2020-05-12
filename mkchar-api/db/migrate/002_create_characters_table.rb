class CreateCharactersTable < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :charClass
      t.string :race

      t.integer :intellect
      t.integer :wisdom
      t.integer :charisma
      t.integer :strength
      t.integer :constitution
      t.integer :dexterity

      t.integer :speed
      t.integer :hp

      t.string :attacks_and_spells
      t.string :languages_and_proficiencies
      t.string :equipment
      t.string :features_and_traits
      t.string :background
      t.integer :xp
      t.integer :armor_class
      t.integer :initiative 
      t.string :personality_traits
      t.string :ideals
      t.string :bonds
      t.string :flaws

      t.integer :player_id

      t.timestamps
    end
  end
end