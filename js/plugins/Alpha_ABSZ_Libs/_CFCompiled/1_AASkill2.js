// Generated by CoffeeScript 2.5.1
// * Класс АБС навыка (дейсвтия), может быть спелл или предмет
// * Содержки настройки навыка
// * Новая версия - не требует целей

// * Не требует цели совсем
// * Базируется на 4х основных парметрах:
// Расстояние (0 или X)
// Область поражения (1 или Radius (square))
// Направление (direction or point(cursor))
// Скорость (0 или Х) - если больше 0, то летит, если 0 то мнгновенно

// * Пока новый навык не умеет следовать за целью (возможно введу потом)

//TODO: АБС навыки могут быть и в обычной битве тоже, т.е. используется два вида настроек
//TODO: Навыки с ABS всегда есть на карте и в бою, а вот без ABS - нет на карте

//@[STORABLE]
var AASkill2;

AASkill2 = class AASkill2 {
  constructor(idA) {
    this.idA = idA;
    this._initBase();
    this._initMain();
    this._initOnMapSettings();
    this._initOtherSettings();
    this._initAnimationSettings();
    return;
  }

  isItem() {
    return AA.Utils.isAAItem(this.idA);
  }

  isSkill() {
    return !this.isItem();
  }

  databaseId() {
    if (this.isItem()) {
      return this.idA - AA.Utils.ItemsIDStart;
    } else {
      return this.idA;
    }
  }

  // * Установить набор параметров из Note (принимает массив пар: имя - значение)
  setNoteParameters(params) {
    var i, len, p;
    for (i = 0, len = params.length; i < len; i++) {
      p = params[i];
      this[p[0]] = p[1];
    }
    this._convertParameters();
  }

  animationId() {
    if (this.hitAnimationId > 0) {
      return this.hitAnimationId;
    } else {
      return this.dbItem().animationId;
    }
  }

  dbItem() {
    return AA.Utils.getAASkillObject(this.idA);
  }

  // * Надо выбирать зону поражения для навыка
  isNeedSelectZone() {
    return this.selectZone === 1 && this.range > 0;
  }

  // * Нет "полёта", приминение сразу в точке (зоне поражения)
  isInstant() {
    return this.speed <= 0;
  }

  // * Имеет направление (точка)
  isInPoint() {
    return this.direction > 0;
  }

  // * Имеет конечную точку (летит прямо в точку)
  isInCertainPoint() {
    return this.direction === 1;
  }

  // * Летит по направлению точки
  isInPointDirection() {
    return this.direction === 2;
  }

  isNoContact() {
    return this.noContact > 0;
  }

  // * Поражает только одну цель
  isSingleTargetArea() {
    return this.radius <= 1;
  }

  isSelfAction() {
    return this.range <= 0 && this.isInstant();
  }

  isHaveTimer() {
    return String.any(this.reloadTime) || this.reloadTime > 0;
  }

  // * Ближний бой = дистанция 1 и по направлению
  isMelee() {
    return !this.isInPoint() && range === 1;
  }

  isForEnemies() {
    return this.opponentsEffect === 1;
  }

  isForEnemiesOnly() {
    return this.isForEnemies() && !this.isForFriends();
  }

  isForFriends() {
    return this.friendlyEffect === 1;
  }

  isForFriendsOnly() {
    return this.isForFriends() && !this.isForEnemies();
  }

  isHaveWeaponMotion() {
    return this.weaponMotion >= 1;
  }

  isHaveWeaponMotionSpecialType() {
    return this.weaponMotionType > 0;
  }

  // * Время перезарядки навыка (cooldown)
  getReloadTime(battlerOrChar) {
    if (isFinite(this.reloadTime)) {
      return this.reloadTime;
    } else {
      if (battlerOrChar == null) {
        return 0;
      } else {
        if (battlerOrChar instanceof Game_Character) {
          battlerOrChar = battlerOrChar.AABattler();
        }
        return battlerOrChar.aaCalculateFormula(this.reloadTime);
      }
    }
  }

  // * Приминить стандартные настройки навыка 001 Атака
  applyDefaultAttack001() {
    // * Ближний бой перед собой (контактный только)
    this.radius = 1;
    this.range = 1;
    this.direction = 0;
    this.speed = 0;
    this.noContact = 0;
    this.reloadTime = 2;
    this.skillImg = "";
    this.actionStartDelay = 10;
    this.reloadTime = 1.2;
    // * По умолчанию выборка
    if (Imported.PKD_AnimaX === true) {
      this.animaXAction = "Attack";
    } else {
      this.weaponMotion = 1;
    }
  }

};

