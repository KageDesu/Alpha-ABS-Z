do ->
    
    class Sprite_UITextWithBack extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                text: {
                    visible: true
                    size: { w: 60, h: 20 }
                    alignment: "center"
                    font: { face: null, size: 18, italic: false }
                    margins: { x: 0, y: 0 }
                    outline: { color: null, width: 2 }
                    textColor: "#000000".toCss()
                }
                rect: {
                    visible: true
                    size: { w: 60, h: 20 }
                    fillColor: "#FFFFFF".toCss()
                    fillOpacity: 255
                    borderColor: "#000000".toCss()
                    borderThickness: 1
                    borderOpacity: 255
                }
                textMargins: { x: 0, y: 0 }
            }

        draw: () -> @drawText(...arguments)

        # * Aргументы смотри в Sprite_UIText
        drawText: () -> @text.draw(...arguments)
        drawTextColor: () -> @text.drawTextColor(...arguments)

        # * Аргументы смотри в Sprite_UIRect
        fill: () -> @rect.fill(...arguments)
        drawBorder: () -> @rect.drawBorder(...arguments)

        #$[OVER]
        isUnderMouse: -> @rect.isUnderMouse()
        
    AA.link Sprite_UITextWithBack
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UITextWithBack::

    #$[OVER]
    _._createContent = ->
        @_createRect()
        @_createText()
    
    _._createRect = ->
        @rect = new AA.Sprite_UIRect(@params.rect)
        @addChild @rect

    _._createText = ->
        @text = new AA.Sprite_UIText(@params.text)
        { x, y } = @params.textMargins
        @text.move x, y
        @addChild @text

    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
