#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_TilingFrame.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    class Sprite_TilingFrame extends KDCore.Sprite
        constructor: (@width, @height, @skinBitmap) ->
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


        # * Отступ, чтобы за рамку не выходить
        _fillPadding: -> 2
        # * Размер частей на картинке
        _fillImagePartWidth: -> 96
        _fillImagePartHeight: -> 96
        # * Толщина рамки
        _frameThickness: -> 12

        _refreshAll: ->
            @_refreshBack()
            @_refreshTFrame()

        _refreshBack: ->
            m = @_fillPadding()
            w = Math.max(0, @width - m * 2)
            h = Math.max(0, @height - m * 2)
            sprite = @backSprite
            sprite.bitmap = @skinBitmap
            # * Координаты фона из картинки
            fw = @_fillImagePartWidth()
            fh  = @_fillImagePartHeight()
            sprite.setFrame(0, 0, fw, fh)
            sprite.move(m, m)
            sprite.scale.x = w / fw
            sprite.scale.y = h / fh

        _refreshTFrame: ->
            fw = @_fillImagePartWidth()
            fh  = @_fillImagePartHeight()
            # * Положение назначения
            drect = { x: 0, y: 0, width: @width, height: @height }
            # * Координаты рамки на картинке
            srect = { x: fw, y: 0, width: fw, height: fh }
            m = @_frameThickness() # * Толщина
            for spr in @frame.children
                spr.bitmap = @skinBitmap
            Window::_setRectPartsGeometry.call(@, @frame, srect, drect, m)

    AA.link Sprite_TilingFrame
    return
# ■ END Sprite_TilingFrame.coffee
#---------------------------------------------------------------------------