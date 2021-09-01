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

    currentSet: () -> @bingings[@currentActorId] || {}

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
                continue if s.idA == attackSkillId
                @setSkillInEmptySlot(s.idA)
        catch e
            AA.w e
        return

    # * Возвращает ID всех предметов на панели
    getAllItemsFromPanel: ->
        items = []
        symbols = @allSymbols()
        for s in symbols
            id = @getSkillForSymbol(s)
            items.push(id) if AA.Utils.isAAItem(id)
        return items
    
    # * Есть ли предмет на панели
    # * Этот метод используется в автоматическом добавлении новых предметов
    # * Чтобы не добавлять один и тот же предмет несколько раз
    isHaveItemOnPanel: (id) -> return @getAllItemsFromPanel().contains(id)

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