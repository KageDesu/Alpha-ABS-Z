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
            @_aaStartSpriteShatterEffect()
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
        $gameMap.spriteset().aaCreateShatterEffect(@)
        @_character.aaOnShatterEffectCreated()
        return
    
    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------