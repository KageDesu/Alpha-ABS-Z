#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    # * Методы ABS (Цель)
    # -----------------------------------------------------------------------
    do ->

        _.AATarget = -> @AAEntity()?.getTarget()

        # * Попытка установить активную цель
        _.aaTrySetTarget = (target) ->
            if @aaIsValidTargetToSet(target)
                @AAEntity()?.setTarget(target)
                return true
            return false
        
        # * Этот метод лучше переопределять у Game_Event и Game_Player
        _.aaIsValidTargetToSet = (target) -> false

        # * Есть ли активная цель?
        _.aaIsHaveTarget = -> @AATarget()?

    
    # * Методы ABS (Навыки)
    # -----------------------------------------------------------------------
    do ->

        # * Может ли использовать ABS навык
        _.isCanPerformAASkill = (aaSkill) -> AABattleManager.canUseAASkillNow(@, aaSkill)

        # * Выполнить АBS навык
        _.executeAASkill = (aaSkill) ->
            @AABattler().prepareAASkillForExecuting(aaSkill)
            #TODO: ТУТ ОСТАНОВИЛСЯ
            # * Если есть анимация, то через анимацию
            # * Иначе сразу



    # * Методы ABS (Движение)
    # -----------------------------------------------------------------------
    do ->
        _.aaTurnTowardTouchInput = ->
            @turnTowardCharacter(TouchInput.toMapPoint())


    
    # -----------------------------------------------------------------------

    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------