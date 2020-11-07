#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    #@[ALIAS]
    ALIAS__updateBitmap = _.updateBitmap
    _.updateBitmap = ->
        if @isAnimX()
            @_updateBitmapAnimX()
        else
            ALIAS__updateBitmap.call(@)
        
    #@[ALIAS]
    ALIAS__updateFrame = _.updateFrame
    _.updateFrame = ->
        ALIAS__updateFrame.call(@)
        if @isAnimX()
            @_axCntr.update(@_character)
            #@_updateAnimaXPartsDepth() if @_animaXParts?
        return
    
    #@[ALIAS]
    ALIAS__isImageChanged = _.isImageChanged
    _.isImageChanged = ->
        if @isAnimX()
            return @_animaXSet != @_character.getCurrentAnimX()
        else
            return ALIAS__isImageChanged.call(@)

        #@[ALIAS]
    ALIAS__patternWidth = _.patternWidth
    _.patternWidth = ->
        if @isAnimX()
            return @bitmap.width
        else
            return ALIAS__patternWidth.call(@)
        
    #@[ALIAS]
    ALIAS__patternHeight = _.patternHeight
    _.patternHeight = ->
        if @isAnimX()
            return @bitmap.height
        else
            return ALIAS__patternHeight.call(@)
        
    #@[ALIAS]
    ALIAS__characterBlockX = _.characterBlockX
    _.characterBlockX = ->
        return 0 if @isAnimX()
        return ALIAS__characterBlockX.call(@)
        
    #@[ALIAS]
    ALIAS__characterBlockY = _.characterBlockY
    _.characterBlockY = ->
        return 0 if @isAnimX()
        return ALIAS__characterBlockY.call(@)

    #@[ALIAS]
    ALIAS__characterPatternX = _.characterPatternX
    _.characterPatternX = ->
        return 0 if @isAnimX()
        return ALIAS__characterPatternX.call(@)

    #@[ALIAS]
    ALIAS__characterPatternY = _.characterPatternY
    _.characterPatternY = ->
        return 0 if @isAnimX()
        return ALIAS__characterPatternY.call(@)


    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------