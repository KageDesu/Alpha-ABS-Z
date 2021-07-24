#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    # * Этот метод используется в методе canMove, поэтому дополняем его
    # * В АБС бою, монстр всегда Appeared (видимый)
    #@[ALIAS]
    ALIAS__isAppeared = _.isAppeared
    _.isAppeared = ->
        if AA.isABSMap()
            return true
        else
            return ALIAS__isAppeared.call(@)

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @initAASkills()
        return

    #@[ALIAS]
    ALIAS__canUse = _.canUse
    _.canUse = (item) ->
        if AA.isABSMap() and item.AASkill?
            return @canUseABSItem(item)
        else
            return ALIAS__canUse.call(@, item)

    #@[ALIAS]
    ALIAS__paySkillCost = _.paySkillCost
    _.paySkillCost = (skill) ->
        ALIAS__paySkillCost.call(@, skill)
        if AA.isABSMap() and skill.AASkill?
            @aaSetSkillTimer(skill)
        return

    # * АБС навыки не учитывают область действия, так как их можно использовать только на карте
    #@[ALIAS]
    ALIAS__isOccasionOk = _.isOccasionOk
    _.isOccasionOk = (item) ->
        if AA.isABSMap() and item.AASkill?
            return true
        else
            return ALIAS__isOccasionOk.call(@, item)

    # * Есть стандартный у МЗ (если у МВ нету, то будет этот метод)
    #@[ALIAS]
    ###ALIAS__attackSkillId = _.attackSkillId
    _.attackSkillId = ->
        # * У оружия может быть свой АБС навык на атакую этим оружием
        if AA.isMap()
            if !@hasNoWeapons() and @weapons()[0]?
                weapon = @weapons()[0]
                if weapon.meta.aaAttackSkillId?
                    skillId = parseInt(weapon.meta.aaAttackSkillId)
                    return skillId if AA.Utils.isAASkill(skillId)
        return ALIAS__attackSkillId.call(@)###

    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------