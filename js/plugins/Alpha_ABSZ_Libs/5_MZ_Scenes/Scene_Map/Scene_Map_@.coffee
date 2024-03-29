#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::
    
    #@[ALIAS]
    ALIAS__create = _.create
    _.create = ->
        ALIAS__create.call(@)
        AA.EV.subscribeFor("ABSPartyLeaderReady", @addABSUI.bind(@))
        AA.EV.subscribeFor("ABSPartyLeaderNone", @removeABSUI.bind(@))
        return

    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        ALIAS__onMapLoaded.call(@)
        AA.System.onMapSceneLoaded()
        @aaCreateMouseDetectionThread()
        @aaInitMapScrollSystem()
        # * Небольшая задержка на приём визуальных эффектов от сервера
        AA.Utils.callDelayed(
            () -> $gameTemp._aaCanReceiveVisualFromServer = true,
            100
        )
        return

    #@[ALIAS]
    # * Создаём интерфейс боевой системы
    ALIAS__createSpriteset = _.createSpriteset
    _.createSpriteset = ->
        ALIAS__createSpriteset.call(@)
        @_aaUILayer = new Sprite()
        @addChild @_aaUILayer
        return

    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        $gameTemp._aaCanReceiveVisualFromServer = false
        ALIAS__stop.call(@)
        AA.System.onMapSceneStopped()
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @updateABS() if AA.isABSActive()
        return

    #@[ALIAS]
    ALIAS__onMapTouch = _.onMapTouch
    # * Сохранение алиаса, чтобы использовать в другом файле
    _.ALIAS__onMapTouch = ALIAS__onMapTouch
    _.onMapTouch = ->
        return if AA.UI.isUITouched()
        if AA.isABSActive()
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