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
            @applyParameters()

        _.loadParameters = ->
            AA.PP = new AA.ParamsManager()

        # * В зависимости от параметров, добавление новых методов
        _.applyParameters = ->
            AA.Input.init(AA.PP.getParam('inputSettings'))

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

        #TODO: Лог свой разработки
        _.startABS = ->
            "START ABS SESSION".p()
            $gameSystem._isABS = true
            @initManagers()
            @initEnteties()

        _.stopABS = ->
            $gameSystem._isABS = false

        _.isABS = -> $gameSystem._isABS is true

        _.isMap = -> $gameTemp._isMapScene is true

        _.update = ->

        return
    # -----------------------------------------------------------------------

    # * Управление переходами и состояниями
    # -----------------------------------------------------------------------
    do ->

        # * Главное меню (или Scene_Boot)
        _.onGameDataLoaded = ->
            # * Парсим (читаем) АБС параметры в БД
            AA.Utils.Parser.processABSSkillsNotetags()
            # * По умлочанию, система всегда активированна
            $gameSystem._isABS = true
            #TODO: Сброс АБС системы (например игрок вышел из карты на титульник)

        # * Сцена карты загрузилась (или попали на сцену из меню, или Transfer)
        _.onMapSceneLoaded = ->
            # * Возможно игрок отключил систему, поэтому проверяем isABS()
            @startABS() if @isABS()
            AA.UI.refresh()
            return

        # * Сцена карты завершается (переключение сцены)
        _.onMapSceneStopped = ->
            AA.UI.terminate()
            $gamePlayer.aaOnMapSceneEnd()
            $gameTemp.aaClearAILogicThreads()
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

    # * Управление компонентами системы
    # -----------------------------------------------------------------------
    do ->

        _.initManagers = ->

        _.initEnteties = ->
            $gamePlayer.initABS()
            $gameMap.initABS()

        return
    # -----------------------------------------------------------------------

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------