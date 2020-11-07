do ->
    # * Общий класс для UI контролллеров (которые должны обновлять UI элементы)

    #?rev 17.10.20
    class UIElementController
        constructor: () ->
        
        setup: (@source) -> # * EMPTY
            @_setup()
            @_setupThread()

        # * DYNAMIC значит что тело метода может быть изменнено позже
        #?DYNAMIC
        update: -> # * DUMMY

        # * Общий метод
        refresh: ->
            return unless @source?
            try
                @_refresh()
            catch e
                KDCore.warning e
                # * Убираем источник с ошибкой и отключаем поток
                @clear()
            return

        clear: ->
            @source = null
            @thread = null
            @update = ->

        # * Создать поток обнолвения
        createThread: (t = 10, dt = 4) ->
            @thread = new KDCore.TimedUpdate(t, () =>
                    @refresh()
                )
            # * чтобы все контроллеры не делали проверку в один фрейм
            @thread.applyTimeRange(-dt, dt)
            # * Добавим поток в метод Update
            @update = => @thread.update()
            # * Обновим значения сразу
            @thread.call()

    AA.link UIElementController
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.UIElementController::

    _._setup = -> # * Метод для потомков (настройка)

    _._setupThread = -> # * Метод для потомков (создание потока)
    
    _._refresh = -> # * Метод для потомков (обновление)

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------