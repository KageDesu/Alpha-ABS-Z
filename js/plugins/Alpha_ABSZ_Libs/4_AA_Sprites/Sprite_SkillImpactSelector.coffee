do ->

    class Sprite_SkillImpactSelector extends KDCore.Sprite
        constructor: () ->
            super()
            @anchor.set(0.5)
            @visible = false
            @_createSelector()
            return
            
        activate: (@aaSkill) ->
            @visible = true
            @_applyStyle(@aaSkill)
        
        deactivate: ->
            @aaSkill = null
            @visible = false
            return

        shake: -> @shakeTime = 20

        update: ->
            super()
            return unless @visible
            @move TouchInput
            @_updateShake() if @shakeTime >= 0
            return

    AA.link Sprite_SkillImpactSelector
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SkillImpactSelector::

    # * Используем доп. слой, чтобы воссоздать Shake эффект
    _._createSelector = ->
        @_selectorSpr = new KDCore.Sprite()
        @_selectorSpr.anchor.set(0.5)
        @addChild @_selectorSpr
        return

    # * Отрисовка зонвы выбора в зависимости от параметров навыка
    _._applyStyle = ({ radius, selectorColor, selectorImg, selectorOpacity }) ->
        if String.any(selectorImg)
            KDCore.Utils.loadImageAsync("pictures", selectorImg).then(@_applyImage.bind(@))
        else
            @_applyRadius(radius)
            @_applyColor(selectorColor)
        @opacity = selectorOpacity
        return

    # * Если не задан параметр картинки, то1 будет просто квадрат
    # * Картинка не растягивается в зависимости от Radius
    # * Предполагается что разработчик сам установит соответствующую картинку
    _._applyImage = (bitmap) ->
        @_selectorSpr.bitmap = bitmap

    _._applyRadius = (radius) ->
        if radius <= 0
            @_selectorSpr.bitmap = new Bitmap(0, 0)
        else
            @_selectorSpr.bitmap =
                new Bitmap(radius * $gameMap.tileWidth(), radius * $gameMap.tileHeight())
        return

    _._applyColor = (selectorColor) ->
        @_selectorSpr.bitmap.fillAll selectorColor.toCss()

    _._updateShake = ->
        @shakeTime--
        # * Только по X
        @_selectorSpr.x += Math.round(@shakeTime * 0.2 * Math.cos(@shakeTime))
        if @shakeTime <= 0
            @shakeTime = 0
            @_selectorSpr.x = 0
        return

# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
