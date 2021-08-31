// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      if (this.AALogic() == null) {
        return;
      }
      if (!this.AALogic().isFreeState()) {
        return this.AALogic().switchToFreeState();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Система AAEntity
    // -----------------------------------------------------------------------
    // * Когда мы переключили страницу события, надо пересоздать Battler и активировать АБС
    _.aaIsShouldBeReActivated = function() {
      return this.isABS() && (this.AABattler() == null);
    };
    _.aaCheckABSEventState = function() {
      if (this.aaIsABSEventPage()) {
        //TODO: Проверить переключение с АБС на АБС событие
        return this._initMembersABS();
      } else {
        if (this.isABS()) {
          // * Если переключили страницу, но событие было АИ, то надо отключить
          this.clearABS();
        }
      }
    };
    _.aaIsABSEventPage = function() {
      var ABSComment, enemyId;
      if (this.page() == null) {
        return false;
      }
      // * Для сохранения производительности, сперва просто смотрим есть ли ABS комментарий
      ABSComment = KDCore.Utils.getEventCommentValue("ABS", this.list());
      if (ABSComment != null) {
        // * Дополнительная проверка, что указан правильный ID
        enemyId = AA.Utils.Parser.getABSEnemyId(ABSComment);
        if (enemyId > 0) {
          if (AA.Utils.Guard.isProperEnemyIdForABSEvent(enemyId)) {
            this.aaEventSettings = new AA.AAEventSettingsParser(this.list());
            //console.info @aaEventSettings
            return true;
          } else {
            AA.w("Enemy ID " + enemyId + " not exists in DB or not have a name");
          }
        } else {
          AA.w("Can't read Enemy ID from <ABS> comment for event " + this.eventId());
        }
      }
      return false;
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAEnemyEntity(this.eventId());
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Основная логика АБС
    // -----------------------------------------------------------------------
    var ALIAS__aaOnActionOnMe, ALIAS__aaOnDeath, ALIAS__aaOnDefeat, ALIAS__aaOnShatterEffectCreated, ALIAS__clearABS, ALIAS__initABS, ALIAS__isActive, ALIAS_aaUpdateABS;
    // * Этот метод выполняется из отдельного потока для логики АИ
    //$[OUTER]
    _.aaUpdateAILogic = function() {
      var e;
      try {
        if (this.isActive()) {
          if (AA.isABSActive()) {
            return this.AALogic().update();
          }
        } else {
          return $gameTemp.aaClearAILogicThreads(this.eventId());
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
      this.aaStoreMoveData();
      $gameTemp.aaRegisterAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__clearABS = _.clearABS;
    _.clearABS = function() {
      ALIAS__clearABS.call(this);
      $gameTemp.aaClearAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__isActive = _.isActive;
    _.isActive = function() {
      return ALIAS__isActive.call(this) && !this._erased;
    };
    // * Этот метод работает только когда АБС активна
    //@[ALIAS]
    ALIAS_aaUpdateABS = _.aaUpdateABS;
    _.aaUpdateABS = function() {
      ALIAS_aaUpdateABS.call(this);
      this._aaUpdateDeadState();
    };
    //@[ALIAS]
    ALIAS__aaOnShatterEffectCreated = _.aaOnShatterEffectCreated;
    _.aaOnShatterEffectCreated = function() {
      ALIAS__aaOnShatterEffectCreated.call(this);
      if (!this.isABS()) {
        return;
      }
      this.aaOnDefeat();
    };
    //@[ALIAS]
    ALIAS__aaOnDefeat = _.aaOnDefeat;
    _.aaOnDefeat = function() {
      ALIAS__aaOnDefeat.call(this);
      //TODO: call items drop!
      //TODO: gain EXP, money
      return this.aaOnDeath();
    };
    //@[ALIAS]
    ALIAS__aaOnDeath = _.aaOnDeath;
    _.aaOnDeath = function() {
      var model;
      ALIAS__aaOnDeath.call(this);
      model = this.AAModel();
      if (model.isHaveDeadSwitch()) {
        // * Включаем self.switch
        AA.SAaction.execute("ss_" + model.deadSwitch + "_true", this);
      } else {
        if (model.eraseOnDead === 1) {
          this.erase();
        }
      }
      if (model.isHaveOnDeathAction()) {
        AA.SAaction.execute(model.onDeath, this);
      }
    };
    //@[ALIAS]
    //TODO: Что делать с xAnimaDead ???
    ALIAS__aaOnActionOnMe = _.aaOnActionOnMe;
    _.aaOnActionOnMe = function() {
      var result;
      ALIAS__aaOnActionOnMe.call(this);
      result = this.AABattler().result();
      if (result == null) {
        return;
      }
      //TODO: Может только если HP damage?
      if (result.isHit()) {
        //TODO: model paramter or skill parameter (shake str)
        this.aaRequestShakeEffect();
      }
    };
    _._aaUpdateDeadState = function() {
      if (this.isActive() && !this.AABattler().isAlive()) {
        // * Отключаем АБС для этого события
        this.stopABS();
        // * Если параметр включён, запускаем эффект
        if (this.AAModel().shatterEffect === 1) {
          this.aaRequestShatterEffect(); // * Иначе сразу
        } else {
          this.aaOnDefeat();
        }
      }
    };
    _._aaIsInBattleAnimaXState = function() {
      return this.AAEntity().inBattle();
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Дополнительные возможности АБС события
    // -----------------------------------------------------------------------
    // * Запускает общее события внутри данного события (т.е. внутри себя вызов общего)
    // * Это позволяет использовать this. и менять АБС параметры события
    _.aaStartCommonEvent = function(ceId) {
      var commonEvent, e;
      try {
        this._aaExtraEventList = null;
        if (ceId <= 0) {
          return;
        }
        "Call outer CE ".p(ceId);
        commonEvent = $dataCommonEvents[ceId];
        if (commonEvent == null) {
          return;
        }
        this._aaExtraEventList = ceId;
        // * Переключаем напрямую, без метода start(), так как не нужен Lock
        this._starting = true;
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

//TODO: СБРОС ЦЕЛИ
//TODO: ОФФСЕТ ДЛЯ ВЫБОРА
//TODO: МИНИ ХП БАР
// Также добавить управление ним во время игры (один из трёх типов)