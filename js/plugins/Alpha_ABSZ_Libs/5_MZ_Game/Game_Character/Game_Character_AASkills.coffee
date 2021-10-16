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
        @aaPlayAASkillXAnimation(skill)
        # * Персонаж "платит" за навык как только использует его
        @AABattler().useItem(skill.dbItem())
        # * Стоит ограничение задержки для безопасности
        if skill.actionStartDelay > 0 and skill.actionStartDelay <= 60
            @setupDelayedAASkill(skill, point)
        else
            AABattleActionsManager.startAASkill(skill, @, point)
        return

    _.aaPlayAASkillXAnimation = (skill) ->
        try
            return unless Imported.PKD_AnimaX
            return unless @isAnimX()
            if String.any(skill.animaXAction)
                # * Special
                @startAnimaXCustomAction(skill.animaXAction, false, true)
            else # * Default one
                @startAnimaXCustomAction("Skill", false, true)
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