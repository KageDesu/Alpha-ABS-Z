# * Класс оболочка навыка на карте (т.е. когда навык уже "запущен")
# * Содержит методы обработки урона, целей и прочие механики работы АБС навыка

#@[STORABLE]
class AASkill2MapAction
    constructor: (@aaSkill, subject, point) ->
        # * Эти значения меняются из Sprite_AAMapSkill2Projectile
        @x = 0
        @y = 0
        @totalFlyTime = @_calculateFlyTime()
        @setSubject(subject)
        @setTargetPoint(point)
        return

    setSubject: (subject) ->
        @packedSubject = null
        return unless subject.isABS()
        @packedSubject = AA.Utils.packAAEntity(subject)
        @_initStartPoint()
        return

    setTargetPoint: (point) ->
        point = @preparePoint(point) if @packedSubject?
        if point instanceof Game_Character
            point = point.toPoint()
        # * Точки на экране
        @scX = @_convertPointValue(point.x)
        @scY = @_convertPointValue(point.y)
        # * Точки на карте
        @tX = point.x
        @tY = point.y
        return

    preparePoint: (point) ->
        if @aaSkill.isInPoint()
            return point
        else
            # * По направлению персонажа (face direction)
            subject = @getSubject()
            if subject._diagonalDir? and subject._diagonalDir isnt false
                direction = subject._diagonalDir
            else
                direction = subject.direction()
            return AA.Utils.Math.getProjectilePointByDirection(subject.toPoint(), direction)
        return

    isSubjectIsPlayer: -> @packedSubject? and @packedSubject.type is 0

    getSubject: -> AA.Utils.unpackAAEntity(@packedSubject)

    id: -> @aaSkill.databaseId

    zLevel: -> @aaSkill.z

    image: -> @aaSkill.skillImg

    hitOffset: -> @aaSkill.hitOffset

    speed: -> @aaSkill.speed

    #TODO:
    isHaveRegion: (regionId) -> false

    #TODO:
    isHaveTerrain: (terrainTag) -> false

    isCanHitPoint: () -> @aaSkill.isInPoint()

    isNoContact: () -> @aaSkill.isNoContact()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AASkill2MapAction.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AASkill2MapAction::

    _._initStartPoint = ->
        subject = @getSubject()
        @x = @_convertPointValue(subject.x)
        @y = @_convertPointValue(subject.y)
        return

    # * Приводим обе точки (старт и финишь) к одному формату
    _._convertPointValue = (value) ->
        tw = $gameMap.tileWidth()
        return Number(value * tw + tw / 2)
    
    # * Дистанцию полёта определяем по времени, а не по дистанции
    _._calculateFlyTime = ->
        if @aaSkill.range <= 0 || @speed() <= 0
            return 10
        else
            dist = @aaSkill.range * $gameMap.tileWidth() + $gameMap.tileWidth() / 2
            return dist / @speed()

    return
# ■ END AASkill2MapAction.coffee
#---------------------------------------------------------------------------
    