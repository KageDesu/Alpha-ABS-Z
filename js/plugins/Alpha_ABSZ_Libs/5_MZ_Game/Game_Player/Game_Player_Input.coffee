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
        aaSkill = @AABattler().getAttackAASkill()
        #if @isCanPerformAASkill(aaSkill)
        #    @executeAASkill(aaSkill)
        @_test_ActivateAASkill()
        return
        #@startAnimaXAA_Attack()

    _.aaPerformDefense = ->
        #TODO: NOT IMPLEMENTED


    _._test_ActivateAASkill = ->
        console.log("Activate test AA Skill")
        skill = new AASkill2(302)
        @_activeAASkill = skill
        # * Переводим игрока в режим выбора (активации навыка) точки для навыка на карте
        @_setAAStateToSelectSkillTarget()
        #TODO: impact skill in that map point
    
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------