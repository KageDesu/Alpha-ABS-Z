#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    # * Система анимации XAnima
    # -----------------------------------------------------------------------
    do ->
        
        _.isAnimX = -> @_character.isAnimX()

        _._updateBitmapAnimX = ->
            if @isImageChanged()
                @_animaXSet = @_character.getCurrentAnimX()
                @_refreshAnimXSetController()
                @_createAnimaXParts()
            #else if @isXAnimPartsChanged()
            #    @_createAnimaXParts()
            if @_axCntr.isChanged()
                @_refreshAnimaXBitmap()
                #@_refreshAnimXPartSprites()
            return

        _._updateAnimaXPartsDepth = -> # * NOT IMPLEMENTED

        _._refreshAnimXSetController = ->
            @_axCntr = new XAnimaSetController(@_character.direction(), @_animaXSet)
            @_refreshAnimaXBitmap()

        _.isXAnimPartsChanged = -> false # * NOT IMPLEMENTED

        _._refreshAnimXPartSprites = -> # * NOT IMPLEMENTED

        _._refreshAnimaXBitmap = ->
            @bitmap = @_axCntr.bitmap()

        _._createAnimaXParts = -> # * NOT IMPLEMENTED

        _._destroyAnimaXParts = -> # * NOT IMPLEMENTED

        _._addAllAnimaXParts = -> # * NOT IMPLEMENTED

        return
    # -----------------------------------------------------------------------

    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------