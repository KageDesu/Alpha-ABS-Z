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
                @_aaOnGoInBattleAnimaXState()
        else
            if @_axState != 'base'
                @_aaOnOutFromInBattleAnimaXState()
        return

    _._aaOnGoInBattleAnimaXState = ->
        @switchToXAnimaState('inBattle')
        # * Только персонаж игрока сам определяет состояние "В бою"
        # * NET Character не определяет, только получает от севрера
        # * Game_Event - у него по AAEntity, target через Observer синхронизируется
        if AA.Network.isNetworkGame() and @ is $gamePlayer
            AANetworkManager.animaXChangeState('inBattle', @)

    _._aaOnOutFromInBattleAnimaXState = ->
        @resetXAnimaState()
        if AA.Network.isNetworkGame() and @ is $gamePlayer
            AANetworkManager.animaXChangeState('base', @)

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
