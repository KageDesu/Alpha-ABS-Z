#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    # * Анимация на карте
    # -----------------------------------------------------------------------
    do ->

        #TODO: Учёт позиционированния анимации ??? (см. в редакторе alignBottom)

        #TODO: Через GEvent событие? (оптимизация)
        _.aaRefreshMapAnimation = ->
            if $gameMap.aaIsMapAnimationRequested()
                @aaSetupMapAnimation($gameMap.aaMapAnimations.shift())
            else
                @aaClearMapAnimations()
            return

        _.aaSetupMapAnimation = (animationRequest) ->
            return unless animationRequest?
            { x, y, animationId } = animationRequest
            animation = $dataAnimations[animationId]
            unless animation?
                KDCore.warning("Animation with ID " + animationId + " not found!")
                return
            # * Создаём временного персонажа как координата карты
            tempChar = new Game_Character()
            tempChar.setPosition(x, y)
            spr = new Sprite_Character(tempChar)
            @_aaMapAnimationSprites.push(spr)
            @_characterSprites.push(spr)
            @_effectsContainer.addChild spr
            AABattleActionsManager.playAnimationOnCharacter(tempChar, animationId)
            return

        # * Очистка анимаций карты
        _.aaClearMapAnimations = () ->
            return if @_aaMapAnimationSprites.length == 0
            # * Если нет никаких анимаций на карте, то удаляем всех созданных "временных" персонажей для анимаций
            if @_animationSprites.length == 0
                @_aaMapAnimationSprites = []
            return

        return

    
    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------