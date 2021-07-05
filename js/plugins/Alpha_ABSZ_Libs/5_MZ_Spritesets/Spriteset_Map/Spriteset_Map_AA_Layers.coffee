#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    # * Дополнительные слои (под и над персонажами, но на карте)
    # -----------------------------------------------------------------------
    do ->

        # * Под персонажами
        _.aaCreateExtraMapDownLayer = ->
            @_aaLayer01 = new Sprite()
            @_aaLayer01.z = 1
            @_tilemap.addChild @_aaLayer01
            return

        # * Над персонажами
        _.aaCreateExtraMapUpLayer = ->
            @_aaLayer02 = new Sprite()
            @addChild @_aaLayer02
            return

        _.aaCreateDamagePopUpLayer = ->
            @_aaPopUpLayer = new Sprite()
            @_aaLayer02.addChild @_aaPopUpLayer
            return

        _.aaGetDamagePopUpLayer = -> @_aaPopUpLayer

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