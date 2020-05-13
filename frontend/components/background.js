
class Background extends CharClass {
    constructor(race, charClass, background){
      super(race, charClass);
      this.background = background;
      // this.selectBackgroundModifiers();
    }
  
    // selectBackgroundModifiers(){
    //   // console.log('in race modifier ' + this.hp);
    //   switch (this.background) {
    //     case 'Acolyte':
    //       this.proficiencies.push("Insight", "Religion");
    //       // console.log('hp under race class is' + this.hp);
    //       break;
    //     case 'Charlatan':
    //       this.proficiencies.push("Deception", "Sleight of Hand");
    //       break;
    //     case 'Criminal':
    //       this.proficiencies.push("Deception", "Stealth");
    //       break;
    //     case 'Entertainer':
    //       this.proficiencies.push("Acrobatics", "Performance");
    //       break;
    //     case 'Guild Artisan':
    //       this.proficiencies.push("Insight", "Persuasion");
    //       break;
    //     case 'Hermit':
    //       this.proficiencies.push("Medicine", "Religion");
    //       break;
    //     case 'Noble':
    //       this.proficiencies.push("History", "Persuasion");
    //       break;
    //     case 'Outlander':
    //       this.proficiencies.push("Athletics", "Survival");
    //       break;
    //     case 'Sage':
    //       this.proficiencies.push("Arcana", "History");
    //       break;
    //     case 'Sailor':
    //       this.proficiencies.push("Athletics", "Perception");
    //       break;
    //     case 'Soldier':
    //       this.proficiencies.push("Athletics", "Intimidation");
    //       break;
    //     case 'Urchin':
    //       this.proficiencies.push("Sleight of Hand", "Stealth");
    //       break;
    //   }
    // }
  }
  