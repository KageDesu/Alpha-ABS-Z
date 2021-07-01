# * Класс для показа полоски здоровья над персонажами на карте
# * Имеет свой встроенный контроллер
do ->
    #rev 30.06.2021
    class Sprite_CharacterMiniGauge extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)
            # * По умолчанию нету доп. смещения
            # * (у каждого события может быть своё, это см. в Model)
            @setExtraMargins(0, 0)
            return

        setupController: (@battler, @rateGetter) ->
            # * Если изначально в параметрах visible == false, то ничего
            return unless @isActive()
            @visible = @battler?
            @controllerThread = new KDCore.TimedUpdate(10, @refreshValues.bind(@))
            return

        defaultParams: -> {
            visible: true,
            position: { x: -19, y: -56 },
            label: null,
            labelMargins: { x: 0, y: 0 },
            # * TEXT не используется в этой реализации
            text: {
                visible: false
                size: { w: 100, h: 20 }
                alignment: "left"
                font: { face: "AABS_0", size: 13, italic: false }
                margins: { x: 10, y: 0 }
                outline: { color: null, width: 2 }
                textColor: "#edead8".toCss()
            }
            gauge: {
                visible: true
                fill: "Event_HPGauge2",
                foreground: ""
                mask: ""
                backColor: "#000000".toCss()
                backOpacity: 160
                vertical: false
            }
        }

        setExtraMargins: (@dx, @dy) ->

        refreshPosition: (x, y) ->
            # * Настройки сперва (смещение)
            @_resetPosition()
            # * Затем координаты на экране
            @x += x
            @y += y
            # * Теперь дополнительные настройки
            @x += @dy
            @y += @dy
            return

        showInstant: -> @visible = true

        showSlow: ->
            return if @visible is true
            @refreshValues()
            @visible = true
            @changer = new AA.Changer(@)
            @changer.change('opacity')
                .from(0).to(255).step(35)
                .start()
            @showHideThread = null
            return

        hideInstant: -> @visible = false

        hideSlow: ->
            return if @visible is false
            return if @showHideThread?
            return if @opacity <= 0
            @changer = new AA.Changer(@)
            @changer.change('opacity')
                .from(@opacity).to(0).step(45)
                .start().done(() => @visible = false)
            return

        showAndHide: ->
            return if @visible is true
            return if @showHideThread?
            @showSlow()
            @showHideThread = new KDCore.TimedUpdate(60, @_hideAfterTime.bind(@))
            @_updateShowHide = @_updateShowHideBody
            return

        drawGauge: (percent) ->
            @gauge.draw(percent)

        drawText: (text) ->
            @text.draw(text)

        #TODO: Динамическую смену
        refreshValues: ->
            unless @__prevRate?
                @__prevRate = @battler[@rateGetter]()
                @drawGauge(@__prevRate)
            else
                newRate = @battler[@rateGetter]()
                #TODO: animated?
                #if newRate < @__prevRate
                #    diff = @__prevRate - newRate
                if newRate != @__prevRate
                    @__prevRate = newRate
                    @drawGauge(newRate)
            return

        update: ->
            super()
            @_updateController()
            @_updateShowHide()
            @changer?.update()
            return

    AA.link Sprite_CharacterMiniGauge
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_CharacterMiniGauge.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_CharacterMiniGauge::

    #$[OVER]
    _._createContent = ->
        @_createGauge()
        @_createText()
        @_createLabel()
        @move @params.position

    _._createGauge = ->
        @gauge = new AA.Sprite_UIGauge(@params.gauge)
        @add @gauge

    _._createText = ->
        @text = new AA.Sprite_UIText(@params.text)
        @add @text
    
    _._createLabel = ->
        return if String.isNullOrEmpty(@params.label)
        label = new AA.Sprite_UIImage()
        label.draw @params.label
        label.move @params.labelMargins
        @add label
    
    _._updateController = ->
        return unless @isActive()
        return unless @battler?
        @controllerThread.update()
        
    _._hideAfterTime = ->
        @showHideThread = null
        @hideSlow()

    #?DYNAMIC
    _._updateShowHide = -> # * EMPTY
    
    _._updateShowHideBody = ->
        @showHideThread?.update()

    return
# ■ END Sprite_CharacterMiniGauge.coffee
#---------------------------------------------------------------------------