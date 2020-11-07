do ->
    
    class Sprite_UIText extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
                visible: true
                size: { w: 60, h: 20 }
                alignment: "center"
                font: { face: null, size: 18, italic: false }
                margins: { x: 0, y: 0 }
                outline: { color: null, width: 2 }
                textColor: "#FFFFFF".toCss()
            }

        #?DYNAMIC
        # * Сперва рисуем по готовности, а как загрузился спрайт, меняем
        drawText: (text) -> @_drawTextWhenReady(text)
        
        # * Пишет текст с определённым цветом (один раз)
        drawTextColor: (text, colorCss) ->
            return unless @_textSpr?
            @_textSpr.b().textColor = colorCss
            @drawText text
            @_textSpr.b().textColor = @params.textColor
            return
        
    AA.link Sprite_UIText
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIText::

    #$[OVER]
    _._createContent = ->
        @_createTextSprite()

    _._createTextSprite = ->
        @_textSpr = KDCore.Sprite.FromParams @params
        @_textSpr.onReady @_onReady.bind(@)
        @add @_textSpr

    # * Выполнить по готовности
    _._onReady = ->
        # * Переключить метод, так как уже готов
        @drawText = @_drawText
        # * Написать то что нужно было до готовности (если есть)
        return unless @_drawOnReady?
        @drawText @_drawOnReady
        @_drawOnReady = null
        return

    _._drawText = (text) ->
        return unless @_textSpr?
        @_textSpr.clear()
        @_textSpr.drawTextFull text if text?
        return

    # * Написать текст когда будет готов
    _._drawTextWhenReady = (text) ->
        @_drawOnReady = text
        @_drawText text
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
