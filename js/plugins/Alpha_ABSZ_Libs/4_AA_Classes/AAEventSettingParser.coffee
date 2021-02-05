#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAEventSettingsParser.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    class AAEventSettingsParser
        constructor: (list) ->
            @list = [] # * Список всех комментариев
            @absParameters = [] # * ABS параметры
            @param = null # * Параметр плагина (MZ)
            @mainLine = "" # * <ABS:X>
            @parsedParams = [] # * Значения параметров на замену
            @_pasreEventList(list)
            @_parseABSParamsSequence()
            @_parseParams()
            #console.info @list
            #console.info @param
            console.info @parsedParams
            return

        #TODO: парсинг из команды плагина

        isHaveExtraParameters: -> @parsedParams.length > 0

        getABSEventId: ->
            param = @_extractABSParameter(@mainLine)
            return 0 unless param?
            return param[1]
        
        _pasreEventList: (list) ->
            for line in list
                continue unless line?
                if line.code == 108 || line.code == 408
                    @list.push(line.parameters[0])
                else if line.code == 357 && line.parameters?[1] == "ABSEventSettings"
                    @param = line
            return

        _parseABSParamsSequence: ->
            @absParameters = []
            @mainLine = @list.find (l) -> l.contains('<ABS')
            endElement = @list.find (l) -> l.contains('</ABS>')
            return unless endElement?
            startIndex = @list.indexOf(@mainLine)
            return if startIndex < 0
            for i in [(startIndex + 1)...@list.length]
                break if @list[i] is endElement
                @absParameters.push(@list[i])
            return

        _parseParams: () ->
            return if @absParameters.length == 0
            for param in @absParameters
                pair = @_extractABSParameter(param)
                continue unless pair?
                # * Пропускаем ещё один ABS параметр, если был добавлен
                #TODO: Можно делать проверку при передаче данных на Model
                if pair[0] == 'ABS'
                    continue
                else
                    @parsedParams.push(pair)
            return

        _extractABSParameter: (line) ->
            match = line.match(/<*(\w+)\s*:\s*([\w\d]+)>*/i)
            if match?
                name = match[1]
                value = match[2]
                value = parseInt(value) if isFinite(value)
                return [name, value]
            else
                return null


    AA.link AAEventSettingsParser
    return
# ■ END AAEventSettingsParser.coffee
#---------------------------------------------------------------------------