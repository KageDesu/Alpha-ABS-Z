# * Машина состояний для АИ
#@[STORABLE]
class AIFlowMachine
    constructor: (@id) ->
        @state = 0
        @_stateFlows = []
        @_setup()

    registerFlowForState: (stateId, flowObject) ->
        @_stateFlows[stateId] = flowObject

    char: -> $gameMap.event(@id)

    entity: -> @char().AAEntity()

    battler: -> @char().AABattler()

    isActive: -> @char().isActive()

    logic: -> @char().AALogic()

    # * Сбросить состояние
    resetState: -> @setState(0)

    # * Установить состояние
    setState: (newState) ->
        # * Предыдущее состояние
        @prevState = @state
        # * Текущее состояние (новое)
        @state = newState
        @_onStateChanged()
        return

    # * Перейти в состояние (без сброса данных, плавно)
    translateToState: (newState) ->
        @prevState = @state
        @state = newState
        @_onStateTranslated()
        return

    update: ->
        return unless @char()?
        return unless @isActive()
        @_updateStates()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIFlowMachine.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AIFlowMachine::

    _._setup = -> # * EMPTY

    _._updateStates = ->
        return if @state < 0
        return if @_stateFlows.length == 0
        @_stateFlows[@state].update()

    _._onStateChanged = ->
        @_stateFlows[@prevState].onStateEnd() if @prevState >= 0
        @_stateFlows[@state].onStateStart()
        return
    
    _._onStateTranslated = ->
        @_stateFlows[@prevState].onStatePause() if @prevState >= 0
        @_stateFlows[@state].onStateResume(@prevState)
        return
    
    return
# ■ END AIFlowMachine.coffee
#---------------------------------------------------------------------------