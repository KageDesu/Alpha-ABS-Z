/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

 // * CHANGELOG ===================
 //
 // v1.0 (20.03.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0)[PRO] Characters animations system
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
 * @desc Idle animation settings
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
PKD_ANIMAX.version = 100; // 1.0.0

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
(function(){var a0_0x4fc1=['Cvdoe','isShouldWaitAnimaXAction','RjLlt','1zEDtRH','ujvPn','DVvQm','base','_isHaveAnimaX','WcglU','clearXAnimParts','_axCurrent','fqApv','irxzi','aLtlS','getCurrentAnimX','rATNU','uFbjd','ZQfkY','EprJw','onAnimaXActionEnd','_createXAnimaSetsForState','_updateMoveIdleAnimaX','idle','_inAnimXAction','move','Lomyn','xMgqF','registerAnimaXState','_axPreloadedActions','pcHIu','_axMovement','qumtg','animXId','isMoving','MpNpK','fIYjK','1qGRAbq','createXAnimaPart','KuWWj','_createAnimaXSetFromParams','153509dQGoCR','waitActionEnd','jvzRT','createXAnimaSetForMove','isAnimX','warn','push','resetXAnimaState','fyTAO','_xAnimaPartsRequireRefresh','885105LKYxck','getPreloadAnimaXActionSet','QZfhf','VdWTX','FdfUk','1VXVUDn','DQJGL','_getAnimaXMoveToIdleDelay','idleSet','IyZVw','JXGHw','prototype','isLoop','isHaveAnimaXActionWithName','672678CKWDVO','aArIl','isHaveIdleAnimaX','Iugoi','MrYxH','startAnimaXCustomAction','contains','isInAnimXAction','isWait','_setAnimaXToMovement','260843ddJVux','isInMovementAnimaX','_axId','_axStates','QJUMF','animaXParts','oAhby','DGPMF','tlyDH','gXnET','865429KXQKuK','aqaKx','moveToIdleDelay','startAnimaXAction','switchToXAnimaState','_axAvailableActionsList','iOMeF','getXAnimaParamsForAction','isInIdleAnimaX','RdBhc','_setAnimaXToIdle','_axIdle','RybRu','clearAnimaX','removeXAnimPart','59603MYzXcK','initAnimaX','isAction','4850qkCHFC','22pLHOlZ','resetXAnima','isHaveAnimaXState','onAnimXPartsRefreshed','ftOLo','yljPs','_updateMovingAnimX','207cunkEN','_xAnimaToIdleTimer','moveSet','AshII','_axState','QJnmt','preLoad','QvSKC','_initMembersAnimaX','isAnimaXActionIsPreloaded'];var a0_0x26fe=function(_0x51b2a5,_0x5bd85a){_0x51b2a5=_0x51b2a5-0x1eb;var _0x4fc155=a0_0x4fc1[_0x51b2a5];return _0x4fc155;};(function(_0x320f44,_0x23b835){var _0x40230b=a0_0x26fe;while(!![]){try{var _0x4f3935=parseInt(_0x40230b(0x1ef))*parseInt(_0x40230b(0x20c))+-parseInt(_0x40230b(0x21e))*-parseInt(_0x40230b(0x226))+-parseInt(_0x40230b(0x21b))*parseInt(_0x40230b(0x21f))+parseInt(_0x40230b(0x258))*parseInt(_0x40230b(0x254))+-parseInt(_0x40230b(0x1f8))+-parseInt(_0x40230b(0x233))*parseInt(_0x40230b(0x202))+parseInt(_0x40230b(0x262));if(_0x4f3935===_0x23b835)break;else _0x320f44['push'](_0x320f44['shift']());}catch(_0x5a79e6){_0x320f44['push'](_0x320f44['shift']());}}}(a0_0x4fc1,0xa1ea6),function(){var _0x30cfec=a0_0x26fe,_0xad1af1;_0xad1af1=Game_Character[_0x30cfec(0x1f5)],function(){var _0x9629d4=_0x30cfec;_0xad1af1[_0x9629d4(0x25c)]=function(){var _0x1a7029=_0x9629d4;return this[_0x1a7029(0x237)]===!![];},_0xad1af1[_0x9629d4(0x250)]=function(){return this['_axId'];},_0xad1af1[_0x9629d4(0x1fa)]=function(){var _0x369d05=_0x9629d4;if('dTHjd'!==_0x369d05(0x20d))return this['_axIdle']()!=null;else{function _0x1c2f7f(){var _0x5b67ee=_0x369d05,_0x5856b6;if(this[_0x5b67ee(0x207)][_0x3904d0]!=null)return;_0x5856b6=_0x26e715[_0x5b67ee(0x255)](this[_0x5b67ee(0x250)](),_0x5a774b,_0x4197d1);if(_0x5856b6==null)return;this['animaXParts'][_0x46be2b]=_0x5856b6,this[_0x5b67ee(0x261)]=!![];}}},_0xad1af1[_0x9629d4(0x221)]=function(_0x709678){var _0x20a95f=_0x9629d4;if(_0x20a95f(0x218)!==_0x20a95f(0x24f))return this[_0x20a95f(0x205)][_0x709678]!=null;else{function _0x3fdaf7(){var _0x4c4295=_0x20a95f;return this[_0x4c4295(0x23a)]=this[_0x4c4295(0x24e)]();}}},_0xad1af1[_0x9629d4(0x1ff)]=function(){var _0x2a8522=_0x9629d4;return this[_0x2a8522(0x25c)]()&&this[_0x2a8522(0x23e)]()[_0x2a8522(0x21d)]();},_0xad1af1[_0x9629d4(0x203)]=function(){var _0x394741=_0x9629d4;return this[_0x394741(0x23a)]===this[_0x394741(0x24e)]();},_0xad1af1[_0x9629d4(0x214)]=function(){var _0x1844e1=_0x9629d4;return this[_0x1844e1(0x23a)]===this['_axIdle']();},_0xad1af1['onAnimaXActionStart']=function(){var _0x515a8d=_0x9629d4;if(_0x515a8d(0x229)===_0x515a8d(0x229))return this[_0x515a8d(0x227)]=0x0;else{function _0xe25e4d(){var _0x5b1b27=_0x515a8d;this[_0x5b1b27(0x207)]={},this[_0x5b1b27(0x261)]=!![];}}},_0xad1af1[_0x9629d4(0x243)]=function(){var _0xeea4ab=_0x9629d4;if(_0xeea4ab(0x224)!==_0xeea4ab(0x24d))return this['resetXAnima']();else{function _0x19b551(){return;}}},_0xad1af1[_0x9629d4(0x231)]=function(){var _0x120525=_0x9629d4,_0x190a77;if(this[_0x120525(0x203)]()){if(_0x120525(0x23f)!==_0x120525(0x23f)){function _0x70cec0(){var _0x20866d=_0x120525;return this[_0x20866d(0x261)]===!![];}}else return![];}if(!this[_0x120525(0x1ff)]())return![];return _0x190a77=this[_0x120525(0x23e)](),_0x190a77['isAction']()&&_0x190a77[_0x120525(0x200)]();},_0xad1af1[_0x9629d4(0x1f7)]=function(_0x969dd2){var _0x562bce=_0x9629d4;return this[_0x562bce(0x211)][_0x562bce(0x1fe)](_0x969dd2);},_0xad1af1[_0x9629d4(0x23e)]=function(){var _0x32c987=_0x9629d4;if(_0x32c987(0x230)===_0x32c987(0x230))return this[_0x32c987(0x23a)];else{function _0x51b979(){var _0x476165=_0x32c987;_0x49eca1=_0x145070,_0x317354[_0x476165(0x25d)](_0x291250),this[_0x476165(0x205)][_0x5ed8e8]=null;}}},_0xad1af1['startAnimaXAction']=function(_0xf35920){var _0x102925=_0x9629d4;return this[_0x102925(0x23a)]=_0xf35920;},_0xad1af1[_0x9629d4(0x210)]=function(_0x282f40){var _0x23b8ba=_0x9629d4;if(_0x23b8ba(0x252)===_0x23b8ba(0x1ec)){function _0x5eb77e(){var _0x4f4e16=_0x23b8ba;return this[_0x4f4e16(0x261)]=![],this[_0x4f4e16(0x227)]=0x0,this[_0x4f4e16(0x237)]=![];}}else this[_0x23b8ba(0x221)](_0x282f40)?(this[_0x23b8ba(0x22a)]=_0x282f40,!this[_0x23b8ba(0x1ff)]()&&this['resetXAnima']()):this[_0x23b8ba(0x25f)]();},_0xad1af1[_0x9629d4(0x21c)]=function(_0x115d74,_0x2ef9fd){var _0x1c7331=_0x9629d4;if(_0x1c7331(0x23c)===_0x1c7331(0x234)){function _0x1f5dd7(){return![];}}else{this[_0x1c7331(0x204)]=_0x115d74,this[_0x1c7331(0x239)](),this[_0x1c7331(0x211)]=[],this[_0x1c7331(0x24c)]={},this[_0x1c7331(0x205)]={},this['_axState']=_0x1c7331(0x236),this['registerAnimaXState'](this[_0x1c7331(0x22a)],_0x2ef9fd);if(this[_0x1c7331(0x205)][this[_0x1c7331(0x22a)]]==null){if(_0x1c7331(0x260)!=='fyTAO'){function _0x4b3327(){var _0x39111a=_0x1c7331;return this[_0x39111a(0x211)][_0x39111a(0x1fe)](_0x5f3678);}}else return;}this[_0x1c7331(0x220)](),this['_isHaveAnimaX']=!![];}},_0xad1af1['registerAnimaXState']=function(_0xa25372,_0xd27185){var _0x4d56be=_0x9629d4;if(_0x4d56be(0x215)!==_0x4d56be(0x215)){function _0xf9de19(){var _0x43ea4b=_0x4d56be;return this[_0x43ea4b(0x205)][_0x24c34d]!=null;}}else{var _0x305418,_0x55fe20,_0x273b6e;try{if(_0x4d56be(0x212)!==_0x4d56be(0x22b)){if(_0xd27185==null)return;_0x273b6e=this[_0x4d56be(0x257)](0x0,_0xa25372,_0xd27185[_0x4d56be(0x248)]);if(_0x273b6e==null)return;_0x273b6e['preLoad'](),_0x55fe20=this['_createAnimaXSetFromParams'](0x1,_0xa25372,_0xd27185[_0x4d56be(0x246)]);if(_0x55fe20!=null){if(_0x4d56be(0x253)==='fIYjK')_0x55fe20[_0x4d56be(0x22c)]();else{function _0x4dac84(){return;}}}_0x55fe20!=null&&_0xd27185[_0x4d56be(0x20e)]!=null&&(_0x55fe20['moveToIdleDelay']=_0xd27185[_0x4d56be(0x20e)]),this[_0x4d56be(0x244)](_0xa25372,_0x273b6e,_0x55fe20);}else{function _0x33a0f7(){var _0xc22b0f=_0x4d56be;_0xc418d5!=null&&(_0x47eccb=_0x38aa45[_0xc22b0f(0x25b)](this[_0xc22b0f(0x250)](),_0x2845cb,_0x360636));}}}catch(_0x1b746a){if('IyZVw'===_0x4d56be(0x1f3))_0x305418=_0x1b746a,console[_0x4d56be(0x25d)](_0x305418),this[_0x4d56be(0x205)][_0xa25372]=null;else{function _0x5c36ab(){var _0x17dd30=_0x4d56be,_0x1f5f79;if(this['isInMovementAnimaX']())return![];if(!this[_0x17dd30(0x1ff)]())return![];return _0x1f5f79=this[_0x17dd30(0x23e)](),_0x1f5f79[_0x17dd30(0x21d)]()&&_0x1f5f79['isWait']();}}}}},_0xad1af1['resetXAnimaState']=function(){var _0x893f4b=_0x9629d4;this[_0x893f4b(0x22a)]=_0x893f4b(0x236);if(!this[_0x893f4b(0x1ff)]()){if(_0x893f4b(0x256)!==_0x893f4b(0x24a))this['resetXAnima']();else{function _0x472ce4(){var _0x10c039=_0x893f4b;return this[_0x10c039(0x261)]=![];}}}},_0xad1af1[_0x9629d4(0x220)]=function(){var _0x2ff764=_0x9629d4;this[_0x2ff764(0x247)]=![],this['_xAnimaToIdleTimer']=0x0,this[_0x2ff764(0x201)]();},_0xad1af1['registerAnimaXAction']=function(_0x3db275){var _0x4efa96=_0x9629d4;if(_0x4efa96(0x1fb)!==_0x4efa96(0x1fb)){function _0x579d11(){var _0x31b969=_0x4efa96;this[_0x31b969(0x221)](_0x155bb3)?(this['_axState']=_0x539a6a,!this['isInAnimXAction']()&&this[_0x31b969(0x220)]()):this[_0x31b969(0x25f)]();}}else return this[_0x4efa96(0x211)][_0x4efa96(0x25e)](_0x3db275);},_0xad1af1[_0x9629d4(0x22e)]=function(){var _0x4f6008=_0x9629d4;return this[_0x4f6008(0x261)]=![],this[_0x4f6008(0x227)]=0x0,this['_isHaveAnimaX']=![];},_0xad1af1[_0x9629d4(0x244)]=function(_0x537ca5,_0x1b0791,_0x295402){var _0x53a7b8=_0x9629d4;if(_0x53a7b8(0x1ed)===_0x53a7b8(0x1ed))this[_0x53a7b8(0x205)][_0x537ca5]={},_0x1b0791[_0x53a7b8(0x22c)](),this[_0x53a7b8(0x205)][_0x537ca5][_0x53a7b8(0x228)]=_0x1b0791,_0x295402!=null?(_0x295402['isLoop']=!![],_0x295402[_0x53a7b8(0x22c)](),this[_0x53a7b8(0x205)][_0x537ca5][_0x53a7b8(0x1f2)]=_0x295402):this['_axStates'][_0x537ca5]['idleSet']=null;else{function _0x2e0ac0(){return this['_axCurrent']=_0x1ede28;}}},_0xad1af1[_0x9629d4(0x257)]=function(_0x399beb,_0x21be6d,_0x146807){var _0x1715cf=_0x9629d4,_0x3bb9d6,_0x246234;_0x3bb9d6=null;try{if(_0x1715cf(0x20a)!==_0x1715cf(0x20a)){function _0x59cc0a(){var _0x2b8812=_0x1715cf;return _0x25bae9[_0x2b8812(0x259)]=_0x1e9a55,_0x240821[_0x2b8812(0x1f6)]=_0x37ff4b,this[_0x2b8812(0x20f)](_0x153c88),!![];}}else{if(_0x399beb===0x0){if(_0x1715cf(0x25a)!==_0x1715cf(0x1f9)){if(_0x146807!=null){if(_0x1715cf(0x223)===_0x1715cf(0x223))_0x3bb9d6=XAnimaTools[_0x1715cf(0x25b)](this[_0x1715cf(0x250)](),_0x21be6d,_0x146807);else{function _0x2950de(){var _0x33650c=_0x1715cf;return this[_0x33650c(0x25c)]()&&this[_0x33650c(0x23e)]()[_0x33650c(0x21d)]();}}}}else{function _0x4c8bb5(){return;}}}else{if('RjLlt'===_0x1715cf(0x232))_0x146807!=null&&(_0x3bb9d6=XAnimaTools['createXAnimaSetForIdle'](this['animXId'](),_0x21be6d,_0x146807));else{function _0x234638(){var _0x4de2e8=_0x1715cf;this[_0x4de2e8(0x220)]();}}}}}catch(_0x446440){_0x246234=_0x446440,console[_0x1715cf(0x25d)](_0x246234),_0x3bb9d6=null;}return _0x3bb9d6;},_0xad1af1['_updateAnimX']=function(){var _0x10c562=_0x9629d4;if(_0x10c562(0x241)===_0x10c562(0x22d)){function _0x54438d(){var _0x24bb5f=_0x10c562;return this[_0x24bb5f(0x227)]=0x0;}}else{this['_updateAnimXRefresh']();if(this['isShouldWaitAnimaXAction']()){if(_0x10c562(0x23b)!==_0x10c562(0x23d))return;else{function _0x134414(){return this['_axIdle']()!=null;}}}this[_0x10c562(0x225)]();if(this[_0x10c562(0x1fa)]()&&this[_0x10c562(0x203)]())return this['_updateMoveIdleAnimaX']();}},_0xad1af1[_0x9629d4(0x225)]=function(){var _0x32d328=_0x9629d4;if(!this[_0x32d328(0x251)]()){if(_0x32d328(0x249)===_0x32d328(0x249))return;else{function _0x388fb0(){var _0x32f5a5=_0x32d328;return this[_0x32f5a5(0x23a)]===this['_axMovement']();}}}this['_xAnimaToIdleTimer']=0x0;if(!this[_0x32d328(0x203)]())return this[_0x32d328(0x220)]();},_0xad1af1[_0x9629d4(0x245)]=function(){var _0x1c7efe=_0x9629d4;if(_0x1c7efe(0x238)===_0x1c7efe(0x238)){if(!this[_0x1c7efe(0x251)]()){if(_0x1c7efe(0x1f4)!==_0x1c7efe(0x1f4)){function _0x40eb71(){var _0x2f5f12=_0x1c7efe;this[_0x2f5f12(0x204)]=_0xe798d3,this['clearXAnimParts'](),this[_0x2f5f12(0x211)]=[],this[_0x2f5f12(0x24c)]={},this[_0x2f5f12(0x205)]={},this[_0x2f5f12(0x22a)]=_0x2f5f12(0x236),this[_0x2f5f12(0x24b)](this[_0x2f5f12(0x22a)],_0x3d1a0c);if(this[_0x2f5f12(0x205)][this[_0x2f5f12(0x22a)]]==null)return;this['resetXAnima'](),this[_0x2f5f12(0x237)]=!![];}}else{this[_0x1c7efe(0x227)]++;if(this[_0x1c7efe(0x227)]>=this[_0x1c7efe(0x1f1)]())return this[_0x1c7efe(0x216)]();}}}else{function _0x58a884(){var _0x56fa0b=_0x1c7efe;this[_0x56fa0b(0x227)]++;if(this['_xAnimaToIdleTimer']>=this[_0x56fa0b(0x1f1)]())return this[_0x56fa0b(0x216)]();}}},_0xad1af1[_0x9629d4(0x1f1)]=function(){var _0x5d9d35=_0x9629d4;if('nZuyp'===_0x5d9d35(0x242)){function _0x57be48(){var _0x101c50=_0x5d9d35;this[_0x101c50(0x22a)]=_0x101c50(0x236),!this[_0x101c50(0x1ff)]()&&this[_0x101c50(0x220)]();}}else return this[_0x5d9d35(0x217)]()[_0x5d9d35(0x20e)];},_0xad1af1[_0x9629d4(0x24e)]=function(){var _0x4b0e74=_0x9629d4;return this[_0x4b0e74(0x205)][this[_0x4b0e74(0x22a)]][_0x4b0e74(0x228)];},_0xad1af1[_0x9629d4(0x217)]=function(){var _0x2e13f4=_0x9629d4;if('lkdfm'!==_0x2e13f4(0x1f0))return this[_0x2e13f4(0x205)][this[_0x2e13f4(0x22a)]][_0x2e13f4(0x1f2)];else{function _0x1b743b(){_0x3f5ed8=this['getPreloadAnimaXActionSet'](_0x3d4349);}}},_0xad1af1[_0x9629d4(0x216)]=function(){var _0xdcb2ef=_0x9629d4;if('dwhZL'===_0xdcb2ef(0x1ee)){function _0x42cce3(){var _0x238166=_0xdcb2ef;return this[_0x238166(0x211)][_0x238166(0x25e)](_0x58f436);}}else return this[_0xdcb2ef(0x23a)]=this[_0xdcb2ef(0x217)]();},_0xad1af1['_setAnimaXToMovement']=function(){var _0x19e691=_0x9629d4;return this[_0x19e691(0x23a)]=this[_0x19e691(0x24e)]();},_0xad1af1[_0x9629d4(0x219)]=function(){var _0x1920d7=_0x9629d4;this[_0x1920d7(0x220)](),this[_0x1920d7(0x237)]=![],this[_0x1920d7(0x21c)](null,null);},_0xad1af1['isAnimXPartsChanged']=function(){var _0x41b925=_0x9629d4;return this[_0x41b925(0x261)]===!![];},_0xad1af1[_0x9629d4(0x222)]=function(){var _0x643ea=_0x9629d4;if(_0x643ea(0x235)==='EPyQO'){function _0x2eed23(){return this['resetXAnima']();}}else return this[_0x643ea(0x261)]=![];},_0xad1af1['addNewXAnimPart']=function(_0x43764a,_0x27a1d0=![]){var _0x46466c=_0x9629d4,_0x49f5a8;if(this['animaXParts'][_0x43764a]!=null)return;_0x49f5a8=XAnimaTools['createXAnimaPart'](this[_0x46466c(0x250)](),_0x43764a,_0x27a1d0);if(_0x49f5a8==null){if(_0x46466c(0x20b)==='gXnET')return;else{function _0x5ced41(){var _0x1033b8=_0x46466c;this[_0x1033b8(0x205)][_0x31c5a3][_0x1033b8(0x1f2)]=null;}}}this[_0x46466c(0x207)][_0x43764a]=_0x49f5a8,this['_xAnimaPartsRequireRefresh']=!![];},_0xad1af1[_0x9629d4(0x21a)]=function(_0x38e77b){var _0x2164ab=_0x9629d4;if(_0x2164ab(0x208)!==_0x2164ab(0x208)){function _0x39131a(){var _0xf207d2=_0x2164ab;this[_0xf207d2(0x207)][_0x150b13]=null,delete this[_0xf207d2(0x207)][_0x14e871],this['_xAnimaPartsRequireRefresh']=!![];}}else this[_0x2164ab(0x207)][_0x38e77b]=null,delete this[_0x2164ab(0x207)][_0x38e77b],this[_0x2164ab(0x261)]=!![];},_0xad1af1[_0x9629d4(0x239)]=function(){var _0x3d6cb6=_0x9629d4;if(_0x3d6cb6(0x206)===_0x3d6cb6(0x206))this[_0x3d6cb6(0x207)]={},this['_xAnimaPartsRequireRefresh']=!![];else{function _0x1dfb41(){var _0x581c69=_0x3d6cb6;return this[_0x581c69(0x205)][this['_axState']][_0x581c69(0x1f2)];}}},_0xad1af1[_0x9629d4(0x1fd)]=function(_0x38c644,_0x3853b4=![],_0x2d6067=![]){var _0x1f9a11=_0x9629d4;if('MrYxH'===_0x1f9a11(0x1fc)){var _0x2eef07,_0x1f1347;if(!this[_0x1f9a11(0x1f7)](_0x38c644))return![];if(this[_0x1f9a11(0x22f)](_0x38c644)){if(_0x1f9a11(0x209)!==_0x1f9a11(0x209)){function _0x574be2(){return this['_axId'];}}else _0x1f1347=this[_0x1f9a11(0x1eb)](_0x38c644);}else{if('uFbjd'===_0x1f9a11(0x240))_0x2eef07=XAnimaTools[_0x1f9a11(0x213)](_0x38c644,this[_0x1f9a11(0x250)]()),_0x1f1347=this['createAnimaXActionSet'](_0x2eef07);else{function _0x16d9cc(){return![];}}}if(_0x1f1347!=null)return _0x1f1347[_0x1f9a11(0x259)]=_0x2d6067,_0x1f1347[_0x1f9a11(0x1f6)]=_0x3853b4,this[_0x1f9a11(0x20f)](_0x1f1347),!![];return![];}else{function _0xe05acf(){var _0x238fcb=_0x1f9a11;this[_0x238fcb(0x220)](),this['_isHaveAnimaX']=![],this[_0x238fcb(0x21c)](null,null);}}};}();}());
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
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
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
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (sceneActive) {
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
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
// * Спрайт для анимации слоя (части)
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

// Generated by CoffeeScript 2.3.0
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
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
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
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
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
    var f, j, len, ref, results;
    ref = this.frames;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      f = ref[j];
      results.push(ImageManager.loadAnimaX(f));
    }
    return results;
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
    this.setDefaultRule(true, true);
  }

  isDisabled() {
    return this._isDisabled === true;
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

  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      default:
        return this.actionName;
    }
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

  _updateFrames(character) {
    if (this.rootAnimation.isMovement()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      this._updateTimer(c.isDashing());
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
    return this.requestRefresh();
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
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else {
      path += "Idle";
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
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, actionRules, layerRule} = params);
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

//Plugin PKD_AnimaX automatic build by PKD PluginBuilder 1.9.2 19.03.2021
