#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    
    # * Эффект Shatter на карте
    # -----------------------------------------------------------------------
    do ->

        _.aaCreateShatterEffect = (characterSprite) ->
            char = characterSprite._character
            effectBase = new Sprite()
            @_tilemap.addChild effectBase
            @aaRegisterDynamicSprite(
                effectBase,
                char,
                -characterSprite.width / 2,
                -characterSprite.height
            )
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
                @_aaCreateShatterPartAnimation(
                    shatterEffectsSet[i],
                    char._aaShatterEffectData[3],
                    char._aaShatterEffectData[4]
                )
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
            return unless part?
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
                if part.opacity <= 0
                    @_aaDeleteShatterEffectPartSprite(part)
                    # * Выход из цикла, так как удалили элемент
                    return
            return

        _._aaDeleteShatterEffectPartSprite = (part) ->
            # * Смотрим родителя
            parent = part.parent
            parent.removeChild(part)
            # * Если у него больше нет частей
            if parent.children.length == 0
                # * Удаляем его из динамических спрайтов
                @_aaMapDynamicSprites.delete(parent)
            @_aaMapSpriteEffects.delete(part)
            return

        return

    
    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------