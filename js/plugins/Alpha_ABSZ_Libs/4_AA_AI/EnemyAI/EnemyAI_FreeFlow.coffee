# * Свободное состояние для АИ враг
class EnemyAI_FreeFlow extends AIFlow
    constructor: () ->
        super(...arguments)
        return

    onStateStart: ->
        "IN FREE STATE".p()
        @_restoreMoveData()
        @_isTargetInViewRadius = false
        return

    onStateEnd: ->
        "FREE END".p()
        @_storeHomePoint()
        return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EnemyAI_FreeFlow.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = EnemyAI_FreeFlow::

    _._setup = ->
        @_checkVisionTimer = 0
        @_checkTargetInRangeTimer = 0
        return

    _._updateFlow = ->
        @_updateReturnToHome()
        #TODO: Временно отключим Visor для врагов, у которых нет АБС навыков вообще
        return unless @battler().isHaveAnyAASkill()
        @_updateVision()

    _._updateReturnToHome = ->
        char = @char()
        return unless char?
        homePoint = char.homePoint
        return unless homePoint?
        try
            if char.aaIsNearThePoint(homePoint, 1)
                char.aaResetHomePoint() # * Сброс точки "дома"
                @_restoreMoveData() # * Выход из режима движения
            else
                char.aaSetMoveTypeReturnToHomePoint()
        catch e
            @_restoreMoveData()
            AA.w e
        return

    # * Используется двойная проверка. Сперва простая проверка, что цель в радиусе видимости
    # * Уже затем, если цель в радиусе, проверяется линия видимости
    #TODO: Целей может быть несколько, надо проверять линию на каждую и находить оптимальную (видимую)
    _._updateVision = ->
        # * Если цель в радиусе видимости
        if @_isTargetInViewRadius is true
            # * То проверяем чтобы цель была в линии видиомости (нет препятствий)
            @_updateVisionLine()
        # * В любом случае, проверяем снова, что цель в радиусе видимости
        @_updateVisionRadius()

    _._updateVisionRadius = ->
        @_checkVisionTimer++
        if @_checkVisionTimer >= 4
            @_checkVisionTimer = 0
            #TODO: Сейчас идёт проверка только на игрока
            #TODO: Добавить фильтр isActive (например когда игрок в технике)
            @_isTargetInViewRadius = AATargetsManager.isPlayerInRadius(@char(), @model().viewRadius)
            "PL IN RADIUS".p() if @_isTargetInViewRadius is true
        return

    _._updateVisionLine = ->
        return if @_isTargetInViewRadius is false
        @_checkTargetInRangeTimer++
        if @_checkTargetInRangeTimer >= 2
            @_checkTargetInRangeTimer = 0
            #TODO: Тут надо фильтры применять, чтобы проверять только врагов, а не всех подряд
            @_onSeeTarget($gamePlayer) if AAVisionManager.isVisionLineIsFree(@char(), $gamePlayer)
        return

    _._onSeeTarget = (target) ->
        @entity().setTarget(target)
        "SEE TARGET IN LINE".p()
        #TODO: if enemy have actions, then switch to battle state
        if @battler().isHaveAnyAASkill()
            if @model().isHaveOnSeeTargetAction()
                AA.SAaction.execute(@model().onSeeTarget, @char())
            @logic().switchToBattleState()
        else
            #TODO: if can't fight?
            #TODO: escapeFromBattle like (Типо отходить от игрока)
            # * Тоже самое поведение, что и если не может драться (noFight)
            #TODO: noFight - такого параметра не будет, хотите чтобы не дрался, не давайте действий
        return
    
    # * Восстановить настройки движения, если они были сохраненны
    _._restoreMoveData = ->
        try
            "RESTORE MOVE DATA".p()
            @char()?.aaRestoreMoveData()
        catch e
            AA.w e
        return

    # * Сохранить позицию перед выходом из состояния
    _._storeHomePoint = ->
        @char()?.aaStoreHomePoint()
        return

    return
# ■ END EnemyAI_FreeFlow.coffee
#---------------------------------------------------------------------------