// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    "TEST FLOAT SKILL WINDOW".p();
    //TODO: Ширина и высота из параметров
    this.fwss = new FWindow_SkillSelect(this, 160, 400);
    window._w = this.fwss;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------
