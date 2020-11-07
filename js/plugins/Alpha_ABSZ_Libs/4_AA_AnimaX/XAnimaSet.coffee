# * Набор анимаций для всех направлений

#DIRECTIONS:
# 2 - DOWN
# 8 - UP
# 4 - LEFT
# 6 - RIGHT

#TYPE:
# 0 - movement
# 1 - idle
# 2 - action

#@[STORABLE]
class XAnimaSet
    constructor: (@type, @filename, @frames, @speed, @isNoDirections) ->
        @_setupAnimations()
        @isLoop = false
        @actionName = "Action"
        @moveToIdleDelay = 30
        @waitActionEnd = true

    _setupAnimations: ->
        @animations = []
        if @isNoDirections is true
            @animations[0] = new XAnima(@frames, @filename)
        else
            @animations[0] = new XAnima(@frames, @filename + "_D")
            @animations[1] = new XAnima(@frames, @filename + "_L")
            @animations[2] = new XAnima(@frames, @filename + "_R")
            @animations[3] = new XAnima(@frames, @filename + "_U")
            #if @type == 0
            #    @animations[4] = new XAnima(@frames, @filename + "_DL")

    setActionName: (@actionName) ->

    # * Имя действия используется частями, чтобы определять правила и анимации нужные
    getActionName: ->
        switch @type
            when 0
                return "Move"
            when 1
                return "Idle"
            else
                return @actionName
                

    preLoad: ->
        anim.preLoad() for anim in @animations
        
    isNoFrames: -> @frames == 1

    isWait: -> @waitActionEnd is true

    expandFirstFrameTimes: (times) ->
        anim.expandFirstFrame(times) for anim in @animations
        @frames += times

    getAnimationByDirection: (dir) ->
        if @isNoDirections is true
            return @animations[0]
        switch dir
            when 8
                return @animations[3]
            when 2
                return @animations[0]
            when 4
                return @animations[1]
            when 6
                return @animations[2]
           # when 1
            #    if @type == 0
            ##        return @animations[4]
             #   else
             #       return @animations[1]
        return null

    isMovement: -> @type == 0

    isAction: -> @type == 2

    isIdle: -> @type == 1