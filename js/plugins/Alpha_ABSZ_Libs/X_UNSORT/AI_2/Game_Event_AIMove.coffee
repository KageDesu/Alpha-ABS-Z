#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    _.aaIsNearThePoint = (point, minDist = 1) ->
        try
            sx = Math.abs(@deltaXFrom point.x)
            sy = Math.abs(@deltaYFrom point.y)
            return (sx + sy) <= minDist
        catch e
            AA.w
            return false

    #@[ALIAS]
    ALIAS__searchLimit = _.searchLimit
    _.searchLimit = ->
        if @isABS()
            return 24
        else
            return ALIAS__searchLimit.call(@)
        

    #@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement
    _.updateSelfMovement = ->
        if @_moveType > 3
            @aaUpdateSelfMovementForAI()
        else
            ALIAS__updateSelfMovement.call(@)
        

    _.aaSetMoveTypeApproachTarget = ->
        try
            return if @_moveType == 91
            # * Быстрая проверка, что есть цель
            return unless @AAEntity().inBattle()
            # * Approach target
            @_moveType = 91
            #TODO: from parameters approachSpeed[F,S]
            @setMoveFrequency(5)
            @setMoveSpeed(4)
        catch e
            AA.w e

    _.aaSetMoveTypeKeepBattleDistance = ->
        try
            return if @_moveType == 92
            return unless @AAEntity().inBattle()
            @_moveType = 92
            #TODO: from parameters inBattleSpeed[F,S]
            @setMoveFrequency(5) #3
            @setMoveSpeed(4) #3

            #TODO: from model
            minDist = 2
            maxDist = 3 #view radius
            @_aaNextMoveDecisionTime = 0
            @_aaMinPatrolDist = minDist
            @_aaMaxPatrolDist = maxDist
        catch e
            AA.w e

    _.aaUpdateSelfMovementForAI = ->
        # * Проверка из оригинального метода updateSelfMovement
        if !@_locked && @isNearTheScreen() && @checkStop(@stopCountThreshold())
            # * Всегда поворачиваемся к цели
            switch @_moveType
                when 91 # * Approach target
                    @aaMoveTypeToTarget() #TODO: Пока просто к игроку
                when 92
                    @aaMoveTypeKeepDistance()
                else
                   # * NOTHING
                    # Просто стоим
        return

    # * Двигаться к цели
    _.aaMoveTypeToTarget = ->
        try
            target = @AAEntity().getTarget()
            unless @aaIsNearThePoint(target)
                @aaMoveTypeToPoint(target)
            else
                @aaTurnTowardTarget()
        catch e
            AA.w e

    # * Движение к точке карты
    _.aaMoveTypeToPoint = (point) ->
        try
            #TODO: Надо перерабатывать с учётом диагонального движения (см. АБС МВ)
            #dir = @findDirectionTo(point.x, point.y)
            #@moveStraight(dir) if dir > 0
            #TODO: TEMP
            @moveTowardCharacter(point)
        catch e
            AA.w e
            
    _.aaTurnTowardTarget = ->
        try
            @turnTowardCharacter(@AAEntity().getTarget())
        catch e
            AA.w e

    # * Держать дистанцию боя
    # * Не подходить близко и не отходить далеко
    _.aaMoveTypeKeepDistance = ->
        try
            if @_aaNextMoveDecisionTime > 0
                @_aaNextMoveDecisionTime--
                return
            target = @AAEntity().getTarget()
            distance = $gameMap.distance(@x, @y, target.x, target.y)
            if distance > @_aaMaxPatrolDist
                @aaMoveTypeToTarget(target)
                @_aaNextMoveDecisionTime = 2
            if distance < @_aaMinPatrolDist
                @moveAwayFromCharacter(target)
                @aaTurnTowardTarget()
                @_aaNextMoveDecisionTime = 60
            else
                if @_aaNextMoveDecisionTime == 0 and true #TODO: can make rangomd
                    @moveRandom()
                    @aaTurnTowardTarget()
                    # * Чтобы после случайного движения, сразу к цели не возвращался
                    @_aaNextMoveDecisionTime = 60
            return


        catch e
            AA.w e

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------