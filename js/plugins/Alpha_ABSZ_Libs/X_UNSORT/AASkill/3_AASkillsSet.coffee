# * Класс хранит набор навыков на панели для персонажей
# * Хранит настройку панели навыков для каждого персонажа группы

#@[STORABLE]
class AASkillsSet
    constructor: () ->
        # * Позиции на панели для навыков
        @bingings = {}
        @currentActorId = 0
        return

    # * Установить персонажа, с которым будем работать
    setActorId: (@currentActorId) ->
        # * Если персонаж не настроен, то показать стандартные навыки
        unless @bingings[@currentActorId]?
            @bingings[@currentActorId] = {}
            @setupDefaultSkillsForActor()
        return

    allSymbols: () -> AA.Input.skillPanelSymbols

    currentSet: () -> @bingings[@currentActorId]

    setSkillInEmptySlot: (skillId) ->
        for s in @allSymbols()
            tempId = @getSkillForSymbol(s)
            @setSymbolForSkill(skillId, s, null) if tempId <= 0
        return

    setSymbolForSkill: (skillId, symbNew, symbOld) ->
        skillInNewPos = @getSkillForSymbol(symbNew)
        @currentSet()[symbNew] = skillId
        if skillInNewPos > 0
            @currentSet()[symbOld] = skillInNewPos if symbOld?
        return
        
    getSymbolForSkill: (skillId) ->
        for key, value of @currentSet()
            if value == skillId
                return key
        return null

    getSkillForSymbol: (symbol) ->
        skillId = @currentSet()[symbol]
        if skillId > 0
            return skillId
        else
            return 0

    setupDefaultSkillsForActor: ->
        try
            symbols = @allSymbols()
            battler = $gameParty.leader()
            attackSkillId = battler.attackSkillId()
            @setSymbolForSkill(attackSkillId, symbols[0], null)
            #TODO: setup second skill defenseSkillId()
        catch e
            AA.w e
        return


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