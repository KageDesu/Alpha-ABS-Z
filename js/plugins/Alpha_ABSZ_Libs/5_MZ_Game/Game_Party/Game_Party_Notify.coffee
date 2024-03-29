#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    # * Отдельный метод, для проверок условий в плагине или дочерних плагинах (например AA.PP.isShowItemGainNotify())
    _.pIsCanShowItemNotify = -> AA.PP.isShowItemGainNotify()

    _.pOnSomeItemBeenGained = ->
        return unless @pIsCanShowItemNotify()
        try
            return unless $gameTemp._pLastItemGainedToParty?
            return unless $gameTemp._pLastItemGainedToParty[0]?
            return if $gameTemp._pLastItemGainedToParty[1] <= 0
            @aaShowNotifyForItemGain(...$gameTemp._pLastItemGainedToParty)
            #TODO: Это временно тут
            if AA.PP.isAddNewItemOnPanelOnPickup()
                @aaAddGainedItemToPanel(...$gameTemp._pLastItemGainedToParty)
            #TODO: Занулять $gameTemp._pLastItemGainedToParty ?
        catch e
            KDCore.warning e

    _.aaShowNotifyForItemGain = (item, count) ->
        try
            return unless KDCore.Utils.isSceneMap()
            return if count <= 0
            return unless item?
            # * Специальный флаг, чтобы скрыть Notify
            # * Этот флаг использует Map Inventory (когда снимаешь предмет)
            return if $gameTemp.aaNotNeedItemPopUpNotify is true
            popUpItem = new AA.Sprite_PopTreasureItem()
            popUpItem.setItem item, count
            char = $gamePlayer.AASprite()
            #TODO: Сделать проверку на предыидущий предмет, если сразу одинаковый, то х2
            #TODO: Звук какой-нибудь когда вещь поднимаешь!
            return unless char?
            # * Если нету, создаём
            unless char.aaTreasurePopEngine?
                char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem)
            # * Если есть, но закончился, то пересоздаём
            else if char.aaTreasurePopEngine.isEmtpy()
                char.aaTreasurePopEngine.stop()
                char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem)
            else # * Добавляем
                char.aaTreasurePopEngine.addItem(popUpItem)
        catch e
            AA.w e

    _.aaAddGainedItemToPanel = (item, count) ->
        return unless AA.Utils.isAAObject(item)
        # * Новый предмет (т.е. раньше не было)
        if @numItems(item) == count
            # * Тут надо использовать idA
            unless $gamePlayer.aaSkillsSet.isHaveItemOnPanel(item.idA)
                # * Тут используется обычный ID (так как конвертируется в методе)
                uAPI.setItemToPanel(item.id)
        return
    
    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------