// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__command126, ALIAS__command127, ALIAS__command128, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //TODO: Вынести это в отдельный плагин
  //TODO: change GOLD and visual notify (command125)

  // * Показывает Notify только когда игрок получает предмет именно через команду, а не
  // * через игровой процесс (смена экипировки и т.д.)

  //@[ALIAS]
  ALIAS__command126 = _.command126;
  _.command126 = function() {
    var r;
    r = ALIAS__command126.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
  //@[ALIAS]
  ALIAS__command127 = _.command126;
  _.command127 = function() {
    var r;
    r = ALIAS__command127.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
  //@[ALIAS]
  ALIAS__command128 = _.command126;
  _.command128 = function() {
    var r;
    r = ALIAS__command128.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------
