// Generated by CoffeeScript 2.5.1
//TODO: Систематизация класса (Наследовать от )

// * Данный класс работает только на Game_Player
var UISkillsItemsController;

UISkillsItemsController = class UISkillsItemsController {
  constructor(skillItems) {
    this.skillItems = skillItems;
    this.setup();
    return;
  }

  setup() {
    this.battler = $gamePlayer.AABattler();
    this.skillSet = $gamePlayer.aaSkillsSet;
    this._updThread = new KDCore.TimedUpdate(20, this._updateItemsStates.bind(this));
    this._updThreadTimers = new KDCore.TimedUpdate(2, this._updateItemsTimers.bind(this));
    this.refresh();
  }

  onSkillPerformResult(skillId, result) {
    var e, item;
    try {
      item = this._getItemForSkillId(skillId);
      if (item == null) {
        return;
      }
      if (result === 0) {
        return item.pulseAlert();
      } else {
        return item.pulseClick();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  refresh() {
    var i, len, ref, skill;
    this._clearItems();
    ref = this.battler.getAASkills();
    for (i = 0, len = ref.length; i < len; i++) {
      skill = ref[i];
      this._setupItem(skill);
    }
  }

  update() {
    var ref, ref1;
    if ((ref = this._updThread) != null) {
      ref.update();
    }
    if ((ref1 = this._updThreadTimers) != null) {
      ref1.update();
    }
    this._updateInput();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = UISkillsItemsController.prototype;
  _._updateItemsStates = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemState(item));
    }
    return results;
  };
  _._updateItemsTimers = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemTimer(item));
    }
    return results;
  };
  // * Обновить состояние (таймер, доступность)
  _._updateItemState = function(item) {
    var e, useCases;
    try {
      useCases = this.battler.getUsableAASkills().map(function(skill) {
        return skill.id;
      });
      this._updateItemUseState(item, useCases);
    } catch (error) {
      e = error;
      AA.w(e);
      this._updThread = null;
    }
  };
  // * Обновить таймер для навыка
  _._updateItemTimer = function(item) {
    var parts, tStr, time;
    if (item.isDisabled() && item.skillId > 0) {
      time = $gamePlayer.AABattler().aaGetRemainTimeForSkill(item.skillId);
      if (time > 0) {
        //TODO: BAD performance, BAD BAD BAD way
        tStr = "" + time;
        if (tStr.contains(".")) {
          parts = tStr.split(".");
          if (parts[1].length > 0) {
            tStr = parts[0] + "." + parts[1][0];
          }
        }
        return item.drawTime(tStr);
      } else {
        return item.drawTime("");
      }
    } else {
      return item.drawTime("");
    }
  };
  _._updateItemUseState = function(item, useable) {
    if (item.skillId === 0) {
      if (item.isDisabled()) {
        // * Доп. проверочка isDisabled, а то мерцает
        item.enable();
      }
    } else {
      // * Если состояние было включено на Enabled, значит даём сигнал
      if (item.switchState(useable.contains(item.skillId))) {
        item.pulseReady();
      }
    }
  };
  _._clearItems = function() {
    var i, item, len, ref;
    ref = this.skillItems;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.clear();
      item.skillId = 0;
    }
  };
  
  // * Задать навык в ячейку
  _._setupItem = function(skill) {
    var item, symb, weapon;
    if (skill == null) {
      return;
    }
    symb = this.skillSet.getSymbolForSkill(skill.id);
    // * Нету символа для навыка (т.е. навык не находится в ячейках)
    if (symb == null) {
      return;
    }
    item = this._getItemForSymbol(symb);
    if (item == null) {
      return;
    }
    item.skillId = skill.id;
    if (item.skillId === this.battler.attackSkillId()) {
      weapon = this.battler.weapons()[0];
      if ((weapon != null) && weapon.iconIndex > 0) {
        item.drawIcon(weapon.iconIndex);
      } else {
        item.drawIcon(skill.iconIndex);
      }
    } else {
      item.drawIcon(skill.iconIndex);
    }
    // * Сразу обновляем состояние
    this._updateItemState(item);
  };
  // * symbol назначается при создании в UISet_Skills из параметров
  _._getItemForSymbol = function(symb) {
    return this.skillItems.find(function(item) {
      return item.symbol === symb;
    });
  };
  // * Получить ячейку по ID навыка (устанавливается в методе _setupItem)
  _._getItemForSkillId = function(id) {
    return this.skillItems.find(function(item) {
      return item.skillId === id;
    });
  };
  _._updateInput = function() {
    var inputSymbol, item;
    inputSymbol = AA.Input.getTriggeredSkillSymbol();
    if (inputSymbol != null) {
      item = this._getItemForSymbol(inputSymbol);
      if (item != null) {
        $gamePlayer.aaTryPerformSkill(item.skillId);
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
