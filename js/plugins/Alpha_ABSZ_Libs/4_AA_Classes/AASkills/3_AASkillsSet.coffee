# * Класс хранит набор навыков на панели для персонажей
# * Хранит настройку панели навыков для каждого персонажа группы

#@[STORABLE]
class AASkillsSet
    constructor: () ->
        # * Позиции на панели для навыков
        @bingings = {}
        @currentActorId = 0
        return

    # * Установить ActorId из Game_Player (shortcut)
    setPlayerActorId: -> @setActorId($gamePlayer.AABattler().actorId())

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
        symbols = @allSymbols()
        for s in symbols
            # * Автоматически нельзя поставить в E и Q слоты
            #continue if s == AA.Input.primarySkillSymbol()
            #continue if s == AA.Input.secondarySkillSymbol()
            tempId = @getSkillForSymbol(s)
            if tempId <= 0
                @setSymbolForSkill(skillId, s, null)
                break
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
            battler = $gameParty.leader()
            attackSkillId = battler.attackSkillId()
            @setSymbolForSkill(attackSkillId, AA.Input.primarySkillSymbol(), null)
            # * Добавляем остальные навыки
            for s in battler.getAASkills()
                continue if s.id == attackSkillId
                @setSkillInEmptySlot(s.id)
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