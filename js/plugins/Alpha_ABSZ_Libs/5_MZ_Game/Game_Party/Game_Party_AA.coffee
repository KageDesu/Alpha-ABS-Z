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
    
    return
# ■ END Game_Party.coffee
#---------------------------------------------------------------------------