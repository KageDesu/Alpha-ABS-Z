#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    #@[ALIAS]
    ALIAS__startWeaponAnimation = _.startWeaponAnimation
    _.startWeaponAnimation = (weaponImageId) ->
        AANetworkManager.requestWeaponAnimation(@, weaponImageId)
        ALIAS__startWeaponAnimation.call(@, ...arguments)
        return

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------