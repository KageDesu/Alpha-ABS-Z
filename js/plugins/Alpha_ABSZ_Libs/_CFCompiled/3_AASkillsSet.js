// Generated by CoffeeScript 2.5.1
// * Класс хранит набор навыков на панели для персонажей
// * Хранит настройку панели навыков для каждого персонажа группы

//@[STORABLE]
var AASkillsSet;

AASkillsSet = class AASkillsSet {
  constructor() {
    // * Позиции на панели для навыков
    this.bingings = {};
    this.currentActorId = 0;
    return;
  }

  // * Установить ActorId из Game_Player (shortcut)
  setPlayerActorId() {
    return this.setActorId($gamePlayer.AABattler().actorId());
  }

  // * Установить персонажа, с которым будем работать
  setActorId(currentActorId) {
    this.currentActorId = currentActorId;
    // * Если персонаж не настроен, то показать стандартные навыки
    if (this.bingings[this.currentActorId] == null) {
      this.bingings[this.currentActorId] = {};
      this.setupDefaultSkillsForActor();
    }
  }

  allSymbols() {
    return AA.Input.skillPanelSymbols;
  }

  currentSet() {
    return this.bingings[this.currentActorId] || {};
  }

  setSkillInEmptySlot(skillId) {
    var i, len, s, symbols, tempId;
    symbols = this.allSymbols();
    for (i = 0, len = symbols.length; i < len; i++) {
      s = symbols[i];
      // * Автоматически нельзя поставить в E и Q слоты
      //continue if s == AA.Input.primarySkillSymbol()
      //continue if s == AA.Input.secondarySkillSymbol()
      tempId = this.getSkillForSymbol(s);
      if (tempId <= 0) {
        this.setSymbolForSkill(skillId, s, null);
        break;
      }
    }
  }

  setSymbolForSkill(skillId, symbNew, symbOld) {
    var skillInNewPos;
    skillInNewPos = this.getSkillForSymbol(symbNew);
    this.currentSet()[symbNew] = skillId;
    if (skillInNewPos > 0) {
      if (symbOld != null) {
        this.currentSet()[symbOld] = skillInNewPos;
      }
    }
  }

  getSymbolForSkill(skillId) {
    var key, ref, value;
    ref = this.currentSet();
    for (key in ref) {
      value = ref[key];
      if (value === skillId) {
        return key;
      }
    }
    return null;
  }

  getSkillForSymbol(symbol) {
    var skillId;
    skillId = this.currentSet()[symbol];
    if (skillId > 0) {
      return skillId;
    } else {
      return 0;
    }
  }

  setupDefaultSkillsForActor() {
    var attackSkillId, battler, e, i, len, ref, s;
    try {
      battler = $gameParty.leader();
      attackSkillId = battler.attackSkillId();
      this.setSymbolForSkill(attackSkillId, AA.Input.primarySkillSymbol(), null);
      ref = battler.getAASkills();
      // * Добавляем остальные навыки
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.idA === attackSkillId) {
          continue;
        }
        this.setSkillInEmptySlot(s.idA);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  // * Возвращает ID всех предметов на панели
  getAllItemsFromPanel() {
    var i, id, items, len, s, symbols;
    items = [];
    symbols = this.allSymbols();
    for (i = 0, len = symbols.length; i < len; i++) {
      s = symbols[i];
      id = this.getSkillForSymbol(s);
      if (AA.Utils.isAAItem(id)) {
        items.push(id);
      }
    }
    return items;
  }

  
    // * Есть ли предмет на панели
  // * Этот метод используется в автоматическом добавлении новых предметов
  // * Чтобы не добавлять один и тот же предмет несколько раз
  isHaveItemOnPanel(id) {
    return this.getAllItemsFromPanel().contains(id);
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkillsSet.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkillsSet.prototype;
})();

// ■ END AASkillsSet.coffee
//---------------------------------------------------------------------------
