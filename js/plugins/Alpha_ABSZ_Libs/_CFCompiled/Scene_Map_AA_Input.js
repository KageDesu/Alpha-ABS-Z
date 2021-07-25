// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Левой)
    // -----------------------------------------------------------------------
    // * ТОЛЬКО левая кнопка мыши
    _.onMapTouchAA = function() {
      //TODO: $gamePlayer.canBeControlled() ??? Надо или нет???
      // * Если игрок в режиме выбора зоны навыка, то активация навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetSelected();
      } else {
        // * Новая система (без выбора целей)
        // * Обновим поиск цели под курсором
        this.aaRefreshMouseDetection();
        if ($gameTemp._aaEventUnderCursor != null) {
          // * Нажатие по цели
          this._aaOnTouchOnTarget();
        } else {
          // * Нажатие по карте (просто)
          this._aaOnTouchOnMapBasic();
        }
      }
    };
    _._aaOnTouchOnTarget = function() {
      var char, mode;
      if (AA.isDEV()) {
        char = $gameTemp._aaEventUnderCursor;
        window.__selected = char;
        if (char != null) {
          "SELECTED ON MAP".p(char.AABattler().name());
        }
      }
      mode = AA.Input.LMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack01(false);
          break;
        case 1: // * DEFAULT (move)
          _.ALIAS__onMapTouch.call(this);
          break;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack01(true); // * 3, TURN
          break;
        default:
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
      }
    };
    _._aaOnTouchOnMapBasic = function() {
      var mode;
      mode = AA.Input.LMBMapTouchMode;
      if (mode === 0) { // * ATTACK ONLY
        $gamePlayer.aaPerformPlayerAttack01(false);
      } else if (mode === 1) { // * DEFAULT (move)
        _.ALIAS__onMapTouch.call(this); // mode == 2
      } else {

      }
    };
    // TODO: Пока только события собирает
    // * NOTHING, ничего
    _.aaGetABSEntityInPosition = function(point) {
      var e, events;
      try {
        events = $gameMap.eventsXyAA(point.x, point.y);
        if (events.length > 0) {
          return events.first();
        }
      } catch (error) {
        e = error;
        AA.w;
      }
      return null;
    };
    return _.aaOnClickOnABSCharacter = function(char) {
      var e;
      try {
        $gamePlayer.aaTrySetTarget(char);
        //? DEBUG ONLY
        if (AA.isDEV()) {
          window.__selected = char;
          if (char != null) {
            return "SELECTED ON MAP".p(char.AABattler().name());
          }
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Правой)
    // -----------------------------------------------------------------------
    // * Если вернуть true - то меню НЕ будет показано
    _.onMapCancelTouchAA = function() {
      var isNotShowMenu;
      // * Отмена выбора зоны поражения навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetCancel();
        return true;
      }
      if (AA.UI.isAnyUIElementTouchProcess()) {
        // * инвернтарь, Hot бар и т.д.
        return true;
      }
      // * Новая система (без выбора целей)
      // * Обновим поиск цели под курсором
      this.aaRefreshMouseDetection();
      if ($gameTemp._aaEventUnderCursor != null) {
        // * Нажатие по цели
        isNotShowMenu = this._aaOnCancelTouchOnTarget();
      } else {
        // * Нажатие по карте (просто)
        isNotShowMenu = this._aaOnCancelTouchBasic();
      }
      return isNotShowMenu;
    };
    _._aaOnCancelTouchOnTarget = function() {
      var mode;
      mode = AA.Input.RMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 1: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack02(true);
          return true;
        case 3: // TURN
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
          return true; // * 4, MENU
        default:
          return false;
      }
    };
    return _._aaOnCancelTouchBasic = function() {
      var mode;
      mode = AA.Input.RMBMapTouchMode;
      switch (mode) {
        case 0: // * Menu
          return false; // * false - значит меню будет открыто
        case 1: // * Attack Secondary
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 2: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 3: // * Turn
          $gamePlayer.turnTowardCharacter(TouchInput.toMapPoint());
          return true; // * Nothing
        default:
          return true;
      }
    };
  })();
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------
