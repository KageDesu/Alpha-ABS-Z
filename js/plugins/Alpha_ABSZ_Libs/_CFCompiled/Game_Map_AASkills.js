// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    // * Храним все навыки на карте
    this._aaMapSkills = [];
    $gameTemp.aaProjYOff = $gameMap.tileWidth() * 0.25;
    ALIAS__setup.call(this, mapId);
  };
  _.aaMapSkills = function() {
    return this._aaMapSkills;
  };
  // * Инициализировать (создать объект) навык на карте
  _.startAASkill = function(aaSkill, subject, targetPoint) {
    var mapSkill;
    if (aaSkill == null) {
      return;
    }
    //TODO: Возможно не надо полный навык хранить, а только ID из базы
    mapSkill = new AASkill2MapAction(aaSkill, subject, targetPoint);
    this._registerNewAASkill(mapSkill);
  };
  // * Добавить навык
  _._registerNewAASkill = function(skill) {
    var i, index, j, ref;
    index = 0;
    for (i = j = 0, ref = this._aaMapSkills.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (this._aaMapSkills[i] == null) {
        index = i;
        break;
      }
    }
    this._aaMapSkills[index] = skill;
    "PROJECTILE REGISTRED ON MAP".p(index);
    $gameMap.spriteset().aaCreateNewMapSkill(index);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------