class Race {
    constructor() {
       this.alignment= "";
       this.language= ["Common"];
       this.proficiencies = [];
       this.dexterity = this.getAbilityScore()
        this.constitution = this.getAbilityScore()
        this.wisdom = this.getAbilityScore()
        this.intellect = this.getAbilityScore()
        this.charisma = this.getAbilityScore()
        this.strength = this.getAbilityScore()
        // half elf has 2 extra ability points to spend wherever you want... make this its own function
        this.free_ability_pts = 0
        this.speed = 25
        this.raceProficiency = [];
        // this.hp = 0
  }
// roll 4 six-sided dice, add the top 3 numbers.
  getAbilityScore(){
    let arr = [Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1), Math.floor(Math.random()*6+1)].sort();
    let arr1 = arr.slice(0,3);
    return arr1.reduce((total, element) => {return total + element}, 0)
  }
        
}

class Dwarf extends Race {
    constructor(){
        super();
        this.race = "Dwarf";
        this.language = this.language.push("Dwarfish");
        this.alignment += "Lawful";
        this.constitution += 2;
        this.raceProficiency = this.raceProficiency.push("History");
    }
}
class Elf extends Race {
    constructor(){
        super();
        this.race = "Elf";
        this.language = this.language.push("Elvish");
        this.alignment += "Chaotic G/E";
        this.raceProficiency = this.raceProficiency.push("Perception");
        this.dexterity += 2;
        this.speed +=5;
        
    }
}

class Halfling extends Race {
    constructor(){
        super();
        this.race = "Halfling";
        this.language = this.language.push("Halfling");
        this.alignment += "Lawful Good";
        this.dexterity += 2;
    }
}
class Human extends Race {
    constructor(){
        super();
        this.race = "Human";
        this.language = this.language.push("Any one other");
        this.alignment += "any";
        this.dexterity += 1;
        this.wisdom += 1;
        this.intellect += 1;
        this.charisma += 1;
        this.strength += 1;
        this.constitution += 1;
        this.speed += 5;
    }
}

class Dragonborn extends Race {
    constructor(){
        super();
        this.race = "Dragonborn";
        this.language = this.language.push("Draconic");
        this.alignment = "Chaotic G/E";
        this.strength += 2;
        this.charisma += 1;
        this.speed += 5;
    }
}

class Gnome extends Race {
    constructor(){
        super();
        this.race = "Gnome";
        this.language = this.language.push("Gnomish");
        this.alignment = "Neutral Good";
        this.intellect += 2;
    }
}

class HalfElf extends Race {
    constructor(){
        super();
        this.race = "Half-Elf";
        this.language = this.language.push("Elvish", "one more");
        this.raceProficiency = this.raceProficiency.push("any two");
        this.free_ability_pts += 2;
        this.charisma += 2;
        this.speed += 5;
    }
}

class HalfOrc extends Race {
    constructor(){
        super();
        this.race = "Half-Orc";
        this.language = this.language.push("Orcish");
        this.raceProficiency = this.raceProficiency.push("Intimidation");
        this.strength += 1;
        this.constitution += 1;
        this.speed += 5;
    }
}

class Tiefling extends Race {
    constructor(){
        super();
        this.race = "Tiefling";
        this.alignment += "Chaotic Evil";
        this.language = this.language.push("Infernal");
        this.intellect += 1;
        this.charisma += 2;
        this.speed += 5;
    }
}




}
// getModifier() {
//     switch (this.race) {
//         case 'Dwarf':
//           const dwarf = new Dwarf;
//           break;
//         case 'Elf':

//           break;
//         case 'Halfling':

//           break;
//         case 'Human':

//           break;
//         case 'Dragonborn':

//           break;
//         case 'Gnome':

//           break;
//         case 'Half-Elf':

//           break;
//         case 'Half-Orc':

//           break;
//         case 'Tiefling':

//           break;