#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    _.aaShowNotifyForItemGain = (item, count) ->
        try
            return unless KDCore.Utils.isSceneMap()
            return if count <= 0
            return unless item?
            popUpItem = new AA.Sprite_PopTreasureItem()
            popUpItem.setItem item, count
            char = $gamePlayer.AASprite()
            return unless char?
            # * Если нету, создаём
            unless char.aaTreasurePopEngine?
                char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem)
            # * Если есть, но закончился, то пересоздаём
            else if char.aaTreasurePopEngine.isEmtpy()
                char.aaTreasurePopEngine.stop()
                char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem)
        catch e
            AA.w e
    
    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------