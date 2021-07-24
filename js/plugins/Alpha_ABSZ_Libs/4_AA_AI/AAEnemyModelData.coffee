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
        #TODO: Делать редактор или нет?

    #TODO: Игрок должен иметь возмможность менять значения во время игры
    #TODO: basik shake effect strength when hitted

    enemy: -> $dataEnemies[@enemyId]

    eventSettings: -> $gameMap.event(@eventId).aaEventSettings

    isHaveDeadSwitch: -> AA.Utils.checkSwitch(@deadSwitch)

    isHaveOnDeathAction: -> AA.SAaction.isProper(@onDeath)

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
            
        _._initMain = ->
            @onDeath = 0 #AScript
            @returnRadius = 12
            @viewRadius = 5
            #TODO: Каждый враг может иметь свои ограничения видимости
            @noPassVisionRegions = 0
            @noPassVisionTerrains = 0
            return

        _._initOnMapSettings = ->
            @shatterEffect = 1
            @deadSwitch = 0 #Switch (A, B, C, D)
            @eraseOnDead = 1
            return

        _._initVisualSettings = ->
            @miniHpGaugeStyle = ""
            @miniHPGaugeOffset = [0, 0]

        _._initOtherSettings = ->

        _._initAnimationSettings = ->
            @hitAnimationId = 1 # ID анимации
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

        # * Не используются (для Selection circle)
        #@selectionVisible = true
        #@selectionColor = "#FF00FF"
        #@selectionOffset = [0, -10]
        #@selectionImage = "targetSelectedDottedSquare"
        
        return
    # ■ END PRIVATE
    #---------------------------------------------------------------------------