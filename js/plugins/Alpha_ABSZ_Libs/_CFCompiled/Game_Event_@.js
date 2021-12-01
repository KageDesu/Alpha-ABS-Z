// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__isCollidedWithEvents, ALIAS__list, ALIAS__updateSelfMovement, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this.aaInitExtraParams();
  };
  //@[ALIAS]
  ALIAS__isCollidedWithEvents = _.isCollidedWithEvents;
  _.isCollidedWithEvents = function(x, y) {
    var events;
    // * АИ не учитывает события, которые выше или ниже по приоритету
    if (this.isABS()) {
      // * Собираем события в точке X, Y, которые с Normal Priority
      events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
        return ev.isNormalPriority();
      });
      if (events.length <= 0) {
        // * Если таковых нет, то проходим (ниже и выше не учитываем)
        return false;
      }
      return this.isNormalPriority(); // * Если есть, то TRUE, если это событие тоже Normal Priority
    } else {
      return ALIAS__isCollidedWithEvents.call(this, x, y);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateSelfMovement = _.updateSelfMovement;
  _.updateSelfMovement = function() {
    if (this._moveType > 3) {
      return this.aaUpdateSelfMovementForAI();
    } else {
      return ALIAS__updateSelfMovement.call(this);
    }
  };
  (function() {})();  
    // * Система анимации XAnima
  // -----------------------------------------------------------------------
  (function() {    // -----------------------------------------------------------------------

    // * Система AAEntity
    // -----------------------------------------------------------------------
    var ALIAS__clearPageSettings, ALIAS__setupPage;
    //@[ALIAS]
    ALIAS__setupPage = _.setupPage;
    _.setupPage = function() {
      ALIAS__setupPage.call(this);
      this.aaCheckABSEventState();
      this.aaCheckExtraParams();
    };
    //@[ALIAS]
    ALIAS__clearPageSettings = _.clearPageSettings;
    _.clearPageSettings = function() {
      ALIAS__clearPageSettings.call(this);
      if (this.isABS()) {
        return this.clearABS();
      }
    };
  })();
  // -----------------------------------------------------------------------

  //@[ALIAS]
  ALIAS__list = _.list;
  _.list = function() {
    var e, t;
    try {
      // * Вызов общего события, которое было bind к этому событию (SActions)
      if (this._aaExtraEventList != null) {
        t = this._aaExtraEventList;
        // * Один раз, поэтому зануляем
        this._aaExtraEventList = null;
        return [
          {
            // * Команда "Вызов Общего события" внутри этого события
            // * (Так можно использовать this. и есть _eventId)
            code: 117,
            indent: 0,
            parameters: [t]
          }
        ];
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return ALIAS__list.call(this);
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
