#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    # * Создать дополнительные спрайты для ABS системы
    _.initABS = ->
        @_aaSetupExtraInfo()
        @_aaSetupWeaponMotionSprite()

    _.isPlayer = -> @_character == $gamePlayer

    _.isABSEntity = -> @_character? and @_character.isABS() and @_character.AABattler()?

    _.isAllyParty = -> @isABSEntity() and @_character.AAEntity().isAlly()

    _.isEnemy = -> @isABSEntity() and @_character.AAEntity().isEnemy()

    _._aaUpdate = ->
        @_aaUpdateSelectionBlend()
        @_aaUpdateDamagePopUps()
        @_aaUpdateSpriteEffects()
        @_aaUpdateWeaponMotion()
        return

    _._aaUpdateDamagePopUps = ->
        return unless @isABSEntity()
        b = @_character.AABattler()
        return unless b.isDamagePopupRequested()
        data = AADamagePopUpFactory.createDamagePopUpData(b)
        if data?
            Sprite_AADamagePopUpItem.CreateOnCharacterBinded(@_character, data.settings, data.value)
            AANetworkManager.showDamagePopUpOnCharacter(@_character, data)
        @_aaRefreshExtraInfoOnDamage()
        b.clearDamagePopup()
        b.clearResult()
        return

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
            @_aaSelectBlendColor = KDCore.Color.FromHex($gamePlayer.activeAASkill().selectorColor)
            arr = [...@_aaSelectBlendColor.ARR]
            arr[3] = 150
            @_aaSelectBlendColor = arr
            # * Подключаем метод обновления
            @_aaUpdateSelectionBlend = @_aaUpdateSelectionBlendBody

    _.gev_onUnderMouseEventChanged = ->
        try
            @_aaRefreshExtraInfoState()
        catch e
            AA.w e


    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------