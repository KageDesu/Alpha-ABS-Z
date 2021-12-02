#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #@[ALIAS]
    ALIAS__removeActor = _.removeActor
    _.removeActor = ->
        ALIAS__removeActor.call(@, ...arguments)
        AA.System.checkABSPlayerExists() unless $gameParty.leader()?
        return

    #@[ALIAS]
    ALIAS__addActor = _.addActor
    _.addActor = ->
        # * Если НЕ сетевая игра, то нельзя добавить больше одного члена партии
        #TODO: Временное решение
        if !AA.Network.isNetworkGame() and $gameParty.leader()?
            AA.w("In Alpha ABS Z " + AA.Version / 100 + " you can't add more than one party member")
            return
        ALIAS__addActor.call(@, ...arguments)
        # * Если игрока не было, но появился
        if $gameTemp._noABSPlayer is true and $gameParty.leader()?
            AA.System.checkABSPlayerExists()
        return

    #TODO: Пока только игрок может быть (АБС)
    #TODO: Добавить игнорирование членов группы с пустыми именами (частая ошибка новичков)
    #@[ALIAS]
    ALIAS__setupStartingMembers = _.setupStartingMembers
    _.setupStartingMembers = ->
        ALIAS__setupStartingMembers.call(@)
        @_actors = [@_actors.first()] if @_actors.length > 0
        return
    
    #@[ALIAS]
    ALIAS__gainItem = _.gainItem
    _.gainItem = (item, amount, includeEquip) ->
        ALIAS__gainItem.call(@, item, amount, includeEquip)
        #TODO: Пока так, но вообще это будет отдельный плагин
        if amount > 0 and @itemContainer(item)?
            $gameTemp._pLastItemGainedToParty = [item, amount]
        else
            $gameTemp._pLastItemGainedToParty = null
        return

    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------