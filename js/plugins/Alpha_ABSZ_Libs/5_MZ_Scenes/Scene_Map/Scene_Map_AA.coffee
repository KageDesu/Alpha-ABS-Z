#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    _.updateABS = ->
        @aaUpdateMouseDetection()
        #@aaUpdateMapScroolByMouse() #TODO: доработать скролл (взять из AABS MV)
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------