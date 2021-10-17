#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Temp.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Temp::

    # * АИ обновление
    # -----------------------------------------------------------------------
    do ->

        _._aaInitAILogicThreads = ->
            @__aaAILogicThreads = {} unless @__aaAILogicThreads?

        _.aaRegisterAILogicThread = (eventId) ->
            "THREAD REGISTERED FOR".p(eventId)
            @_aaInitAILogicThreads()
            thread = setInterval (->
                    return unless AA.isABSMap()
                    ev = $gameMap.event(eventId)
                    if ev?
                        ev.aaUpdateAILogic()
                    else
                        $gameTemp.aaClearAILogicThread(eventId)
                ), 100
            @__aaAILogicThreads[eventId] = thread
            return

        _.aaClearAILogicThread = (eventId) ->
            @_aaInitAILogicThreads()
            thread = @__aaAILogicThreads[eventId]
            clearInterval(thread) if thread?
            @__aaAILogicThreads[eventId] = null
            return
        
        _.aaClearAllAILogicThreads = ->
            return unless @__aaAILogicThreads?
            for key, value of @__aaAILogicThreads
                @aaClearAILogicThread(key)
            return

    # * Скролл камеры
    # -----------------------------------------------------------------------
    do ->

        _.aaSetMapScrolled = (@_aaIsScrollBeenApplied) ->

        _.aaIsMapScrolled = -> @_aaIsScrollBeenApplied is true

        _.aaResetMapScrollOnAction = ->
            # * Сброс камеры (если есть опция) при действии
            if $gameTemp.aaIsMapScrolled() && AA.PP.getMapScrollingSettings().resetOnAction is true
                uAPI.resetMapScroll()
            return

        _.aaResetMapScrollOnMoving = ->
            # * Восстановить камеру при движении (если опция)
            if @aaIsMapScrolled() and AA.PP.getMapScrollingSettings().resetOnMove is true
                uAPI.resetMapScroll()
            return

    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------