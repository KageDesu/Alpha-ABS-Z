# * Класс с методами взаимодействия навыков и Entities (аналог Battle Process)

AABattleActionsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AABattleActionsManager

    _.startAASkill = (aaSkill, subject, targetPoint) ->
        return unless aaSkill?
        if aaSkill.isSelfAction()
            "SELF ACTION".p()
            #TODO: Не будет работать
            @applySkillAction(subject, subject, aaSkill)
        else if aaSkill.isInstant()
            "INSTANT ACTION".p()
            # * Надо получить точку по направлению
            unless aaSkill.isInPoint()
                nextPoint = subject
                direction = subject.direction()
                for i in [1..aaSkill.range]
                    nextPoint = AA.Utils.Math.getProjectilePointByDirection(nextPoint, direction)
                    target = AATargetsManager.getTargetInPoint(subject, aaSkill, nextPoint)
                    # * Если цели нет, просто передаём точку на карте (для NoContact навыков)
                    target = nextPoint unless target?
                    @applySkillAction(subject, target, aaSkill)
            else
                @applySkillAction(subject, targetPoint, aaSkill)
        else
            $gameMap.startAASkill(AASkill, subject, targetPoint)
        return
    
    _.startNonProjectileAASkill = () ->

    _.startProjectileAASkill = () ->

    # * Выполнение действия АБС навыка на карте или Entity
    _.applySkillAction = (subject, target, absSkill) ->
        try
            "applySkillAction".p()
            if target instanceof Game_Character
                @playAnimationOnCharacter(target, absSkill.animationId())
            else
                # * Если навык требует контакт, то нет никаких эффектов
                return unless absSkill.isNoContact()
                { x, y } = target
                @playAnimationOnMap(x, y, absSkill.animationId())
            targets = AATargetsManager.collectTargtesForSkill(absSkill, target)
            @performBattleAction(subject, absSkill, targets)
            #TODO: Do Common Action (Выполнение обычных действий на событиях или персонажах)
        catch e
            AA.w e
        return

    #TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

    # * Воспроизвести анимацию на персонаже
    _.playAnimationOnCharacter = (char, animationId) ->
        try
            if animationId? and animationId > 0
                $gameTemp.requestAnimation([char], animationId, false)
        catch e
            KDCore.warning("playAnimationOnCharacter", e)
        return

    # * Воспроизвести анимацию в точке на карте
    _.playAnimationOnMap = (x, y, animationId) ->
        return unless KDCore.Utils.isSceneMap()
        try
            if animationId? and animationId > 0
                $gameMap.aaRequestMapAnimation(x, y, animationId)
        catch e
            KDCore.warning("playAnimationOnMap", e)
        return

    # * ======================================================================
    # * BATTLE ACTION LOGIC

    _.performBattleAction = (subject, skill, targets) ->
        "PERFORM BATTLE ACTION".p()
        "SUB".p()
        console.info(subject)
        "SKILL".p()
        console.info(skill)
        "TARG".p()
        console.info(targets)
        return unless subject?
        return unless skill?
        try
            action = new Game_ActionAA(subject, skill)
            return unless action.isValid()
            @_startAction(action, targets)
            @_endAction(action)
        catch e
            KDCore.warning("performBattleAction", e)
        return

    _._startAction = (action, targets) ->
        try
            # * Вызов общих событий навыка (предмета)
            #TODO: Вызов общих событий AASkill ???
            action.applyGlobal()
            @_invokeAction(t, action) for t in targets
        catch e
            KDCore.warning("_startAction", e)
        return

    _._invokeAction = (target, action) ->
        try
            #TODO: repeats time?
            action.apply(target)
            #TODO: CE on Use
            #TODO: Impulse?
            @_onActionResult(target, action)
        catch e
            KDCore.warning("_invokeAction", e)
        return
            
    _._onActionResult = (target, action) ->
        try
            battler = target.AABattler()
            return unless battler.result().used
            @_actionResultOnDamage(target)
            #TODO: set aaSkill ID to result (for parameters like damage pop up styleid)
            battler.startDamagePopup()
            action.subject().startDamagePopup()
            #TODO: onActionOnMe
            #battler.onActionOnMe(action)
        catch e
            KDCore.warning("_onActionResult", e)
        return

    _._actionResultOnDamage = (target) ->
        try
            #TODO: Надо это или нет?
        catch e
            KDCore.warning("_actionResultOnDamage", e)
        return

    #TODO: Надо каждую секунду вызывать battler.onTurnEnd ???

    _._endAction = (action) ->
        try
            battler = action.subject()
            #TODO: performActionEnd - пустой метод, может не надо его вызывать?
            battler.onAllActionsEnd()
        catch e
            KDCore.warning("_endAction", e)
        return

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------