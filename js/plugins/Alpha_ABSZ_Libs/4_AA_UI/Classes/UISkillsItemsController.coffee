#TODO: Систематизация класса

# * Данный класс работает только на Game_Player
class UISkillsItemsController
    constructor: (@skillItems) ->
        @setup()
        return
        
    setup: () ->
        @battler = $gamePlayer.AABattler()
        @skillSet = $gamePlayer.aaSkillsSet
        @_updThread = new KDCore.TimedUpdate(30, @_updateItemState.bind(@))
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

    # * Обновить состояние (таймер, доступность)
    _._updateItemState = (item) ->
        @_updateItemTimer(item)
        useCases = @battler.getUsableAASkills().map (skill) -> skill.id
        @_updateItemUseState(item, useCases)
        return

    _._updateItemTimer = (item) ->


    _._updateItemUseState = (item, useable) ->

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
        #if Input.isTriggered(AA.IKey.ATK1)


    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------