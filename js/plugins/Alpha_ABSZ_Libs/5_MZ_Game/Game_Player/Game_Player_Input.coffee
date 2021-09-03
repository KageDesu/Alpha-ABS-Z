#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Только атака по нажатию LMB или RMB в режиме поворота (Cntr зажата)
    #TODO: Plugin Parameter
    #TODO: Можно DYNAMIC сделать метод (т.е. если параметр отключён, занулить его)
    # см. AASystem -> applyParameters метод (в нём можно занулять)
    _.aaIsStaticAttackInRotation = -> @aaInRotation is true &&
        AA.Input.IsStaticAttackWhenRotating is true

    _._aaUpdatePlayerInput = ->
        return unless $gamePlayer.canBeControlled()
        try
            @_aaUpdateInput_Rotation()
            #TODO: Action Keys
            #@_aaUpdateInput_ActionKeys()
        catch e
            AA.w e
        return

    _._aaUpdateInput_Rotation = ->
        # * Чтобы не поворачивался во время анимации, проверяем и canMove()
        @aaInRotation = @canMove() && Input.isPressed(AA.IKey.ROT)
        @turnTowardCharacter(TouchInput.toMapPoint()) if @aaInRotation
        return

    _._aaUpdateInput_ActionKeys = ->
        if Input.isTriggered(AA.IKey.REL)
            #TODO: reload firearm
            return
        if Input.isTriggered(AA.IKey.CMD)
            #TODO: AI command menu
            return

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------