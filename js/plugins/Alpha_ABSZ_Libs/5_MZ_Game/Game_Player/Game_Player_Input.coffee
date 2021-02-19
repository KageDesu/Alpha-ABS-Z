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
        #TODO: test only
        @startAnimaXAA_Attack()
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------