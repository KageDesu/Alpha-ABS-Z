#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    #$[OVER]
    _.isPlayer = -> @ == $gameParty.leader()

    #$[OVER]
    _.getAASkills = ->
        # * Включает атаку и защиту (базовые 1 и 2)
        #TODO: навык защиты надо тоже под АБС автоматически дорабатывать при загрузке
        attackSkillId = @attackSkillId()
        list = @skills().concat([$dataSkills[attackSkillId]])
        # * Включает АБС предметы (так как они по сути тоже навыки)
        # * Используется метод $gameParty.items() для быстродействия, чтобы 2 раза не проверять
        list = list.concat($gameParty.items())
        return list.filter (skill) -> skill.AASkill?

    #$[OVER]
    _.getAAItems = -> $gameParty.items().filter (item) -> AA.Utils.isAAObject(item)
    
    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------