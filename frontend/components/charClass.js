
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
          this.saving_throws.push("Strength", "Constitution");
          // console.log(`hp under class is ${this.hp}`);
          break;
        case 'Bard':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Dexterity", "Charisma");
          break;
        case 'Cleric':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Wisdom", "Charisma");
          break;
        case 'Druid':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Intellect", "Wisdom");
          break;
        case 'Fighter':
          this.hitDice = "1d10";
          this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
          this.saving_throws.push("Strength", "Constitution");
          break;
        case 'Monk':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Strength", "Dexterity");
          break;
        case 'Paladin':
          this.hitDice = "1d10";
          this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
          this.saving_throws.push("Wisdom", "Charisma");
          break;
        case 'Ranger':
          this.hitDice = "1d10";
          this.hp += Math.floor(Math.random()*10+1) + this.modifier(this.constitution);
          this.saving_throws.push("Strength", "Dexterity");
          break;
        case 'Rogue':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Dexterity", "Intellect");
          break;
        case 'Sorcerer':
          this.hitDice = "1d6";
          this.hp += Math.floor(Math.random()*6+1) + this.modifier(this.constitution);
          this.saving_throws.push("Charisma", "Constitution");
          break;
        case 'Warlock':
          this.hitDice = "1d8";
          this.hp += Math.floor(Math.random()*8+1) + this.modifier(this.constitution);
          this.saving_throws.push("Wisdom", "Charisma");
          break;
        case 'Wizard':
          this.hitDice = "1d6";
          this.hp += Math.floor(Math.random()*6+1) + this.modifier(this.constitution);
          this.saving_throws.push("Intellect", "Wisdom");
          break;
      }
    }
  }
  