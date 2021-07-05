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
    
    # * Основная логика АБС
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__isActive = _.isActive
        _.isActive = -> ALIAS__isActive.call(@) && !@_erased

        # * Этот метод работает только когда АБС активна
        #@[ALIAS]
        ALIAS__aaUpdate = _.aaUpdate
        _.aaUpdate = ->
            ALIAS__aaUpdate.call(@)
            return unless @isABS()
            @_aaUpdateDeadState()

        #@[ALIAS]
        ALIAS__aaOnShatterEffectCreated = _.aaOnShatterEffectCreated
        _.aaOnShatterEffectCreated = ->
            ALIAS__aaOnShatterEffectCreated.call(@)
            @aaOnDeath()
            return

        #ss, sw, vr, ce, ap
        #TODO: Придумать общую схему для действий <onDeath:action_ap:viewRadius:22>

        #@[ALIAS]
        ALIAS__aaOnDeath = _.aaOnDeath
        _.aaOnDeath = ->
            ALIAS__aaOnDeath.call(@)
            @erase() #if not self switch
            #TODO: start shatter effect (if model parameter is ON)
            #TODO: start xAnimaDead ???
            #TODO: switch IF have - it's same as action but shortcut
            #TODO: commonEvent if have - it's same as action but shortcut
            #TODO: action if have - sw, var, ss, ce
            return

        #@[ALIAS]
        ALIAS__aaOnActionOnMe = _.aaOnActionOnMe
        _.aaOnActionOnMe = ->
            ALIAS__aaOnActionOnMe.call(@)
            result = @AABattler().result()
            return unless result?
            #TODO: Может только если HP damage?
            if result.isHit()
                #TODO: model paramter or skill parameter (shake str)
                @aaRequestShakeEffect()
            return

        _._aaUpdateDeadState = ->
            if @isActive() and !@AABattler().isAlive()
                "DEAD".p()
                # * Отключаем АБС для этого события
                @AAEntity().stopABS()
                #TODO: start shatter effect (if model parameter and not xAnimaDead)
                @aaRequestShatterEffect()
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