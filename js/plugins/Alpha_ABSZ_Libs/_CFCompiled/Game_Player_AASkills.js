// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Выполнить атаку первичным навыком (в первой ячеке E)
  _.aaPerformPlayerAttack01 = function(isSmart = false) {
    "ATTACK ONLY 01".p();
    return this.aaPerformAttack(true, isSmart);
  };
  // * Выполнить атаку вторичным навыком (во второй ячейке Q)
  _.aaPerformPlayerAttack02 = function(isSmart = false) {
    "ATTACK ONLY 02".p();
    return this.aaPerformAttack(false, isSmart);
  };
  _.aaPerformAttack = function(isPrimary = true, isSmart = false) {
    var skillId, symbol;
    if (!$gamePlayer.canBeControlled()) {
      return;
    }
    if (isPrimary) {
      symbol = AA.Input.primarySkillSymbol();
    } else {
      symbol = AA.Input.secondarySkillSymbol();
    }
    skillId = this.aaSkillsSet.getSkillForSymbol(symbol);
    if (skillId <= 0) {
      return;
    }
    this.aaTurnTowardTouchInput();
    if (isSmart) {
      this.aaPerformSmartSkillUse(skillId, TouchInput.toMapPoint());
    } else {
      this.aaTryPerformSkill(skillId);
    }
  };
  // * Выполнить "умную" атаку (либо использовать навык, либо подойти ближе)
  _.aaPerformSmartSkillUse = function(skillId, point) {
    var e;
    try {
      if (skillId <= 0) {
        return;
      }
      //@_setAAStateToSmartSkillUse(skillId, point)
      //? Не состоянием, а просто
      if (AATargetsManager.isInSkillRange(this, skillId, point)) {
        this.aaTryPerformSkill(skillId);
      } else {
        $gameTemp.setDestination(point.x, point.y);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Главный метод по выполнению того или иного АБС навыка
  // * Навык должен быть у персонажа
  // * Чтобы выполнить навык, которого нет у персонажа, то можно поставить флаг forced = true
  _.aaTryPerformSkill = function(skillId, forced = false) {
    var e, skill;
    try {
      if (!AA.isABSActive()) {
        return;
      }
      if (skillId == null) {
        return;
      }
      if (skillId <= 0) {
        return;
      }
      // * Выполняем навык в любом случае (даже если нету или не готов)
      if (forced === true) {
        skill = $dataSkills[skillId];
        if (!AA.Utils.isAASkill(skill)) {
          // * Только АБС навык можно выполнить через этот метод
          skill = null;
        }
      } else {
        // * Иначе навык должен быть готов к использованию и выучен
        skill = this.AABattler().getUsableAASkills().find(function(s) {
          return s.id === skillId;
        });
      }
      if (skill != null) {
        AA.UI.skillPerformResult(skillId, 1);
        //TODO: perform skill
        "PERFROM SKILL ".p(skillId);
        console.log(skill.name);
        //TODO: нормальный метод на баттлере (или персонаже)
        this.prepareAASkillToExecute(skill);
      } else {
        //TODO: Notify???
        AA.UI.skillPerformResult(skillId, 0);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  
  // * Подготовка навыка к выполнению (сюда передаётся базовый объект навыка)
  _.prepareAASkillToExecute = function(skill) {
    var point;
    console.log("Use skill " + skill.name);
    //TODO: А если предмет???
    //TODO: Анимация навыка атаки
    this.setActiveAASkill(skill.id);
    skill = this.activeAASkill();
    // * Если навык работает по направлению точки (курсора)
    if (skill.isInPoint()) {
      // * Если надо выбирать зону, то выбор зоны
      if (skill.isNeedSelectZone()) {
        // * Сбор целей сразу в точке где сейчас курсор
        AATargetsManager.collectTargetsForPlayerSelector(this.activeAASkill());
        this._setAAStateToSelectSkillTarget();
      } else {
        point = TouchInput.toMapPoint();
        if (skill.isInstant() || skill.isInCertainPoint()) {
          // * Надо проверить находится ли точка в Range навыка
          if (AATargetsManager.isInSkillRange(this, this._activeAASkillId, point)) {
            this.startPerformAASkill(point);
          } else {
            // * NOTHING
            //TODO: Показать область range применения (моргнуть)
            //TODO: Написать Notify (small range)
            AA.UI.skillPerformResult(this._activeAASkillId, 0);
            this.setActiveAASkill(null);
          }
        } else {
          // * Направление по точке
          this.startPerformAASkill(point);
        }
      }
    } else {
      // * Передаём себя в качестве точки (direction == 0 - напрвление персонажа)
      this.startPerformAASkill(this.toPoint());
    }
  };
  // * Обновление навыков для панели задач (при смене лидера)
  // * Также выполняется начальная расстановка навыков
  _.aaRefreshABSSkillsForPanel = function() {
    var ref;
    if (this.AABattler() == null) {
      return;
    }
    if ((ref = this.aaSkillsSet) != null) {
      ref.setPlayerActorId();
    }
    AA.UI.refreshElement('skills');
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------
