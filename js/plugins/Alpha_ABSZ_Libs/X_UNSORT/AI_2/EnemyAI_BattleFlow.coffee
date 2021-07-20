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
        #TODO: change move type
        #TEMP: остановлю ботика
        #@char()._moveType = 0
        #@char().aaSetMoveTypeKeepBattleDistance()
        #TODO: filter skills



    onStateEnd: ->
        #TODO: clear target
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
        

    _._updateFlow = ->
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
            #TODO: out of battle state to free

    _._isTargetValid = -> AATargetsManager.isValidTarget(@char(), @target())

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

    
    return
# ■ END EnemyAI_BattleFlow.coffee
#---------------------------------------------------------------------------