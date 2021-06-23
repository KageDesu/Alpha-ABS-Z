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
            if @aaIsABSEventPage()
                @_initMembersABS()
            else
                #TODO: Проверка, если был Entity, но теперь нету

        _.aaIsABSEventPage = ->
            return false unless @page()?
            # * Для сохранения производительности, сперва просто смотрим есть ли ABS комментарий
            ABSComment = KDCore.Utils.getEventCommentValue("ABS", @list())
            if ABSComment?
                # * Дополнительная проверка, что указан правильный ID
                enemyId = AA.Utils.Parser.getABSEnemyId(ABSComment)
                if enemyId > 0
                    if AA.Utils.Guard.isProperEnemyIdForABSEvent(enemyId)
                        @aaEventSettings = new AA.AAEventSettingsParser(@list())
                        #console.info @aaEventSettings
                        return true
                    else
                        AA.w "Enemy ID " + enemyId + " not exists in DB or not have a name"
                else
                    AA.w "Can't read Enemy ID from <ABS> comment for event " + @eventId()
            return false

        _._initMembersABS = ->
            @aaEntity = new AAEnemyEntity(@eventId())
            return

        return
    # -----------------------------------------------------------------------
    
    #TODO: СБРОС ЦЕЛИ
    #TODO: ОФФСЕТ ДЛЯ ВЫБОРА
    #TODO: МИНИ ХП БАР
    # Также добавить управление ним во время игры (один из трёх типов)


    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------