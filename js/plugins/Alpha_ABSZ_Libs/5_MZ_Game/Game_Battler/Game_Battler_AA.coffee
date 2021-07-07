#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    # * Все ABS навыки персонажа (включая предметы)
    # У Actor и Enemy разные источники, поэтому метод тут не имеет тела
    _.getAASkills = -> []

    # * ABS навыки, которые можно использовать в данный момент (включая предметы)
    _.getUsableAASkills = -> @getAASkills().filter (skill) => @canUse(skill)

    _.initAASkillsSet = ->
        @aaSkillsSet = new AASkillsSet()
        return

    #TODO: Это может и не нужно уже
    _.getAttackAASkill = ->
    
    #TODO: Это может и не нужно уже
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