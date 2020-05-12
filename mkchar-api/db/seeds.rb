# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Player.create([
    {player_name: "Kelly"},
    {player_name: "Erin"},
    {player_name: "Alyse"},
    {player_name: "John"},
    ])

Character.create([
    # charclass snake case or camel? snake for ruby camel for js.... which do i use for db?
    {name: "Delphinus", race: "Elf", charClass: "Paladin", player_id: 1},
    {name: "Auriga", race: "Dwarf", charClass: "Warrior", player_id: 1},
    {name: "KP", race: "Half-Elf", charClass: "Druid", player_id: 1},
    {name: "Charlie", race: "Halfling", charClass: "Bard", player_id: 2},
    {name: "Leena", race: "Dragonborn", charClass: "Fighter", player_id: 4},
    {name: "Mucca", race: "Half-Orc", charClass: "Barbarian", player_id: 3},
    ])