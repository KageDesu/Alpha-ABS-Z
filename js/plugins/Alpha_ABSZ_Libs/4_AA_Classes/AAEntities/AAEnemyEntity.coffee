# * Данный класс используется для AAEntity врагов на карте
class AAEnemyEntity extends AAEntity
    constructor: (@eventId) ->
        super()
        @_setupForNetwork() if AA.Network.isNetworkGame()

    # * Группа у них 1, как и у стандартных врагов, чтобы враги их игнорировали
    teamId: -> 1

    character: -> $gameMap.event(@eventId)

    battler: -> @aaBattler

    isEnemy: -> true

    logic: -> @aaLogic

    # * Настройки и параметры
    model: -> @aaModel

    initABS: ->
        unless @model()?
            super()
            # * Инициализация системы в первый раз
            @aaModel = new AAEnemyModelData(@eventId)
            @aaBattler = new AAEnemyBattler(@aaModel.enemyId, @eventId)
            @aaLogic = new EnemyAI_FlowMachine(@eventId)
        else
            # * Ничего
            # * Повторная инициализация (например после выхода из меню) не нужна
        return

    # * NETWORK
    # -----------------------------------------------------------------------

    #TODO: Сейчас используется только одно поле - _target, поэтому
    # * можно оптимизировать и использовать отдельный метод, а не целый netDataObserver

    #TODO: Возможно нужен Instant режим?
    _createNetworkObserver: ->
        @netDataObserver = new DataObserver()
        @netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate())
        @_fillNetworkObserver()
        @netDataObserver.refreshAll(@)

    _fillNetworkObserver: ->
        @netDataObserver.addFields(@, [
                "_target"
            ])
        return

    _updateDataObserver: ->
        return unless @netDataObserver?
        @netDataObserver.check(@)
        if @netDataObserver.isDataChanged()
            @dataObserverHaveChanges()
            @netDataObserver.refreshAll(@)
        return

    # * Этот метод вызывается, когда изменились сихнронизируеммые данные
    dataObserverHaveChanges: ->
        AANetworkManager.syncAAEntityObserver(
            @eventId,
            @_getObserverDataForNetwork()
        )
        return

    _getObserverDataForNetwork: ->
        data = @netDataObserver.getDataForNetwork(@)
        return data

    applyObserverData: (data) ->
        return unless @netDataObserver?
        @netDataObserver.setDataFromNetwork(@, data)
        return