#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    #@[ALIAS]
    ALIAS__createTilemap = _.createTilemap
    _.createTilemap = ->
        ALIAS__createTilemap.call(@)
        @aaCreateExtraMapDownLayer()
        @aaCreateSelectedCircle()
        @aaCreateSkillImpactSelector()
        return
    
    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------