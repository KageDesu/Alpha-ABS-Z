// Generated by CoffeeScript 2.5.1
// * Класс хранит таймеры для набора АБС навыков (и предметов) для Battler

//@[STORABLE]
var AASkillsTimers;

AASkillsTimers = class AASkillsTimers {
  constructor() {
    // * Таймеры для навыков
    this._timers = [];
    // * Для оптимизации, ID навыков для которых запущен таймер храняться отдельно
    this._skills = [];
    return;
  }

  startTimerForSkill(skillId, time) {
    var timer;
    timer = new AATimer();
    timer.skillId = skillId;
    // * Перевод из секунд в кадры
    timer.start(time * 60);
    this._timers.push(timer);
    this._skills.push(skillId);
  }

  isSkillHaveTimer(skillId) {
    return this._skills.contains(skillId);
  }

  isSkillHaveTimerToShow(skillId) {
    return this.isSkillHaveTimer(skillId) && this.getTimerForSkill(skillId).maxValue >= 60;
  }

  // * В секундах
  getRemainTimeForSkill(skillId) {
    if (this.isSkillHaveTimer(skillId)) {
      return this.getTimerForSkill(skillId).getSecondsLeft();
    } else {
      return 0;
    }
  }

  getTimerForSkill(skillId) {
    return this._timers.find(function(t) {
      return t.skillId === skillId;
    });
  }

  update() {
    var e, i, j, len, len1, ref, t, toDelete;
    try {
      toDelete = [];
      ref = this._timers;
      // * Опасно удалять в переборке массива
      for (i = 0, len = ref.length; i < len; i++) {
        t = ref[i];
        if (t == null) {
          continue;
        }
        t.update();
        if (t.isReady()) {
          this._skills.delete(t.skillId);
          toDelete.push(t);
        }
      }
      for (j = 0, len1 = toDelete.length; j < len1; j++) {
        t = toDelete[j];
        this._timers.delete(t);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkillsTimers.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkillsTimers.prototype;
})();

// ■ END AASkillsTimers.coffee
//---------------------------------------------------------------------------