(function() {  //TODO: splash damage (от каждой цели считается ещё доп. цели)

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkill2.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkill2.prototype;
  //custom action common ev,  switch, var (на любые события с Note)
  // события, которые могут пропускать через себя Proj, но выполнять действия

  //TODO: shake effect strheng for target

  //TODO: animationFor: eachTarget, centerPoint

  // * Базовые (фундаментальные) АБС параметры навыка
  _._initBase = function() {
    // * Область поражения (1 - Х)
    this.radius = 1;
    this.range = 1;
    //facing dir 0, point position 1, point direction 2
    this.direction = 0;
    this.speed = 0;
  };
  // * Основные АБС параметры навыка
  _._initMain = function() {
    this.friendlyEffect = 0; // * Еффект на дружественную команду (и себя)
    this.opponentsEffect = 1; // * Еффект на противоположную команду
    // * В СЕКУНДАХ
    return this.reloadTime = 0; // * Данный параметр может быть строкой
  };
  
  // * Настройки поведения на карте
  _._initOnMapSettings = function() {
    this.z = 3;
    this.selectZone = 0;
    this.skillImg = "bullet0(8,5)";
    this.hitOffset = 28; //$gameMap.tileWidth() * 0.6
    // * Если 1, то навык срабатывает в конце своего пути в любом случае
    // * Если 0, то навык, НЕ достигнув цели, просто изчезнет
    this.noContact = 0;
    //TODO: to WIKI (+ image and example)
    this.popUpStyleId = ""; // * Default
    // * Дополнительная анимация (используется на АБС карте, используется взамен параметра из БД)
    this.hitAnimationId = 0;
    // * Если 1 , то в любом случае анимация будет на карте
    this.animationOnMap = 0;
    // * Непроходимые регионы
    this.noPassRegions = [];
    // * Непроходимые Terrain tags
    this.noPassTerrains = [];
    // * Селектор карты
    this._initSelector();
    // * Анимация взмаха оружием (стандартная)
    this.weaponMotion = 0; // * 0 - нету, 1 - есть
    // * Только если weaponMotion > 0
    this.weaponMotionType = 0; //* 0 - оружие в руке (Actor), 1-X тип оружия из списка Types
  };
  // * Параметры селектора на карте
  _._initSelector = function() {
    this.selectorColor = "#bf9324"; //"#FF22AA"
    this.selectorImg = null;
    return this.selectorOpacity = 220; //200
  };
  
  // * Дополнительные настройки навыка
  _._initOtherSettings = function() {
    return this.hideOutsideABS = 0;
  };
  // * Настройки анимации xAnima
  _._initAnimationSettings = function() {
    this.animaXAction = null;
    return this.actionStartDelay = 0;
  };
  
  // * Преобразует некоторые параметры
  _._convertParameters = function() {
    // * Из строки 1,2,3 в массив [1,2,3]
    this.noPassRegions = AA.Utils.Parser.convertArrayFromParameter(this.noPassRegions);
    this.noPassTerrains = AA.Utils.Parser.convertArrayFromParameter(this.noPassTerrains);
  };
})();

// ■ END AASkill2.coffee
//---------------------------------------------------------------------------
