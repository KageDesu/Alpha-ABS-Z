#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_UI.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Spriteset_UI::

    _._init = ->
        # * Регестрирует себя в менеджере
        AA.UI.setUI @
        # * Набор всех элементов
        @elements = []
        # * Набор всех контроллеров
        @controllers = []
        # * Набор всех компонентов
        @uiSets = []
        #TODO: Загрузка всех компонентов из параметров и подготовка
        @_create()

    # * Дополнительное закрытие элементов (перед закрытием всего UI)
    _._terminateElements = ->
        @_terminateSkillSelectorWindow() ##Spriteset_UI_SkillsSet

    # * Получить все элементы
    # * Обновить элемент по тэгу
    # * (возможно) Обновить все элементы
    # * Получить элемент по тэгу

    _._create = ->
        @_createLowerUILayer()
        @_createNormalUILayer()
        @_createElements()

    # * Нижний слой нужен для пользовательских UI элементов, которые должны быть ниже UI
    _._createLowerUILayer = ->
        @lowerLayer = new Sprite()
        @addChild @lowerLayer

    _._createNormalUILayer = ->
        @layer = new Sprite()
        @addChild @layer

    _._createElements = ->
        @_createDefaultElements()
        #@_createUserElements()

    _._createDefaultElements = ->
        @_createSkillsSet() ##Spriteset_UI_SkillsSet
        @_createSkillSelectorWindow() ##Spriteset_UI_SkillsSet
        @_createActorUI() ##Spriteset_UI_ActorUI
        @_createTargetUI() ##Spriteset_UI_Target

    # * Добавить набор и зарегестрировать все элементы и контроллеры из набора
    _._registerUISet = (uiSet) ->
        @elements.push ...uiSet.elements
        @controllers.push ...uiSet.controllers
        @uiSets.push uiSet
        @_addElementToUI uiSet
        return

    # * Добавить элемент на обычный слой (выше пользовательских)
    _._addElementToUI = (sprite) -> @layer.addChild sprite

    # * Применить пользовательские настройки к элементу
    _._applyUserSettingsFor = (element, settings) ->
        key = element.tag
        pos = settings.getPositionFor(key)
        if pos?
            element.move pos.x, pos.y
        else
            element.reset("position")
        visible = settings.getVisibleFor(key)
        if visible?
            element.visible = visible
        else
            element.reset("visible")
        return
    
    # * Обновить видимость всего UI
    _._applyVisibility = (settings) ->
        unless settings.isHaveFor("main")
            @show() # * По стандарту, всегда видно
            return
        visible = settings.getVisibleFor("main")
        if visible?
            if visible is true then @show() else @hide()
        else
            @show() # * По стандарту, всегда видно

    return
# ■ END Spriteset_UI.coffee
#---------------------------------------------------------------------------