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
    #?[OUTER - used by AABattleActionsManager]
    #? Этот навык используется напрямую для выбора целей в битве
    _.getTargetInPoint = (subject, aaSkill, point) ->
        events = @_collectAllAAEntitiesInPoints([point])
        return null if events.isEmpty()
        # * В зависимости от Subject и в зависимости от действия навыка
        targets = @filteredTargetsForSubject(subject, aaSkill, events)
        if targets? and targets.length > 0
            return targets[0]
        else
            return null

    # * Отфильтровать цели (из найденных в точках) для Subject (навыка)
    _.filteredTargetsForSubject = (subject, aaSkill, targets) ->
        try
            entity = subject.AAEntity()
            candidates = []
            if aaSkill.isForEnemies()
                for t in targets
                    if entity.isMyEnemy(t.AAEntity())
                        candidates.push(t)
            if aaSkill.isForFriends()
                for t in targets
                    if !entity.isMyEnemy(t.AAEntity())
                        candidates.push(t)
            return candidates
        catch e
            AA.w e
            return []

    # * Собрать цели для навыка (Projectile)
    #?[OUTER - used by AABattleActionsManager]
    #? Этот навык используется напрямую для выбора целей в битве
    _.collectTargtesForSkill = (subject, absSkill, point) ->
        targets = []
        # * Точные цели селектора, если мнгновенный навык (только для игрока)
        if absSkill.isInstant() && subject == $gamePlayer && $gameTemp._aaSkillSelectorTargets?
            targets = $gameTemp._aaSkillSelectorTargets
        else
            targets = @collectTargetsForSkillInMapPoint(absSkill, point)
        # * Убираем НЕ АБС события
        targets = targets.filter (t) -> t.isActive()
        targets = @filteredTargetsForSubject(subject, absSkill, targets)
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
        targets = @_collectAllAAEntitiesInPoints(searchMapPoints)
        return targets

    _.collectTargetsForPlayerSelector = (aaSkill) ->
        try
            # * Проверка range, если выходит за range, то не будут цели выделяться
            if AA.Utils.Math.getDistanceMapPlayerPoint(TouchInput.toMapPoint()) <= aaSkill.range
                targets = @collectTargetsForSkillInScreenPoint(aaSkill, TouchInput)
            else
                targets = []
            # * Фильтр целей сразу
            return @filteredTargetsForSubject($gamePlayer, aaSkill, targets)
        catch e
            AA.w e
            return []

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
        if AA.Network.isNetworkGame()
            aaEntities.push(...@_collectNetworkCharsInPoints(points))
        #TODO: collect network characters as well
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

    _._collectNetworkCharsInPoints = (points) ->
        members = []
        try
            for p in points
                members.push ...$gameMap.netChars().filter (c) -> c.posExt(p.x, p.y)
        catch e
            AA.w e
        return members

    _.collectAllABSEntitiesOnMap = () ->
        aaEntities = [$gamePlayer]
        aaEntities.push(...$gameMap.eventsAA())
        #TODO: party members
        if AA.Network.isNetworkGame()
            aaEntities.push(...$gameMap.netChars())
        return aaEntities.filter(@isValidTarget)

    # * Быстрый метод проверки, находится ли игрок в определённом радиусе
    _.isPlayerInRadius = (point, radius) ->
        try
            return @isCharExtInRadius(point, radius, $gamePlayer)
        catch e
            AA.w e
            return false

    _.getAvailableTargetsInRadius = (forWho, radius) ->
        try
            # * forWho идёт как Point тоже
            candidates = @collectAllABSEntitiesOnMap()
            candidates = candidates.filter (t) -> forWho.isMyEnemy(t)
            return @getFilteredInRadius(forWho, radius, candidates)
        catch e
            AA.w e
            return []

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
                if $gameMap.distance(x, y, p.x, p.y) <= radius
                    return true
        catch e
            AA.w e
        return false

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

    # * Цель подходящая (проверки, см. BattleManagerABS.isValidTarget)
    #TODO: isValidTarget
    _.isValidTarget = (targetChar) -> targetChar? and targetChar.isActive()

    # * Находится ли точка (цель) в области дейтсвия навыка (range)
    _.isInSkillRange = (char, skillId, targetPoint) ->
        try
            #TODO: ПОка просто
            dist = char.distTo(targetPoint)
            dataObj = AA.Utils.getAASkillObject(skillId)
            skill = dataObj.AASkill
            #console.log("D " + dist)
            #console.log("R " + skill.range)
            return dist <= skill.range
        catch e
            AA.w e
            return false

    # * Получить всех ботов, которые имеют игрока своей целью
    #TODO: TeamID учёт
    # * На данный момент не проверяется кто именно цель, так как нету сопартийцев и teamId
    _.getAllWhoHavePlayerAsTarget = ->
        return $gameMap.eventsAA().filter (e) -> e.AAEntity().isHasTarget()

    # * Получить всех "врагов", которые имеют целью игрока с учётом радиуса
    _.getAllWhoHavePlayerAsTargetInRange = (range) ->
        candidates = @getAllWhoHavePlayerAsTarget()
        if candidates.length > 0
            candidates = AATargetsManager.getFilteredInRadius($gamePlayer, range, candidates)
        return candidates
    
    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------
