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

class Character extends Background {
  constructor(name, race, charClass, background, id, player) {
    super(race, charClass, background)
    this.name = name
    this.id = id
    this.player = player
  }
  renderItem() {
    const charItem = document.createElement('li')
    charItem.id = `char-${this.id}`;
    charItem.innerText = `Character Name: ${this.name}, Race: ${this.race}, Class: ${this.charClass}`;
    charItem.addEventListener("click", () => this.showCharacter.call(this));
    return charItem
  }

  showCharacter(){
    document.querySelector("#main").innerHTML = `
    <form id="charsheet" class="charsheet">
  <header>
    <!-- can i set the character then call is with character.name etc? or is it all done in js file? -->
    <section class="charname">
      <label for="charname">Character Name</label><input id="charNameForm" name="charname" value="${this.name}" />
    </section>
    <section class="misc">
      <ul>
        <li>
          <label for="classlevel">Class & Level</label><input id="charClassForm" name="classlevel" value="${this.charClass}/1" />
        </li>
        <li>
          <label for="background">Background</label><input id="charBackgroundForm" name="background" value="${this.background}" />
        </li>
        <li>
          <label for="playername">Player Name</label><input id="playerNameForm" name="playername" value="${this.player.player_name}">
        </li>
        <li>
          <label for="race">Race</label><input name="race" id="charFormRace" value="${this.race}" />
        </li>
        <li>
          <label for="alignment">Alignment</label><input id="charAlignmentForm" name="alignment" value="${this.alignment}" />
        </li>
        <li>
          <label for="experiencepoints">Experience Points</label><input id="experiencepoints" name="experiencepoints" value="${this.xp}" />
        </li>
      </ul>
    </section>
  </header>
  <main>
    <section>
      <section class="attributes">
        <div class="scores">
          <ul>
            <li>
              <div class="score">
                <label for="Strengthscore">Strength</label><input id="Strengthscore"  name="Strengthscore" value="${this.strength}" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Strengthmod" name="Strengthmod" value="${this.modifier(this.strength)}" class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Dexterityscore">Dexterity</label><input id="Dexterityscore" name="Dexterityscore" value="${this.dexterity}" class="stat"/>
              </div>
              <div class="modifier">
                <input name="Dexteritymod" id="Dexteritymod" value="${Math.floor((this.dexterity - 10) / 2)}" class=statmod/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Constitutionscore">Constitution</label><input id="Constitutionscore" name="Constitutionscore" value="${this.constitution}" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Constitutionmod" name="Constitutionmod" value="${Math.floor((this.constitution - 10) / 2)}" class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Wisdomscore">Wisdom</label><input name="Wisdomscore" value="${this.wisdom}"  id="Wisdomscore" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Wisdommod" value="${Math.floor((this.wisdom - 10) / 2)}"  name="Wisdommod"  />
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Intelligencescore">Intelligence</label><input id="Intelligencescore" value="${this.intellect}"  name="Intelligencescore"  class="stat"/>
              </div>
              <div class="modifier">
                <input id="Intelligencemod" name="Intelligencemod"  value="${Math.floor((this.intellect - 10) / 2)}"  class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Charismascore">Charisma</label><input id="Charismascore"  value="${this.charisma}" name="Charismascore" class="stat"/>
              </div>
              <div class="modifier">
                <input name="Charismamod" id="Charismamod" value="${Math.floor((this.charisma - 10) / 2)}"  class="statmod"/>
              </div>
            </li>
          </ul>
        </div>
        <div class="attr-applications">

          <div class="proficiencybonus box">
            <div class="label-container">
              <label for="proficiencybonus">Proficiency Bonus</label>
            </div>
            <input id="proficiencybonus" name="proficiencybonus" value="+2"  />
          </div>
          <div class="saves list-section box">
            <ul>
              <li>
                <label for="Strength-save">Strength</label><input  value="" id="str-save" name="Strength-save" type="text" /><input id="str-save-prof"  value="" name="Strength-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Dexterity-save">Dexterity</label><input  value="" id="dex-save" name="Dexterity-save" type="text" /><input id="str-save-check"  value="" name="Dexterity-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Constitution-save">Constitution</label><input id="const-save" value="" name="const-save" type="text" /><input id="const-save-check"  value="" name="Constitution-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Wisdom-save">Wisdom</label><input id="wis-save" value=""  name="Wisdom-save" type="text" /><input name="Wisdom-save-prof"  value="" id="wis-save-check" type="checkbox" />
              </li>
              <li>
                <label for="Intelligence-save">Intelligence</label><input  value="" id="int-save" name="Intelligence-save" type="text" /><input  value="" id="int-save-check" name="Intelligence-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Charisma-save">Charisma</label><input id="char-save" value=""  name="Charisma-save" type="text" /><input id="char-save-check"  value="" name="Charisma-save-prof" type="checkbox" />
              </li>
            </ul>
            <div class="label">
              Saving Throws
            </div>
          </div>
          <div class="skills list-section box">
            <ul>
              <li>
                <label for="Acrobatics">Acrobatics <span class="skill">(Dex)</span></label><input value=""  id="acrobatics" name="Acrobatics" type="text" /><input  value="" id="acrobatics-check" name="Acrobatics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Animal Handling">Animal Handling <span class="skill">(Wis)</span></label><input value=""  id="animal" name="Animal Handling" type="text" /><input  value="" id="animal-check" name="Animal Handling-prof" type="checkbox" />
              </li>
              <li>
                <label for="Arcana">Arcana <span class="skill">(Int)</span></label><input id="arcana" value=""  name="Arcana" type="text" /><input id="arcana-check"  value="" name="Arcana-prof" type="checkbox" />
              </li>
              <li>
                <label for="Athletics">Athletics <span class="skill">(Str)</span></label><input  value="" id="athletic" name="Athletics" type="text" /><input  value="" id="athletic-check" name="Athletics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Deception">Deception <span class="skill">(Cha)</span></label><input id="deception" value=""  name="Deception" type="text" /><input id="decept-check"  value="" name="Deception-prof" type="checkbox" />
              </li>
              <li>
                <label for="History">History <span class="skill">(Int)</span></label><input id="hist" value=""  name="History" type="text" /><input id="hist-check"  value="" name="History-prof" type="checkbox" />
              </li>
              <li>
                <label for="Insight">Insight <span class="skill">(Wis)</span></label><input id="insight" value=""  name="Insight" type="text" /><input id="insight-check" value=""  name="Insight-prof" type="checkbox" />
              </li>
              <li>
                <label for="Intimidation">Intimidation <span class="skill">(Cha)</span></label><input id="intimidate" value=""  name="Intimidation" type="text" /><input id="intimidate-check"  value="" name="Intimidation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Investigation">Investigation <span class="skill">(Int)</span></label><input id="investigate"  value="" name="Investigation" type="text" /><input id="investigate-check"  value="" name="Investigation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Medicine">Medicine <span class="skill">(Wis)</span></label><input id="med" name="Medicine" value=""  type="text" /><input id="med-check"  value="" name="Medicine-prof" type="checkbox" />
              </li>
              <li>
                <label for="Nature">Nature <span class="skill">(Int)</span></label><input id="nature" name="Nature"  value="" type="text" /><input id="nature-check"  value="" name="Nature-prof" type="checkbox" />
              </li>
              <li>
                <label for="Perception">Perception <span class="skill">(Wis)</span></label><input id="percept" name="Perception" value=""  type="text" /><input id="percept-check"  value="" name="Perception-prof" type="checkbox" />
              </li>
              <li>
                <label for="Performance">Performance <span class="skill">(Cha)</span></label><input id="perform" name="Performance"  value="" type="text" /><input id="perform-check" value=""  name="Performance-prof" type="checkbox" />
              </li>
              <li>
                <label for="Persuasion">Persuasion <span class="skill">(Cha)</span></label><input id="persuade" name="Persuasion"  value="" type="text" /><input id="persuade-check"  value="" name="Persuasion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Religion">Religion <span class="skill">(Int)</span></label><input id="relig" name="Religion"  value="" type="text" /><input id="relig-check"  value="" name="Religion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Sleight of Hand">Sleight of Hand <span class="skill">(Dex)</span></label><input id="soh"  value="" name="Sleight of Hand" type="text" /><input id="soh-check"  value="" name="Sleight of Hand-prof" type="checkbox" />
              </li>
              <li>
                <label for="Stealth">Stealth <span class="skill">(Dex)</span></label><input id="stealth" name="Stealth"  value="" type="text" /><input id="stealth-check" name="Stealth-prof" value=""  type="checkbox" />
              </li>
              <li>
                <label for="Survival">Survival <span class="skill">(Wis)</span></label><input id="survival"  value="" name="Survival" type="text" /><input id="survival-check"  value="" name="Survival-prof" type="checkbox" />
              </li>
            </ul>
            <div class="label">
              Skills
            </div>
          </div>
        </div>
      </section>
      <div class="passive-perception box">
        <div class="label-container">
          <label for="passiveperception">Passive Wisdom (Perception)</label>
        </div>
        <input id="passiveperception" name="passiveperception"  />
      </div>
      <div class="otherprofs box textblock">
        <label for="otherprofs">Other Proficiencies and Languages</label><textarea id="proficiencies_and_languages" value=""  name="otherprofs"></textarea>
      </div>
    </section>
    <section>
      <section class="combat">
        <div class="armorclass">
          <div>
            <label for="ac">Armor Class</label><input id="ac" name="ac" value=""   type="text" />
          </div>
        </div>
        <div class="initiative">
          <div>
            <label for="initiative">Initiative</label><input name="initiative" id="initiative" value="" type="text" />
          </div>
        </div>
        <div class="speed">
          <div>
            <label for="speed">Speed</label><input id="speed" name="speed" value="${this.speed}"   type="text" />
          </div>
        </div>
        <div class="hp">
          <div class="regular">
            <div class="max">
              <label for="maxhp">Hit Point Maximum</label><input id="hp" name="maxhp"   value="${this.hp}" type="text" />
            </div>
            <div class="current">
              <label for="currenthp">Current Hit Points</label><input id="currenthp" name="currenthp" value="${this.hp}"  type="text" />
            </div>
          </div>
          <div class="temporary">
            <label for="temphp">Temporary Hit Points</label><input name="temphp" id="temphp" value="${this.temphp}" type="text" />
          </div>
        </div>
        <div class="hitdice">

              <label for="remaininghd">Hit Dice</label><input id="hitDice" name="remaininghd"  value="${this.hitDice}" type="text" />
            </div>
          </div>
        </div>
        
        </div>
      </section>
      <section class="attacksandspellcasting">
        <div>
          <label>Attacks & Spellcasting</label>
          <input type="textarea" value="${this.attacks_and_spells}"  id="attacks_and_spellcasting" >
          
        </div>
      </section>
      <section class="equipment">
        <div>
          <label>Equipment</label>
          <input type="textarea" value="${this.equipment}"  id="equipment">
          
      </section>
    </section>
    <section>
      <section class="flavor">
        <div class="personality">
          <label for="personality">Personality</label><textarea id="personality"  value="${this.personality_traits}" name="personality"></textarea>
        </div>
        <div class="ideals">
          <label for="ideals">Ideals</label><textarea id="ideals" value="${this.ideals}"  name="ideals"></textarea>
        </div>
        <div class="bonds">
          <label for="bonds">Bonds</label><textarea id="bonds" value="${this.bonds}"  name="bonds"></textarea>
        </div>
        <div class="flaws">
          <label for="flaws">Flaws</label><textarea id="flaws" value="${this.flaws}"  name="flaws"></textarea>
        </div>
      </section>
      <section class="features">
        <div>
          <label for="features">Features & Traits</label><textarea id="features_and_traits"  value="${this.features_and_traits}" name="features"></textarea>
        </div>
      </section>
    </section>
  </main>
</form>
    `
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