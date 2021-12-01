// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер обработки (отправки) сетевых запросов
var AANetworkManager;

AANetworkManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AANetworkManager;
  (function() {    // * Методы (запросы - отправка на сервер, requests)
    // * ======================================================================
    // -----------------------------------------------------------------------
    // * В этих методах всегда много проверок, чтобы не загружать лишний раз севрер

    //TODO: В MV другой метод немного
    _.playAnimationOnCharacter = function(character, animationId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (animationId <= 0) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("playAnimationOnCharacter", {character, animationId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.playAnimationOnMap = function(x, y, animationId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (animationId <= 0) {
          return;
        }
        return this.sendToServer("playAnimationOnMap", {x, y, animationId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.showDamagePopUpOnCharacter = function(character, data) {
      var e, styleId, value;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (data == null) {
          return;
        }
        character = AA.Network.packMapChar(character);
        styleId = data.settings.id;
        value = data.value;
        return this.sendToServer("showDamagePopUpOnCharacter", {character, styleId, value});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShakeEffect = function(character, time) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestCharacterShakeEffect", {character, time});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShatterEffect = function(character, dx, dy) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestCharacterShatterEffect", {character, dx, dy});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestWeaponAnimation = function(battler, weaponImageId) {
      var character, e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = battler.AACharacter();
        if (character == null) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestWeaponAnimation", {character, weaponImageId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Смена состояния AnimaX (боевая стойка, кастинг, смерть и т.д.)
    // * Свой метод (у AnimaX 1.2 и ниже нету автосинхронизации на этот метод)
    _.animaXChangeState = function(newState, character) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (!String.any(newState)) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("animaXChangeState", {newState, character});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeSA = function(action, character) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("executeSA", {action, character});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Враги с eraseOnDead = 1 синхронизируются автоматически
    _.executeEraseOnDeadAAEvent = function(eventId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        return this.sendToServer("executeEraseOnDeadAAEvent", eventId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEntityObserver = function(character, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("syncAAEntityObserver", {character, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAIFlowMachineObserver = function(eventId, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        return this.sendToServer("syncAIFlowMachineObserver", {eventId, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    return _.syncAAEnemyBattlerObserver = function(character, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("syncAAEnemyBattlerObserver", {character, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // * Обработка методов ОТ сервера (responses)
    // * ======================================================================
    // -----------------------------------------------------------------------
    _.playAnimationOnCharacter_RESP = function(response) {
      var animationId, character, e;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, animationId} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return AABattleActionsManager.playAnimationOnCharacter(character, animationId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.playAnimationOnMap_RESP = function(response) {
      var animationId, e, x, y;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({x, y, animationId} = response.content);
        return AABattleActionsManager.playAnimationOnMap(x, y, animationId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.showDamagePopUpOnCharacter_RESP = function(response) {
      var character, data, e, ref, styleId, value;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, styleId, value} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        data = AADamagePopUpFactory._createFromSettings(styleId, value);
        if (data == null) {
          return;
        }
        Sprite_AADamagePopUpItem.CreateOnCharacterBinded(character, data.settings, data.value);
        // * Чтобы HP минибар обновился
        return (ref = character.AASprite()) != null ? ref._aaRefreshExtraInfoOnDamage() : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShakeEffect_RESP = function(response) {
      var character, e, time;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, time} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (character.aaIsShakeRequested()) {
          return;
        }
        if ((time != null) && time > 0) {
          return character != null ? character.aaRequestShakeEffect(time) : void 0;
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShatterEffect_RESP = function(response) {
      var character, dx, dy, e;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, dx, dy} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (character.aaIsShatterRequested()) {
          return;
        }
        return character.aaRequestShatterEffect(dx, dy);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestWeaponAnimation_RESP = function(response) {
      var character, e, ref, weaponImageId;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, weaponImageId} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AABattler()) != null ? ref.startWeaponAnimation(weaponImageId) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeSA_RESP = function(response) {
      var action, character, cmd, e, mapId, unpackedCharacter;
      try {
        ({mapId} = response);
        ({action, character} = response.content);
        cmd = action.split("_")[0];
        // * Self.Switch - своя обработка
        if (cmd === "ss") {
          // * Тут используется  запакованный персонаж (чтобы передать EVENT ID другой карты)
          return AA.SAaction.executeSelfSwitchActionFromNetwork(action, character, mapId);
        } else {
          // * Проверки определённых действий (только на карте и на сцене)
          if (["an", "ef", "ba", "se", "ev", "ce"].contains(cmd)) {
            if (!AA.Network.isAvailableForVisual(response)) {
              return;
            }
          }
          unpackedCharacter = AA.Network.unpackMapChar(character);
          return AA.SAaction.execute(action, unpackedCharacter);
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeEraseOnDeadAAEvent_RESP = function(response) {
      var e, event, eventId;
      try {
        // * Тут сцена не важна
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        eventId = response.content;
        if (eventId <= 0) {
          return;
        }
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        //TODO: Может проверку что это ABS событие?
        return event.erase();
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEntityObserver_RESP = function(response) {
      var character, e, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, observerData} = response.content);
        if (observerData == null) {
          return;
        }
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AAEntity()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAIFlowMachineObserver_RESP = function(response) {
      var e, event, eventId, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({eventId, observerData} = response.content);
        if (eventId <= 0) {
          return;
        }
        if (observerData == null) {
          return;
        }
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        if (event.isABS() == null) {
          return;
        }
        return (ref = event.AALogic()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEnemyBattlerObserver_RESP = function(response) {
      var character, e, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, observerData} = response.content);
        if (observerData == null) {
          return;
        }
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AABattler()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    return _.animaXChangeState_RESP = function(response) {
      var character, e, newState;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, newState} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (String.any(newState) == null) {
          return;
        }
        if (!character.isAnimX()) {
          return;
        }
        if (newState === 'base') {
          return character.resetXAnimaState();
        } else {
          return character.switchToXAnimaState(newState);
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  return (function() {    // * Общие методы отправки и приёма команд
    // * ======================================================================
    // -----------------------------------------------------------------------
    // * Обработка ответа (команды) от сервера (общий метод)
    _.onServerCommand = function(name, response) {
      var cmd, e, method;
      try {
        if (SceneManager.isSceneChanging()) {
          return;
        }
        if (AA.Network.isShouldIgnoreServerCommand(response)) {
          return;
        }
        // * Получить только имя команды (без префикса)
        cmd = name.replace(AA.Network.NETCmdPrefix, "");
        method = this[cmd + "_RESP"];
        if (method != null) {
          $gameTemp.aaIsLocalOnly = true;
          try {
            method(response);
          } catch (error) {
            e = error;
            AA.w(cmd, e);
          }
          return $gameTemp.aaIsLocalOnly = false;
        } else {
          return AA.w('Network: Handler for ' + cmd + ' not found');
        }
      } catch (error) {
        e = error;
        return AA.w(e, "onServerCommand");
      }
    };
    // * Отправка команды на сервер (общий метод)
    return _.sendToServer = function(cmd, content) {
      var e;
      try {
        if ($gameTemp.aaIsLocalOnly === true) {
          return;
        }
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (SceneManager.isSceneChanging()) {
          return;
        }
        // * Все команды только с карыт можно отправлять
        if (!KDCore.Utils.isSceneMap()) {
          return;
        }
        return nAPI.sendCustomCommand(AA.Network.NETCmdPrefix + cmd, AA.Network.createServCommand(content));
      } catch (error) {
        e = error;
        return AA.w(e, "sendToServer");
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
