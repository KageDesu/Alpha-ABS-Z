#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    _.isPlayer = -> $gamePlayer.AAEntity().sprite() == @

    #TODO: this two methods

    _.isAllyParty = -> false

    _.isEnemy = -> false



    # * Если спрайт в зоне навыка, то подсвечивать его
    #?DYNAMIC
    _._aaUpdateSelectionBlend = -> # * DUMMY

    _._aaUpdateSelectionBlendBody = ->
        return unless $gameTemp._aaSkillSelectorTargets?
        if $gameTemp._aaSkillSelectorTargets.contains(@_character)
            @_aaSetSelectionBySkill()
        else
            @_aaResetSelectionBySkill()

    _._aaSetSelectionBySkill = ->
        # * Сохраняем оригинальный цвет
        unless @__originalBlend?
            @__originalBlend = @getBlendColor()
            console.info @__originalBlend
        @setBlendColor(@_aaSelectBlendColor)
        return

    _._aaResetSelectionBySkill = ->
        return unless @__originalBlend?
        @setBlendColor(@__originalBlend)
        @__originalBlend = null

    _.gev_onPlayerSkillSelector = ->
        unless $gamePlayer.isInSkillTargetingState()
            @_aaResetSelectionBySkill()
            # * Больше этот метод не будет работать
            @_aaUpdateSelectionBlend = ->
        else
            #TODO: Один раз цвет конвертировать и сохранять в $gameTemp
            @_aaSelectBlendColor = KDCore.Color.FromHex($gamePlayer.activeAASkill().color)
            arr = [...@_aaSelectBlendColor.ARR]
            arr[3] = 150
            console.info arr
            @_aaSelectBlendColor = arr
            # * Подключаем метод обновления
            @_aaUpdateSelectionBlend = @_aaUpdateSelectionBlendBody




    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------