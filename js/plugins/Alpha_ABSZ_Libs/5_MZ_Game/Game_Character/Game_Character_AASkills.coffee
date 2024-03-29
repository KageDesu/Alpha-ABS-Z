#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    _.setActiveAASkill = (@_activeAASkillId) ->

    _.activeAASkill = ->
        if @_activeAASkillId > 0
            return AA.Utils.getAASkillObject(@_activeAASkillId).AASkill
        else
            return null

    _.startPerformAASkill = (point) ->
        skill = @activeAASkill()
        @turnTowardCharacter(point) if skill.isInPoint()
        #TODO: Тут можно ещё дополнительную проверку canUse
        # так как пока шёл выборо цели (например) мана могла закончиться
        # * Анимация Motion и AnimaX могут работать вместе
        @aaDetermineAndPlaySkillAnimation(skill)
        # * Персонаж "платит" за навык как только использует его
        @AABattler().useItem(skill.dbItem())
        # * Стоит ограничение задержки для безопасности
        if skill.actionStartDelay > 0 and skill.actionStartDelay <= 60
            @setupDelayedAASkill(skill, point)
        else
            AABattleActionsManager.startAASkill(skill, @, point)
        return

    _.aaDetermineAndPlaySkillAnimation = (skill) ->
        if skill.animaXPriority > 1
            # * Анимация Motion и AnimaX могут работать вместе
            @AABattler().aaPlayAAWeaponMotionAnimation(skill) if skill.isHaveWeaponMotion()
            @aaPlayAASkillXAnimation(skill)
        else
            # * Если в приоритете AnimaX
            if skill.animaXPriority == 1
                # * Если есть анимация для действия, то проиграть её
                if @aaIsAvailableAnimaXForSkill(skill)
                    @aaPlayAASkillXAnimation(skill)
                else # * Иначе анимаци Weapon Motion
                    @AABattler().aaPlayAAWeaponMotionAnimation(skill) if skill.isHaveWeaponMotion()
            else # * Если в приоритете Weapon Motion
                if skill.isHaveWeaponMotion()
                    @AABattler().aaPlayAAWeaponMotionAnimation(skill)
                else # * Если нет Weapon Motion, то AnimaX (если есть)
                    if @aaIsAvailableAnimaXForSkill(skill)
                        @aaPlayAASkillXAnimation(skill)
        return

    _.aaIsAvailableAnimaXForSkill = (skill) ->
        return false unless Imported.PKD_AnimaX is true
        return false unless @isAnimX()
        return @isHaveAnimaXActionWithName(skill.getAnimaXActionName())

    _.aaPlayAASkillXAnimation = (skill) ->
        try
            return unless Imported.PKD_AnimaX
            return unless @isAnimX()
            # * For AnimaX network
            # * Команда startAnimaXCustomAction отправляет
            if @ instanceof Game_Event
                # * по номеру события
                $gameTemp._lastAxNetworkChar = @eventId()
            else
                # * 0 - значит будет по Actor ID, который отправляет
                $gameTemp._lastAxNetworkChar = 0
            @startAnimaXCustomAction(skill.getAnimaXActionName(), false, true)
            $gameTemp._lastAxNetworkChar = null
        catch e
            AA.w e

    _.setupDelayedAASkill = (skill, point) ->
        @aaDelayedSkillActions.push(
            [skill.actionStartDelay, skill.idA, AA.Utils.packAAPoint(point)]
        )
        return

    _._aaUpdateDelayedSkillActions = ->
        #TODO: Навык с задержкой должен иметь задержку перед использованием иначе ошибка, если спамить навык
        for action in @aaDelayedSkillActions
            continue unless action?
            if action[0]-- <= 0
                skill = AA.Utils.unpackAASkill(action[1])
                point = AA.Utils.unpackAAPoint(action[2])
                AABattleActionsManager.startAASkill(skill, @, point)
                @aaDelayedSkillActions.delete(action)
        return
    
    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------