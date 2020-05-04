class Characters {
    constructor() {
        this.characters = []
        this.adapter = new CharactersAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadCharacters()
    }

    fetchAndLoadCharacters() {
        this.adapter.getCharacters().then(characters => {
            // return console.log(Characters)
            // get Characters from server, then push them onto this.Characters so when call render
            characters.forEach(character => this.Characters.push(character))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        const charactersContainer = document.getElementById('characters-container')
        charactersContainer.innerHTML = "hello Characters"
        console.log("my Characters are", this.characters)
    }
}