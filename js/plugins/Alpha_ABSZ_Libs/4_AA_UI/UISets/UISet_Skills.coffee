# * Класс хранит все ячейки навыков (предметов) на интерфейсе

do ->

    # * В качестве аргумента получает класс интерфейса

    class UISet_Skills extends Sprite
        constructor: () ->
            super()
            @controllers = []
            @elements = []
            @_create()
            @refresh()

        refresh: ->
            try
                
            catch e
                AA.warning e

        update: ->
            super()
            c.update() for c in @controllers
    
    AA.link UISet_Skills
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.UISet_Skills::

    _._create = ->
        for item in AA.PP.getUISkillsItems()
            @_createSkillItem(item) if item?
        @_createController()
        return

    _._createSkillItem = (itemSettings) ->
        try
            #TODO: p = AA.PP.uiData(tag)
            skillItem = new AA.Sprite_SKillPanelItem() #parametri from p
            skillItem.tag = "skillItem_" + itemSettings.symbol
            skillItem.move itemSettings.position
            skillItem.drawSymbol(itemSettings.symbol)
            skillItem.symbol = itemSettings.symbol
        catch e
            AA.w e
            skillItem = null
        return unless skillItem?
        @addChild skillItem
        @elements.push(skillItem)
        return

    _._createController = ->
        skillsCnt = new UISkillsItemsController(@elements)
        @controllers.push skillsCnt
        return

    return
# ■ END PRIVATE
#---------------------------------------------------------------------------