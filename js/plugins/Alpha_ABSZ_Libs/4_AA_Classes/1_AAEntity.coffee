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

    sprite: -> SceneManager._scene._spriteset.findTargetSprite(@character())

    # * HELPERS
    # -----------------------------------------------------------------------
    isMyEnemy: (aaEntity) ->
        return aaEntity.teamId() != @teamId() if aaEntity?
        return false

    # * TARGET
    # -----------------------------------------------------------------------
    setTarget: (target) -> if target? then @_target = target else @resetTarget()
    resetTarget: -> @_target = null
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

    