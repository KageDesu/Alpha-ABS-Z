#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Можно ли управлять? (движение, навыки и всё в этом роде)
    _.canBeControlled = -> true

    

    # * Основные (приватные) методы АБС
    # -----------------------------------------------------------------------
    do ->
        
        _._initMembersABS = ->
            @aaEntity = new AAPlayerEntity()
        

        return
    # -----------------------------------------------------------------------

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------