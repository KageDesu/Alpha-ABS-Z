#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Данные параметры отвечают за блокирование или
# * эффекты влияния Vector навыков на обычные (и АБС) события

# * Список: vectorOffset:X, vectorAction:[]\<>, vectorBlock:[]\all\no

do ->

    #@[DEFINES]
    _ = Game_Event::

    # * При попадании Projectile в событие
    _.aaOnVectorHit = (skillId) ->
        return unless @aaIsHaveVectorHitAction(skillId)
        try
            for action in @_aaMapSkillVectorHitActions[skillId]
                AA.SAaction.execute(action, @)
        catch e
            AA.w e
        return

    _.aaIsBlockVision = -> @_aaNoVisionPass is true

    _.aaIsHaveVectorHitAction = (skillId) ->
        #TODO: add ZERO 0 - for all
        return false unless @_aaMapSkillVectorHitActions?
        actions = @_aaMapSkillVectorHitActions[skillId]
        return actions? and !actions.isEmpty()

    _.aaInitExtraParams = ->
        @_aaMapSkillVectorBlockList = null
        @_aaMapSkillVectorAction = false
        @_aaMapSkillVectorHitActions = null
        @_aaMapSkillVectorOffset = 0
        @_aaExtendedHitBox = null
        @_aaNoVisionPass = false
        return

    # * Проверка дополнительных параметров, которые могут касаться не только АА но и всех событий
    _.aaCheckExtraParams = ->
        @aaInitExtraParams()
        return unless @page()?
        @_aaExtractVectorOffsetParam()
        @_aaExtractVectorActions()
        @_aaExtractVectorHitActions()
        @_aaExtractVectorBlockList()
        @_aaExtractExtendedHitBoxes()
        @_aaExtractNoVisionPass()
        return

    #TODO: Добавить комментарии к методам
    
    _._aaExtractVectorOffsetParam = ->
        try
            svOffset = KDCore.Utils.getEventCommentValue("vectorOffset", @list())
            return unless svOffset?
            param = AA.Utils.Parser.extractABSParameter(svOffset)
            @_aaMapSkillVectorOffset = param[1] if param?
            console.info(@_aaMapSkillVectorOffset)
        catch e
            AA.warning e

    #TODO: Пока не реализованы действия на событиях
    #TODO: Прикрутить сюда SAction
    _._aaExtractVectorActions = ->
        try
            vectorAction = KDCore.Utils.getEventCommentValue("vectorAction", @list())
            return unless vectorAction?
            if vectorAction.contains(":")
                param = AA.Utils.Parser.extractABSParameterAny(vectorAction)
                if param?
                    @_aaMapSkillVectorAction = AA.Utils.Parser.convertArrayFromParameter(param[1])
            else
                @_aaMapSkillVectorAction = [] # * All
        catch e
            AA.warning e
        return

    # * Извлекает все onVectorHit действия
    # Пример: <onVectorHit_307:ss_A_true>
    _._aaExtractVectorHitActions = ->
        try
            onHitActions = KDCore.Utils.getEventCommentValueArray("onVectorHit", @list())
            return if onHitActions.isEmpty()
            @_aaMapSkillVectorHitActions = {}
            for action in onHitActions
                try
                    actionData = AA.Utils.Parser.extractABSParameterAny(action)
                    skillId = parseInt(actionData[0].split("_")[1])
                    @_aaRegisterOnHitActionForSkill(skillId, actionData[1])
                catch e
                    AA.warning e
        catch e
            AA.warning e
        return

    # * Регестрирует SAction для навыка skillId при OnVectorHit
    _._aaRegisterOnHitActionForSkill = (skillId, actionString) ->
        try
            unless @_aaMapSkillVectorHitActions[skillId]?
                @_aaMapSkillVectorHitActions[skillId] = []
            @_aaMapSkillVectorHitActions[skillId].push(actionString)
        catch e
            AA.warning e
        return

    _._aaExtractVectorBlockList = ->
        try
            vectorBlockList = KDCore.Utils.getEventCommentValue("vectorBlock", @list())
            return unless vectorBlockList?
            param = AA.Utils.Parser.extractABSParameterAny(vectorBlockList)
            if param[1] == "no"
                @_aaMapSkillVectorBlockList = []
            else if param[1] == "all"
                @_aaMapSkillVectorBlockList = null
            else
                @_aaMapSkillVectorBlockList = AA.Utils.Parser.convertArrayFromParameter(param[1])
        catch e
            AA.warning e
        return

    _._aaExtractExtendedHitBoxes = ->
        try
            values = KDCore.Utils.getEventCommentValue("extraHitBoxes", @list())
            return unless values?
            param = AA.Utils.Parser.extractABSParameterAny(values)
            @_aaExtendedHitBox = AA.Utils.Parser.convertArrayFromParameter(param[1])
        catch e
            AA.w e
            @_aaExtendedHitBox = null
        return

    _._aaExtractNoVisionPass = ->
        try
            value = KDCore.Utils.getEventCommentValue("noVisionPass", @list())
            # * Не важно какое значение, если есть комментарий, значит noVisionPass есть
            @_aaNoVisionPass = value?
        catch e
            AA.w e
            @_aaNoVisionPass = false
        return

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------