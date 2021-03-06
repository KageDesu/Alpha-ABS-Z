# * Основной класс объекта АБС на карте (монстр, игрок и т.д.)

#@[STORABLE]
#@[GLOBAL]
class AAEntity
    constructor: () ->
        @_setup()

    _setup: ->
        @_active = false
        @_target = null
        @_inBattle = false
        @_dead = false
        # * Состояние
        @_state = null

    # * UPDATE
    # -----------------------------------------------------------------------
    update: ->

    # * ABS
    # -----------------------------------------------------------------------
    initABS: ->
        @activate()

    stopABS: ->
        @deactivate()

    # * PROPERTIES
    # -----------------------------------------------------------------------
    teamId: -> 0

    character: ->

    battler: ->

    sprite: -> $gameMap.spriteset().findTargetSprite(@character())

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
    isEnemy: -> false

    # * TARGET
    # -----------------------------------------------------------------------
    setTarget: (target) -> @_target = target
    resetTarget: -> @setTarget(null)
    getTarget: -> @_target
    isHasTarget: -> @getTarget()?
    
    # * MAIN STATE
    # -----------------------------------------------------------------------
    isActive: -> @_active is true
    activate: -> @_active = true
    deactivate: -> @_active = false

    # * BATTLE STATE
    # -----------------------------------------------------------------------
    inBattle: -> @_inBattle is true
    setBattle: -> @_inBattle = true
    resetBattle: -> @_inBattle = false

    # * DEAD STATE
    # -----------------------------------------------------------------------
    isDead: -> @_dead is true
    setDead: -> @_dead = true
    resetDead: -> @_dead = false

    