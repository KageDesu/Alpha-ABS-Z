# * Класс для АБС события игры (НЕ события на карте)

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAGEvent.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    class GEvent
        constructor: (@name) ->
            @listeners = []

        addListener: (listener) ->
            @listeners.push(listener) if listener?

        removeListener: (listener) ->
            return unless listener?
            @listener.delete(listener)

        call: () ->
            do l for l in @listeners
            return
    
    AA.link GEvent
    return
# ■ END AAGEvent.coffee
#---------------------------------------------------------------------------