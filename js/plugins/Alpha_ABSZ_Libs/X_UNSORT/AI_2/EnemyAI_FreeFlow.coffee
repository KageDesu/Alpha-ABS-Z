# * Свободное состояние для АИ враг
class EnemyAI_FreeFlow extends AIFlow
    constructor: () ->
        super(...arguments)
        return
        
    onStateStart: ->
        "IN FREE STATE".p()
        @_isTargetInViewRadius = false
        return

    onStateEnd: ->
        "FREE END".p()
        #TODO: save move route

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
        @_updateVision()

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
            @_isTargetInViewRadius = AATargetsManager.isPlayerInRadius(@char(), 4)
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
        #TODO: if can't fight?
        #entity set target - target
        @entity().setTarget(target)
        "SEE TARGET IN LINE".p()
        @logic().switchToBattleState()
        return
    
    return
# ■ END EnemyAI_FreeFlow.coffee
#---------------------------------------------------------------------------