#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    # * Дополнительные слои (под и над персонажами, но на карте)
    # -----------------------------------------------------------------------
    do ->

        # * Под персонажами
        _.aaCreateExtraMapDownLayer = ->
            @_aaLayer01 = new Sprite()
            @_aaLayer01.z = 1
            @_tilemap.addChild @_aaLayer01
            return

        # * Над персонажами
        _.aaCreateExtraMapUpLayer = ->
            @_aaLayer02 = new Sprite()
            @addChild @_aaLayer02
            return

        _.aaCreateDamagePopUpLayer = ->
            @_aaPopUpLayer = new Sprite()
            @_aaLayer02.addChild @_aaPopUpLayer
            return

        _.aaGetDamagePopUpLayer = -> @_aaPopUpLayer

        _.aaCreateSelectedCircle = ->
            @_aaSelectedCircle = new AA.Sprite_SelectedCircle()
            @_aaLayer01.addChild @_aaSelectedCircle
            AA.UI.setSelectedCircle @_aaSelectedCircle
            return

        #TODO: Может над персонажами?
        _.aaCreateSkillImpactSelector = ->
            @_aaSkillImpactSelector = new AA.Sprite_SkillImpactSelector()
            @_aaLayer01.addChild @_aaSkillImpactSelector
            AA.UI.setSkillImpactSelector @_aaSkillImpactSelector
            return

        return
    # -----------------------------------------------------------------------

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