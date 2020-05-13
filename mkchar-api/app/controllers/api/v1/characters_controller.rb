class Api::V1::CharactersController < ApplicationController
    # before_action :set_player! #, only: [:show, :update, :destroy]

    def index 
        @characters = @player.characters
        puts "params are #{params}, characters are #{@characters}"
        render json: @characters, status: 200
    end

    def show
        puts "params are #{params}"
        @player = Player.find(params[:player_id])
        @character = Character.find_by(id: params[:id])

        render json: @character.to_json(:include => {:player => {:only => [:player_id, :player_name]} })

    end

    def create
        # Character.new if Character.save render json else
        # raise params.inspect
        # puts "params are #{params}"
        # params are {"playerID"=>"1", "name"=>"yep", "race"=>"Barbarian", "charClass"=>"Dwarf", "intellect"=>"13", "wisdom"=>"13", "charisma"=>"13", "dexterity"=>"yep", "constitution"=>"6", "strength"=>"8", "free_ability_pts"=>"0", "speed"=>"25", "hitDice"=>"undefined", "hp"=>"undefined", "controller"=>"api/v1/characters", "action"=>"create", "player_id"=>"1", "character"=>{"name"=>"yep", "charClass"=>"Dwarf", "race"=>"Barbarian", "intellect"=>"13", "wisdom"=>"13", "charisma"=>"13", "strength"=>"8", "constitution"=>"6", "dexterity"=>"yep", "speed"=>"25", "hp"=>"undefined"}}
        player = Player.find_by(id: params[:playerID])
        puts "player is #{player}"
        # @character = Character.new(character_new_params)
        @character = player.characters.build(character_params)
        if @character.save 
            puts "character is #{@character}"
            render json: @character, status: 200
        else
            render plain: "unsuccessful"
        end
    end
    
    def update 
        # if Character.update then render json
        puts "params are #{params}"
        @character = Character.find(params[:id])
        @character.update(character_params)

        render json: @character, status: 200
    end

    def destroy
        puts "params are #{params}"
        @character = Character.find(params[:id])
        @character.delete

        render json: {characterId: @character.id}
    end

    private
    # def character_params 
    #     # add the permit params once i know what they are, using body as placeholder
    #     params.require(:character).permit(:name, :charClass, :race, :intellect, :wisdom, :charisma, :strength, :constitution, :dexterity, :speed, :hp, :attacks_and_spells, :languages_and_proficiencies, :equipment, :features_and_traits, :background, :xp, :armor_class, :initiative, :personality_traits, :ideals, :bonds, :flaws)
    # end
    # def character_new_params 
    #     # add the permit params once i know what they are, using body as placeholder
    #     params.require(:character).permit(:name, :charClass, :race)
    # end
    def character_params 
        # add the permit params once i know what they are, using body as placeholder
        params.require(:character).permit(:name, :charClass, :race, :intellect, :wisdom, :charisma, :strength, :constitution, :dexterity, :speed, :hp, :attacks_and_spells, :languages_and_proficiencies, :equipment, :features_and_traits, :background, :xp, :armor_class, :initiative, :personality_traits, :ideals, :bonds, :flaws, :alignment, :hitDice, :free_ability_pts)
    end

    def set_player!
        @player = Player.find(params[:playerId])
    end

end
