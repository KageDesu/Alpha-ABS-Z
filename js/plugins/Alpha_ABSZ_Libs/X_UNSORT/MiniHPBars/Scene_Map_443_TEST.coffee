#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        ALIAS__onMapLoaded.call(@)
        @testMiniHp = new AA.Sprite_CharacterMiniGauge()
        @addChild @testMiniHp
        @testMiniHp.refreshPosition($gamePlayer.screenX(), $gamePlayer.screenY())
        @testMiniHp.hideSlow()

        window._test = @testMiniHp
        
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------