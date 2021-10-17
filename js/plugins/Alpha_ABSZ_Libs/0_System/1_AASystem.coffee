# * Глабольный менеджер с основными методами системы

AA.System = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.System

    # * Начальная загрузка компонентов
    # -----------------------------------------------------------------------
    do ->

        #TODO: * Лог свой для сообщений версий
        _.initSystem = ->
            "INIT ABS SYSTEM".p()
            AA.EV.init()
            @loadParameters()
            return

        _.loadParameters = ->
            AA.PP = new AA.ParamsManager()
            AA.Input.init(AA.PP.getParam('inputSettings'))
            return

        _.loadFonts = ->
            return unless AA.PP?
            for font in AA.PP.fonts()
                if String.any(font)
                    KDCore.Utils.loadFont font
            return
        
        return
    # -----------------------------------------------------------------------

    # * Управление АБС системой
    # -----------------------------------------------------------------------
    do ->

        # * Этот метод выполняется всегда когда загружается карта
        # * Не зависимо, ABS в паузе или нет
        _.startABS = ->
            "START ABS SESSION ON MAP".p()
            # * По умлочанию, система всегда активированна
            @resumeABS() unless $gameSystem._isABS?
            $gamePlayer.initABS()
            $gameMap.initABS()
            return

        _.resumeABS = ->
            $gameSystem._isABS = true

        _.pauseABS = ->
            return unless @isABSActive()
            $gameSystem._isABS = false
            AA.EV.call("PauseABS")
            return

        _.isABSActive = -> $gameSystem._isABS is true

        _.update = ->

        return
    # -----------------------------------------------------------------------

    # * Управление переходами и состояниями
    # -----------------------------------------------------------------------
    do ->

        # * Главное меню (или Scene_Boot)
        _.onGameDataLoaded = ->
            # * Применяем динамические параметры
            AA.PP.applyParameters()
            # * Парсим (читаем) АБС параметры в БД
            AA.Utils.Parser.processABSSkillsNotetags()
            AA.Utils.Parser.processABSEnemiesNotetags()
            return

        # * Сцена карты загрузилась (или попали на сцену из меню, или Transfer)
        _.onMapSceneLoaded = ->
            @startABS()
            AA.UI.refresh()
            return

        # * Сцена карты завершается (переключение сцены)
        _.onMapSceneStopped = ->
            AA.UI.terminate()
            $gamePlayer.aaOnMapSceneEnd()
            $gameTemp.aaClearAllAILogicThreads()
            return

        _.onTitleScreen = ->

        # * Новая карта (Data)
        _.onNewMapLoaded = ->

        # * Перед сохранением
        _.onGameSave = ->

        # * После сохранения
        _.onGameSaved = ->

        # * Перед загрузкой
        _.onGameLoad = ->

        # * После загрузки
        _.onGameLoaded = ->

        return
    # -----------------------------------------------------------------------

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------