# * Интерфейс AABS на карте

do ->

    class Spriteset_UI extends Sprite
        constructor: () ->
            super()
            @_init() ##Spriteset_UI_0
            @applyUserSettings() # * Применить настройки игрока

        isActive: -> @visible is true

        show: -> @visible = true

        hide: -> @visible = false

        terminate: -> @visible = false

        # * Обновить все контроллеры и элементы
        refresh: ->
            for controller in @controllers
                controller.refresh()

        onGameMessageStart: ->
            @getElementsWithMessageFlag().forEach (e) -> e.opacity = 50

        onGameMessageEnd: ->
            @getElementsWithMessageFlag().forEach (e) -> e.opacity = 255

        # * Применить пользовательские настройки ко всем элементам
        applyUserSettings: ->
            user = $gameSystem.aaGetUserUISettings()
            @_applyVisibility(user)
            for e in @elements
                ##Spriteset_UI_0
                @_applyUserSettingsFor(e, user) if user.isHaveFor e.tag
            return

        # * Обновить элемент (применить настройки)
        refreshElement: (tag) ->
            #TODO: Обновить контроллер
            element = @getElement(tag)
            return unless element?
            @_applyUserSettingsFor(element, $gameSystem.aaGetUserUISettings()) ##Spriteset_UI_0
            return

        # * Восстановить настройки элемента
        resetElement: (tag) ->
            element = @getElement(tag)
            return unless element?
            element.reset("position")
            element.reset("visible")
            return

        getElement: (tag) -> @elements.find (e) -> e.tag is tag

        # * Данный метод "собирает" один раз
        getElementsWithMessageFlag: ->
            unless @_elementsWithMessageFlag?
                @_elementsWithMessageFlag = @elements.filter (e) -> e.isHaveHideWithMessageFlag()
            return @_elementsWithMessageFlag

    AA.link Spriteset_UI
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Spriteset_UI::

            

    
    
    return
# ■ END PRIVATE
#---------------------------------------------------------------------------
