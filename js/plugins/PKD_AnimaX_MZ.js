/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */

/*:
 * @plugindesc (v.1.2)[PRO] Characters animations system
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 *
 * Detailed guide: http://kdworkshop.net/animax-plugin-guide/
 * (!better read guid and download Demo, it's not simple to use plugin)
 *
 * Plugin working directory: img\charactersAA\
 *
 * Add animations for characers in Plugin Parameters
 *
 * === Animations:
 *
 * For Actor, add Note: <xAnima:NAME>
 * For equipments (weapons), add Note: <xAnimaSet:NAME>
 * For event, add Comment: XA:NAME
 * 
 * === Extra layers:
 *
 * For equipments (weapons), add Note:
 * <xAnimaLayer:NAME>
 * <xAnimaLayerRelative:NAME>
 *
 * === Using with Alpha ABS Z:
 * Alpha ABS Z should be Below this plugin in Plugin Manager
 *
 * === Using with Alpha NET Z:
 * All plugin command automatically synchronizes via Network
 *
 * If you want execute plugin command in force local mode
 * use this script call BEFORE (above) plugin command:
 * PKD_ANIMAX.SetLocalMode();
 *
 * === Plugin have Plugin Commands
 *
 * ---------------------------------------------------------------------------
  *
  *
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 

 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc XAnima System Animations List
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc XAnima System animation layers list
 * 
 * @param isUseAltPreload:b
 * @text Is Use Alt. Preload?
 * @type boolean
 * @default false
 * @desc If true - plugin will preload all images from folder charactersAA (not works in browser)
 * 
 * @param isUseWebp:b
 * @text Is Use .Webp?
 * @type boolean
 * @default false
 * @desc Is use alternative .webp format for images in folder charactersAA? All images should be in .webp, not .png


 * @command ChangePlayerAnimationSet
 * @text Change Player Animation
 * @desc Change player animation set
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin paramters)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Reset Player Animation
 * @desc Reset player animation set to default (from Actor's Note)
 * 
 * 
 * @command PlayAnimationAction
 * @text Play Anima Action
 * @desc Start playing animation action for character
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin paramters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * 
 * @command StopAnimationAction
 * @text Stop Anima Action
 * @desc Stop looping animation action for character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @command AddPart
 * @text Add Layer
 * @desc Add extra layer on character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Layer ID form Animation Layers List (plugin paramters)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Relative?
 * @type boolean
 * @desc If false - layer will be loaded from CommonLayers folder, if true - layer will be loaded from character AnimaX folder
 * @default false
 * 
 * @command RemovePart
 * @text Remove Layer
 * @desc Remove extra layer from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Added layer ID form Animation Layers List (plugin paramters)
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Clear layers
 * @desc Remove all layers from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1


 */
/*~struct~LAnimaXPart:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for layer (also folder Name)
  
 * @param isLowerBodyPart:b
 * @text Is Lower Body Layer?
 * @type boolean
 * @default false
 * @desc If true - this layer will be half transparent when character in bushes
 
 * @param sortingLevel:i
 * @text Sorting order
 * @type number
 * @default 0
 * @min -100
 * @desc Layer sorting order
 *
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Layer offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Layer offset by Y coordinate
 *
 * @param layerRule:struct
 * @text Layer Settings
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Setting of layer direciton sprites positions
 *
 * @param baseRule:struct
 * @text Base Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Default animation layer settings. Using for all action without own rules

 * @param moveRule:struct
 * @text Move Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for moving

 * @param idleRule:struct
 * @text Idle Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for idle

 * @param dashRule:struct
 * @text Dashing Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for dashing

 * @param actionRules:structA
 * @text Actions Rules
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Optional] Animation layer settings for actions
*/

/*~struct~LAnimaXPartActionRule:

 * @param actionName
 * @text Action Name
 * @default
 * @desc Name of action that rules for

 * @param fileName
 * @text Extra File Name
 * @default 
 * @desc Filename for this action, leave empty to use filename same as Action Name

 * @param enabled:b
 * @text Is Enabled?
 * @type boolean
 * @default true
 * @desc If false - this layer will hide completly when this action is playing

 * @param actionRule:struct
 * @text Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Layer settings only for this action

*/

/*~struct~LAnimaXPartDefRule:

 * @param isHaveDirections:b
 * @text Is change direction?
 * @type boolean
 * @default true
 * @desc Layer have direction related sprites _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Is have frames?
 * @type boolean
 * @default true
 * @desc If false - layer have only one frame (0 - zero), if true - layer have same frame count as parent animation

*/

/*~struct~LAnimaXPartDirLevel:

 * @param noDir:b
 * @text Default
 * @type boolean
 * @on Below
 * @off Above
 * @default false
 * @desc Is layer sprite with no directions will be below character sprite?

 * @param dirD:b
 * @text Down (_D)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down direction sprites will be below character sprite?

 * @param dirL:b
 * @text Left (_L)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left direction sprites will be below character sprite?

 * @param dirR:b
 * @text Right (_R)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Right direction sprites will be below character sprite?

 * @param dirU:b
 * @text Up (_U)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up direction sprites will be below character sprite?

 * @param 8wayGroup
 * @text Diagonal Settings

 * @param dirDL:b
 * @parent 8wayGroup
 * @text Down Left (_DL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down Left direction sprites will be below character sprite?

 * @param dirDR:b
 * @parent 8wayGroup
 * @text Down Right (_DR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left Right direction sprites will be below character sprite?

 * @param dirUR:b
 * @parent 8wayGroup
 * @text Up Right (_UR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Right direction sprites will be below character sprite?

 * @param dirUL:b
 * @parent 8wayGroup
 * @text Up Left (_UL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Left direction sprites will be below character sprite?

*/

/*~struct~LAnimaX:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for animation (also folder Name)
 * 
 * @param base:s
 * @text Base
 * @type struct<LAnimaXSet>
 * @default
 * @desc Base animation set (for movement)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text In Battle
 * @type struct<LAnimaXSet>
 * @default
 * @desc Battle state animation set
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Dead
 * @type struct<LAnimaXSet>
 * @default
 * @desc Dead state animation set
 *
 * @param actions:structA
 * @text Actions
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Actions List
*/
/*~struct~LAnimaXSet:
 * @param move:s
 * @text Movement
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Movement animation settings
 * 
 * @param idle:s
 * @text Idle
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Idle animation settings [Optional]
 *
 * @param dash:s
 * @text Dashing
 * @type struct<LAnimaXParameters>
 * @default
 * @desc [PRO] Dashing animation settings [Optional]
 * 
 * @param moveToIdleDelay:i
 * @text Idle Delay
 * @type number
 * @default 30
 * @min 0
 * @desc Speed of change from movement to idle when character is not moving
*/
/*~struct~LAnimaXAction:
 * @param name
 * @text Action Name
 * @default Action
 * @desc Name for aciton
 * 
 * @param animation:s
 * @text Settings
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Action animation settings
*/
/*~struct~LAnimaXParameters:
 * @param isOneDirection:b
 * @text One Direction?
 * @type boolean
 * @default false
 * @desc Animation will use only one direciton (without _D, _L, _R, _U frames)
 * 
 * @param frames:i
 * @text Frames Count
 * @type number
 * @default 3
 * @min 1
 * @desc Frames count
 * 
 * @param speed:i
 * @text Speed
 * @type number
 * @default 15
 * @min 1
 * @desc Frames change speed in frames
 * 
 * @param expandFirstFrame:i
 * @text Repeat first frame times
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Times to repeat first frame (make only first frame dalayed)
 * 
 * @param is8Way:b
 * @text Is Support Diagonal?
 * @type boolean
 * @default false
 * @desc Animatin support 8 way diagonal movement, require _DL, _DR, _UL, _UR frames images
 * 
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Animation offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Animation offset by Y coordinate
*/
var Imported = Imported || {};
Imported.PKD_AnimaX = true;

var PKD_ANIMAX = {};
PKD_ANIMAX.version = 120; // 1.2.0

// * Загрузка доп. методо поддержки плагинов
PKD_ANIMAX.ApplyExtensions = () => {
  if (Imported.Alpha_NETZ == true) {
    PKD_ANIMAX.ApplyNETZPatch();
  }
};

// * Алтернативный способ предзагрузки (все изображения)
PKD_ANIMAX.PreloadAllImages = () => {
  if (!PKD_ANIMAX.IsUseAltPreload()) {
    return;
  }
  if (!Utils.isNwjs()) {
    console.warn('AnimaX alternative preload NOT works in Browser');
    return;
  }

  PKD_ANIMAX.WalkIn();
};

