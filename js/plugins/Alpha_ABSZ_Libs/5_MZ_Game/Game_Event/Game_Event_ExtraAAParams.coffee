#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Дополнительные параметры, которые расширяют возможности взаимодействия событий в АБС

do ->

    #@[DEFINES]
    _ = Game_Event::

    # * При попадании Projectile в событие
    _.aaOnVectorHit = (skillId) ->
        unless @aaIsHaveVectorHitAction(skillId)
            # * Если нет для skillId ничего, то смотрим общие - 0
            skillId = 0
            return unless @aaIsHaveVectorHitAction(0)
        try
            for action in @_aaMapSkillVectorHitActions[skillId]
                AA.SAaction.execute(action, @)
        catch e
            AA.w e
        return

    # * Блокирует ли данное событие Visor
    _.aaIsBlockVision = -> @_aaNoVisionPass is true

    # * Есть ли действие при попадании конкретного Vector?
    _.aaIsHaveVectorHitAction = (skillId) ->
        return false unless @_aaMapSkillVectorHitActions?
        actions = @_aaMapSkillVectorHitActions[skillId]
        return actions? and !actions.isEmpty()

    # * Инициализация расширенных параметров события
    _.aaInitExtraParams = ->
        @_aaMapSkillVectorBlockList = null
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
        @_aaExtractVectorHitActions()
        @_aaExtractVectorBlockList()
        @_aaExtractExtendedHitBoxes()
        @_aaExtractNoVisionPass()
        return

    # * Извлекает параметр смщенеия вектора для данного события
    # * Т.е. смещение начала графики, когда данное событие "выпускает" вектор из себя
    # * <vectorOffset:X>
    _._aaExtractVectorOffsetParam = ->
        try
            svOffset = KDCore.Utils.getEventCommentValue("vectorOffset", @list())
            return unless svOffset?
            param = AA.Utils.Parser.extractABSParameter(svOffset)
            @_aaMapSkillVectorOffset = param[1] if param?
            console.info(@_aaMapSkillVectorOffset)
        catch e
            AA.warning e

    # * Извлекает все onVectorHit действия
    # * Пример: <onVectorHit_307:ss_A_true>
    # * Можно 0 - тогда будет для всех навыков (для любого) или просто onVectorHit:SA>
    _._aaExtractVectorHitActions = ->
        try
            onHitActions = KDCore.Utils.getEventCommentValueArray("onVectorHit", @list())
            return if onHitActions.isEmpty()
            @_aaMapSkillVectorHitActions = {}
            for action in onHitActions
                try
                    actionData = AA.Utils.Parser.extractABSParameterAny(action)
                    args = actionData[0].split("_")
                    if args.length > 1
                        skillId = parseInt(args[1])
                    else
                        skillId = 0 # * any
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

    # * Извлекает список ID навыков, которые блокирет данное событие
    # * <vectorBlock:no> - ничего не блокирует
    # * <vectorBlock:all> - всё блокирует (по умолчанию)
    # * <vectorBlock: 301, 302> - НЕ блокирует 301 и 302 навыки
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

    # * Расширенные границы коллизии события (учитывается только для АБС навыков)
    # * UP, RIGHT, DOWN, LEFT (по часовой)
    # * Пример: <extraHitBoxes:1,0,0,0> - расширение на 1 клетку вверх
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

    # * Если есть этот комментарий, Visor АИ не может проходить через это событие
    # * <noVisionPass>
    #TODO: Добавить except ID событий (или врагов) как с vectorBlock
    #TODO: Т.е. только определённые враги могут видеть через этот объект
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