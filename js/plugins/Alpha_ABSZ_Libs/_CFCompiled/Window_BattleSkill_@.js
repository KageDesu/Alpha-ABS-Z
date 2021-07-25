// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleSkill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__includes, _;
  //@[DEFINES]
  _ = Window_BattleSkill.prototype;
  // * Прячем ABS навыки из битвы со специальным флагом hideOutsideABS == 1
  //@[ALIAS]
  ALIAS__includes = _.includes;
  _.includes = function(item) {
    var isInclude;
    isInclude = ALIAS__includes.call(this, item);
    if (isInclude === true) {
      if (AA.Utils.isAASkill(item)) {
        if (item.AASkill.hideOutsideABS === 1) {
          return false;
        }
      }
    }
    return isInclude;
  };
})();

// ■ END Window_BattleSkill.coffee
//---------------------------------------------------------------------------
