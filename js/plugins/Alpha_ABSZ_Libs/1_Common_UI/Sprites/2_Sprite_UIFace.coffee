# * Рисует лицо персонажа (из папки Faces)
do ->
    
    class Sprite_UIFace extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                faceName: "Actor1"
                faceIndex: 0
                mirror: false
                size: 144
            }

        draw: -> @drawFace(...arguments)

        drawFace: (faceName, faceIndex) -> @_drawFaceWhenReady(faceName, faceIndex)

    AA.link Sprite_UIFace
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIFace::

    #$[OVER]
    _._createContent = ->
        @_createFaceSprite()

    _._createFaceSprite = ->
        @_faceSpr = KDCore.Sprite.FromBitmap(@params.size)
        @_flipFaceSpr() if @params.mirror is true
        @add @_faceSpr
        @_drawFaceWhenReady(@params.faceName, @params.faceIndex)
        return

    _._flipFaceSpr = ->
        @_faceSpr.scale.x = -1
        @_faceSpr.x = @params.size
        return

    _._drawFaceWhenReady = (name, index = 0) ->
        @_faceSpr?.clear()
        return unless String.any(name)
        return if index < 0
        @_drawOnReady = { name, index }
        @_faceSourceBitmap = ImageManager.loadFace(name)
        @_faceSourceBitmap.addLoadListener @_drawFace.bind(@)
        @_drawFace()
        return

    _._drawFace = () ->
        return unless @_faceSpr?
        @_faceSpr.clear()
        return unless String.any(@_drawOnReady.name)
        fw = ImageManager.faceWidth
        fh = ImageManager.faceHeight
        size = @params.size
        sx = (@_drawOnReady.index % 4) * fw
        sy = Math.floor(@_drawOnReady.index / 4) * fh
        @_faceSpr.bitmap.blt(@_faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size)
        return
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------