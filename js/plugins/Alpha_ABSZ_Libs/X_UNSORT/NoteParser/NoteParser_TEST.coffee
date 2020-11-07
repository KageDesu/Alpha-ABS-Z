#╒═════════════════════════════════════════════════════════════════════════╛
# ■ DataManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = DataManager

    #@[ALIAS]
    ALIAS__isDatabaseLoaded = _.isDatabaseLoaded
    _.isDatabaseLoaded = ->
        return false unless ALIAS__isDatabaseLoaded.call(@)
        @processABSNotetags()
        return true
    
    _.processABSNotetags = ->
        group = $dataSkills
        item = group[1]
        # * Если <ABS> нету, то пропускаем
        return unless item.meta.ABS?
        console.info item.meta
        skillType = parseInt(item.meta.ABS)
        console.log skillType
        #TODO: проверка, что тип поддерживается 0,1,2
        # Если нет, то выход
        item.AASkill = {}
        data = item.AASkill
        data.type = skillType
        lines = @getGroupData("ABS", item.note)
        console.info lines
        #console.log @getValueForKey("someField", lines)
        return

    #TODO: Уже когда будут конкретные ключи
    #_.getValueForKey = (key, lines) ->

    _.getGroupData = (tag, note) ->
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
            KDCore.warning e
            return []
        return result

    return
# ■ END DataManager.coffee
#---------------------------------------------------------------------------
