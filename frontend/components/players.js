class Players {
    constructor() {
        // this.players = []
        this.adapter = new PlayersAdapter()
        // this.bindEventListeners()
        // this.fetchAndLoadPlayers()
        this.hideModal()
    }

    hideModal(){
        const modal = document.querySelector('#modal')
        modal.hidden = true
    }

    unhideModal(){
        const modal = document.querySelector('#modal')
        modal.hidden = false
    }

    fetchAndLoadPlayers() {
        this.adapter.getPlayers().then(players => {
            console.log(players);
            players.forEach(player => this.render(player))
        })
        // .then(() => {
            // this.render()
        // .then(data => {
        //     console.log(data)
        //     data.forEach()
        // })
        // })
    }

    render(data) {
        const listPlayers = document.getElementById('list-player-names');
        let li = document.createElement('li');
        li.id = `${data.id}`
        li.innerHTML = `${data.player_name}`;
        li.addEventListener("click", this.renderPlayerInfo );

        listPlayers.appendChild(li);
    }

    // setPlayer(e){
    //     this.adapter.getOldPlayer(e)
    // }
    // getOldPlayer(e){
    //     return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
    // .then(response => response.json())
    // .then(data => renderPlayerInfo(data))
    // }

    renderPlayerInfo(e) {
        this.adapter.getOldPlayer(e).then(obj => {
        this.removeRenderedPlayers();
        // playerInfoDiv = document.getElementById('playerinfo');
        charContainer = document.getElementById('characters-container');
        playerHeading = document.createElement('h2');
        playerHeading.innerHTML = `${obj.player_name}'s characters`;
        charList = document.createElement('ul');
        obj.characters.forEach (character => {
            charItem = document.createElement('li');
            charItem.innerHTML = `Character Name: ${character.name}, Race: ${character.race}, Class: ${character.class}`;
            charList.appendChild(charItem);
            // add event listener to click to view, in view add buttons to edit and to delete
        });
    })
    }
     removeRenderedPlayers()   {
        const playerSelect = document.getElementById('playername');
        playerSelect.hidden = true;
        changePlayerButton = document.createElement('button');
        changePlayerButton.innerText = "Change Player";
        changePlayerButton.addEventListener("click", this.unhideModal);
        const body = document.querySelector('body');
        body.appendChild(changePlayerButton);
        

    }

    fetchAndLoadCharacters() {
        this.adapter.getCharacters().then(players => {
            console.log(players);
            players.forEach(player => this.render(player))
        })
    }

    addPlayer(e){
        const newPlayerButton = document.getElementById('playername-submit');
        newPlayerButton.addEventListener("click", )
    }
}