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
        @_removeDynamic()
        @parent?.removeChild(@)
        return

    update: ->
        super()
        return if @disposed is true
        return if SceneManager.isSceneChanging()
        @thread.update()
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

    # * Привязан, надо удалять себя (aaRemoveDynamicSprite)
    setDynamic: () -> @_isDynamic = true

    # * Общие методы создания Pop объекта
    # * Находяться прямо в классе, чтобы не создавать доп. менеджер

    # * Двигается вместе с персонажем (а не экраном)
    @CreateOnCharacterBinded = (char, settings, value) ->
        try
            return unless KDCore.Utils.isSceneMap()
            return unless char?
            return unless settings?
            spriteset = $gameMap.spriteset()
            charSprite = spriteset.findTargetSprite(char)
            return unless charSprite?
            { x, y } = charSprite
            # * Создаётся спрайт "оболочка", которая будет привязана к координатам персонажа
            popDynamicParentSpr = new Sprite()
            popDynamicParentSpr.anchor.set(0.5)
            popItem = new Sprite_AADamagePopUpItem(settings, value)
            dy = -(charSprite.patternHeight() - $gameMap.tileWidth() / 2)
            popItem.setStartPoint(0, dy)
            # * Устанавливаем флаг, чтобы при Dispose удалять себя
            popItem.setDynamic()
            popDynamicParentSpr.addChild(popItem)
            # * Регестрируем как динамический спрайт
            spriteset.aaRegisterDynamicSprite(popDynamicParentSpr, char, 0, dy)
            # * Добавляем на слой PopUp
            spriteset.aaGetDamagePopUpLayer().addChild(popDynamicParentSpr)
        catch e
            AA.w e

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
        @anchor.set(0.5)
        try
            @bitmap.fontSize = Math.max(@settings.text.font.size, @settings.changeFontSize)
            @_createValueText()
            @_createImage() if @settings.image? and String.any(@settings.image.name)
        catch e
            AA.w e

    _._createValueText = ->
        try
            w = @bitmap.measureTextWidth(@value) + 4
            h = @settings.text.font.size + 10
            # * Присваеваем новые значение (посчитанные)
            @settings.text.size.w = w
            @settings.text.size.h = h
            @valueSprite = KDCore.Sprite.FromParams(@settings.text)
            @valueSprite.anchor.set(0.5)
            @valueSprite.onReady @_drawValue.bind(@)
            @add @valueSprite
        catch e
            AA.w e
            @valueSprite = new Sprite()

    _._drawValue = ->
        @valueSprite.clear()
        @valueSprite.drawTextFull @value, @settings.text.alignment

    _._createImage = ->
        try
            settings = @settings.image
            @imageSprite = KDCore.Sprite.FromImg(settings.name)
            @imageSprite.x = settings.margins.x || 0
            @imageSprite.y = settings.margins.y || 0
            @imageSprite.anchor.set(0.5)
            @imageSprite.opacity = 0
            @add @imageSprite
        catch e
            AA.w e

    _._start = ->
        @thread = new KDCore.TimedUpdate(2, @_updateLife.bind(@))
        return
    
    _._updateLife = ->
        # * Сперва идёт анимация увеличения, затемм только отсчёт таймера
        return if @isNeedZoom is true
        return if @disposed is true
        return if SceneManager.isSceneChanging()
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
        try
            if @settings.noFadeOut is true
                @opacity = 0
            else
                @opacity -= 25
        catch e
            
        return

    _._updateMoveUp = ->
        return if @settings.noFlyUp is true
        try
            @move(@x, @y - 1)
        catch e
            
        return

    _._updateZoom = ->
        return unless @isNeedZoom
        try
            b = @valueSprite.bitmap
            if b.fontSize == @settings.changeFontSize
                @isNeedZoom = false
                return
            if b.fontSize < @settings.changeFontSize
                b.fontSize = b.fontSize + 1
            else if b.fontSize > @settings.changeFontSize
                b.fontSize = b.fontSize - 1
            @_drawValue()
        catch e
            
        return

    _._updateImageFadeIn = ->
        try
            return unless @imageSprite?
            return if @imageSprite.opacity >= 255
            @imageSprite.opacity += @settings.image.fadeInSpeed
        catch e

        return

    _._removeDynamic = ->
        return unless @_isDynamic is true
        try
            spriteset = $gameMap.spriteset()
            spriteset.aaRemoveDynamicSprite(@)
            spriteset.aaRemoveDynamicSprite(@parent) if @parent?
        catch e
            AA.warning e

    return
# ■ END Sprite_AADamagePopUpItem.coffee
#---------------------------------------------------------------------------