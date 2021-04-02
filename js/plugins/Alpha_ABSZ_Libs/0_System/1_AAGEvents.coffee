# * Глабольный менедреж событий в АБС

AA.EV = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.EV

    _.init = ->
        "INIT ABS GEVENTS SUB SYSTEM".p()
        @events = []
        @_initABSGEvents()

    _.subscribeFor = (evName, listener) ->
        @_getEventByName(evName)?.addListener listener

    _.call = (evName) ->
        @_getEventByName(evName)?.call()

    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EVENTS.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.EV

    _._getEventByName = (name) ->
        @events.find (ev) -> ev.name == name

    _._initABSGEvents = ->
        @events.push(new AA.GEvent("PlayerTarget"))
        @events.push(new AA.GEvent("PlayerChangeState"))
        @events.push(new AA.GEvent("PlayerSkillSelector"))


    return
# ■ END EVENTS.coffee
#---------------------------------------------------------------------------