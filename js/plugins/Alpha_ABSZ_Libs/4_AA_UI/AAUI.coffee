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

    # -----------------------------------------------------------------------


    # * Обработка левой кнопки мыши на карте
    # -----------------------------------------------------------------------
    do ->

        # * Есть ли действие, которое должно
        _.isExistMapCancelAction = -> !@isSelectedCircleVisible()

        # * Есть ли действие, которое должно быть выполнено по нажатию левой кнопки мыши на карте
        # * Возвращает true, если действие выполнено
        _.performCancelActionOnMap = ->
            if @isSelectedCircleVisible()
                @resetTargetSelection()
                return true
            return false

        return

    # -----------------------------------------------------------------------

    # * Цель игрока
    # -----------------------------------------------------------------------
    do ->
        # * Круг под выбранной целью
        _.setSelectedCircle = (@selectedCircle) ->

        _.selectTargetOnMap = (char) -> @selectedCircle?.setTarget char

        _.resetTargetSelection = -> _.selectTargetOnMap(null)

        #TODO: Либо проверять спрайт либо есть ли цель у игрока (TargetManager)
        _.isSelectedCircleVisible = -> @selectedCircle?.visible == true

    # -----------------------------------------------------------------------

    return
# ■ END AA.UI.coffee
#---------------------------------------------------------------------------

