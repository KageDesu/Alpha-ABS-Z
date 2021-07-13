# * Класс ячейки быстрого доступа для АБС навыка (предмета)
#rev 07.07.21
do ->

    class Sprite_SKillPanelItem extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        # * Позиция не определяется, так как каждый элемент имеет свою позицию
        defaultParams: -> {
            visible: true
            isCanBeEdited: true,
            isHideWithMessage: true,
            outlineMargins: { x: -2, y: -2 }
            iconMargins: { x: 2, y: 2 }
            outlinePulseSpeed: 40
            selectedOutlineColor: "#fcba03"
            clickedOutlineColor: "#0b03fc"
            readyOutlineColor: "#21b53c"
            badOutlineColor: "#d61a1a"
            icon: {
                visible: true
                size: 32
                index: 0
            }
            symbolText: {
                visible: true
                size: { w: 20, h: 20 }
                alignment: "right"
                font: { face: "AABS_1", size: 14, italic: false }
                margins: { x: 18, y: 22 }
                outline: { color: null, width: 2 }
                textColor: "#e0cfbf".toCss()
            }
            timeText: {
                visible: true
                size: { w: 32, h: 32 }
                alignment: "center"
                font: { face: "AABS_1", size: 12, italic: false }
                margins: { x: 2, y: 2 }
                outline: { color: null, width: 2 }
                textColor: "#fcba03".toCss()
            }
        }

        #$[OVER]
        isCanBeEdited: -> @params.isCanBeEdited is true

        #$[OVER]
        isHaveHideWithMessageFlag: -> @params.isHideWithMessage is true

        #$[OVER]
        isUnderMouse: -> @button.isUnderMouse()

        pulseClick: -> @notifyOutline.pulse(@_clickedColor, @params.outlinePulseSpeed)

        pulseReady: -> @notifyOutline.pulse(@_readyColor, @params.outlinePulseSpeed)

        pulseAlert: -> @notifyOutline.pulse(@_badColor, @params.outlinePulseSpeed)

        hideOutline: -> @notifyOutline.hide()
        
        select: -> @selectionOutline.show(@_selectionColor)

        deselect: -> @selectionOutline.hide()

        clear: () ->
            @enable()
            @drawIcon(0)
            @drawCount("")
            @drawTime("")
            #@disable() #??? or @enable()
            #TODO: hide if option

        drawIcon: () -> @icon.draw(...arguments)

        drawSymbol: () -> @text.draw(...arguments)

        drawCount: () -> #@countText.draw(...arguments)

        drawTime: () -> @timeText.draw(...arguments)

        disable: () ->
            @button.disable()
            @state.visible = true
            return

        enable: () ->
            @button.enable()
            @state.visible = false
            return

        switchState: (isEnabled) ->
            if isEnabled is true
                if @isDisabled()
                    @enable()
                    return true # * Вновь доступна
            else
                @disable() unless @isDisabled()
            return false

        isDisabled: -> @state.visible is true
            
    AA.link Sprite_SKillPanelItem
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SKillPanelItem::

    _._createContent = ->
        @_initColors()
        @_createOutline()
        @_createMain()
        @_createIcon()
        #@_createImage() #TODO: if item have image instead icon
        # * Disabled darker hover image
        @_createState()
        @_createInfo()
        return

    _._initColors = ->
        @_tryConvertColor("_selectionColor", "selectedOutlineColor")
        @_tryConvertColor("_clickedColor", "clickedOutlineColor")
        @_tryConvertColor("_readyColor", "readyOutlineColor")
        @_tryConvertColor("_badColor", "badOutlineColor")
        return
        
    _._tryConvertColor = (colorFieldName, paramName) ->
        try
            @[colorFieldName] = KDCore.Color.FromHex(@params[paramName]).ARR
        catch e
            AA.w e
            @[colorFieldName] = [0, 0, 0, 1]
        return

    _._createOutline = ->
        @notifyOutline = new AA.Sprite_SkillPanelOutline()
        @notifyOutline.move @params.outlineMargins
        @add @notifyOutline
        @selectionOutline = new AA.Sprite_SkillPanelOutline()
        @selectionOutline.move @params.outlineMargins
        @add @selectionOutline
        return
    
    _._createMain = ->
        @button = new KDCore.ButtonM("SkillSlot", false, "Alpha")
        @button.addClickHandler () =>
            $gamePlayer.aaTryPerformSkill(@skillId)
        @add @button

    _._createIcon = ->
        @icon = new AA.Sprite_UIIcon(@params.icon)
        @icon.move @params.iconMargins
        @add @icon

    _._createState = ->
        @state = new AA.Sprite_UIImage()
        @state.draw("SkillSlot_Disabled")
        @state.visible = false
        @add @state

    _._createInfo = ->
        @_createTimer()
        #@_createCountText #TODO: count text for items
        @_createSymbolText()

    _._createTimer = ->
        @timeText = new AA.Sprite_UIText(@params.timeText)
        @add @timeText

    _._createSymbolText = ->
        @text = new AA.Sprite_UIText(@params.symbolText)
        @add @text


    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------