
class Character extends Background {
  constructor(name, race, charClass, background, player, id) {
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

  postChar() {
    let playerid = document.querySelector('#main').querySelector('div').id.split('-')[1];
    console.log(`postchar fun playerid ${playerid}`);
    fetch(`http://localhost:3000/api/v1/players/${playerid}/characters`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        playerID: `${playerid}`,
        name: `${this.name}`,
        race: `${this.race}`,
        charClass: `${this.charClass}`,
        intellect: `${this.intellect}`,
        wisdom: `${this.wisdom}`,
        charisma: `${this.charisma}`,
        dexterity: `${this.dexterity}`,
        constitution: `${this.constitution}`,
        strength: `${this.strength}`,
        free_ability_pts: `${this.free_ability_pts}`,
        speed: `${this.speed}`,
        hitDice: `${this.hitDice}`,
        hp: `${this.hp}`,
        background: `${this.background}`,
        alignment: `${this.alignment}`
  
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    this.showCharacter(data)
  })}
  
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
  <input type="submit" value="Update Character" id="update-char">
  
</form>
    `
    this.updateChar();
    
}

updateChar(){
  let updateButton = document.querySelector('#update-char');
  updateButton.addEventListener("click", () => this.postCharUpdate.call(this))
  return updateButton;
}

postCharUpdate(){
  // debugger
  // let playerid = document.querySelector('#main').querySelector('div').id.split('-')[1];
  let playerid = this.player;
  console.log(`player id is ${player}`);
    debugger
    fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${this.id}`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }, 
    method: "PATCH",
    body: JSON.stringify(
      {
        
        name: document.querySelector("#charNameForm").value ,
        charClass: document.querySelector("#charClassForm").value  ,
        background: document.querySelector("#charBackgroundForm").value ,
        player_name: document.querySelector("#playerNameForm").value ,
        race: document.querySelector("#charFormRace").value  ,
        alignment: document.querySelector("#charAlignmentForm").value  ,
        xp: document.querySelector("#experiencepoints").value  , 
        strength: document.querySelector("#Strengthscore").value ,     
        dexterity: document.querySelector("#Dexterityscore").value ,
        constitution: document.querySelector("#Constitutionscore").value ,
        wisdom: document.querySelector("#Wisdomscore").value ,
        intellect: document.querySelector("#Intelligencescore").value ,
        charisma: document.querySelector("#Charismascore").value ,
        strength_save: document.querySelector("#str-save").value , 
        strength_save_check: document.querySelector("#str-save-prof").value ,  
        dex_save: document.querySelector("#dex-save").value ,
        dex_save_check: document.querySelector("#str-save-check").value ,
        const_save: document.querySelector("#const-save").value ,
        const_save_check: document.querySelector("#const-save-check").value , 
        wis_save: document.querySelector("#wis-save").value ,
        wis_save_check: document.querySelector("#wis-save-check").value ,
        intellect_save: document.querySelector("#int-save").value ,
        intellect_save_check:document.querySelector("#int-save-check").value ,
        char_save: document.querySelector("#char-save").value ,
        char_save_check: document.querySelector("#char-save-check").value ,
        acrobatics: document.querySelector("#acrobatics").value ,
        acrobatics_check: document.querySelector("#acrobatics-check").value ,
        animal: document.querySelector("#animal").value ,
        animal_check: document.querySelector("#animal-check").value ,
        arcana: document.querySelector("#arcana").value ,
        arcana_check: document.querySelector("#arcana-check").value ,
        athletic: document.querySelector("#athletic").value ,
        athletic_check: document.querySelector("#athletic-check").value , 
        deception: document.querySelector("#deception").value ,
        deception_check: document.querySelector("#decept-check").value , 
        history: document.querySelector("#hist").value ,
        history_check:  document.querySelector("#hist-check").value ,
        insight: document.querySelector("#insight").value ,
        insight_check: document.querySelector("#insight-check").value ,
        intimidation: document.querySelector("#intimidate").value ,
        intimidation_check: document.querySelector("#intimidate-check").value  , 
        investigation: document.querySelector("#investigate").value ,
        investigation_check: document.querySelector("#investigate-check").value ,
        medicine: document.querySelector("#med").value ,
        medicine_check: document.querySelector("#med-check").value ,
        nature: document.querySelector("#nature").value ,
        nature_check: document.querySelector("nature-check").value ,  
        perception: document.querySelector("#percept").value ,
        perception_check: document.querySelector("#percept-check").value ,
        performance: document.querySelector("#perform").value ,
        performance_check: document.querySelector("#perform-check").value ,
        persuasion: document.querySelector("#persuade").value ,
        persuasion_check: document.querySelector("#persuade-check").value ,
        religion: document.querySelector("#relig").value ,
        religion_check: document.querySelector("#relig-check").value ,  
        sleight_of_hand: document.querySelector("#soh").value ,
        soh_check: document.querySelector("#soh-check").value ,
        stealth: document.querySelector("#stealth").value ,
        stealth_check: document.querySelector("#stealth-check").value ,
        survival: document.querySelector("#survival").value ,
        survival_check: document.querySelector("#survival-check").value ,
        proficiencybonus: document.querySelector("#proficiencybonus").value ,
        passive_perception: document.querySelector("#passiveperception").value ,
        languages_and_proficiencies: document.querySelector("#proficiencies_and_languages").value ,
        armor_class: document.querySelector("#ac").value ,
        initiative: document.querySelector("#initiative").value ,
        speed: document.querySelector("#speed").value ,
        hp: document.querySelector("#hp").value ,
        currenthp: document.querySelector("#currenthp").value ,
        temphp: document.querySelector("#temphp").value ,
        hitDice: document.querySelector("#hitDice").value ,
        attacks_and_spells: document.querySelector("#attacks_and_spellcasting").value ,
        equipment: document.querySelector("#equipment").value ,
        personality_traits: document.querySelector("#personality").value ,
        ideals: document.querySelector("#ideals").value ,
        bonds: document.querySelector("#bonds").value ,
        flaws: document.querySelector("#flaws").value ,
        features_and_traits: document.querySelector("#features_and_traits").value 
    }
  ) 
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    this.showCharacter(data)
  })
  
})}

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