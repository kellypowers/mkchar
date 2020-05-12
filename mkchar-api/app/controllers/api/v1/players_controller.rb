class Api::V1::PlayersController < ApplicationController

    def index 
        players = Player.all

        render json: PlayerSerializer.new(players).to_serialized_json
        # render json: @players, status: 200
    end

    def show
        player = Player.find(params[:id])

        render json: PlayerSerializer.new(player).to_serialized_json
        # render json: player => {:only => [:id, :player_name]}, include: [:characters => {:only => [:name, :race, :charClass]}]
    end

    def create
        # Player.new if Player.save render json else
        puts "params is #{params}"
        player = Player.find_by(player_name: params[:player_name])
        if player
            render json: PlayerSerializer.new(player).to_serialized_json
        # elsif params[:player_name] = ""
        #         # render plain: "Please enter a player name"
        #         puts "please enter a player name"
        else 
            player = Player.new(player_params)
            if player.save 
                render json: PlayerSerializer.new(player).to_serialized_json
            else
                render plain: "Unable to create the player name. Please try another name."
                # add error to show
            end
        end
    end
    
    def update 
        # if Player.update then render json
        player = Player.find(params[:id])
        if player.update(player_params)
            render json: PlayerSerializer.new(player).to_serialized_json
        else
            render plain: "Unable to update the player name."
            # show error to why
        end
    end

    def destroy
        player = Player.find(params[:id])
        player.delete

        render json: {playerId: player.id}
        # players = Player.all

        # render json: PlayerSerializer.new(players).to_serialized_json
    end

    private
    def player_params 
        # add the permit params once i know what they are, using body as placeholder
        params.require(:player).permit(:player_name)
    end

end
