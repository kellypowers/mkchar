# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 3) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "charClass"
    t.string "race"
    t.integer "intellect"
    t.integer "wisdom"
    t.integer "charisma"
    t.integer "strength"
    t.integer "constitution"
    t.integer "dexterity"
    t.integer "speed"
    t.integer "hp"
    t.string "attacks_and_spells"
    t.string "languages_and_proficiencies"
    t.string "equipment"
    t.string "features_and_traits"
    t.string "background"
    t.integer "xp"
    t.integer "armor_class"
    t.integer "initiative"
    t.string "personality_traits"
    t.string "ideals"
    t.string "bonds"
    t.string "flaws"
    t.integer "player_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "alignment"
    t.integer "strength_save"
    t.boolean "strength_save_check"
    t.integer "dex_save"
    t.boolean "dex_save_check"
    t.integer "char_save"
    t.boolean "char_save_check"
    t.integer "const_save"
    t.boolean "const_save_check"
    t.integer "wis_save"
    t.boolean "wis_save_check"
    t.integer "intellect_save"
    t.boolean "intellect_save_check"
    t.integer "acrobatics"
    t.boolean "acrobatics_check"
    t.integer "animal"
    t.boolean "animal_check"
    t.integer "arcana"
    t.boolean "arcana_check"
    t.integer "athletic"
    t.boolean "athletic_check"
    t.integer "deception"
    t.boolean "deception_check"
    t.integer "history"
    t.boolean "history_check"
    t.integer "insight"
    t.boolean "insight_check"
    t.integer "intimidation"
    t.boolean "intimidation_check"
    t.integer "investigation"
    t.boolean "investigation_check"
    t.integer "medicine"
    t.boolean "medicine_check"
    t.integer "nature"
    t.boolean "nature_check"
    t.integer "perception"
    t.boolean "perception_check"
    t.integer "performance"
    t.boolean "performance_check"
    t.integer "persuasion"
    t.boolean "persuasion_check"
    t.integer "religion"
    t.boolean "religion_check"
    t.integer "sleight_of_hand"
    t.boolean "soh_check"
    t.integer "stealth"
    t.boolean "stealth_check"
    t.integer "survival"
    t.boolean "survival_check"
    t.string "hitDice"
    t.integer "free_ability_pts"
    t.integer "proficiencybonus"
    t.integer "passive_perception"
    t.integer "currenthp"
    t.integer "temphp"
    t.string "saving_throws"
  end

  create_table "players", force: :cascade do |t|
    t.string "player_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
