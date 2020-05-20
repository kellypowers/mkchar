const main = document.querySelector("#main");

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
  createNewPlayer();
}

function getPlayers() {
    return fetch(baseUrl).then(res => res.json()).then(players => {
        players.forEach(player => renderPlayerList(player))
    })
}
function renderPlayerList(data) {
    const listPlayers = document.getElementById('list-player-names');
    let li = document.createElement('li');
    li.id = `${data.id}`
    li.innerHTML = `${data.player_name}`;
    li.addEventListener("click", renderPlayerInfo );
    document.querySelector('#input-new-playername').value = "";
    listPlayers.appendChild(li);
}

function createNewPlayer(){
    let newPlayerButton = document.querySelector('#playername-submit');
    newPlayerButton.addEventListener("click", getNewPlayer);
}
// EVENT LISTENER FOR ADDING NEW PLAYER, POSTS PLAYER NAME TO BACKEND, RENDERS LIST OF PLAYERS WITH NEW PLAYER ADDED.
function getNewPlayer(e){
    const input = document.querySelector('#input-new-playername').value;
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/players", {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        player_name: `${input}`
    })
})
.then(response => response.json())
.then(data => {
    renderPlayerDiv();

})


}


function renderPlayerInfo(e) {
    main.innerHTML = `    <div id="playerinfo">
    
    </div> <div id="characterform"></div>`
    getOldPlayer(e).then(obj => {
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

//GET PLAYER THAT ALREADY EXISTS
function getOldPlayer(e){
    // debugger
    return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
.then(response => response.json())
}

//RENDER FORM TO ADD NEW CHARACTER TO THE PLAYER
function renderNewCharForm(){
    document.querySelector("#characterform").innerHTML =`
<div id="new-char">
    <h1>character App</h1>
    <div class="new-character-container">
        <form id="new-character-form" >
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

  newChar();
}

function newChar(){
    const newCharSubmit = document.querySelector('#newchar-submit');
    newCharSubmit.addEventListener("click", createChar)
}

// EVENT LSITENER CALLBACK TO CREATE A NEW CHARACTER WITH INPUT OF NAME, RACE, CLASS. CREATES NEW INSTANCE OF CHARACTER CLASS AND ASSIGNS ABILITY SCORES.
// instantiate char class
  function createChar(e) {
    e.preventDefault();
    console.log("in createChar fun");
    const charBackgroundInput = document.querySelector('#new-char-background').value;
    const charClassInput = document.querySelector('#new-char-class').value;
    console.log(`char class c ${charClassInput}`);
    const raceInput = document.querySelector('#new-char-race').value;
    const nameInput = document.querySelector('#new-char-name').value;
    // let charNew = new Character(`${nameInput}`, `${raceInput}`, `${charClassInput}`);
    let charNew = new Character(`${nameInput}`, `${raceInput}`, `${charClassInput}`, `${charBackgroundInput}`);
    // console.log(`${charNew}`);
    let playerid = document.querySelector('#playerinfo').querySelector('div').id.split('-')[1];
    console.log(`newchar is ${charNew}`);
    fetch(`http://localhost:3000/api/v1/players/${playerid}/characters`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        playerID: `${playerid}`,
        name: `${charNew.name}`,
        race: `${charNew.race}`,
        charClass: `${charNew.charClass}`,
        intellect: `${charNew.intellect}`,
        wisdom: `${charNew.wisdom}`,
        charisma: `${charNew.charisma}`,
        dexterity: `${charNew.dexterity}`,
        constitution: `${charNew.constitution}`,
        strength: `${charNew.strength}`,
        free_ability_pts: `${charNew.free_ability_pts}`,
        speed: `${charNew.speed}`,
        hitDice: `${charNew.hitDice}`,
        hp: `${charNew.hp}`,
        background: `${charNew.background}`,
        alignment: `${charNew.alignment}`,
        xp: 0,
        equipment: `${charNew.equipment}`,
        attacks_and_spellcasting: `${charNew.attacks_and_spells}`
        

    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    let list = document.querySelector('ul');
    let eachCharDiv = document.createElement('div');
    eachCharDiv.id = `char-${data.id}`;
    let charItem = document.createElement('li');
    charItem.innerHTML = `Character Name: ${data.name}, Race: ${data.race}, Class: ${data.charClass}`;
    charItem.id = `character-${data.id}`;
    charItem.addEventListener("click", showCharacter);
    eachCharDiv.appendChild(charItem);
    list.appendChild(eachCharDiv)

    renderCharacter(data);
})
}


// }
// delete player WORKS. deletes player and renders the player list, the deleted player removed!
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
        renderPlayerDiv();
        let deletedListItm = document.getElementById(`${data.playerId}`);
        deletedListItm.remove();
        })
}
function showCharacter(e){
    
    // console.log(e);
    let playerid = document.querySelector('#main').querySelector('div').querySelector('div').id.split('-')[1];
    // let playerid = e.target.parentElement.parentElement.parentElement.id.split('-')[1]
    let characterid = e.target.id.split('-')[1];
    // let characterid = document.querySelector('form').id.split('-')[1];
    // console.log(`jfsajsdk id is ${(e.target.parentElement.parentElement.parentElement.id.split('-')[1])}`);
    return fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${characterid}`)
.then(response => response.json())
.then(obj => {
  console.log(`${JSON.stringify(obj)}`);
    renderCharacter(obj)
})}


function renderCharacter(obj){
    document.querySelector("#characterform").innerHTML = `
    <form id="charsheet-${obj.id}" class="charsheet">
  <header>
    <!-- can i set the character then call is with character.name etc? or is it all done in js file? -->
    <section class="charname" ">
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
          <label for="playername">Player Name</label><input id="playerNameForm" name="playername" value="${document.querySelector('h2').innerHTML.split(' ')[0].slice(0, -2)}">
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
                <label for="Strength-save">Strength</label><input  value="${obj.strength_save}" id="str-save" name="Strength-save" type="text" /><input id="str-save-prof"  ${obj.strength_save_check ? "checked" : ""} name="Strength-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Dexterity-save">Dexterity</label><input  value="${obj.dex_save}" id="dex-save" name="Dexterity-save" type="text" /><input id="dex-save-check"  ${obj.dex_save_check ? "checked" : ""} name="Dexterity-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Constitution-save">Constitution</label><input id="const-save" value="${obj.const_save}" name="const-save" type="text" /><input id="const-save-check"  ${obj.const_save_check ? "checked" : ""}" name="Constitution-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Wisdom-save">Wisdom</label><input id="wis-save" value="${obj.wis_save}"  name="Wisdom-save" type="text" /><input name="Wisdom-save-prof"  ${obj.wis_save_check ? "checked" : ""} id="wis-save-check" type="checkbox" />
              </li>
              <li>
                <label for="Intelligence-save">Intelligence</label><input  value="${obj.intellect_save}" id="int-save" name="Intelligence-save" type="text" /><input  ${obj.intellect_save_check ? "checked" : ""} id="int-save-check" name="Intelligence-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Charisma-save">Charisma</label><input id="char-save" value="${obj.char_save}"  name="Charisma-save" type="text" /><input id="char-save-check"  ${obj.char_save_check ? "checked" : ""} name="Charisma-save-prof" type="checkbox" />
              </li>
            </ul>
            <div class="label">
              Saving Throws
            </div>
          </div>
          <div class="skills list-section box">
            <ul>
              <li>
                <label for="Acrobatics">Acrobatics <span class="skill">(Dex)</span></label><input value=${obj.acrobatics}  id="acrobatics" name="Acrobatics" type="text" /><input  ${obj.acrobatics_check ? "checked" : ""} id="acrobatics-check" name="Acrobatics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Animal Handling">Animal Handling <span class="skill">(Wis)</span></label><input value="${obj.animal}"  id="animal" name="Animal Handling" type="text" /><input  ${obj.animal_check ? "checked" : ""} id="animal-check" name="Animal Handling-prof" type="checkbox" />
              </li>
              <li>
                <label for="Arcana">Arcana <span class="skill">(Int)</span></label><input id="arcana" value="${obj.arcana}"  name="Arcana" type="text" /><input id="arcana-check"  ${obj.arcana_check ? "checked" : ""} name="Arcana-prof" type="checkbox" />
              </li>
              <li>
                <label for="Athletics">Athletics <span class="skill">(Str)</span></label><input  value="${obj.athletic}" id="athletic" name="Athletics" type="text" /><input  ${obj.athletic_check ? "checked" : ""} id="athletic-check" name="Athletics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Deception">Deception <span class="skill">(Cha)</span></label><input id="deception" value="${obj.deception}"  name="Deception" type="text" /><input id="decept-check"  ${obj.deception_check ? "checked" : ""} name="Deception-prof" type="checkbox" />
              </li>
              <li>
                <label for="History">History <span class="skill">(Int)</span></label><input id="hist" value="${obj.history}"  name="History" type="text" /><input id="hist-check" ${obj.history_check ? "checked" : ""} name="History-prof" type="checkbox" />
              </li>
              <li>
                <label for="Insight">Insight <span class="skill">(Wis)</span></label><input id="insight" value="${obj.insight}"  name="Insight" type="text" /><input id="insight-check" ${obj.insight_check ? "checked" : ""}  name="Insight-prof" type="checkbox" />
              </li>
              <li>
                <label for="Intimidation">Intimidation <span class="skill">(Cha)</span></label><input id="intimidate" value="${obj.intimidation}"  name="Intimidation" type="text" /><input id="intimidate-check"  ${obj.intimidation_check ? "checked" : ""} name="Intimidation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Investigation">Investigation <span class="skill">(Int)</span></label><input id="investigate"  value="${obj.investigation}" name="Investigation" type="text" /><input id="investigate-check"  ${obj.investigation_check ? "checked" : ""} name="Investigation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Medicine">Medicine <span class="skill">(Wis)</span></label><input id="med" name="Medicine" value="${obj.medicine}"  type="text" /><input id="med-check"  ${obj.medicine_check ? "checked" : ""} name="Medicine-prof" type="checkbox" />
              </li>
              <li>
                <label for="Nature">Nature <span class="skill">(Int)</span></label><input id="nature" name="Nature"  value="${obj.nature}" type="text" /><input id="nature-check"  ${obj.nature_check ? "checked" : ""} name="Nature-prof" type="checkbox" />
              </li>
              <li>
                <label for="Perception">Perception <span class="skill">(Wis)</span></label><input id="percept" name="Perception" value="${obj.perception}"  type="text" /><input id="percept-check"  ${obj.perception_check ? "checked" : ""} name="Perception-prof" type="checkbox" />
              </li>
              <li>
                <label for="Performance">Performance <span class="skill">(Cha)</span></label><input id="perform" name="Performance"  value="${obj.performance}" type="text" /><input id="perform-check" ${obj.performance_check ? "checked" : ""}  name="Performance-prof" type="checkbox" />
              </li>
              <li>
                <label for="Persuasion">Persuasion <span class="skill">(Cha)</span></label><input id="persuade" name="Persuasion"  value="${obj.persuasion}" type="text" /><input id="persuade-check"  ${obj.persuasion_check ? "checked" : ""} name="Persuasion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Religion">Religion <span class="skill">(Int)</span></label><input id="relig" name="Religion"  value="${obj.religion}" type="text" /><input id="relig-check"  ${obj.religion_check ? "checked" : ""} name="Religion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Sleight of Hand">Sleight of Hand <span class="skill">(Dex)</span></label><input id="soh"  value="${obj.sleight_of_hand}" name="Sleight of Hand" type="text" /><input id="soh-check"  ${obj.soh_check ? "checked" : ""} name="Sleight of Hand-prof" type="checkbox" />
              </li>
              <li>
                <label for="Stealth">Stealth <span class="skill">(Dex)</span></label><input id="stealth" name="Stealth"  value="${obj.stealth}" type="text" /><input id="stealth-check" name="Stealth-prof" ${obj.stealth_check ? "checked" : ""}  type="checkbox" />
              </li>
              <li>
                <label for="Survival">Survival <span class="skill">(Wis)</span></label><input id="survival"  value="${obj.survival}" name="Survival" type="text" /><input id="survival-check"  ${obj.survival_check ? "checked" : ""} name="Survival-prof" type="checkbox" />
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
            <label for="temphp">Temporary Hit Points</label><input name="temphp" id="temphp" value="" type="text" />
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
          <label for="personality">Personality</label><input type="textarea" id="personality"  value="${obj.personality_traits}" name="personality"></input>
        </div>
        <div class="ideals">
          <label for="ideals">Ideals</label><input type="textarea" id="ideals" value="${obj.ideals}"  name="ideals"></input>
        </div>
        <div class="bonds">
          <label for="bonds">Bonds</label><input type="textarea" id="bonds" value="${obj.bonds}"  name="bonds"></input>
        </div>
        <div class="flaws">
          <label for="flaws">Flaws</label><input type="textarea" id="flaws" value="${obj.flaws}"  name="flaws"></input>
        </div>
      </section>
      <section class="features">
        <div>
          <label for="features">Features & Traits</label><input type="textarea" id="features_and_traits"  value="${obj.features_and_traits}" name="features"></input>
        </div>
      </section>
    </section>
  </main>
  <input type="submit" value="Update Character" id="update-char">
  
</form>
<input id="delete-char" value="Delete Character" type="submit">
    `
    updateChar();
    deleteChar();
}

function deleteChar() {
    let deleteCharButton = document.querySelector('#delete-char');
    deleteCharButton.addEventListener("click", deleteCharacter)
}

function deleteCharacter(e){
    e.preventDefault();
    let playerid = document.querySelector('#main').querySelector('div').querySelector('div').id.split('-')[1]
    let characterid = document.querySelector('form').id.split('-')[1];
    return fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${characterid}`, {
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }, 
      method: "DELETE",
      body: JSON.stringify({
          characterID: `${characterid}`,
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    document.getElementById(`char-${data.characterId}`).remove();
    document.querySelector('form').remove();
    document.querySelector('#delete-char').remove();
    })
}




