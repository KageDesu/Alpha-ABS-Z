# * Класс с методами взаимодействия навыков и Entities (аналог Battle Process)

AABattleActionsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AABattleActionsManager

    # * Когда Vector на карте попал в цель или точку
    _.onMapSkillAction = (target, mapSkill) ->
        try
            "onMapSkillAction".p()
            absSkill = mapSkill.aaSkill2
            if target instanceof Game_Character
                @playAnimationOnCharacter(target, absSkill.animationId())
                #TODO: calculate damage radius (if need) and apply damage effect for all in radius (and on target)
            else
                if absSkill.isNoContact()
                    { x, y } = target
                    @playAnimationOnMap(x, y, absSkill.animationId())
                    #TODO: calculate damage radius and apply damage effect for all in radius
            #TODO: Do Common Action (Выполнение обычных действий на событиях или персонажах)
        catch e
            AA.w e
        return

    #TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

    # * Воспроизвести анимацию на персонаже
    _.playAnimationOnCharacter = (char, animationId) ->
        try
            if animationId? and animationId > 0
                $gameTemp.requestAnimation([char], animationId, false)
        catch e
            KDCore.warning("playAnimationOnCharacter", e)
        return

    # * Воспроизвести анимацию в точке на карте
    _.playAnimationOnMap = (x, y, animationId) ->
        return unless KDCore.Utils.isSceneMap()
        try
            if animationId? and animationId > 0
                $gameMap.spriteset().aaCreateAnimationOnMap(x, y, animationId)
        catch e
            KDCore.warning("playAnimationOnMap", e)
        return


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------