#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    _._aaSetupExtraInfo = ->
        return unless @isABSEntity()
        # * Игрок не имеет дополнительной информации
        return if @isPlayer()
        @_characterAASettings = @_character.AAEntity().model()
        return unless @_characterAASettings?
        @_aaSetupMiniHpGauge()
        return

    _._aaSetupMiniHpGauge = ->
        return unless AA.PP.getMiniHpGaugeSettings().active
        #if @_characterAASettings. #TODO: settings
        @aaMiniHPGauge = new AA.Sprite_CharacterMiniGauge()
        @aaMiniHPGauge.setupController(@_character.AABattler(), "hpRate")
        if AA.PP.getMiniHpGaugeSettings().showOnlyOnHover is true
            @_aaMiniHpShowHideOnHover = true
            @aaMiniHPGauge.hideInstant()
        @addChild @aaMiniHPGauge

    _._aaRefreshExtraInfoState = ->
        # * Использую как флаг, что у спрайта есть АБС персонаж
        return unless @_characterAASettings?
        return unless @_aaMiniHpShowHideOnHover
        if $gameTemp._aaEventUnderCursor?
            if $gameTemp._aaEventUnderCursor == @_character
                @aaMiniHPGauge.showSlow()
            else
                @aaMiniHPGauge.hideSlow()
        else
            @aaMiniHPGauge.hideSlow()
        return

    _._aaRefreshExtraInfoOnDamage = ->
        return unless @aaMiniHPGauge?
        @aaMiniHPGauge.refreshValues()
        # * Если всегда видно, то нет смысла
        return if AA.PP.getMiniHpGaugeSettings().showOnlyOnHover is false
        # * Только если опция включена
        return unless AA.PP.getMiniHpGaugeSettings().showOnDamage
        @aaMiniHPGauge.showAndHide()
        return


    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------