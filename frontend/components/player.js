class Player
{
    constructor({id, player_name})
    {
        this.id = id;
        this.player_name = player_name;
        this.characters = [];
    }


    addCharacter(character) {
        this.characters.push(character)
    }

    getCharacters(){
        return this.characters;
    }
}