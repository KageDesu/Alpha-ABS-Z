# * Контроллер анимации (смена кадров, направлений)
# * rootAnimation - это XAnimaSet
# * Контроллер хранится в Sprite_Character
class XAnimaSetController
    constructor: (startDirection, @rootAnimation) ->
        @cFrame = 0
        @cDir = startDirection
        @_timer = 0
        @_sKoef = 0
        @_requireRefresh = true
        @_animPlaying = false
        @_initialFrame = false
        
    isPlaying: -> @_animPlaying is true

    # * Класс каждый раз получает character, не хранит
    update: (character) ->
        @_requireRefresh = false
        @_updateDirection(character)
        @_updateFrames(character)

    _updateDirection: (character) ->
        #TODO: 8 way
        #dDir = character._diagonalDir
        cDir = character.direction()
        #if dDir == 1
        #    cDir = 1
        @requestRefresh() if cDir != @cDir
        @cDir = cDir

    _updateFrames: (character) ->
        if @rootAnimation.isMovement()
            @_updateMovement(character) unless @rootAnimation.isNoFrames()
        else # * IDLE AND ACTION SAME WAY
            @_updateAction(character)

    _updateMovement: (c) ->
        if c.isMoving()
            @_sKoef = c.realMoveSpeed()
            @_setInitialFrame(1)
            @_animPlaying = true
            @_updateTimer c.isDashing()
            @_nextMovementFrame() if @_timer == 0
        else
            @_sKoef = 0
            @_updateTimer false
            if @_timer == 0
                @requestRefresh() if @cFrame != 0
                @resetAnimation()

    _setInitialFrame: (frameIndex) ->
        return if @_initialFrame is true # * Установка начального кадра
        @cFrame = frameIndex
        @_initialFrame = true
        @_timer = 0
        @requestRefresh()

    _updateTimer: (isFast) ->
        @_timer += 1
        @_timer += 0.5 if isFast
        @_timer = 0 if @_timer >= @_speed()

    _speed: -> @rootAnimation.speed - @_sKoef
    
    _nextMovementFrame: ->
        @cFrame++
        if @cFrame == @rootAnimation.frames
            @cFrame = 1 # * Не 0, 0 - когда стоит
        @requestRefresh()

    _updateAction: (c) ->
        if @_initialFrame == false
            @_setInitialFrame(0)
            c.onAnimaXActionStart()
        @_updateTimer(false)
        @_nextActionFrame(c) if @_timer == 0

    _nextActionFrame: (c) ->
        @_animPlaying = true
        @cFrame++
        if @cFrame == @rootAnimation.frames
            @cFrame = 0
            unless @rootAnimation.isLoop
                @resetAnimation()
                c.onAnimaXActionEnd()
        @requestRefresh()

    resetAnimation: ->
        @_timer = 0
        @cFrame = 0
        @_animPlaying = false
        @_initialFrame = false

    # * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
    requestRefresh: -> @_requireRefresh = true

    bitmap: -> @rootAnimation.getAnimationByDirection(@cDir).getFrame(@cFrame)
    
    isChanged: -> @_requireRefresh