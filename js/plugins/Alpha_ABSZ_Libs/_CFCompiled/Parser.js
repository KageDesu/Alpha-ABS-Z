// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PARSER.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.Parser;
  // * Для навыков (навыки, оружие, предметы)
  _.processABSSkillsNotetags = function() {
    var item, j, k, len, len1;
//TODO: Оружие не имеет своих ABS параметров, только ссылка на НАВЫК
    for (j = 0, len = $dataSkills.length; j < len; j++) {
      item = $dataSkills[j];
      if (item == null) {
        continue;
      }
      _.processABSSkillParamsInItem(item, false);
    }
    for (k = 0, len1 = $dataItems.length; k < len1; k++) {
      item = $dataItems[k];
      if (item == null) {
        continue;
      }
      _.processABSSkillParamsInItem(item, true);
    }
    //TODO: checkWeapon aaAttackSkill Note
    _.checkInitialAttackABSSkill();
  };
  
  // * Для врагов
  _.processABSEnemiesNotetags = function() {
    var item, j, len;
    for (j = 0, len = $dataEnemies.length; j < len; j++) {
      item = $dataEnemies[j];
      if (item == null) {
        continue;
      }
      _.processABSEnemyParams(item);
    }
  };
  // * Навык атаки всегда должен быть АБС 0
  _.checkInitialAttackABSSkill = function() {
    var attackSkill, e;
    try {
      attackSkill = $dataSkills[1];
      // * Если игрок не настроил навык Атаки, то применим стандартные настройки
      if (attackSkill.meta.ABS == null) {
        attackSkill.meta.ABS = true;
        attackSkill.AASkill = new AASkill2(1, false);
        attackSkill.AASkill.applyDefaultAttack001();
      }
    } catch (error) {
      e = error;
      AA.cre(e, 'Something wrong with Attack skill [1] settings');
    }
  };
  _.processABSSkillParamsInItem = function(item, isItem) {
    var e, j, len, param, paramPair, params, paramsRaw, ref;
    if (((ref = item.meta) != null ? ref.ABS : void 0) == null) {
      return;
    }
    try {
      params = [];
      paramsRaw = _.extractABSParametersFromDBItem(item);
      for (j = 0, len = paramsRaw.length; j < len; j++) {
        param = paramsRaw[j];
        paramPair = _.extractABSParameter(param); //ACore
        if (paramPair != null) {
          params.push(paramPair);
        }
      }
      // * АБС использует свой ID, чтобы предметы и навыки различать
      item.idA = item.id;
      if (isItem === true) {
        item.idA += AA.Utils.ItemsIDStart;
      }
      // * Данные АБС навыка храняться у предмета
      item.AASkill = new AASkill2(item.idA, isItem);
      return item.AASkill.setNoteParameters(params);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Извлечь группу из объекта ДБ
  _.extractABSParametersFromDBItem = function(item) {
    var e, ref;
    try {
      if (((ref = item.meta) != null ? ref.ABS : void 0) != null) {
        return _.parseNoteGroup("ABS", item.note);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return [];
  };
  // * Извлекает из строки (линии) имя параметра и его значение
  // * Учитывается сложный параметр (массив или строка)
  _.extractABSParameterAny = function(line) {
    var match, name, value;
    match = line.match(/<*(\w+)\s*:\s*([\d,\w\s*]+)>*/i);
    if (match != null) {
      name = match[1];
      value = match[2];
      return [name, value];
    } else {
      return null;
    }
  };
  // * Конвертирует массив из строки 1,2,3 в [1, 2, 3] (цифры)
  _.convertArrayFromParameter = function(values) {
    var e;
    if (values instanceof Array) {
      return values;
    }
    try {
      // * Тут надо toString, так как может быть только цифра одна
      return values.toString().split(",").map(function(i) {
        return parseInt(i.trim());
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Чтение параметров врагов
  _.processABSEnemyParams = function(item) {
    var data, e, j, len, param, paramPair, params, paramsRaw, ref;
    if (((ref = item.meta) != null ? ref.ABS : void 0) == null) {
      return;
    }
    try {
      params = [];
      paramsRaw = _.extractABSParametersFromDBItem(item);
      for (j = 0, len = paramsRaw.length; j < len; j++) {
        param = paramsRaw[j];
        paramPair = _.extractABSParameter(param); //ACore
        if (paramPair != null) {
          params.push(paramPair);
        }
      }
      data = params;
      return item.AAEnemy = data;
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END PARSER.coffee
//---------------------------------------------------------------------------
