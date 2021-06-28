do ->

    class Sprite_SkillImpactSelector extends KDCore.Sprite
        constructor: () ->
            super()
            @anchor.set(0.5)
            @visible = false
            return
            
        activate: (@aaSkill) ->
            @targetsCollectThread = new KDCore.TimedUpdate(10, @_refreshTargets.bind(@))
            @visible = true
            @_applyStyle(@aaSkill)
        
        deactivate: ->
            @targetsCollectThread = null
            @_refreshTargets()
            @aaSkill = null
            @visible = false
            return

        update: ->
            super()
            return unless @visible
            @move TouchInput
            @targetsCollectThread?.update()

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

    _._applyImage = (image) ->
        return unless String.any(image)
        @bitmap = ImageManager.loadPicture(image)
        return

    #TODO: Это должно быть на игроке!!!
    _._refreshTargets = ->
        $gameTemp._aaSkillSelectorTargets =
            #AATargetsManager.collectTargetsForSkillInMapPoint(@aaSkill, TouchInput.toMapPoint())
            AATargetsManager.collectTargetsForSkillInScreenPoint(@aaSkill, TouchInput)
        return


# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
