// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createActorUI = function() {
    return this._createActorGauges();
  };
  _._createActorGauges = function() {
    this.sActorGauges = new AA.UISet_ActorGauges(this);
    return this._registerUISet(this.sActorGauges); //# Spriteset_UI_0
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------
