do ->
    
    class Sprite_UIImage extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                image: ""
            }

        draw: -> @drawImage(...arguments)

        drawImage: (image) -> @_drawImage image

    AA.link Sprite_UIImage
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIImage::

    #$[OVER]
    _._createContent = ->
        @_drawImage(@params.image)

    _._drawImage = (image) ->
        @_clearImage()
        unless String.isNullOrEmpty(image)
            @_image = KDCore.Sprite.FromImg image, @rootImageFolder()
            @add @_image
        return

    _._clearImage = ->
        return unless @_image?
        @_image.visible = false
        @removeChild @_image
        @_image = null
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------