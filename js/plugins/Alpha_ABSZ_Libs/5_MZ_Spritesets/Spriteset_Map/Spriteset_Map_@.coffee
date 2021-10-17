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
        @_aaMapSpriteEffects = []
        @_aaMapDynamicSprites = []
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
        @aaCreateSkillImpactSelector()
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @aaRefreshMapAnimation()
        @aaUpdateShatterEffect()
        @aaUpdateDynamicSprites()
    
    #@[ALIAS]
    ALIAS__createCharacters = _.createCharacters
    _.createCharacters = ->
        ALIAS__createCharacters.call(@)
        @aaCreateMapSkills()
        AA.EV.subscribeFor("MapSkillsRequestsClean", @_aaClearMapSkills.bind(@))
        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------