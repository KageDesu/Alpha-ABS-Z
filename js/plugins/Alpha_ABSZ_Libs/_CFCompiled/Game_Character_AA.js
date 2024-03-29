// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Методы ABS (Цель)
    // -----------------------------------------------------------------------
    _.AATarget = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.getTarget() : void 0;
    };
    //TODO: Это можно удалить

    // * Попытка установить активную цель
    _.aaTrySetTarget = function(target) {
      var ref;
      if (this.aaIsValidTargetToSet(target)) {
        if ((ref = this.AAEntity()) != null) {
          ref.setTarget(target);
        }
        return true;
      }
      return false;
    };
    
    // * Этот метод лучше переопределять у Game_Event и Game_Player
    _.aaIsValidTargetToSet = function(target) {
      return false;
    };
    // * Есть ли активная цель?
    return _.aaIsHaveTarget = function() {
      return this.AATarget() != null;
    };
  })();
  (function() {})();  
    // * Методы ABS (Навыки)
  // -----------------------------------------------------------------------
  (function() {    // * Методы ABS (Движение)
    // -----------------------------------------------------------------------
    return _.aaTurnTowardTouchInput = function() {
      return this.turnTowardCharacter(TouchInput.toMapPoint());
    };
  })();
  (function() {    
    // -----------------------------------------------------------------------

    // * Методы ABS (Бой и состояния)
    // -----------------------------------------------------------------------
    // * Когда какое-либо действие было выполненно на мне
    _.aaOnActionOnMe = function(action) {};
    // * Когда персонаж повержен
    // * Отличается от aaOnDeath так как тут надо давать бонусы победившему
    _.aaOnDefeat = function() {};
    // * Когда надо сменить состояние персонажа на Dead (вывести из АБС системы)
    return _.aaOnDeath = function() {};
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------
