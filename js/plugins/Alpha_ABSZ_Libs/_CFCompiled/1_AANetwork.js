// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер сетевого режима (совместимость с Alpha NET Z)
AA.Network = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Network;
  _.NETCmdPrefix = "aabsz:";
  _.isNetworkGame = function() {
    return Imported.Alpha_NETZ === true && ANNetwork.isConnected();
  };
  _.isShouldIgnoreServerCommand = function(servCommand) {
    var actorId;
    ({actorId} = servCommand);
    return actorId === ANGameManager.myActorId();
  };
  _.isAvailableForVisual = function(servCommand) {
    var mapId;
    ({mapId} = servCommand);
    return $gameMap.mapId() === mapId && KDCore.Utils.isSceneMap();
  };
  // * Собирает базовую команду для отправки на сервер
  _.createServCommand = function(content) {
    return {
      mapId: $gameMap.mapId(),
      actorId: ANGameManager.myActorId(),
      content
    };
  };
  return _.loadExtensions = function() {
    var __alias_ANPM_bar, _alias_nAPI_onCustomCommandABSZ;
    // * Запускать АБС по готовности персонажа
    __alias_ANPM_bar = ANPlayersManager.bindActorResult;
    ANPlayersManager.bindActorResult = function(result) {
      __alias_ANPM_bar.call(this, ...arguments);
      if (!result) {
        return;
      }
      // * На всякий случай с задержкой
      setTimeout((function() {
        return AA.System.checkABSPlayerExists();
      }), 10);
    };
    _alias_nAPI_onCustomCommandABSZ = nAPI.onCustomCommand;
    nAPI.onCustomCommand = function(name) {
      _alias_nAPI_onCustomCommandABSZ.call(this, ...arguments);
      if (name.contains(AA.Network.NETCmdPrefix)) {
        AANetworkManager.onServerCommand(...arguments);
      }
    };
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
