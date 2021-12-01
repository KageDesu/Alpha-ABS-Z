#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    #TODO: Параметр, может ли враг двигаться диагонально

    # * Сохраняем базовые настройки движения события
    _.aaStoreMoveData = ->
        # * Выполняется один раз, при первой инициализации
        return if @_storedMoveData?
        @_storedMoveData = {}
        for item in ["_moveSpeed", "_moveType", "_moveFrequency"]
            @_storedMoveData[item] = @[item]
        return

    # * Восстанавливаем базоыве настройки движения события
    _.aaRestoreMoveData = ->
        return unless @_storedMoveData?
        for item in ["_moveSpeed", "_moveType", "_moveFrequency"]
            @[item] = @_storedMoveData[item]
        return
        
    # * Восстановить базовую скорость движения события
    _.aaResetDefaultFreqAndSpeed = ->
        return unless @_storedMoveData?
        for item in ["_moveSpeed", "_moveFrequency"]
            @[item] = @_storedMoveData[item]
        return

    # * Сохранить текущую координату как точка "дом"
    _.aaStoreHomePoint = ->
        @homePoint = { x: @x, y: @y }
        return

    _.aaResetHomePoint = -> @homePoint = null
        

    # * AI Free State управляет этим процессом (начинает и завершает)
    _.aaSetMoveTypeReturnToHomePoint = () ->
        try
            return if @_moveType == 93
            return unless @homePoint?
            @_moveType = 93
            #returnMoveData[F, S]
            #TODO:
        catch e
            AA.w e

    _.aaSetMoveTypeApproachTarget = ->
        try
            return if @_moveType == 91
            # * Быстрая проверка, что есть цель
            return unless @AAEntity().inBattle()
            # * Approach target
            @_moveType = 91
            params = @AAModel().approachMoveData
            if @distTo(@AAEntity().getTarget()) >= params[0]
                @setMoveFrequency(params[1])
                @setMoveSpeed(params[2])
            else
                @aaResetDefaultFreqAndSpeed()
        catch e
            AA.w e

    _.aaSetMoveTypeKeepBattleDistance = ->
        try
            return if @_moveType == 92
            return unless @AAEntity().inBattle()
            @_moveType = 92

            params = @AAModel().inBattleMoveData
            @setMoveFrequency(params[1])
            @setMoveSpeed(params[2])
            @_aaMinPatrolDist = params[0]
            @_aaMaxPatrolDist = @AAModel().viewRadius
            @_aaCanMakeRandomPatrolMove = params[3]
        catch e
            AA.w e

    # * Все эти режимы движения, не имеют собственной логики окончания (выхода из режима)
    _.aaUpdateSelfMovementForAI = ->
        if !@_locked && !@isMoving()
            switch @_moveType
                when 91 # * Approach target
                    @aaMoveTypeToTarget()
                when 92
                    @aaMoveTypeKeepDistance()
                when 93
                    "HOME ".p()
                    if @homePoint?
                        @aaMoveTypeToPoint(@homePoint)
                    else
                        @aaRestoreMoveData()
                else
                   # * NOTHING
                    # Просто стоим
        return


    # * Держать дистанцию боя
    # * Не подходить близко и не отходить далеко
    _.aaMoveTypeKeepDistance = ->
        try
            # * Если меньше 0, то ничего
            if @_aaMinPatrolDist <= 0
                @aaTurnTowardTarget()
                return
            target = @AAEntity().getTarget()
            distance = @distTo(target)
            if distance >= @_aaMaxPatrolDist
                "DIST > MAX".p()
                @aaMoveTypeToTarget(target)
                return
            if distance <= @_aaMinPatrolDist
                "DIST <= MIN".p()
                @moveAwayFromCharacter(target)
                @aaTurnTowardTarget()
                return
            if @_aaCanMakeRandomPatrolMove
                "RAND MOVE".p()
                @moveRandom()
                @aaTurnTowardTarget()
        catch e
            AA.w e
        return

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------