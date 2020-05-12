const main = document.querySelector("#main");
// const modal = document.querySelector('#modal')
// const playerSelect = document.getElementById('playername');
// const charContainer = document.getElementById('characters-container');
// const playerInfo = document.getElementById('playerinfo');
// const charSheet = document.getElementById('charsheet');
// const input = document.querySelector('#input-new-playername').value;
let baseUrl = "http://localhost:3000/api/v1/players"

// document.addEventListener("DOMContentLoaded", function(){
//     renderPlayerDiv();
//     getPlayers();
// })

renderPlayerDiv();


function renderPlayerDiv(){
    main.innerHTML = `  

  <div id="playername">
    <!-- <form> -->
      <label>Enter or select your name:</label> <br>
      <ul id="list-player-names">
  
      </ul>
      <form id="form-new-playername">
      <input type="text" id="input-new-playername" value=""> 
      <button type="submit" id="playername-submit">Enter</button>
    </form>
  </div>`
  getPlayers();
}

function getPlayers() {
    return fetch(baseUrl).then(res => res.json()).then(players => {
         console.log(players);
        players.forEach(player => render(player))
    })
}

function render(data) {
    const listPlayers = document.getElementById('list-player-names');
    let li = document.createElement('li');
    li.id = `${data.id}`
    li.innerHTML = `${data.player_name}`;
    li.addEventListener("click", renderPlayerInfo );
    document.querySelector('#input-new-playername').value = "";
    listPlayers.appendChild(li);
}

function renderPlayerInfo(players) {
    main.innerHTML = `    <div id="playerinfo">
    
    </div>`
    getOldPlayer(players).then(obj => {
        console.log(obj);
        const playerInfo = document.getElementById('playerinfo');
    let playerHeading = document.createElement('h2');
    let eachPlayerDiv = document.createElement('div');
    let newCharButton = document.createElement("button");
    newCharButton.innerText = "Create New Character";
    newCharButton.addEventListener("click", renderNewCharForm)

    eachPlayerDiv.id = `player-${obj.id}`

    let playerDeleteButton = document.createElement('button');
    playerDeleteButton.innerText = "Delete Player"
    playerDeleteButton.addEventListener("click", deletePlayer);
    eachPlayerDiv.appendChild(playerDeleteButton);

    playerHeading.innerHTML = `${obj.player_name}'s characters`;
    let charList = document.createElement('ul');
    obj.characters.forEach (character => {
        // console.log(`character is ${JSON.stringify(character)}`)
        let eachCharDiv = document.createElement('div');
        eachCharDiv.id = `char-${character.id}`;
        let charItem = document.createElement('li');
        charItem.innerHTML = `Character Name: ${character.name}, Race: ${character.race}, Class: ${character.charClass}`;
        charItem.id = `character-${character.id}`;
        charItem.addEventListener("click", showCharacter);
        eachCharDiv.appendChild(charItem);

        charList.appendChild(eachCharDiv);
        // add event listener to click to view, in view add buttons to edit and to delete
        // add delete button and edit button
    });

    changePlayerButton = document.createElement('button');
    changePlayerButton.innerText = "Change Player";
    changePlayerButton.id = "change-player-button";
    changePlayerButton.addEventListener("click", renderPlayerDiv);
    eachPlayerDiv.appendChild(changePlayerButton);

    eachPlayerDiv.appendChild(newCharButton);
    eachPlayerDiv.appendChild(playerHeading);
    eachPlayerDiv.appendChild(charList);
    playerInfo.appendChild(eachPlayerDiv);
    
    })
}

function getOldPlayer(e){
    return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
.then(response => response.json())
}

function renderNewCharForm(){
    document.querySelector("#main").innerHTML =`
<div id="new-char">
    <h1>character App</h1>
    <div class="new-character-container">
        <form id="new-character-form" class="hidden">
          <label for="name">Pick a Name </label>
          <input type="text" id="new-char-name" />

          <label for="race">Choose a Class:</label>

          <select id="new-char-race">
            <option value="Dwarf">Dwarf</option>
            <option value="Elf">Elf</option>
            <option value="Halfling">Halfling</option>
            <option value="Human">Human</option>
            <option value="Dragonborn">Dragonborn</option>
            <option value="Gnome">Gnome</option>
            <option value="Half-Elf">Half-Elf</option>
            <option value="Half-Orc">Half-Orc</option>
            <option value="Tiefling">Tiefling</option>
          </select>

          <label for="class">Choose a race:</label>
          <select id="new-char-class">
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
        </select>
        <label for="background">Choose a Background:</label>
          <select id="new-char-background">
            <option value="Acolyte">Acolyte</option>
            <option value="Charlatan">Charlatan</option>
            <option value="Criminal">Criminal</option>
            <option value="Entertainer">Entertainer</option>
            <option value="Guild Artisan">Guild Artisan</option>
            <option value="Hermit">Hermit</option>
            <option value="Noble">Noble</option>
            <option value="Outlander">Outlander</option>
            <option value="Sage">Sage</option>
            <option value="Sailor">Sailor</option>
            <option value="Soldier">Soldier</option>
            <option value="Urchin">Urchin</option>
        </select>

            <input id="newchar-submit" type="submit" />
        </form>
    </div>  
  </div>
  <div id="characters-container">

  </div>`
}

