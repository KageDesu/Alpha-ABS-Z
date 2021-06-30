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
        { x, y } = TouchInput.toMapPoint()
        eventsUnderCursor = $gameMap.eventsXyAA(x, y)
        if eventsUnderCursor.length == 0
            if $gameTemp._aaEventUnderCursor?
                $gameTemp._aaEventUnderCursor = null
                AA.EV.call("UnderMouseEventChanged")
        else
            event = eventsUnderCursor.first()
            if $gameTemp._aaEventUnderCursor != event
                $gameTemp._aaEventUnderCursor = event
                AA.EV.call("UnderMouseEventChanged")
        return

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------