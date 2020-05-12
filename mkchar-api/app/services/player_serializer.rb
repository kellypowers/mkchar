class PlayerSerializer 
    def initialize(player_object)
        @player = player_object
    end

    def to_serialized_json
        # puts "player is #{@player}"
        options = {
            only: [:player_name, :id],
                include: {
                characters: {
                    only: [:name, :race, :charClass, :id]
                }
                }
        }
        @player.to_json(options)
    end
end