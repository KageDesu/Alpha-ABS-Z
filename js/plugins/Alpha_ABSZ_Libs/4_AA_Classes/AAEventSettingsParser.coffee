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
            @parsedParams = [] # * Финальные значения параметров на замену
            @_pasreEventList(list)
            @_parseABSParamsBase()
            @_parseABSParamsSequence()
            @_parseParams()
            @_parsePluginCommand()
            return

        isHaveExtraParameters: -> @parsedParams.length > 0

        getParameters: -> @parsedParams

        getEnemyId: ->
            param = AA.Utils.Parser.extractABSParameter(@mainLine)
            return 0 unless param?
            return param[1]
        
        # * Извлечает из списка команд только комменатрии или определённую команду плагина
        _pasreEventList: (list) ->
            for line in list
                continue unless line?
                if line.code == 108 || line.code == 408
                    @list.push(line.parameters[0])
                else if line.code == 357 && line.parameters?[1] == "ABSEventSettings"
                    @param = line
            return

        # * Собирает параметры в базовом представлении < > (как в оригинале)
        _parseABSParamsBase: ->
            for l in @list
                continue unless l?
                param = AA.Utils.Parser.extractABSParameter(l)
                continue unless param?
                # * Не добавляем ABS, он идёт отдельно
                continue if param[0] == 'ABS'
                @parsedParams.push(param)
            return

        # * Собирает все строки с АБС параметрами от <ABS> до </ABS>
        _parseABSParamsSequence: ->
            @mainLine = @list.find (l) -> l.contains('<ABS')
            endElement = @list.find (l) -> l.contains('</ABS>')
            return unless endElement?
            startIndex = @list.indexOf(@mainLine)
            return if startIndex < 0
            for i in [(startIndex + 1)...@list.length]
                break if @list[i] is endElement
                @absParameters.push(@list[i])
            return

        # * Парсинг всех параметров из строк в структуру (имя: значение)
        _parseParams: () ->
            return if @absParameters.length == 0
            for param in @absParameters
                pair = AA.Utils.Parser.extractABSParameter(param)
                continue unless pair?
                # * Пропускаем ещё один ABS параметр, если был добавлен
                #TODO: Можно делать проверку при передаче данных на Model
                if pair[0] == 'ABS'
                    continue
                else
                    @parsedParams.push(pair)
            return

        #TODO: Доработать: исключить группы, правильный конвентор

        #TODO: deadSwitch
        # * Извлекает параметры из команды плагина
        _parsePluginCommand: () ->
            return unless  @param?
            return unless KDCore.isMZ()
            params = @param.parameters[3]
            return unless params?
            for k, v of params
                # * Пропускаем заголовки групп
                continue if k.contains("Group")
                p = [k, AA.Utils.Parser.convertParameterValue(v)]
                @parsedParams.push(p)
            return

    AA.link AAEventSettingsParser
    return
# ■ END AAEventSettingsParser.coffee
#---------------------------------------------------------------------------