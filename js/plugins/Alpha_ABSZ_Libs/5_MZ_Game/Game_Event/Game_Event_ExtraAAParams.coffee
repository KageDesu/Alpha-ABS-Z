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

    _.aaInitExtraParams = ->
        @_aaMapSkillVectorBlockList = null
        @_aaMapSkillVectorAction = false
        @_aaMapSkillVectorOffset = 0
        @_aaExtendedHitBox = null
        return

    # * Проверка дополнительных параметров, которые могут касаться не только АА но и всех событий
    _.aaCheckExtraParams = ->
        @aaInitExtraParams()
        return unless @page()?
        @_aaExtractVectorOffsetParam()
        @_aaExtractVectorActions()
        @_aaExtractVectorBlockList()
        @_aaExtractExtendedHitBoxes()
        return
    
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

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------