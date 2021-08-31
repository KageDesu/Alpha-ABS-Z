// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__list, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this.aaInitExtraParams();
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