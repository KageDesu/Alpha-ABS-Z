do ->
    
    # * Спрайт - круг на карте под выбранной целью

    class Sprite_SelectedCircle extends KDCore.Sprite
        constructor: () ->
            super(ImageManager.loadAA('targetSelectedCircle'))
            @anchor.set(0.5)
            # * Изначально не видимый
            @visible = false

        isActive: -> @visible is true

        # * Установить цель (показать круг и переместить к цели)
        setTarget: (char) ->
            if char? and char.isABS()
                @_linkToTarget(char)
            else
                @_reset()

        resetTarget: -> @setTarget(null)

        update: ->
            super()
            @_updateMain()


    AA.link Sprite_SelectedCircle
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SelectedCircle::

    _._reset = ->
        @_updateMain = ->
        @move -100, -100
        @visible = false
        return

    _._linkToTarget = (char) ->
        try
            @_targetSpr = char.AASprite()
            @_determineTargetColor(char)
            @_updateMain = @_updateWithTarget
            @visible = true
            @_createOpacityChanger() #TODO: if parameter
            @_updateWithTarget()
        catch e
            KDCore.warning e
            @_reset()

    _._createOpacityChanger = ->
        @changer = new AA.Changer(@)
        @changer.change('opacity')
            .from(255).to(150).step(5)
            .reverse().repeat()
            .start()
        @_updateOpacityEffect = => @changer.update()
        return

    #?DYNAMIC
    _._updateMain = -> # * EMPTY

    # * Перемещение к позиции цели
    _._updateWithTarget = ->
        @move @_targetSpr.x, @_targetSpr.y
        @_updateOpacityEffect()

    #?DYNAMIC
    _._updateOpacityEffect = -> # * EMPTY

    # * Определить какой цвет установить
    _._determineTargetColor = (char) ->
        try
            if char.AABattler().isActor()
                @_applyAllyColor()
            else
                if $gamePlayer.isMyEnemy(char)
                    @_applyEnemyColor()
                else
                    @_applyNetralColor()
        catch e
            KDCore.warning e
            @_applyUnknownColor()
        return

    # * Цвет, когда выбран враг
    _._applyEnemyColor = ->
        @setBlendColor KDCore.Color.RED.ARR

    # * Когда выбран член партии
    _._applyAllyColor = ->
        @setBlendColor KDCore.Color.GREEN.ARR

    # * Когда выбран монстр с teamId == 0
    _._applyNetralColor = ->
        @setBlendColor KDCore.Color.AQUA.ARR

    # * В случае ошибки
    _._applyUnknownColor = ->
        @setBlendColor KDCore.Color.YELLOW.ARR
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
