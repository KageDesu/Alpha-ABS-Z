# * Основной класс менеджер интерфейса (API)

AA.UI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AA.UI.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.UI

    _.setUI = (@uiSet) ->
        @_subscribeForEvents()

    # * Когда появляется окно с сообщением
    _.onGameMessageStart = ->
        @uiSet?.onGameMessageStart()

    # * Когда заканчивается окно с сообщением
    _.onGameMessageEnd = ->
        @uiSet?.onGameMessageEnd()

    # * Когда было нажатие мышки на какой-либо UI элемент
    _.isUITouched = -> false

    # * Основной интерфейс Spriteset_UI
    # -----------------------------------------------------------------------
    do ->

        _.refreshElement = (tag) ->
            @uiSet?.refreshElement(tag)

        _.hide = -> @uiSet?.hide()

        _.show = -> @uiSet?.show()

        # * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
        _.isAnyUIElementTouchProcess = -> false

    # -----------------------------------------------------------------------


    # * Цель игрока
    # -----------------------------------------------------------------------
    do ->
        # * Круг под выбранной целью (установить спрайт круга)
        _.setSelectedCircle = (@selectedCircle) ->

        # * Выбрать цель на карте
        _.selectTargetOnMap = (char) -> @selectedCircle?.setTarget char

        # * Сбросить выбор цели на карте
        _.resetTargetSelection = -> _.selectTargetOnMap(null)

        #TODO: Либо проверять спрайт либо есть ли цель у игрока (TargetManager)
        _.isSelectedCircleVisible = -> @selectedCircle?.visible == true

    # -----------------------------------------------------------------------

    # * Обработка АБС событий
    # -----------------------------------------------------------------------
    do ->

        _._subscribeForEvents = ->
            AA.EV.subscribeFor("PlayerTarget", @gev_onPlayerTargetChanged)

        # * Когда цель игрока была изменена
        _.gev_onPlayerTargetChanged = ->
            "PLAYER TARGET CHANGED".p()
            AA.UI.selectTargetOnMap($gamePlayer.AATarget())

        return

    return
# ■ END AA.UI.coffee
#---------------------------------------------------------------------------

