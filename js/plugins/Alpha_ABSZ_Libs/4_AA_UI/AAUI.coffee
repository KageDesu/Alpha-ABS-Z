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

    _.isValid = -> @uiSet?

    # * Когда появляется окно с сообщением
    _.onGameMessageStart = ->
        @uiSet?.onGameMessageStart()
        #TODO: Опция, чтобы автоматически закрывать окно выбора навыков, когда появляется сообщение

    # * Когда заканчивается окно с сообщением
    _.onGameMessageEnd = ->
        @uiSet?.onGameMessageEnd()

    # * Когда было нажатие мышки на какой-либо UI элемент
    _.isUITouched = -> false

    # * Вызывается когда сцена карты заканчивается
    #TODO: Сюда добавить автоматическое закрытие окна выбора навыков
    _.terminate = ->
        #TODO: TEMP
        @closeSkillSelector()
        @uiSet?.terminate()

    # * Основной интерфейс Spriteset_UI
    # -----------------------------------------------------------------------
    do ->

        _.refresh = -> @uiSet?.refresh()

        _.refreshElement = (tag) ->
            @uiSet?.refreshElement(tag)
            @uiSet?.refreshController(tag)
            return

        _.hide = -> @uiSet?.hide()

        _.show = -> @uiSet?.show()

        # * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
        _.isAnyUIElementTouchProcess = ->
            # * Обработка окна выбора навыков
            if @_isSkillSelectorProcessHandler()
                return true
            else
                return false
        #TODO: Вот тут надо делать проверку, что если селектор навыков отркыт и нажимается правая
        # кнопка мыши, то мы должны закрыть селектор навыков сперва (ОПЦИЯ)

    # -----------------------------------------------------------------------

        
    # * Набор навыков
    # -----------------------------------------------------------------------
    do ->

        # * Открыть окно выбора навыка для слота (символа)
        _.openSkillSelectorFor = (symbol) ->
            return unless @isValid()
            try
                unless symbol?
                    @closeSkillSelector()
                else
                    cntrl = @uiSet.getController("skills")
                    item = cntrl._getItemForSymbol(symbol)
                    #TODO: TEMP
                    "OPEN SKILL WINDOW FOR ".p(symbol)
                    window._w.prepareAndOpenForSlot(item) if item?
            catch e
                AA.w e

        # * Открыто ли окно выбора навыка
        _.isSkillSelectorOpen = () ->
            return unless @isValid()
            try
                return window._w.isOpen()
            catch e
                AA.w e
            return false

        _.closeSkillSelector = () ->
            return unless @isValid()
            try
                window._w.close()
            catch e
                AA.w e
            return

        # * Когда игрок нажал на кнопку какого-либо навыка на панели навыков
        _.skillPerformResult = (skillId, result) ->
            try
                return unless @isValid()
                cntrl = @uiSet.getController("skills")
                cntrl?.onSkillPerformResult(skillId, result)
            catch e
                AA.w e

        # * Если открыто окно выбора навыка для слота, то оно закрывается сперва
        # * Если правой кнопкой по навыку, то открывается окно
        _._isSkillSelectorProcessHandler = () ->
            return false unless @isValid()
            try
                return @uiSet.getController("skills")?.handleSkillSelectorProcess()
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

