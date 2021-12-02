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

    #@[ALIAS]
    ALIAS__turnTowardCharacter = _.turnTowardCharacter
    _.turnTowardCharacter = (character) ->
        ALIAS__turnTowardCharacter.call(@, character)
        # * Дополнительно синхронизируем поворот
        # * В Alpha NET Z это делается через Observer 60, что не хватает для ABS
        if AA.Network.isNetworkGame()
            AANetworkManager.sendTurnTowardCharacter(@, character)
        return

    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------