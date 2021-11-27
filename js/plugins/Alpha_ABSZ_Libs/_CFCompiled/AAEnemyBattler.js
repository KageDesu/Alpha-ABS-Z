// Generated by CoffeeScript 2.6.1
// * Так же передаём номер события, чтобы был доступ к модели и логике
var AAEnemyBattler;

AAEnemyBattler = class AAEnemyBattler extends Game_Enemy {
  constructor(enemyId, eventId) {
    super(enemyId, 0, 0);
    this.eventId = eventId;
    // * Проверка делается один раз, так как навыки не меняются
    this._isHaveAnyAASkill = this._checkAASkillsInActions();
    this._aaAttackHitAnimationId = this.char().AAModel().hitAnimationId;
    return;
  }

  AACharacter() {
    return this.char();
  }

  char() {
    return $gameMap.event(this.eventId);
  }

  getAASkills() {
    return this._selectAASkillsFromActions().map(function(skillId) {
      return $dataSkills[skillId];
    });
  }

  
    // * Если ли у врага хотябы одно действие с АБС навыком
  isHaveAnyAASkill() {
    return this._isHaveAnyAASkill === true;
  }

  aaIsActionValid(action) {
    return AA.Utils.isAAObject(action.skillId);
  }

  isActionValid(action) {
    var isABS;
    isABS = this.aaIsActionValid(action);
    return isABS && Game_Enemy.prototype.isActionValid.call(this, action);
  }

  attackAnimationId1() {
    return this._aaAttackHitAnimationId;
  }

  // * У монстров не может быть двуручной атаки, поэтому всегда 0
  attackAnimationId2() {
    return 0;
  }

  //$[OVER]
  getDefaultWeaponMotionAnimationWeaponId() {
    var e;
    try {
      return this.char().AAModel().weaponMotionType;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AAEnemyBattler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAEnemyBattler.prototype;
  // * Среди всех действий врага, есть хотябы одно АБC
  // * Эта проверка нужна, чтобы сразу отметить врага как неспособного сражаться
  _._checkAASkillsInActions = function() {
    var aaActions;
    aaActions = this.enemy().actions.filter((a) => {
      return this.aaIsActionValid(a);
    });
    return aaActions.length > 0;
  };
  // * Выборка всех возможных АБС навыков из доступных действий
  // * (Тут смотритеся и canUse и можно ли использовать действие по условию в самом действии)
  _._selectAASkillsFromActions = function() {
    var aaSkills, actionList;
    aaSkills = [];
    actionList = this.enemy().actions.filter((a) => {
      return this.isActionValid(a);
    });
    if (actionList.length > 0) {
      aaSkills = this._aaSelectAllABSActions(actionList);
    }
    return aaSkills;
  };
  
  // * Метод аналогичен selectAllActions, только изменён под АБС
  // * Возвращает все АА навыки, которые проходят условия Action из БД
  _._aaSelectAllABSActions = function(actionList) {
    var aaSkills, action, i, j, ratingMax, ratingZero, ref;
    aaSkills = [];
    ratingMax = Math.max(...actionList.map(function(a) {
      return a.rating;
    }));
    ratingZero = ratingMax - 3;
    actionList = actionList.filter(function(a) {
      return a.rating > ratingZero;
    });
    for (i = j = 0, ref = actionList.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      action = this.selectAction(actionList, ratingZero);
      if (action != null) {
        aaSkills.push(action.skillId);
      }
    }
    return aaSkills;
  };
})();

// ■ END AAEnemyBattler.coffee
//---------------------------------------------------------------------------
