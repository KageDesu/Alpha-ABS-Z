#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    #@[ALIAS]
    ALIAS__searchLimit = _.searchLimit
    _.searchLimit = ->
        if @isABS()
            return 24
        else
            return ALIAS__searchLimit.call(@)

    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------