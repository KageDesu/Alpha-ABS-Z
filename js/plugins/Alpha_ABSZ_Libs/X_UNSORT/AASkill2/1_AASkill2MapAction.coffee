# * Класс оболочка навыка на карте (т.е. когда навык уже "запущен")
# * Содержит методы обработки урона, целей и прочие механики работы АБС навыка

#@[STORABLE]
class AASkill2MapAction
    constructor: (@aaSkill2, subject, point) ->
        # * Эти значения меняются из Sprite_AAMapSkill2Projectile
        @x = 0
        @y = 0
        @totalFlyTime = @_calculateFlyTime()
        @setSubject(subject)
        @setTargetPoint(point)
        return

    setSubject: (subject) ->
        @subject = null
        return unless subject.isABS()
        if subject == $gamePlayer
            @subject = 0
        else if subject instanceof Game_Event
            @subject = subject.eventId()
        #else # * PARTY MEMBER
            # < 0 ?
        #    @subject = 1000 +
        #TODO: party member subject
        @_initStartPoint()
        return

    setTargetPoint: (point) ->
        point = @preparePoint(point) if @subject?
        console.info(point)
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
        if @aaSkill2.isInPoint()
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

    isSubjectIsPlayer: -> @subject == 0

    getSubject: ->
        if @subject == 0
            return $gamePlayer
        else if @subject > 0
            return $gameMap.event(@subject)
        else
            #TODO: PARTY MEMBERS
            #$gamePlayer.follwers(index)
            return null

    id: -> @aaSkill2.databaseId

    zLevel: -> @aaSkill2.z

    image: -> @aaSkill2.img

    hitOffset: -> @aaSkill2.hitOffset

    speed: -> @aaSkill2.vSpeed

    hitAnimation: -> 3

    isHaveRegion: (regionId) -> false

    isHaveTerrain: (terrainTag) -> false

    isCanHitPoint: () -> @aaSkill2.isInPoint()

    isNoContact: () -> @aaSkill2.isNoContact()

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
    _._calculateFlyTime = -> 120


    return
# ■ END AASkill2MapAction.coffee
#---------------------------------------------------------------------------
    