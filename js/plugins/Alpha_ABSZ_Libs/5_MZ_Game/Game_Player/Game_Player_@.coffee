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
        AA.EV.subscribeFor("PauseABS", @gev_onABSPaused.bind(@))
        AA.EV.subscribeFor("ABSPartyLeaderReady", @initABS.bind(@))
        @_initMembersABS()

    # ======================================================================
    #TODO: Как определять?

    #TODO: TEST

    #@[ALIAS]
    ALIAS__canMove = _.canMove
    _.canMove = ->
        canMove = ALIAS__canMove.call(@)
        if canMove && @isABS() && AA.isABSActive() && @AABattler()?
            return @AABattler().canMove()
        else
            return canMove

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        @_aaUpdatePlayerABS(sceneActive) if AA.isABSActive()

    #@[ALIAS]
    ALIAS__moveStraight = _.moveStraight
    _.moveStraight = ->
        ALIAS__moveStraight.call(@, ...arguments)
        $gameTemp.aaResetMapScrollOnMoving()
        return

    # * Диагональное движение
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__getInputDirection = _.getInputDirection
        _.getInputDirection = ->
            if AA.Input.IsDiagonal is true
                return Input.dir8
            else
                return ALIAS__getInputDirection.call(@)
            
        #@[ALIAS]
        ALIAS__executeMove = _.executeMove
        _.executeMove = (direction) ->
            if AA.Input.IsDiagonal is true
                if direction % 2 is 0
                    return ALIAS__executeMove.call(@, direction)
                else if Math.abs(direction % 2) is 1
                    [horz, vert] = AA.Utils.get8Dir(direction)
                    @moveDiagonally(horz, vert)
            else
                return ALIAS__executeMove.call(@, direction)
            
        #@[ALIAS]
        ALIAS__findDirectionTo = _.findDirectionTo
        _.findDirectionTo = (goalX, goalY) ->
            if AA.Input.IsDiagonal is true
                return @aaFindDirectionToDiagonal(goalX, goalY)
            else
                return ALIAS__findDirectionTo.call(@, goalX, goalY)

        return
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------