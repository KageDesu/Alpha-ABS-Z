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
        "TEST FLOAT SKILL WINDOW".p()
        #TODO: Ширина и высота из параметров

        @fwss = new FWindow_SkillSelect(@, 160, 400)
        window._w = @fwss

        return
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------