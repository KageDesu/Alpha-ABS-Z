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
        #Например в зависимости от Subject и friendly fire
        # * Убираем НЕ АБС события
        targets = targets.filter (t) -> t.isActive()
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
        targets = @_collectAllAAEntitiesInPoints(searchMapPoints)
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

    # * Собирает все АБС сущности (события + игрок + партия)
    _._collectAllAAEntitiesInPoints = (points) ->
        aaEntities = []
        aaEntities.push(...@_collectAAEventsInPoints(points))
        aaEntities.push(...@_collectPartyMembersInPoints(points))
        return aaEntities

    # * Собирает все АБС события (Активные) в точках карты
    _._collectAAEventsInPoints = (points) ->
        events = []
        try
            for p in points
                events.push ...$gameMap.eventsXyAA(p.x, p.y)
        catch e
            AA.w e
        return events

    _._collectPartyMembersInPoints = (points) ->
        members = []
        try
            #TODO: followers
            # * Сейчас только проверка на игрока
            for p in points
                if $gamePlayer.pos(p.x, p.y)
                    members.push($gamePlayer)
                    break
        catch e
            AA.w e
        return members

    # * Быстрый метод проверки, находится ли игрок в определённом радиусе
    _.isPlayerInRadius = (point, radius) ->
        try
            return @isCharExtInRadius(point, radius, $gamePlayer)
        catch e
            AA.w e
            return false

    # * Получить сущности в радиусе (из набора сущностей)
    _.getFilteredInRadius = (point, radius, candidates) ->
        members = []
        try
            for c in candidates
                members.push(c) if @isCharExtInRadius(point, radius, c)
        catch e
            AA.w e
        return members

    # * Находится ли персонаж (точка) в радиусе (с учётом расширенных HitBox)
    _.isCharExtInRadius = (point, radius, char) ->
        try
            { x, y } = point
            points = $gameMap.aaGetExtendedPointsFor(char)
            for p in points
                if $gameMap.distance(x, y, p.x, p.y) < radius
                    return true
        catch e
            AA.w e
        return false

    # * Находится ли в точке AAEntity (с учётом расширенных HitBox)
    _.isCharExtInPoint = (x, y) ->
        try
            
        catch e
            AA.w e
        return false

    # * Получить AAEntity находяющуюся на линии от одной до другой точки
    # * Используется для проверки зрения (на линии видимости ли сущность)
    # * MaxRange используется чтобы определить количество проверок (не больше)
    _.getAAEntityOnVisionLine = (startPoint, endPoint, maxRange) ->
        try
            checkStep = 3
            checkCount = Math.round((maxRange * $gameMap.tileWidth() + $gameMap.tileWidth() / 2) / checkStep)
            console.log(checkCount)
            tw = $gameMap.tileWidth()
            sX = Number(startPoint.x * tw + tw / 2)
            sY = Number(startPoint.y * tw + tw / 2)
            cX = sX
            cY = sY
            eX = Number(endPoint.x * tw + tw / 2)
            eY = Number(endPoint.x * tw + tw / 2)
            for i in [0...checkCount]
                _angle = Math.atan2(eY - sY, eX - sX) * 180 / Math.PI
                dx = checkStep * Math.cos(_angle * Math.PI / 180)
                dy = checkStep * Math.sin(_angle * Math.PI / 180)
                cX += dx
                cY += dy
                checkPointX = Math.floor(cX / $gameMap.tileWidth())
                checkPointY = Math.floor(cY / $gameMap.tileWidth())
                console.info([checkPointX, checkPointY])
                if @checkVisionCollision(checkPointX, checkPointY)
                    # * Линия видимости проходит в этой точке, пытаемся найти АА сущность в точке
                    #TODO: Тут всех собирать или только игрока?
                    #events = $gameMap.eventsXyAA(checkPointX, checkPointY).concat($gamePlayer)
                    #return events[0] unless events.isEmpty()
                    #TODO: Пока что только игрок (так как vision используют пока только АИ боты врагов)
                    screenX = cX - $gameMap.displayX() * $gameMap.tileWidth()
                    screenY = cY - $gameMap.displayY() * $gameMap.tileWidth()
                    dist = AA.Utils.Math.getXYDistance(
                        $gamePlayer.screenX(), $gamePlayer.screenY(), screenX, screenY
                    )
                    if dist < 32 #&& @isEventIsObstacle(ev)
                        return $gamePlayer
                    #if $gamePlayer.pos(checkPointX, checkPointY)
                    #    return $gamePlayer
                else
                    return null # * Нет проходит линия видимости
        catch e
            AA.w e
        return null

    # * Проходит ли "зрение" в этой точке -> true - проходит
    _.checkVisionCollision = (x, y) ->
        try
            #TODO: каждоый враг имеет свой набор или общий набор регионов???
            noVisionRegions = []
            noVisionTerrains = []
            return !noVisionRegions.contains($gameMap.regionId(x, y))
            return !noVisionTerrains.contains($gameMap.terrainTag(x, y))
            #TODO: event with NoVisionPass (Общий коммент для всех событий АБС и нет)
            #events = $gameMap.eventsXy(x, y) -> может быть несколько?
            #TODO: return !event.aaIsBlockVision()
            return true
        catch e
            AA.w e
        return false

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------
