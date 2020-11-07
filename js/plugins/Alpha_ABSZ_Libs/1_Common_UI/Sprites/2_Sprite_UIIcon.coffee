do ->
    
    class Sprite_UIIcon extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                index: 0
                size: 32
            }

        draw: -> @drawIcon(...arguments)

        drawIcon: (index = 0) ->
            @_lastValue = index
            @_drawIcon index

    AA.link Sprite_UIIcon
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIIcon::

    #$[OVER]
    _._createContent = ->
        @_createIcon()
        @_drawIcon(@params.index)

    _._createIcon = ->
        @_icon = KDCore.Sprite.FromBitmap(@params.size, @params.size)
        @add @_icon
        @_onReady()

    _._onReady = -> @drawIcon @_lastValue

    _._drawIcon = (index) ->
        @_icon.clear()
        return if index <= 0
        @_icon.drawIcon(0, 0, index, @params.size)
        return
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------