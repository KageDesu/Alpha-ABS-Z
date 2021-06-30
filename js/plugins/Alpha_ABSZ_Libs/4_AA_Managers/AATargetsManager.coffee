# * Менеджер по работе с целями (поиск целей, определение)

AATargetsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AATargetsManager

    # * Используется для определения цели для Instant NoProjectile Direction навыков
    # * Проверка точки на наличие целей для навыка
    _.getTargetInPoint = (subject, aaSkill, point) ->
        #TODO: в зависимости от subject и aaSkill
        events = @_collectEventsInPoints([point])
        return events[0]

    # * Собрать цели для навыка (Projectile)
    _.collectTargtesForSkill = (absSkill, point) ->
        targets = []
        # * Точные цели селектора, если мнгновенный навык (только для игрока)
        if absSkill.isInstant() && $gameTemp._aaSkillSelectorTargets?
            targets = $gameTemp._aaSkillSelectorTargets
        else
            targets = @collectTargetsForSkillInMapPoint(absSkill, point)
        #TODO: фильтры целей разные
        #.isActive()
        #Например в зависимости от Subject и friendly fire
        # * Сбрасываем цели селектора
        $gameTemp._aaSkillSelectorTargets = null
        return targets

    # * Собирает все возможные цели для навыка в точке карты
    # * (Лучше использовать этот метод для определения целей)
    _.collectTargetsForSkillInMapPoint = (aaSkill, point) ->
        return [] unless aaSkill?
        return [] unless point?
        targets = []
        if point instanceof Game_Character and aaSkill.isSingleTargetArea()
            targets = [point]
        else
            if aaSkill.isSingleTargetArea()
                targets = $gameMap.eventsXyAA(point.x, point.y)
            else
                kdPoint = new KDCore.Point(point.x, point.y)
                targets = @collectTargetsForSkillInScreenPoint(aaSkill, kdPoint.convertToScreen())
        return targets

    # * Собирает все возможные цели для навыка в точке экрана
    # * (Используется для сбора событий в радиусе)
    _.collectTargetsForSkillInScreenPoint = (aaSkill, point) ->
        return [] unless aaSkill?
        return [] unless point?
        targets = []
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
