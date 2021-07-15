# * Состояние АИ
class AIFlow extends AIFlowMachine
    constructor: () ->
        super(...arguments)
        # * Состояние в режиме ожидания
        @paused = false
        @translatedFrom = -1
        return

    update: ->
        super()
        @_updateFlow()

    prepare: (@inputData) -> # * EMPTY

    onStateStart: -> # * EMPTY

    onStateEnd: -> # * EMPTY

    # * При "переходе" в это состояние
    # * Поддерживает инициацию, если не было паузы
    # * Запоминает номер состояния после которого был запущен
    onStateResume: (@translatedFrom) -> # * EMPTY

    # * При "переходе" в другое состояние
    onStatePause: -> # * EMPTY

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIFlow.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AIFlow::

    _._updateFlow = ->

    
    return
# ■ END AIFlow.coffee
#---------------------------------------------------------------------------