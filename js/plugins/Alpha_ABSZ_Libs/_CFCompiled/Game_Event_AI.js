// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.AAModel = function() {
    return this.AAEntity().model();
  };
  // * Изменить параметр AAModel у данного события
  _.aaChangeModelParam = function(paramName, newValue) {
    var e, log, model;
    try {
      if (!String.any(paramName)) {
        return;
      }
      model = this.AAModel();
      if (model == null) {
        return;
      }
      log = "Model param: " + paramName + " changed to " + newValue;
      log.p();
      return model[paramName] = newValue;
    } catch (error) {
      // * Надо может какой то метод что параметры были изменены?
      //TODO: some refresh or _convertParameters? on onParamsChanged?
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
