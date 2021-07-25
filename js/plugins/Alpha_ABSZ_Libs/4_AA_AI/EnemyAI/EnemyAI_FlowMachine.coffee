# * Машина состояний для АИ врагов на карте
class EnemyAI_FlowMachine extends AIFlowMachine
    constructor: () ->
        super(...arguments)
        @registerFlowForState(0, new EnemyAI_FreeFlow(@id))
        @registerFlowForState(1, new EnemyAI_BattleFlow(@id))
        # * Начальное состояние - свободное
        @switchToFreeState()
        return

    switchToFreeState: -> @setState(0)

    switchToBattleState: -> @setState(1)

    isFreeState: -> @state == 0

    isBattleState: -> @state == 1


    #TODO: search, return???
    #TODO: move

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EnemyAI_FlowMachine.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = EnemyAI_FlowMachine::



    
    return
# ■ END EnemyAI_FlowMachine.coffee
#---------------------------------------------------------------------------