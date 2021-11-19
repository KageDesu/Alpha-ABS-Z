#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    # * Все ABS навыки персонажа
    # У Actor и Enemy разные источники, поэтому метод тут не имеет тела
    _.getAASkills = -> []

    # * Все ABS предметы персонажа
    _.getAAItems = -> []

    # * ABS навыки, которые можно использовать в данный момент (включая предметы)
    _.getUsableAASkills = -> @getAASkills().filter (skill) => @canUse(skill)

    # * Когда совершили какое-либо АБС действие (навык)
    # * Не используется стандартный onAllActionsEnd, так как он очищает result
    _.onAAActionEnd = ->
        @removeStatesAuto(1)
        @removeBuffsAuto()
        return

    # * Запросить анимацию взмаха оружия (не AnimaX, а стандартная как было в АБС)
    # * См. в редакторе System -> [SV] Attack Motions
    # * Файлы -> System\weapons
    _.aaPlayAAWeaponMotionAnimation = (skill) ->
        try
            # * ID номер оружия указа в навыке
            if skill.isHaveWeaponMotionSpecialType()
                @startWeaponAnimation(skill.weaponMotionType)
            else # * Иначе стандартная (0 или оружие в руках)
                weaponId = @getDefaultWeaponMotionAnimationWeaponId()
                @startWeaponAnimation(weaponId) if weaponId > 0
        catch e
            AA.w e
        return

    # * Если параметр навыка weaponMotionType == 0, то этот метод вызывается
    # * Реализация на Actor и Enemy разная
    _.getDefaultWeaponMotionAnimationWeaponId = -> 0 # * 0 - нету


    #TODO: attackSkillId - метод у МЗ лучше, чем у МВ (там капец)

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------