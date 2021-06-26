#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

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

    _.aaPerformDefense = ->
        #TODO: NOT IMPLEMENTED


    _._test_ActivateAASkill = ->
        console.log("Activate test AA Skill")
        @_activeAASkillId = 302

        #TODO: Проверка, можем ли использовать навык сейчас (HP, MP и прочее)

        if @activeAASkill().isNeedSelectZone()
            # * Сбор целей сразу в точке где сейчас курсор
            AATargetsManager.collectTargetsForSkillInMapPoint(
                @activeAASkill(), TouchInput.toMapPoint()
            )
            @_setAAStateToSelectSkillTarget()
        else
            # * Передаём себя в качестве точки
            @startPerformAASkill(@toPoint())
        return

    
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------