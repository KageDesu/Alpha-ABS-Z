# * Класс для показа иконки состояния или баффа игрока
do ->

    class Sprite_ActorStateIcon extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)
            @_lastIconIndex = 0
            @_lastTextValue = null

        defaultParams: -> {
            visible: true,
            position: { x: 0, y: 0 },
            isCanBeEdited: true,
            text: {
                visible: true
                size: { w: 38, h: 14 }
                alignment: "right"
                font: { face: "AABS_1", size: 16, italic: false }
                margins: { x: -2, y: -4 }
                outline: { color: null, width: 2 }
                textColor: "#fafdec".toCss()
            }
            icon: {
                visible: true
                index: 0
                size: 32
            }
        }

        draw: (iconIndex, text) ->
            if @_lastIconIndex != iconIndex
                @drawIcon iconIndex
                @_lastIconIndex = iconIndex
            if @_lastTextValue != text
                if text? and isFinite(text)
                    @drawText(KDCore.Utils.convertTimeShort(text))
                else
                    @drawText(text)
                @_lastTextValue = text

        drawIcon: (index) -> @icon.draw(index)

        drawText: (text) -> @text.draw(text)

        #$[OVER]
        isCanBeEdited: -> @params.isCanBeEdited is true

    AA.link Sprite_ActorStateIcon
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_ActorStateIcon::

    #$[OVER]
    _._createContent = ->
        @_createIcon()
        @_createText()
        @move @params.position

    _._createIcon = ->
        @icon = new AA.Sprite_UIIcon(@params.icon)
        @add @icon

    _._createText = ->
        @text = new AA.Sprite_UIText(@params.text)
        @add @text
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------