do ->
    
    class Sprite_UIGauge extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
            visible: true
            fill: "",
            foreground: ""
            mask: ""
            backColor: "#000000".toCss()
            backOpacity: 255
            vertical: false
        }

        draw: -> @drawGauge(...arguments)
        
        drawGauge: (percent = 1) ->
            @_lastValue = percent
            @_drawGauge(percent)

        isVertical: -> @params.vertical is true

    AA.link Sprite_UIGauge
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIGauge::

    #$[OVER]
    _._createContent = ->
        # * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
        @_loadFillImage()

    _._loadFillImage = ->
        # * Главное изображение, поэтому если не указано, то ничего
        if @params.fill.isEmpty()
            KDCore.warning 'You try create Gauge without fill image'
            return
        KDCore.Utils.loadImageAsync(@rootImageFolder(), @params.fill)
            .then(@_createParts.bind(@))
        return

    # * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = (@fillBitmap) ->
        @_createBackground()
        @_createFillLayer()
        @_loadForeground()
        @_loadMask()
        @_onReady()

    _._createBackground = () ->
        @background = KDCore.Sprite.FromBitmap(@fillBitmap.width, @fillBitmap.height)
        @background.b().fillAll @params.backColor
        @background.opacity = @params.backOpacity
        @add @background

    _._createFillLayer = () ->
        @fillLayer = KDCore.Sprite.FromBitmap(@fillBitmap.width, @fillBitmap.height)
        @add @fillLayer

    _._loadForeground = ->
        return if String.isNullOrEmpty(@params.foreground)
        fore = KDCore.Sprite.FromImg @params.foreground, @rootImageFolder()
        @add fore

    _._loadMask = ->
        return if String.isNullOrEmpty(@params.mask)
        mask = KDCore.Sprite.FromImg @params.mask, @rootImageFolder()
        @mask = mask
        @add mask

    # * Если что-то было до готовности, нарисовать
    _._onReady = ->
        @drawGauge(@_lastValue)
        return

    _._drawGauge = (percent) ->
        return unless @fillLayer?
        @fillLayer.clear()
        if @isVertical()
            @_drawVerGauge(percent)
        else
            @_drawHorGauge(percent)

    _._drawHorGauge = (percent) ->
        w = @fillBitmap.width * percent
        @fillLayer.b().blt @fillBitmap, 0, 0, w, @fillLayer.height, 0, 0

    _._drawVerGauge = (percent) ->
        h  = @fillBitmap.height * percent
        hy = @fillBitmap.height - h
        @fillLayer.b().blt @fillBitmap, 0, 0, @fillLayer.width, h, 0 , hy
        return

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------