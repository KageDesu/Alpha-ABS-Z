// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateSelfMovement, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //TODO: Параметр, может ли враг двигаться диагонально

  // * Сохраняем базовые настройки движения события
  _.aaStoreMoveData = function() {
    var i, item, len, ref;
    // * Выполняется один раз, при первой инициализации
    if (this._storedMoveData != null) {
      return;
    }
    this._storedMoveData = {};
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this._storedMoveData[item] = this[item];
    }
  };
  // * Восстанавливаем базоыве настройки движения события
  _.aaRestoreMoveData = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  
  // * Восстановить базовую скорость движения события
  _.aaResetDefaultFreqAndSpeed = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  // * Сохранить текущую координату как точка "дом"
  _.aaStoreHomePoint = function() {
    this.homePoint = {
      x: this.x,
      y: this.y
    };
  };
  _.aaResetHomePoint = function() {
    return this.homePoint = null;
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
  
  // * AI Free State управляет этим процессом (начинает и завершает)
  _.aaSetMoveTypeReturnToHomePoint = function() {
    var e;
    try {
      if (this._moveType === 93) {
        return;
      }
      if (this.homePoint == null) {
        return;
      }
      return this._moveType = 93;
    } catch (error) {
      //returnMoveData[F, S]
      //TODO:
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeApproachTarget = function() {
    var e, params;
    try {
      if (this._moveType === 91) {
        return;
      }
      // * Быстрая проверка, что есть цель
      if (!this.AAEntity().inBattle()) {
        return;
      }
      // * Approach target
      this._moveType = 91;
      params = this.AAModel().approachMoveData;
      if (this.distTo(this.AAEntity().getTarget()) >= params[0]) {
        this.setMoveFrequency(params[1]);
        return this.setMoveSpeed(params[2]);
      } else {
        return this.aaResetDefaultFreqAndSpeed();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeKeepBattleDistance = function() {
    var e, params;
    try {
      if (this._moveType === 92) {
        return;
      }
      if (!this.AAEntity().inBattle()) {
        return;
      }
      this._moveType = 92;
      params = this.AAModel().inBattleMoveData;
      this.setMoveFrequency(params[1]);
      this.setMoveSpeed(params[2]);
      this._aaMinPatrolDist = params[0];
      this._aaMaxPatrolDist = this.AAModel().viewRadius;
      return this._aaCanMakeRandomPatrolMove = params[3];
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Все эти режимы движения, не имеют собственной логики окончания (выхода из режима)
  _.aaUpdateSelfMovementForAI = function() {
    if (!this._locked && !this.isMoving() && this.isNearTheScreen()) {
      switch (this._moveType) {
        case 91: // * Approach target
          this.aaMoveTypeToTarget(); //TODO: Пока просто к игроку
          break;
        case 92:
          this.aaMoveTypeKeepDistance();
          break;
        case 93:
          "HOME ".p();
          if (this.homePoint != null) {
            this.aaMoveTypeToPoint(this.homePoint);
          } else {
            this.aaRestoreMoveData();
          }
          break;
      }
    }
  };
  // * Держать дистанцию боя
  // * Не подходить близко и не отходить далеко
  // * NOTHING
  // Просто стоим
  _.aaMoveTypeKeepDistance = function() {
    var distance, e, target;
    try {
      // * Если меньше 0, то ничего
      if (this._aaMinPatrolDist <= 0) {
        this.aaTurnTowardTarget();
        return;
      }
      target = this.AAEntity().getTarget();
      distance = this.distTo(target);
      if (distance >= this._aaMaxPatrolDist) {
        "DIST > MAX".p();
        this.aaMoveTypeToTarget(target);
        return;
      }
      if (distance <= this._aaMinPatrolDist) {
        "DIST <= MIN".p();
        this.moveAwayFromCharacter(target);
        this.aaTurnTowardTarget();
        return;
      }
      if (this._aaCanMakeRandomPatrolMove) {
        "RAND MOVE".p();
        this.moveRandom();
        this.aaTurnTowardTarget();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
