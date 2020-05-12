class CharacterSerializer 
    def initialize(character_object)
        @character = character_object
        @player = @character.player
    end

    def to_serialized_json
        # puts "player is #{@player}"
        options = {
            include: {
                @player
                }
            only: [:player_name, :id],
                include: {
                @character
                }
        }
        @character.to_json(options)
    end
end