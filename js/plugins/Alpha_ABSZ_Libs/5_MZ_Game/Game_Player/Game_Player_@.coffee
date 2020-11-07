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

        #TODO: Получение из Note, подготовка параметров

        animaX = XAnimaTools.getXAnimaParamsForState('base', 'Reid')
        @initAnimaX "Reid", animaX
        animaXStateTest = XAnimaTools.getXAnimaParamsForState('inBattle', 'Reid')
        @registerAnimaXState 'inBattle', animaXStateTest
        return

    #@[ALIAS]
    ALIAS__canMove = _.canMove
    _.canMove = ->
        # * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
        return false if @isAnimXIsBusy()
        canMove = ALIAS__canMove.call(@)
        if canMove && @isABS()
            return @AABattler().canMove()
        else
            return canMove

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = (sceneActive) ->
        ALIAS__update.call(@, sceneActive)
        if sceneActive
            @_updateAnimX() if @isAnimX()

    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------