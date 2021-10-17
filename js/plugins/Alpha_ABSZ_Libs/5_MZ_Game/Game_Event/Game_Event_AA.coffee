#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    #@[EVENT]
    _.gev_onABSPaused = ->
        try
            return unless @AALogic()?
            unless @AALogic().isFreeState()
                @AALogic().switchToFreeState()
        catch e
            AA.w e

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
                        # * Данный объект хранится даже после переключения страницы на НЕ АБС
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

        # * Этот метод выполняется из отдельного потока для логики АИ
        #$[OUTER]
        _.aaUpdateAILogic = ->
            try
                if @isActive()
                    @AALogic().update() if AA.isABSActive()
                else
                    $gameTemp.aaClearAILogicThread(@eventId())
            catch e
                AA.w e

        #@[ALIAS]
        ALIAS__initABS = _.initABS
        _.initABS = ->
            ALIAS__initABS.call(@)
            AA.EV.subscribeFor("PauseABS", @gev_onABSPaused.bind(@))
            @aaStoreMoveData()
            $gameTemp.aaRegisterAILogicThread(@eventId())
            return

        #@[ALIAS]
        ALIAS__clearABS = _.clearABS
        _.clearABS = ->
            ALIAS__clearABS.call(@)
            $gameTemp.aaClearAILogicThread(@eventId())
            return

        #@[ALIAS]
        ALIAS__isActive = _.isActive
        _.isActive = -> ALIAS__isActive.call(@) && !@_erased

        # * Этот метод работает только когда АБС активна
        #@[ALIAS]
        ALIAS_aaUpdateABS = _.aaUpdateABS
        _.aaUpdateABS = ->
            ALIAS_aaUpdateABS.call(@)
            @_aaUpdateDeadState()
            return

        #@[ALIAS]
        ALIAS__aaOnShatterEffectCreated = _.aaOnShatterEffectCreated
        _.aaOnShatterEffectCreated = ->
            ALIAS__aaOnShatterEffectCreated.call(@)
            return unless @isABS()
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
            model = @AAModel()
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
        _.aaOnActionOnMe = (action) ->
            ALIAS__aaOnActionOnMe.call(@, action)
            result = @AABattler().result()
            return unless result?
            #TODO: Может только если HP damage?
            #TODO: model paramter or skill parameter (shake str)
            @aaRequestShakeEffect() if result.isHit()
            @aaOnKilledBy(action) unless @AABattler().isAlive()
            return

        _.aaOnKilledBy = (action) ->
            try
                #TODO: subject пока не учитываем, так как только игрок может убить врага
                if AA.PP.isAutoExpAfterKillEnemy()
                    uAPI.gainExpForEnemyEv(@eventId())
            catch e
                AA.w e

        _._aaUpdateDeadState = ->
            if @isActive() and !@AABattler().isAlive()
                # * Отключаем АБС для этого события
                @stopABS()
                # * Если параметр включён, запускаем эффект
                if @AAModel().shatterEffect is 1
                    @aaRequestShatterEffect()
                else # * Иначе сразу
                    @aaOnDefeat()
            return

        _._aaIsInBattleAnimaXState = -> @AAEntity().inBattle()

        return
    # -----------------------------------------------------------------------

    # * Дополнительные возможности АБС события
    # -----------------------------------------------------------------------
    do ->

        # * Запускает общее события внутри данного события (т.е. внутри себя вызов общего)
        # * Это позволяет использовать this. и менять АБС параметры события
        _.aaStartCommonEvent = (ceId) ->
            try
                @_aaExtraEventList = null
                return if ceId <= 0
                "Call outer CE ".p(ceId)
                commonEvent = $dataCommonEvents[ceId]
                return unless commonEvent?
                @_aaExtraEventList = ceId
                # * Переключаем напрямую, без метода start(), так как не нужен Lock
                @_starting = true
            catch e
                AA.w e
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