# * Класс хранит набор АБС навыков (и предметов) для Battler
# * Хранит таймеры и номера на панели навыков (для игрока)

#@[STORABLE]
class AASkillsSet
    constructor: () ->
        # * Таймеры для навыков
        @timers = {}
        # * Позиции на панели для навыков
        @bingings = {}
        return

    startTimerForSkill: (skillId, time) ->

    isSkillHaveTimer: (skillId) ->

    # * В секундах
    getRemainTimeForSkill: (skillId) ->

    getTimerForSkill: (skillId) ->

    setPositionForSkill: (skillId, positionNew, positionOld) ->

    getPositionForSkill: (skillId) ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AASkillsSet.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AASkillsSet::


    
    return
# ■ END AASkillsSet.coffee
#---------------------------------------------------------------------------