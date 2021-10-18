#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Party.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Party::

    #TODO: POP UP!

    # * Дать опыт всей группе (с учётом опций (разделение, для всех))
    # * isVisible == true -> Показать PopUp
    _.aaGainExpForParty = (value, isVisible = true) ->
        try
            #TODO: Пока что группы нету, реализацию оставлю на потом
            ###
            Опции:
            1) Только игрок
            2) Вся группа - одинаково
            3) Вся группа - разделить
            4) Кто убил
            ###
            @leader().gainExp(value)
            # * Не показывать если 0 опыта
            return if value == 0
            # * Не показывать, если флаг отключён
            return unless isVisible
            #TODO: Вынести этот код (НИЖЕ) отдельно куда-нибудь
            p = AA.PP.getExpPopUpSettings()
            # * Не показывать, если параметр плагина отключён
            return unless p.active
            if p.aboveChar is false
                char = $gameTemp.__aaExpGiver
            #TODO: Или кто-то из группы*
            char = $gamePlayer unless char?
            data =
                AADamagePopUpFactory.createExpPopUpData(value, char)
            return unless data?
            if p.bindToChar is true
                Sprite_AADamagePopUpItem.CreateOnCharacterBinded(char, data.settings, data.value)
            else
                Sprite_AADamagePopUpItem.CreateOnCharacter(char, data.settings, data.value)
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