#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Base.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Base::

    # * Запустить анимацию в точке на карте
    _.aaCreateAnimationOnMap = (mapX, mapY, request) ->
        animation = $dataAnimations[1]
        # * Конвертируем точку карты в точку экрана
        point = new KDCore.Point(mapX, mapY)
        point = point.convertToScreen()
        # * Спрайт родитель
        animationTarget = new Sprite()
        animationTarget.move point
        mirror = false
        delay = 0
        # * Спрайт анимации
        sprite = new Sprite_Animation()
        targetSprites = [animationTarget]
        # * Нужны чтобы вызвать метод endAnimation - если он есть, при удалении анимации
        sprite.targetObjects = []
        # * Настройка
        sprite.setup targetSprites, animation, mirror, delay, null
        @_effectsContainer.addChild sprite
        @_animationSprites.push sprite
        # * Родитель анимации надо добавить на Spriteset
        @addChild animationTarget
        return
    
    _.aaCreateLinkedAnimation = () ->
        unless @_linkSprite?
            @_linkSprite = new Sprite()
            @_linkSprite.bitmap = new Bitmap(20, 20)
            #@_linkSprite.bitmap.fillAll()
            @addChild @_linkSprite
            #@_linkSprite.move 100, 100
            @_linkSprite.x = $gamePlayer.screenX()
            @_linkSprite.y = $gamePlayer.screenY()
        else
            @_linkSprite.x = $gamePlayer.screenX()
            @_linkSprite.y = $gamePlayer.screenY()

        sprite = new Sprite_AnimationLoop()
        sprite.targetObjects = []
        animation = $dataAnimations[130]
        sprite.setup [@_linkSprite], animation, false, 0, null
        @_effectsContainer.addChild sprite
        #@_animationSprites.push sprite
        @__looped = sprite
        $gameTemp._l = @__looped
        return

    #@[ALIAS]
    ALIAS__updateAnimations = _.updateAnimations
    _.updateAnimations = ->
        if @__looped?
            if !@__looped.isPlaying()
                @__looped.destroy()
                @_effectsContainer.removeChild @__looped
                @aaCreateLinkedAnimation()
        ALIAS__updateAnimations.call(@)

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        #@_linkSprite?.move TouchInput
        @_linkSprite?.y += 4
        #if $gameTemp._proj?
        #    $gameTemp._proj.apply(@_linkSprite)
            #@__looped.setRotation(0, 0, $gameTemp._proj.getCurrentRotation())

    #TODO: animationShouldMirror - надо определять кто где находится?? - но это не для карты

    return
# ■ END Spriteset_Base.coffee
#---------------------------------------------------------------------------


class Sprite_AnimationLoop extends Sprite_Animation
    constructor: () ->
        super()

    checkEnd: ->
        super()
        #if @_playing == false
            #"RESTART".p()
            #@_maxTimingFrames = 0
            #@_frameIndex = 0
            #@setup(@_targets, @_animation, @_mirror, @_delay, null)

    #setup: (a,)