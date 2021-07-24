#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    # * Выполнить атаку первичным навыком (в первой ячеке E)
    _.aaPerformPlayerAttack01 = (isSmart = false) ->
        "ATTACK ONLY 01".p()
        @aaPerformAttack(true, isSmart)

    # * Выполнить атаку вторичным навыком (во второй ячейке Q)
    _.aaPerformPlayerAttack02 = (isSmart = false) ->
        "ATTACK ONLY 02".p()
        @aaPerformAttack(false, isSmart)

    _.aaPerformAttack = (isPrimary = true, isSmart = false) ->
        return unless $gamePlayer.canBeControlled()
        if isPrimary
            symbol = AA.Input.primarySkillSymbol()
        else
            symbol = AA.Input.secondarySkillSymbol()
        skillId = @aaSkillsSet.getSkillForSymbol(symbol)
        return if skillId <= 0
        @aaTurnTowardTouchInput()
        if isSmart
            @aaPerformSmartSkillUse(skillId, TouchInput.toMapPoint())
        else
            @aaTryPerformSkill(skillId)
        return

    # * Выполнить "умную" атаку (либо использовать навык, либо подойти ближе)
    _.aaPerformSmartSkillUse = (skillId, point) ->
        try
            return if skillId <= 0
            #@_setAAStateToSmartSkillUse(skillId, point)
            #? Не состоянием, а просто
            if AATargetsManager.isInSkillRange(@, skillId, point)
                @aaTryPerformSkill(skillId)
            else
                $gameTemp.setDestination(point.x, point.y)
        catch e
            AA.w e
        return

    # * Главный метод по выполнению того или иного АБС навыка
    # * Навык должен быть у персонажа
    # * Чтобы выполнить навык, которого нет у персонажа, то можно поставить флаг forced = true
    _.aaTryPerformSkill = (skillId, forced = false) ->
        try
            return unless AA.isABSActive()
            return unless skillId?
            return if skillId <= 0
            # * Выполняем навык в любом случае (даже если нету или не готов)
            if forced is true
                skill = $dataSkills[skillId]
                # * Только АБС навык можно выполнить через этот метод
                skill = null unless AA.Utils.isAASkill(skill)
            else
                # * Иначе навык должен быть готов к использованию и выучен
                skill = @AABattler().getUsableAASkills().find (s) -> s.id == skillId
            if skill?
                AA.UI.skillPerformResult(skillId, 1)
                #TODO: perform skill
                "PERFROM SKILL ".p(skillId)
                console.log(skill.name)
                #TODO: нормальный метод на баттлере (или персонаже)
                @prepareAASkillToExecute(skill)
            else
                #TODO: Notify???
                AA.UI.skillPerformResult(skillId, 0)
        catch e
            AA.w e
        return
    
    # * Подготовка навыка к выполнению (сюда передаётся базовый объект навыка)
    _.prepareAASkillToExecute = (skill) ->
        console.log("Use skill " + skill.name)
        #TODO: А если предмет???
        #TODO: Анимация навыка атаки
        @setActiveAASkill skill.id
        skill = @activeAASkill()
        # * Если навык работает по направлению точки (курсора)
        if skill.isInPoint()
            # * Если надо выбирать зону, то выбор зоны
            if skill.isNeedSelectZone()
                # * Сбор целей сразу в точке где сейчас курсор
                AATargetsManager.collectTargetsForPlayerSelector(@activeAASkill())
                @_setAAStateToSelectSkillTarget()
            else
                point = TouchInput.toMapPoint()
                if skill.isInstant() || skill.isInCertainPoint()
                    # * Надо проверить находится ли точка в Range навыка
                    if AATargetsManager.isInSkillRange(@, @_activeAASkillId, point)
                        @startPerformAASkill(point)
                    else
                        # * NOTHING
                        #TODO: Показать область range применения (моргнуть)
                        #TODO: Написать Notify (small range)
                        AA.UI.skillPerformResult(@_activeAASkillId, 0)
                        @setActiveAASkill null
                else
                    # * Направление по точке
                    @startPerformAASkill(point)
        else
            # * Передаём себя в качестве точки (direction == 0 - напрвление персонажа)
            @startPerformAASkill(@toPoint())
        return

    # * Обновление навыков для панели задач (при смене лидера)
    # * Также выполняется начальная расстановка навыков
    _.aaRefreshABSSkillsForPanel = ->
        return unless @AABattler()?
        @aaSkillsSet?.setActorId(@AABattler().actorId())
        #TODO: rise refresh skill panel event!
        return

    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------