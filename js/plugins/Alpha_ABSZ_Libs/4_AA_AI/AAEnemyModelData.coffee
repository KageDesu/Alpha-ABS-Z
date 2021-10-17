# * Класс, который содержит все настройки и параметры AA сущности врага на карте
# * Аналог AIBehavModel из ABS MV

#@[STORABLE]
#@[GLOBAL]
class AAEnemyModelData
    constructor: (@eventId) ->
        @enemyId = @eventSettings().getEnemyId()
        @_initBaseParameters()
        @_applyParametersFromDB()
        @_applyParametersFromEvent()
        @_convertParameters()
        #TODO: Делать редактор или нет?

    #TODO: Игрок должен иметь возмможность менять значения во время игры
    #TODO: basik shake effect strength when hitted

    enemy: -> $dataEnemies[@enemyId]

    eventSettings: -> $gameMap.event(@eventId).aaEventSettings

    isHaveDeadSwitch: -> AA.Utils.checkSwitch(@deadSwitch)

    isHaveOnDeathAction: -> AA.SAaction.isProper(@onDeath)

    isHaveOnSeeTargetAction: -> AA.SAaction.isProper(@onSeeTarget)

    isHaveSpecialExpValue: -> @expVar > 0

    #╒═════════════════════════════════════════════════════════════════════════╛
    # ■ PRIVATE.coffee
    #╒═════════════════════════════════════════════════════════════════════════╛
    #---------------------------------------------------------------------------
    do ->
    
        #@[DEFINES]
        _ = AAEnemyModelData::
    
        # * Инициализация базовых настроек
        _._initBaseParameters = ->
            @_initMain()
            @_initOnMapSettings()
            @_initOtherSettings()
            @_initVisualSettings()
            @_initAnimationSettings()
            @_initMovingSettings()
            return
            
        _._initMain = ->
            @onDeath = 0 #AScript
            @returnRadius = 12
            @viewRadius = 5
            @noPassVisionRegions = []
            @noPassVisionTerrains = []
            return

        _._initOnMapSettings = ->
            @shatterEffect = 1
            @deadSwitch = 0 #Switch (A, B, C, D)
            @eraseOnDead = 1
            return

        _._initVisualSettings = ->
            @faceName = "" # имя файла в папке faces
            @faceIndex = 0
            @UIInfo = 1 # * Если 1 - показывать Target UI при наведени курсора
            @miniHpGaugeStyle = "" #TODO: * no used
            @miniHPGaugeOffset = [0, 0] #TODO: * no used

        _._initOtherSettings = ->
            @onSeeTarget = 0 #AScript
            # * Переменная для опыта (отдельное значение, а не из БД)
            @expVar = 0
            return

        _._initAnimationSettings = ->
            @hitAnimationId = 1 # ID анимации
            return

        _._initMovingSettings = ->
            # Range (when start), Freq, Speed
            @approachMoveData = [3, 5, 4]
            # Min dist, Freq, Speed, isRandomStep
            @inBattleMoveData = [1, 3, 3, 0]
            #TODO: returnMoveData
            return

        _._applyParametersFromDB = ->
            params = @enemy().AAEnemy
            return unless params?
            @[p[0]] = p[1] for p in params
            return

        # * Применяем параметры из страницы события
        _._applyParametersFromEvent = ->
            settings = @eventSettings()
            return unless settings.isHaveExtraParameters()
            for param in settings.getParameters()
                @[param[0]] = param[1]
            return

        # * Преобразует некоторые параметры
        _._convertParameters = ->
            ##@miniHPGaugeOffset = #TODO: * no used
            ##    AA.Utils.Parser.convertArrayFromParameter @miniHPGaugeOffset
            @approachMoveData =
                AA.Utils.Parser.convertArrayFromParameter @approachMoveData
            @inBattleMoveData =
                AA.Utils.Parser.convertArrayFromParameter @inBattleMoveData
            @noPassVisionRegions =
                AA.Utils.Parser.convertArrayFromParameter @noPassVisionRegions
            @noPassVisionTerrains =
                AA.Utils.Parser.convertArrayFromParameter @noPassVisionTerrains
            return

        # * Не используются (для Selection circle)
        #@selectionVisible = true
        #@selectionColor = "#FF00FF"
        #@selectionOffset = [0, -10]
        #@selectionImage = "targetSelectedDottedSquare"
        
        return
    # ■ END PRIVATE
    #---------------------------------------------------------------------------