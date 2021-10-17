#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #TODO: POP UP!

    #TODO: Pop Up по опыту: текст какой (через format), стиль, опция на ком: игрок, враг (прикреплён к экрану или к персонажу)

    # * Дать опыт всей группе (с учётом опций (разделение, для всех))
    # * isVisible == true -> Показать PopUp
    _.aaGainExpForParty = (value, isVisible = true) ->
        try
            #TODO: POP UP if isVisible = true
            console.log("EXP value " + value)
            #TODO: Пока что группы нету, реализацию оставлю на потом
            ###
            Опции:
            1) Только игрок
            2) Вся группа - одинаково
            3) Вся группа - разделить
            4) Кто убил
            ###
            @leader().gainExp(value)
        catch e
            AA.w e
        return

    _.aaAddGainedItemToPanel = (item, count) ->
        return unless AA.Utils.isAAObject(item)
        # * Новый предмет (т.е. раньше не было)
        if @numItems(item) == count
            # * Тут надо использовать idA
            unless $gamePlayer.aaSkillsSet.isHaveItemOnPanel(item.idA)
                # * Тут используется обычный ID (так как конвертируется в методе)
                uAPI.setItemToPanel(item.id)
        return

    #TODO: Добавить ещё проверку флага, чтобы пропускать Notify, например когда с инвентаря снимаем вещь
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
    
    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------