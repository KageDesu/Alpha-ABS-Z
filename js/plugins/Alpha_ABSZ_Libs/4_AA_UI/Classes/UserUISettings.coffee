# * Данный класс содержит пользовательские (временные) настройки UI элементов

#@[GLOBAL]
#@[STORABLE]
class AAUserUISettings
    constructor: () ->
        @settings = {}

    isHaveFor: (key) -> @settings[key]?

    createFor: (key) -> @settings[key] = {}

    #?[UNSAFE]
    #? Cперва надо сделать проверку isHaveFor
    # * Если поля нету, возращают null, значит вообще не учитывать пользовательскую настройку
    # * return KDCore.Point
    getPositionFor: (key) ->
        try
            return @settings[key]?.position
        catch e
            KDCore.warning e
        return null

    #?[UNSAFE]
    getVisibleFor: (key) ->
        try
            state = @settings[key].visible
            return state if state?
        catch e
            KDCore.warning e
        return null

    set: (key, command, value) ->
        # * Создаём для элемента данные, если нету ещё
        @createFor(key) unless @isHaveFor(key)
        try
            switch command
                when "setPosition"
                    # * Значние должно быть массивом
                    @settings[key].position = KDCore.Utils.jsonPos(value).simple()
                when "setVisible"
                    # * Значение должно быть bool
                    @settings[key].visible = value
                when "resetPosition"
                    # * Нет значения, просто сброс
                    @settings[key].position = null
                when "clear"
                    # * Нет значения, удаление всех настроек
                    delete @settings[key]
                else
                    KDCore.warning 'Unknown command ' + command
        catch e
            KDCore.warning e
        return
