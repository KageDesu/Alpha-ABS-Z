#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    return unless Imported.PKD_AnimaX is true

    #@[ALIAS]
    ALIAS__createNewAnimaXForCharacter = _.createNewAnimaXForCharacter
    _.createNewAnimaXForCharacter = (animaXProfile) ->
        ALIAS__createNewAnimaXForCharacter.call(@, animaXProfile)
        @refreshAnimaXABSStates(animaXProfile)
        return

    # * Загрузка состояний анимации
    _.refreshAnimaXABSStates = (animaXProfile) ->
        animaXStateBattle = XAnimaTools.getXAnimaParamsForState('inBattle', animaXProfile)
        @registerAnimaXState 'inBattle', animaXStateBattle
        animaXStateDead = XAnimaTools.getXAnimaParamsForState('dead', animaXProfile)
        if animaXStateDead?
            @registerAnimaXState 'dead', animaXStateDead
        return
    
    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------