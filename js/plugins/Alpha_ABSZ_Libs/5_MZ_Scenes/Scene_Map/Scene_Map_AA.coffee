#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    _.updateABS = ->
        @aaUpdateMouseDetection()
        @aaUpdateMapScrlByMouse()
        return
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------