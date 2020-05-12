class UniversalCharacter {
  constructor() {
    this.dexterity = this.getAbilityScore()
    this.constitution = this.getAbilityScore()
    this.wisdom = this.getAbilityScore()
    this.intellect = this.getAbilityScore()
    this.charisma = this.getAbilityScore()
    this.strength = this.getAbilityScore()
    // half elf has 2 extra ability points to spend wherever you want... make this its own function
    this.free_ability_pts = 0
    this.speed = 25
    this.hp = 0
    this.alignment= "";
    this.language= ["Common"];
    this.proficiencies = [];
    // these are for editing for people who want to save this stuff to DB
    this.personality_traits = "";
    this.ideals = "";
    this.bonds = "";
    this.flaws = "";
    this.features_and_traits = "";
    this.equipment = "";
    this.attacks_and_spells = "";
    this.background = ""

  }
// roll 4 six-sided dice, add the top 3 numbers.
  getAbilityScore(){
    let arr = [Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1)].sort();
    let arr1 = arr.slice(0,3);
    return arr1.reduce((total, element) => {return total + element}, 0)
  }
  // calculate ability modifier
  // why is this not avail on an instance of a character?  char.modifier(10) method not defined
  modifier(value) {
    return Math.floor((value - 10) / 2)
  }
}

class Race extends UniversalCharacter {
  constructor(race) {
    super()
    this.race = race
    this.selectRaceModifiers()
  }

  selectRaceModifiers(){
    // console.log('in race modifier ' + this.hp);
    switch (this.race) {
      case 'Dwarf':
        this.constitution += 2;
        this.hp += 1;
        this.alignment += "Lawful";
        this.proficiencies = this.proficiencies.push("History");
        // console.log('hp under race class is' + this.hp);
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

class CharClass extends Race {
  constructor(race, charClass) {
    super(race)
    this.charClass = charClass
    this.selectClassModifiers()
  }
  selectClassModifiers(){
    // if(this.charClass == "Paladin") {
    //   this.hitDice = "1d10"
    //   this.hp = 10 + this.modifier(this.constitution)
    // }
    switch (this.charClass) {
      case 'Barbarian':
        this.hitDice = "1d12";
        this.hp += Math.floor(Math.random()*12+1) + this.modifier(this.constitution);
        // console.log(`hp under class is ${this.hp}`);
        break;
      case 'Bard':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Cleric':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Druid':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Fighter':
        this.hitDice = "1d10";
        this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
        break;
      case 'Monk':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Paladin':
        this.hitDice = "1d10";
        this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
        break;
      case 'Ranger':
        this.hitDice = "1d10";
        this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
        break;
      case 'Rogue':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Sorcerer':
        this.hitDice = "1d6";
        this.hp += Math.floor(Math.random()*6+1) + this.modifier(this.constitution);
        break;
      case 'Warlock':
        this.hitDice = "1d8";
        this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
        break;
      case 'Wizard':
        this.hitDice = "1d6";
        this.hp += Math.floor(Math.random()*6+1) + this.modifier(this.constitution);
        break;
    }
  }
}

class Background extends CharClass {
  constructor(race, charClass, background){
    super(race, charClass);
    this.background = background;
    this.selectBackgroundModifiers();
  }

  selectBackgroundModifiers(){
    // console.log('in race modifier ' + this.hp);
    switch (this.background) {
      case 'Acolyte':
        this.proficiencies = this.proficiencies.push("Insight", "Religion");
        // console.log('hp under race class is' + this.hp);
        break;
      case 'Charlatan':
        this.proficiencies = this.proficiencies.push("Deception", "Sleight of Hand");
        break;
      case 'Criminal':
        this.proficiencies = this.proficiencies.push("Deception", "Stealth");
        break;
      case 'Entertainer':
        this.proficiencies = this.proficiencies.push("Acrobatics", "Performance");
        break;
      case 'Guild Artisan':
        this.proficiencies = this.proficiencies.push("Insight", "Persuasion");
        break;
      case 'Hermit':
        this.proficiencies = this.proficiencies.push("Medicine", "Religion");
        break;
      case 'Noble':
        this.proficiencies = this.proficiencies.push("History", "Persuasion");
        break;
      case 'Outlander':
        this.proficiencies = this.proficiencies.push("Athletics", "Survival");
        break;
      case 'Sage':
        this.proficiencies = this.proficiencies.push("Arcana", "History");
        break;
      case 'Sailor':
        this.proficiencies = this.proficiencies.push("Athletics", "Perception");
        break;
      case 'Soldier':
        this.proficiencies = this.proficiencies.push("Athletics", "Intimidation");
        break;
      case 'Urchin':
        this.proficiencies = this.proficiencies.push("Sleight of Hand", "Stealth");
        break;
    }
  }
}

class Character extends Background {
  constructor(name, race, charClass, background) {
    super(race, charClass, background)
    this.name = name
  }
}


// class Character extends CharClass {
//   constructor(name, race, charClass) {
//     super(race, charClass)
//     this.name = name
//   }
// }




// class Background {
//   constructor(background){
//     this.background = background;
//   }

//   selectBackgroundModifiers(){
//     // console.log('in race modifier ' + this.hp);
//     switch (this.background) {
//       case 'Acolyte':
//         this.proficiencies = this.proficiencies.push("Insight", "Religion");
//         // console.log('hp under race class is' + this.hp);
//         break;
//       case 'Charlatan':
//         this.proficiencies = this.proficiencies.push("Deception", "Sleight of Hand");
//         break;
//       case 'Criminal':
//         this.proficiencies = this.proficiencies.push("Deception", "Stealth");
//         break;
//       case 'Entertainer':
//         this.proficiencies = this.proficiencies.push("Acrobatics", "Performance");
//         break;
//       case 'Guild Artisan':
//         this.proficiencies = this.proficiencies.push("Insight", "Persuasion");
//         break;
//       case 'Hermit':
//         this.proficiencies = this.proficiencies.push("Medicine", "Religion");
//         break;
//       case 'Noble':
//         this.proficiencies = this.proficiencies.push("History", "Persuasion");
//         break;
//       case 'Outlander':
//         this.proficiencies = this.proficiencies.push("Athletics", "Survival");
//         break;
//       case 'Sage':
//         this.proficiencies = this.proficiencies.push("Arcana", "History");
//         break;
//       case 'Sailor':
//         this.proficiencies = this.proficiencies.push("Athletics", "Perception");
//         break;
//       case 'Soldier':
//         this.proficiencies = this.proficiencies.push("Athletics", "Intimidation");
//         break;
//       case 'Urchin':
//         this.proficiencies = this.proficiencies.push("Sleight of Hand", "Stealth");
//         break;
//     }
//   }
// }
// class CharClass {
//   constructor() {}
//   getModifier() {}
// }

// class Barbarian extends CharClass {
//   constructor() {}
//   getModifier() {
//     return '1d2';
//   }
// }

// const barbarian = new Barbarian();

// class Character {
//   constructor(name, race, class) {
//   }
// }

// race class, dif races extend that, class, all classes extend that, char class, char class constructor race and class.
// typescript
// has a relationship, is a relationship