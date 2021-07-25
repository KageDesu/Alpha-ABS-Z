// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.aaCreateMouseDetectionThread = function() {
    $gameTemp._aaEventUnderCursor = null;
    return this._aaMouseDetectThread = new KDCore.TimedUpdate(2, this.aaRefreshMouseDetection.bind(this));
  };
  _.aaUpdateMouseDetection = function() {
    return this._aaMouseDetectThread.update();
  };
  // * Этот метод отвечает за "сбор" событий и объектов под курсором
  _.aaRefreshMouseDetection = function() {
    var eventUnderCursor;
    eventUnderCursor = this.aaGetABSEntityInPosition(TouchInput.toMapPoint());
    if (eventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor !== eventUnderCursor) {
        $gameTemp._aaEventUnderCursor = eventUnderCursor;
        AA.EV.call("UnderMouseEventChanged");
      }
    } else {
      if ($gameTemp._aaEventUnderCursor != null) {
        $gameTemp._aaEventUnderCursor = null;
        AA.EV.call("UnderMouseEventChanged");
      }
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------
