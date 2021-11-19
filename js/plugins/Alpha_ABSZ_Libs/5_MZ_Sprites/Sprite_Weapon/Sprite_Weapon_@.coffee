#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Weapon.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Weapon::

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @_aaOpChanger?.update()
        return

    #$[OVER]
    #TODO: setting for user
    _.animationWait = -> 6
    
    return
# ■ END Sprite_Weapon.coffee
#---------------------------------------------------------------------------