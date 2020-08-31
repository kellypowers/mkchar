//line 28 GET ALL PLAYERS
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



 newt = new Character("newt", "Elf", "Bard", "Criminal")
Character {dexterity: 11, constitution: 8, wisdom: 9, intellect: 12, charisma: 5, …}
alignment: "Chaotic G/E"
attacks_and_spells: ""
background: "Criminal"
bonds: ""
charClass: "Bard"
charisma: 5
constitution: 8
dexterity: 11
equipment: ""
features_and_traits: ""
flaws: ""
free_ability_pts: 0
hitDice: "1d8"
hp: 4
id: undefined
ideals: ""
intellect: 12
language: 2
name: "newt"
personality_traits: ""
player: undefined
proficiencies: 1
race: "Elf"
saving_throws: (2) ["Dexterity", "Charisma"]0: "Dexterity"1: "Charisma"length: 2__proto__: Array(0)
speed: 30
strength: 10
wisdom: 9
__proto__: Background


function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

<input type="button" onclick="printDiv('characterform')" value="Print" />


let players = fetch(baseUrl).then(res => res.json()).then(players => {
    console.log(players)})
(12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {id: 1, player_name: "Kelly", characters: Array(10)}
1: {id: 2, player_name: "Erin", characters: Array(1)}
2: {id: 3, player_name: "Alyse", characters: Array(1)}
3: {id: 4, player_name: "John", characters: Array(1)}
4: {id: 24, player_name: "blah", characters: Array(0)}
5: {id: 26, player_name: "cdcd", characters: Array(6)}
6: {id: 29, player_name: "123", characters: Array(0)}
7: {id: 32, player_name: "newplayer", characters: Array(1)}
8: {id: 36, player_name: "kellypwoers", characters: Array(0)}
9: {id: 47, player_name: "kellypowers", characters: Array(1)}
10: {id: 48, player_name: "morgan", characters: Array(4)}
11: {id: 51, player_name: "Juan", characters: Array(0)}


fetch(baseUrl).then(res => res.json()).then(players => {
    players.sort(function(a, b){
      console.log("a is " + `${JSON.stringify(a)}`);
      console.log("b is " + `${JSON.stringify(b)}`);
      return a-b});})
Promise {<pending>}
VM13697:3 a is {"id":2,"player_name":"Erin","characters":[{"id":4,"name":"Charlie","charClass":"Bard","race":"Halfling"}]}
VM13697:4 b is {"id":1,"player_name":"Kelly","characters":[{"id":2,"name":"Auriga","charClass":"Warrior","race":"Dwarf"},{"id":3,"name":"KP","charClass":"Druid","race":"Half-Elf"},{"id":7,"name":"yep","charClass":"Dwarf","race":"Barbarian"},{"id":8,"name":"new","charClass":"Half-Elf","race":"Cleric"},{"id":9,"name":"hello","charClass":"Half-Orc","race":"Paladin"},{"id":10,"name":"leena","charClass":"Half-Orc","race":"Barbarian"},{"id":11,"name":"hkjk","charClass":"Dwarf","race":"Barbarian"},{"id":20,"name":"yep","charClass":"Barbarian","race":"Dwarf"},{"id":37,"name":"new!","charClass":"Barbarian","race":"Dwarf"},{"id":35,"name":"yep yep yep","charClass":"Barbarian/1","race":"Dwarf"}]}
VM13697:3 a is {"id":3,"player_name":"Alyse","characters":[{"id":6,"name":"Mucca","charClass":"Barbarian","race":"Half-Orc"}]}
VM13697:4 b is {"id":2,"player_name":"Erin","characters":[{"id":4,"name":"Charlie","charClass":"Bard","race":"Halfling"}]}
VM13697:3 a is {"id":4,"player_name":"John","characters":[{"id":5,"name":"Leena","charClass":"Fighter","race":"Dragonborn"}]}
VM13697:4 b is {"id":3,"player_name":"Alyse","characters":[{"id":6,"name":"Mucca","charClass":"Barbarian","race":"Half-Orc"}]}
VM13697:3 a is {"id":24,"player_name":"blah","characters":[]}
VM13697:4 b is {"id":4,"player_name":"John","characters":[{"id":5,"name":"Leena","charClass":"Fighter","race":"Dragonborn"}]}
VM13697:3 a is {"id":26,"player_name":"cdcd","characters":[{"id":22,"name":"yep","charClass":"Barbarian","race":"Dwarf"},{"id":23,"name":"yep yep yep","charClass":"Barbarian","race":"Dwarf"},{"id":24,"name":"sup","charClass":"Barbarian","race":"Dwarf"},{"id":25,"name":"yep","charClass":"Barbarian","race":"Dwarf"},{"id":26,"name":"yep yep yep","charClass":"Cleric","race":"Halfling"},{"id":27,"name":"dsadas","charClass":"Barbarian","race":"Dwarf"}]}
VM13697:4 b is {"id":24,"player_name":"blah","characters":[]}
VM13697:3 a is {"id":29,"player_name":"123","characters":[]}
VM13697:4 b is {"id":26,"player_name":"cdcd","characters":[{"id":22,"name":"yep","charClass":"Barbarian","race":"Dwarf"},{"id":23,"name":"yep yep yep","charClass":"Barbarian","race":"Dwarf"},{"id":24,"name":"sup","charClass":"Barbarian","race":"Dwarf"},{"id":25,"name":"yep","charClass":"Barbarian","race":"Dwarf"},{"id":26,"name":"yep yep yep","charClass":"Cleric","race":"Halfling"},{"id":27,"name":"dsadas","charClass":"Barbarian","race":"Dwarf"}]}
VM13697:3 a is {"id":32,"player_name":"newplayer","characters":[{"id":38,"name":"Kelly","charClass":"Paladin/1","race":"Dragonborn"}]}
VM13697:4 b is {"id":29,"player_name":"123","characters":[]}
VM13697:3 a is {"id":36,"player_name":"kellypwoers","characters":[]}
VM13697:4 b is {"id":32,"player_name":"newplayer","characters":[{"id":38,"name":"Kelly","charClass":"Paladin/1","race":"Dragonborn"}]}
VM13697:3 a is {"id":47,"player_name":"kellypowers","characters":[{"id":40,"name":"kellyschar","charClass":"Fighter/1","race":"Human"}]}
VM13697:4 b is {"id":36,"player_name":"kellypwoers","characters":[]}
VM13697:3 a is {"id":48,"player_name":"morgan","characters":[{"id":44,"name":"rtth","charClass":"Barbarian","race":"Dwarf"},{"id":43,"name":"dwadwadw","charClass":"Barbarian/1/1","race":"Dwarf"},{"id":45,"name":"new!","charClass":"Barbarian/1","race":"Dwarf"},{"id":42,"name":"morganschar","charClass":"Druid","race":"Dragonborn"}]}
VM13697:4 b is {"id":47,"player_name":"kellypowers","characters":[{"id":40,"name":"kellyschar","charClass":"Fighter/1","race":"Human"}]}
VM13697:3 a is {"id":51,"player_name":"Juan","characters":[]}
VM13697:4 b is {"id":48,"player_name":"morgan","characters":[{"id":44,"name":"rtth","charClass":"Barbarian","race":"Dwarf"},{"id":43,"name":"dwadwadw","charClass":"Barbarian/1/1","race":"Dwarf"},{"id":45,"name":"new!","charClass":"Barbarian/1","race":"Dwarf"},{"id":42,"name":"morganschar","charClass":"Druid","race":"Dragonborn"}]}


fetch(baseUrl).then(res => res.json()).then(players => {
    players.sort(function(a, b){
      console.log("a is " + a.player_name);
      console.log("b is " + b.player_name);
      return a.player_name-b.player_name});})

    
Promise {<pending>}
VM14421:3 a is Erin
VM14421:4 b is Kelly
VM14421:3 a is Alyse
VM14421:4 b is Erin
VM14421:3 a is John
VM14421:4 b is Alyse
VM14421:3 a is blah
VM14421:4 b is John
VM14421:3 a is cdcd
VM14421:4 b is blah
VM14421:3 a is 123
VM14421:4 b is cdcd
VM14421:3 a is newplayer
VM14421:4 b is 123
VM14421:3 a is kellypwoers
VM14421:4 b is newplayer
VM14421:3 a is kellypowers
VM14421:4 b is kellypwoers
VM14421:3 a is morgan
VM14421:4 b is kellypowers
VM14421:3 a is Juan
VM14421:4 b is morgan