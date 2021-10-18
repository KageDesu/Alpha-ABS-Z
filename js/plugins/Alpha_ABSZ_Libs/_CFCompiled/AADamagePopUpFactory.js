// Generated by CoffeeScript 2.5.1
// * Методы формирования Damage PopUp на персонаже
var AADamagePopUpFactory;

AADamagePopUpFactory = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AADamagePopUpFactory;
  _.createExpPopUpData = function(value, charToShowAbove) {
    var e, settings, valueText;
    try {
      valueText = AA.PP.getExpPopUpSettings().textFormat.replace("%1", value);
      settings = AA.PP.getExpPopUpSettings().styleId;
      return this._createFromSettings(settings, valueText);
    } catch (error) {
      e = error;
      AA.w(e);
      return null;
    }
  };
  _.createDamagePopUpData = function(battler) {
    var result;
    if (!AA.PP.isPopUpIsActive()) {
      // * Если отключены, то ничего не возвращяем
      return null;
    }
    result = battler.result();
    if (result.missed || result.evaded) {
      return this._createMiss();
    } else if (result.hpAffected) {
      return this._createHpDamage(result, battler.isEnemy());
    } else if (battler.isAlive() && result.mpDamage !== 0) {
      return this._createMpDamage(result);
    }
    return null; // * Нет ничего
  };
  _._createMiss = function() {
    return this._createFromSettings("Miss_For_All", AA.PP.getTextForPopUpMiss());
  };
  _._createFromSettings = function(styleId, value) {
    return {
      settings: AA.PP.getPopUpDamageSettings(styleId),
      value: value
    };
  };
  _._createHpDamage = function(result, isEnemy) {
    var isHeal, styleId, value;
    isHeal = result.hpDamage < 0;
    value = this._convertValue(result.hpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      if (isHeal === true) {
        return this._createFromSettings("Heal_For_All", value);
      } else {
        if (isEnemy) {
          styleId = "Damage_HP_For_Enemy";
        } else {
          styleId = "Damage_HP_For_Player";
        }
        if (result.critical) {
          styleId += "_Critical";
        }
        return this._createFromSettings(styleId, value);
      }
    }
  };
  _._createMpDamage = function(result) {
    var isHeal, value;
    isHeal = result.mpDamage < 0;
    value = this._convertValue(result.mpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      return this._createFromSettings("Damage_Other_For_All", value);
    }
  };
  // * Чтобы лечение было с +
  _._convertValue = function(value) {
    if (value >= 0) {
      return value;
    }
    value *= -1;
    return "+" + value;
  };
  // * Есть ли у навыка специальный пользовательский стиль урона?
  _._isHaveSpecialStyle = function(result) {
    var aaSkill;
    aaSkill = result.getUsedAASkill();
    return (aaSkill != null) && String.any(aaSkill.popUpStyleId);
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
