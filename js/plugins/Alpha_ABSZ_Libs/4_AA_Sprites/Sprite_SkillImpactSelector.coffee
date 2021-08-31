do ->

    class Sprite_SkillImpactSelector extends KDCore.Sprite
        constructor: () ->
            super()
            @anchor.set(0.5)
            @visible = false
            return
            
        activate: (@aaSkill) ->
            @visible = true
            @_applyStyle(@aaSkill)
        
        deactivate: ->
            @aaSkill = null
            @visible = false
            return

        update: ->
            super()
            return unless @visible
            @move TouchInput

    AA.link Sprite_SkillImpactSelector
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SkillImpactSelector::

    # * Отрисовка зонвы выбора в зависимости от параметров навыка
    _._applyStyle = ({ radius, selectorColor, selectorImg, selectorOpacity }) ->
        @_applyRadius(radius)
        @_applyColor(selectorColor)
        @_applyImage(selectorImg)
        @opacity = selectorOpacity
        return

    _._applyRadius = (radius) ->
        if radius <= 0
            @bitmap = new Bitmap(0, 0)
        else
            @bitmap = new Bitmap(radius * $gameMap.tileWidth(), radius * $gameMap.tileHeight())
        return

    _._applyColor = (color) ->
        @bitmap.fillAll color.toCss()

    #TODO: If empty, load default from AABS folder
    _._applyImage = (image) ->
        unless String.any(image)
            @bitmap = ImageManager.loadAA("RadiusSelect")
        else
            @bitmap = ImageManager.loadPicture(image)
        return


# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
