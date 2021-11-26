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
        @events = new AA.GEvents()
        @_initABSGEvents()

    _.subscribeFor = (evName, listener) -> @events.subscribeFor(evName, listener)

    _.call = (evName) -> @events.call(evName)

    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EVENTS.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.EV

    _._initABSGEvents = ->
        # * Когда АБС ставиться на паузу
        @events.register("PauseABS")

        # * Когда игрок начинает выбирать зону действия навыка
        @events.register("PlayerSkillSelector")

        # * Когда выполнился (закончился) навык Projectile на карте
        # * Запрашивает очистку кеша
        @events.register("MapSkillsRequestsClean")

        # * Смена события под курсором
        @events.register("UnderMouseEventChanged")

        # * Персонаж игрока готов
        @events.register("ABSPartyLeaderReady")

        # * Больше нет персонажа игрока (пустая партия)
        @events.register("ABSPartyLeaderNone")

        return


    return
# ■ END EVENTS.coffee
#---------------------------------------------------------------------------