#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AATimer.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
#TODO: Вынести в ACore
# * Таймер для навыков, хранит время в кадрах (frames)
class AATimer
    constructor: (@maxValue = 0, @value = 0) ->

    update: -> @value++ unless @isReady()

    isReady: -> @value >= @maxValue

    start: (maxValue) ->
        @reset()
        @maxValue = Math.abs(Math.round(maxValue))

    reset: -> @value = 0

    getSeconds: -> AATimer.ConvertFramesToSeconds @value

    getMaxSeconds: -> AATimer.ConvertFramesToSeconds @maxValue

    getSecondsLeft: -> @getMaxSeconds() - @getSeconds()

    @ConvertFramesToSeconds: (value) -> (value / 60.0).toFixed(1)

# ■ END AATimer.coffee
#---------------------------------------------------------------------------