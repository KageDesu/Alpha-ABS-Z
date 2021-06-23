class Sprite_AAMapSkill2Projectile extends Sprite
    constructor: (@mapIndex) ->
        super()
        @skill = $gameMap.aaMapSkills()[@mapIndex]
        @_id = @skill.id()
        @_ended = false
        @_hasHit = false
        @_initParams()
        @_setupImage()
        @_setupDirection()
        @_collisionDetectionThread = new KDCore.TimedUpdate(2, @_checkCollision.bind(@))
        return

    # * Навыв завершён (достиг цели или расстояния)
    isEnd: -> @_ended is true

    update: ->
        super()
        @_updatePosition()
        @_updateFrame() if @_frames?
        if @_hasHit is true
            # * Зануляем принудительно, если достиг цели
            @skill.totalFlyTime = 0
        else
            @_updateMove()
            @_collisionDetectionThread.update()
            @skill.totalFlyTime -= 1
        @_updateEnd()
        return
    
#TODO: СИСТЕМАТИЗАЦИЯ И КОММЕНТАРИИ

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_AAMapSkill2Projectile.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_AAMapSkill2Projectile::

    _._initParams = ->
        @_framesBeforeStartFadeToEnd = 5

        # * FROM START SUBJECT OFFSET ?
        #TODO: С события можно считать (с врага), а с игрока как?
        @_yOffset = 0
        # * Получается всегда, так как навыки могут только персонажи использовать
        @_yOffsetChar = false #always? #@skill.isCharPoint

        @anchor.x = 0.5
        @anchor.y = 0.5
        @z = @skill.zLevel()
        @_hitDist = @skill.hitOffset()
        return

    _._setupImage = ->
        @_setupAnimatedImg()
        @bitmap = ImageManager.loadPicture(@skill.image())
        return

    _._setupAnimatedImg = ->
        @_curFrame = 0
        @_frameTimer = 0
        frames = @skill.image().match(/\((.*)\)/i)
        if frames?
            frames = frames[1].split(',')
            @_frames = Number(frames[0])
            @_frameSpeed = Number(frames[1])
        return

    _._setupDirection = ->
        #yo = if @_yOffset and @_yOffsetChar then @_yOffset / 48 else 0
        yo = 0
        eX = @skill.scX
        eY = @skill.scY
        sX = @skill.x
        sY = @skill.y
        @_angle = Math.atan2(eY - yo - sY, eX - sX) * 180 / Math.PI
        pi = Math.PI / 180
        @rotation = (@_angle + 90) * Math.PI / 180
        @dx = @skill.speed() * Math.cos(@_angle * Math.PI / 180)
        @dy = @skill.speed() * Math.sin(@_angle * Math.PI / 180)
        return

    _._updatePosition = ->
        @x = @skill.x - $gameMap.displayX() * $gameMap.tileWidth()
        @y = @skill.y - $gameMap.displayY() * $gameMap.tileWidth() + @_yOffset
        return

    _._updateMove = ->
        @skill.x += @dx
        @skill.y += @dy
        return

    _._updateFrame = ->
        pw = @bitmap.width / @_frames
        ph = @bitmap.height
        sx = @_curFrame * pw
        sy = 0

        if @_frameTimer >= @_frameSpeed
            @_frameTimer = 0
            @_curFrame = if @_curFrame >= @_frames - 1 then 0 else @_curFrame + 1

        @setFrame(sx, sy, pw, ph)
        @_frameTimer += 1
        return

    _._updateEnd = ->
        return if @skill.totalFlyTime > 0
        if @_framesBeforeStartFadeToEnd < 0
            @opacity -= 40
            if @opacity <= 0
                @_ended = true
                AA.EV.call("MapSkillsRequestsClean")
        else
            @_framesBeforeStartFadeToEnd -= 1

    _._checkCollision = ->
        return if @opacity < 255
        playerHit = @_checkHitPlayer()
        if playerHit is true
            "PLAYER HIT".p()
            @onHit($gamePlayer)
            return
        # * Для оптимизации, считаем один раз тут, а не в каждом методе
        tx = Math.floor(@skill.x / $gameMap.tileWidth())
        ty = Math.floor(@skill.y / $gameMap.tileWidth())
        map = @_checkHitMap(tx, ty)
        if map is true
            "MAP OBSTCL HIT".p()
            @onHit(null)
            return
        point = @_checkHitPoint(tx, ty)
        if point is true
            "POINT HIT".p()
            @onHit(null)
            return
        event = @_checkHitEvent(tx, ty)
        if event?
            "EVENT HIT".p()
            @onHit(event)
        return

    # * Когда достиг игрока
    _._checkHitPlayer = ->
        return false if @skill.isSubjectIsPlayer()
        dist = AA.Utils.Math.getXYDistance(
            $gamePlayer.screenX(), $gamePlayer.screenY() - $gameTemp.aaProjYOff, @x, @y
        )
        return dist < @_hitDist && @isSameMapLevel($gamePlayer._priorityType)

    # * Когда достиг точки на карте (указанной как цель)
    _._checkHitPoint = (tx, ty) ->
        return @skill.tX == tx and @skill.tY == ty

    # * Когда препятсвие на карте (Регион или Terrain)
    _._checkHitMap = (tx, ty) ->
        return @skill.isHaveRegion($gameMap.regionId(tx, ty)) ||
            @skill.isHaveTerrain($gameMap.terrainTag(tx, ty))

    # * Когда достиг события
    _._checkHitEvent = (tx, ty) ->
        subId = @skill.subject
        for ev in $gameMap.events()
            continue unless ev?
            # * В себя нельзя попасть
            continue if ev.eventId() == subId
            dist = AA.Utils.Math.getXYDistance(
                ev.screenX(), ev.screenY() - $gameTemp.aaProjYOff, @x, @y
            )
            if dist < @_hitDist && @isEventIsObstacle(ev)
                return ev
        return null

    _.isSameMapLevel = (priorityType) ->
        # * Ниже персонажей
        return priorityType == 0 if @z <= 2
        # * На одном уровне
        return priorityType == 1 if @z <= 4
        # * Выше
        return priorityType == 3

    # * Блокирует ли событие Projectile ?
    _.isEventIsObstacle = (event) ->
        return false if event._erased
        #TODO: projBlock types
        #return false if event.
        return @isSameMapLevel(event._priorityType)

    _.onHit = (target) ->
        @_hasHit = true
        @opacity = 0
        "HIT".p()
        console.info(target)
        #TODO: Play Animation (MAP or TARGETS?) Always map ?
        #TODO: Do Common Action
        #TODO: Do ABS Action
        return
    
    return
# ■ END Sprite_AAMapSkill2Projectile.coffee
#---------------------------------------------------------------------------
