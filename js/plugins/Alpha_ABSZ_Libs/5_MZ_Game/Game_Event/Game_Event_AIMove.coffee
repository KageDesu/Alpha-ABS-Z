#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    # * Сохраняем базовые настройки движения события
    _.aaStoreMoveData = ->
        @_storedMoveData = {}
        for item in ["_moveSpeed", "_moveType", "_moveFrequency"]
            @_storedMoveData[item] = @[item]
        return

    # * Восстанавливаем базоыве настройки движения события
    _.aaRestoreMoveData = ->
        return unless @_storedMoveData?
        for item in ["_moveSpeed", "_moveType", "_moveFrequency"]
            @[item] = @_storedMoveData[item]
        
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

    #@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement
    _.updateSelfMovement = ->
        if @_moveType > 3
            @aaUpdateSelfMovementForAI()
        else
            ALIAS__updateSelfMovement.call(@)
        

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
            #TODO: from parameters approachMoveData[R,F,S]
            if @distTo(@AAEntity().getTarget()) >= 3
                @setMoveFrequency(5)
                @setMoveSpeed(4)
            else
                @aaResetDefaultFreqAndSpeed()
        catch e
            AA.w e

    _.aaSetMoveTypeKeepBattleDistance = ->
        try
            return if @_moveType == 92
            return unless @AAEntity().inBattle()
            @_moveType = 92

            #TODO: from model
            minDist = 1 #2 #from param
            maxDist = 6 #view radius (MAX)
            isRandom = true

            #inBattleMoveData[MIN, F, S, RAND]
            #TODO: from parameters
            @setMoveFrequency(3)
            @setMoveSpeed(3)

            @_aaNextMoveDecisionTime = 0
            @_aaMinPatrolDist = minDist
            @_aaMaxPatrolDist = maxDist
            @_aaCanMakeRandomPatrolMove = isRandom
        catch e
            AA.w e

    # * Все эти режимы движения, не имеют собственной логики окончания (выхода из режима)
    _.aaUpdateSelfMovementForAI = ->
        if !@_locked && !@isMoving() && @isNearTheScreen()
            switch @_moveType
                when 91 # * Approach target
                    @aaMoveTypeToTarget() #TODO: Пока просто к игроку
                when 92
                    @aaMoveTypeKeepDistance()
                when 93
                    "HOME ".p()
                    if @homePoint?
                        @aaMoveTypeToPoint(@homePoint)
                    else
                        @_restoreMoveData()
                else
                   # * NOTHING
                    # Просто стоим
        return


    # * Держать дистанцию боя
    # * Не подходить близко и не отходить далеко
    _.aaMoveTypeKeepDistance = ->
        try
            # * Если меньше 0, то ничего
            if @_aaMinPatrolDist < 0
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