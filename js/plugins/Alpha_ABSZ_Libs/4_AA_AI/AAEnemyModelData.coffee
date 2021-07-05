# * Класс, который содержит все настройки и параметры AA сущности врага на карте
# * Аналог AIBehavModel из ABS MV

#@[STORABLE]
#@[GLOBAL]
class AAEnemyModelData
    constructor: (@eventId) ->
        @enemyId = @eventSettings().getEnemyId()
        @_initBaseParameters()

        #@miniHpGaugeStyle = "miniHpGauge1"
        #@miniHPGaugeOffset = [-12, -58]

        #TODO: Применение настроек из БД ?
        # Делать редактор или нет?
        #TODO: Применение настроек из события

        ###if @enemyId == 11
            @selectionVisible = true
            @selectionColor = "#FF00FF"
            @selectionOffset = [0, -10]
            @selectionImage = "targetSelectedDottedSquare"

            @miniHpGaugeStyle = "miniHpGauge2"
            @miniHPGaugeOffset = [8, 12]

        else if @enemyId == 10
            @selectionVisible = true
            @selectionColor = "#BBBB00"
            @selectionOffset = [0, -20]
            @selectionImage = "targetSelectedBigSquare"

            @miniHpGaugeStyle = "miniHpGauge3"
            @miniHPGaugeOffset = [-12, -58]###

    #TODO: Игрок должен иметь возмможность менять значения во время игры

    #TODO: basik shake effect strength when hitted

    eventSettings: -> $gameMap.event(@eventId).aaEventSettings

    #╒═════════════════════════════════════════════════════════════════════════╛
    # ■ PRIVATE.coffee
    #╒═════════════════════════════════════════════════════════════════════════╛
    #---------------------------------------------------------------------------
    do ->
    
        #@[DEFINES]
        _ = AAEnemyModelData::
    
        # * Инициализация базовых настроек
        _._initBaseParameters = ->
            @shatterEffect = 1
            @deadSwitch = 0
            @onDeath = 0
            #TODO: Остановился тут, базовые настройки врага
            #TODO: Лучше сразу перейти на реализацию АИ логики

        
        return
    # ■ END PRIVATE
    #---------------------------------------------------------------------------