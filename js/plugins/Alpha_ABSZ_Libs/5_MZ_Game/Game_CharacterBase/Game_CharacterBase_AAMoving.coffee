#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    _.distTo = (point) -> $gameMap.distance(@x, @y, point.x, point.y)

    # * Находится ли на Х расстоянии к точке
    _.aaIsNearThePoint = (point, minDist = 1) ->
        try
            sx = Math.abs(@deltaXFrom point.x)
            sy = Math.abs(@deltaYFrom point.y)
            return (sx + sy) <= minDist
        catch e
            AA.w
            return false

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
            return unless point?
            #TODO: Надо перерабатывать с учётом диагонального движения (см. АБС МВ)
            #dir = @findDirectionTo(point.x, point.y)
            #@moveStraight(dir) if dir > 0
            #TODO: TEMP
            @moveTowardCharacter(point)
        catch e
            AA.w e
            
    # * Повернуться к цели
    _.aaTurnTowardTarget = ->
        try
            @turnTowardCharacter(@AAEntity().getTarget())
        catch e
            AA.w e
    
    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------