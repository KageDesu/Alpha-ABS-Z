#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#@[EXTENSION]
AA.extend ->

    # * Методы ниже даже не учитываются, если плагин не подключён
    return unless Imported.PKD_AnimaX is true

    #@[DEFINES]
    _ = Game_Character::

    # * Логика состояний анимации (бой, смерть) (всегда работает)
    _.aaUpdateABSAnimaX = ->
        return unless @isAnimX()
        @aaUpdateABSAnimaXInBattleState()

    _.aaUpdateABSAnimaXInBattleState = ->
        if @_aaIsInBattleAnimaXState()
            if @_axState != 'inBattle'
                @switchToXAnimaState('inBattle')
                AANetworkManager.animaXChangeState('inBattle', @)
        else
            if @_axState != 'base'
                @resetXAnimaState()
                AANetworkManager.animaXChangeState('base', @)
        return

    # * Game_Event and Game_Player имеют разную реализацию
    _._aaIsInBattleAnimaXState = -> false

    # * Из-за ALIAS пришлось выносить в Extenstion, чтобы не было зависимости от положения AnimaX плагина
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
