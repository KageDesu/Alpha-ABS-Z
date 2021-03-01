#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    _.initAASkillsSet = ->
        @aaSkillsSet = new AASkillsSet()

    _.getAttackAASkill = ->
    
    # * Установить ABS навык для выполнения (задать текущее действие)
    _.prepareAASkillForExecuting = (aaSkill) ->
        @makeActions()
        #TODO: if item, setItem, isSkill set Skill
        #см. ABS MV -> Game_Player.js строка 593
        @action(0).setSkill(aaSkill.id)
        return

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------