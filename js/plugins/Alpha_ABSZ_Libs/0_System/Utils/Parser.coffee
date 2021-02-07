# * Вспомогательные функции для доставания АБС параметров из Note и комментарией
AA.Utils.Parser = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PARSER.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils.Parser

    # * Преобразовывает значение (строка или цифра)
    #TODO: Пока простой способ
    _.convertParameterValue = (paramValue) ->
        if isFinite(paramValue)
            return parseInt(paramValue)
        else
            return paramValue
            
    # * Извлекает из строки (линии) имя параметра и его значение
    _.extractABSParameter = (line) ->
        match = line.match(/<*(\w+)\s*:\s*([\w\d]+)>*/i)
        if match?
            name = match[1]
            value = _.convertParameterValue(match[2])
            return [name, value]
        else
            return null

    # * Извлекает из строки (линии) значение конкретного параметра
    # * Например используется чтобы достать ID врага из <ABS:X>
    _.extractCertainABSParameter = (name, line) ->
        param = _.extractABSParameter(line)
        # * Если в этой строке есть этот параметр, то вернём его значение
        if param[0] == name
            return param[1]
        else
            # * Иначе нету ничего
            return null

    # * Shortcut для проверки ABS событий
    _.getABSEnemyId = (line) -> _.extractCertainABSParameter('ABS', line)

    return

# ■ END PARSER.coffee
#---------------------------------------------------------------------------