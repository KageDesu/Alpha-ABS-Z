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
        #TODO: Урон и прочие рассчёты действия
        return

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------