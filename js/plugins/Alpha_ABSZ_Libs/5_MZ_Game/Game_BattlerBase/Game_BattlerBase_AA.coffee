#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

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

    # * Если у навыка есть таймер, значит он не готов (не важно сколько осталось времени)
    _.aaIsSkillReadyInTime = (skill) -> !@aaSkillsTimers.isSkillHaveTimer(skill.id)

    _.canUseABSItem = (item) ->
        return false unless item?
        if DataManager.isSkill(item)
            return @meetsABSSkillContitions(item)
        else if DataManager.isItem(item)
            return @meetsABSItemContitions(item)
        else
            return false
        
    _.meetsABSSkillContitions = (skill) ->
        return false unless AA.Utils.isAASkill(skill)
        return @aaIsSkillReadyInTime(skill) && @meetsSkillConditions(skill)

    # * Вещи не имеют таймеров
    _.meetsABSItemContitions = (item) ->
        return false unless AA.Utils.isAAItem(skill)
        return @meetsItemConditions(item)
    
    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------