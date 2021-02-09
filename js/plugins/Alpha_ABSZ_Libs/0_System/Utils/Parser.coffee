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
        for db in [$dataSkills, $dataWeapons, $dataItems]
            for item in db
                # * Если <ABS> нету, то пропускаем
                continue unless item?
                _.processABSSkillParamsInItem(item)
        return
    
    # * Навык атаки всегда должен быть АБС 0
    _.checkInitialAttackABSSkill = ->
        try
            attackSkill = $dataSkills[1]
            unless attackSkill.meta.ABS?
                attackSkill.meta.ABS = 0
        catch e
            AA.cre e, 'Something wrong with Attack skill [1] settings'
        return

    _.processABSSkillParamsInItem = (item) ->
        return unless item.meta?.ABS?
        try
            data = {}
            data.type = parseInt(item.meta.ABS)
            data.params = []
            #TODO: 0, 1, 2, 3
            return unless [0].contains(data.type)
            paramsRaw = _.extractABSParametersFromDBItem(item)
            for param in paramsRaw
                data.params.push(_.extractABSParameter(param)) #ACore
            item.AASkillData = data
            console.info item.AASkillData
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

    return

# ■ END PARSER.coffee
#---------------------------------------------------------------------------