#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

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
        # * Чтобы не поворачивался во время анимации
        return unless @canMove()
        if Input.isPressed(AA.IKey.ROT)
            @turnTowardCharacter(TouchInput.toMapPoint())
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