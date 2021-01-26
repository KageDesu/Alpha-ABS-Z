#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_TilingFrame.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    class Sprite_TilingFrame extends KDCore.Sprite
        constructor: (@_width, @_height, @skinBitmap) ->
            super()
            @_createParts()
            @_refreshAll()

        _createParts: () ->
            @backSprite = new Sprite()
            @addChild @backSprite
            @content = new Sprite()
            @addChild  @content
            @frame = new Sprite()
            @frame.addChild(new Sprite()) for i in [0...8]
            @addChild @frame

        _refreshAll: ->
            @_refreshBack()
            @_refreshTFrame()

        _refreshBack: ->
            m = 2 # * Отступ, чтобы за рамку не выходить
            w = Math.max(0, @_width - m * 2)
            h = Math.max(0, @_height - m * 2)
            sprite = @backSprite
            sprite.bitmap = @skinBitmap
            # * Координаты фона из картинки
            sprite.setFrame(0, 0, 96, 96)
            sprite.move(m, m)
            sprite.scale.x = w / 96
            sprite.scale.y = h / 96

        _refreshTFrame: ->
            # * Положение назначения
            drect = { x: 0, y: 0, width: @_width, height: @_height }
            # * Координаты рамки на картинке
            srect = { x: 96, y: 0, width: 96, height: 96 }
            m = 12 # * Толщина
            for spr in @frame.children
                spr.bitmap = @skinBitmap
            Window::_setRectPartsGeometry.call(@, @frame, srect, drect, m)

    AA.link Sprite_TilingFrame
    return
# ■ END Sprite_TilingFrame.coffee
#---------------------------------------------------------------------------