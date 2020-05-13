class Player
{
    constructor({id, player_name, characters})
    {
        this.id = id;
        this.player_name = player_name;
        this.characters = characters.map(c => new Character(c.name, c.race, c.charCLass, c.background, c.id, this));
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
    addCharacter(character) {
        this.characters.push(character)
    }

    getCharacters(){
        return this.characters;
    }
}