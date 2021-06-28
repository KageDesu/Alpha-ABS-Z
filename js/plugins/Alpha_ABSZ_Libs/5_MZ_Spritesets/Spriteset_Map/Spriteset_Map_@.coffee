#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        @_aaMapAnimationSprites = []
        return

    #@[ALIAS]
    ALIAS__createUpperLayer = _.createUpperLayer
    _.createUpperLayer = ->
        @aaCreateExtraMapUpLayer()
        @aaCreateDamagePopUpLayer()
        ALIAS__createUpperLayer.call(@)

    #@[ALIAS]
    ALIAS__createTilemap = _.createTilemap
    _.createTilemap = ->
        ALIAS__createTilemap.call(@)
        @aaCreateExtraMapDownLayer()
        @aaCreateSelectedCircle()
        @aaCreateSkillImpactSelector()
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @aaRefreshMapAnimation()
    
    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------