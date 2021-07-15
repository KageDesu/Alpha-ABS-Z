# * Состояние (машина) для врага в битве
class EnemyAI_BattleFlow extends AIFlow
    constructor: () ->
        super(...arguments)
        return
        
    onStateStart: ->
        "IN BATTLE STATE".p()

    onStateEnd: ->
        #TODO: clear target
        "BATTLE END".p()

    # * onStateEnd нету, так как Free состояние базовое

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ EnemyAI_BattleFlow.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = EnemyAI_BattleFlow::

    _._setup = ->
        

    _._updateFlow = ->
        

    
    return
# ■ END EnemyAI_BattleFlow.coffee
#---------------------------------------------------------------------------