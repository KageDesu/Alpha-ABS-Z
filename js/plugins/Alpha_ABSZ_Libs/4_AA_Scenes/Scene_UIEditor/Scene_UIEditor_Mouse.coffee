#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_UIEditor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Scene_UIEditor::

    _.updateMain = ->
        @updateMouse()
        @updateXYText()
    
    _.updateMouse = ->
        @xGrid.visible = false
        if @isDrag is true
            @updateDragEnd()
            @updateMouseDrag()
        else
            @updateMouseHover()
            @updateDragStart()

    _.updateMouseHover = ->
        @elementUnderMouse = null
        underMouse = @elements().filter (e) -> e.isUnderMouse()
        return if underMouse.isEmpty()
        @elementUnderMouse = underMouse.last()

    _.updateDragStart = ->
        return unless @elementUnderMouse?
        return unless @elementUnderMouse.isCanBeEdited()
        if TouchInput.isPressed()
            @isDrag = true
            @_lastElementPosition = @elementUnderMouse.toPoint()
            # * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
            @_deltaXY = @getDeltaXY()
        return

    _.getDeltaXY = ->
        { x , y } = @elementUnderMouse
        dx = TouchInput.x - x
        dy = TouchInput.y - y
        return new KDCore.Point(dx, dy)

    _.updateMouseDrag = ->
        # * Проверка, есть ли элемент
        @elementUnderMouse.move TouchInput.x - @_deltaXY.x, TouchInput.y - @_deltaXY.y
        if Input.isPressed('shift')
            @applyMargin(2)
        else if Input.isPressed('control')
            @applyMargin(10)
            @xGrid.visible = true
        if TouchInput.isCancelled()
            @resetAfterDrag()
        return

    # * Применить "привязывание" к координатам
    _.applyMargin = (delta) ->
        { x, y } = @elementUnderMouse
        x += 1 while x % delta isnt 0
        y += 1 while y % delta isnt 0
        @elementUnderMouse.move x, y

    _.resetAfterDrag = ->
        @isDrag = false
        TouchInput.clear()
        @elementUnderMouse.move @_lastElementPosition
    
    _.updateDragEnd = ->
        if TouchInput.isReleased()
            @isDrag = false
            @saveElementPosition(@elementUnderMouse) ## -> @
            return

    _.updateXYText = ->
        fillColor = "#C0C0C0".toCss()
        @tagText.visible = false
        if @elementUnderMouse?
            # * Показываем координаты элемента
            t = @getXYTextFormat @elementUnderMouse
            if @isDrag is true
                fillColor = "#008040".toCss()
            else
                if @elementUnderMouse.isCanBeEdited()
                    fillColor = "#008080".toCss()
                else
                    fillColor = "#FF8080".toCss()
                @tagText.draw @elementUnderMouse.tag
                @tagText.visible = true
        else
            t = @getXYTextFormat TouchInput
        @xyText.fill fillColor
        @xyText.draw t
        @moveXYTextHelp()

    _.moveXYTextHelp = ->
        @xyText.move TouchInput.x + 16, TouchInput.y + 16
        @tagText.move @xyText.x - 20, @xyText.y + @xyText.realHeight()

        # * Если слишком низки (за экран выходит)
        if @tagText.y + @tagText.realHeight() > Graphics.height
            @xyText.y = TouchInput.y - 16 - @xyText.realHeight()
            @tagText.y = @xyText.y + @xyText.realHeight()
        return

    _.getXYTextFormat = (point) ->
        { x , y } = point
        "X:" + x + " ; Y:" + y

    return
# ■ END Scene_UIEditor.coffee
#---------------------------------------------------------------------------