#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Главный метод по выполнению того или иного АБС навыка
    # * Навык должен быть у персонажа
    # * Чтобы выполнить навык, которого нет у персонажа, то можно поставить флаг forced = true
    _.aaTryPerformSkill = (skillId, forced = false) ->
        try
            return unless skillId?
            return if skillId <= 0
            # * Выполняем навык в любом случае (даже если нету или не готов)
            if forced is true
                skill = $dataSkills[skillId]
                # * Только АБС навык можно выполнить через этот метод
                skill = null unless AA.Utils.isAASkill(skill)
            else
                # * Иначе навык должен быть готов к использованию и выучен
                skill = @AABattler().getUsableAASkills().find (s) -> s.id == skillId
            if skill?
                AA.UI.skillPerformResult(skillId, 1)
                #TODO: perform skill
                "PERFROM SKILL ".p(skillId)
                console.log(skill.name)
                #TODO: нормальный метод на баттлере (или персонаже)
                @_test_ActivateAASkill()
            else
                #TODO: Notify???
                AA.UI.skillPerformResult(skillId, 0)
        catch e
            AA.w e
        return
        #TODO: get skill

    _._aaUpdatePlayerInput = ->
        return unless $gamePlayer.canBeControlled()
        try
            @_aaUpdateSkillsAcivationInput()

            #if Input.isTriggered(AA.IKey.ATK1)
            #    @aaPerformAttack()
            #else

        catch e
            AA.w e
        return

    _._aaUpdateSkillsAcivationInput = ->
        #if Input.isTriggered(AA.IKey.ATK1)
        #    @aaPerformAttack()

    _.aaPerformAttack = ->
        return unless $gamePlayer.isActive()
        return unless $gamePlayer.canBeControlled()
        console.log ("Attack")
        #aaSkill = @AABattler().getAttackAASkill()
        #if @isCanPerformAASkill(aaSkill)
        #    @executeAASkill(aaSkill)
        @_test_ActivateAASkill()
        return
        #@startAnimaXAA_Attack()

    #TODO: Или сразу нажатия на контроллере отрабатывать???
    #TODO: to game character
    _.aaPerformASkill = (skillId) ->
        #TODO: У игрока ещё надо вызвать событие на контроллер UI, чтобы подсветить нажатие

    _.aaPerformDefense = ->
        #TODO: NOT IMPLEMENTED

    _._test_ActivateAASkill = ->
        console.log("Activate test AA Skill")
        @_activeAASkillId = 302


        if @activeAASkill().isNeedSelectZone()
            # * Сбор целей сразу в точке где сейчас курсор
            AATargetsManager.collectTargetsForSkillInScreenPoint(
                @activeAASkill(), TouchInput #.toMapPoint()
            )
            @_setAAStateToSelectSkillTarget()
        else
            # * Передаём себя в качестве точки
            @startPerformAASkill(@toPoint())
        return

    
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------