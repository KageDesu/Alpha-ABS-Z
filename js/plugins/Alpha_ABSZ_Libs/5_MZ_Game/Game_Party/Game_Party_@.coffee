#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #TODO: Пока только игрок может быть (АБС)
    #TODO: Добавить игнорирование членов группы с пустыми именами (частая ошибка новичков)
    #@[ALIAS]
    ALIAS__setupStartingMembers = _.setupStartingMembers
    _.setupStartingMembers = ->
        ALIAS__setupStartingMembers.call(@)
        @_actors = [@_actors.first()]
        return
    
    #@[ALIAS]
    ALIAS__gainItem = _.gainItem
    _.gainItem = (item, amount, includeEquip) ->
        ALIAS__gainItem.call(@, item, amount, includeEquip)
        #TODO: Пока так, но вообще это будет отдельный плагин
        if amount > 0 and @itemContainer(item)?
            @aaShowNotifyForItemGain(item, amount) if AA.PP.isShowItemGainNotify()
            @aaAddGainedItemToPanel(item, amount) if AA.PP.isAddNewItemOnPanelOnPickup()
        return

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------