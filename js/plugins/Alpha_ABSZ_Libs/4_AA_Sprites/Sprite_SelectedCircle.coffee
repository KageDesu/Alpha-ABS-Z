do ->
    
    # * Спрайт - круг на карте под выбранной целью
    class Sprite_SelectedCircle extends KDCore.Sprite
        constructor: () ->
            super()
            @bitmap = @defaultCircle()
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

        defaultCircle: -> ImageManager.loadAA(@defaultSettings().selectionImage)

        #TODO: Учёт начальной видимости
        #TODO: Это из plugin parameters
        defaultSettings: ->
            {
                visible: true,
                selectionImage: "targetSelectedCircle",
                margins: { x: 0, y: 0 },
                animation: true # * Это касается мерцания
            }

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
        @_deleteHpGauge()
        return

    _._linkToTarget = (char) ->
        try
            @visible = false
            @_targetSpr = char.AASprite()
            @_charSettings = char.AAEntity().model()
            #TODO: Определять видимость из параметров
            @_determineTargetColor(char)
            @_determineTargetImage()
            @_updateMain = @_updateWithTarget
            if @defaultSettings().animation is true
                @_createOpacityChanger()
            @_updateWithTarget()

            #TODO: TEMP
            #@_createHPMiniBar()
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
        try
            if @_charSettings? and @_charSettings.selectionOffset?
                @x += @_charSettings.selectionOffset[0]
                @y += @_charSettings.selectionOffset[1]
        catch e
            AA.w e
        @_updateOpacityEffect()

    #?DYNAMIC
    _._updateOpacityEffect = -> # * EMPTY

    # * Определить какой цвет установить
    _._determineTargetColor = (char) ->
        try
            if @_charSettings? and String.any(@_charSettings.selectionColor)
                @_applyCustomColor(@_charSettings.selectionColor)
                return
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

    # * Определяет какую картинку выделения использовать
    _._determineTargetImage = ->
        try
            if @_charSettings? and String.any(@_charSettings.selectionImage)
                @bitmap = ImageManager.loadAA(@_charSettings.selectionImage)
            else
                @bitmap = @defaultCircle()
            @bitmap.addLoadListener () => @visible = true
        catch e
            AA.w e
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
    
    # * Из настроек цели
    _._applyCustomColor = (color) ->
        c = KDCore.Color.FromHex(color)
        @setBlendColor c.ARR




    _._createHPMiniBar = ->
        #TODO: Тут полный бардак, плюс этот метод не тут должен быть вообще!
        # * Сделано только для показа
        # Надо HP на спрайте отрисовывать
        @_deleteHpGauge()
        data = "miniHpGauge1"
        if String.any(@_charSettings.miniHpGaugeStyle)
            data = @_charSettings.miniHpGaugeStyle
        p = AA.PP.uiData(data)
        p.position.x = @x - 28
        p.position.y = @y - 62
        if @_charSettings.miniHPGaugeOffset?
            p.position.x += @_charSettings.miniHPGaugeOffset[0]
            p.position.y += @_charSettings.miniHPGaugeOffset[1]
        hpBar = new AA.Sprite_ActorStateGauge(p)
        @parent.addChild hpBar
        @hpGauge = hpBar

    _._deleteHpGauge = ->
        if @hpGauge?
            @parent.removeChild @hpGauge

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
