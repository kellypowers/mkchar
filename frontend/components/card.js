let card = {
    name: document.querySelector("#charNameForm") ,
    charClass: document.querySelector("#charClassForm") ,
    background: document.querySelector("#charBackgroundForm"),
    player_name: document.querySelector("#playerNameForm"),
    race: document.querySelector("#charFormRace") ,
    alignment: document.querySelector("#charAlignmentForm") ,
    xp: document.querySelector("#experiencepoints") , 
    strength: document.querySelector("#Strengthscore"),     
    dexterity: document.querySelector("#Dexterityscore"),
    constitution: document.querySelector("#Constitutionscore"),
    wisdom: document.querySelector("#Wisdomscore"),
    intellect: document.querySelector("#Intelligencescore"),
    charisma: document.querySelector("#Charismascore"),
    strength_save: document.querySelector("#str-save"), 
    strength_save_check: document.querySelector("#str-save-prof"),  
    dex_save: document.querySelector("#dex-save"),
    dex_save_check: document.querySelector("#str-save-check"),
    const_save: document.querySelector("#const-save"),
    const_save_check: document.querySelector("#const-save-check"),  value="" name="Constitution-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Wisdom-save">Wisdom</label><input id="wis-save" value=""  name="Wisdom-save" type="text" /><input name="Wisdom-save-prof"  value="" id="wis-save-check" type="checkbox" />
              </li>
              <li>
                <label for="Intelligence-save">Intelligence</label><input  value="" id="int-save" name="Intelligence-save" type="text" /><input  value="" id="int-save-check" name="Intelligence-save-prof" type="checkbox" />
              </li>
              <li>
                <label for="Charisma-save">Charisma</label><input id="char-save" value=""  name="Charisma-save" type="text" /><input id="char-save-check"  value="" name="Charisma-save-prof" type="checkbox" />
              </li>
            </ul>
            <div class="label">
              Saving Throws
            </div>
          </div>
          <div class="skills list-section box">
            <ul>
              <li>
                <label for="Acrobatics">Acrobatics <span class="skill">(Dex)</span></label><input value=""  id="acrobatics" name="Acrobatics" type="text" /><input  value="" id="acrobatics-check" name="Acrobatics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Animal Handling">Animal Handling <span class="skill">(Wis)</span></label><input value=""  id="animal" name="Animal Handling" type="text" /><input  value="" id="animal-check" name="Animal Handling-prof" type="checkbox" />
              </li>
              <li>
                <label for="Arcana">Arcana <span class="skill">(Int)</span></label><input id="arcana" value=""  name="Arcana" type="text" /><input id="arcana-check"  value="" name="Arcana-prof" type="checkbox" />
              </li>
              <li>
                <label for="Athletics">Athletics <span class="skill">(Str)</span></label><input  value="" id="athletic" name="Athletics" type="text" /><input  value="" id="athletic-check" name="Athletics-prof" type="checkbox" />
              </li>
              <li>
                <label for="Deception">Deception <span class="skill">(Cha)</span></label><input id="deception" value=""  name="Deception" type="text" /><input id="decept-check"  value="" name="Deception-prof" type="checkbox" />
              </li>
              <li>
                <label for="History">History <span class="skill">(Int)</span></label><input id="hist" value=""  name="History" type="text" /><input id="hist-check"  value="" name="History-prof" type="checkbox" />
              </li>
              <li>
                <label for="Insight">Insight <span class="skill">(Wis)</span></label><input id="insight" value=""  name="Insight" type="text" /><input id="insight-check" value=""  name="Insight-prof" type="checkbox" />
              </li>
              <li>
                <label for="Intimidation">Intimidation <span class="skill">(Cha)</span></label><input id="intimidate" value=""  name="Intimidation" type="text" /><input id="intimidate-check"  value="" name="Intimidation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Investigation">Investigation <span class="skill">(Int)</span></label><input id="investigate"  value="" name="Investigation" type="text" /><input id="investigate-check"  value="" name="Investigation-prof" type="checkbox" />
              </li>
              <li>
                <label for="Medicine">Medicine <span class="skill">(Wis)</span></label><input id="med" name="Medicine" value=""  type="text" /><input id="med-check"  value="" name="Medicine-prof" type="checkbox" />
              </li>
              <li>
                <label for="Nature">Nature <span class="skill">(Int)</span></label><input id="nature" name="Nature"  value="" type="text" /><input id="nature-check"  value="" name="Nature-prof" type="checkbox" />
              </li>
              <li>
                <label for="Perception">Perception <span class="skill">(Wis)</span></label><input id="percept" name="Perception" value=""  type="text" /><input id="percept-check"  value="" name="Perception-prof" type="checkbox" />
              </li>
              <li>
                <label for="Performance">Performance <span class="skill">(Cha)</span></label><input id="perform" name="Performance"  value="" type="text" /><input id="perform-check" value=""  name="Performance-prof" type="checkbox" />
              </li>
              <li>
                <label for="Persuasion">Persuasion <span class="skill">(Cha)</span></label><input id="persuade" name="Persuasion"  value="" type="text" /><input id="persuade-check"  value="" name="Persuasion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Religion">Religion <span class="skill">(Int)</span></label><input id="relig" name="Religion"  value="" type="text" /><input id="relig-check"  value="" name="Religion-prof" type="checkbox" />
              </li>
              <li>
                <label for="Sleight of Hand">Sleight of Hand <span class="skill">(Dex)</span></label><input id="soh"  value="" name="Sleight of Hand" type="text" /><input id="soh-check"  value="" name="Sleight of Hand-prof" type="checkbox" />
              </li>
              <li>
                <label for="Stealth">Stealth <span class="skill">(Dex)</span></label><input id="stealth" name="Stealth"  value="" type="text" /><input id="stealth-check" name="Stealth-prof" value=""  type="checkbox" />
              </li>
              <li>
                <label for="Survival">Survival <span class="skill">(Wis)</span></label><input id="survival"  value="" name="Survival" type="text" /><input id="survival-check"  value="" name="Survival-prof" type="checkbox" />
              </li>
            </ul>
            <div class="label">
              Skills
            </div>
          </div>
        </div>
      </section>
      <div class="passive-perception box">
        <div class="label-container">
          <label for="passiveperception">Passive Wisdom (Perception)</label>
        </div>
        <input name="passiveperception"  />
      </div>
      <div class="otherprofs box textblock">
        <label for="otherprofs">Other Proficiencies and Languages</label><textarea id="proficiencies_and_languages" value=""  name="otherprofs"></textarea>
      </div>
    </section>
    <section>
      <section class="combat">
        <div class="armorclass">
          <div>
            <label for="ac">Armor Class</label><input id="ac" name="ac" value=""   type="text" />
          </div>
        </div>
        <div class="initiative">
          <div>
            <label for="initiative">Initiative</label><input name="initiative"  value="" type="text" />
          </div>
        </div>
        <div class="speed">
          <div>
            <label for="speed">Speed</label><input id="speed" name="speed" value=""   type="text" />
          </div>
        </div>
        <div class="hp">
          <div class="regular">
            <div class="max">
              <label for="maxhp">Hit Point Maximum</label><input id="hp" name="maxhp"   value="" type="text" />
            </div>
            <div class="current">
              <label for="currenthp">Current Hit Points</label><input name="currenthp" value=""  type="text" />
            </div>
          </div>
          <div class="temporary">
            <label for="temphp">Temporary Hit Points</label><input name="temphp"  value="" type="text" />
          </div>
        </div>
        <div class="hitdice">

              <label for="remaininghd">Hit Dice</label><input id="hitDice" name="remaininghd"  value="" type="text" />
            </div>
          </div>
        </div>
        
        </div>
      </section>
      <section class="attacksandspellcasting">
        <div>
          <label>Attacks & Spellcasting</label>
          <input type="textarea" value=""  id="attacks_and_spellcasting" >
          
        </div>
      </section>
      <section class="equipment">
        <div>
          <label>Equipment</label>
          <input type="textarea" value=""  id="equipment">
          
      </section>
    </section>
    <section>
      <section class="flavor">
        <div class="personality">
          <label for="personality">Personality</label><textarea id="personality"  value="" name="personality"></textarea>
        </div>
        <div class="ideals">
          <label for="ideals">Ideals</label><textarea id="ideals" value=""  name="ideals"></textarea>
        </div>
        <div class="bonds">
          <label for="bonds">Bonds</label><textarea id="bonds" value=""  name="bonds"></textarea>
        </div>
        <div class="flaws">
          <label for="flaws">Flaws</label><textarea id="flaws" value=""  name="flaws"></textarea>
        </div>
      </section>
      <section class="features">
        <div>
          <label for="features">Features & Traits</label><textarea id="features_and_traits"  value="" name="features"></textarea>
        </div>
      </section>
    </section>
  </main>
</form>
    `
}