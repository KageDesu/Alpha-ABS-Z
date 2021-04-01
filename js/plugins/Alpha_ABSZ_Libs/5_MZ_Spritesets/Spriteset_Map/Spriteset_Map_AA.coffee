#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    # * Дополнительный слой под персонажами, но на карте (тайлах)
    # -----------------------------------------------------------------------
    do ->

        _.aaCreateExtraMapDownLayer = ->
            @_aaLayer01 = new Sprite()
            @_aaLayer01.z = 1
            @_tilemap.addChild @_aaLayer01
            # * Чтобы каждый кадр не считать, создадим переменные
            @__tw = $gameMap.tileWidth()
            @__tw2 = @__tw / 2
            @__th = $gameMap.tileHeight()
            return

        _.aaCreateSelectedCircle = ->
            @_aaSelectedCircle = new AA.Sprite_SelectedCircle()
            @_aaLayer01.addChild @_aaSelectedCircle
            AA.UI.setSelectedCircle @_aaSelectedCircle
            return

        #TODO: Может над персонажами?
        _.aaCreateSkillImpactSelector = ->
            @_aaSkillImpactSelector = new AA.Sprite_SkillImpactSelector()
            @_aaLayer01.addChild @_aaSkillImpactSelector
            AA.UI.setSkillImpactSelector @_aaSkillImpactSelector
            return

        return
    # -----------------------------------------------------------------------

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------