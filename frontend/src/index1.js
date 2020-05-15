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
  newPlayerNameForm();
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

function renderPlayerDropdown() {
  fetch(baseUrl).then(res => res.json()).then(players => {
   players.forEach(player =>  {
  const playerDropdown = document.getElementById('new-char-player');
  let option = document.createElement('option');
  option.value = player;
  option.innerHTML = player.player_name;
  playerDropdown.appendChild(option); })
})}

function renderPlayerInfo(e) {
    main.innerHTML = `    <div id="playerinfo">
    
    </div>
    <div id="new-char"></div>`
    getOldPlayer(e).then(playerData => {
      const player = new Player(playerData)
      const info = document.getElementById('playerinfo');
      let heading = document.createElement('h2');
      let newCharButton = document.createElement("button");
      newCharButton.innerText = "Create New Character";
      newCharButton.addEventListener("click", renderNewCharForm)

      info.id = `player-${player.id}`

      let playerDeleteButton = document.createElement('button');
      playerDeleteButton.innerText = "Delete Player"
      playerDeleteButton.addEventListener("click", deletePlayer);
      info.appendChild(playerDeleteButton);

      heading.innerHTML = `${player.player_name}'s characters`;

      changePlayerButton = document.createElement('button');
      changePlayerButton.innerText = "Change Player";
      changePlayerButton.id = "change-player-button";
      changePlayerButton.addEventListener("click", renderPlayerDiv);
      info.appendChild(changePlayerButton);

      info.appendChild(newCharButton);
      info.appendChild(heading);
      info.appendChild(player.renderCharacters())
      
    })
}

function getOldPlayer(e){
    return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
.then(response => response.json())
}

function renderNewCharForm(){
    document.querySelector("#new-char").innerHTML =`
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

        <label for="player">Which player is using the character?:</label>
          <select id="new-char-player">
          ${renderPlayerDropdown()}
        </select>

            <input id="newchar-submit" type="submit" />
        </form>
    </div>  

  <div id="characters-container">

  </div>`
  newChar();
}

function newChar(){
  console.log("in new char fun");
  const newCharSubmit = document.querySelector('#newchar-submit');
  newCharSubmit.addEventListener("click", createChar)
}

// EVENT LSITENER CALLBACK TO CREATE A NEW CHARACTER WITH INPUT OF NAME, RACE, CLASS. CREATES NEW INSTANCE OF CHARACTER CLASS AND ASSIGNS ABILITY SCORES.
// did work, now  does not.
function createChar(e) {
  console.log("in createChar fun");
  const charBackgroundInput = document.querySelector('#new-char-background').value;
  const charClassInput = document.querySelector('#new-char-class').value;
  console.log(`char class c ${charClassInput}`);
  const playerInput = document.querySelector('#new-char-player').value;
  const raceInput = document.querySelector('#new-char-race').value;
  const nameInput = document.querySelector('#new-char-name').value;
  let charNew = new Character(`${nameInput}`, `${raceInput}`, `${charClassInput}`, `${charBackgroundInput}`, `${playerInput}`);
  // console.log(`${charNew}`);
  // let playerid = document.querySelector('#playerinfo').querySelector('div').id.split('-')[1];
  let playerid = playerInput.id
  console.log(`playerid  is ${playerid}`);
  e.preventDefault();
  charNew.postChar();
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
        renderPlayerDiv();
        let deletedListItm = document.getElementById(`${data.playerid}`);
        deletedListItm.remove();
        })
}


function newPlayerNameForm(){
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

  render(data)
})
}
