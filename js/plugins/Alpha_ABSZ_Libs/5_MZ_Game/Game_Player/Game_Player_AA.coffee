#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Когда сцена карты останавливается (сменяется другой)
    _.aaOnMapSceneEnd = ->
        @onSkillTargetCancel() if @isInSkillTargetingState()

    # * Можно ли управлять? (АБС элементы: навыки, атака и всё в этом роде)
    _.canBeControlled = -> @isActive() && AA.isABSMap()

    _.isInSkillTargetingState = -> @aaState == 'skill'

    # * Если ли у игрока АБС навык с ID
    _.aaIsHaveABSSkill = (skillId) -> @AABattler().getAASkills().getById(skillId)?

    #TODO:?
    # * Проверка цели (см. Game_CharacterBase_AA)
    _.aaIsValidTargetToSet = (target) -> true

    # * Когда игрок выбрал зону поражения навыка на карте (нажал левую кнопку мыши)
    _.onSkillTargetSelected = ->
        "SKILL ZONE SELECTED".p()
        console.info $gameTemp._aaSkillSelectorTargets
        # * Проверка радиуса
        skill = @activeAASkill()
        point = TouchInput.toMapPoint()
        if AA.Utils.Math.getDistanceMapPlayerPoint(point) <= skill.range
            @startPerformAASkill(point)
            # * Сбрасываем состояние
            @onSkillTargetCancel()
        else
            AA.UI.shakeSkillImpactSelector()
            #TODO: shake sprite
        return

    _.onSkillTargetCancel = -> @_resetAAState()

    #TODO: Возможно эта реализация довольно затратная по производительности
    #TODO: Сделать параметр плагина - использовать боевую стойку или нет
    _._aaIsInBattleAnimaXState = ->
        return false unless AA.isABSActive()
        myEnemies = AATargetsManager.getAllWhoHavePlayerAsTargetInRange(5)
        return myEnemies.length > 0

    #@[EVENT]
    _.gev_onABSPaused = ->
        try
            # * Сбрасываем состояние (выбор навыка)
            @_resetAAState()
        catch e
            AA.w e

    # * Основные (приватные) методы АБС
    # -----------------------------------------------------------------------
    do ->
        
        #TODO: Доделать поддержку техники
        # * Боты сейчас не учитывают isActive
        # * Надо там добавить isTagetValid
        #@[ALIAS]
        #ALIAS__isActive = _.isActive
        #_.isActive = ->
        #    ALIAS__isActive.call(@) && !@isInVehicle()

        #@[ALIAS]
        ALIAS__initABS = _.initABS
        _.initABS = ->
            ALIAS__initABS.call(@)
            @aaRefreshABSSkillsForPanel()
            return

        _._initMembersABS = ->
            @aaEntity = new AAPlayerEntity()
            @aaState = null # * Свободное состояние (нулевое)
            @aaSkillsSet = new AASkillsSet()
            return

        _._setAAStateToSelectSkillTarget = ->
            # * Наверное должно быт в AAEntity!!! Так как у ботов тоже будет этот параметр
            @aaState = 'skill'
            AA.EV.call("PlayerSkillSelector")
            return

        _._setAAStateToSmartSkillUse = (skillId, point) ->
            @aaState = 'smartAttack'
            @_aaSmartSkillId = skillId
            @_aaSmartPoint = point
            return

        _._resetAAState = ->
            @aaState = null
            AA.EV.call("PlayerSkillSelector")
            return

        _._aaUpdatePlayerABS = (sceneActive) ->
            if sceneActive is true
                @_aaUpdateStates()
                @_aaUpdatePlayerInput()

        _._aaUpdateStates = ->
            switch @aaState
                when 'skill'
                    # * Обновляем цели под кругом выбора
                    $gameTemp._aaSkillSelectorTargets =
                        AATargetsManager.collectTargetsForPlayerSelector(@activeAASkill())
                #? Не используется пока что
                # * Работает, но проблема что надо сбрасывать во многих случаях - путаница
                when 'smartAttack'
                    unless @isMoving()
                        if AATargetsManager.isInSkillRange(@, @_aaSmartSkillId, @_aaSmartPoint)
                            @_resetAAState()
                            @aaTryPerformSkill(@_aaSmartSkillId)
                        else
                            @aaMoveTypeToPoint(@_aaSmartPoint)
                else
        
        

        return
    # -----------------------------------------------------------------------

    # * Методы ABS (Бой и состояния)
    # -----------------------------------------------------------------------
    do ->
        # * Когда какое-либо действие было выполненно на мне
        #@[ALIAS]
        ALIAS__aaOnActionOnMe = _.aaOnActionOnMe
        _.aaOnActionOnMe = (action) ->
            ALIAS__aaOnActionOnMe.call(@, action)
            #TODO: На будущее: тут можно определить кто именно атаковал, так как action имеет packedSubject
            # * Сброс камеры (если есть опция)
            $gameTemp.aaResetMapScrollOnAction()
            return

            

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------