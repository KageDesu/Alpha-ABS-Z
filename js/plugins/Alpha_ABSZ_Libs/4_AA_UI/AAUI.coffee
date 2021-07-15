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

    _.terminate = -> @uiSet?.terminate()

    # * Основной интерфейс Spriteset_UI
    # -----------------------------------------------------------------------
    do ->

        _.refresh = -> @uiSet?.refresh()

        _.refreshElement = (tag) ->
            @uiSet?.refreshElement(tag)

        _.hide = -> @uiSet?.hide()

        _.show = -> @uiSet?.show()

        # * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
        _.isAnyUIElementTouchProcess = -> false

    # -----------------------------------------------------------------------

    # * Набор навыков
    # -----------------------------------------------------------------------
    do ->
        # * Когда игрок нажал на кнопку какого-либо навыка на панели навыков
        _.skillPerformResult = (skillId, result) ->
            try
                return unless @uiSet?
                cntrl = @uiSet.getController("skills")
                cntrl?.onSkillPerformResult(skillId, result)
            catch e
                AA.w e

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

    # * Выбор зоны применения навыка на карте
    # -----------------------------------------------------------------------
    do ->
        # * Установить спрайт зоны поражаения навыка
        _.setSkillImpactSelector = (@skillSelector) ->

        # * Активировать зону поражения (показать спрайт)
        _.activateSkillImpactSelector = (aaSkill) ->
            @skillSelector?.activate(aaSkill)

        _.resetSkillImpactSelector = -> @skillSelector?.deactivate()

    # -----------------------------------------------------------------------

    # * Обработка АБС событий
    # -----------------------------------------------------------------------
    do ->

        _._subscribeForEvents = ->
            AA.EV.subscribeFor("PlayerTarget", @gev_onPlayerTargetChanged)
            #AA.EV.subscribeFor("PlayerChangeState", @gev_onPlayerStateChanged)
            AA.EV.subscribeFor("PlayerSkillSelector", @gev_onPlayerSkillSelector)

        # * Когда цель игрока была изменена
        _.gev_onPlayerTargetChanged = ->
            "PLAYER TARGET CHANGED".p()
            AA.UI.selectTargetOnMap($gamePlayer.AATarget())

        # * Когда статус (поведения, действия) игрока меняется
        _.gev_onPlayerStateChanged = ->
            

        _.gev_onPlayerSkillSelector = ->
            if $gamePlayer.isInSkillTargetingState()
                AA.UI.activateSkillImpactSelector($gamePlayer.activeAASkill())
            else
                AA.UI.resetSkillImpactSelector()

        return

    return
# ■ END AA.UI.coffee
#---------------------------------------------------------------------------

