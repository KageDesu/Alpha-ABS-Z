#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PARSER.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils.Parser


    # * Для навыков (навыки, оружие, предметы)
    _.processABSSkillsNotetags = ->
        _.checkInitialAttackABSSkill()
        #TODO: Оружие не имеет своих ABS параметров, только ссылка на НАВЫК
        for item in $dataSkills
            continue unless item?
            _.processABSSkillParamsInItem(item, false)
        for item in $dataItems
            continue unless item?
            _.processABSSkillParamsInItem(item, true)
        return
    
    # * Навык атаки всегда должен быть АБС 0
    _.checkInitialAttackABSSkill = ->
        try
            attackSkill = $dataSkills[1]
            unless attackSkill.meta.ABS?
                attackSkill.meta.ABS = true
        catch e
            AA.cre e, 'Something wrong with Attack skill [1] settings'
        return

    _.processABSSkillParamsInItem = (item, isItem) ->
        return unless item.meta?.ABS?
        try
            params = []
            paramsRaw = _.extractABSParametersFromDBItem(item)
            for param in paramsRaw
                paramPair = _.extractABSParameter(param) #ACore
                params.push(paramPair) if paramPair?
            item.AASkill = new AASkill2(item.id, isItem)
            item.AASkill.setNoteParameters(params)
        catch e
            AA.w e

    # * Извлечь группу из объекта ДБ
    _.extractABSParametersFromDBItem = (item) ->
        try
            if item.meta?.ABS?
                return _.parseNoteGroup("ABS", item.note)
        catch e
            AA.w e
        return []


    #TODO: В ACore
    # *  Извлечь линии (строки) АБС параметров из группы в Note
    _.parseNoteGroup = (tag,  note) ->
        try
            result = []
            sTag = "<" + tag
            eTag = "</" + tag + ">"
            notes = note.split(/[\r\n]+/)
            startLineIndex = -1
            endLineIndex = -1
            for line, index in notes
                if line.contains(sTag)
                    startLineIndex = index + 1 # * Себя не включает начальный таг
                if startLineIndex >= 0 && line.contains(eTag)
                    endLineIndex = index
                    break
            if startLineIndex > -1 && endLineIndex > -1
                result = notes.slice(startLineIndex, endLineIndex)
        catch e
            AA.w e
            return []
        return result

    # * Извлекает из строки (линии) имя параметра и его значение
    # * Учитывается сложный параметр (массив или строка)
    _.extractABSParameterAny = (line) ->
        match = line.match(/<*(\w+)\s*:\s*([\d,\w\s*]+)>*/i)
        if match?
            name = match[1]
            value = match[2]
            return [name, value]
        else
            return null

    # * Конвертирует массив из строки 1,2,3 в [1, 2, 3] (цифры)
    _.convertArrayFromParameter = (values) ->
        try
            return values.split(",").map((i) -> parseInt(i.trim()))
        catch e
            AA.w e
            return []

    return

# ■ END PARSER.coffee
#---------------------------------------------------------------------------