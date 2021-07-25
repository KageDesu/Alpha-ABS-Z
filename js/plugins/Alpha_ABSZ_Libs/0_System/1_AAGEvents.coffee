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
        # * Когда АБС ставиться на паузу
        @events.push(new AA.GEvent("PauseABS"))

        #TODO: Проверить эти два на использование
        @events.push(new AA.GEvent("PlayerTarget"))
        @events.push(new AA.GEvent("PlayerChangeState"))

        # * Когда игрок начинает выбирать зону действия навыка
        @events.push(new AA.GEvent("PlayerSkillSelector"))

        # * Когда выполнился (закончился) навык Projectile на карте
        # * Запрашивает очистку кеша
        @events.push(new AA.GEvent("MapSkillsRequestsClean"))

        # * Смена события под курсором
        @events.push(new AA.GEvent("UnderMouseEventChanged"))

        return


    return
# ■ END EVENTS.coffee
#---------------------------------------------------------------------------