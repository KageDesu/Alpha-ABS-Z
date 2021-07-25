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

    # * Когда совершили какое-либо АБС действие (навык)
    # * Не используется стандартный onAllActionsEnd, так как он очищает result
    _.onAAActionEnd = ->
        @removeStatesAuto(1)
        @removeBuffsAuto()
        return

    #TODO: attackSkillId - метод у МЗ лучше, чем у МВ (там капец)

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------