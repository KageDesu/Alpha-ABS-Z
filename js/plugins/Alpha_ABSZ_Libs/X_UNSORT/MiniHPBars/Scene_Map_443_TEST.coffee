#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        ALIAS__onMapLoaded.call(@)

        item = new AA.Sprite_SKillPanelItem()
        item.move 50, 50
        @addChild item

        item.drawIcon(97)
        item.drawSymbol("1")
        item.disable()

        setTimeout (->
                item.pulseClick()
            ), 1000



        item2 = new AA.Sprite_SKillPanelItem()
        item2.move 90, 50
        @addChild item2

        item2.drawIcon(98)
        item2.drawSymbol("2")
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------