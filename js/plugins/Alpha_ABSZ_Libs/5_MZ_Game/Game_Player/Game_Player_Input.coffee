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
        if @isCanPerformAASkill(aaSkill)
            @executeAASkill(aaSkill)
        return
        #@startAnimaXAA_Attack()

    _.aaPerformDefense = ->
        #TODO: NOT IMPLEMENTED

    
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------