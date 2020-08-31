
class Race extends UniversalCharacter {
    constructor(race) {
      super()
      this.race = race
      this.selectRaceModifiers()
    }
  
    selectRaceModifiers(){
      switch (this.race) {
        case 'Dwarf':
          this.constitution += 2;
          this.hp += 1;
          this.alignment += "Lawful";
          this.proficiencies = this.proficiencies.push("History");
          break;
        case 'Elf':
          this.dexterity += 2;
          this.speed += 5;
          this.language = this.language.push("Elvish");
          this.alignment += "Chaotic G/E";
          this.proficiencies = this.proficiencies.push("Perception");
          break;
        case 'Halfling':
          this.language = this.language.push("Halfling");
          this.alignment += "Lawful Good";
          this.dexterity += 2;
          break;
        case 'Human':
          this.language = this.language.push("Any one other");
          this.alignment += "any";
          this.dexterity += 1;
          this.wisdom += 1;
          this.intellect += 1;
          this.charisma += 1;
          this.strength += 1;
          this.constitution += 1;
          this.speed += 5;
          break;
        case 'Dragonborn':
          this.language = this.language.push("Draconic");
          this.alignment = "Chaotic G/E";
          this.strength += 2;
          this.charisma += 1;
          this.speed += 5;
          break;
        case 'Gnome':
          this.language = this.language.push("Gnomish");
          this.alignment = "Neutral Good";
          this.intellect += 2;
          break;
        case 'Half-Elf':
          this.language = this.language.push("Elvish", "one more");
          this.proficiencies = this.proficiencies.push("any two");
          this.free_ability_pts += 2;
          this.charisma += 2;
          this.speed += 5;
          break;
        case 'Half-Orc':
          this.language = this.language.push("Orcish");
          this.proficiencies = this.proficiencies.push("Intimidation");
          this.strength += 1;
          this.constitution += 1;
          this.speed += 5;
          break;
        case 'Tiefling':
          this.alignment += "Chaotic Evil";
          this.language = this.language.push("Infernal");
          this.intellect += 1;
          this.charisma += 2;
          this.speed += 5;
          break;
      }
    }
  }
  