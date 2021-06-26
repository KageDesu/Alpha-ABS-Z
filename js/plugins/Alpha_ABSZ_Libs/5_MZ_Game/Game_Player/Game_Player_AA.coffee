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
        $gameTemp._aaSkillSelectorTargets = null
        @startPerformAASkill(TouchInput.toMapPoint())
        # * Сбрасываем состояние?
        @_resetAAState()

    _.startPerformAASkill = (point) ->
        console.log(point)
        skill = @activeAASkill()
        @turnTowardCharacter(point) if skill.isInPoint()
        #TODO: temp
        #TODO: animation delay before action is executed (in skill settings)
        $gamePlayer.startAnimaXAA_Attack()
        AABattleActionsManager.startAASkill(skill, @, point)
        return

    # * Основные (приватные) методы АБС
    # -----------------------------------------------------------------------
    do ->
        
        _._initMembersABS = ->
            @aaEntity = new AAPlayerEntity()
            @aaState = null # * Свободное состояние (нулевое)

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

        return
    # -----------------------------------------------------------------------

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------