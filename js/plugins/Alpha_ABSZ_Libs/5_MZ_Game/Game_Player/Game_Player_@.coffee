#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @_initMembersABS()

    # ======================================================================
    #TODO: Как определять?

    #TODO: TEST

    #@[ALIAS]
    ALIAS__refresh = _.refresh
    _.refresh = ->
        ALIAS__refresh.call(@)
        return

    #@[ALIAS]
    ALIAS__canMove = _.canMove
    _.canMove = ->
        canMove = ALIAS__canMove.call(@)
        if canMove && @isABS()
            return @AABattler().canMove()
        else
            return canMove

    #@[ALIAS]
    #ALIAS__update = _.update
    #_.update = (sceneActive) ->
    #    ALIAS__update.call(@, sceneActive)

    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------