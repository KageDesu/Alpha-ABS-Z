class FWindow_SkillSelect extends AA.FloatingWindow
    constructor: () ->
        super(...arguments)

    getSettings: -> # TODO: implement

    # * Сдвинуть позицию окна с учётом позиции элемента Skills Panel
    moveRelativeSlotPosition: (x, y) ->
        # Screen sectors
        # 1 | 2
        # 3 | 4
        # ==============

        sector = 1
        w2 = Graphics.width / 2
        h2 = Graphics.height / 2
        
        # * Определяем сектор экрана, на котромнаходится элемент
        if x < w2
            if y < h2
                sector = 1
            else
                sector = 3
        else
            if y < h2
                sector = 2
            else
                sector = 4
        
        # * Настраиваем позиции в зависимости от секторов
        if sector == 3 || sector == 1
            @x = x
        if sector == 2 || sector == 4
            @x = x - @width + 32 #TODO: margins from settings
        
        if sector >= 3
            @y = y - @height
        else
            @y = y + 32 + 2
        return
        
    # * Подготовить окно и октрыть для элемента Skills Panel
    # * slotItem = Sprite_SKillPanelItem
    prepareAndOpenForSlot: (slotItem) ->
        { x, y, symbol } = slotItem
        @moveRelativeSlotPosition(x, y)
        # * Тут всегда категория 0 по умолчанию
        @refreshSkillList(0, symbol)
        @open()
        return

    # * Создание списка навыков для группы
    # * Этот метод вызывается когда окно открывается для слота
    refreshSkillList: (category, symbol) ->
        return unless @skillsList?
        # * Запоминаем символ, чтобы установить навык при выборе
        @skillsList.setSymbol(symbol)
        # * При смене категории список формируется (т.е. refresh)
        @changeCategory(0)
        return

    changeCategory: (category) ->
        try
            @_refreshCategoryButtons(category)
            @_refreshHeader(category)
            @skillsList.setCategory(category)
        catch e
            AA.w e

    # * Данное окно (выбор навыков и вещей) нельзя двигать
    #$[OVER]
    #isDraggable: -> false
    #TODO: или можно?

    update: ->
        super()
        @_updateSkillSelectClick()


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ FWindow_SkillSelect.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = FWindow_SkillSelect::

    #$[OVER]
    _._createCustomElements = ->
        @_createCategoriesButtons()
        @_createCategoriesHeader()
        @_refreshCategoryButtons(0)
        @_createSkillsList()
        return

    _._createCategoriesButtons = ->
        #TODO: from settings
        @buttonCat0 = new KDCore.ButtonM("Button_SkSSkillsGroup", true, "Alpha")
        @buttonCat0.addClickHandler () => @changeCategory(0)
        @buttonCat0.move 26, 6
        @addContent @buttonCat0

        @buttonCat1 = new KDCore.ButtonM("Button_SkSItemsGroup", true, "Alpha")
        @buttonCat1.addClickHandler () => @changeCategory(1)
        @buttonCat1.move @buttonCat0.x + 60, @buttonCat0.y
        @addContent @buttonCat1

        return

    _._createCategoriesHeader = ->
        #TODO: from parameters
        p = {
            visible: true,
            size: { w: 160, h: 28 }
            alignment: "center"
            font: {
                face: "AABS_0",
                size: 14,
                italic: false
            },
            margins: { x: 0, y: 0 },
            outline: { color: null, width: 2 }
            textColor: "#FFFFFF".toCss()
        }
        @headerText = new AA.Sprite_UIText(p)
        # * Добавляем на Header (поверх всего)
        @addChild @headerText
        return

    _._createSkillsList = ->
        #TODO: from settings
        @skillsList = new Window_SkillSelectorList(new Rectangle(0, 50, @width, @height - 80))
        @addContent @skillsList
        
    _._updateSkillSelectClick = ->
        return unless @isOpen()
        if TouchInput.isTriggered() && @isMouseIn()
            @skillsList?.onClick()
        return
    
    _._refreshCategoryButtons = (newCategory) ->
        @buttonCat0.disable()
        @buttonCat1.disable()
        if newCategory == 0
            @buttonCat1.enable()
        else
            @buttonCat0.enable()
        return

    _._refreshHeader = (category) ->
        if category == 0
            @headerText.draw("SKILLS")
        else
            @headerText.draw("ITEMS")
        return

    return
# ■ END FWindow_SkillSelect.coffee
#---------------------------------------------------------------------------





# Когда в фокусе (мышка в зоне окна) - прокрутка колесом мышки

# Элемент - (Кнопка на которой (иконка + текст))
# Сделать через Window_Selectable ??? - урезанный, контроль только через это окно и мышку

