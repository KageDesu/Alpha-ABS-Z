#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Temp.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Temp::

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
    
    _.aaClearAILogicThreads = ->
        return unless @__aaAILogicThreads?
        for key, value of @__aaAILogicThreads
            @aaClearAILogicThread(key)
        return


    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------