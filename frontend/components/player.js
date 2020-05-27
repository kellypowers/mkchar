class Player
{
    constructor({id, player_name, characters})
    {
        this.id = id;
        this.player_name = player_name;
        // this.characters = characters.map(c => new Character(c.name, c.race, c.charClass, c.background, c.id, this));
        this.characters = [];
    }

    renderCharacters() {
        const charList = document.createElement('ul')
        this.characters.forEach (character => {
            charList.appendChild(character.renderItem());
            // add event listener to click to view, in view add buttons to edit and to delete
            // add delete button and edit button
        })
        return charList
    }

    // addCharacter() {
        // fetch(`http://localhost:3000/api/v1/players/${this.id}/characters`)
        // .then(response => response.json())
        // .then(data.forEach(character=> this.characters.push(character)))
    // }

    // getCharacters(){
    //     return this.characters;
    // }


}