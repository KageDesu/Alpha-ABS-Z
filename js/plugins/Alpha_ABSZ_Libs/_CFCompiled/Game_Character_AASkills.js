// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  _.setActiveAASkill = function(_activeAASkillId) {
    this._activeAASkillId = _activeAASkillId;
  };
  _.activeAASkill = function() {
    if (this._activeAASkillId > 0) {
      return AA.Utils.getAASkillObject(this._activeAASkillId).AASkill;
    } else {
      return null;
    }
  };
  _.startPerformAASkill = function(point) {
    var skill;
    skill = this.activeAASkill();
    if (skill.isInPoint()) {
      this.turnTowardCharacter(point);
    }
    //TODO: Тут можно ещё дополнительную проверку canUse
    // так как пока шёл выборо цели (например) мана могла закончиться
    // * Если есть анимация motion оружия, то анимация навыка пропускается
    if (skill.isHaveWeaponMotion()) {
      this.AABattler().aaPlayAAWeaponMotionAnimation(skill);
    } else {
      this.aaPlayAASkillXAnimation(skill);
    }
    // * Персонаж "платит" за навык как только использует его
    this.AABattler().useItem(skill.dbItem());
    // * Стоит ограничение задержки для безопасности
    if (skill.actionStartDelay > 0 && skill.actionStartDelay <= 60) {
      this.setupDelayedAASkill(skill, point);
    } else {
      AABattleActionsManager.startAASkill(skill, this, point);
    }
  };
  _.aaPlayAASkillXAnimation = function(skill) {
    var e;
    try {
      if (!Imported.PKD_AnimaX) {
        return;
      }
      if (!this.isAnimX()) {
        return;
      }
      if (String.any(skill.animaXAction)) {
        // * Special
        return this.startAnimaXCustomAction(skill.animaXAction, false, true); // * Default one
      } else {
        return this.startAnimaXCustomAction("Skill", false, true);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.setupDelayedAASkill = function(skill, point) {
    this.aaDelayedSkillActions.push([skill.actionStartDelay, skill.idA, AA.Utils.packAAPoint(point)]);
  };
  _._aaUpdateDelayedSkillActions = function() {
    var action, i, len, point, ref, skill;
    ref = this.aaDelayedSkillActions;
    //TODO: Навык с задержкой должен иметь задержку перед использованием иначе ошибка, если спамить навык
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (action == null) {
        continue;
      }
      if (action[0]-- <= 0) {
        skill = AA.Utils.unpackAASkill(action[1]);
        point = AA.Utils.unpackAAPoint(action[2]);
        AABattleActionsManager.startAASkill(skill, this, point);
        this.aaDelayedSkillActions.delete(action);
      }
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
