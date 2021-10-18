// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var uAPI;

uAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //TODO: Execute SAction (global)

  //@[DEFINES]
  _ = uAPI;
  (function() {    // * Панель навыков
    // -----------------------------------------------------------------------
    // * Добавить навык на панель навыков
    // * 0 - убрать из слота
    // * slotSymbol == null - в любое не занятое место
    _.setSkillToPanel = function(skillId, slotSymbol) {
      var e, ref, ref1, ref2;
      try {
        if (skillId <= 0) { // * Удаляем навык из панели
          if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
            if ((ref = $gamePlayer.aaSkillsSet) != null) {
              ref.setSymbolForSkill(0, slotSymbol, null); // * Устанавливаем навык на панель
            }
          }
        } else {
          // * Если НАВЫК, то должен быть изучен
          if (AA.Utils.isAASkill(skillId)) {
            if (!$gamePlayer.aaIsHaveABSSkill(skillId)) {
              return;
            }
          }
          // * Предметы можно устанавливать, даже если нет в инвентаре (будет 0)
          if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
            if ((ref1 = $gamePlayer.aaSkillsSet) != null) {
              ref1.setSymbolForSkill(skillId, slotSymbol, null); // * Если символ не указан (или указан неверно, то устанавливаем в свободное место)
            }
          } else {
            if ((ref2 = $gamePlayer.aaSkillsSet) != null) {
              ref2.setSkillInEmptySlot(skillId);
            }
          }
        }
        AA.UI.refreshElement('skills');
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Добавить предмет на панель навыков, поддерживает как обычные ID, так и idA
    _.setItemToPanel = function(itemId, slotSymbol) {
      var e;
      try {
        // * Автоматическое преобразование в ID предмета
        if (itemId > 0 && !AA.Utils.isAAItem(itemId)) {
          itemId += AA.Utils.ItemsIDStart;
        }
        this.setSkillToPanel(itemId, slotSymbol);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Если навыка нет или неверно указан slotSymbol - будет возвращён 0
    return _.getSkillIdFromPanel = function(slotSymbol) {
      var ref;
      return (ref = $gamePlayer.aaSkillsSet) != null ? ref.getSkillForSymbol(slotSymbol) : void 0;
    };
  })();
  (function() {    // * Система АБС
    // -----------------------------------------------------------------------
    _.pauseABS = function() {
      return AA.System.pauseABS();
    };
    return _.resumeABS = function() {
      return AA.System.resumeABS();
    };
  })();
  (function() {    // * Интерфейс АБС
    // -----------------------------------------------------------------------
    _.editUI = function() {
      var e;
      try {
        if (AA.isMap()) {
          return SceneManager.push(AA.Scene_UIEditor);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.controlUIElement = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        user.set(...arguments);
        return AA.UI.refreshElement(arguments[0]);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showUI = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        // * Просто удаляем настройки, так как по умолчанию интерфейс всегда видно
        // * других настроек у интерфейса нету
        user.set("main", "clear");
        return AA.UI.show();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Кнопки нажимаются напанели, даже если скрытый интерфейс
    //TODO: Надо метод isValid дополнить (который в AA.UI) и делать проверки
    _.hideUI = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        user.set("main", "setVisible", false);
        return AA.UI.hide();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Этот метод добавить в SActions !!!
    //TODO: show on map point, show on screen point
    _.showPopUpOnChar = function(charId, styleId, value, isVariable) {
      var char, e, settings;
      try {
        if (!KDCore.Utils.isSceneMap()) {
          return;
        }
        if (value > 0 && isVariable === true) {
          value = $gameVariables.value(value);
        }
        if (charId === 0) {
          char = $gamePlayer;
        } else {
          char = $gameMap.event(charId);
        }
        settings = AA.PP.getPopUpDamageSettings(styleId);
        if (settings == null) {
          AA.w("PopUp settings with ID " + styleId + " not found!");
        } else {
          Sprite_AADamagePopUpItem.CreateOnCharacterBinded(char, settings, value);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Доделать и надо Wiki страницу и демку карту с примерами
    _.showPopUpOnMap = function() {};
    return _.showPopUpOnScreen = function() {};
  })();
  (function() {    // * Камера
    // -----------------------------------------------------------------------
    // * Активировать скролл камеры
    _.enableMapScroll = function() {
      var e;
      try {
        Scene_Map.prototype.aaUpdateMapScrlByMouse = Scene_Map.prototype.aaUpdateMapScrlByMouseBody;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Отключить скролл камеры
    _.disableMapScroll = function() {
      var e;
      try {
        if ($gameTemp.aaIsMapScrolled()) {
          this.resetMapScroll();
        }
        Scene_Map.prototype.aaUpdateMapScrlByMouse = function() {}; // * EMPTY
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Сбросить скролл камеры (на центр - игрок)
    return _.resetMapScroll = function() {
      var e;
      try {
        $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
        $gameTemp.aaSetMapScrolled(false);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // * Управление объектами
    // -----------------------------------------------------------------------
    // * Получить опыт за врага по номеру в БД (isVisible == true -> PopUp)
    _.gainExpForEnemyDb = function(enemyId, isVisible = true) {
      var e, enemy, expValue;
      try {
        enemy = $dataEnemies[enemyId];
        if (enemy == null) {
          return;
        }
        expValue = AA.Utils.getExpFromAAEnemy(enemy);
        $gameParty.aaGainExpForParty(expValue, isVisible);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Получить опыт за врага по номеру события
    return _.gainExpForEnemyEv = function(eventId, isVisible = true) {
      var e, event, expValue, expVarId;
      try {
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        // * Событие не АБС и не было АБС ранее
        if (event.aaEventSettings == null) {
          return;
        }
        // * Если есть специальная переменная для опыта, сразу из неё
        expVarId = event.aaEventSettings.getExpVarId();
        if (expVarId > 0) {
          expValue = $gameVariables.value(expVarId);
          $gameParty.aaGainExpForParty(expValue, isVisible);
        } else {
          this.gainExpForEnemyDb(event.aaEventSettings.getEnemyId());
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
  (function() {    
    // * Навыки
    // -----------------------------------------------------------------------
    _.executeAASkillOnMap = function(skillId, x, y) {};
    //TODO: Выполнить АА навык на карте
    return _.executeAASkillOnChar = function(skillId, charId) {};
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
//TODO: Выполнить АА навык на объекте
