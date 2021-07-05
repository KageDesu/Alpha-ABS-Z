#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Можно ли управлять? (движение, навыки и всё в этом роде)
    _.canBeControlled = -> @isActive()

    _.isInSkillTargetingState = -> @aaState == 'skill'

    _.activeAASkill = ->
        if @_activeAASkillId > 0
            return $dataSkills[@_activeAASkillId].AASkill
        else
            return null

    #TODO:?
    # * Проверка цели (см. Game_CharacterBase_AA)
    _.aaIsValidTargetToSet = (target) -> true

    # * Когда игрок выбрал зону поражения навыка на карте (нажал левую кнопку мыши)
    _.onSkillTargetSelected = ->
        "SKILL ZONE SELECTED".p()
        console.info $gameTemp._aaSkillSelectorTargets
        @startPerformAASkill(TouchInput.toMapPoint())
        # * Сбрасываем состояние?
        @_resetAAState()

    #TODO: Этот метод надо выносить на Game_Character
    _.startPerformAASkill = (point) ->
        console.log(point)
        skill = @activeAASkill()
        @turnTowardCharacter(point) if skill.isInPoint()
        #TODO: temp
        #TODO: skill animation (if exists)
        #TODO: Если есть Action skill, then skill action
        #TODO: if exists special action in spell then special (if have)
        #TODO: or nothing
        $gamePlayer.startAnimaXAA_Attack()
        # * Стоит ограничение задержки для безопасности
        if skill.actionStartDelay > 0 and skill.actionStartDelay <= 60
            @setupDelayedAASkill(skill, point)
        else
            AABattleActionsManager.startAASkill(skill, @, point)
        return

    _.setupDelayedAASkill = (skill, point) ->
        @aaDelayedSkillActions.push(
            [skill.actionStartDelay, AA.Utils.packAASkill(skill), AA.Utils.packAAPoint(point)]
        )
        return

    _._aaUpdateDelayedSkillActions = ->
        #TODO: Навык с задержкой должен иметь задержку перед использованием иначе ошибка, если спамить навык
        for action in @aaDelayedSkillActions
            continue unless action?
            if action[0]-- <= 0
                skill = AA.Utils.unpackAASkill(action[1])
                point = AA.Utils.unpackAAPoint(action[2])
                AABattleActionsManager.startAASkill(skill, @, point)
                @aaDelayedSkillActions.delete(action)
        return

    # * Основные (приватные) методы АБС
    # -----------------------------------------------------------------------
    do ->
        
        _._initMembersABS = ->
            @aaEntity = new AAPlayerEntity()
            @aaState = null # * Свободное состояние (нулевое)
            # * Набор навыков с задержкой
            @aaDelayedSkillActions = []

        _._setAAStateToSelectSkillTarget = ->
            # * Наверное должно быт в AAEntity!!! Так как у ботов тоже будет этот параметр
            @aaState = 'skill'
            AA.EV.call("PlayerSkillSelector")
            #AA.EV.call("PlayerChangeState")
            #TODO: rise event -> Scene_Map pick event and change mode to select map zone

        _._resetAAState = ->
            @aaState = null
            AA.EV.call("PlayerSkillSelector")
            #AA.EV.call("PlayerChangeState")

        _._aaUpdateABS = (sceneActive) ->
            if sceneActive is true
                @_aaUpdateDelayedSkillActions()
                @_aaUpdateStates()

        _._aaUpdateStates = ->
            switch @aaState
                when 'skill'
                    # * Обновляем цели под кругом выбора
                    $gameTemp._aaSkillSelectorTargets =
                        AATargetsManager.collectTargetsForSkillInScreenPoint(
                            @activeAASkill(), TouchInput
                        )
                else
                    

        return
    # -----------------------------------------------------------------------

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------