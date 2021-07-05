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

    # * Эффект Shatter на карте
    do ->

        _.aaCreateShatterEffect = (characterSprite) ->
            effectBase = new Sprite()
            effectBase.x = characterSprite.x - characterSprite.width / 2
            effectBase.y = characterSprite.y - characterSprite.height
            @addChild effectBase
            char = characterSprite._character
            x = char._aaShatterEffectData[3]
            y = char._aaShatterEffectData[4]
            shatterEffectsSet = []
            pSize = 8
            pw = characterSprite.patternWidth()
            ph = characterSprite.patternHeight()
            maxw = Math.floor((pw / pSize) * (ph / pSize))
            if characterSprite._tileId > 0
                sx = (Math.floor(characterSprite._tileId / 128) % 2 * 8 + characterSprite._tileId % 8) * pw
                sy = Math.floor(characterSprite._tileId % 256 / 8) % 16 * ph
            else
                sx = (characterSprite.characterBlockX() + characterSprite.characterPatternX()) * pw
                sy = (characterSprite.characterBlockY() + characterSprite.characterPatternY()) * ph
            for i in [0...maxw]
                shatterEffectsSet[i] = new Sprite(characterSprite.bitmap)
                shatterEffectsSet[i].anchor.set(0.5)
                l = Math.floor(pSize * i / pw)
                x = pSize * i - (l * pw)
                y = Math.floor(l * pSize)
                y_perc = pSize * (i + 1) / Math.floor(pw / pSize) / ph
                y3 = Math.floor(l * pSize)
                y = ph - pSize if y >= ph - pSize
                sx2 = sx + x
                sy2 = Math.floor(sy + y)
                shatterEffectsSet[i].x = x
                shatterEffectsSet[i].y = y
                shatterEffectsSet[i].y_perc = y_perc
                shatterEffectsSet[i].setFrame sx2, sy2, pSize, pSize
                effectBase.addChild shatterEffectsSet[i]
                shatterEffectsSet[i].an = [0, 0, 0]
                @_aaCreateShatterPartAnimation(shatterEffectsSet[i], char._aaShatterEffectData[3], char._aaShatterEffectData[4])
            for part in shatterEffectsSet
                @_aaMapSpriteEffects.push(part)
            return

        _._aaCreateShatterPartAnimation = (sprite, x, y) ->
            sx = Math.random() * x + 0.1
            sy = (Math.random() * 0.3) + 0.7 * y
            r = Math.randomInt(2)
            sx *= -1 if r != 0
            sprite.sx = sx
            sprite.sy = sy
            sprite.op = (Math.random() * 2) + 2.0
            sprite.sc = 0
            sprite.rt = (Math.random() + 0.5) * 0.1
            return

        _._aaUpdateShatterEffectPartSprite = (part) ->
            part.an[0]++
            g = 0.16
            ground = 24 * (1  - part.y_perc) + 72 * (part.y_perc)
            if part.y < ground
                part.sy += g
                part.rt = (Math.random() + 0.5) * 0.1
            else
                part.sy = Math.min(-2, part.sy * (-0.5))
            part.y += part.sy
            part.x += part.sx
            part.opacity -= part.op
            part.scale.x += part.sc
            part.scale.y += part.sc
            part.rotation += part.rt
            return

        _.aaUpdateShatterEffect = () ->
            for part in @_aaMapSpriteEffects
                @_aaUpdateShatterEffectPartSprite(part)


        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------