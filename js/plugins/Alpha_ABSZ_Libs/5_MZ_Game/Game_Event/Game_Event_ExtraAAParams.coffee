#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    _.aaInitExtraParams = ->
        @_aaMapSkillVectorBlock = 0
        @_aaMapSkillVectorBlockList = []
        @_aaMapSkillVectorAction = false
        @_aaMapSkillVectorOffset = 0
        return

    # * Проверка дополнительных параметров, которые могут касаться не только АА но и всех событий
    _.aaCheckExtraParams = ->
        @aaInitExtraParams()
        return unless @page()?
        @_aaExtractVectorOffsetParam()
        @_aaExtractVectorActions()
        #TODO: BLOCK REGIONS
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

    _._aaExtractVectorActions = ->
        try
            vectorAction = KDCore.Utils.getEventCommentValue("vectorAction", @list())
            return unless vectorAction?
            if vectorAction.contains(":")
                param = AA.Utils.Parser.extractABSParameterAny(vectorAction)
                if param?
                    @_aaMapSkillVectorAction = param[1].split(",").map((i) -> parseInt(i.trim()))
            else
                @_aaMapSkillVectorAction = [] # * All
            console.info(@_aaMapSkillVectorAction)
        catch e
            AA.warning e
        return

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------