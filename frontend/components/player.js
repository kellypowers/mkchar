class Player
{
    constructor({id, player_name, characters})
    {
        this.id = id;
        this.player_name = player_name;
        this.characters = [];
    }

    renderCharacters() {
        const charList = document.createElement('ul')
        this.characters.forEach (character => {
            charList.appendChild(character.renderItem());
        })
        return charList
    }


}