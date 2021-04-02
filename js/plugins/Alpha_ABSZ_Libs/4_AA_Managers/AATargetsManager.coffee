# * Менеджер по работе с целями (поиск целей, определение)

AATargetsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AATargetsManager

    # * Собирает все возможные цели для навыка в точке
    _.collectTargetsForSkillInPoint = (aaSkill, point) ->
        return [] unless aaSkill?
        return [] unless point?
        targets = []
        #TODO: radius == 1, ignore square
        # * Сформировать квадрат выбора
        searchMapPoints = @_createSquarePoints(aaSkill.radius, point)
        #console.info(searchMapPoints)
        targets = @_collectEventsInPoints(searchMapPoints)
        return targets

    # * Создаём точки карты в квадратной области навыка (пиксели)
    _._createSquarePoints = (radius, point) ->
        cellSize = $gameMap.tileWidth()
        cellSize2 = cellSize / 2
        points = []
        pxRadius = radius * cellSize / 2
        sx = point.x - pxRadius
        sy = point.y - pxRadius
        ex = point.x + pxRadius
        ey = point.y + pxRadius
        for i in [sx...ex] by cellSize
            for j in [sy...ey] by cellSize
                points.push(new KDCore.Point(i + cellSize2 / 2, j + cellSize2).convertToMap())
        return points

    _._collectAllInPoints = (points) ->
        #TODO: player, ally, events (AA)

    # * Собирает все АБС события (Активные) в точках карты
    _._collectEventsInPoints = (points) ->
        events = []
        try
            for p in points
                events.push ...$gameMap.eventsXyAA(p.x, p.y)
        catch e
            AA.w e
        return events

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------
