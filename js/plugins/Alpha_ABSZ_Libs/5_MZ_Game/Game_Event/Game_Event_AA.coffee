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

        # * Когда мы переключили страницу события, надо пересоздать Battler и активировать АБС
        _.aaIsShouldBeReActivated = -> @isABS() && !@AABattler()?

        _.aaCheckABSEventState = ->
            if @aaIsABSEventPage()
                #TODO: Проверить переключение с АБС на АБС событие
                @_initMembersABS()
            else
                # * Если переключили страницу, но событие было АИ, то надо отключить
                @clearABS() if @isABS()
                return

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
            @aaOnDefeat()
            return

        #@[ALIAS]
        ALIAS__aaOnDefeat = _.aaOnDefeat
        _.aaOnDefeat = ->
            ALIAS__aaOnDefeat.call(@)
            #TODO: call items drop!
            #TODO: gain EXP, money
            @aaOnDeath()

        #@[ALIAS]
        ALIAS__aaOnDeath = _.aaOnDeath
        _.aaOnDeath = ->
            ALIAS__aaOnDeath.call(@)
            model = @aaModel()
            if model.isHaveDeadSwitch()
                # * Включаем self.switch
                AA.SAaction.execute("ss_" + model.deadSwitch + "_true", @)
            else
                @erase() if model.eraseOnDead is 1
            if model.isHaveOnDeathAction()
                AA.SAaction.execute(model.onDeath, @)
            #TODO: Что делать с xAnimaDead ???
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
                # * Отключаем АБС для этого события
                @stopABS() #TODO: clearABS ???
                # * Если параметр включён, запускаем эффект
                if @aaModel().shatterEffect is 1
                    @aaRequestShatterEffect()
                else # * Иначе сразу
                    @aaOnDefeat()
            return

        return
    # -----------------------------------------------------------------------

    # * Дополнительные возможности АБС события
    # -----------------------------------------------------------------------
    do ->

        _.aaStartCommonEvent = (ceId) ->
            #TODO:
            # см. Game_AIBot::startCommonEvent
            # см. Game_AIBot::list
            # см. Game_Interpreter::__clearCMABSEvent

        return
    # -----------------------------------------------------------------------

    #TODO: СБРОС ЦЕЛИ
    #TODO: ОФФСЕТ ДЛЯ ВЫБОРА
    #TODO: МИНИ ХП БАР
    # Также добавить управление ним во время игры (один из трёх типов)


    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------