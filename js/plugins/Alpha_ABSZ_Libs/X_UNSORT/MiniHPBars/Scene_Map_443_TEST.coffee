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
        
        @testEnemyInfo = new AA.Sprite_EnemyInfo()

        @testEnemyInfo.drawHpWithFormat(400, 400, 0)
        @testEnemyInfo.drawNameWithFormat("Wolf")
        @testEnemyInfo.drawLevelWithFormat(1)
        @testEnemyInfo.drawFace("Monster", 2)

        @testEnemyInfo.showSlow()

        @addChild @testEnemyInfo

        window._test = @testEnemyInfo
        
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------