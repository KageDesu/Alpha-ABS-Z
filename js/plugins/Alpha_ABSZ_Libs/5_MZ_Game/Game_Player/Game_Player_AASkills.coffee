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
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------