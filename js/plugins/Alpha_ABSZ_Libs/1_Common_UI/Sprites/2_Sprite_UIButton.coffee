do ->

    # * Кнопка на экране, можно нажимать

    class Sprite_UIButton extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Стандартный набор настроек
        defaultParams: -> {
            visible: true
            image: "Button_Inventory",
            isHaveDisabled: true,
            click: "console.log('click')" # * число или код
        }

        # * Кнопка не поддерживает перерисовку
        draw: -> # * EMPTY

        disable: -> @button?.disable()

        enable: -> @button?.enable()

        setState: (isEnabled) ->
            if isEnabled then @enable() else @disable()
        
        # * Просто вызов метода
        call: -> @button?.click()

        # * Вызов метода с симуляцией нажатия
        click: ->
            @button?.click()
            @button?.simulateClick()

    AA.link Sprite_UIButton
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIButton::

    #$[OVER]
    _._createContent = ->
        if @params.image.isEmpty()
            KDCore.warning 'You try create Button without image'
            return
        @button =
            new KDCore.ButtonM(@params.image, @params.isHaveDisabled, @rootImageFolder())
        @add @button
        @_registerClickMethod()

    _._registerClickMethod = ->
        return unless String.any(@params.click)
        method = null
        try
            # * Если число, то значит общее событие
            if isFinite(@params.click)
                commonEventId = parseInt @params.click
                if commonEventId > 0
                    method = () -> $gameTemp.reserveCommonEvent commonEventId
            else
                # * Иначе скрипт
                script = @params.click
                method = () -> eval(script)
            @button.addClickHandler method
        catch e
            KDCore.warning e
            @button?.clearClickHandler()
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------