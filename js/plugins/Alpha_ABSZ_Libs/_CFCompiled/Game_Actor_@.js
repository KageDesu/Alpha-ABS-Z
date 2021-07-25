// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__performDamage, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__performDamage = _.performDamage;
  _.performDamage = function() {
    if (AA.isABSMap()) {
      if (this.isPlayer() && AA.PP.isShakeScreenWhenPlayerGetDamage()) {
        // * Стандартный метод (тряска экрана и звук)
        return ALIAS__performDamage.call(this);
      } else {
        // * Если не игрок, то нет тряски и звука
        return Game_Battler.prototype.performDamage.call(this);
      }
    } else {
      return ALIAS__performDamage.call(this);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------
