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
            $gameMap.startAASkill(aaSkill, subject, targetPoint)
        return
    
    # * Выполнение действия АБС навыка на карте или Entity
    _.applySkillAction = (subject, target, absSkill) ->
        try
            "applySkillAction".p()
            animationId = @getProperAnimationId(subject, absSkill)
            if target instanceof Game_Character
                if absSkill.animationOnMap is 0
                    @playAnimationOnCharacter(target, animationId)
                else
                    @playAnimationOnMap(target.x, target.y, animationId)
            else
                # * Если навык требует контакт, то нет никаких эффектов
                return unless absSkill.isNoContact()
                { x, y } = target
                @playAnimationOnMap(x, y, animationId)
            targets = AATargetsManager.collectTargtesForSkill(subject, absSkill, target)
            @performBattleAction(subject, absSkill, targets)
            #TODO: Do Common Action (Выполнение обычных действий на событиях или персонажах)
        catch e
            AA.w e
        return

    #TODO: Добавить параметр Animation Scalling ??? Чтобы скалировать обычную анимацию на карте и не переделывать каждую

    # * Анимация с учётом оружия
    _.getProperAnimationId = (subject, absSkill) ->
        try
            animationId = absSkill.animationId()
            if animationId == -1 # * Normal attack
                return subject.AABattler().attackAnimationId1()
                #TODO: attackAnimationId2 if dual weild
            return animationId
        catch e
            AA.w e
            return 0

    #TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

    # * Воспроизвести анимацию на персонаже
    _.playAnimationOnCharacter = (char, animationId) ->
        try
            if animationId? and animationId > 0
                AANetworkManager.playAnimationOnCharacter(char, animationId)
                $gameTemp.requestAnimation([char], animationId, false)
        catch e
            KDCore.warning("playAnimationOnCharacter", e)
        return

    # * Воспроизвести анимацию в точке на карте
    _.playAnimationOnMap = (x, y, animationId) ->
        return unless KDCore.Utils.isSceneMap()
        try
            if animationId? and animationId > 0
                AANetworkManager.playAnimationOnMap(x, y, animationId)
                $gameMap.aaRequestMapAnimation(x, y, animationId)
        catch e
            KDCore.warning("playAnimationOnMap", e)
        return

    # * ======================================================================
    # * BATTLE ACTION LOGIC

    # * subject и target - это characters, не battlers
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
            action = new AABattleAction(subject, skill)
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
            #TODO: Возможно Drain с текущим алгоритмом работать не будут
            # * Сейчас каждый игрок отправляет свой Observer, т.е. нельзя
            # * изменить значение HP персонажа на другом клиенте, надо
            # * вызывать метод, который меняет на текущем клиенте (собственнике персонажа)
            if AA.Network.isNetworkGame()
                if target instanceof Game_Event
                    if ANGameManager.isMapMaster()
                        @_applyActionOnTarget(target, action)
                    else
                        AANetworkManager.applyActionOnTarget(target, action)
                else if target instanceof NETCharacter
                        AANetworkManager.applyActionOnTarget(target, action)
                else # * Game_Player (SELF)
                    @_applyActionOnTarget(target, action)
            else
                @_applyActionOnTarget(target, action)
        catch e
            KDCore.warning("_invokeAction", e)
        return

    _._applyActionOnTarget = (target, action) ->
        try
            return unless action?
            return unless target?
            #TODO: repeats time?
            #TODO: CE on Use
            #TODO: Impulse?
            action.apply(target)
            @_onActionResult(target, action)
        catch e
            AA.w e
        return

    _._onActionResult = (target, action) ->
        try
            battler = target.AABattler()
            return unless battler.result().used
            @_performActionResultOnTarget(target)
            battler.startDamagePopup()
            action.subject().startDamagePopup()
            target.aaOnActionOnMe(action)
        catch e
            KDCore.warning("_onActionResult", e)
        return

    # * Звуковые и визуальные эффекты после действия (на цели)
    _._performActionResultOnTarget = (target) ->
        try
            battler = target.AABattler()
            result = battler.result()
            # * MISS
            if result.missed
                battler.performMiss()
            # * EVADE
            else if result.evaded
                if result.physical
                    battler.performEvasion()
                else
                    battler.performMagicEvasion()
            else # * DAMAGE
                # * HP
                if result.hpAffected
                    if result.hpDamage > 0 and !result.drain
                        battler.performDamage()
                    if result.hpDamage < 0
                        battler.performRecovery()
                # * MP and TP
                if battler.isAlive() && (result.mpDamage != 0 || result.tpDamage != 0)
                    if result.mpDamage < 0 || result.tpDamage < 0
                        battler.performRecovery()
        catch e
            KDCore.warning("_actionResultOnDamage", e)
        return

    #TODO: Надо каждую секунду вызывать battler.onTurnEnd ???

    _._endAction = (action) ->
        try
            battler = action.subject()
            battler.onAAActionEnd()
        catch e
            KDCore.warning("_endAction", e)
        return

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------