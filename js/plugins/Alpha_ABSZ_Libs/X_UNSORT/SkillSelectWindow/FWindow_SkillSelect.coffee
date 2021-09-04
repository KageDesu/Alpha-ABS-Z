class FWindow_SkillSelect extends AA.FloatingWindow
    constructor: () ->
        super(...arguments)

    # * Сдвинуть позицию окна с учётом позиции элемента Skills Panel
    moveRelativeSlotPosition: (x, y) ->
        #@x = x #3
        #@x = x - @width + 32 #4
        #@y = y - @height # 3 and 4
        return
        
    # * Подготовить окно и октрыть для элемента Skills Panel
    # * slotItem = Sprite_SKillPanelItem
    prepareAndOpenForSlot: (slotItem) ->
        { x, y, symbol } = slotItem
        # * Запоминаем символ, чтобы установить навык при выборе
        @_activeSlotSymbol = symbol
        @moveRelativeSlotPosition(x, y)
        @_prepareSkillList()
        @refreshSkillList()
        @open()
        return

    # * Создание списка навыков текущей группы
    refreshSkillList: ->

    # * Данное окно (выбор навыков и вещей) нельзя двигать
    #$[OVER]
    #isDraggable: -> false
    #TODO: или можно?


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ FWindow_SkillSelect.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = FWindow_SkillSelect::

    _._prepareSkillList = ->
        #TODO: Сброс короче всего (контента)
        
    
    return
# ■ END FWindow_SkillSelect.coffee
#---------------------------------------------------------------------------
