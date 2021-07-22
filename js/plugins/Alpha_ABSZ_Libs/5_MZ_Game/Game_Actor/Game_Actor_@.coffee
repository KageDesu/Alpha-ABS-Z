#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    #@[ALIAS]
    ALIAS__performDamage = _.performDamage
    _.performDamage = ->
        if AA.isABS()
            if @isPlayer() and AA.PP.isShakeScreenWhenPlayerGetDamage()
                # * Стандартный метод (тряска экрана и звук)
                ALIAS__performDamage.call(@)
            else
                # * Если не игрок, то нет тряски и звука
                Game_Battler::performDamage.call(@)
        else
            ALIAS__performDamage.call(@)
        
    
    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------