# * Состояние (машина) для врага в битве
class EnemyAI_BattleFlow extends AIFlow
    constructor: () ->
        super(...arguments)
        return
        
    target: -> @entity().getTarget()

    onStateStart: ->
        "IN BATTLE STATE".p()
        # * Таймер следующей выборки действия
        # * Когда действие было выбранно, идёт небольшая пауза
        # * перед следующей выборкой действия
        @_nextActionCheck = 0
        # *
        @_canFightNow = true
        # * Бот отступает из боя
        @_fleeFromBattle = false
        #TODO: change move type
        #TEMP: остановлю ботика
        #@char()._moveType = 0
        #@char().aaSetMoveTypeKeepBattleDistance()
        #TODO: filter skills



    onStateEnd: ->
        #on char сделать метод основной
        @entity().resetBattle()
        #TODO: clear target and other stuff (onBattleEnd for battle etc)
        "BATTLE END".p()

    # * onStateEnd нету, так как Free состояние базовое

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EnemyAI_BattleFlow.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = EnemyAI_BattleFlow::

    _._setup = ->
        
    #TODO: ЕСТЬ БАГ, если убить одного врага, другие не хотят сражаться, остаюстя в keep

    _._updateFlow = ->
        if @_canFightNow is true
            @_updateOutOfHomeFlow()
            @_updateBattleFlow()
        else
            @_updateFleeFlow()

    # * Если отошёл слишком далеко от "дома", надо вернуться
    _._updateOutOfHomeFlow = ->
        if @_isTooFarFromHomePoint()
            @_canFightNow = false
        
    _._isTooFarFromHomePoint = ->
        homePoint = @char().homePoint
        return false unless homePoint?
        return @char().distTo(homePoint) > (@model().returnRadius)

    _._updateBattleFlow = ->
        if @_isTargetValid()
            @_selectActionToUse()
            if @_isActionIsExists()
                if @_isActionInDistance()
                    @_executeAction()
                else
                    @_movingCloserToTarget()
            else
                @_waitForAction()
        else
            @logic().switchToFreeState()


    _._isTargetValid = ->
        @_isTargetInViewRadius() and AATargetsManager.isValidTarget(@char(), @target())

    #TODO: Сделать параметр SeekTime - когда цель вне видимости, какой-то время (в сек) всё равно преследовать
    # * или следовать в точку где последний раз видел
    # * Можно отдельное состояние (поиск по маршруту или случайно)
    # * Объеденить с системой слышымости (по сути это и есть - движение к источнику звука и патруль)
    _._isTargetInViewRadius = -> @char().distTo(@target()) <= (@model().viewRadius + 1)

    _._selectActionToUse = ->
        @_nextActionCheck--
        return if @_nextActionCheck > 0
        #TODO: алгоритм выбора действия для использования сейчас
        skills = @battler().getUsableAASkills()
        if skills.length > 0
            @_setCurrentAction(skills.first())
        else
            @_resetCurrentAction()
        return

    _._setCurrentAction = (@_currentAction) ->
        #TODO: Надо это или нет?
        @_nextActionCheck = 20


    _._resetCurrentAction = ->
        @_currentAction = null
        @_nextActionCheck = 0
        return

    _._isActionIsExists = -> @_currentAction?

    # * Находится ли цель на расстроянии применения действия
    _._isActionInDistance = ->
        aaSkill = @_currentAction.AASkill
        range = aaSkill.range
        #TODO: Можно более точное уточнение, например только передо мной, если melee
        return AATargetsManager.isCharExtInRadius(@char(), range, @target())
    
    _._executeAction = ->
        try
            #TODO: Custom Attack Move Route
            "EXECUTE".p()
            #TODO: EXECUTE ACITON !!!
            # * Дополнительная проверка ещё раз перед выполнением действия
            # * Это нужно, потому что АИ выбирает очередное действие после выбора через время
            # * см. @_nextActionCheck
            unless @battler().canUse(@_currentAction)
                @_resetCurrentAction()
            else
                "EEXECUTGE".p()
                # * Смотреть как на gamePlayer сделано и эти методы использовать
                @char().aaTurnTowardTarget()
                skill = @_currentAction.AASkill
                @battler().useItem(@_currentAction)
                AABattleActionsManager.startAASkill(skill, @char(), $gamePlayer)
        catch e
            AA.w e

    _._movingCloserToTarget = ->
        "APPROACH".p()
        @char().aaSetMoveTypeApproachTarget()

    _._waitForAction = ->
        "KEEP ".p()
        @char().aaSetMoveTypeKeepBattleDistance()
        #TODO: Custom Move Route?
        # * Задать параметр, чтобы АИ выполнял в бою customMoveRoute если нет навыков
        return

    # * Враг возвращается (отступает) к точке дом
    # * Пока не увидит дом (в View Radius)
    # * В отличии от Free State, точка дома не меняется, поэтому враг получается
    # * всегда будет держаться своего "дома" и сражаться в определённом радиусе
    _._updateFleeFlow = ->
        "FLEE".p()
        if @char().distTo(@char().homePoint) <= (@model().viewRadius - 1)
            @_canFightNow = true
        else
            @char().aaSetMoveTypeReturnToHomePoint()
        return
    
    return
# ■ END EnemyAI_BattleFlow.coffee
#---------------------------------------------------------------------------