#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    # * Методы ниже даже не учитываются, если плагин не подключён
    return unless Imported.PKD_AnimaX is true

    #TODO: НЕ РАБОТАЕТ!!!
    
    # * Логика состояний анимации (бой, смерть) (всегда работает)
    _.aaUpdateABSAnimaX = ->
        return unless @isAnimX()
        if @_aaIsInBattleAnimaXState()
            if @_axState != 'inBattle'
                @switchToXAnimaState('inBattle')
        else
            if @_axState != 'base'
                @resetXAnimaState()
        return

    # * Game_Event and Game_Player имеют разную реализацию
    _._aaIsInBattleAnimaXState = -> false

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