// const app = new App()
const modal = document.querySelector('#modal')
const playerSelect = document.getElementById('playername');
const charContainer = document.getElementById('characters-container');
const playerInfo = document.getElementById('playerinfo');
const charSheet = document.getElementById('charsheet');
// const input = document.querySelector('#input-new-playername').value;
let baseUrl = "http://localhost:3000/api/v1/players"

charSheet.hidden = true;
 modal.hidden = true;
 

// show all players 
fetchAndLoadPlayers();

// function hideModal(){
//     modal.hidden = true
// }
// UNHIDE NEW CHAR SELECT OPTIONS
function unhideModal(){
    // charContainer.removeChild(charContainer.querySelector('div'));
    // charContainer.removeChild(charContainer.querySelector('ul'));
    // let changePlayerButton = document.querySelector('#change-player-button');
    // document.remove(changePlayerButton);

    // playerSelect.hidden = true;
    modal.hidden = false;
}

// for change player button, hides the current selected player and unhides the list of players
function unhidePlayer(e){
    // charContainer.removeChild(querySelector('div'));
    // charContainer.removeChild(charContainer.querySelector('ul'));
    // let changePlayerButton = document.querySelector('#change-player-button');
    // document.remove(changePlayerButton);

    playerSelect.hidden = false;
    e.target.parentElement.hidden = true;
    // modal.hidden = false;
}

// fetch all players
function getPlayers() {
    return fetch(baseUrl).then(res => res.json()) //.then(data => console.log(data))
}
// fetch and load
function fetchAndLoadPlayers() {
    getPlayers().then(players => {
        // console.log(players);
        players.forEach(player => render(player))
    })
}
function getCharacters(player) {
    let playerId = player.id;
    return fetch(baseUrl/`${playerId}`/characters).then(res => res.json()
    )
}
function fetchAndLoadCharacter() {
    getCharacters().then(players => {
        console.log(players);
        players.forEach(player => render(player))
    })
}




function render(data) {
    
    const listPlayers = document.getElementById('list-player-names');
    let li = document.createElement('li');
    li.id = `${data.id}`
    li.innerHTML = `${data.player_name}`;
    // let playerDeleteButton = document.createElement('button');
    // playerDeleteButton.id = ``
    // playerDeleteButton.addEventListener("click", deletePlayer);
    li.addEventListener("click", renderPlayerInfo );
    document.querySelector('#input-new-playername').value = "";
    listPlayers.appendChild(li);
}



// setPlayer(e){
//     this.adapter.getOldPlayer(e)
// }

function getOldPlayer(e){
    // console.log(e.target.id);
    return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
.then(response => response.json())
// .then(data => console.log(data))
    // renderPlayerInfo(data))
}

// click player name, remove the old players add change player button, show all charactes for that player
function renderPlayerInfo(players) {
    playerSelect.hidden = true;
    playerInfo.hidden = false;
    getOldPlayer(players).then(obj => {
        console.log(obj);
    // removeRenderedPlayers();
    // playerInfoDiv = document.getElementById('playerinfo');
    // let charContainer = document.getElementById('characters-container');
    let playerHeading = document.createElement('h2');
    let eachPlayerDiv = document.createElement('div');
    let newCharButton = document.createElement("button");
    newCharButton.innerText = "Create New Character";
    newCharButton.addEventListener("click", unhideModal)

    eachPlayerDiv.id = `player-${obj.id}`

    let playerDeleteButton = document.createElement('button');
    playerDeleteButton.innerText = "Delete Player"
    playerDeleteButton.addEventListener("click", deletePlayer);
    eachPlayerDiv.appendChild(playerDeleteButton);

    playerHeading.innerHTML = `${obj.player_name}'s characters`;
    // let eachCharDiv = document.createElement('div');
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
    changePlayerButton.addEventListener("click", unhidePlayer);
    eachPlayerDiv.appendChild(changePlayerButton);

    eachPlayerDiv.appendChild(newCharButton);
    eachPlayerDiv.appendChild(playerHeading);
    eachPlayerDiv.appendChild(charList);
    playerInfo.appendChild(eachPlayerDiv);
    // hideModal();
    modal.hidden = true;
    
})

}
// function removeRenderedPlayers()   {
//     playerSelect.hidden = true;
//     changePlayerButton = document.createElement('button');
//     changePlayerButton.innerText = "Change Player";
//     changePlayerButton.id = "change-player-button";
//     changePlayerButton.addEventListener("click", unhideModal);
//     const body = document.querySelector('body');
//     body.appendChild(changePlayerButton);
    

// }

// function fetchAndLoadCharacters() {
//     getCharacters().then(players => {
//         console.log(players);
//         players.forEach(player => render(player))
//     })
// }

// function addPlayer(e){
//     const newPlayerButton = document.getElementById('playername-submit');
//     newPlayerButton.addEventListener("click", )
// }

// REMOVES CHAR MAKER MODAL, FETCHES CHAR INFO, FOR EVENT LISTENER TO SELECT A CHARACTER.
function showCharacter(e){
    modal.hidden = true;
    console.log(e);
    let playerid = e.target.parentElement.parentElement.parentElement.id.split('-')[1]
    let characterid = e.target.id.split('-')[1];
    // console.log(`jfsajsdk id is ${(e.target.parentElement.parentElement.parentElement.id.split('-')[1])}`);
    return fetch(`http://localhost:3000/api/v1/players/${playerid}/characters/${characterid}`)
.then(response => response.json())
.then(obj => renderCharacter(obj))
}

