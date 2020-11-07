#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #@[ALIAS]
    ALIAS__gainItem = _.gainItem
    _.gainItem = (item, amount, includeEquip) ->
        ALIAS__gainItem.call(@, ...arguments)
        return if amount <= 0
        container = @itemContainer(item)
        return unless container?
        #TODO: Менеджер PopUp Treasure
        SceneManager._scene._testPopUp()

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------