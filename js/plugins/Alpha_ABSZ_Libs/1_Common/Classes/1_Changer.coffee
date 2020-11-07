# * Класс который может плавно изменять какой-либо параметр
# * Работает в стиле chain методов

# * ------------------ ПРИМЕР ----------------------------------

# * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

#@changer = new Changer(someSprite)
#@changer.change('opacity').from(255)
#            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
#            .start().done(() -> console.log('done'))
#@changer.update()

# * -------------------------------------------------------------

#TODO: Вынести в KDCore

do ->
    class Changer
        constructor: (@obj) ->
            # * Количество кадров, в которые будет обновление
            @_field = null # * название поля
            @_speed = 1 # * frames
            @_step = 1 # * шаг изменения значения
            @_from = 0 # * Начальное значение
            @_to = 0 # * Конечное значение
            @_thread = null
            @_orienation = true # * Направление + или - step (true = +)
            @_delay = 0 # * Задержка старта
            @_changer = null # * Ссылка на следующий changer
            @_isRepeat = false # * Надо ли поторить себя снова
            @_onDoneMethod = null # * Метод будет выполнен в конце (при завершении)
            @_isPrepared = false # * Элемента был подготовлен (установлено значение from)

        start: ->
            return unless @_field?
            return if @_from == @_to
            if @_delay > 0
                @_delayThread = new KDCore.TimedUpdate(@_delay, @_startThread.bind(@))
                @_delayThread.once()
            else
                @_startThread()
            @

        isStarted: -> @_thread? || @_delayThread?

        from: (@_from) -> @

        to: (@_to) -> @

        step: (@_step) -> @

        speed: (@_speed) -> @

        change: (@_field) -> @

        # * Снова повторить (не совместим с then)
        # * Если ничего не указать, или <= 0 -> то бескончно
        repeat: (@_repeatCount = 0) ->
            @_repeatCount = null if @_repeatCount <= 0
            @_isRepeat = true
            @_changer = null
            @

        # * Снова повторить, но поменять местами to и from
        reverse: () ->
            @_isReverse = true
            @

        isDone: ->
            # * Чтобы не было выхода пока ждёт Delay
            return false unless @_isPrepared
            # * Если от 255 до 0 (например)
            if @_orienation is false
                # * То может быть меньше нуля (т.к. @step динамический)
                return @value() <= @_to
            else
                return @value() >= @_to

        value: -> @obj[@_field]

        stop: ->
            @_thread = null
            @_delayThread = null
            # * Если есть связанный Changer, то не выполняем метод завршения
            @_callDoneMethod() unless @_changer?

        # * При ожидании, значения устанавливаются не сразу
        delay: (@_delay) -> @

        # * Выполнить другой Changer после этого
        # * Не совместим с Repeat
        # * НЕЛЬЗЯ зацикливать, не будет работать
        # * Соединённый не надо обновлять вне, он обновляется в этом
        then: (@_changer) ->
            @_isRepeat = false
            @

        # * Этот метод будт выполнене в конце
        done: (@_onDoneMethod) -> @

        # * Шаг можно выполнить и в ручную
        makeStep: ->
            @_prepare() unless @isStarted()
            @_makeStep()
            @

        update: ->
            if @isStarted()
                @_delayThread?.update() if @_delay > 0
                @_updateMainThread() if @_thread?
            else
                # * Если хоть раз был запущен
                if @_isBeenStarted is true
                    @_updateChainedChanger() if @_changer?

            return

    AA.link Changer
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Changer.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Changer::

    _._prepare = ->
        return unless @_field?
        @_orienation = @_from < @_to
        @_step *= -1 unless @_orienation
        # * Устанавливаем начальное значение
        @obj[@_field] = @_from
        @_isPrepared = true
        return

    _._makeStep = ->
        return if @isDone()
        value = @value()
        value += @_step
        @obj[@_field] = value
        return
    
    _._startThread = ->
        @_prepare()
        return if @isDone()
        @_thread = new KDCore.TimedUpdate(@_speed, @_makeStep.bind(@))
        @_isBeenStarted = true

    _._updateChainedChanger = ->
        if @_changer.isStarted()
            @_changer.update()
            if @_changer.isDone()
                @_callDoneMethod()
                @_changer.stop()
                @_changer = null
        else
            @_changer.start()

    _._restart = ->
        return unless @_isCanRepeatMore()
        # * Если указано! число повторений, то onDone метод не вызываем
        @_callDoneMethod() unless @_repeatCount?
        @_swapFromTo() if @_isReverse is true
        @_prepare()
        @start()

    _._swapFromTo = ->
        t = @_from
        @_from = @_to
        @_to = t
        # * Инвентируем число step
        @_step *= -1
        return

    _._callDoneMethod = ->
        @_onDoneMethod() if @_onDoneMethod?

    _._isCanRepeatMore = ->
        return true unless @_repeatCount?
        @_repeatCount--
        if @_repeatCount <= 0
            @stop()
            return false
        return true

    _._updateMainThread = ->
        @_thread.update()
        if @isDone()
            if @_isRepeat is true
                @_restart()
            else
                @_updateChainedChanger() if @_changer?
                @stop()
        return

    return
# ■ END Changer.coffee
#---------------------------------------------------------------------------