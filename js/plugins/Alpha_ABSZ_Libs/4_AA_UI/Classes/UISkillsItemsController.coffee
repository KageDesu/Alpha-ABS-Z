# * Данный класс работает только на Game_Player
class UISkillsItemsController
    constructor: (@skillItems) ->
        @setup()
        return
        
    setup: () ->
        @battler = $gamePlayer.AABattler()
        @skillSet = $gamePlayer.aaSkillsSet
        @_updThread = new KDCore.TimedUpdate(20, @_updateItemsStates.bind(@))
        @_updThreadItemCount = new KDCore.TimedUpdate(30, @_updateItemsCount.bind(@))
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
        return unless @battler?
        @_setupItem(skill) for skill in @battler.getAASkills()
        # * Предметы отдельно, так как могут быть не в наличии
        panelItems = @skillSet.getAllItemsFromPanel().map (id) -> AA.Utils.getAASkillObject(id)
        @_setupItem(item) for item in panelItems
        @_updateItemsCount() # * Сразу обновим количество
        return

    update: ->
        @_updThread?.update()
        @_updThreadTimers?.update()
        @_updThreadItemCount?.update()
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

    _._updateItemsCount = ->
        for item in @skillItems
            @_updateItemCount(item)

    # * Обновить состояние (таймер, доступность)
    _._updateItemState = (item) ->
        try
            useCases = @battler.getUsableAASkills().map (skill) -> skill.idA
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

    # * Обновить количество (для предметов)
    _._updateItemCount = (item) ->
        # * Навыки пропускаем
        return if AA.Utils.isAASkill(item.skillId)
        item.drawCount($gameParty.numItems(AA.Utils.getAASkillObject(item.skillId)))
        return

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
        symb = @skillSet.getSymbolForSkill(skill.idA)
        # * Нету символа для навыка (т.е. навык не находится в ячейках)
        return unless symb?
        item = @_getItemForSymbol(symb)
        return unless item?
        item.skillId = skill.idA
        if item.skillId == @battler.attackSkillId()
            iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, @battler)
            item.drawIcon(iconIndex)
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

    # * Обработка нажатия правкой кнопкой мыши по слоту (вызывается из AA.UI)
    _.handleSkillSelectorProcess = ->
        if AA.UI.isSkillSelectorOpen()
            AA.UI.closeSkillSelector()
            # * Если было нажатие на другой слот, то сразу открываем его
            symbol = @_getSkillSymbolSelectorHandled()
            if symbol? and $gameTemp.__aaLastSkillSelectorSymbol != symbol
                return @handleSkillSelectorProcess()
            else # * Если было нажатие на слот, но этот же, закрываем его
                $gameTemp.__aaLastSkillSelectorSymbol = null
                return true
        else
            symbol = @_getSkillSymbolSelectorHandled()
            if symbol?
                AA.UI.openSkillSelectorFor(symbol)
                $gameTemp.__aaLastSkillSelectorSymbol = symbol
                return true
        return false

    # * Возвращает symbol слота, если было открыто меню выбора навыка (правой кнопкой по слоту)
    _._getSkillSymbolSelectorHandled = ->
        # * Только по правой кнопке мыши (всегда)
        if TouchInput.isCancelled()
            item = @_getItemUnderCursor()
            return item.symbol if item?
        return null
    
    # * Получить Skill Item под курсором
    _._getItemUnderCursor = () -> @skillItems.find (item) -> item.isUnderMouse()

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------