function updateChar(){
    let updateButton = document.querySelector('#update-char');
    updateButton.addEventListener("click", postCharUpdate)
    return updateButton;
  }
  
function postCharUpdate(e){
    e.preventDefault();
    let playerid = document.querySelector('#main').querySelector('div').querySelector('div').id.split('-')[1]
    let characterid = document.querySelector('form').id.split('-')[1];
      return fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${characterid}`, {
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }, 
      method: "PATCH",
      body: JSON.stringify({
          
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
          strength_save_check: document.querySelector("#str-save-prof").checked ,  
          dex_save: document.querySelector("#dex-save").value ,
          dex_save_check: document.querySelector("#str-save-check").checked ,
          const_save: document.querySelector("#const-save").value ,
          const_save_check: document.querySelector("#const-save-check").checked , 
          wis_save: document.querySelector("#wis-save").value ,
          wis_save_check: document.querySelector("#wis-save-check").checked ,
          intellect_save: document.querySelector("#int-save").value ,
          intellect_save_check:document.querySelector("#int-save-check").checked ,
          char_save: document.querySelector("#char-save").value ,
          char_save_check: document.querySelector("#char-save-check").checked ,
          acrobatics: document.querySelector("#acrobatics").value ,
          acrobatics_check: document.querySelector("#acrobatics-check").checked,
          animal: document.querySelector("#animal").value ,
          animal_check: document.querySelector("#animal-check").checked ,
          arcana: document.querySelector("#arcana").value ,
          arcana_check: document.querySelector("#arcana-check").checked ,
          athletic: document.querySelector("#athletic").value ,
          athletic_check: document.querySelector("#athletic-check").checked , 
          deception: document.querySelector("#deception").value ,
          deception_check: document.querySelector("#decept-check").checked , 
          history: document.querySelector("#hist").value ,
          history_check:  document.querySelector("#hist-check").checked ,
          insight: document.querySelector("#insight").value ,
          insight_check: document.querySelector("#insight-check").checked ,
          intimidation: document.querySelector("#intimidate").value ,
          intimidation_check: document.querySelector("#intimidate-check").checked  , 
          investigation: document.querySelector("#investigate").value ,
          investigation_check: document.querySelector("#investigate-check").checked ,
          medicine: document.querySelector("#med").value ,
          medicine_check: document.querySelector("#med-check").checked ,
          nature: document.querySelector("#nature").value ,
          nature_check: document.querySelector("nature-check").checked ,  
          perception: document.querySelector("#percept").value ,
          perception_check: document.querySelector("#percept-check").checked ,
          performance: document.querySelector("#perform").value ,
          performance_check: document.querySelector("#perform-check").checked ,
          persuasion: document.querySelector("#persuade").value ,
          persuasion_check: document.querySelector("#persuade-check").checked ,
          religion: document.querySelector("#relig").value ,
          religion_check: document.querySelector("#relig-check").checked ,  
          sleight_of_hand: document.querySelector("#soh").value ,
          soh_check: document.querySelector("#soh-check").checked ,
          stealth: document.querySelector("#stealth").value ,
          stealth_check: document.querySelector("#stealth-check").checked ,
          survival: document.querySelector("#survival").value ,
          survival_check: document.querySelector("#survival-check").checked ,
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
      }).then(response => response.json())
    .then(data => console.log(data)
    //    renderCharacter(data)
    // renderCharacter(data)
    // }).catch(function(error) {
    //     console.log(error.message);
    //   });`
    )
 }
  
  