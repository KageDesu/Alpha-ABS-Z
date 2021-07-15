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
        events = @_collectAAEventsInPoints([point])
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
                targets = $gameMap.eventsXyAAExt(point.x, point.y)
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
                events.push ...$gameMap.eventsXyAAExt(p.x, p.y)
        catch e
            AA.w e
        return events

    _._collectPartyMembersInPoints = (points) ->
        members = []
        try
            #TODO: followers
            # * Сейчас только проверка на игрока
            for p in points
                if $gamePlayer.posExt(p.x, p.y)
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
    ###_.isCharExtInPoint = (x, y) ->
        try
            #return
        catch e
            AA.w e#
        return false###

    # * Получить дистанцию между персонажем и точкой (на экране)
    # * Учитываются расширенные HitBox
    _.getScreenExtDistance = (char, offsetY, x2, y2) ->
        try
            return 1000 unless char?
            if char.aaIsHaveExtendedHitBoxes()
                screenXs = char.screenXExt()
                screenYs = char.screenYExt()
                dist = []
                for x in screenXs
                    for y in screenYs
                        dist.push(
                            AA.Utils.Math.getXYDistance(x, y - offsetY, x2, y2)
                        )
                return dist.min()
            else
                return AA.Utils.Math.getXYDistance(
                    char.screenX(), char.screenY() - offsetY, x2, y2
                )
        catch e
            AA.w e
            return 1000
    
    # * Проверка видимости между двумя точками (TRUE - видно точку)
    _.isVisionLineIsFree = (startPoint, endPoint) ->
        try
            dist = $gameMap.distance(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            # * Если дистанция 1 (рядом), то значит на линии видимости не может быть помех
            return true if dist <= 1

            # * Количество точек проверок на линии
            # * Хватит точности 1 к 1, поэтому количество точек = дистанции
            allPoints = @getLineBetweenTwoPoints(startPoint, endPoint, dist)
            betweenPoints = []

            # * Убираем End и Start точки с результата
            # * Нам важно проверить путь между начальной и конечной точкой
            sP = [startPoint.x, startPoint.y]
            eP = [endPoint.x, endPoint.y]
            for p in allPoints
                if !AA.Utils.isSamePointA(p, sP) && !AA.Utils.isSamePointA(p, eP)
                    betweenPoints.push(p)
            
            # * Если между нет точек, то значит на линии видимости
            return true if betweenPoints.length == 0
            
            console.log(betweenPoints)

            for p in betweenPoints
                # * Если в точке находится объект (зона), что мешает зрению, значит false
                if @isPointIsColiderForVision(p[0], p[1])
                    return false

            return true

        catch e
            AA.w e
        return false

    # * Возвращает линию из точек между начальной и конечной точкой (включая начальную и конечную)
    _.getLineBetweenTwoPoints = (startPoint, endPoint, precission) ->
        try
            tw = $gameMap.tileWidth()

            sX = Number(startPoint.x * tw + tw / 2)
            sY = Number(startPoint.y * tw + tw / 2)
            eX = Number(endPoint.x * tw + tw / 2)
            eY = Number(endPoint.y * tw + tw / 2)

            points = []

            for i in [1..precission]
                k = (i / precission)
                px = (k * (eX - sX) + sX)
                py = (k * (eY - sY) + sY)
                cpx = Math.floor(px / $gameMap.tileWidth())
                cpy = Math.floor(py / $gameMap.tileHeight())
                points.push([cpx, cpy])

            return points
        catch e
            AA.w e
        return []

    # * Находится ли в данной точке карты что-либо, что мешает видимости
    # * TRUE - нельзя "видеть" через эту точку
    _.isPointIsColiderForVision = (x, y) ->
        try
            #TODO: каждоый враг имеет свой набор или общий набор регионов???
            noVisionRegions = []
            noVisionTerrains = []
            return true if noVisionRegions.contains($gameMap.regionId(x, y))
            return true if noVisionTerrains.contains($gameMap.terrainTag(x, y))
            # * События с расширенными HitBox участвуют в области видимости
            events = $gameMap.eventsXyExt(x, y)
            return false if events.isEmpty()
            # * Если хоть один блокирует, то значит заблокирована видимость
            return events.some (e) -> e.aaIsBlockVision()
        catch e
            AA.w e
        return true

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------
