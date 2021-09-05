// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ COMMON.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils;
  // * В ABS Z предметы и навыки имеют свои уникальные ID (поле idA)
  // * Это сделано так как предметы имели одинаковые ID что и навыки и было не удобно их различать
  // * Теперь предметы имеют idA = id + это значение
  _.ItemsIDStart = 9000;
  // * Навык (или предмет) имеют AASkill данные в себе
  _.isAAObject = function(skillIdOrObject) {
    if (isFinite(skillIdOrObject)) {
      if (skillIdOrObject <= 0) {
        return false;
      }
      skillIdOrObject = this.getAASkillObject(skillIdOrObject);
    }
    return skillIdOrObject.AASkill != null;
  };
  _.isAASkill = function(skillId) {
    return skillId <= this.ItemsIDStart;
  };
  _.isAAItem = function(skillId) {
    return skillId > this.ItemsIDStart;
  };
  _.getAASkillObject = function(skillId) {
    if (skillId <= 0) {
      return null;
    }
    if (this.isAAItem(skillId)) {
      return $dataItems[skillId - this.ItemsIDStart];
    } else {
      return $dataSkills[skillId];
    }
  };
  _.checkSwitch = function(value) {
    if (isFinite(value)) {
      return false;
    }
    return KDCore.SDK.checkSwitch(value);
  };
  _.isSamePointA = function(point1, point2) {
    return point1[0] === point2[0] && point1[1] === point2[1];
  };
  // * Является ли символ кнопкой панели навыков
  _.isSkillPanelSymbol = function(symbol) {
    var symbols;
    if (!String.any(symbol)) {
      return false;
    }
    symbols = AA.Input.skillPanelSymbols;
    return symbols.contains(symbol);
  };
  // * Получить иконку оружия навыка атаки (или иконку навыка атаки, если нет оружия)
  _.getAttackSkillWeaponIconIndex = function(skill, battler) {
    var e, weapon;
    try {
      weapon = battler.weapons()[0];
      if ((weapon != null) && weapon.iconIndex > 0) {
        return weapon.iconIndex;
      } else {
        return skill.iconIndex;
      }
    } catch (error) {
      e = error;
      AA.w(e);
      return 0;
    }
  };
  // * Методы распаковки и запаковки данных для хранения и сохранения игры
  _.unpackAASkill = function(aId) {
    var object;
    object = this.getAASkillObject(aId);
    if (object != null) {
      return object.AASkill;
    } else {
      return null;
    }
  };
  _.packAAPoint = function(point) {
    var x, y;
    if (point instanceof Game_Character) {
      return this.packAAEntity(point);
    } else {
      x = point.x;
      y = point.y;
      return {x, y};
    }
  };
  _.unpackAAPoint = function(data) {
    if (data.x != null) {
      return new KDCore.Point(data.x, data.y);
    } else {
      return this.unpackAAEntity(data);
    }
  };
  _.packAAEntity = function(entity) {
    if (entity == null) {
      return null;
    }
    if (entity === $gamePlayer) {
      return {
        type: 0
      };
    } else if (entity instanceof Game_Event) {
      return {
        type: 1,
        id: entity.eventId(),
        mapId: $gameMap.mapId() // * PARTY MEMBER
      };
    } else {
      return {
        // < 0 ?
        //    @subject = 1000 +
        //TODO: party member pack
        //$gamePlayer.followers().follower(index), from 0 to 3
        type: 2
      };
    }
  };
  _.unpackAAEntity = function(data) {
    if (data == null) {
      return null;
    }
    switch (data.type) {
      case 0:
        return $gamePlayer;
      case 1:
        if ($gameMap.mapId() === data.mapId) {
          return $gameMap.event(data.id);
        } else {
          return null;
        }
        break;
      case 2:
        //TODO: party member
        return null;
    }
    return null;
  };
  _.get8Dir = function(d) {
    switch (d) {
      case 1:
        return [4, 2];
      case 3:
        return [6, 2];
      case 7:
        return [4, 8];
      case 9:
        return [6, 8];
      default:
        return [0, 0];
    }
  };
  _.get4Dir = function(horz, vert) {
    if (horz === 4 && vert === 2) {
      return 1;
    }
    if (horz === 6 && vert === 2) {
      return 3;
    }
    if (horz === 4 && vert === 8) {
      return 7;
    }
    if (horz === 6 && vert === 8) {
      return 9;
    }
    return 0;
  };
})();

// ■ END COMMON.coffee
//---------------------------------------------------------------------------