function deletePlayer(e) {
    let playerid = e.target.parentElement.id.split('-')[1]
    console.log(`id is ${playerid}`);
    fetch(`http://localhost:3000/api/v1/players/${playerid}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify({
            playerID: `${playerid}`,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        playerSelect.hidden=false;
        playerInfo.hidden = true;
        let deletedListItm = document.getElementById(`${data.playerId}`);
        deletedListItm.remove();
        })
}

function showCharacter(e){
    
    // console.log(e);
    let playerid = e.target.parentElement.parentElement.parentElement.id.split('-')[1]
    let characterid = e.target.id.split('-')[1];
    // console.log(`jfsajsdk id is ${(e.target.parentElement.parentElement.parentElement.id.split('-')[1])}`);
    return fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${characterid}`)
.then(response => response.json())
.then(obj => {
  console.log(`${JSON.stringify(obj)}`);
    renderCharacter(obj)
})}

function renderCharacter(obj){
    document.querySelector("#main").innerHTML = `
    <form id="charsheet" class="charsheet">
  <header>
    <!-- can i set the character then call is with character.name etc? or is it all done in js file? -->
    <section class="charname">
      <label for="charname">Character Name</label><input id="charNameForm" name="charname" value="${obj.name}" />
    </section>
    <section class="misc">
      <ul>
        <li>
          <label for="classlevel">Class & Level</label><input id="charClassForm" name="classlevel" value="${obj.charClass}/1" />
        </li>
        <li>
          <label for="background">Background</label><input id="charBackgroundForm" name="background" value="${obj.background}" />
        </li>
        <li>
          <label for="playername">Player Name</label><input id="playerNameForm" name="playername" value="${obj.player.player_name}">
        </li>
        <li>
          <label for="race">Race</label><input name="race" id="charFormRace" value="${obj.race}" />
        </li>
        <li>
          <label for="alignment">Alignment</label><input id="charAlignmentForm" name="alignment" value="${obj.alignment}" />
        </li>
        <li>
          <label for="experiencepoints">Experience Points</label><input id="experiencepoints" name="experiencepoints" value="${obj.xp}" />
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
                <label for="Strengthscore">Strength</label><input id="Strengthscore"  name="Strengthscore" value="${obj.strength}" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Strengthmod" name="Strengthmod" value="${Math.floor((obj.strength - 10) / 2)}" class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Dexterityscore">Dexterity</label><input id="Dexterityscore" name="Dexterityscore" value="${obj.dexterity}" class="stat"/>
              </div>
              <div class="modifier">
                <input name="Dexteritymod" id="Dexteritymod" value="${Math.floor((obj.dexterity - 10) / 2)}" class=statmod/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Constitutionscore">Constitution</label><input id="Constitutionscore" name="Constitutionscore" value="${obj.constitution}" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Constitutionmod" name="Constitutionmod" value="${Math.floor((obj.constitution - 10) / 2)}" class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Wisdomscore">Wisdom</label><input name="Wisdomscore" value="${obj.wisdom}"  id="Wisdomscore" class="stat"/>
              </div>
              <div class="modifier">
                <input id="Wisdommod" value="${Math.floor((obj.wisdom - 10) / 2)}"  name="Wisdommod"  />
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Intelligencescore">Intelligence</label><input id="Intelligencescore" value="${obj.intellect}"  name="Intelligencescore"  class="stat"/>
              </div>
              <div class="modifier">
                <input id="Intelligencemod" name="Intelligencemod"  value="${Math.floor((obj.intellect - 10) / 2)}"  class="statmod"/>
              </div>
            </li>
            <li>
              <div class="score">
                <label for="Charismascore">Charisma</label><input id="Charismascore"  value="${obj.charisma}" name="Charismascore" class="stat"/>
              </div>
              <div class="modifier">
                <input name="Charismamod" id="Charismamod" value="${Math.floor((obj.charisma - 10) / 2)}"  class="statmod"/>
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
            <label for="speed">Speed</label><input id="speed" name="speed" value="${obj.speed}"   type="text" />
          </div>
        </div>
        <div class="hp">
          <div class="regular">
            <div class="max">
              <label for="maxhp">Hit Point Maximum</label><input id="hp" name="maxhp"   value="${obj.hp}" type="text" />
            </div>
            <div class="current">
              <label for="currenthp">Current Hit Points</label><input id="currenthp" name="currenthp" value="${obj.hp}"  type="text" />
            </div>
          </div>
          <div class="temporary">
            <label for="temphp">Temporary Hit Points</label><input name="temphp" id="temphp" value="${obj.temphp}" type="text" />
          </div>
        </div>
        <div class="hitdice">

              <label for="remaininghd">Hit Dice</label><input id="hitDice" name="remaininghd"  value="${obj.hitDice}" type="text" />
            </div>
          </div>
        </div>
        
        </div>
      </section>
      <section class="attacksandspellcasting">
        <div>
          <label>Attacks & Spellcasting</label>
          <input type="textarea" value="${obj.attacks_and_spells}"  id="attacks_and_spellcasting" >
          
        </div>
      </section>
      <section class="equipment">
        <div>
          <label>Equipment</label>
          <input type="textarea" value="${obj.equipment}"  id="equipment">
          
      </section>
    </section>
    <section>
      <section class="flavor">
        <div class="personality">
          <label for="personality">Personality</label><textarea id="personality"  value="${obj.personality_traits}" name="personality"></textarea>
        </div>
        <div class="ideals">
          <label for="ideals">Ideals</label><textarea id="ideals" value="${obj.ideals}"  name="ideals"></textarea>
        </div>
        <div class="bonds">
          <label for="bonds">Bonds</label><textarea id="bonds" value="${obj.bonds}"  name="bonds"></textarea>
        </div>
        <div class="flaws">
          <label for="flaws">Flaws</label><textarea id="flaws" value="${obj.flaws}"  name="flaws"></textarea>
        </div>
      </section>
      <section class="features">
        <div>
          <label for="features">Features & Traits</label><textarea id="features_and_traits"  value="${obj.features_and_traits}" name="features"></textarea>
        </div>
      </section>
    </section>
  </main>
</form>
    `
}