// Generated by CoffeeScript 2.6.1
//TODO: переместить в A_CORE или KDCOre

//TODO: см метод hitIndex в Window_Selectable - Там конверт глобал координат в локальные простой

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (AA.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

(function() {  //TODO: NOT USED YET
  // * Shake effect to Sprite
  // * NOTHING
  var ALIAS__update, _;
  _ = KDCore.Sprite.prototype;
  _.startShake = function(frames) {
    //"START SHAKE".p()
    // * Создаём данные о движении
    this._shakeData = [frames, this.x, this.y];
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._shakeData != null) {
      return this._updateShakeEffect();
    }
  };
  _._updateShakeEffect = function() {
    var remainingTime, shakeX;
    // * Отсчёт
    this._shakeData[0]--;
    //console.log(@_shakeData[0])
    remainingTime = this._shakeData[0];
    // * Пока только по X
    shakeX = Math.round(remainingTime * 0.4 * Math.cos(remainingTime));
    this.x += shakeX;
    if (remainingTime <= 0) {
      this._endShake();
    }
  };
  _._endShake = function() {
    // * Возвращаем начальные значения
    this.x = this._shakeData[1];
    //@y = @_shakeData[2]
    // * Удаляем данные о движении
    this._shakeData = null;
  };
})();

(function() {  // * Draggable sprite
  //? KDCore.Sprite extension
  var ALIAS__update, _;
  _ = KDCore.Sprite.prototype;
  _.setDraggable = function(_isDragActive) {
    this._isDragActive = _isDragActive;
    if (this._isDragActive === true) {
      return this._updateDragging = this._updateDraggingActive;
    } else {
      if (this.isDragging()) {
        this.resetDrag();
      }
      return this._updateDragging = function() {}; // * EMPTY
    }
  };
  _.isDraggable = function() {
    return this._isDragActive === true;
  };
  _.activateDrag = function() {
    $gameTemp._kdDragSprite = this;
    this._dragging = true;
    this._lastTouchPosition = TouchInput.toPoint();
    this._deltaXY = this.toPoint().delta(this._lastTouchPosition);
    if (this.dragStartHandler != null) {
      return this.dragStartHandler();
    }
  };
  _.resetDrag = function() {
    this._dragging = false;
    if (!this._lastTouchPosition.isSame(TouchInput.toPoint())) {
      if (this.dragEndHandler != null) {
        this.dragEndHandler();
      }
    }
    if ($gameTemp._kdDragSprite === this) {
      $gameTemp._kdDragSprite = null;
    }
    this._lastTouchPosition = null;
  };
  _.isDragging = function() {
    return this._dragging === true;
  };
  _.setOnDragEnd = function(dragEndHandler) {
    this.dragEndHandler = dragEndHandler;
  };
  _.setOnDragStart = function(dragStartHandler) {
    this.dragStartHandler = dragStartHandler;
  };
  _.setOnDrag = function(dragProcessHandler) {
    this.dragProcessHandler = dragProcessHandler;
  };
  _.isCanStartDragging = function() {
    return true;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this._updateDragging();
  };
  //?DYNAMIC
  _._updateDragging = function() {}; // * DUMMY
  _._updateDraggingActive = function() {
    if (this.isDragging()) {
      return this._updateDraggingProcess();
    } else {
      if ($gameTemp._kdDragSprite != null) {
        return;
      }
      if (TouchInput.isPressed() && this.isCanStartDragging()) {
        if (this.isUnderMouse()) {
          return this.activateDrag();
        }
      }
    }
  };
  _._updateDraggingProcess = function() {
    if (TouchInput.isPressed()) {
      if (!KDCore.Utils.isPointInScreen(TouchInput)) {
        return;
      }
      this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
      if (this.dragProcessHandler != null) {
        return this.dragProcessHandler();
      }
    } else {
      return this.resetDrag();
    }
  };
})();
