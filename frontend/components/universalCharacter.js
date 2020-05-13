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
      this.background = "";
      this.saving_throws = []
  
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
  