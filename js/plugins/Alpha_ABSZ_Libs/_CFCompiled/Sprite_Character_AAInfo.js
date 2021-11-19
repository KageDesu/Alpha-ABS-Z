// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //TODO: Тут стоит условие return unless @isABSEntity(), возможно если сначала событие было
  // * не АБС, а потом станет АБС, то не будет MiniHP Bar видно, проверить и исправить!
  _._aaSetupExtraInfo = function() {
    if (!this.isABSEntity()) {
      return;
    }
    // * Игрок не имеет дополнительной информации
    if (this.isPlayer()) {
      return;
    }
    this._characterAASettings = this._character.AAEntity().model();
    if (this._characterAASettings == null) {
      return;
    }
    this._aaSetupMiniHpGauge();
  };
  _._aaSetupMiniHpGauge = function() {
    if (!AA.PP.getMiniHpGaugeSettings().active) {
      return;
    }
    //if @_characterAASettings. #TODO: settings
    this.aaMiniHPGauge = new AA.Sprite_CharacterMiniGauge();
    this.aaMiniHPGauge.setupController(this._character.AABattler(), "hpRate");
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === true) {
      this._aaMiniHpShowHideOnHover = true;
      this.aaMiniHPGauge.hideInstant();
    }
    return this.addChild(this.aaMiniHPGauge);
  };
  _._aaRefreshExtraInfoState = function() {
    // * Использую как флаг, что у спрайта есть АБС персонаж
    if (this._characterAASettings == null) {
      return;
    }
    if (!this._aaMiniHpShowHideOnHover) {
      return;
    }
    if ($gameTemp._aaEventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor === this._character) {
        this.aaMiniHPGauge.showSlow();
      } else {
        this.aaMiniHPGauge.hideSlow();
      }
    } else {
      this.aaMiniHPGauge.hideSlow();
    }
  };
  _._aaRefreshExtraInfoOnDamage = function() {
    if (this.aaMiniHPGauge == null) {
      return;
    }
    this.aaMiniHPGauge.refreshValues();
    // * Если всегда видно, то нет смысла
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === false) {
      return;
    }
    // * Только если опция включена
    if (!AA.PP.getMiniHpGaugeSettings().showOnDamage) {
      return;
    }
    this.aaMiniHPGauge.showAndHide();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
