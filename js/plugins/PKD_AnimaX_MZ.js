/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */

 // * CHANGELOG ===================
 // v1.1 (30.08.2021)
 //     - Added animation state for Dashing (PRO only)
 //     - Added X,Y offset for layers
 //     - Improved animation frames loading (less flickering)
 //     - Fixed bug: game crush if layers applied for diagonal animations (8 way movement is ON) 
 //     - Fixed bug: layer still exists on character if player take off equipment with extra layer
 //     - Minor changes and fixes
 //
 // v1.0 (20.03.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.1)[PRO] Characters animations system
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
 * ===
 * Alpha ABS Z should be Below this plugin in Plugin Manager
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
PKD_ANIMAX.version = 110; // 1.1.0

// Generated by CoffeeScript 2.3.0
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

// Generated by CoffeeScript 2.5.1
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
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.resetXAnima();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.addNewXAnimPart(partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.removeXAnimPart(partId);
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) char.clearXAnimParts();
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId) => {
        var char = null;
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
// Generated by CoffeeScript 2.5.1
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

// Generated by CoffeeScript 2.5.1
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

//Compressed by MV Plugin Builder
(function(){var a0_0x4dda=['registerAnimaXAction','moveSet','isShouldWaitAnimaXAction','animaXParts','SUWBB','567091HOwJYV','dashSet','_axDashing','switchToXAnimaState','_updateMoveIdleAnimaX','MScxx','_setAnimaXToDashing','onAnimXPartsRefreshed','isWait','3253lZUIUv','base','39937zPZtmK','isInMovementAnimaX','getPreloadAnimaXActionSet','eTSMQ','39YFUIjr','getCurrentAnimX','createXAnimaSetForIdle','UNhqa','isAnimX','aaIRS','phupw','KQIJF','_xAnimaToIdleTimer','removeXAnimPart','gbkBd','19013QcnNpF','createXAnimaPart','ssnfP','lcFlR','LKfBE','_setAnimaXToIdle','isLoop','GPSFF','isInIdleAnimaX','_xAnimaPartsRequireRefresh','wpZsU','isHaveAnimaXActionWithName','startAnimaXAction','_getAnimaXMoveToIdleDelay','resetXAnima','onAnimaXActionStart','createXAnimaSetForDashing','1305290picBbA','lYIMF','resetXAnimaState','initAnimaX','OArDh','_axPreloadedActions','Bxwiz','eRznW','_axCurrent','bfBHs','GFlir','hzXYS','_axId','_inAnimXAction','ixxoo','jjUrz','_createAnimaXSetFromParams','move','eMVKg','vYzCb','YRXAX','_initMembersAnimaX','tmnYD','isInAnimXAction','clearXAnimParts','clearAnimaX','isAction','registerAnimaXState','422424ByyJab','animXId','_axState','IxHeX','398oxHxAy','idleSet','rjCWE','NufVa','isInDashingAnimaX','isAnimXPartsChanged','bOgmF','idle','muSoL','prototype','preLoad','isMoving','sfHpy','mvVSk','XLeeI','cuPIS','DxWIv','isAnimaXActionIsPreloaded','_isHaveAnimaX','_axAvailableActionsList','DYqmd','isHaveIdleAnimaX','isHaveDashAnimaX','_axStates','moveToIdleDelay','_setAnimaXToMovement','11pqEHnH','isHaveAnimaXState','createAnimaXActionSet','1177969dsTBYV','_updateMovingAnimX','_axMovement','_updateMovingDashingAnimX','warn','ZyHiw','isInAnyMovementAnimaX','dash','_axIdle','fcfoX','GPZXb','push','enakm'];function a0_0x15d0(_0x3cc141,_0x5a03fa){_0x3cc141=_0x3cc141-0x177;var _0x4dda1b=a0_0x4dda[_0x3cc141];return _0x4dda1b;}(function(_0x7f3feb,_0x45866d){var _0x10ef53=a0_0x15d0;while(!![]){try{var _0x2c1058=parseInt(_0x10ef53(0x19a))+parseInt(_0x10ef53(0x179))+-parseInt(_0x10ef53(0x197))*-parseInt(_0x10ef53(0x1b7))+-parseInt(_0x10ef53(0x1ac))+parseInt(_0x10ef53(0x1b5))*-parseInt(_0x10ef53(0x17d))+parseInt(_0x10ef53(0x1d7))+-parseInt(_0x10ef53(0x1bb))*parseInt(_0x10ef53(0x1c6));if(_0x2c1058===_0x45866d)break;else _0x7f3feb['push'](_0x7f3feb['shift']());}catch(_0x23fb62){_0x7f3feb['push'](_0x7f3feb['shift']());}}}(a0_0x4dda,0xb5142),function(){var _0xb3371b=a0_0x15d0,_0x2dd99d;_0x2dd99d=Game_Character[_0xb3371b(0x186)],function(){var _0x44ffd8=_0xb3371b;_0x2dd99d['isAnimX']=function(){return this['_isHaveAnimaX']===!![];},_0x2dd99d[_0x44ffd8(0x17a)]=function(){var _0x44f142=_0x44ffd8;return this[_0x44f142(0x1e3)];},_0x2dd99d[_0x44ffd8(0x192)]=function(){var _0x3070e6=_0x44ffd8;if('rHMUp'!==_0x3070e6(0x1c0))return this['_axIdle']()!=null;else{function _0x2faa27(){var _0x36c67e=_0x3070e6;return this[_0x36c67e(0x1df)];}}},_0x2dd99d['isHaveDashAnimaX']=function(){var _0x3485f4=_0x44ffd8;return this[_0x3485f4(0x1ae)]()!=null;},_0x2dd99d[_0x44ffd8(0x198)]=function(_0x165b62){var _0x5148dd=_0x44ffd8;if(_0x5148dd(0x1a6)===_0x5148dd(0x1a6))return this[_0x5148dd(0x194)][_0x165b62]!=null;else{function _0x189ac1(){var _0x1aeb8f=_0x5148dd;return this[_0x1aeb8f(0x1cf)]===!![];}}},_0x2dd99d['isInAnimXAction']=function(){var _0x2440bd=_0x44ffd8;return this[_0x2440bd(0x1bf)]()&&this['getCurrentAnimX']()['isAction']();},_0x2dd99d[_0x44ffd8(0x1b8)]=function(){var _0x58c76a=_0x44ffd8;return this[_0x58c76a(0x1df)]===this[_0x58c76a(0x19c)]();},_0x2dd99d[_0x44ffd8(0x1a0)]=function(){var _0x3c9a99=_0x44ffd8;if('wpZsU'===_0x3c9a99(0x1d0))return this[_0x3c9a99(0x1b8)]()||this[_0x3c9a99(0x181)]();else{function _0x3b3aca(){this['resetXAnima']();}}},_0x2dd99d[_0x44ffd8(0x1ce)]=function(){var _0x394ba6=_0x44ffd8;return this[_0x394ba6(0x1df)]===this['_axIdle']();},_0x2dd99d[_0x44ffd8(0x181)]=function(){var _0x1a4ed9=_0x44ffd8;return this[_0x1a4ed9(0x1df)]===this[_0x1a4ed9(0x1ae)]();},_0x2dd99d[_0x44ffd8(0x1d5)]=function(){var _0x13faa6=_0x44ffd8;if(_0x13faa6(0x1ba)!==_0x13faa6(0x17f))return this['_xAnimaToIdleTimer']=0x0;else{function _0x194cf4(){var _0x55d558=_0x13faa6;this[_0x55d558(0x194)][_0x53115a]['dashSet']=null;}}},_0x2dd99d['onAnimaXActionEnd']=function(){var _0x367b4e=_0x44ffd8;return this[_0x367b4e(0x1d4)]();},_0x2dd99d['isShouldWaitAnimaXAction']=function(){var _0x3613d9=_0x44ffd8,_0x157f21;if(this[_0x3613d9(0x1a0)]())return![];if(!this[_0x3613d9(0x1ee)]()){if(_0x3613d9(0x1a3)===_0x3613d9(0x18c)){function _0x46766c(){var _0x82a89c=_0x3613d9;if(!this[_0x82a89c(0x188)]()){this[_0x82a89c(0x1c3)]++;if(this[_0x82a89c(0x1c3)]>=this[_0x82a89c(0x1d3)]())return this['_setAnimaXToIdle']();}}}else return![];}return _0x157f21=this[_0x3613d9(0x1bc)](),_0x157f21[_0x3613d9(0x177)]()&&_0x157f21[_0x3613d9(0x1b4)]();},_0x2dd99d[_0x44ffd8(0x1d1)]=function(_0x49a538){var _0x2c2436=_0x44ffd8;return this[_0x2c2436(0x190)]['contains'](_0x49a538);},_0x2dd99d[_0x44ffd8(0x1bc)]=function(){var _0x3e7e50=_0x44ffd8;return this[_0x3e7e50(0x1df)];},_0x2dd99d['startAnimaXAction']=function(_0x1035a6){return this['_axCurrent']=_0x1035a6;},_0x2dd99d[_0x44ffd8(0x1af)]=function(_0x264569){var _0x1d794f=_0x44ffd8;if(this[_0x1d794f(0x198)](_0x264569)){if(_0x1d794f(0x1dd)===_0x1d794f(0x1c8)){function _0x27ddf1(){var _0x3be7fd=_0x1d794f;return this[_0x3be7fd(0x194)][this[_0x3be7fd(0x17b)]][_0x3be7fd(0x1a8)];}}else this['_axState']=_0x264569,!this[_0x1d794f(0x1ee)]()&&this[_0x1d794f(0x1d4)]();}else this[_0x1d794f(0x1d9)]();},_0x2dd99d[_0x44ffd8(0x1da)]=function(_0x294cfd,_0x39a2d0){var _0x545714=_0x44ffd8;this['_axId']=_0x294cfd,this['clearXAnimParts'](),this[_0x545714(0x190)]=[],this[_0x545714(0x1dc)]={},this[_0x545714(0x194)]={},this['_axState']=_0x545714(0x1b6),this[_0x545714(0x178)](this[_0x545714(0x17b)],_0x39a2d0);if(this[_0x545714(0x194)][this['_axState']]==null)return;this[_0x545714(0x1d4)](),this[_0x545714(0x18f)]=!![],this[_0x545714(0x1bc)]()['preLoad']();},_0x2dd99d[_0x44ffd8(0x178)]=function(_0x27ada0,_0x48232d){var _0x9b3556=_0x44ffd8,_0x528a4f,_0x1c9d10,_0x3a5899,_0x2184b6;try{if(_0x48232d==null){if(_0x9b3556(0x18b)!==_0x9b3556(0x18b)){function _0x1e2edc(){var _0x1f2aa6=_0x9b3556;this[_0x1f2aa6(0x1e3)]=_0x4379b2,this[_0x1f2aa6(0x1ef)](),this[_0x1f2aa6(0x190)]=[],this[_0x1f2aa6(0x1dc)]={},this[_0x1f2aa6(0x194)]={},this[_0x1f2aa6(0x17b)]=_0x1f2aa6(0x1b6),this['registerAnimaXState'](this[_0x1f2aa6(0x17b)],_0x1efec0);if(this[_0x1f2aa6(0x194)][this[_0x1f2aa6(0x17b)]]==null)return;this[_0x1f2aa6(0x1d4)](),this['_isHaveAnimaX']=!![],this[_0x1f2aa6(0x1bc)]()[_0x1f2aa6(0x187)]();}}else return;}_0x2184b6=this[_0x9b3556(0x1e7)](0x0,_0x27ada0,_0x48232d[_0x9b3556(0x1e8)]);if(_0x2184b6==null)return;_0x2184b6[_0x9b3556(0x187)](),_0x3a5899=null,_0x528a4f=null,_0x3a5899=this['_createAnimaXSetFromParams'](0x1,_0x27ada0,_0x48232d[_0x9b3556(0x184)]),_0x3a5899!=null&&_0x3a5899[_0x9b3556(0x187)](),_0x3a5899!=null&&_0x48232d[_0x9b3556(0x195)]!=null&&(_0x3a5899[_0x9b3556(0x195)]=_0x48232d[_0x9b3556(0x195)]),_0x528a4f=this[_0x9b3556(0x1e7)](0x3,_0x27ada0,_0x48232d[_0x9b3556(0x1a1)]),_0x528a4f!=null&&_0x528a4f['preLoad'](),this['_createXAnimaSetsForState'](_0x27ada0,_0x2184b6,_0x3a5899,_0x528a4f);}catch(_0x2f20c3){_0x1c9d10=_0x2f20c3,console[_0x9b3556(0x19e)](_0x1c9d10),this[_0x9b3556(0x194)][_0x27ada0]=null;}},_0x2dd99d[_0x44ffd8(0x1d9)]=function(){var _0x2f1ada=_0x44ffd8;if(_0x2f1ada(0x1d8)!==_0x2f1ada(0x1ea))this[_0x2f1ada(0x17b)]=_0x2f1ada(0x1b6),!this[_0x2f1ada(0x1ee)]()&&this[_0x2f1ada(0x1d4)]();else{function _0x665f72(){var _0x30352b=_0x2f1ada;if(!this[_0x30352b(0x188)]())return;this[_0x30352b(0x193)]()&&this[_0x30352b(0x19d)]();this[_0x30352b(0x1c3)]=0x0;if(!this[_0x30352b(0x1a0)]())return this[_0x30352b(0x1d4)]();}}},_0x2dd99d[_0x44ffd8(0x1d4)]=function(){var _0x3a290d=_0x44ffd8;if(_0x3a290d(0x18a)!=='mvVSk'){function _0x3d5c42(){var _0x3c332d=_0x3a290d;!this[_0x3c332d(0x181)]()&&this[_0x3c332d(0x1b2)]();}}else this[_0x3a290d(0x1e4)]=![],this['_xAnimaToIdleTimer']=0x0,this[_0x3a290d(0x196)]();},_0x2dd99d[_0x44ffd8(0x1a7)]=function(_0x2f4a74){var _0x841daf=_0x44ffd8;return this[_0x841daf(0x190)]['push'](_0x2f4a74);},_0x2dd99d[_0x44ffd8(0x1ec)]=function(){var _0x484293=_0x44ffd8;return this[_0x484293(0x1cf)]=![],this[_0x484293(0x1c3)]=0x0,this['_isHaveAnimaX']=![];},_0x2dd99d['_createXAnimaSetsForState']=function(_0x32bb9d,_0xabb6f8,_0x58d227,_0x307334){var _0x153885=_0x44ffd8;this[_0x153885(0x194)][_0x32bb9d]={},_0xabb6f8[_0x153885(0x187)](),this[_0x153885(0x194)][_0x32bb9d][_0x153885(0x1a8)]=_0xabb6f8;if(_0x58d227!=null)_0x58d227[_0x153885(0x1cc)]=!![],_0x58d227[_0x153885(0x187)](),this[_0x153885(0x194)][_0x32bb9d][_0x153885(0x17e)]=_0x58d227;else{if(_0x153885(0x19f)===_0x153885(0x19f))this['_axStates'][_0x32bb9d][_0x153885(0x17e)]=null;else{function _0xdbd8a1(){var _0x5835c3=_0x153885;this[_0x5835c3(0x1d4)](),this['_isHaveAnimaX']=![],this['initAnimaX'](null,null);}}}if(_0x307334!=null){if(_0x153885(0x191)!==_0x153885(0x1cd))this[_0x153885(0x194)][_0x32bb9d][_0x153885(0x1ad)]=_0x307334,_0x307334[_0x153885(0x187)]();else{function _0x5e7a69(){return;}}}else{if(_0x153885(0x1ca)===_0x153885(0x1ab)){function _0x31d1ef(){var _0xe09955=_0x153885;this[_0xe09955(0x194)][_0x5c996c][_0xe09955(0x1ad)]=_0x272ca5,_0x9666ed['preLoad']();}}else this[_0x153885(0x194)][_0x32bb9d][_0x153885(0x1ad)]=null;}},_0x2dd99d[_0x44ffd8(0x1e7)]=function(_0x307ed9,_0x591d91,_0x3173d9){var _0x32b3e3=_0x44ffd8;if(_0x32b3e3(0x1c2)===_0x32b3e3(0x1c2)){var _0x4b84c6,_0x4a3a26;_0x4b84c6=null;try{if(_0x307ed9===0x0){if(_0x32b3e3(0x18d)!==_0x32b3e3(0x18d)){function _0x2eee90(){return this['resetXAnima']();}}else{if(_0x3173d9!=null){if('Tbzsp'!==_0x32b3e3(0x17c))_0x4b84c6=XAnimaTools['createXAnimaSetForMove'](this[_0x32b3e3(0x17a)](),_0x591d91,_0x3173d9);else{function _0x25def4(){var _0x4dcc51=_0x32b3e3;this['_axState']=_0x4dcc51(0x1b6),!this[_0x4dcc51(0x1ee)]()&&this['resetXAnima']();}}}}}else{if(_0x307ed9===0x1){if(_0x32b3e3(0x1c5)!==_0x32b3e3(0x1e1)){if(_0x3173d9!=null){if(_0x32b3e3(0x183)!==_0x32b3e3(0x189))_0x4b84c6=XAnimaTools[_0x32b3e3(0x1bd)](this[_0x32b3e3(0x17a)](),_0x591d91,_0x3173d9);else{function _0x539378(){var _0x478c9b=_0x32b3e3;return this[_0x478c9b(0x1e3)];}}}}else{function _0x189f4b(){var _0x2e7f27=_0x32b3e3;_0x3955d7[_0x2e7f27(0x195)]=_0x324d5d['moveToIdleDelay'];}}}else _0x307ed9===0x3&&(_0x3173d9!=null&&(_0x4b84c6=XAnimaTools[_0x32b3e3(0x1d6)](this[_0x32b3e3(0x17a)](),_0x591d91,_0x3173d9)));}}catch(_0x5d0c00){_0x4a3a26=_0x5d0c00,console['warn'](_0x4a3a26),_0x4b84c6=null;}return _0x4b84c6;}else{function _0x14b4b4(){var _0x3efe6f=_0x32b3e3,_0x2d992c;if(this['animaXParts'][_0x2edc7d]!=null)return;_0x2d992c=_0x44ca24[_0x3efe6f(0x1c7)](this[_0x3efe6f(0x17a)](),_0x8b756c,_0x3a07a8);if(_0x2d992c==null)return;this[_0x3efe6f(0x1aa)][_0xca0641]=_0x2d992c,this[_0x3efe6f(0x1cf)]=!![];}}},_0x2dd99d['_updateAnimX']=function(){var _0x2a98fd=_0x44ffd8;this['_updateAnimXRefresh']();if(this[_0x2a98fd(0x1a9)]()){if(_0x2a98fd(0x1c1)===_0x2a98fd(0x1e0)){function _0x3f03cc(){this['resetXAnimaState']();}}else return;}this[_0x2a98fd(0x19b)]();if(this[_0x2a98fd(0x192)]()&&this[_0x2a98fd(0x1a0)]())return this['_updateMoveIdleAnimaX']();},_0x2dd99d[_0x44ffd8(0x19b)]=function(){var _0x4efc95=_0x44ffd8;if(!this[_0x4efc95(0x188)]())return;if(this[_0x4efc95(0x193)]()){if(_0x4efc95(0x1ed)!==_0x4efc95(0x1e5))this[_0x4efc95(0x19d)]();else{function _0x3c78e9(){var _0x4a3593=_0x4efc95;return this[_0x4a3593(0x1a2)]()!=null;}}}this[_0x4efc95(0x1c3)]=0x0;if(!this[_0x4efc95(0x1a0)]())return this[_0x4efc95(0x1d4)]();},_0x2dd99d[_0x44ffd8(0x19d)]=function(){var _0x3aa852=_0x44ffd8;if(_0x3aa852(0x180)!==_0x3aa852(0x1e9)){if(this['isDashingForAnimaX']())!this[_0x3aa852(0x181)]()&&this['_setAnimaXToDashing']();else this[_0x3aa852(0x181)]()&&this['_setAnimaXToMovement']();}else{function _0x35d9bc(){var _0x5e4066=_0x3aa852;return this['_axCurrent']=this[_0x5e4066(0x1ae)]();}}},_0x2dd99d[_0x44ffd8(0x1b0)]=function(){var _0x4c0368=_0x44ffd8;if(!this[_0x4c0368(0x188)]()){if(_0x4c0368(0x1c9)===_0x4c0368(0x185)){function _0x135552(){var _0x1e408f=_0x4c0368;return this[_0x1e408f(0x190)][_0x1e408f(0x1a5)](_0x5dcc64);}}else{this[_0x4c0368(0x1c3)]++;if(this[_0x4c0368(0x1c3)]>=this[_0x4c0368(0x1d3)]())return this[_0x4c0368(0x1cb)]();}}},_0x2dd99d['_getAnimaXMoveToIdleDelay']=function(){var _0x51edce=_0x44ffd8;if(_0x51edce(0x1e2)==='ptYbI'){function _0x3cff78(){var _0x5904f2=_0x51edce;return this[_0x5904f2(0x1df)]=_0xb1b23c;}}else return this[_0x51edce(0x1a2)]()[_0x51edce(0x195)];},_0x2dd99d[_0x44ffd8(0x19c)]=function(){var _0xb3345=_0x44ffd8;if(_0xb3345(0x1be)==='sCFtI'){function _0x4fa4a2(){var _0x26954a=_0xb3345;_0x52aaa5!=null&&(_0x32d977=_0x4bf4ee[_0x26954a(0x1bd)](this[_0x26954a(0x17a)](),_0x3f9883,_0x3bf585));}}else return this[_0xb3345(0x194)][this[_0xb3345(0x17b)]][_0xb3345(0x1a8)];},_0x2dd99d[_0x44ffd8(0x1a2)]=function(){var _0x20ba78=_0x44ffd8;return this[_0x20ba78(0x194)][this['_axState']]['idleSet'];},_0x2dd99d[_0x44ffd8(0x1ae)]=function(){var _0x72a8d8=_0x44ffd8;if('IQAFs'!=='jBKyo')return this[_0x72a8d8(0x194)][this[_0x72a8d8(0x17b)]][_0x72a8d8(0x1ad)];else{function _0x3ac20b(){_0x1006e5=_0x35dd88['getXAnimaParamsForAction'](_0x2b495d,this['animXId']()),_0x12d1f6=this['createAnimaXActionSet'](_0x592c89);}}},_0x2dd99d['_setAnimaXToIdle']=function(){var _0x30b50b=_0x44ffd8;return this[_0x30b50b(0x1df)]=this[_0x30b50b(0x1a2)]();},_0x2dd99d[_0x44ffd8(0x196)]=function(){var _0x3dceb4=_0x44ffd8;if(_0x3dceb4(0x1a4)==='GPZXb')return this[_0x3dceb4(0x1df)]=this[_0x3dceb4(0x19c)]();else{function _0x568e40(){var _0xaf0b90=_0x3dceb4;_0x45fc08=this[_0xaf0b90(0x1b9)](_0x439c54);}}},_0x2dd99d[_0x44ffd8(0x1b2)]=function(){var _0x50f258=_0x44ffd8;if(_0x50f258(0x1de)!==_0x50f258(0x1eb))return this[_0x50f258(0x1df)]=this[_0x50f258(0x1ae)]();else{function _0x24deb2(){var _0x2fe789=_0x50f258;this[_0x2fe789(0x196)]();}}},_0x2dd99d[_0x44ffd8(0x1f0)]=function(){var _0x35bf03=_0x44ffd8;this[_0x35bf03(0x1d4)](),this['_isHaveAnimaX']=![],this[_0x35bf03(0x1da)](null,null);},_0x2dd99d[_0x44ffd8(0x182)]=function(){var _0x1091d2=_0x44ffd8;return this[_0x1091d2(0x1cf)]===!![];},_0x2dd99d[_0x44ffd8(0x1b3)]=function(){var _0x501111=_0x44ffd8;return this[_0x501111(0x1cf)]=![];},_0x2dd99d['addNewXAnimPart']=function(_0x531522,_0x3f8a5c=![]){var _0x2ae8ae=_0x44ffd8,_0x2e5d0b;if(this[_0x2ae8ae(0x1aa)][_0x531522]!=null){if(_0x2ae8ae(0x1b1)!=='ibYeo')return;else{function _0x230955(){var _0x15a2af=_0x2ae8ae;return this[_0x15a2af(0x1df)]===this[_0x15a2af(0x19c)]();}}}_0x2e5d0b=XAnimaTools[_0x2ae8ae(0x1c7)](this[_0x2ae8ae(0x17a)](),_0x531522,_0x3f8a5c);if(_0x2e5d0b==null)return;this[_0x2ae8ae(0x1aa)][_0x531522]=_0x2e5d0b,this['_xAnimaPartsRequireRefresh']=!![];},_0x2dd99d[_0x44ffd8(0x1c4)]=function(_0x4de3f3){var _0x48539f=_0x44ffd8;if('iuffo'==='ZwTiD'){function _0x571c84(){var _0x1b548b=a0_0x15d0;this['animaXParts']={},this[_0x1b548b(0x1cf)]=!![];}}else this[_0x48539f(0x1aa)][_0x4de3f3]=null,delete this[_0x48539f(0x1aa)][_0x4de3f3],this['_xAnimaPartsRequireRefresh']=!![];},_0x2dd99d[_0x44ffd8(0x1ef)]=function(){var _0x4fabbe=_0x44ffd8;if(_0x4fabbe(0x1db)!==_0x4fabbe(0x1e6))this[_0x4fabbe(0x1aa)]={},this[_0x4fabbe(0x1cf)]=!![];else{function _0x3e4984(){var _0x5df71c=_0x4fabbe;_0x39ecef=_0x2c4d66,_0x4e7465[_0x5df71c(0x19e)](_0x2d5d2c),_0x5fdc37=null;}}},_0x2dd99d['startAnimaXCustomAction']=function(_0x2d723b,_0x399a26=![],_0x1c9e87=![]){var _0x10b41c=_0x44ffd8,_0x6ac65b,_0x15fa8f;if(!this[_0x10b41c(0x1d1)](_0x2d723b))return![];this[_0x10b41c(0x18e)](_0x2d723b)?_0x15fa8f=this['getPreloadAnimaXActionSet'](_0x2d723b):(_0x6ac65b=XAnimaTools['getXAnimaParamsForAction'](_0x2d723b,this[_0x10b41c(0x17a)]()),_0x15fa8f=this[_0x10b41c(0x199)](_0x6ac65b));if(_0x15fa8f!=null)return _0x15fa8f['waitActionEnd']=_0x1c9e87,_0x15fa8f[_0x10b41c(0x1cc)]=_0x399a26,this[_0x10b41c(0x1d2)](_0x15fa8f),!![];return![];};}();}());
})();

// Generated by CoffeeScript 2.5.1
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

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
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

// Generated by CoffeeScript 2.5.1
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
      return PKD_ANIMAX.getValueFromMeta('xAnima', $gameParty.leader().actor());
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
    return this.refresh();
  };
  //?UPD
  _.isDashingForAnimaX = function() {
    return this.isDashing();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAnimaX = function(filename) {
    return this.loadBitmap('img/charactersAA/', filename, 0, false);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
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
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //UPD
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

//Plugin PKD_AnimaX automatic build by PKD PluginBuilder 1.9.2 30.08.2021
