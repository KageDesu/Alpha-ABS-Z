#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    _.aaCreateMouseDetectionThread = ->
        $gameTemp._aaEventUnderCursor = null
        @_aaMouseDetectThread = new KDCore.TimedUpdate(2, @aaRefreshMouseDetection.bind(@))

    _.aaUpdateMouseDetection = ->
        @_aaMouseDetectThread.update()

    # * Этот метод отвечает за "сбор" событий и объектов под курсором
    _.aaRefreshMouseDetection = ->
        eventUnderCursor = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
        if eventUnderCursor?
            if $gameTemp._aaEventUnderCursor != eventUnderCursor
                $gameTemp._aaEventUnderCursor = eventUnderCursor
                AA.EV.call("UnderMouseEventChanged")
        else
            if $gameTemp._aaEventUnderCursor?
                $gameTemp._aaEventUnderCursor = null
                AA.EV.call("UnderMouseEventChanged")
        return

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------