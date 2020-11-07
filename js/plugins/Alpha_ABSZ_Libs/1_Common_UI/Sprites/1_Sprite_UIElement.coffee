# * Общий класс для всех UI элементов
#?rev 13.10.20
do ->

    # * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    #@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite
        constructor: (@params) ->
            super()
            @_init()

        # * Стандартный набор настроек
        defaultParams: -> {
            visible: true
        }

        # * Общий метод (есть у всех элементов)
        # * По умолчанию вызывает drawText, но потомки могут переопределить
        draw: -> @drawText(...arguments)

        # * Общий метод
        drawText: -> # * EMPTY

        # * Если изначально невидимый (из параметров), то не активный вообще
        isActive: -> @params.visible is true

        # * Корневая директория для изображений
        @RootImageFolder = "AABS"

        rootImageFolder: -> Sprite_UIElement.RootImageFolder

        # * Сделать чёрно белым
        desaturate: ->
            @filters = [new PIXI.filters.ColorMatrixFilter()]
            @filters[0].desaturate()
            return

        # * Общий метод (можно ли редактировать визуально)
        isCanBeEdited: -> false

        # * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag: -> false

        # * Общий метод (находится ли объект под мышкой)
        isUnderMouse: -> @zeroChild()?.isUnderMouse()

        # * Параметры первого элемента (если он есть)
        realWidth: ->
            child = @zeroChild()
            if child?
                if child instanceof AA.Sprite_UIElement
                    return child.realWidth()
                else
                    return child.width
            return 0

        realHeight: ->
            child = @zeroChild()
            if child?
                if child instanceof AA.Sprite_UIElement
                    return child.realHeight()
                else
                    return child.height
            return 0

        # * Первый "физический" элемент (спрайт)
        zeroChild: -> @children[0]

        # * Метод восстановления значения на стандартные настройки
        reset: (property) ->
            try
                switch property
                    when "position"
                        @_resetPosition()
                    else
                        @[property] = @params[property]
            catch e
                KDCore.warning e
            return

    AA.link Sprite_UIElement
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_UIElement::

    _._init = ->
        @_prepare()
        try
            @_createContent()
        catch e
            KDCore.warning e
            # * Если при создании произошла ошибка, отключаем элемент
            @isActive = -> false
        
    # * Подготовка элемента (проверка параметров)
    _._prepare = ->
        @params = @defaultParams() unless @params?
        @visible = @params.visible

    # * Наследники создают свои элементы в этом методе
    _._createContent = -> # * EMPTY

    # * Сброс позиции
    _._resetPosition = ->
        { x, y } = @params.position
        @move x, y
        return
    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------