line 28 
function getPlayers() {
    return fetch(baseUrl).then(res => res.json()).then(players => {
        players.forEach(player => renderPlayerList(player))
    })
}

line 47
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

line 116
//GET PLAYER THAT ALREADY EXISTS
function getOldPlayer(e){
    // debugger
    return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
.then(response => response.json())
}

line 191
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

line 254
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

line 274
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

line 571

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

line 603
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
          strength_save_check: document.querySelector("#str-save-check").checked ,  
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
          nature_check: document.querySelector("#nature-check").checked ,  
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