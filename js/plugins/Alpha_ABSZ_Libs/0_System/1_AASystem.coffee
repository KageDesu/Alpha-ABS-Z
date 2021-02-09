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
            @loadParameters()

        _.loadParameters = ->
            AA.PP = new AA.ParamsManager()

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

        #TODO: Может пауза и не нужна
        _.pauseABS = -> $gameTemp._isABSOnPause = true

        _.resumeABS = -> $gameTemp._isABSOnPause = false

        _.isPaused = -> $gameTemp._isABSOnPause is true

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
            if @isPaused()
                @resumeABS()
            else
                # * Возможно игрок отключил систему, поэтому проверяем isABS()
                @startABS() if @isABS()

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
            $gameTroop.initABS()

        return
    # -----------------------------------------------------------------------

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------