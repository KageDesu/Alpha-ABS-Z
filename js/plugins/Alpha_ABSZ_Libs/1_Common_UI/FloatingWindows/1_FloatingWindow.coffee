# * Общий класс для всех окон на карте

do ->

#TODO: Может написать автофон как в стандартных окнах? Чтобы по пикселям растягивал гаринцы

    class FloatingWindow extends KDCore.Sprite
        constructor: (@mainParent, @windowW, @windowH) ->
            super()
            # * Окно всегда закрыто
            @visible = false
            @_initFloatingSystem()
            @_loadWindowFrame()
            @_createContent()
            return

        isActive: -> @visible is true

        isMouseIn: -> @inPosition TouchInput

        isOpen: -> @isActive()

        isDraggable: -> @_headerSpr.visible is true && @isOpen()

        setCloseHandler: -> (@_closeHandler)

        callCloseHandler: -> @_closeHandler() if @_closeHandler?

        setDraggingHandler: -> (@_dragHandler)

        setDragEndHandler: -> (@_dragEndHandler)

        hideHeader: -> #TODO:

        hideCloseButton: -> #TODO:

        # * Сдвиг заголовка по X, чтобы рамку не задевал
        headerMarginX: -> 2

        # * Сдвиг заголовка по Y, чтобы рамку не задевал
        headerMarginY: -> 0

        # * Стандартная позиция кнопки "закрыть"
        closeButtonPosition: -> { x: @width - 24, y: 4 }

        open: ->
            return if @isOpen()
            @_open()
            @_afterOpen()
            return

        close: ->
            return unless @isOpen()
            @_close()
            @_afterClose()
            return

        rootImageFolder: -> "AABS/Windows"

        update: ->
            super()
            @_updateMouseCheckThread()
            @_updateDragging()
            return

        # * Добавить спрайт на специальный слой контента
        addContent: (sprite) ->
            @_contentLayer.addChild(sprite)

    AA.link FloatingWindow
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.FloatingWindow::

    _._initFloatingSystem = ->
        # * Создаём массив окон, он нужен для правильного
        # закрытия окон (по очереди) и перемещения drag and drop
        # с учётом верхнего окна
        $gameTemp._floatingWindows = [] unless $gameTemp._floatingWindows?
        # * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
        @_mouseIn = false
        # * Тоже вспомогательная переменная
        @_dragging = false
        return

    _._moveToStartPosition = ->
        @moveToCenter(Graphics.width / 2, Graphics.height / 2)
        
    _._closeButtonClick = ->
        # * При исчезании, кнопка не успевает себя "удалить"
        $gameTemp.kdButtonUnderMouse = null
        @callCloseHandler()
        @close()

    # * DRAGGING
    # -----------------------------------------------------------------------
    do ->
    
        _._updateDragging = ->
            return unless @isDraggable()
            # * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
            # * Только если мышка не в окне и не двигали ранее, то не проверяем
            return if @_mouseIn is false and @_dragging is false
            if TouchInput.isLongPressed()
                if @_dragging is false
                    @_onDragStart()
                else
                    @_onDragging()
            else
                @_stopDragging()
            return

        _._onDragStart = ->
            # * Проверка, в области Header или нет
            return unless @_isMouseInHeader()
            # * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
            @opacity = 200
            @_deltaXY = @getDeltaXY()
            @_dragging = true
            return

        #TODO из пойнт
        _.getDeltaXY = ->
            dx = TouchInput.x - @x
            dy = TouchInput.y - @y
            return new KDCore.Point(dx, dy)

        _._onDragging = ->
            # * Защита от перетаскивания за края экрана
            return unless @_isNewMousePositionOnScreen()
            @move TouchInput.x - @_deltaXY.x, TouchInput.y - @_deltaXY.y
            do @_dragHandler if @_dragHandler?
            
        _._stopDragging = ->
            if @_dragging is true
                @_dragging = false
                @opacity = 255
                do @_dragEndHandler if @_dragEndHandler?
            return

        _._isMouseInHeader = ->
            return false unless @_headerSpr?
            return @_headerSpr.isContainsPoint(TouchInput)

        #TODO: из Utils
        _._isNewMousePositionOnScreen = ->
            { x, y } = TouchInput
            maxW = Graphics.width
            maxH = Graphics.height
            # * Граница от краёв экрана
            screenMargin = 10
            if x < screenMargin
                return false
            if y < screenMargin
                return false
            if x > (maxW - screenMargin)
                return false
            if y > (maxH - screenMargin)
                return false
            return true

        return
    # -----------------------------------------------------------------------


    # * CREATE ELEMENTS
    # -----------------------------------------------------------------------
    do ->
        
        _._loadWindowFrame = ->
            KDCore.Utils.loadImageAsync(@rootImageFolder(), "windowFrame")
                .then(@_createWindow.bind(@))

        _._createWindow = (frameImage) ->
            @bitmap = new Bitmap(@windowW, @windowH)
            @wFrame = new AA.Sprite_TilingFrame(@windowW, @windowH, frameImage)
            @addChild @wFrame
            @_createParts()
            return
        
        _._createParts = () ->
            @_createLayers()
            @_loadHeader()
            @_createCloseButton()
            @_moveToStartPosition()
            return

        # * Слои нужны, так как изображения загружаються асинхронно
        _._createLayers = ->
            @_contentLayer = new Sprite()
            @_headerLayer = new Sprite()
            @_closeButtonLayer = new Sprite()
            @addChild @_contentLayer
            @addChild @_headerLayer
            @addChild @_closeButtonLayer

        _._loadHeader = ->
            KDCore.Utils.loadImageAsync(@rootImageFolder(), "headerLine")
                .then(@_createHeader.bind(@))

        _._createHeader = (headerLineImage) ->
            w = @windowW - (@headerMarginX() * 2)
            @_headerSpr =
                new AA.Sprite_TilingLine(w, headerLineImage.height, headerLineImage)
            @_headerSpr.x = @headerMarginX()
            @_headerSpr.y = @headerMarginY()
            @_headerLayer.addChild @_headerSpr
            # * Сдвигаем контент, чтобы было начало под заголовком
            @_contentLayer.y += headerLineImage.height + @headerMarginY()
            return

        _._createCloseButton = ->
            @_closeButton = new KDCore.ButtonM("windowCloseButton", false, @rootImageFolder())
            @_closeButtonLayer.addChild @_closeButton
            @_closeButton.move @closeButtonPosition()
            @_closeButton.addClickHandler @_closeButtonClick.bind(@)
            return

        # * Наследники создают свои элементы в этом методе
        # * Есть специальный метод addContent()
        _._createContent = -> # * EMPTY


        return
    # -----------------------------------------------------------------------


    # * MOUSE
    # -----------------------------------------------------------------------
    do ->
        
        # * Определение если мышка в области окна
        _._registerMouseInOut = ->
            return unless @isOpen()
            if @isMouseIn()
                if @_mouseIn is false
                    @_mouseIn = true
                    @_onMouseIn()
            else
                if @_mouseIn is true
                    @_mouseIn = false
                    @_onMouseOut()
            return

        # * Используется похожая система что и в KDCore.ButtonM
        _._onMouseIn = ->
            $gameTemp.floatingWindowUnderMouse = @

        _._onMouseOut = ->
            if $gameTemp.floatingWindowUnderMouse == @
                $gameTemp.floatingWindowUnderMouse = null

        # * Будем проверять мышка ли в окне только при открытом окне
        _._createMouseCheckThread = ->
            @_mouseCheckThread = new KDCore.TimedUpdate(1, @_registerMouseInOut.bind(@))
            @_updateMouseCheckThread = => @_mouseCheckThread.update()
            @_mouseCheckThread.call()

        # * Когда окно закрывается, никаких проверок, обнуляем метод
        _._destroyMouseCheckThread = ->
            @_mouseCheckThread = null
            @_updateMouseCheckThread = ->

        #?DYNAMIC
        _._updateMouseCheckThread = -> # * EMPTY


        return
    # -----------------------------------------------------------------------


    # * OPEN OR CLOSE
    # -----------------------------------------------------------------------
    do ->
        
        _._open = ->
            @visible = true
            $gameTemp._floatingWindows.push(@)
            # * Окно, которое открывается, всегда снова выше остальных
            @mainParent?.addChild @
            @_createMouseCheckThread()

        _._afterOpen = -> # * EMPTY

        _._close = ->
            @visible = false
            @removeFromParent()
            $gameTemp._floatingWindows.delete(@)
            @_onMouseOut()
            @_destroyMouseCheckThread()

        _._afterClose = -> # * EMPTY


        return
    # -----------------------------------------------------------------------
    

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------


# * Если окно под курсором, нельзя нажимать на карте для движения игрока
do ->

    #@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map::isAnyButtonPressed
    Scene_Map::isAnyButtonPressed = ->
        if $gameTemp.floatingWindowUnderMouse?
            return true
        else
            return alias_SM_isAnyButtonPressed.call(@)

    return