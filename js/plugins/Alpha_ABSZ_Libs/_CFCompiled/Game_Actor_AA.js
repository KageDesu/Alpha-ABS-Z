// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //$[OVER]
  _.isPlayer = function() {
    return this === $gameParty.leader();
  };
  //$[OVER]
  _.getAASkills = function() {
    var attackSkillId, list;
    // * Включает атаку и защиту (базовые 1 и 2)
    //TODO: навык защиты надо тоже под АБС автоматически дорабатывать при загрузке
    attackSkillId = this.attackSkillId();
    list = this.skills().concat([$dataSkills[attackSkillId]]);
    // * Включает АБС предметы (так как они по сути тоже навыки)
    // * Используется метод $gameParty.items() для быстродействия, чтобы 2 раза не проверять
    list = list.concat($gameParty.items());
    return list.filter(function(skill) {
      return skill.AASkill != null;
    });
  };
  //$[OVER]
  _.getAAItems = function() {
    return $gameParty.items().filter(function(item) {
      return AA.Utils.isAAObject(item);
    });
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------
