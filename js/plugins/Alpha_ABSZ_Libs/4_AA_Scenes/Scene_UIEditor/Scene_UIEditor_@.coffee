# * Сцена игрового визуального редактора интерфейса
do ->
    class Scene_UIEditor extends Scene_Base
        constructor: () ->
            super()
            @elementUnderMouse = null
            @isDrag = false

        create: ->
            super()
            @createMain() ## -> 0
            #TODO: Добавить опцию (Показывать ли скрытые в редактре...)
            @showNotVisibleElements()
            #TODO: Добавить опцию (параметр  Показывать ли..)
            @showNotEditableElements()

        # * Элементы, которые нельзя редактировать, мы отмечаем (блюр)
        showNotEditableElements: ->
            for e in @elements()
                @deactivateElement(e) unless e.isCanBeEdited()
            return

        # * Элемнты, которые скрыты, мы показываем прозрачными
        showNotVisibleElements: ->
            for e in @elements()
                @transparentElement(e) unless e.isActive()
            return

        deactivateElement: (element) ->
            element.desaturate()
            element.opacity = 150

        transparentElement: (element) ->
            element.visible = true
            element.opacity = 120

        # * Сбросить значения по умолчанию
        resetElement: (element) ->
            element.reset("position")
            user = $gameSystem.aaGetUserUISettings()
            user.set element.tag, "resetPosition"

        # * Сохранить позицию элемента
        saveElementPosition: (element) ->
            user = $gameSystem.aaGetUserUISettings()
            { x, y } = element
            user.set element.tag, "setPosition", [x, y]
            return

        elements: -> @uiSpriteset.elements

        #TODO: Добавить кнопка H - скрыть\показать или скрыть \ показать последний (если не на элементе курсор)
        # Например стоит опция не показывать скрытые

        #TODO: Параметр плагина - OFF, Всегда, Только в режиме разработки

        #TODO: Кнопка - Сбросить до последний позиции???

        update: ->
            super()
            @updateMain() ## -> Mouse
            @updateExit()
            # * Обновляем пользовательское управление (если не Drag)
            @updateInput() unless @isDrag

        updateExit: ->
            @popScene() if Input.isCancel()

        updateInput: ->
            # * Сброс позиции по умолчанию
            if Input.isTriggered('r')
                if @elementUnderMouse?
                    @resetElement(@elementUnderMouse)
            return

    AA.link Scene_UIEditor
    return
