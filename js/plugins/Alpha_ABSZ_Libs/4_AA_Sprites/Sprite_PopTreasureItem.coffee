do ->
    # * PopUp для предметов или текста, не используется для урона
    class Sprite_PopTreasureItem extends KDCore.Sprite
        constructor: (@params) ->
            super()
            @_isActive = true
            # * Анимация запущена
            @_isStarted = false
            @_init()
            return

        # * Стандартный набор настроек
        defaultParams: -> {
            text: {
                visible: true,
                size: { w: 80, h: 20 }
                alignment: "left"
                font: {
                    face: "AABS_1",
                    size: 12,
                    italic: false
                },
                margins: { x: 0, y: 0 },
                outline: { color: null, width: 2 }
                textColor: "#EAEAEA".toCss()
            },
            icon: {
                visible: true
                index: 0
                size: 14
            },
            countSymbol: "x",
            countText: {
                visible: true,
                size: { w: 50, h: 20 }
                alignment: "left"
                font: {
                    face: "AABS_0",
                    size: 11,
                    italic: false
                },
                margins: { x: 0, y: 2 },
                outline: { color: null, width: 2 }
                textColor: "#BDFDFD".toCss()
            }
        }

        # * Аналог !isDisposed()
        isActive: -> @_isActive is true

        # * Можно ли удалять popUp
        isDisposed: -> !@isActive()

        isStarted: -> @_isStarted is true

        setItem: (item, count) ->
            return unless item?
            @set(item.name, item.iconIndex, count)

        #TODO: Золото, опыт ???

        # * Задаём данные (текст, иконку, количество)
        set: (@text, @iconIndex, @count) ->
            return unless String.any(@text)
            return unless @isActive()
            @_createPopItemContent()
            return

        start: (@effectParams) ->
            return unless @isActive()
            @_startEffect()
            #stayTime
            #opacityChangeStep
            #moveStep

        # * Завершить работу popUp
        stop: ->
            @_isStarted = false
            @_isActive = false
            @_updateEffect = ->
            return

        update: ->
            super()
            @_updateEffect()

    AA.link Sprite_PopTreasureItem
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_PopTreasureItem::

    # * Подготовка элемента (проверка параметров)
    _._init = ->
        try
            @params = @defaultParams() unless @params?
        catch e
            KDCore.warning e
            # * Если произошла ошибка, отключаем элемент
            @isActive = -> false

    _._createPopItemContent = ->
        try
            @_createMainText()
            return unless @textSpr?
            @_createIcon() if Number::any(@iconIndex)
            @_createCountText() if @count?
            @_applyCenter()
        catch e
            KDCore.warning e
            @isActive = -> false
        return

    _._createMainText = ->
        # * Нет try, catch, потому что без основного текста, PopUp не может существовать
        # * Ошибка перехватывается выше и делает isActive = false
        @textSpr = new AA.Sprite_UIText(@params.text)
        @textSpr.draw @text
        # * Размер текста (нужен для автоцентровки)
        @_textWidth = @_getRealTextWidth(@textSpr, @text)
        @addChild @textSpr
        return

    _._getRealTextWidth = (textSpr, text) ->
        textWidth = textSpr._textSpr.bitmap.measureTextWidth text
        textWidth += textSpr.x
        textWidth = Math.round textWidth
        return textWidth

    _._createIcon = ->
        try
            @iconSpr = new AA.Sprite_UIIcon(@params.icon)
            @iconSpr.draw @iconIndex
            @iconSpr.x -= @params.icon.size + 1
            # * Ставим иконку вертикально по центру
            @iconSpr.y = @params.text.size.h / 2
            @iconSpr.zeroChild().anchor.y = 0.5
            @addChild @iconSpr
        catch e
            KDCore.warning e

    _._createCountText = ->
        try
            @countTextSpr = new AA.Sprite_UIText(@params.countText)
            text = @params.countSymbol + @count
            @countTextSpr.draw text
            @countTextSpr.x += @_textWidth + 1
            # * Не плюсуем, т.к. countTextSpr начинается уже после textSpr (x)
            @_textWidth = @_getRealTextWidth(@countTextSpr, text)
            @addChild @countTextSpr
        catch e
            KDCore.warning e

    _._applyCenter = ->
        #@setStaticAnchor(0.5, 0.5)
        allWidth = @_textWidth
        @x -= allWidth / 2
        @x += @params.icon.size / 2 if @iconSpr?
        return

    _._startEffect = ->
        return unless @effectParams?
        # * Эффект появления
        @_apperChanger = new AA.Changer(@)
        @_apperChanger.change('opacity')
            .from(0).to(255).step(55)
            .start()
        @_nextPhaseThread = new KDCore.TimedUpdate(@effectParams.stayTime, @_startEndPhase.bind(@))
        @_nextPhaseThread.once()
        @_isStarted = true
        return

    _._startEndPhase = ->
        # * Затухание после показа
        @_fadeOutChanger = new AA.Changer(@)
        @_fadeOutChanger.change('opacity')
            .from(255).to(0).step(@effectParams.opacityStep)
            .done(@stop.bind(@))
            .start()
        # * Поднятие вверх после показа
        @_moveOutChanger = new AA.Changer(@)
        @_moveOutChanger.change('y')
            .from(@y).to(-Graphics.height - 100).step(@effectParams.moveStep)
            .done(@stop.bind(@))
            .start()
        return

    _._updateEffect = ->
        return unless @isActive()
        return unless @isStarted()
        @_apperChanger.update()
        @_nextPhaseThread.update()
        @_fadeOutChanger?.update()
        @_moveOutChanger?.update()


    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------


