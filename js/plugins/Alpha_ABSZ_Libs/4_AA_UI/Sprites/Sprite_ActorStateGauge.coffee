# * Класс для показа базовых параметров игрока HP, MP, TP
do ->
    
    class Sprite_ActorStateGauge extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        #TODO: Переделать вывод значения как у Enemy Mini HP

        defaultParams: -> {
            visible: true,
            position: { x: 304, y: 560 },
            label: "Player_HPGaugeLabel",
            labelMargins: { x: -33, y: 5 },
            isCanBeEdited: true,
            isHideWithMessage: true,
            text: {
                visible: true
                size: { w: 100, h: 20 }
                alignment: "left"
                font: { face: "AABS_0", size: 13, italic: false }
                margins: { x: 10, y: 0 }
                outline: { color: null, width: 2 }
                textColor: "#edead8".toCss()
            }
            gauge: {
                visible: true
                fill: "Player_HPGauge",
                foreground: ""
                mask: ""
                backColor: "#000000".toCss()
                backOpacity: 160
                vertical: false
            }
        }

        #$[OVER]
        isCanBeEdited: -> @params.isCanBeEdited is true

        #$[OVER]
        isHaveHideWithMessageFlag: -> @params.isHideWithMessage is true

        drawGauge: (percent) ->
            @gauge.draw(percent)

        drawText: (text) ->
            @text.draw(text)
        
    AA.link Sprite_ActorStateGauge
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_ActorStateGauge::

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

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------