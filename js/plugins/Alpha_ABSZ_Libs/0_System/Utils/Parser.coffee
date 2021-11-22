#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PARSER.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils.Parser

    # * Для навыков (навыки, оружие, предметы)
    _.processABSSkillsNotetags = ->
        #TODO: Оружие не имеет своих ABS параметров, только ссылка на НАВЫК
        for item in $dataSkills
            continue unless item?
            _.processABSSkillParamsInItem(item, false)
        for item in $dataItems
            continue unless item?
            _.processABSSkillParamsInItem(item, true)
        #TODO: checkWeapon aaAttackSkill Note
        _.checkInitialAttackABSSkill()
        return
    
    # * Для врагов
    _.processABSEnemiesNotetags = ->
        for item in $dataEnemies
            continue unless item?
            _.processABSEnemyParams(item)
        return

    # * Навык атаки всегда должен быть АБС 0
    _.checkInitialAttackABSSkill = ->
        try
            attackSkill = $dataSkills[1]
            # * Если игрок не настроил навык Атаки, то применим стандартные настройки
            unless attackSkill.meta.ABS?
                attackSkill.meta.ABS = true
                attackSkill.idA = 1
                attackSkill.AASkill = new AASkill2(attackSkill.idA)
                attackSkill.AASkill.applyDefaultAttack001()
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
            # * АБС использует свой ID, чтобы предметы и навыки различать
            item.idA = item.id
            item.idA += AA.Utils.ItemsIDStart if isItem is true
            # * Данные АБС навыка храняться у предмета
            item.AASkill = new AASkill2(item.idA, isItem)
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
        return values if values instanceof Array
        try
            # * Тут надо toString, так как может быть только цифра одна
            return values.toString().split(",").map((i) -> parseInt(i.trim()))
        catch e
            AA.w e
            return []

    # * Чтение параметров врагов
    _.processABSEnemyParams = (item) ->
        return unless item.meta?.ABS?
        try
            params = []
            paramsRaw = _.extractABSParametersFromDBItem(item)
            for param in paramsRaw
                paramPair = _.extractABSParameter(param) #ACore
                params.push(paramPair) if paramPair?
            data = params
            item.AAEnemy = data
        catch e
            AA.w e

    return

# ■ END PARSER.coffee
#---------------------------------------------------------------------------