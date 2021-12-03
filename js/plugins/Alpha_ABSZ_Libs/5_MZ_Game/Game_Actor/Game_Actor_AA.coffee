#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    _.AACharacter = ->
        #TODO: party followers
        if AA.Network.isNetworkGame()
            if @isPlayer()
                return $gamePlayer
            else
                id = ANGameManager.getPlayerDataByActorId(@actorId())
                return $gameMap.networkCharacterById(id)
        else
            #TODO: Нет поддержки сопартийцев, поэтому всегда игрок
            return $gamePlayer

    #$[OVER]
    _.isPlayer = -> AA.System.isABSActive() && @ == $gameParty.leader()

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
    
    #$[OVER]
    # * По умолчанию (если тип weaponMotionType не указан анимации, то по типу оружия в руках)
    _.getDefaultWeaponMotionAnimationWeaponId = ->
        try
            weapons = @weapons()
            wtypeId = if weapons[0]? then weapons[0].wtypeId else 0
            attackMotion = $dataSystem.attackMotions[wtypeId]
            return attackMotion.weaponImageId if attackMotion?
        catch e
            AA.w
        return 0

    _.aaCheckAndParseExtendedHitBoxes = ->
        try
            actor = @actor()
            if actor? and actor.meta.extraHitBoxes?
                @_aaExtendedHitBox =
                    AA.Utils.Parser.convertArrayFromParameter(actor.meta.extraHitBoxes)
                return
        catch e
            AA.w e
        @_aaExtendedHitBox = null
        return

    _.aaGetExtendedHitBoxes = -> @_aaExtendedHitBox

    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------