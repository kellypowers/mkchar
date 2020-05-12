class AddElementsToCharactersTable < ActiveRecord::Migration[6.0]
    def change

        add_column :characters, :alignment, :string
        add_column :characters, :strength_save, :integer
        add_column :characters, :strength_save_check, :boolean

        add_column :characters, :dex_save, :integer
        add_column :characters, :dex_save_check, :boolean

        add_column :characters, :char_save, :integer
        add_column :characters, :char_save_check, :boolean

        add_column :characters, :const_save, :integer
        add_column :characters, :const_save_check, :boolean

        add_column :characters, :wis_save, :integer
        add_column :characters, :wis_save_check, :boolean

        add_column :characters, :intellect_save, :integer
        add_column :characters, :intellect_save_check, :boolean

        add_column :characters, :acrobatics, :integer
        add_column :characters, :acrobatics_check, :boolean

        add_column :characters, :animal, :integer
        add_column :characters, :animal_check, :boolean

        add_column :characters, :arcana, :integer
        add_column :characters, :arcana_check, :boolean

        add_column :characters, :athletic, :integer
        add_column :characters, :athletic_check, :boolean

        add_column :characters, :deception, :integer
        add_column :characters, :deception_check, :boolean

        add_column :characters, :history, :integer
        add_column :characters, :history_check, :boolean

        add_column :characters, :insight, :integer
        add_column :characters, :insight_check, :boolean


        add_column :characters, :intimidation, :integer
        add_column :characters, :intimidation_check, :boolean

        add_column :characters, :investigation, :integer
        add_column :characters, :investigation_check, :boolean

        add_column :characters, :medicine, :integer
        add_column :characters, :medicine_check, :boolean

        add_column :characters, :nature, :integer
        add_column :characters, :nature_check, :boolean

        add_column :characters, :perception, :integer
        add_column :characters, :perception_check, :boolean

        add_column :characters, :performance, :integer
        add_column :characters, :performance_check, :boolean

        add_column :characters, :persuasion, :integer
        add_column :characters, :persuasion_check, :boolean

        add_column :characters, :religion, :integer
        add_column :characters, :religion_check, :boolean

        add_column :characters, :sleight_of_hand, :integer
        add_column :characters, :soh_check, :boolean

        add_column :characters, :stealth, :integer
        add_column :characters, :stealth_check, :boolean

        add_column :characters, :survival, :integer
        add_column :characters, :survival_check, :boolean

        add_column :characters, :hitDice, :string

        add_column :characters, :free_ability_pts, :integer
        add_column :characters, :proficiencybonus, :integer
        add_column :characters, :passive_perception, :integer
        add_column :characters, :currenthp, :integer
        add_column :characters, :temphp, :integer

        add_column :characters, :saving_throws, :string
    end

end