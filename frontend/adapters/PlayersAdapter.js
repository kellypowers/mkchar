class PlayersAdapter {
    constructor(){
        this.baseUrl = "http://localhost:3000/api/v1/players"
    }
    getPlayers() {
        return fetch(this.baseUrl).then(res => res.json()) //.then(data => console.log(data))
    }
    getCharacters(player) {
        let playerId = player.id;
        return fetch(this.baseUrl/`${playerId}`/characters).then(res => res.json()
        )
    }
    getNewPlayer(e){
        e.preventDefault();
        fetch("http://localhost:3000/api/v1/players", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            player: {
                player_name: e.target.parentNode[0].value
            }
        })
    })
    .then(response => response.json())
    .then(data=>console.log(data))
    }

    getOldPlayer(e){
        return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
    .then(response => response.json())
    // .then(data => renderPlayerInfo(data))
    }
    
}

//     getOldPlayer(e){
//         return fetch(`http://localhost:3000/api/v1/players/${e.target.id}`)
//         .then(response => response.json()).then(data=>console.log(data))
//     }
// }