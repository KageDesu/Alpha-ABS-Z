#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    _._aaUpdateSpriteEffects = ->
        @_aaUpdateSpriteEffectValues()
        if @_character.aaIsShakeRequested()
            @_aaUpdateSpriteShakeEffect()
        if @_character.aaIsShatterRequested()
            #@_aaStartSpriteShatterEffect()
            $gameMap.spriteset().aaCreateShatterEffect(@)
            #@_character._aaShatterEffectData[0] = false
            @_character.aaOnShatterEffectCreated()
        @_aaUpdateSpriteShatterEffect() if @_aaShatterParts?
        return

    # * Применение дополнительных значений к базовым
    _._aaUpdateSpriteEffectValues = ->
        @x += @_character.aaMotionDX()
        return

    _._aaUpdateSpriteShakeEffect = ->
        @_character._aaShakeEffectData[0] -= 1
        remainingTime = @_character._aaShakeEffectData[0]
        @_character._aaShakeEffectData[1] +=
            Math.round(remainingTime * 0.4 * Math.cos(remainingTime))
        if @_character._aaShakeEffectData[0] <= 0
            # * Возвращаем на 0, когда время вышло
            @_character._aaShakeEffectData[1] = 0
        return

    _._aaStartSpriteShatterEffect = ->
        @_aaCreateShatterEffectContainer() unless @_aaShatterEffectContainer?
        if !@_aaShatterParts? || @_character._aaShatterEffectData[2] is true
            @_aaCreateShatterEffectParts()
        return

    _._aaUpdateSpriteShatterEffect = ->
        for part in @_aaShatterParts
            continue unless part?
            @_aaUpdateShatterEffectPart(part)
            @_aaShatterEffectContainer.removeChild(part) if part.opacity <= 0
        # * Прячем спрайт персонажа
        @setFrame(0, 0, 0, 0)
        return

    _._aaCreateShatterEffectContainer = ->
        @_aaShatterEffectContainer = new Sprite()
        @addChild @_aaShatterEffectContainer

    _._aaCreateShatterEffectParts = ->
        # * Убираем флаг, что требуется создание частей
        @_character._aaShatterEffectData[2] = false
        # * Удаляем существующие части
        @_aaClearShatterEffectParts() if @_aaShatterParts?
        x = @_character._aaShatterEffectData[3]
        y = @_character._aaShatterEffectData[4]
        @_character._priorityType = 2
        @_character._through = true
        @_aaShatterParts = []
        pSize = 8
        pw = @patternWidth()
        ph = @patternHeight()
        maxw = Math.floor((pw / pSize) * (ph / pSize))
        if @_tileId > 0
            sx = (Math.floor(@_tileId / 128) % 2 * 8 + @_tileId % 8) * pw
            sy = Math.floor(@_tileId % 256 / 8) % 16 * ph
        else
            sx = (@characterBlockX() + @characterPatternX()) * pw
            sy = (@characterBlockY() + @characterPatternY()) * ph
        for i in [0...maxw]
            @_aaShatterParts[i] = new Sprite(@bitmap)
            @_aaShatterParts[i].anchor.set(0.5)
            l = Math.floor(pSize * i / pw)
            x = pSize * i - (l * pw)
            y = Math.floor(l * pSize)
            y_perc = pSize * (i + 1) / Math.floor(pw / pSize) / ph
            y3 = Math.floor(l * pSize)
            y = ph - pSize if y >= ph - pSize
            sx2 = sx + x
            sy2 = Math.floor(sy + y)
            @_aaShatterParts[i].x = x
            @_aaShatterParts[i].y = y
            @_aaShatterParts[i].y_perc = y_perc
            @_aaShatterParts[i].setFrame sx2, sy2, pSize, pSize
            @_aaShatterEffectContainer.addChild @_aaShatterParts[i]
            @_aaShatterParts[i].an = [0, 0, 0]
            unless @_character._aaShatterEffectData[1][i]?
                @_aaCreateShatterPartAnimation(i)
            else
                "LOAD".p()
                #TODO: load
        @_aaShatterEffectContainer.x = -@width / 2
        @_aaShatterEffectContainer.y = -@height
        return

    _._aaClearShatterEffectParts = ->
        return unless @_aaShatterParts?
        return unless @_aaShatterEffectContainer?
        for i in [0...@_aaShatterParts.length]
            part = @_aaShatterParts[i]
            @_aaShatterEffectContainer.removeChild(part)
            part.bitmap = null
            @_aaShatterParts[i] = null
            @_character._aaShatterEffectData[1][i] = null
        @_aaShatterParts = null
        return

    _._aaCreateShatterPartAnimation = (index) ->
        @_character._aaShatterEffectData[1][index] = []
        x = @_character._aaShatterEffectData[3]
        y = @_character._aaShatterEffectData[4]
        sx = Math.random() * x + 0.1
        sy = (Math.random() * 0.3) + 0.7 * y
        r = Math.randomInt(2)
        sx *= -1 if r != 0
        @_aaShatterParts[index].sx = sx
        @_aaShatterParts[index].sy = sy
        @_aaShatterParts[index].op = (Math.random() * 2) + 2.0
        @_aaShatterParts[index].sc = 0
        @_aaShatterParts[index].rt = (Math.random() + 0.5) * 0.1
        return

    _._aaUpdateShatterEffectPart = (part) ->
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
    
    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------