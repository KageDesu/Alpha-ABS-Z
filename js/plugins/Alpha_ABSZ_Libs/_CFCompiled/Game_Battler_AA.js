// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  // * Все ABS навыки персонажа
  // У Actor и Enemy разные источники, поэтому метод тут не имеет тела
  _.getAASkills = function() {
    return [];
  };
  // * Все ABS предметы персонажа
  _.getAAItems = function() {
    return [];
  };
  // * ABS навыки, которые можно использовать в данный момент (включая предметы)
  _.getUsableAASkills = function() {
    return this.getAASkills().filter((skill) => {
      return this.canUse(skill);
    });
  };
  // * Когда совершили какое-либо АБС действие (навык)
  // * Не используется стандартный onAllActionsEnd, так как он очищает result
  _.onAAActionEnd = function() {
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------
//TODO: attackSkillId - метод у МЗ лучше, чем у МВ (там капец)