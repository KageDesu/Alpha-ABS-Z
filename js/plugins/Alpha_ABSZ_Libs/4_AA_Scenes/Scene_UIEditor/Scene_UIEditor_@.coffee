# * Сцена игрового визуального редактора интерфейса
do ->
    class Scene_UIEditor extends Scene_Base
        constructor: () ->
            super()
            @elementUnderMouse = null
            @isDrag = false
            @preEditElementsStates = []
            return

        create: ->
            super()
            # * Запоминаем состояние АБС, так как надо его ставить на паузу
            $gameTemp._needRestoreABSSystemAfterUIEdit = AA.System.isABS()
            AA.System.stopABS()
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
                # * Тут проверяется по флагу visible, а не isActive
                @transparentElement(e) unless e.visible
            return

        deactivateElement: (element) ->
            # * Сохраняем значения перед редактированием
            @preEditElementsStates.push([element, element.visible, element.opacity])
            element.opacity = 150
            element.desaturate()
            return

        transparentElement: (element) ->
            @preEditElementsStates.push([element, element.visible, element.opacity])
            element.visible = true
            element.opacity = 120
            return

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

        stop: ->
            super()
            if $gameTemp._needRestoreABSSystemAfterUIEdit is true
                AA.System.resumeABS()
            # * Восстанавливаем прозрачность и видимость которые были перед редактированием
            for elementData in @preEditElementsStates
                elementData[0].visible = elementData[1]
                elementData[0].opacity = elementData[2]
            return

    AA.link Scene_UIEditor
    return
