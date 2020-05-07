// adapters talk to backend

class CharactersAdapter {
    constructor(){
        this.baseUrl = "http://localhost:3000/api/v1/players"
    }
    getPlayerId() {

    }
    getCharacters() {
        let playerId = this.getPlayerId()
        return fetch(`this.baseUrl/${playerId}/characters`).then(res => res.json()
        )
    }
}
// will make available these:

// adapter = new CharactersAdapter()

// const characters = adapter.getCharaacters()