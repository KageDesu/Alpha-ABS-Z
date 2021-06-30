do ->
    # * Общий контроллер для Sprite_UIGauge (HP, MP, TP, ...)
    #?rev 30.06.21
    class GaugeController extends AA.UIElementController
        constructor: (@gaugeSprite) ->
            super()
            
        # * source - Game_Battler
        # * valueFieldName - название поля (hp)
        #$[OVER]
        setup: (@source, @valueFieldName, @maxValueFieldName) ->
            @value = 0
            @max = 0
            @createThread(10, 4)
            return
        
        # * 0 - value (100), 1 - % (100%), 2 - full (100 / 100)
        setValueTextType: (valueTextType) ->
            switch valueTextType
                when 1
                    @getTypedText = @getValuePercentText
                when 2
                    @getTypedText = @getValueAndMaxText
                else
                    @getTypedText = @getValueText
            return

        refreshGauge: ->
            return unless @gaugeSprite?
            try
                @gaugeSprite.drawGauge(@value / @max)
                @gaugeSprite.drawText(@getTypedText())
            catch e
                KDCore.warning e
                # * Останавливаем работу метода
                @refreshGauge = ->
            return

        #?DYNAMIC
        # * Этот метод используется чтобы получить текст исходя из настроек контроллера
        # * По стандарту - обычное значение
        getTypedText: -> @getValueText()

        getValueText: -> @value

        getValueAndMaxText: -> @value + " / " + @max

        getValuePercentText: -> Math.round((@value / @max) * 100) + '%'

    AA.link GaugeController
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.GaugeController::

    #$[OVER]
    _._refresh = ->
        sourceValue = @source[@valueFieldName]
        sourceMaxValue = @source[@maxValueFieldName]

        # * Перерисовываем только если значния изменились
        if @value isnt sourceValue or @max isnt sourceMaxValue
            @value = sourceValue
            @max = sourceMaxValue
            @refreshGauge()
        return

    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------