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

        player = Player.find_by(id: params[:playerID])
        puts "player is #{player}"
        @character = player.characters.build(character_params)
        if @character.save 
            puts "character is #{@character}"
            render json: @character, status: 200
        else
            puts "unsuccessful"
            render plain: "unsuccessful"
        end
    end
    
    def update 
        puts "params are #{params}"
        player = Player.find_by(id: params[:player_id])
        character = Character.find_by(id: params[:id])
        puts "character is #{character}  character params is #{character_params}"
        if character.update(character_params)
            # render json: character.to_json(:include => {:player => {:only => [:player_id, :player_name]} })
            render json: {message: "success"}
            puts "updated successfully"
        else
            puts "not updated"
            render json: {error: character.update(character_params).errors}
        end
    end

    def destroy
        puts "params are #{params}"
        character = Character.find(params[:id])
        character.delete

        render json: {characterId: character.id}
    end

    private
    def character_params 
        params.require(:character).permit(:name, :charClass, :race, :intellect, :wisdom, :charisma, :strength, :constitution, :dexterity, :speed, :hp, :attacks_and_spells, :languages_and_proficiencies, :equipment, :features_and_traits, :background, :xp, :armor_class, :initiative, :personality_traits, :ideals, :bonds, :flaws, :alignment, :hitDice, :free_ability_pts, :strength_save, :strength_save_check, :dex_save, :dex_save_check, :char_save, :char_save_check, :const_save, :const_save_check, :wis_save, :wis_save_check, :intellect_save, :intellect_save_check, :acrobatics, :acrobatics_check, :animal, :animal_check, :arcana, :arcana_check, :athletic, :athletic_check, :deception, :deception_check, :history, :history_check, :insight, :insight_check, :intimidation, :intimidation_check, :investigation, :investigation_check, :medicine, :medicine_check, :nature, :perception, :perception_check, :performance, :performance_check, :persuasion, :persuasion_check, :religion, :religion_check, :sleight_of_hand, :soh_check, :stealth, :stealth_check, :survival, :survival_check, :proficiencybonus, :passive_perception, :currenthp, :temphp)
    end

    def set_player!
        @player = Player.find(params[:playerId])
    end

end
