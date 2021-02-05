#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    # * Система AAEntity
    # -----------------------------------------------------------------------
    do ->

        _.aaCheckABSEventState = ->
            #TODO: Проверка, если был Entity, но теперь нету
            if @aaIsABSEventPage()
                @_initMembersABS()

        #TODO: read comment from Page or comment block
        _.aaIsABSEventPage = -> #[2, 3, 4].contains(@eventId())
            list = @list()
            console.info list
            # * Для сохранения производительности, сперва просто смотрим есть ли ABS комментарий
            isHaveABSComment = KDCore.Utils.getEventCommentValue("ABS", list)
            console.info(enemyId)
            if isHaveABSComment?
                "ABS EVENT FINDED".p()
                # * Если есть, создаём Parser и считываем настройки
                _P = new AA.AAEventSettingsParser(list)
                enemyId = _P.getABSEventId()
                if enemyId > 0
                    "ABS ENEMY ID".p(enemyId)
                    #TODO: Остановился тут, передача параметров на модель
                    return true
                else
                    AA.w "Can't read Enemy ID from <ABS> comment for event " + @eventId()
            return false

        _._initMembersABS = ->
            @aaEntity = new AAEnemyEntity(@eventId())
            @initABS()

        return
    # -----------------------------------------------------------------------
    
    #TODO: СБРОС ЦЕЛИ
    #TODO: ОФФСЕТ ДЛЯ ВЫБОРА
    #TODO: МИНИ ХП БАР
    # Также добавить управление ним во время игры (один из трёх типов)

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------