#TODO: Систематизация класса

# * Данный класс работает только на Game_Player
class UISkillsItemsController
    constructor: (@skillItems) ->
        @setup()
        return
        
    setup: () ->
        @battler = $gamePlayer.AABattler()
        @skillSet = $gamePlayer.aaSkillsSet
        @_updThread = new KDCore.TimedUpdate(20, @_updateItemsStates.bind(@))
        @_updThreadTimers = new KDCore.TimedUpdate(2, @_updateItemsTimers.bind(@))
        @refresh()
        return

    onSkillPerformResult: (skillId, result) ->
        try
            item = @_getItemForSkillId(skillId)
            return unless item?
            if result is 0
                item.pulseAlert()
            else
                item.pulseClick()
        catch e
            AA.w e

    refresh: ->
        @_clearItems()
        @_setupItem(skill) for skill in @battler.getAASkills()
        return

    update: ->
        @_updThread?.update()
        @_updThreadTimers?.update()
        @_updateInput()
        return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = UISkillsItemsController::

    _._updateItemsStates = ->
        for item in @skillItems
            @_updateItemState(item)

    _._updateItemsTimers = ->
        for item in @skillItems
            @_updateItemTimer(item)

    # * Обновить состояние (таймер, доступность)
    _._updateItemState = (item) ->
        try
            useCases = @battler.getUsableAASkills().map (skill) -> skill.id
            @_updateItemUseState(item, useCases)
        catch e
            AA.w e
            @_updThread = null
        return

    # * Обновить таймер для навыка
    _._updateItemTimer = (item) ->
        if item.isDisabled() && item.skillId > 0
            time = $gamePlayer.AABattler().aaGetRemainTimeForSkill(item.skillId)
            if time > 0
                #TODO: BAD performance, BAD BAD BAD way
                tStr = "" + time
                if tStr.contains(".")
                    parts = tStr.split(".")
                    if parts[1].length > 0
                        tStr = parts[0] + "." + parts[1][0]
                item.drawTime(tStr)
            else
                item.drawTime("")
        else
            item.drawTime("")

    _._updateItemUseState = (item, useable) ->
        if item.skillId == 0
            # * Доп. проверочка isDisabled, а то мерцает
            item.enable() if item.isDisabled()
        else
            # * Если состояние было включено на Enabled, значит даём сигнал
            if item.switchState(useable.contains(item.skillId))
                item.pulseReady()
        return

    _._clearItems = ->
        for item in @skillItems
            item.clear()
            item.skillId = 0
        return
    
    # * Задать навык в ячейку
    _._setupItem = (skill) ->
        return unless skill?
        symb = @skillSet.getSymbolForSkill(skill.id)
        # * Нету символа для навыка (т.е. навык не находится в ячейках)
        return unless symb?
        item = @_getItemForSymbol(symb)
        return unless item?
        item.skillId = skill.id
        if item.skillId == @battler.attackSkillId()
            weapon = @battler.weapons()[0]
            if weapon? and weapon.iconIndex > 0
                item.drawIcon(weapon.iconIndex)
            else
                item.drawIcon(skill.iconIndex)
        else
            item.drawIcon(skill.iconIndex)
        # * Сразу обновляем состояние
        @_updateItemState(item)
        return

    # * symbol назначается при создании в UISet_Skills из параметров
    _._getItemForSymbol = (symb) -> @skillItems.find (item) -> item.symbol == symb

    # * Получить ячейку по ID навыка (устанавливается в методе _setupItem)
    _._getItemForSkillId = (id) -> @skillItems.find (item) -> item.skillId == id

    _._updateInput = ->
        inputSymbol = AA.Input.getTriggeredSkillSymbol()
        if inputSymbol?
            item = @_getItemForSymbol(inputSymbol)
            $gamePlayer.aaTryPerformSkill(item.skillId) if item?
        return


    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------