#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_AADamagePopUpItem.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Sprite_AADamagePopUpItem extends KDCore.Sprite
    constructor: (@settings, @value) ->
        super()
        @_init()
        @_createSprites()
        @_start()

    dispose: ->
        @disposed = true
        @visible = false
        @parent?.removeChild(@)
        return

    update: ->
        super()
        return if @disposed is true
        @_updateZoom()
        @_updateImageFadeIn()
        return

    # * Установить позицию и применить случайный сдвиг координат
    setStartPoint: (x, y) ->
        @move(x, y)
        if @settings.randDX > 0
            @x = @x + Math.randomInt(@settings.randDX) - Math.randomInt(@settings.randDX * 2)
        if @settings.randDY > 0
            @y = @y + Math.randomInt(@settings.randDY)
        return

    # * Общие методы создания Pop объекта
    # * Находяться прямо в классе, чтобы не создавать доп. менеджер

    @CreateOnCharacter = (char, settings, value) ->
        try
            return unless KDCore.Utils.isSceneMap()
            return unless char?
            spriteset = $gameMap.spriteset()
            charSprite = spriteset.findTargetSprite(char)
            return unless charSprite?
            { x, y } = charSprite
            y = y - charSprite.patternHeight() - $gameMap.tileWidth() / 2
            Sprite_AADamagePopUpItem.CreateOnScreen(x, y, settings, value)
        catch e
            AA.w e

    @CreateOnMap = (x, y, settings, value) ->
        try
            return unless KDCore.Utils.isSceneMap()
            tempChar = new Game_Character()
            tempChar.setPosition(x, y)
            screenX = tempChar.screenX()
            screenY = tempChar.screenY() - $gameMap.tileWidth()
            Sprite_AADamagePopUpItem.CreateOnScreen(screenX, screenY, settings, value)
        catch e
            AA.w e

    @CreateOnScreen = (x, y, settings, value) ->
        try
            return unless settings?
            return unless KDCore.Utils.isSceneMap()
            popItem = new Sprite_AADamagePopUpItem(settings, value)
            popItem.setStartPoint(x, y)
            spriteset = $gameMap.spriteset()
            spriteset.aaGetDamagePopUpLayer().addChild(popItem)
        catch e
            AA.w e


do ->

    #@[DEFINES]
    _ = Sprite_AADamagePopUpItem::

    _._init = ->
        @disposed = false
        @isNeedZoom = true
        @stayTime = 0
        @maxStayTime = @settings.stayTime# * 60
        return
        
    _._createSprites = ->
        return unless @settings?
        # * Используется для расчёта размера текста
        @bitmap = new Bitmap(50, 50)
        @anchor.x = 0.5
        @anchor.y = 0.5
        try
            @bitmap.fontSize = Math.max(@settings.text.fontSize, @settings.changeFontSize)
            @_createValueText()
            @_createImage() if @settings.image? and String.any(@settings.image.name)
        catch e
            AA.w e

    _._createValueText = ->
        try
            w = @bitmap.measureTextWidth(@value) + 4
            h = @settings.text.fontSize + 10
            @valueSprite = KDCore.Sprite.FromBitmap(w, h)
            @valueSprite.anchor.x = 0.5
            @valueSprite.anchor.x = 0.5
            @applyTextSettingsByJson @valueSprite, @settings
            @valueSprite.onReady @_drawValue.bind(@)
            @add @valueSprite
        catch e
            AA.w e
            @valueSprite = new Sprite()

    _._drawValue = ->
        @valueSprite.clear()
        @valueSprite.drawTextFull @value, @settings.text.position

    _._createImage = ->
        try
            settings = @settings.image
            @imageSprite = KDCore.Sprite.FromImg(settings.name)
            @imageSprite.x = settings.marginX
            @imageSprite.y = settings.marginY
            @imageSprite.anchor.x = 0.5
            @imageSprite.anchor.x = 0.5
            @imageSprite.opacity = 0
            @add @imageSprite
        catch e
            AA.w e

    _._start = ->
        timerFunc = ->
            @_updateLife()
            setTimeout(timerFunc.bind(@), 60) unless @disposed
        setTimeout(timerFunc.bind(@), 60)
        return
    
    _._updateLife = ->
        # * Сперва идёт анимация увеличения, затемм только отсчёт таймера
        return if @isNeedZoom is true
        return if @disposed is true
        if @maxStayTime <= 0
            @dispose()
        else
            return if @stayTime++ < @maxStayTime
        @_updateOpacity()
        @_updateMoveUp()
        @dispose() if @opacity <= 0
        return

    _._updateOpacity = ->
        # * Если не надо, то сразу исчезает
        if @settings.noFadeOut is true
            @opacity = 0
        else
            @opacity -= 25

    _._updateMoveUp = ->
        return if @settings.noFlyUp is true
        @move(@x, @y - 1)

    _._updateZoom = ->
        return unless @isNeedZoom
        b = @valueSprite.bitmap
        if b.fontSize == @settings.changeFontSize
            @isNeedZoom = false
            return
        if b.fontSize < @settings.changeFontSize
            b.fontSize = b.fontSize + 1
        else if b.fontSize > @settings.changeFontSize
            b.fontSize = b.fontSize - 1
        @_drawValue()
        return

    _._updateImageFadeIn = ->
        return unless @imageSprite?
        return if @imageSprite.opacity >= 255
        @imageSprite.opacity += @settings.image.fadeInSpeed

    return
# ■ END Sprite_AADamagePopUpItem.coffee
#---------------------------------------------------------------------------