// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Sprite_Weapon.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    var ref;
    ALIAS__update.call(this);
    if ((ref = this._aaOpChanger) != null) {
      ref.update();
    }
  };
  //$[OVER]
  //TODO: setting for user
  _.animationWait = function() {
    return 6;
  };
})();

// ■ END Sprite_Weapon.coffee
//---------------------------------------------------------------------------
