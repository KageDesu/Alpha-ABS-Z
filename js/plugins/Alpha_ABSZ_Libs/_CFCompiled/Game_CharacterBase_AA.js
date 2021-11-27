// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Общие методы ABS
    // -----------------------------------------------------------------------
    // * Основной метод, является ли персонаж вообще ABS объектом
    // * Тут НЕЛЬЗЯ добавлять доп. проверку на AA.isABSActive()
    _.isABS = function() {
      return this.AAEntity() != null;
    };
    _.AAEntity = function() {
      return this.aaEntity;
    };
    _.initABS = function() {
      var ref, ref1;
      if ((ref = this.aaEntity) != null) {
        ref.initABS();
      }
      return (ref1 = this.AASprite()) != null ? ref1.initABS() : void 0;
    };
    // * Деактивировать АБС режим
    _.stopABS = function() {
      var ref;
      return (ref = this.aaEntity) != null ? ref.deactivate() : void 0;
    };
    // * Полностью отключить (очистить) АБС режим у персонажа
    _.clearABS = function() {
      return this.aaEntity = null;
    };
    _.AABattler = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.battler() : void 0;
    };
    _.AASprite = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.sprite() : void 0;
    };
    // * Логика АИ
    _.AALogic = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.logic() : void 0;
    };
    _.inBattle = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.inBattle() : void 0;
    };
    _.isActive = function() {
      var ref;
      return this.isABS() && ((ref = this.AAEntity()) != null ? ref.isActive() : void 0);
    };
    _.onTurnEnd = function() {};
    _.isMyEnemy = function(character) {
      if (!this.isABS()) {
        return false;
      }
      if (character == null) {
        return false;
      }
      if (!character.isABS()) {
        return false;
      }
      return this.AAEntity().isMyEnemy(character.AAEntity());
    };
    // * Логика АБС (только если АБС включена)
    _.aaUpdateABS = function() {
      var ref;
      this._aaUpdateDelayedSkillActions();
      if ((ref = this.AABattler()) != null) {
        ref.aaUpdateABS();
      }
      return this.aaUpdateForNetwork();
    };
    return _.aaUpdateForNetwork = function() {
      var ref;
      if (!AA.Network.isNetworkGame()) {
        return;
      }
      if (!ANGameManager.isMapMaster()) {
        return;
      }
      return (ref = this.AAEntity()) != null ? ref.updateDataObserver() : void 0;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Эффекты спрайта (тряска и прочее)
    // -----------------------------------------------------------------------
    _.aaClearCharacterEffects = function() {
      // * Первое значение - время
      // * Второе значение DX (отклонение по X)
      this._aaShakeEffectData = [0, 0];
      // * [Запрос, массив данных для сохранения, флаг что надо создать части, DX, DY]
      //TODO: Сохранение не используется пока что
      this._aaShatterEffectData = [false, [], true, 0, 0];
    };
    _.aaMotionDX = function() {
      return this._aaShakeEffectData[1];
    };
    _.aaRequestShakeEffect = function(time = 10) {
      this._aaShakeEffectData[0] = time;
      return AANetworkManager.requestCharacterShakeEffect(this, time);
    };
    _.aaIsShakeRequested = function() {
      return this._aaShakeEffectData[0] > 0;
    };
    _.aaIsShatterRequested = function() {
      return this._aaShatterEffectData[0] === true;
    };
    _.aaRequestShatterEffect = function(dx = 0.5, dy = -4) {
      this._aaShatterEffectData = [true, [], true, dx, dy];
      AANetworkManager.requestCharacterShatterEffect(this, dx, dy);
    };
    return _.aaOnShatterEffectCreated = function() {
      return this._aaShatterEffectData[0] = false;
    };
  })();
  // -----------------------------------------------------------------------

  // * Добавим MaxTp чтобы Gauge контроллеры работали
  Object.defineProperties(_, {
    mtp: {
      get: function() {
        return this.maxTp();
      },
      configurable: true
    }
  });
  // * Добавляем метод canMove для всех персонажей
  // * В основном он нужен чтобы AAEntities не ходили во время XAnima
  _.canMove = function() {
    if (this.isAnimX()) {
      if (this.isAnimXIsBusy()) {
        // * Персонаж не может идти, если он выполняет действие анимации
        return false;
      }
    }
    if (AA.isABSMap()) {
      return this.AABattler().canMove();
    }
    return true;
  };
  // * Позиция с учётом расширенных HitBox
  // * Реализован отдельный метод, так как HitBox учитывается только при поражении навыками
  _.posExt = function(x, y) {
    var d, l, r, u;
    if (this.aaIsHaveExtendedHitBoxes()) {
      l = this.x - this._aaExtendedHitBox[3];
      r = this.x + this._aaExtendedHitBox[1];
      u = this.y - this._aaExtendedHitBox[0];
      d = this.y + this._aaExtendedHitBox[2];
      return l <= x && x <= r && u <= y && y <= d;
    } else {
      return this.pos(x, y);
    }
  };
  // * Позиции X на экране, с учётом расширенных HitBox
  _.screenXExt = function() {
    var i, j, k, l, points, r, ref, ref1, tw, x;
    points = [this.screenX()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      r = this._aaExtendedHitBox[1];
      l = this._aaExtendedHitBox[3];
      tw = $gameMap.tileWidth();
      // * Точка права (если есть)
      if (r > 0) {
        for (i = j = 1, ref = r; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          x = $gameMap.adjustX(this._realX + i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
      // * Точка слева (если есть)
      if (l > 0) {
        for (i = k = 1, ref1 = l; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          x = $gameMap.adjustX(this._realX - i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
    }
    return points;
  };
  // * Позиции Y на экране, с учётом расширенных HitBox
  _.screenYExt = function() {
    var d, i, j, k, points, ref, ref1, th, u, y;
    points = [this.screenY()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      u = this._aaExtendedHitBox[0];
      d = this._aaExtendedHitBox[2];
      th = $gameMap.tileHeight();
      // * Точка снизу (если есть)
      if (d > 0) {
        for (i = j = 1, ref = d; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          y = $gameMap.adjustY(this._realY + i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
      // * Точка сверху (если есть)
      if (u > 0) {
        for (i = k = 1, ref1 = u; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          y = $gameMap.adjustY(this._realY - i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
    }
    return points;
  };
  // * Есть ли у персонажа расширенные HitBox для АБС навыков
  _.aaIsHaveExtendedHitBoxes = function() {
    return this._aaExtendedHitBox != null;
  };
  _.aaUpdateABSAnimaX = function() {}; // * EMPTY (Переопределяется в Game_Character_AnimaX)
  
  // * Дополнительный метод для сетевой игры
  // * Вызывается в AA.Network (через Alias метода Alpha NET Z)
  _.aaFillNetworkDataObserver = function() {
    var e;
    if (this.netDataObserver == null) {
      return;
    }
    try {

    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
