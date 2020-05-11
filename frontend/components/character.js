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
    console.log('in race modifier ' + this.race);
    switch (this.race) {
      case 'Dwarf':
        this.constitution += 2;
        break;
      case 'Elf':
        this.dexterity += 2;
        this.speed += 5;
        break;
      case 'Halfling':
        this.dexterity += 2;
        break;
      case 'Human':
        this.dexterity += 1;
        this.wisdom += 1;
        this.intellect += 1;
        this.charisma += 1;
        this.strength += 1;
        this.constitution += 1;
        this.speed += 5;
        break;
      case 'Dragonborn':
        this.strength += 2;
        this.charisma += 1;
        this.speed += 5;
        break;
      case 'Gnome':
        this.intellect += 2;
        break;
      case 'Half-Elf':
        this.free_ability_pts += 2;
        this.charisma += 2;
        this.speed += 5;
        break;
      case 'Half-Orc':
        this.strength += 1;
        this.constitution += 1;
        this.speed += 5;
        break;
      case 'Tiefling':
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
        this.hp = 12 + this.modifier(this.constitution);
        break;
      case 'Bard':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Cleric':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Druid':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Fighter':
        this.hitDice = "1d10";
        this.hp = 10 + this.modifier(this.constitution);
        break;
      case 'Monk':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Paladin':
        this.hitDice = "1d10";
        this.hp = 10 + this.modifier(this.constitution);
        break;
      case 'Ranger':
        this.hitDice = "1d10";
        this.hp = 10 + this.modifier(this.constitution);
        break;
      case 'Rogue':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Sorcerer':
        this.hitDice = "1d6";
        this.hp = 6 + this.modifier(this.constitution);
        break;
      case 'Warlock':
        this.hitDice = "1d8";
        this.hp = 8 + this.modifier(this.constitution);
        break;
      case 'Wizard':
        this.hitDice = "1d6";
        this.hp = 6 + this.modifier(this.constitution);
        break;
    }
  }
}


class Character extends CharClass {
  constructor(name, race, charClass) {
    super(race, charClass)
    this.name = name
  }
}

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