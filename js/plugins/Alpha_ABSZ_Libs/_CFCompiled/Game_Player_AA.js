// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isABS, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Доп. проверка
  //@[ALIAS]
  ALIAS__isABS = _.isABS;
  _.isABS = function() {
    return ALIAS__isABS.call(this) && ($gameParty.leader() != null);
  };
  // * Когда сцена карты останавливается (сменяется другой)
  _.aaOnMapSceneEnd = function() {
    if (this.isInSkillTargetingState()) {
      return this.onSkillTargetCancel();
    }
  };
  // * Можно ли управлять? (АБС элементы: навыки, атака и всё в этом роде)
  _.canBeControlled = function() {
    return this.isActive() && AA.isABSMap();
  };
  _.isInSkillTargetingState = function() {
    return this.aaState === 'skill';
  };
  // * Если ли у игрока АБС навык с ID
  _.aaIsHaveABSSkill = function(skillId) {
    return this.AABattler().getAASkills().getById(skillId) != null;
  };
  //TODO:?
  // * Проверка цели (см. Game_CharacterBase_AA)
  _.aaIsValidTargetToSet = function(target) {
    return true;
  };
  // * Когда игрок выбрал зону поражения навыка на карте (нажал левую кнопку мыши)
  _.onSkillTargetSelected = function() {
    var point, skill;
    "SKILL ZONE SELECTED".p();
    console.info($gameTemp._aaSkillSelectorTargets);
    // * Проверка радиуса
    skill = this.activeAASkill();
    point = TouchInput.toMapPoint();
    if (AA.Utils.Math.getDistanceMapPlayerPoint(point) <= skill.range) {
      this.startPerformAASkill(point);
      // * Сбрасываем состояние
      this.onSkillTargetCancel();
    } else {
      AA.UI.shakeSkillImpactSelector();
    }
  };
  //TODO: shake sprite
  _.onSkillTargetCancel = function() {
    return this._resetAAState();
  };
  //TODO: Возможно эта реализация довольно затратная по производительности
  //TODO: Сделать параметр плагина - использовать боевую стойку или нет
  _._aaIsInBattleAnimaXState = function() {
    var myEnemies;
    if (!AA.isABSActive()) {
      return false;
    }
    myEnemies = AATargetsManager.getAllWhoHavePlayerAsTargetInRange(5);
    return myEnemies.length > 0;
  };
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      // * Сбрасываем состояние (выбор навыка)
      return this._resetAAState();
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Основные (приватные) методы АБС
    // -----------------------------------------------------------------------
    var ALIAS__initABS;
    
    //TODO: Доделать поддержку техники
    // * Боты сейчас не учитывают isActive
    // * Надо там добавить isTagetValid
    //@[ALIAS]
    //ALIAS__isActive = _.isActive
    //_.isActive = ->
    //    ALIAS__isActive.call(@) && !@isInVehicle()

    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      this.aaRefreshABSSkillsForPanel();
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAPlayerEntity();
      this.aaState = null; // * Свободное состояние (нулевое)
      this.aaSkillsSet = new AASkillsSet();
    };
    _._setAAStateToSelectSkillTarget = function() {
      // * Наверное должно быт в AAEntity!!! Так как у ботов тоже будет этот параметр
      this.aaState = 'skill';
      AA.EV.call("PlayerSkillSelector");
    };
    _._setAAStateToSmartSkillUse = function(skillId, point) {
      this.aaState = 'smartAttack';
      this._aaSmartSkillId = skillId;
      this._aaSmartPoint = point;
    };
    _._resetAAState = function() {
      this.aaState = null;
      AA.EV.call("PlayerSkillSelector");
    };
    _._aaUpdatePlayerABS = function(sceneActive) {
      if (sceneActive === true) {
        this._aaUpdateStates();
        return this._aaUpdatePlayerInput();
      }
    };
    _._aaUpdateStates = function() {
      switch (this.aaState) {
        case 'skill':
          // * Обновляем цели под кругом выбора
          return $gameTemp._aaSkillSelectorTargets = AATargetsManager.collectTargetsForPlayerSelector(this.activeAASkill());
        //? Не используется пока что
        // * Работает, но проблема что надо сбрасывать во многих случаях - путаница
        case 'smartAttack':
          if (!this.isMoving()) {
            if (AATargetsManager.isInSkillRange(this, this._aaSmartSkillId, this._aaSmartPoint)) {
              this._resetAAState();
              return this.aaTryPerformSkill(this._aaSmartSkillId);
            } else {
              return this.aaMoveTypeToPoint(this._aaSmartPoint);
            }
          }
          break;
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Методы ABS (Бой и состояния)
    // -----------------------------------------------------------------------
    var ALIAS__aaOnActionOnMe;
    // * Когда какое-либо действие было выполненно на мне
    //@[ALIAS]
    ALIAS__aaOnActionOnMe = _.aaOnActionOnMe;
    return _.aaOnActionOnMe = function(action) {
      ALIAS__aaOnActionOnMe.call(this, action);
      //TODO: На будущее: тут можно определить кто именно атаковал, так как action имеет packedSubject
      // * Сброс камеры (если есть опция)
      $gameTemp.aaResetMapScrollOnAction();
    };
  })();
  // * Переопределяем
  //$[OVER]
  _.aaGetExtendedHitBoxes = function() {
    if (this.isABS() && ($gameParty.leader() != null)) {
      return $gameParty.leader().aaGetExtendedHitBoxes();
    } else {
      return null;
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------
