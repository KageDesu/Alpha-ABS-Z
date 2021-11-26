// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__learnSkill, ALIAS__performDamage, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__performDamage = _.performDamage;
  _.performDamage = function() {
    if (AA.isABSMap()) {
      if (this.isPlayer() && AA.PP.isShakeScreenWhenPlayerGetDamage()) {
        // * Стандартный метод (тряска экрана и звук)
        return ALIAS__performDamage.call(this);
      } else {
        // * Если не игрок, то нет тряски и звука
        return Game_Battler.prototype.performDamage.call(this);
      }
    } else {
      return ALIAS__performDamage.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__learnSkill = _.learnSkill;
  _.learnSkill = function(skillId) {
    var shouldAddNewSkillToPanel;
    // * Сперва флаг - что не надо добавлять
    shouldAddNewSkillToPanel = false;
    if (!this.isLearnedSkill(skillId) && AA.PP.isAddNewSkillsOnPanelOnLearning()) {
      shouldAddNewSkillToPanel = true;
    }
    ALIAS__learnSkill.call(this, skillId);
    // * Добавляем после, чтобы навык уже был у игрока
    // * Дополнительно проверяем, выучен ли он и надо ли его добавлять
    if (this.isLearnedSkill(skillId) && shouldAddNewSkillToPanel === true) {
      //#TODO: Учитывать членов группы, но пока только игрок
      // * Чтобы добавить на панель члена партии, надо ActorID менять у SkillSet
      // * И потом опять его возвращать
      if (this.isPlayer() && AA.Utils.isAAObject(skillId)) {
        uAPI.setSkillToPanel(skillId);
      }
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------
