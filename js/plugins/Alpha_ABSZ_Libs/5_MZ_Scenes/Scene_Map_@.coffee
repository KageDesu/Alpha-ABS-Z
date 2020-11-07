#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        # * Чтобы каждый раз проверу не делать на instanceof
        $gameTemp._isMapScene = true
        ALIAS__start.call(@)
    
    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        AA.System.onMapSceneLoaded()
        ALIAS__onMapLoaded.call(@)

    #@[ALIAS]
    # * Создаём интерфейс боевой системы
    ALIAS__createSpriteset = _.createSpriteset
    _.createSpriteset = ->
        ALIAS__createSpriteset.call(@)
        @_aaUI = new AA.Spriteset_UI()
        @addChild @_aaUI
        return

    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        ALIAS__stop.call(@)
        @_aaUI?.terminate()
        return
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------