// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAEnemyBattler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AAEnemyBattler.prototype;
  //$[OVER]
  _.dataObserverHaveChanges = function() {
    AANetworkManager.syncAAEnemyBattlerObserver(this.AACharacter(), this.getObserverDataForNetwork());
  };
})();

// ■ END AAEnemyBattler.coffee
//---------------------------------------------------------------------------