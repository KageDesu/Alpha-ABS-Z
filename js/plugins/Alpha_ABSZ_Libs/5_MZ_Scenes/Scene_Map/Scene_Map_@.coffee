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
        ALIAS__onMapLoaded.call(@)
        AA.System.onMapSceneLoaded()
        @aaCreateMouseDetectionThread()

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

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @aaUpdate() if AA.isABS()
        return

    #@[ALIAS]
    ALIAS__onMapTouch = _.onMapTouch
    # * Сохранение алиаса, чтобы использовать в другом файле
    _.ALIAS__onMapTouch = ALIAS__onMapTouch
    _.onMapTouch = ->
        return if AA.UI.isUITouched()
        if AA.isABS()
            @onMapTouchAA()
        else
            ALIAS__onMapTouch.call(@)
    
    #@[ALIAS]
    ALIAS__updateCallMenu = _.updateCallMenu
    _.updateCallMenu = ->
        if TouchInput.isCancelled()
            #if AA.UI.performCancelActionOnMap()
            if @onMapCancelTouchAA()
                # * Если действие выполненно, то не надо вызывать меню
                return
        #TODO: Меню не вызывается если isMoving, также сделать если игрок в действии (анимация, удар)
        ALIAS__updateCallMenu.call(@)

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------