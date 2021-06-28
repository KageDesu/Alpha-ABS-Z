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
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        # * Если в зоне навыка, подсвечиваться
        @_aaUpdateSelectionBlend()
        @_aaUpdateDamagePopUps()

    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------