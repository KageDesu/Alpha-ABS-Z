#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    _.addABSUI = ->
        @removeABSUI()
        @_aaUI = new AA.Spriteset_UI()
        @_aaUILayer.addChild @_aaUI
        return

    _.removeABSUI = ->
        @_aaUILayer.removeChild(@_aaUI) if @_aaUI?

    _.updateABS = ->
        @aaUpdateMouseDetection()
        @aaUpdateMapScrlByMouse()
        return
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------