function renderCharacter(obj) {
    console.log(obj)
}
// DELETES PLAYER FOR EVENT LISTENER DELETEPLAYER BUTTON, REMOVES FROM LIST OF PLAYERS
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
    // gotta get the view down for this
//     {id: 1, name: "Delphinus", charClass: "Paladin", race: "Elf", intellect: null, …}
// id: 1
// name: "Delphinus"
// charClass: "Paladin"
// race: "Elf"
// intellect: null
// wisdom: null
// charisma: null
// strength: null
// constitution: null
// dexterity: null
// speed: null
// hp: null
// attacks_and_spells: null
// languages_and_proficiencies: null
// equipment: null
// features_and_traits: null
// background: null
// xp: null
// armor_class: null
// initiative: null
// personality_traits: null
// ideals: null
// bonds: null
// flaws: null
// player_id: 1
// created_at: "2020-05-06T21:58:28.377Z"
// updated_at: "2020-05-06T21:58:28.377Z"
// __proto__: Object
//  }

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
.then(data => render(data))
}
// gotta make something that checks if it is already in the list when render is called, so there arent dups

createNewPlayer();




// function createChar(e){
//     let playerid = document.querySelector('#playerinfo').querySelector('div').id.split('-')[1];
//     const charClass = document.querySelector('#new-char-class').value;
//     const race = document.querySelector('#new-char-race').value;
//     console.log(`gfgdf is ${input}`);
//     e.preventDefault();
//     fetch(`http://localhost:3000/api/v1/players/${playerid}/characters`, {
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({
//         player_name: `${input}`
//     })
// })
// .then(response => response.json())
// .then(data => render(data))

// }
function newChar(){
    const newCharSubmit = document.querySelector('#newchar-submit');
    newCharSubmit.addEventListener("click", createChar)
}

// EVENT LSITENER CALLBACK TO CREATE A NEW CHARACTER WITH INPUT OF NAME, RACE, CLASS. CREATES NEW INSTANCE OF CHARACTER CLASS AND ASSIGNS ABILITY SCORES.
function createChar(e) {
    
    const charClassInput = document.querySelector('#new-char-class').value;
    console.log(`char class c ${charClassInput}`);
    const raceInput = document.querySelector('#new-char-race').value;
    const nameInput = document.querySelector('#new-char-name').value;
    let charNew = new Character(`${nameInput}`, `${raceInput}`, `${charClassInput}`);
    // console.log(`${charNew}`);
    let playerid = document.querySelector('#playerinfo').querySelector('div').id.split('-')[1];
    console.log(`newchar is ${charNew}`);
    e.preventDefault();
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
        hp: `${charNew.hp}`

    })
})
.then(response => response.json())
.then(data => renderCharacter(data))
}
// WHERE IS HIT DICE, WHY IS HP ZERO, hlad elf shoul have +5 speed , my case statement sarent working
// id: 8
// name: "new"
// charClass: "Half-Elf"
// race: "Cleric"
// intellect: 11
// wisdom: 4
// charisma: 12
// strength: 10
// constitution: 6
// dexterity: 0  WHY IS THIS ZERO
// speed: 25
// hp: 0  WHY IS THIS ZERO
// attacks_and_spells: null
// languages_and_proficiencies: null
// equipment: null
// features_and_traits: null
// background: null
// xp: null
// armor_class: null
// initiative: null
// personality_traits: null
// ideals: null
// bonds: null
// flaws: null
// player_id: 1
// created_at: "2020-05-09T23:18:22.602Z"
// updated_at: "2020-05-09T23:18:22.602Z"
// __proto__: Object
// {
newChar();

function renderCharacter(char){
    charSheet.hidden = false;
    let playername = document.querySelector('#playerinfo').querySelector('div').querySelector('h2').innerHTML.split(' ')[0].slice(0, -2);
    document.querySelector('#charNameForm').value = char.name;
    document.querySelector('#playerNameForm').value = `${playername}`;  
    document.querySelector('#charFormRace').value = char.race;
    // document.querySelector('#alignment').value = ;
    // document.querySelector('#experiencepoints').value = ;
    document.querySelector('#Strengthscore').value = char.strength;
    document.querySelector('#Strengthmod').value = char.modifier(char.strength);
    document.querySelector('#Dexterityscore').value = char.dexterity;

    document.querySelector('#Constitutionscore').value = char.constitution;

    document.querySelector('#Wisdomscore').value = char.wisdom;

    document.querySelector('#Intelligencescore').value = char.intellect;

    document.querySelector('#Charismascore').value = char.charisma;

    // document.querySelector('#inspiration').value = ;

    // document.querySelector('#proficiencybonus').value = ;
    // document.querySelector('#Strength-save').value = ;



}


function rollSixSidedDice() {
    Math.floor(Math.random()*6+1);
  }
//   what other dice are there  make functions
  function rollSixSidedDice() {
    Math.floor(Math.random()*6+1);
  }

//   Make function to apply free ability points.
// make it so cannot edit ability scores unless have ability points to add.
// learn how to bind !!!!!!
// char show shows the character. click edit to edit the values that are editable.