PKD_ANIMAX.WalkIn = () => {

  const fs = require('fs');
  const path = require('path');


  let base = path.dirname(process.mainModule.filename);
  base = path.join(base, 'img/charactersAA/');

  PKD_ANIMAX._basePath = base;

  var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

  walk(base, ImageManager.loadAllAnimaX);
};

// Generated by CoffeeScript 2.3.0
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function () {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function (commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function (symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function (symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function () {
  var L, a, ax, what;
  what = void 0;
  a = arguments;
  L = a.length;
  ax = void 0;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// * String ========================================================
String.prototype.isEmpty = function () {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function (str) {
  return (str == null) || str.isEmpty();
};

String.any = function (str) {
  return !String.isNullOrEmpty(str);
};

String.prototype.replaceAll = function (search, replacement) {
  var target;
  target = this;
  return target.split(search).join(replacement);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function (rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function (pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }


  // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.5.1
// * Классы и методы из KDCore
PKD_ANIMAX.isMV = function() {
  return Utils.RPGMAKER_NAME.contains("MV");
};

// * Utils =========================================================
PKD_ANIMAX.getEventCommentValue = function(commentCode, list) {
  var comment, e, i, item;
  try {
    if (list && list.length > 1) {
      i = 0;
      while (i < list.length) {
        item = list[i++];
        if (!item) {
          continue;
        }
        if (item.code === 108) {
          comment = item.parameters[0];
          if (comment.contains(commentCode)) {
            return comment;
          }
        }
      }
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return null;
};

PKD_ANIMAX.hasMeta = function(symbol, obj) {
  return (obj.meta != null) && (obj.meta[symbol] != null);
};

PKD_ANIMAX.getValueFromMeta = function(symbol, obj) {
  if (!PKD_ANIMAX.hasMeta(symbol, obj)) {
    return null;
  }
  return obj.meta[symbol];
};

// * Array ========================================================
Array.prototype.delete = function() {
  var L, a, ax, what;
  what = void 0;
  a = arguments;
  L = a.length;
  ax = void 0;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// * String ========================================================
String.prototype.isEmpty = function() {
  return this.length === 0 || !this.trim();
};

String.isNullOrEmpty = function(str) {
  return (str == null) || str.isEmpty();
};

String.any = function(str) {
  return !String.isNullOrEmpty(str);
};

// * ParametersManager
//------------------------------------------------------------------------------
PluginManager.getPluginParametersByRoot = function(rootName) {
  var pluginParameters, property;
  for (property in this._parameters) {
    if (this._parameters.hasOwnProperty(property)) {
      pluginParameters = this._parameters[property];
      if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
        return pluginParameters;
      }
    }
  }
  return PluginManager.parameters(rootName);
};

PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
  return pluginParameters[key] != null;
};

//! Нету обработки цвета
//@[AUTO EXTEND]
PKD_ANIMAX.ParamLoader = class ParamLoader {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
    this.params = this.parseParameters(this.paramsRaw);
  }

  parseParameters(paramSet) {
    var clearKey, key, params, typeKey, value;
    params = {};
    for (key in paramSet) {
      value = paramSet[key];
      clearKey = this.parseKey(key);
      typeKey = this.parseKeyType(key);
      params[clearKey] = this.parseParamItem(typeKey, value);
    }
    return params;
  }

  parseKey(keyRaw) {
    return keyRaw.split(":")[0];
  }

  parseKeyType(keyRaw) {
    return keyRaw.split(":")[1];
  }

  // * Проверка, загружены ли параметры плагина
  isLoaded() {
    return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
  }

  // * Имя параметра без ключа
  isHasParameter(paramName) {
    return this.params[paramName] != null;
  }

  
    // * Возвращает значение параметра (def - по умолчанию, если не найден)
  getParam(paramName, def) {
    if (this.isHasParameter(paramName)) {
      return this.params[paramName];
    } else {
      return def;
    }
  }

  // * Данные ключи должны идти после названия параметра через :
  // * Пример: @param ShowDelay:int, @param TestBool:bool
  // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
  parseParamItem(type, item) {
    var e;
    if (type == null) {
      return item;
    }
    try {
      switch (type) {
        case "int":
        case "i":
          return parseInt(item);
        case "intA": // * массив чисел
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("int", e);
            });
          } else {
            return [];
          }
          break;
        case "bool":
        case "b":
        case "e":
          return eval(item);
        case "struct":
        case "s":
          if (String.any(item)) {
            return this.parseParameters(JsonEx.parse(item));
          } else {
            return null;
          }
          break;
        case "structA": // * массив структур
          return JsonEx.parse(item).map((e) => {
            return this.parseParameters(JsonEx.parse(e));
          });
        case "str":
          return item;
        case "strA":
          if (String.any(item)) {
            return JsonEx.parse(item).map((e) => {
              return this.parseParamItem("str", e);
            });
          } else {
            return [];
          }
          break;
        case "note": // * если несколько строк в тексте
          return JsonEx.parse(item);
        default:
          return item;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return item;
    }
  }

};

// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.LoadPluginSettings = function() {
  var a, animList, i, len, partsList;
  PKD_ANIMAX.Params = new PKD_ANIMAX.ParamLoader("xAnimations:structA");
  animList = PKD_ANIMAX.Params.getParam("xAnimations", []);
  for (i = 0, len = animList.length; i < len; i++) {
    a = animList[i];
    a.actions = XAnimaTools.convertActionsFromParameters(a.actions);
  }
  PKD_ANIMAX.Animations = animList;
  partsList = PKD_ANIMAX.Params.getParam("xAnimaParts", []);
  PKD_ANIMAX.AnimationParts = partsList;
  PKD_ANIMAX.RegisterPluginCommnads();
};

PKD_ANIMAX.IsUseAltPreload = function() {
  return PKD_ANIMAX.Params.getParam('isUseAltPreload', false);
};

PKD_ANIMAX.IsUseWebp = function() {
  return PKD_ANIMAX.Params.getParam('isUseWebp', false);
};

PKD_ANIMAX.RegisterPluginCommnads = () => {

    const pluginName = "PKD_AnimaX";

    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName);
    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName + "_MZ");

};

PKD_ANIMAX.RegisterPluginCommnadsForName = (pluginName) => {

    PluginManager.registerCommand(pluginName, 'ChangePlayerAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            if(String.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetPlayerAnimationSet', args => {
        try {
            PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet(null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayAnimationAction', args => {
        try {
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'StopAnimationAction', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'AddPart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            let isRelative = eval(args.isRelative);
            PKD_ANIMAX.PluginCommand_AddPart(charaId, partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'RemovePart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            PKD_ANIMAX.PluginCommand_RemovePart(charaId, partId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ClearParts', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ClearParts(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

};
(function () {

    PKD_ANIMAX.PluginCommand_ChangePlayerAnimationSet = (animationSetName) => {
        try {
            $gamePlayer.setExternalAnimaX(animationSetName);
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_PlayAnimationAction = (actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                if(!String.any(actionName)) {
                    char.resetXAnima();
                    if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                        PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                    }
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char)
            {
                char.resetXAnima();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.addNewXAnimPart(partId, isRelative);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, isRelative, true);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.removeXAnimPart(partId);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.clearXAnimParts();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkClearAllParts();
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId) => {
        var char = null;
        if(PKD_ANIMAX.IsNetworkGame()) {
            $gameTemp._lastAxNetworkChar = null;
        }
        try {
            if (!charId || charId == 0) {
                char = $gamePlayer;
            } else if (charId < 0) {
                let int = $gameMap._interpreter;
                charId = int.eventId();
                if (charId > 0) {
                    char = $gameMap.event(charId);
                } else {
                    return null;
                }
            } else {
                char = $gameMap.event(charId);
            }
            if (!char) return null;
            if (!char.isAnimX()) return null;
            if(PKD_ANIMAX.IsNetworkGame()) {
                if(char == $gamePlayer) {
                    $gameTemp._lastAxNetworkChar = 0;
                } else { // * Иначе событие на карте
                    $gameTemp._lastAxNetworkChar = char.eventId();
                }
            }
            return char;
        } catch (e) {
            console.warn(e, "Can't find character with ID " + charId + " for PlayAnimationAction");
        }
    };

    PKD_ANIMAX.SetInterpreterToWait = (char) => {
        let int = $gameMap._interpreter;
        int.xAnimaTarget = char;
        int._waitMode = 'xAnima';
    };

})();
// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.IsNetworkGame = function() {
  return Imported.Alpha_NETZ === true && ANNetwork.isConnected();
};

// * Некоторые команды плагина не будут автоматически синхронизированы
// * Действует только ОДИН РАЗ (автоснятие флага), надо перед каждой командой ставить
PKD_ANIMAX.SetLocalMode = function() {
  return $gameTemp.netAnimaXLocal = true;
};

PKD_ANIMAX.InLocalMode = function() {
  return $gameTemp.netAnimaXLocal === true;
};

PKD_ANIMAX.ApplyNETZPatch = function() {
  var _alias_nAPI_onCustomCommand3434343;
  PKD_ANIMAX.SendNetworkFlagAnimaXRefresh = function(actorId) {
    var data;
    data = {
      actorId,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:refreshXAnima", data);
  };
  PKD_ANIMAX.SendNetworkPlayerExternalAnimaX = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      animaX: $gameSystem.lastPlayerAnimaXExternProfile,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:playerExternal", data);
  };
  PKD_ANIMAX.SendNetworkAnimaXAction = function(name, isLoop, isWait) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      name: name,
      isLoop,
      isWait
    };
    nAPI.sendCustomCommand("animaX:action", data);
  };
  PKD_ANIMAX.SendNetworkChangePart = function(partId, isRelative, isAdd) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      partId,
      isRelative,
      isAdd
    };
    nAPI.sendCustomCommand("animaX:changePart", data);
  };
  PKD_ANIMAX.SendNetworkClearAllParts = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId()
    };
    nAPI.sendCustomCommand("animaX:clearAllParts", data);
  };
  _alias_nAPI_onCustomCommand3434343 = nAPI.onCustomCommand;
  nAPI.onCustomCommand = function(name, data) {
    var actorId, animaX, e, mapId, ref, ref1;
    _alias_nAPI_onCustomCommand3434343.call(this, ...arguments);
    try {
      if (name === "animaX:refreshXAnima") {
        ({actorId, mapId} = data);
        //return unless $gameMap.mapId() == mapId
        // * Через поле, чтобы не было цикла отправки команды
        if ((ref = $gameActors.actor(actorId)) != null) {
          ref._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:playerExternal") {
        ({actorId, animaX, mapId} = data);
        // * Для себя не нужно, так как используется другая gameSystem переменная
        if (actorId === $gameParty.leader().actorId()) {
          return;
        }
        if ($gameSystem.netAnimaXExternelProfiles == null) {
          $gameSystem.netAnimaXExternelProfiles = {};
        }
        $gameSystem.netAnimaXExternelProfiles[actorId] = animaX;
        if ((ref1 = $gameActors.actor(actorId)) != null) {
          ref1._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:action") {
        PKD_ANIMAX.onAnimaXActionFromNetwork(data);
        return;
      } else if (name === "animaX:changePart") {
        PKD_ANIMAX.onAnimaXChangePartFromNetwork(data);
        return;
      } else if (name === "animaX:clearAllParts") {
        PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork(data);
        return;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXActionFromNetwork = function(data) {
    var actorId, char, charId, e, isLoop, isWait, mapId, name;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      ({charId, name, isLoop, isWait} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (String.any(name)) {
        return char.startAnimaXCustomAction(name, isLoop, isWait);
      } else {
        return char.resetXAnima();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXChangePartFromNetwork = function(data) {
    var actorId, char, charId, e, isAdd, isRelative, mapId, partId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId, partId, isRelative, isAdd} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (isAdd === true) {
        return char.addNewXAnimPart(partId, isRelative);
      } else {
        return char.removeXAnimPart(partId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork = function(data) {
    var actorId, char, charId, e, mapId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      return char != null ? char.clearXAnimParts() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ NETCharacter.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__refresh, ALIAS__update, _;
    //@[DEFINES]
    _ = NETCharacter.prototype;
    //@[ALIAS]
    ALIAS__refresh = _.refresh;
    _.refresh = function() {
      ALIAS__refresh.call(this);
      return this.refreshAnimaX();
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
    };
    _.getCurrentAnimaXProfile = function() {
      var equipAnimaXSet;
      if (this.isAnimX()) {
        equipAnimaXSet = this._getEquipmentAnimaXSet();
        if (String.any(equipAnimaXSet)) {
          return equipAnimaXSet;
        }
      }
      return this.getInitialXProfile();
    };
    _.getInitialXProfile = function() {
      var actor;
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return null;
      }
      if (($gameSystem.netAnimaXExternelProfiles != null) && String.any($gameSystem.netAnimaXExternelProfiles[actor.actorId()])) {
        return $gameSystem.netAnimaXExternelProfiles[actor.actorId()];
      } else {
        return PKD_ANIMAX.getValueFromMeta('xAnima', actor.actor());
      }
    };
    // * Если хост выходит из игры, то на клиенте из-за обновления AnimaX вылетает ошибка
    // * так как данные игрока удаляются, поэтому доп. try catch
    _.getBattlerForAnimaX = function() {
      var actor, e;
      try {
        actor = this.actor();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        actor = $gameParty.leader();
        // * Чтобы не было спама ошибки в консоль (временное решение)
        //TODO: Временное решение
        // * Т.к. если хост выходит игра заканчивается (относительно NETZ 0.7)
        if (this.isAnimX()) {
          this.getBattlerForAnimaX = function() {
            return $gameParty.leader();
          };
        }
      }
      return actor;
    };
    //TODO: Временное решение
    _.isDashingForAnimaX = function() {
      return this._moveSpeed > 4;
    };
  })();
  (function() {    // ■ END NETCharacter.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Actor.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___fillNetworkObserver, _;
    
    //@[DEFINES]
    _ = Game_Actor.prototype;
    
    //@[ALIAS]
    ALIAS___fillNetworkObserver = _._fillNetworkObserver;
    _._fillNetworkObserver = function() {
      ALIAS___fillNetworkObserver.call(this);
      // * Эти все поля для обновления Visual Equipment
      this.netDataObserver.readField(this, '_isNeedAnimaXRefresh');
      this.netDataObserver.readField(this, 'axLayersByEquips');
      this.netDataObserver.readField(this, 'axLayersByEquipsRelative');
      this.netDataObserver.readField(this, 'axPreviousLayers');
    };
  })();
  return (function() {    // ■ END Game_Actor.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Map.prototype;
    
    // * Этот метод появился только в NETZ 0.7
    if (_.networkCharacterByActorId == null) {
      _.networkCharacterByActorId = function(actorId) {
        return this.netChars().find(function(c) {
          return c.playerData().actorId === actorId;
        });
      };
    }
  })();
};

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_ANIMAX.LoadPluginSettings();
    PKD_ANIMAX.ApplyExtensions();
    PKD_ANIMAX.PreloadAllImages();
    return ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    // * Слои которые надо снять, после обновления экипировки
    this.axPreviousLayers = [];
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    this.refreshAnimaXLayers();
    this.requestRefreshAnimaX();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.requestRefreshAnimaX = function() {
    return this._isNeedAnimaXRefresh = true;
  };
  _.isNeedAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh === true;
  };
  _.onAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh = null;
  };
  _.getAnimaXEquipmentSet = function() {
    var e, equipSet, i, len, ref;
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipSet = PKD_ANIMAX.getValueFromMeta('xAnimaSet', e);
      if (String.any(equipSet)) {
        return equipSet;
      }
    }
    return null;
  };
  // * Чтобы не удалялись части, которые добавленны параметром плагина
  // * используется массив axPreviousLayers, в котором храняться части
  // * которые были в прошлый раз, но в этот их уже нету - т.е. их надо удалить
  _.refreshAnimaXLayers = function() {
    var e, equipLayer, i, len, ref;
    this.axPreviousLayers = [...this.axLayersByEquips, ...this.axLayersByEquipsRelative];
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayer', e);
      this._registerLayerByEquip(equipLayer, false);
      equipLayer = PKD_ANIMAX.getValueFromMeta('xAnimaLayerRelative', e);
      this._registerLayerByEquip(equipLayer, true);
    }
  };
  _._registerLayerByEquip = function(name, isRelative) {
    if (!String.any(name)) {
      return;
    }
    this.axPreviousLayers.delete(name);
    if (isRelative === true) {
      this.axLayersByEquipsRelative.push(name);
    } else {
      this.axLayersByEquips.push(name);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    //@[FROM Game_CharacterBase]

    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return this._isHaveAnimaX === true;
    };
    // * ID набора анимаций (по нему определяется имя папки)
    _.animXId = function() {
      return this._axId;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return this._axIdle() != null;
    };
    // * Есть ли Dashing (бег) анимация у текущего состояния
    _.isHaveDashAnimaX = function() {
      return this._axDashing() != null;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function(state) {
      return this._axStates[state] != null;
    };
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return this.isAnimX() && this.getCurrentAnimX().isAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    // * Также Dashing тоже является анимацией движения
    _.isInMovementAnimaX = function() {
      return this._axCurrent === this._axMovement();
    };
    _.isInAnyMovementAnimaX = function() {
      return this.isInMovementAnimaX() || this.isInDashingAnimaX();
    };
    // * Находится ли анимация текущая в состоянии Idle
    _.isInIdleAnimaX = function() {
      return this._axCurrent === this._axIdle();
    };
    // * Находится ли анимация текущая в состоянии Dashing (Бег)
    _.isInDashingAnimaX = function() {
      return this._axCurrent === this._axDashing();
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {
      return this._xAnimaToIdleTimer = 0; // * Сбро таймера перехода в Idle
    };
    
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {
      return this.resetXAnima();
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      var anima;
      if (this.isInAnyMovementAnimaX()) {
        return false;
      }
      if (!this.isInAnimXAction()) {
        // * Если не в действии, то нет (т.к. нет действия)
        return false;
      }
      anima = this.getCurrentAnimX();
      // * Idle тоже считается действием! Поэтому доп. проверка isAction
      return anima.isAction() && anima.isWait();
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function(name) {
      return this._axAvailableActionsList.contains(name);
    };
    // -----------------------------------------------------------------------

    // * Текущий XAnimaSet
    _.getCurrentAnimX = function() {
      return this._axCurrent;
    };
    // * Запустить действие
    _.startAnimaXAction = function(animX) {
      return this._axCurrent = animX;
    };
    // * Переключить состояние анимации (обычное, бой, и т.д.)
    _.switchToXAnimaState = function(state) {
      if (this.isHaveAnimaXState(state)) {
        this._axState = state;
        if (!this.isInAnimXAction()) {
          this.resetXAnima();
        }
      } else {
        //console.warn 'AnimaX Set for ' + state + ' not registed'
        this.resetXAnimaState();
      }
    };
    // * Инициализация
    // * Base состояние - стандартное, инициализируется всегда
    // * Если нет Base или нет movement, то не акитвируется система
    _.initAnimaX = function(_axId, data) {
      this._axId = _axId;
      this.clearXAnimParts();
      this._axAvailableActionsList = [];
      this._axPreloadedActions = {};
      this._axStates = {};
      this._axState = 'base'; // * Базовое состояние
      this.registerAnimaXState(this._axState, data);
      if (this._axStates[this._axState] == null) {
        return;
      }
      this.resetXAnima();
      this._isHaveAnimaX = true;
      this.getCurrentAnimX().preLoad();
    };
    // * Добавить анимацию для состояния
    _.registerAnimaXState = function(state, data) {
      var dashSet, e, idleSet, moveSet;
      try {
        if (data == null) {
          return;
        }
        moveSet = this._createAnimaXSetFromParams(0, state, data.move);
        // * moveSet обязателен!
        if (moveSet == null) {
          return;
        }
        moveSet.preLoad();
        // * idleSet и dashSet - опционально
        idleSet = null;
        dashSet = null;
        idleSet = this._createAnimaXSetFromParams(1, state, data.idle);
        if (idleSet != null) {
          idleSet.preLoad();
        }
        if ((idleSet != null) && (data.moveToIdleDelay != null)) {
          idleSet.moveToIdleDelay = data.moveToIdleDelay;
        }
        dashSet = this._createAnimaXSetFromParams(3, state, data.dash);
        if (dashSet != null) {
          dashSet.preLoad();
        }
        this._createXAnimaSetsForState(state, moveSet, idleSet, dashSet);
      } catch (error) {
        e = error;
        console.warn(e);
        this._axStates[state] = null;
      }
    };
    // * Сбросить состояние до базового
    _.resetXAnimaState = function() {
      this._axState = 'base';
      if (!this.isInAnimXAction()) {
        this.resetXAnima();
      }
    };
    // * Сбросить анимацию
    _.resetXAnima = function() {
      this._inAnimXAction = false;
      this._xAnimaToIdleTimer = 0;
      this._setAnimaXToMovement();
    };
    // * Добавить действие (зарегестрировать, чтобы не было ошибок если вызвано, а нету файлов)
    _.registerAnimaXAction = function(actionName) {
      return this._axAvailableActionsList.push(actionName);
    };
    // -----------------------------------------------------------------------
    _._initMembersAnimaX = function() {
      this._xAnimaPartsRequireRefresh = false;
      this._xAnimaToIdleTimer = 0;
      return this._isHaveAnimaX = false;
    };
    _._createXAnimaSetsForState = function(state, moveSet, idleSet, dashSet) {
      this._axStates[state] = {};
      moveSet.preLoad();
      this._axStates[state].moveSet = moveSet;
      if (idleSet != null) {
        idleSet.isLoop = true;
        idleSet.preLoad();
        this._axStates[state].idleSet = idleSet;
      } else {
        this._axStates[state].idleSet = null;
      }
      // * Dashing был введён с обновлением 1.1, является опциональным как и Idle
      if (dashSet != null) {
        this._axStates[state].dashSet = dashSet;
        dashSet.preLoad();
      } else {
        this._axStates[state].dashSet = null;
      }
    };
    _._createAnimaXSetFromParams = function(type, state, data) {
      var axSet, e;
      axSet = null;
      try {
        if (type === 0) {
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForMove(this.animXId(), state, data);
          }
        } else if (type === 1) { // * IDLE
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForIdle(this.animXId(), state, data);
          }
        } else if (type === 3) { // * DASHING
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForDashing(this.animXId(), state, data);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        axSet = null;
      }
      return axSet;
    };
    _._updateAnimX = function() {
      this._updateAnimXRefresh();
      if (this.isShouldWaitAnimaXAction()) {
        return;
      }
      this._updateMovingAnimX();
      if (this.isHaveIdleAnimaX() && this.isInAnyMovementAnimaX()) {
        return this._updateMoveIdleAnimaX();
      }
    };
    _._updateMovingAnimX = function() {
      if (!this.isMoving()) {
        return;
      }
      if (this.isHaveDashAnimaX()) {
        this._updateMovingDashingAnimX();
      }
      this._xAnimaToIdleTimer = 0;
      if (!this.isInAnyMovementAnimaX()) {
        return this.resetXAnima();
      }
    };
    _._updateMovingDashingAnimX = function() {
      if (this.isDashingForAnimaX()) {
        if (!this.isInDashingAnimaX()) {
          this._setAnimaXToDashing();
        }
      } else if (this.isInDashingAnimaX()) {
        this._setAnimaXToMovement();
      }
    };
    _._updateMoveIdleAnimaX = function() {
      if (!this.isMoving()) {
        this._xAnimaToIdleTimer++;
        if (this._xAnimaToIdleTimer >= this._getAnimaXMoveToIdleDelay()) {
          return this._setAnimaXToIdle();
        }
      }
    };
    _._getAnimaXMoveToIdleDelay = function() {
      return this._axIdle().moveToIdleDelay;
    };
    _._axMovement = function() {
      return this._axStates[this._axState].moveSet;
    };
    _._axIdle = function() {
      return this._axStates[this._axState].idleSet;
    };
    _._axDashing = function() {
      return this._axStates[this._axState].dashSet;
    };
    _._setAnimaXToIdle = function() {
      return this._axCurrent = this._axIdle();
    };
    _._setAnimaXToMovement = function() {
      return this._axCurrent = this._axMovement();
    };
    _._setAnimaXToDashing = function() {
      return this._axCurrent = this._axDashing();
    };
    _.clearAnimaX = function() {
      this.resetXAnima();
      this._isHaveAnimaX = false;
      this.initAnimaX(null, null);
    };
    // PARTS (LAYERS)
    // ----------------------------------------------------------------------
    _.isAnimXPartsChanged = function() {
      return this._xAnimaPartsRequireRefresh === true;
    };
    _.onAnimXPartsRefreshed = function() {
      return this._xAnimaPartsRequireRefresh = false;
    };
    _.addNewXAnimPart = function(partId, isRelative = false) {
      var partSet;
      if (this.animaXParts[partId] != null) {
        return;
      }
      partSet = XAnimaTools.createXAnimaPart(this.animXId(), partId, isRelative);
      if (partSet == null) {
        return;
      }
      this.animaXParts[partId] = partSet;
      this._xAnimaPartsRequireRefresh = true;
    };
    _.removeXAnimPart = function(partId) {
      this.animaXParts[partId] = null;
      delete this.animaXParts[partId];
      this._xAnimaPartsRequireRefresh = true;
    };
    _.clearXAnimParts = function() {
      this.animaXParts = {};
      this._xAnimaPartsRequireRefresh = true;
    };
    // -----------------------------------------------------------------------

    // * Запустить кастомное действие с параметрами (проверка предзагруженных)
    _.startAnimaXCustomAction = function(name, isLoop = false, isWait = false) {
      var actionParams, animaX;
      if (!this.isHaveAnimaXActionWithName(name)) {
        return false;
      }
      if (this.isAnimaXActionIsPreloaded(name)) {
        animaX = this.getPreloadAnimaXActionSet(name);
      } else {
        actionParams = XAnimaTools.getXAnimaParamsForAction(name, this.animXId());
        animaX = this.createAnimaXActionSet(actionParams);
      }
      if (animaX != null) {
        animaX.waitActionEnd = isWait;
        animaX.isLoop = isLoop;
        this.startAnimaXAction(animaX);
        if (PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
          PKD_ANIMAX.SendNetworkAnimaXAction(name, isLoop, isWait);
        }
        $gameTemp.netAnimaXLocal = null;
        return true;
      }
      return false;
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima и ABS
    // -----------------------------------------------------------------------
    // * Предзагрузить действие
    _.preloadAnimaXAction = function(actionParams, isWaiting) {
      var animaSet;
      if (actionParams == null) {
        return;
      }
      animaSet = this.createAnimaXActionSet(actionParams);
      if (animaSet != null) {
        animaSet.preLoad();
      }
      this._axPreloadedActions[actionParams.name] = animaSet;
    };
    // * Создать AnimaXSet из параметров плагина анимации
    _.createAnimaXActionSet = function(actionParams) {
      var animaSet, name;
      name = actionParams.name;
      animaSet = XAnimaTools.createXAnimaSetForAction(this.animXId(), actionParams);
      animaSet.preLoad();
      return animaSet;
    };
    _.isAnimaXActionIsPreloaded = function(actionName) {
      return this.getPreloadAnimaXActionSet(actionName) != null;
    };
    _.getPreloadAnimaXActionSet = function(actionName) {
      return this._axPreloadedActions[actionName];
    };
    _.refreshAnimaX = function() {
      var animaXProfile;
      animaXProfile = this.getCurrentAnimaXProfile();
      if ((this._currentAnimaXProfile != null) && (animaXProfile == null)) {
        this._currentAnimaXProfile = null;
        if (this.isAnimX()) {
          this.clearAnimaX();
        }
        return;
      }
      if (this._currentAnimaXProfile === animaXProfile) {

      } else {
        this.createNewAnimaXForCharacter(animaXProfile);
      }
    };
    _.createNewAnimaXForCharacter = function(animaXProfile) {
      var animaX;
      animaX = XAnimaTools.getXAnimaParamsForState('base', animaXProfile);
      if (animaX == null) {
        if (String.any(animaXProfile)) {
          console.warn("Can't find Base animation settings for " + animaXProfile);
        }
        return;
      }
      this._currentAnimaXProfile = animaXProfile;
      this.initAnimaX(animaXProfile, animaX);
      this.registerAnimaXActions(animaXProfile);
      this.refreshAnimaXLayers();
    };
    // * Получить профиль анимации (для загрузки)
    _.getCurrentAnimaXProfile = function() {
      return null;
    };
    // * Получить начальный профиль персонажа (без экипировки)
    _.getInitialXProfile = function() {
      return null;
    };
    // * Регистрация действий (названий) и предзагрузка
    _.registerAnimaXActions = function(animaXProfile) {
      var action, actionList, i, len;
      actionList = XAnimaTools.getXAnimaActionList(animaXProfile);
      for (i = 0, len = actionList.length; i < len; i++) {
        action = actionList[i];
        this.registerAnimaXAction(action.name);
        if (this.isAnimaXAADefaultAction(action.name)) {
          this.preloadAnimaXAction(action);
        }
      }
    };
    // * Набор имён стандартных действий (нужны для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Проверка обновления состояния анимации на Battler
    _._updateAnimXRefresh = function() {
      var b;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return;
      }
      if (b.isNeedAnimaXRefresh()) {
        this.refreshAnimaX();
        this.refreshAnimaXLayers();
        b.onAnimaXRefresh();
      }
    };
    _.getBattlerForAnimaX = function() {
      return null;
    };
    // * Получить набор экипировки для Анимации
    _._getEquipmentAnimaXSet = function() {
      var b, equipmentXSet;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return null;
      }
      equipmentXSet = b.getAnimaXEquipmentSet();
      if (equipmentXSet != null) {
        return this.getInitialXProfile() + "_" + equipmentXSet;
      }
      return null;
    };
    // * Обновить слои с учётом экипировки
    return _.refreshAnimaXLayers = function() {
      var actor, e, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      if (!this.isAnimX()) {
        return;
      }
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return;
      }
      try {
        ref = actor.axLayersByEquips;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          this.addNewXAnimPart(l, false);
        }
        ref1 = actor.axLayersByEquipsRelative;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          l = ref1[j];
          this.addNewXAnimPart(l, true);
        }
        ref2 = actor.axPreviousLayers;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          l = ref2[k];
          this.removeXAnimPart(l);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
  })();
  (function() {    // * Действия
    // -----------------------------------------------------------------------
    _.startAnimaXAA_Attack = function() {
      return this.startAnimaXCustomAction('Attack', false, true);
    };
    return _.startAnimaXAA_Defense = function() {
      return this.startAnimaXCustomAction('Defense', true, false);
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return false;
    };
    // * ID набора анимаций
    _.animXId = function() {
      return null;
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {};
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {};
    
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return false;
    };
    // * Находится ли анимация в действии и необходимо ждать завершения
    _.isAnimXIsBusy = function() {
      return this.isAnimX() && this.isInAnimXAction() && this.isShouldWaitAnimaXAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    _.isInMovementAnimaX = function() {
      return false;
    };
    //?UPD
    // * Надо ли применять анимацию бега на персонаже
    _.isDashingForAnimaX = function() {
      return false;
    };
    //?UPD
    // * Находился ли персонаж в какой-либо анимации движения (или бег)
    _.isInAnyMovementAnimaX = function() {
      return false;
    };
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
      return false;
    };
    //?UPD
    // * Находится ли анимация текущая в состоянии Dashing (Бег)
    _.isInDashingAnimaX = function() {
      return false;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return false;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function() {
      return false;
    };
    //?UPD
    // * Есть ли Dashing (бег) анимация у текущего состояния
    _.isHaveDashAnimaX = function() {
      return false;
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function() {
      return false;
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      return false;
    };
    // * Отключить анимацию
    _.clearAnimaX = function() {};
    // * Действие является стандартным (используется для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Анимация действия была предзагруженна
    _.isAnimaXActionIsPreloaded = function() {
      return false;
    };
    // * Были ли изменены слои (части) анимации?
    _.isAnimXPartsChanged = function() {
      return false;
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__erase, ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__erase = _.erase;
  _.erase = function() {
    if (this.isAnimX()) {
      this.clearXAnimParts();
    }
    ALIAS__erase.call(this);
  };
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this);
    this._isHaveAnimaX = false;
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.getCurrentAnimaXProfile = function() {
    var animXParameter, list;
    if (this.page() == null) {
      return null;
    }
    list = this.page().list;
    animXParameter = PKD_ANIMAX.getEventCommentValue('XA:', list);
    if (animXParameter != null) {
      return this._parseAnimaXAParameterForEvent(animXParameter);
    }
    return null;
  };
  _._parseAnimaXAParameterForEvent = function(animXParameter) {
    var id, parts;
    if (animXParameter == null) {
      return;
    }
    parts = animXParameter.split(":");
    id = parts[1];
    return id;
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    var actor;
    actor = this.getBattlerForAnimaX();
    if (actor == null) {
      return null;
    }
    return PKD_ANIMAX.getValueFromMeta('xAnima', actor.actor());
  };
  _.getBattlerForAnimaX = function() {
    return this.actor();
  };
  //?UPD
  _.isDashingForAnimaX = function() {
    return $gamePlayer.isDashing();
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'xAnima') {
      return this._updateXAnimaWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._updateXAnimaWait = function() {
    var waiting;
    waiting = this.xAnimaTarget.isInAnimXAction();
    if (!waiting) {
      this._waitMode = '';
      this.xAnimaTarget = null;
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Чтобы приминялась анимация с оружием (если была)
    if (this._actors.includes(actorId)) { // * Если был добавлен
      actor = $gameActors.actor(actorId);
      if (actor != null) {
        actor.refresh();
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (this.isAnimXIsBusy()) {
      // * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
      return false;
    }
    return ALIAS__canMove.call(this);
  };
  //?UPD
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima и ABS
  // -----------------------------------------------------------------------
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    if (String.any($gameSystem.lastPlayerAnimaXExternProfile)) {
      return $gameSystem.lastPlayerAnimaXExternProfile;
    } else {
      if ($gameParty.leader() != null) {
        return PKD_ANIMAX.getValueFromMeta('xAnima', $gameParty.leader().actor());
      } else {
        return null;
      }
    }
  };
  _.isAnimaXAADefaultAction = function(actionName) {
    return ['Attack', 'Defense', 'Skill'].contains(actionName);
  };
  _.getBattlerForAnimaX = function() {
    return $gameParty.leader();
  };
  _.setExternalAnimaX = function(name) {
    $gameSystem.lastPlayerAnimaXExternProfile = name;
    this.refresh();
    this.axExternalAnimaXForNet();
  };
  _.axExternalAnimaXForNet = function() {
    if (PKD_ANIMAX.InLocalMode()) {
      $gameTemp.netAnimaXLocal = null;
      return;
    } else {
      if (PKD_ANIMAX.IsNetworkGame()) {
        PKD_ANIMAX.SendNetworkPlayerExternalAnimaX();
      }
    }
  };
  _.isDashingForAnimaX = function() {
    return this.isDashing();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAnimaX = function(filename) {
    if (PKD_ANIMAX.IsUseWebp()) {
      return this.loadAnimaXw(filename);
    } else {
      return this.loadBitmap('img/charactersAA/', filename, 0, false);
    }
  };
  _.loadAnimaXw = function(filename) {
    return this.axLoadWepbBitmap('img/charactersAA/', filename, 0, false);
  };
  _.axLoadWepbBitmap = function(folder, filename, hue, smooth) {
    if (PKD_ANIMAX.isMV()) {
      return this._axLoadWepbBitmapMV(...arguments);
    } else {
      return this._axLoadWepbBitmapMZ(folder, filename);
    }
  };
  _.loadAllAnimaX = function(err, list) {
    var e, file, filename, i, len, path;
    try {
      if (err != null) {
        return console.warn(err);
      } else {
        //fileFormat = ".png"
        //fileFormat = ".webp" if PKD_ANIMAX.IsUseWebp()
        console.log("AnimaX, try preload " + list.length + " animation files");
        path = PKD_ANIMAX._basePath;
        for (i = 0, len = list.length; i < len; i++) {
          file = list[i];
          if (!file.contains(".png")) {
            continue;
          }
          filename = file.replace(path, "");
          filename = filename.replace(".png", "");
          filename = filename.replaceAll("\\", "/");
          ImageManager.loadAnimaX(filename);
        }
        /*finalName = 'img/charactersAA/' + filename + fileFormat
        if PKD_ANIMAX.isMV()
            #ImageManager.loadNormalBitmap(
         *    finalName, 0
            #)
            ImageManager.loadAnimaX(filename)
        else
            ImageManager.loadBitmapFromUrl(finalName) */
        return console.log('AnimaX, preload done');
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------

(function(){
    ImageManager._axLoadWepbBitmapMV = function(folder, filename, hue, smooth) {
        if (filename) {
            var path = folder + encodeURIComponent(filename) + '.webp';
            var bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    ImageManager._axLoadWepbBitmapMZ = function(folder, filename) {
        if (filename) {
            const url = folder + Utils.encodeURI(filename) + ".webp";
            return this.loadBitmapFromUrl(url);
        } else {
            return this._emptyBitmap;
        }
    };
})();
// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    this.axPreloadAllAnimationOnMap();
    this.axRefreshForNetwork();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.axPreloadAllAnimationOnMap = function() {
    var e, ev, f, i, j, len, len1, ref, ref1;
    try {
      if ($gamePlayer.isAnimX()) {
        $gamePlayer.getCurrentAnimX().preLoad();
      }
      ref = $gamePlayer.followers()._data;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        if (f.isAnimX()) {
          f.getCurrentAnimX().preLoad();
        }
      }
      ref1 = $gameMap.events();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        ev = ref1[j];
        if (ev != null ? ev.isAnimX() : void 0) {
          ev.getCurrentAnimX().preLoad();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.axRefreshForNetwork = function() {
    if (PKD_ANIMAX.IsNetworkGame() && ($gameParty.leader() != null)) {
      return PKD_ANIMAX.SendNetworkFlagAnimaXRefresh($gameParty.leader().actorId());
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Спрайт для анимации слоя (части)

// UPD
var Sprite_AnimaXPart;

Sprite_AnimaXPart = class Sprite_AnimaXPart extends Sprite {
  constructor(animPart, rootAnimation) {
    super();
    this.animPart = animPart;
    this.animPart.applyRootAnimation(rootAnimation);
    this.visible = !this.animPart.isDisabled();
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.isLowerBodyPart = this.animPart.isLowerBodyPart;
    // * Offset for layer parts
    this.x += this.animPart.dx;
    this.y += this.animPart.dy;
    return;
  }

  refreshPart(frame, dir) {
    return this.bitmap = this.animPart.getPartBitmap(dir, frame);
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__characterBlockX, ALIAS__characterBlockY, ALIAS__characterPatternX, ALIAS__characterPatternY, ALIAS__isEmptyCharacter, ALIAS__isImageChanged, ALIAS__patternHeight, ALIAS__patternWidth, ALIAS__updateBitmap, ALIAS__updateFrame, ALIAS__updatePosition, ALIAS__updateVisibility, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__isEmptyCharacter = _.isEmptyCharacter;
  _.isEmptyCharacter = function() {
    if (this.isAnimX()) {
      return false;
    } else {
      return ALIAS__isEmptyCharacter.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateBitmap = _.updateBitmap;
  _.updateBitmap = function() {
    if (this.isAnimX()) {
      this._updateBitmapAnimX();
    } else {
      ALIAS__updateBitmap.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateVisibility = _.updateVisibility;
  _.updateVisibility = function() {
    if (this.isAnimX()) {
      return this._updateVisibilityAnimX();
    } else {
      return ALIAS__updateVisibility.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateFrame = _.updateFrame;
  _.updateFrame = function() {
    ALIAS__updateFrame.call(this);
    if (this.isAnimX()) {
      this._axCntr.update(this._character);
      if (this._animaXParts != null) {
        this._updateAnimaXPartsDepth();
        this._updateAnimaXParts();
      }
    }
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    ALIAS__updatePosition.call(this);
    if (this.isAnimX()) {
      this.x += this._axCntr.rootAnimation.dx;
      this.y += this._axCntr.rootAnimation.dy;
    }
  };
  
  //@[ALIAS]
  ALIAS__isImageChanged = _.isImageChanged;
  _.isImageChanged = function() {
    if (this.isAnimX()) {
      return this._animaXSet !== this._character.getCurrentAnimX();
    } else {
      return ALIAS__isImageChanged.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__patternWidth = _.patternWidth;
  _.patternWidth = function() {
    if (this.isAnimX()) {
      return this.bitmap.width;
    } else {
      return ALIAS__patternWidth.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__patternHeight = _.patternHeight;
  _.patternHeight = function() {
    if (this.isAnimX()) {
      return this.bitmap.height;
    } else {
      return ALIAS__patternHeight.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__characterBlockX = _.characterBlockX;
  _.characterBlockX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockX.call(this);
  };
  
  //@[ALIAS]
  ALIAS__characterBlockY = _.characterBlockY;
  _.characterBlockY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockY.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternX = _.characterPatternX;
  _.characterPatternX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternX.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternY = _.characterPatternY;
  _.characterPatternY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternY.call(this);
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      return this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    //?UPD
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      this._animaXPartBelow.visible = false;
      this._animaXPartBelow.parent.removeChild(this._animaXPartBelow);
      this._animaXPartBelow = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Анимация (одна единица анимации, последовательность кадров)

//* STORABLE - значит класс сохраняется в сохранение (т.е. создаётся на игровом объекте)
//@[STORABLE]
var XAnima;

XAnima = class XAnima {
  constructor(framesCount, fileName) {
    this.framesCount = framesCount;
    this.fileName = fileName;
    this.frames = [];
    this._parseFrames();
  }

  // * Хранит только названия картинок кадров
  _parseFrames() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.framesCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.push(this.fileName + "_" + i));
    }
    return results;
  }

  // * Умножить первый кадр times раз
  expandFirstFrame(times) {
    var i, j, ref, results;
    this.framesCount += times;
    results = [];
    for (i = j = 0, ref = times; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.splice(1, 0, this.frames[0]));
    }
    return results;
  }

  preLoad() {
    var f, j, len, ref;
    ref = this.frames;
    for (j = 0, len = ref.length; j < len; j++) {
      f = ref[j];
      ImageManager.loadAnimaX(f);
    }
  }

  getFrame(index) {
    return ImageManager.loadAnimaX(this.frames[index]);
  }

};

//TODO: Загрузка всех анимаций при запуске игры?

// Generated by CoffeeScript 2.5.1
// * Дополнительный слой анимации

//@[STORABLE]
var XAnimaPart;

XAnimaPart = class XAnimaPart {
  //UPD
  constructor(filename, isLowerBodyPart, level) {
    this.filename = filename;
    this.isLowerBodyPart = isLowerBodyPart;
    this.level = level;
    this.animations = [];
    this.rules = {};
    this.disabledActions = [];
    if (this.isLowerBodyPart == null) {
      this.isLowerBodyPart = false;
    }
    if (this.level == null) {
      this.level = 0;
    }
    // D, L, R, U, DL, DR, UL, UR, noDir
    this.directionsLevels = [false, false, false, false, false, false, false, false, false];
    this._isDisabled = false;
    // * Дополнительное смещение части
    this.dx = 0;
    this.dy = 0;
    this.setDefaultRule(true, true);
  }

  isDisabled() {
    return this._isDisabled === true;
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  // * Тут задаётся стандартное правило
  setDefaultRule(haveDirs, haveFrames) {
    return this.rules['Basic'] = [haveDirs, haveFrames];
  }

  setRuleForMovement(haveDirs, haveFrames) {
    return this.rules['Move'] = [haveDirs, haveFrames];
  }

  setRuleForIdle(haveDirs, haveFrames) {
    return this.rules['Idle'] = [haveDirs, haveFrames];
  }

  //?UPD
  setRuleForDashing(haveDirs, haveFrames) {
    return this.rules['Dashing'] = [haveDirs, haveFrames];
  }

  setRuleForAction(actionName, haveDirs, haveFrames, fileName) {
    return this.rules[actionName] = [haveDirs, haveFrames, fileName];
  }

  disableForAction(actionName) {
    return this.disabledActions.push(actionName);
  }

  applyRootAnimation(xAnimaSet) {
    var cFileName, frames, isNoDir, rule, setName;
    setName = xAnimaSet.getActionName();
    if (this.disabledActions.contains(setName)) {
      this._isDisabled = true;
      return;
    } else {
      this._isDisabled = false;
    }
    rule = this.rules[setName];
    if (rule == null) {
      rule = this.rules['Basic'];
      cFileName = this.filename + setName;
    } else {
      if (String.any(rule[2])) {
        cFileName = this.filename + rule[2];
      } else {
        cFileName = this.filename + setName;
      }
    }
    frames = xAnimaSet.frames;
    if (!rule[1]) {
      frames = 1;
    }
    isNoDir = !rule[0];
    return this._setupAnimations(frames, cFileName, isNoDir, xAnimaSet.is8Way, frames === 1);
  }

  _setupAnimations(frames, cFileName, isNoDir, is8way, isNoFrames) {
    this.isOneFrame = isNoFrames;
    this.isNoDirections = isNoDir;
    this.is8Way = is8way;
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(frames, cFileName);
    } else {
      this.animations[0] = new XAnima(frames, cFileName + "_D");
      this.animations[1] = new XAnima(frames, cFileName + "_L");
      this.animations[2] = new XAnima(frames, cFileName + "_R");
      this.animations[3] = new XAnima(frames, cFileName + "_U");
      if (is8way === true) {
        this.animations[4] = new XAnima(frames, this.filename + "_DL");
        this.animations[5] = new XAnima(frames, this.filename + "_DR");
        this.animations[6] = new XAnima(frames, this.filename + "_UL");
        this.animations[7] = new XAnima(frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  getPartBitmap(dir, frame) {
    if (this.isOneFrame === true) {
      frame = 0;
    }
    return this.getAnimationByDirection(dir).getFrame(frame);
  }

  // * Часть (слой) должна быть под персонажем?
  isBelowCharacter(dir) {
    if (this.isNoDirections === true) {
      // * Отдельная настройка 8 позиция
      return this.directionsLevels[8];
    } else {
      switch (dir) {
        case 8:
          return this.directionsLevels[3];
        case 2:
          return this.directionsLevels[0];
        case 4:
          return this.directionsLevels[1];
        case 6:
          return this.directionsLevels[2];
        case 1: // * DL
          if (this.is8WayAnimation()) {
            return this.animations[4];
          } else {
            return this.animations[1];
          }
          break;
        case 3: // * DR
          if (this.is8WayAnimation()) {
            return this.animations[5];
          } else {
            return this.animations[2];
          }
          break;
        case 7: // * UL
          if (this.is8WayAnimation()) {
            return this.animations[6];
          } else {
            return this.animations[1];
          }
          break;
        case 9: // * UR
          if (this.is8WayAnimation()) {
            return this.animations[7];
          } else {
            return this.animations[2];
          }
      }
      return this.directionsLevels[8];
    }
  }

  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

};

// Generated by CoffeeScript 2.5.1
// * Набор анимаций для всех направлений

//DIRECTIONS:
// 2 - DOWN
// 8 - UP
// 4 - LEFT
// 6 - RIGHT

//TYPE:
// 0 - movement
// 1 - idle
// 2 - action

//@[STORABLE]
var XAnimaSet;

XAnimaSet = class XAnimaSet {
  constructor(type, filename, frames, speed, isNoDirections, is8Way = false) {
    this.type = type;
    this.filename = filename;
    this.frames = frames;
    this.speed = speed;
    this.isNoDirections = isNoDirections;
    this.is8Way = is8Way;
    this._setupAnimations();
    this.isLoop = false;
    this.actionName = "Action";
    this.moveToIdleDelay = 30;
    this.waitActionEnd = true;
  }

  _setupAnimations() {
    this.animations = [];
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(this.frames, this.filename);
    } else {
      this.animations[0] = new XAnima(this.frames, this.filename + "_D");
      this.animations[1] = new XAnima(this.frames, this.filename + "_L");
      this.animations[2] = new XAnima(this.frames, this.filename + "_R");
      this.animations[3] = new XAnima(this.frames, this.filename + "_U");
      if (this.is8WayAnimation()) {
        this.animations[4] = new XAnima(this.frames, this.filename + "_DL");
        this.animations[5] = new XAnima(this.frames, this.filename + "_DR");
        this.animations[6] = new XAnima(this.frames, this.filename + "_UL");
        this.animations[7] = new XAnima(this.frames, this.filename + "_UR");
      }
      return;
    }
    this.preLoad();
  }

  setActionName(actionName) {
    this.actionName = actionName;
  }

  //?UPD
  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      case 3:
        return "Dashing";
      default:
        return this.actionName;
    }
  }

  preLoad() {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.preLoad();
    }
  }

  isNoFrames() {
    return this.frames === 1;
  }

  isWait() {
    return this.waitActionEnd === true;
  }

  expandFirstFrameTimes(times) {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.expandFirstFrame(times);
    }
    return this.frames += times;
  }

  //? Оптимизация заменой метода?
  getAnimationByDirection(dir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    }
    switch (dir) {
      case 8:
        return this.animations[3];
      case 2:
        return this.animations[0];
      case 4:
        return this.animations[1];
      case 6:
        return this.animations[2];
      case 1: // * DL
        if (this.is8WayAnimation()) {
          return this.animations[4];
        } else {
          return this.animations[1];
        }
        break;
      case 3: // * DR
        if (this.is8WayAnimation()) {
          return this.animations[5];
        } else {
          return this.animations[2];
        }
        break;
      case 7: // * UL
        if (this.is8WayAnimation()) {
          return this.animations[6];
        } else {
          return this.animations[1];
        }
        break;
      case 9: // * UR
        if (this.is8WayAnimation()) {
          return this.animations[7];
        } else {
          return this.animations[2];
        }
    }
    return this.animations[0];
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  isMovement() {
    return this.type === 0;
  }

  //?UPD
  isDashing() {
    return this.type === 3;
  }

  isAction() {
    return this.type === 2;
  }

  isIdle() {
    return this.type === 1;
  }

};

// Generated by CoffeeScript 2.5.1
// * Контроллер анимации (смена кадров, направлений)
// * rootAnimation - это XAnimaSet
// * Контроллер хранится в Sprite_Character
var XAnimaSetController;

XAnimaSetController = class XAnimaSetController {
  constructor(startDirection, rootAnimation) {
    this.rootAnimation = rootAnimation;
    this.cFrame = 0;
    this.cDir = startDirection;
    this._timer = 0;
    this._sKoef = 0;
    this._requireRefresh = true;
    this._animPlaying = false;
    this._initialFrame = false;
  }

  isPlaying() {
    return this._animPlaying === true;
  }

  // * Класс каждый раз получает character, не хранит
  update(character) {
    this._requireRefresh = false;
    this._updateDirection(character);
    return this._updateFrames(character);
  }

  _updateDirection(character) {
    var cDir;
    if (this.rootAnimation.is8WayAnimation()) {
      cDir = character._diagonalDir;
      if (cDir == null) {
        //console.warn('You try start 8 way diagonal animation, but game not support 8 way movement')
        cDir = character.direction();
      }
      if (cDir === false) {
        cDir = character.direction();
      }
    } else {
      //console.log(cDir)
      cDir = character.direction();
    }
    if (cDir !== this.cDir) {
      this.requestRefresh();
    }
    this.cDir = cDir;
  }

  //?UPD
  _updateFrames(character) {
    // * Используется один и тотже алгоритм смены кадров для Dashing и Movement
    if (this.rootAnimation.isMovement() || this.rootAnimation.isDashing()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  //?UPD
  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      // * Если Dashing, то таймер обычный
      if (c.isInDashingAnimaX()) {
        this._updateTimer(false); // * Если нет Dashing анимации, то немного ускоряем таймер
      } else {
        this._updateTimer(c.isDashing());
      }
      if (this._timer === 0) {
        return this._nextMovementFrame();
      }
    } else {
      this._sKoef = 0;
      this._updateTimer(false);
      if (this._timer === 0) {
        if (this.cFrame !== 0) {
          this.requestRefresh();
        }
        return this.resetAnimation();
      }
    }
  }

  _setInitialFrame(frameIndex) {
    if (this._initialFrame === true) { // * Установка начального кадра
      return;
    }
    this.cFrame = frameIndex;
    this._initialFrame = true;
    this._timer = 0;
    return this.requestRefresh();
  }

  _updateTimer(isFast) {
    this._timer += 1;
    if (isFast) {
      this._timer += 0.5;
    }
    if (this._timer >= this._speed()) {
      return this._timer = 0;
    }
  }

  _speed() {
    return this.rootAnimation.speed - this._sKoef;
  }

  _nextMovementFrame() {
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 1; // * Не 0, 0 - когда стоит
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        // * Если не готов кадр, то назад на 1 кадр (остаёмся на месте)
        this.cFrame--;
      }
      return;
    }
    return this.requestRefresh();
  }

  _isNextFrameBitmapIsReady() {
    var b;
    b = this.bitmap();
    if (!b.isReady() || b.width <= 0) {
      return false;
    } else {
      return true;
    }
  }

  _updateAction(c) {
    if (this._initialFrame === false) {
      this._setInitialFrame(0);
      c.onAnimaXActionStart();
    }
    this._updateTimer(false);
    if (this._timer === 0) {
      return this._nextActionFrame(c);
    }
  }

  _nextActionFrame(c) {
    this._animPlaying = true;
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 0;
      if (!this.rootAnimation.isLoop) {
        this.resetAnimation();
        c.onAnimaXActionEnd();
      }
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        this.cFrame--;
      }
    }
    return this.requestRefresh();
  }

  resetAnimation() {
    this._timer = 0;
    this.cFrame = 0;
    this._animPlaying = false;
    return this._initialFrame = false;
  }

  // * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
  requestRefresh() {
    return this._requireRefresh = true;
  }

  bitmap() {
    return this.rootAnimation.getAnimationByDirection(this.cDir).getFrame(this.cFrame);
  }

  isChanged() {
    return this._requireRefresh;
  }

};

// Generated by CoffeeScript 2.5.1
// * Менеджер для работы с БД анимаций
var XAnimaTools;

XAnimaTools = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ XAnimaTools.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = XAnimaTools;
  _.animationsDB = function() {
    return PKD_ANIMAX.Animations;
  };
  _.animationPartsDB = function() {
    return PKD_ANIMAX.AnimationParts;
  };
  // * Список всех действий анимации
  _.getXAnimaActionList = function(id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return [];
    }
    return data.actions;
  };
  // * Анимация по имени (ID)
  _.getXAnimaSetById = function(id) {
    var data;
    data = this.animationsDB();
    return data != null ? data.find(function(d) {
      return d.id === id;
    }) : void 0;
  };
  // * Настройки анимации для состояния
  _.getXAnimaParamsForState = function(state, id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return null;
    }
    return data[state];
  };
  // * Настройки анимации для действия
  _.getXAnimaParamsForAction = function(actionName, setId) {
    var data;
    data = this.getXAnimaActionList(setId);
    return data != null ? data.find(function(a) {
      return a.name === actionName;
    }) : void 0;
  };
  // * Часть анимации (слой) по имени
  _.getXAnimaPartById = function(id) {
    var data;
    data = this.animationPartsDB();
    return data != null ? data.find(function(a) {
      return a.id === id;
    }) : void 0;
  };
  
  // * Конвертировать массив Actions из параметров плагина в более компактный вид
  _.convertActionsFromParameters = function(actions) {
    var action, i, item, len, shrinked;
    shrinked = [];
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      item = action.animation;
      item.name = action.name;
      shrinked.push(item);
    }
    return shrinked;
  };
  _.createXAnimaSetForAction = function(id, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 2, null, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForMove = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 0, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIdle = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 1, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  //?UPD
  _.createXAnimaSetForDashing = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 3, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _._createXAnimaSetFromParams = function(id, type, state, params) {
    var animaSet, e, filename, frames, is8Way, isOneDirection, speed;
    try {
      ({frames, speed, isOneDirection, is8Way} = params);
      if (type === 2) { // * Action
        filename = this.createFilenameForAnimaAction(id, params.name);
      } else {
        filename = this.createFilenameForAnimaState(id, state, type);
      }
      animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection, is8Way);
      animaSet.dx = params.dx || 0;
      animaSet.dy = params.dy || 0;
      if (params.expandFirstFrame > 0) {
        animaSet.expandFirstFrameTimes(params.expandFirstFrame);
      }
      if (type === 2) {
        // * Задать имя действия
        animaSet.setActionName(params.name);
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  
  //UPD
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else if (type === 1) {
      path += "Idle";
    } else if (type === 3) {
      path += "Dashing";
    }
    return path;
  };
  _.createFilenameForAnimaAction = function(id, name) {
    var path;
    path = id + "/Actions/" + name;
    return path;
  };
  _.createFilenameForAnimaPart = function(id, name, isRelative) {
    var path;
    if (isRelative) {
      path = id + "/Layers/" + name + "/";
    } else {
      path = "CommonLayers/" + name + "/";
    }
    return path;
  };
  _.createXAnimaPart = function(id, partName, isRelative = false) {
    var animaPartSet, e, params;
    try {
      params = this.getXAnimaPartById(partName);
      if (params == null) {
        return null;
      }
      animaPartSet = this._createXAnimaPartFromParams(id, partName, params, isRelative);
      return animaPartSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  //?UPD
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, dashRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, dashRule, actionRules, layerRule} = params);
      filename = this.createFilenameForAnimaPart(axId, partName, isRelative);
      animaPart = new XAnimaPart(filename, isLowerBodyPart, sortingLevel);
      animaPart.directionsLevels = this._convertLayerRuleToDirectionLevels(layerRule);
      if (baseRule != null) {
        animaPart.setDefaultRule(baseRule.isHaveDirections, baseRule.isHaveFrames);
      }
      if (moveRule != null) {
        animaPart.setRuleForMovement(moveRule.isHaveDirections, moveRule.isHaveFrames);
      }
      if (idleRule != null) {
        animaPart.setRuleForIdle(idleRule.isHaveDirections, idleRule.isHaveFrames);
      }
      if (dashRule != null) {
        animaPart.setRuleForDashing(dashRule.isHaveDirections, dashRule.isHaveFrames);
      }
      animaPart.dx = params.dx || 0;
      animaPart.dy = params.dy || 0;
      try {
        for (i = 0, len = actionRules.length; i < len; i++) {
          rule = actionRules[i];
          if (rule == null) {
            continue;
          }
          if (rule.enabled === false) {
            animaPart.disableForAction(rule.actionName);
          } else {
            animaPart.setRuleForAction(rule.actionName, rule.actionRule.isHaveDirections, rule.actionRule.isHaveFrames, rule.fileName);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return animaPart;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * Преобразовать структуру LAnimaXPartDirLevel в массив directionsLevels для слоя
  _._convertLayerRuleToDirectionLevels = function(layerRule) {
    return [layerRule.dirD, layerRule.dirL, layerRule.dirR, layerRule.dirU, layerRule.dirDL, layerRule.dirDR, layerRule.dirUL, layerRule.dirUR, layerRule.noDir];
  };
})();

// ■ END XAnimaTools.coffee
//---------------------------------------------------------------------------

//Plugin PKD_AnimaX automatic build by PKD PluginBuilder 1.9.2 28.11.2021
