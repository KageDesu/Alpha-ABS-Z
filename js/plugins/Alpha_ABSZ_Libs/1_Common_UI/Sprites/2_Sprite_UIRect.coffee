do ->
    
    class Sprite_UIRect extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                size: { w: 60, h: 20 }
                fillColor: "#FFFFFF".toCss()
                fillOpacity: 255
                borderColor: "#000000".toCss()
                borderThickness: 1
                borderOpacity: 255
            }

        draw: -> @fill(...arguments)

        fill: (color, opacity = 255) ->
            @_fill(color, opacity)

        drawBorder: (color, thickness = 1, opacity = 255) ->
            @_drawBorder(color, thickness, opacity)


    AA.link Sprite_UIRect
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIRect::

    #$[OVER]
    _._createContent = ->
        if String.any(@params.fillColor)
            @_createFill()
            @fill(@params.fillColor, @params.fillOpacity)
        if String.any(@params.borderColor) && @params.borderThickness > 0
            @_createBorder()
            @drawBorder(@params.borderColor, @params.borderThickness, @params.borderOpacity)

    _._createFill = ->
        @_fillSpr = KDCore.Sprite.FromBitmap(@params.size.w, @params.size.h)
        @addChild @_fillSpr
    
    _._createBorder = ->
        @_borderSprite = KDCore.Sprite.FromBitmap(@params.size.w, @params.size.h)
        @addChild @_borderSprite

    _._fill = (color, opacity) ->
        return unless @_fillSpr?
        @_fillSpr.fillAll color
        @_fillSpr.opacity = opacity
        return

    _._drawBorder = (color, thickness, opacity) ->
        return unless @_borderSprite?
        @_borderSprite.clear()
        b = @_borderSprite.b()
        # * Top line
        b.fillRect(0, 0, b.width, thickness, color)
        # * Bottom line
        b.fillRect(0, b.height - thickness, b.width, thickness, color)
        # * Left line
        b.fillRect(0, 0, thickness, b.height, color)
        # * Right line
        b.fillRect(b.width - thickness, 0, thickness, b.height, color)
        @_borderSprite.opacity = opacity

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------