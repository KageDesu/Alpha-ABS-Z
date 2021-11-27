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
    return this.isOnSameMap(servCommand) && KDCore.Utils.isSceneMap();
  };
  _.isOnSameMap = function(servCommand) {
    var mapId;
    ({mapId} = servCommand);
    return $gameMap.mapId() === mapId;
  };
  // * Собирает базовую команду для отправки на сервер
  _.createServCommand = function(content) {
    return {
      mapId: $gameMap.mapId(),
      actorId: ANGameManager.myActorId(),
      content
    };
  };
  _.packMapChar = function(character) {
    var e;
    if (character == null) {
      return null;
    }
    try {
      if (character === $gamePlayer) {
        return ANNetwork.myId();
      } else if (character instanceof Game_Event) {
        return character.eventId();
      } else if (character instanceof NETCharacter) {
        return character.id;
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null; // * Unknown
  };
  _.unpackMapChar = function(netId) {
    var e;
    try {
      if (netId == null) {
        return null;
      }
      if (isFinite(netId)) {
        return $gameMap.event(netId);
      } else {
        if (netId === ANNetwork.myId()) {
          return $gamePlayer;
        } else {
          return $gameMap.networkCharacterById(netId);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null;
  };
  return _.loadExtensions = function() {
    var __alias_ANPM_bar, _alias_GCB_fillNetworkObserver, _alias_nAPI_onCustomCommandABSZ;
    if (Imported.Alpha_NETZ !== true) {
      return;
    }
    this.SetupNETCharacter(); // 3_NETCharacter_AA.coffee
    
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
    _alias_GCB_fillNetworkObserver = Game_CharacterBase.prototype._fillNetworkObserver;
    Game_CharacterBase.prototype._fillNetworkObserver = function() {
      _alias_GCB_fillNetworkObserver.call(this);
      this.aaFillNetworkDataObserver();
    };
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
