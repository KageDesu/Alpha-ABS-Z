# * Основной класс объекта АБС на карте (монстр, игрок и т.д.)

#@[STORABLE]
#@[GLOBAL]
class AAEntity
    constructor: () ->
        @_setup()
        @_setupForNetwork() if AA.Network.isNetworkGame()

    _setup: ->
        @_active = false
        @_target = null
        @_dead = false
        # * Состояние
        @_state = null

    # * UPDATE
    # -----------------------------------------------------------------------
    update: ->

    # * ABS
    # -----------------------------------------------------------------------
    initABS: -> @activate()

    # * PROPERTIES
    # -----------------------------------------------------------------------
    teamId: -> 0

    character: ->

    battler: ->

    sprite: -> $gameMap.spriteset().findTargetSprite(@character())

    logic: -> null

    # * HELPERS
    # -----------------------------------------------------------------------
    isMyEnemy: (aaEntity) ->
        return false unless aaEntity?
        return false unless aaEntity.isActive()
        return aaEntity.teamId() != @teamId()
        return false

    # * Эти поля используются для опеределения типа дочернего класса
    isPlayer: -> false
    isAlly: -> false
    isNetChar: -> false
    isEnemy: -> false

    # * TARGET
    # -----------------------------------------------------------------------
    setTarget: (target) -> @_target = AA.Utils.packAAEntity(target)
    resetTarget: -> @setTarget(null)
    getTarget: -> AA.Utils.unpackAAEntity(@_target)
    isHasTarget: -> @_target?
    
    # * MAIN STATE
    # -----------------------------------------------------------------------
    isActive: -> @_active is true
    activate: -> @_active = true
    deactivate: -> @_active = false

    # * BATTLE STATE
    # -----------------------------------------------------------------------
    # * Зависит от наличия цели
    inBattle: -> @isHasTarget()
    resetBattle: -> @resetTarget()

    # * DEAD STATE
    # -----------------------------------------------------------------------
    isDead: -> @_dead is true
    setDead: -> @_dead = true
    resetDead: -> @_dead = false

    # * NETWORK
    # -----------------------------------------------------------------------
    _setupForNetwork: ->
        @_createNetworkObserver()

    #TODO: Возможно нужен Instant режим?
    _createNetworkObserver: ->
        @netDataObserver = new DataObserver()
        @netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate())
        @_fillNetworkObserver()
        @netDataObserver.refreshAll(@)
        return
        
    _fillNetworkObserver: ->
        @netDataObserver.addFields(@, [
                "_target",
                "_active"
            ])
        return

    updateDataObserver: ->
        return unless @netDataObserver?
        @netDataObserver.check(@)
        if @netDataObserver.isDataChanged()
            @dataObserverHaveChanges()
            @netDataObserver.refreshAll(@)
        return

    # * Этот метод вызывается, когда изменились сихнронизируеммые данные
    dataObserverHaveChanges: ->
        AANetworkManager.syncAAEntityObserver(
            @character(),
            @getObserverDataForNetwork()
        )
        return

    getObserverDataForNetwork: ->
        data = @netDataObserver.getDataForNetwork(@)
        return data

    applyObserverData: (data) ->
        return unless @netDataObserver?
        @netDataObserver.setDataFromNetwork(@, data)
        return