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
    return $gameTemp._aaCanReceiveVisualFromServer === true && this.isOnSameMap(servCommand) && KDCore.Utils.isSceneMap() && !SceneManager.isSceneChanging();
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
        return {
          type: 0,
          id: ANNetwork.myId()
        };
      } else if (character instanceof Game_Event) {
        return {
          type: 1,
          id: character.eventId(),
          mapId: $gameMap.mapId()
        };
      } else if (character instanceof NETCharacter) {
        return {
          type: 0,
          id: character.id
        };
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null; // * Unknown
  };
  _.unpackMapChar = function(packed) {
    var e;
    try {
      if (packed == null) {
        return null;
      }
      if (packed.type == null) {
        return null;
      }
      switch (packed.type) {
        case 0:
          if (packed.id === ANNetwork.myId()) {
            return $gamePlayer;
          } else {
            return $gameMap.networkCharacterById(packed.id);
          }
          break;
        case 1:
          if ($gameMap.mapId() === packed.mapId) {
            return $gameMap.event(packed.id);
          }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null;
  };
  return _.loadExtensions = function() {
    var __alias_ANPM_bar, _alias_GCB_fillNetworkObserver, _alias_SA_r, _alias_nAPI_onCustomCommandABSZ;
    if (Imported.Alpha_NETZ !== true) {
      return;
    }
    this.SetupNETCharacter(); // AA_Network/3_NETCharacter_AA.coffee
    
    // * Запускать АБС по готовности персонажа
    __alias_ANPM_bar = ANPlayersManager.bindActorResult;
    ANPlayersManager.bindActorResult = function(result) {
      __alias_ANPM_bar.call(this, ...arguments);
      if (!result) {
        return;
      }
      // * На всякий случай с задержкой
      AA.Utils.callDelayed(AA.System.checkABSPlayerExists.bind(AA.System), 10);
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
    // * Почему-то случается Game Crush при проигрывании анимаций по сети
    // * Не нашёл причину и решение, так что просто игнорируем
    _alias_SA_r = Sprite_Animation.prototype._render;
    Sprite_Animation.prototype._render = function() {
      var e;
      try {
        _alias_SA_r.call(this, ...arguments);
      } catch (error) {
        e = error;
        AA.w(e);
        this._render = function() {}; // * EMPTY
      }
    };
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
