#TODO: переместить в A_CORE или KDCOre

#TODO: см метод hitIndex в Window_Selectable - Там конверт глобал координат в локальные простой


# * Ищет элемент, у которого поле ID == id
Array::getById = (id) -> @getByField('id', id)

# * Ищет элемент, у которого поле FIELD (имя поля) == value
Array::getByField = (field, value) ->
    try
        return @find((item) -> item[field] == value)
    catch e
        console.warn(e)
        return null

KDCore.Utils.getEventCommentValueArray = (commentCode, list) ->
    try
        comments = []
        if list and list.length > 1
            i = 0
            while i < list.length
                item = list[i++]
                if !item
                    continue
                if item.code == 108
                    comment = item.parameters[0]
                    if comment.contains(commentCode)
                        comments.push(comment)
    catch e
        console.warn e
    return comments

# * Расширение, чтобы без XDev работал плагин
do ->

    __STR_P = String::p
    String::p = (anotherText) ->
        if AA.isDEV()
            __STR_P.call(@, anotherText)
        else
            # * NOTHING
        return

    return

# * Draggable sprite
#? KDCore.Sprite extension
do ->

    _ = KDCore.Sprite::

    _.setDraggable = (@_isDragActive) ->
        if @_isDragActive is true
            @_updateDragging = @_updateDraggingActive
        else
            @resetDrag() if @isDragging()
            @_updateDragging = () -> # * EMPTY

    _.isDraggable = -> @_isDragActive is true

    _.activateDrag = ->
        $gameTemp._kdDragSprite = @
        @_dragging = true
        @_lastTouchPosition = TouchInput.toPoint()
        @_deltaXY = @toPoint().delta(@_lastTouchPosition)
        do @dragStartHandler if @dragStartHandler?

    _.resetDrag = ->
        @_dragging = false
        unless @_lastTouchPosition.isSame(TouchInput.toPoint())
            do @dragEndHandler if @dragEndHandler?
        if $gameTemp._kdDragSprite is @
            $gameTemp._kdDragSprite = null
        @_lastTouchPosition = null
        return

    _.isDragging = -> @_dragging is true

    _.setOnDragEnd = (@dragEndHandler) ->

    _.setOnDragStart = (@dragStartHandler) ->

    _.setOnDrag = (@dragProcessHandler) ->

    _.isCanStartDragging = -> true

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @_updateDragging()

    #?DYNAMIC
    _._updateDragging = -> # * DUMMY

    _._updateDraggingActive = ->
        if @isDragging()
            @_updateDraggingProcess()
        else
            return if $gameTemp._kdDragSprite?
            if TouchInput.isPressed() and @isCanStartDragging()
                @activateDrag() if @isUnderMouse()
    
    _._updateDraggingProcess = ->
        if TouchInput.isPressed()
            return unless KDCore.Utils.isPointInScreen(TouchInput)
            @move TouchInput.x - @_deltaXY.x, TouchInput.y - @_deltaXY.y
            do @dragProcessHandler if @dragProcessHandler?
        else
            @resetDrag()

    return

