#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        AA.EV.subscribeFor("PlayerSkillSelector", @gev_onPlayerSkillSelector.bind(@))
        AA.EV.subscribeFor("UnderMouseEventChanged", @gev_onUnderMouseEventChanged.bind(@))
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        # * Если в зоне навыка, подсвечиваться
        @_aaUpdate()
        return

    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------