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

        #TODO: Проверить эти два на использование
        @events.register("PlayerTarget")
        @events.register("PlayerChangeState")

        # * Когда игрок начинает выбирать зону действия навыка
        @events.register("PlayerSkillSelector")

        # * Когда выполнился (закончился) навык Projectile на карте
        # * Запрашивает очистку кеша
        @events.register("MapSkillsRequestsClean")

        # * Смена события под курсором
        @events.register("UnderMouseEventChanged")

        return


    return
# ■ END EVENTS.coffee
#---------------------------------------------------------------------------