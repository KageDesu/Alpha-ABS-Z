#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    _.AACharacter = -> null

    _.isPlayer = -> false

    _.aaUpdateABS = ->
        # * Обновление таймеров навыков
        @aaSkillsTimers.update()

    # * Расчёт значения по формуле для текущего бойца
    # * Выполняется внутри Battler, чтобы можно было получить
    # * знаения базовых параметров
    _.aaCalculateFormula = (formula) ->
        try
            return eval(formula)
        catch e
            AA.w e
            return 0

    _.initAASkills = ->
        @aaSkillsTimers = new AASkillsTimers()
        return

    # * Запустить таймер перезарядки для навыка
    _.aaSetSkillTimer = (skill) ->
        time = skill.AASkill.getReloadTime(@)
        @aaSkillsTimers.startTimerForSkill(skill.idA, time) if time > 0
        return

    # * Если у навыка есть таймер, значит он не готов (не важно сколько осталось времени)
    _.aaIsSkillReadyInTime = (skill) -> !@aaSkillsTimers.isSkillHaveTimer(skill.idA)

    # * Получить таймер навыка (используется для панели навыков в основном)
    _.aaGetRemainTimeForSkill = (skillId) ->
        # * Если таймер меньше секунды, то будет возращён 0 (чтобы не начинать визуальный отсчёт)
        if @aaSkillsTimers.isSkillHaveTimerToShow(skillId)
            return @aaSkillsTimers.getRemainTimeForSkill(skillId)
        else
            return 0

    _.canUseABSItem = (item) ->
        return false unless item?
        return false unless AA.isABSActive()
        return false unless @canMove()
        return false unless AA.Utils.isAAObject(item)
        if DataManager.isSkill(item)
            return @meetsABSSkillContitions(item)
        else if DataManager.isItem(item)
            return @meetsABSItemContitions(item)
        else
            return false
        
    _.meetsABSSkillContitions = (skill) ->
        return @aaIsSkillReadyInTime(skill) && @meetsSkillConditions(skill)

    # * Вещи не имеют таймеров
    _.meetsABSItemContitions = (item) ->
        return @meetsItemConditions(item)
    
    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------