# * Класс с методами взаимодействия навыков и Entities (аналог Battle Process)

AABattleActionsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AABattleActionsManager

    #_.

    #TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

    # * Воспроизвести анимацию на персонаже
    _.playAnimationOnCharacter = (char, animationId) ->
        try
            $gameTemp.requestAnimation([char], animationId, false)
        catch e
            KDCore.warning("playAnimationOnCharacter", e)
        return

    # * Воспроизвести анимацию в точке на карте
    _.playAnimationOnMap = (x, y, animationId) ->
        return unless KDCore.Utils.isSceneMap()
        try
            $gameMap.spriteset().aaCreateAnimationOnMap(x, y, animationId)
        catch e
            KDCore.warning("playAnimationOnMap", e)
        return


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------