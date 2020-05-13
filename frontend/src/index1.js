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

function renderPlayerInfo(e) {
    main.innerHTML = `    <div id="playerinfo">
    
    </div>`
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

