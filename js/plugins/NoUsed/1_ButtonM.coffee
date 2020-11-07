# * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

# * Принимает название файла изображения кнопки без _00
# * Названия изображения должны быть в стандартном формате _00, _01, [_03]
# * _02 - не используются в этом классе

# * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

# * Если isFull - true, значит нужен _03
class ButtonM extends KDCore.Sprite
    constructor: (filename, isFull = false, sourceFolder = null) ->
        super()
        @_bitmaps = []
        @_disabled = false
        @_isTriggered = false
        # * Когда произошло нажатие на кнопку
        @_handler = null
        @_loadBitmaps filename, isFull, sourceFolder
        @_setImageState 0
        @_createThread()

    isMouseIn: -> @inPosition TouchInput

    isActive: -> @visible is true

    isDisabled: -> @_disabled is true

    addClickHandler: -> (@_handler)

    clearClickHandler: -> @_handler = null

    isEnabled: -> !@isDisabled()

    disable: ->
        @_disabled = true
        @_setImageState 2

    enable: ->
        @_disabled = false
        @_setImageState 0

    click: ->
        do @_handler if @_handler?

    update: ->
        super()
        @hoverThread.update()
        @_updateMouseClick()
        return

        
#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ButtonM Implementation
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ButtonM::

    _._loadBitmaps = (filename, isFull = false, sourceFolder = null) ->
        getterFunc = @_getGetter(sourceFolder)
        @_bitmaps.push getterFunc(filename + '_00')
        @_bitmaps.push getterFunc(filename + '_01')
        @_bitmaps.push getterFunc(filename + '_03') if isFull
        return

    _._getGetter = (sourceFolder = null) ->
        getterFunc = (filename) ->
            ImageManager.loadPicture filename
        if sourceFolder != null
            getterFunc = (filename) ->
                ImageManager.loadBitmap 'img/' + sourceFolder + '/', filename
        return getterFunc

    _._setImageState = (index = 0) ->
        index = 0 unless @_bitmaps[index]?
        @bitmap = @_bitmaps[index]
        @_lastState = index
        return

    _._createThread = ->
        @hoverThread = new KDCore.TimedUpdate(3, @_updateHover.bind(@))
        @hoverThread.applyTimeRange -1, 1
        @hoverThread.call()
        return

    _._updateHover = ->
        return unless @isActive()
        return if @isDisabled()
        # * чтобы эффект нажатия не прекратить
        return if @_isTriggered == true
        if @isMouseIn()
            if @_lastState != 1
                @_setImageState 1
                $gameTemp.kdButtonUnderMouse = @
        else
            if @_lastState != 0
                @_setImageState 0
                if $gameTemp.kdButtonUnderMouse == @
                    $gameTemp.kdButtonUnderMouse = null
        return

    _._updateMouseClick = ->
        return unless @isActive()
        return if @isDisabled()
        if TouchInput.isTriggered() and @isMouseIn()
            @_isTriggered = true
            @_setImageState 0
        if @_isTriggered == true
            if TouchInput.isReleased()
                @_isTriggered = false
                @click()
        return

    # * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте
    #@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map::isAnyButtonPressed
    Scene_Map::isAnyButtonPressed = ->
        if $gameTemp.kdButtonUnderMouse?
            return true
        else
            return alias_SM_isAnyButtonPressed.call(@)

    return
# ■ END ButtonM Implementation
#---------------------------------------------------------------------------