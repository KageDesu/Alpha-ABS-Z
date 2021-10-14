/*:
 * @plugindesc (v.0.2)[PRO] New Active Battle System
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/
 *
 * @help
 *
 * Documentation: https://github.com/KageDesu/Alpha-ABS-Z/wiki
 *
 * Alpha ABS Z - PREVIEW build
 * Not recommended making game with this plugins yet
 * Only for testing and preview purposes

 * @param AABSZ @text @desc
 * 
 * @param inputSettings:struct
 * @text Controls Settings
 * @type struct<LInputSettings>
 * @default {"LMBMapTouchMode":"Default (move)","RMBMapTouchMode":"Turn","LMBTargetTouchMode":"Smart attack (Primary)","RMBTargetTouchMode":"Smart attack (Secondary)","moveType":"WASD and Arrows","isDiagonalMovement:b":"true","isStaticAtkRot:b":"true","keybingind":"","kbReload":"R","kbCommandMenu":"C","kbRotate":"Control"}
 * @desc Controls and keybingind settings
 * 
 * @param spacer|visual @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettingsGroup
 * @text Visual Parameters
 * 
 * @param fonts:strA
 * @parent visualSettingsGroup
 * @text Fonts
 * @type text[]
 * @default ["AABS_0","AABS_1","AABS_2"]
 * @desc Font files names for preload (from fonts\ folder), without extension
 * 
 * @param spacer|enemies @text‏‏‎ ‎@desc ===============================================
 * 
 * @param enemySettingsGroup
 * @text Enemies settings
 * 
 * @param enemies_noPassVision:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the enemies can not see
 * 
 * @param enemies_noPassVision2:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the enemies can not see
 * 
 * 
 * @param spacer|map @text‏‏‎ ‎@desc ===============================================
 * 
 * @param mapSettingsGroup
 * @text Map settings
 * 
 * @param map_noProjectilePass:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the projectiles can not pass
 * 
 * @param map_noProjectilePass2:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the projectiles can not pass
 * 
 * 
 * 
 * 


 * @command ABSEventSettings
 * @text ABS Enemy Configurate
 * @desc Configurate enemy ABS parameters for this certaint event
 * 
 * @arg MainGroup
 * @text Main Group
 * 
 * @arg viewRadius
 * @parent MainGroup
 * @text View Radius
 * @type number
 * @min 1
 * @max 100
 * @default 5
 * @desc On how many map cells sees enemy
 * 
 * @arg returnRadius
 * @parent MainGroup
 * @text  Return Radius
 * @type number
 * @min 1
 * @max 100
 * @default 12
 * @desc How far can the enemy move away from the place where the battle begins
 * 
 * @arg onDeath
 * @parent MainGroup
 * @text On Death
 * @type text
 * @default
 * @desc ABS Script action (SAction), called when enemy is die
 * 
 * @arg MapGroup
 * @text Map Group
 * 
 * @arg shatterEffect
 * @parent MapGroup
 * @text Shatter Effect?
 * @type boolean
 * @default true
 * @desc Is play sprite shatter effect when enemy is die?
 * 
 * @arg deadSwitch
 * @parent MapGroup
 * @text Dead Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @option 0
 * @default 0
 * @desc Will turn ON this self.switch when enemy is die ( 0 - nothing )
 * 
 * @arg eraseOnDead
 * @parent deadSwitch
 * @text Erase on Dead?
 * @type boolean
 * @default true
 * @desc Erase Event when enemy is die? Only if NOT HAVE Dead Switch
 * 
 * @arg VisualGroup
 * @text Visual Group
 * 
 * @arg UIInfo
 * @parent VisualGroup
 * @text Show UI Info?
 * @type boolean
 * @default true
 * @desc Is show portrait UI when enemy is under cursor?
 * 
 * @arg faceName
 * @parent VisualGroup
 * @text Face Name
 * @type file
 * @required 1
 * @dir img\faces
 * @default
 * @desc Image name for portrait UI
 * 
 * @arg faceIndex
 * @parent faceName
 * @text Face Index
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Face index on face image for portrait UI
 * 
 * @arg AnimationGroup
 * @text Animation Group
 * 
 * @arg hitAnimationId
 * @parent AnimationGroup
 * @text Hit Animation
 * @type animation
 * @default 1
 * @desc Hit animation on character when enemy attacks
 * 


 */
/*~struct~LInputSettings:

@param LMBMapTouchMode
@text LMB Map Touch
@type select
@option Primary attack
@option Default (move)
@option Nothing
@default Default (move)
@desc TODO: wiki page?

@param RMBMapTouchMode
@text RMB Map Touch
@type select
@option Default (menu)
@option Secondary attack
@option Move
@option Turn
@option Nothing
@default Turn
@desc TODO: wiki page?

@param LMBTargetTouchMode
@text LMB Target Touch
@type select
@option Primary attack
@option Default (move)
@option Smart attack (Primary)
@option Turn
@default Smart attack (Primary)
@desc TODO: wiki page?

@param RMBTargetTouchMode
@text RMB Target Touch
@type select
@option Secondary attack
@option Move
@option Smart attack (Secondary)
@option Turn
@default Smart attack (Secondary)
@desc TODO: wiki page?

@param moveType
@text Movement
@type select
@option WASD and Arrows
@option Arrows only
@default WASD and Arrows
@desc Keyboard keys for character movement

@param isDiagonalMovement:b
@text Diagonal Movement?
@type boolean
@default true
@on Yes
@off No
@desc Moving in 8 directions?

@param isStaticAtkRot:b
@text Attack when rotation?
@type boolean
@default true
@on Yes
@off No
@desc Always only attack (no move) when rotating if mouse clicked on map?

@param keybingind
@text Key Bindings

@param kbReload
@text Reload
@parent keybingind
@default R
@desc TODO:

@param kbCommandMenu
@text Commands
@parent keybingind
@default C
@desc TODO:

@param kbRotate
@text Rotate
@parent keybingind
@default Control
@desc TODO:

*/

/*~struct~LActorGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible at start?
 * 
 * @param isCanBeEdited:bool
 * @text Is Editable?
 * @type boolean
 * @default true
 * @desc Can player edit this gauge in UI Editor?
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Position on screen
 * 
 * @param label
 * @text Label
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Label image for gauge, optional
 * 
 * @param lagelMargins:struct
 * @text Label Margins
 * @type struct<XY>
 * @default
 * @desc Position of label, relative gauge
 * 
 * @param valueTextType:str
 * @text Value Type
 * @default value
 * 
 * @param text:struct
 * @text Value Text
 * @type struct<CText>
 * 
 * @param gauge:struct
 * @text Gauge
 * @type struct<CGauge>
 * 
 * 
*/
/*~struct~CGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible?
 *
 * @param vertical:bool
 * @text Is Vertical?
 * @type boolean
 * @default false
 * @desc Gauge will use vertical fill?
 * 
 * @param fill
 * @text Fill Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Gaguge fill image, required!
 * 
 * @param foreground
 * @text Foreground Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Image above gauge fill, optional
 * 
 * @param mask
 * @text Mask Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Whole gauge image mask, optional
 * 
 * @param backColor:css
 * @type string
 * @text Background Color
 * @default #000000
 * @desc Text color in HEX format (#000000)
 * 
 * @param backOpacity:int
 * @type number
 * @min 0
 * @max 255
 * @text Background Opacity
 * @default 255
 * @desc from 0 to 255, 0 - transparent, 255 - opaque
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type combo
 * @option AABS_0
 * @option AABS_1
 * @option AABS_2
 * @default AABS_0
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */

var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

// * Проверка Alpha_Core
if(!Imported.Alpha_Core) {
    alert("Alpha ABSZ require Alpha_@Core plugin!");
}
//? Символ AA определяется в Alpha_Core

AA.Version = 20; // 0.1.0


//TODO: Задавать версию необходимого NET и проверять

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
AA._define = 'build'; // * По умолчанию -> сборка

// * Критическая ошибка, стоп игры
AA.cre = function(e, msg) {
    AA.w(e, msg);
    window.alert(msg || "Critical error occur!");
    SceneManager.update = () => {};
};

// * Если карта (Scene_Map) и включён режим АБС
AA.isABSMap = function() {
    return AA.isABSActive() && AA.isMap();
};

// * АБС в активном режиме
AA.isABSActive = function() {
    return AA.System.isABSActive();
};

AA.isMap = function() {
    return KDCore.Utils.isSceneMap();
};

AA.isDEV = function() {
    return AA._define == 'dev';
};

AA.isPro = function() {
    return true;
};

// Generated by CoffeeScript 2.5.1
// * Основной класс объекта АБС на карте (монстр, игрок и т.д.)

//@[STORABLE]
//@[GLOBAL]
var AAEntity;

AAEntity = class AAEntity {
  constructor() {
    this._setup();
  }

  _setup() {
    this._active = false;
    this._target = null;
    this._dead = false;
    // * Состояние
    return this._state = null;
  }

  // * UPDATE
  // -----------------------------------------------------------------------
  update() {}

  // * ABS
  // -----------------------------------------------------------------------
  initABS() {
    return this.activate();
  }

  // * PROPERTIES
  // -----------------------------------------------------------------------
  teamId() {
    return 0;
  }

  character() {}

  battler() {}

  sprite() {
    return $gameMap.spriteset().findTargetSprite(this.character());
  }

  logic() {
    return null;
  }

  // * HELPERS
  // -----------------------------------------------------------------------
  isMyEnemy(aaEntity) {
    if (aaEntity == null) {
      return false;
    }
    if (!aaEntity.isActive()) {
      return false;
    }
    return aaEntity.teamId() !== this.teamId();
    return false;
  }

  // * Эти поля используются для опеределения типа дочернего класса
  isPlayer() {
    return false;
  }

  isAlly() {
    return false;
  }

  isEnemy() {
    return false;
  }

  // * TARGET
  // -----------------------------------------------------------------------
  setTarget(target) {
    return this._target = AA.Utils.packAAEntity(target);
  }

  resetTarget() {
    return this.setTarget(null);
  }

  getTarget() {
    return AA.Utils.unpackAAEntity(this._target);
  }

  isHasTarget() {
    return this._target != null;
  }

  
    // * MAIN STATE
  // -----------------------------------------------------------------------
  isActive() {
    return this._active === true;
  }

  activate() {
    return this._active = true;
  }

  deactivate() {
    return this._active = false;
  }

  // * BATTLE STATE
  // -----------------------------------------------------------------------
  // * Зависит от наличия цели
  inBattle() {
    return this.isHasTarget();
  }

  resetBattle() {
    return this.resetTarget();
  }

  // * DEAD STATE
  // -----------------------------------------------------------------------
  isDead() {
    return this._dead === true;
  }

  setDead() {
    return this._dead = true;
  }

  resetDead() {
    return this._dead = false;
  }

};

// Generated by CoffeeScript 2.5.1
// * Глабольный менедреж событий в АБС
AA.EV = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.EV;
  _.init = function() {
    "INIT ABS GEVENTS SUB SYSTEM".p();
    this.events = [];
    return this._initABSGEvents();
  };
  _.subscribeFor = function(evName, listener) {
    var ref;
    return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener) : void 0;
  };
  _.call = function(evName) {
    var ref;
    return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
  };
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EVENTS.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.EV;
  _._getEventByName = function(name) {
    return this.events.find(function(ev) {
      return ev.name === name;
    });
  };
  _._initABSGEvents = function() {
    // * Когда АБС ставиться на паузу
    this.events.push(new AA.GEvent("PauseABS"));
    //TODO: Проверить эти два на использование
    this.events.push(new AA.GEvent("PlayerTarget"));
    this.events.push(new AA.GEvent("PlayerChangeState"));
    // * Когда игрок начинает выбирать зону действия навыка
    this.events.push(new AA.GEvent("PlayerSkillSelector"));
    // * Когда выполнился (закончился) навык Projectile на карте
    // * Запрашивает очистку кеша
    this.events.push(new AA.GEvent("MapSkillsRequestsClean"));
    // * Смена события под курсором
    this.events.push(new AA.GEvent("UnderMouseEventChanged"));
  };
})();

// ■ END EVENTS.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Глабольный менедреж управления персонажем в АБС
AA.Input = function() {};

// * Кнопки управления
AA.IKey = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Input;
  // * Коэффицент скорости перемещения по диагонали
  _.diagonalSpeed = 0.8;
  // * Клавишы навыков (ячеек) для левой и правой кнопок мыши
  _.primarySkillSymbol = function() {
    return this.skillPanelSymbols[0];
  };
  _.secondarySkillSymbol = function() {
    return this.skillPanelSymbols[1];
  };
  // * Количество ячеек для навыков (и соответсвенно кнопок для них)
  // * Кнопки имеют имя SKL_(INDEX), от 0
  _.skillsSymbolsCount = function() {
    return this.skillPanelSymbols.length;
  };
  _.getTriggeredSkillSymbol = function() {
    var i, key, len, ref;
    ref = this.__skillSymbols;
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (Input.isTriggered(AA.IKey[key[0]])) {
        return key[1];
      }
    }
    return null;
  };
  _.init = function(settings) {
    this.settings = settings;
    _.IsDiagonal = this.settings.isDiagonalMovement;
    _.IsStaticAttackWhenRotating = this.settings.isStaticAtkRot;
    this._loadSkillPanelSymbols();
    this.applyInputSettings();
    this.applyKeybindings();
    return "INIT ABS INPUT SUB SYSTEM".p();
  };
  // * Загружаем кнопки, которые назначены для панели навыков
  _._loadSkillPanelSymbols = function() {
    return this.skillPanelSymbols = AA.PP.getUISkillsItems().map(function(item) {
      return item.symbol;
    });
  };
  // * Загружает данные с настроек плагина
  _.applyKeybindings = function() {
    // * WASD нельзя переопределить из параметров
    this._asignKeyForAASymbol("ML", "a");
    this._asignKeyForAASymbol("MR", "d");
    this._asignKeyForAASymbol("MU", "w");
    this._asignKeyForAASymbol("MD", "s");
    this._asignDefaultActionsKeys();
    this._asingSkillPanelKeys();
  };
  _._asignKeyForAASymbol = function(symbol, key) {
    key = this.convertUnsafeKey(key);
    AA.IKey[symbol] = key;
  };
  _._asignDefaultActionsKeys = function() {
    this._asignKeyForAASymbol("REL", this.settings.kbReload);
    this._asignKeyForAASymbol("CMD", this.settings.kbCommandMenu);
    this._asignKeyForAASymbol("ROT", this.settings.kbRotate);
  };
  _._asingSkillPanelKeys = function() {
    var i, index, key, len, ref, symb;
    // * Дополнительно присвоим для атак свои индтификаторы кнопок
    this._asignKeyForAASymbol("ATK1", this.primarySkillSymbol());
    this._asignKeyForAASymbol("ATK2", this.secondarySkillSymbol());
    // * Теперь для всех навыков (включая атаки тоже, дублируются)
    // * Для более быстрой проверки нажатия, отдельный массив
    this.__skillSymbols = [];
    ref = this.skillPanelSymbols;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      symb = ref[index];
      key = "SKL_" + index;
      this._asignKeyForAASymbol(key, symb);
      this.__skillSymbols.push([key, symb]);
    }
  };
  // * Проверка на кнопки, которые переопределены RPG Maker'ом и не будут работать так
  _.convertUnsafeKey = function(key) {
    if (key == null) {
      return '';
    }
    key = key.toLowerCase();
    switch (key) {
      case 'q':
        return 'pageup';
      case 'w':
        return 'pagedown';
      case 'x':
        return 'escape';
      case 'z':
      case 'space':
        return 'ok';
      default:
        return key;
    }
  };
  _.applyInputSettings = function() {
    this._applyMoveType();
    this._applyLMBMapTouchMode();
    this._applyRMBMapTouchMode();
    this._applyLMBTargetTouchMode();
    this._applyRMBTargetTouchMode();
  };
  _._applyMoveType = function() {
    var mt;
    mt = this.settings.moveType;
    if (mt.contains("WASD")) {
      this._applyWasdAndArrowMoveType();
    }
  };
  // * Движение и на WASD и на стрелки
  _._applyWasdAndArrowMoveType = function() {
    var signXAA, signYAA;
    signXAA = function() {
      var x;
      x = 0;
      if (this.isPressed(AA.IKey.ML) || this.isPressed("left")) {
        x--;
      }
      if (this.isPressed(AA.IKey.MR) || this.isPressed("right")) {
        x++;
      }
      return x;
    };
    signYAA = function() {
      var y;
      y = 0;
      if (this.isPressed(AA.IKey.MU) || this.isPressed("up")) {
        y--;
      }
      if (this.isPressed(AA.IKey.MD) || this.isPressed("down")) {
        y++;
      }
      return y;
    };
    //$[OVER]
    // * Переопределяет методы Input
    Input._signX = signXAA;
    Input._signY = signYAA;
  };
  // * Режим нажатия ЛЕВОЙ кнопкой мыши ПО КАРТЕ (без цели)
  //? 0 - Attack only
  //? 1 - Default (move)
  //? 2 - Nothing
  _._applyLMBMapTouchMode = function() {
    var option;
    _.LMBMapTouchMode = 1; // * Deafult
    option = this.settings.LMBMapTouchMode;
    if (option.contains("att")) {
      _.LMBMapTouchMode = 0;
    } else if (option.contains("Noth")) {
      _.LMBMapTouchMode = 2;
    }
  };
  // * Режим нажатия ПРАВОЙ кнопкой мыши ПО КАРТЕ (без цели)
  //? 0 - Default (open menu)
  //? 1 - Attack only (second skill)
  //? 2 - Move
  //? 3 - Turn
  //? 4 - Nothing
  _._applyRMBMapTouchMode = function() {
    var option;
    _.RMBMapTouchMode = 0; // Default
    option = this.settings.RMBMapTouchMode;
    if (option.contains("att")) {
      _.RMBMapTouchMode = 1;
    } else if (option.contains("Mov")) {
      _.RMBMapTouchMode = 2;
    } else if (option.contains("Tur")) {
      _.RMBMapTouchMode = 3;
    } else if (option.contains("Noth")) {
      _.RMBMapTouchMode = 4;
    }
  };
  //? 0 - Attack only
  //? 1 - Default (move)
  //? 2 - Smart attack
  //? 3 - Turn
  // * Режим нажатия ЛЕВОЙ кнопкой мыши ПО ЦЕЛИ
  _._applyLMBTargetTouchMode = function() {
    var option;
    _.LMBTargetTouchMode = 1; // * Default
    option = this.settings.LMBTargetTouchMode;
    if (option.contains("Smar")) {
      _.LMBTargetTouchMode = 2;
    } else if (option.contains("atk")) {
      _.LMBTargetTouchMode = 2;
    } else if (option.contains("Tur")) {
      _.LMBTargetTouchMode = 3;
    }
  };
  //? 0 - Attack only
  //? 1 - Move
  //? 2 - Smart attack
  //? 3 - Turn
  // * Режим нажатия ПРАВОЙ кнопкой мыши ПО ЦЕЛИ
  _._applyRMBTargetTouchMode = function() {
    var option;
    _.RMBTargetTouchMode = 0; // * Attack only
    option = this.settings.RMBTargetTouchMode;
    if (option.contains("Smart")) {
      _.RMBTargetTouchMode = 2;
    } else if (option.contains("Mov")) {
      _.RMBTargetTouchMode = 1;
    } else if (option.contains("Tur")) {
      _.RMBTargetTouchMode = 3;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Глабольный менедреж выполнения скриптовых действий
AA.SAaction = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.SAaction;
  _.ACTIONS = ["ss", "sw", "vr", "ce", "ap", "ev", "an", "ef", "se", "ba"];
  _.isProper = function(actionLine) {
    var cmd, e, parts;
    if (actionLine == null) {
      return false;
    }
    if (isFinite(actionLine)) {
      return false;
    }
    try {
      parts = actionLine.split("_");
      cmd = parts[0];
    } catch (error) {
      e = error;
      AA.w(e);
      cmd = null;
    }
    return _.ACTIONS.contains(cmd);
  };
  //?MAIN OUTER (Основной метод вызова)
  // * Выполнить AA Script Action
  _.execute = function(action, char) {
    var cmd, e;
    if (!_.isProper(action)) {
      return;
    }
    try {
      cmd = action.split("_")[0];
      switch (cmd) {
        case "ss":
          return _.executeSelfSwitchAction(action, char);
        case "sw":
          return _.executeSwitchAction(action);
        case "vr":
          return _.executeVariableAction(action);
        case "ce":
          return _.executeCommonEventAction(action, char);
        case "ap":
          return _.executeAIModelAction(action, char);
        case "ev":
          return _.executeMapEventAction(action);
        case "an":
          return _.executeAnimationAction(action, char);
        case "ef":
          return _.executeEffectAction(action, char);
        case "se":
          return _.executeSESoundAction(action);
        case "ba":
          return _.executeBallonIcon(action, char);
        default:
          return AA.w("Unknown script action: " + action);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * ss_A_true_2 , ss_B_false, ss_C_false_3 (evId)
  _.executeSelfSwitchAction = function(action, char) {
    var args, evId, key, switchId, switchState;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    switchId = args[1];
    if (!AA.Utils.checkSwitch(switchId)) {
      return;
    }
    switchState = Boolean(args[2].toLowerCase());
    if (args[3] != null) {
      evId = parseInt(args[3]);
    } else {
      if (char == null) {
        return;
      }
      if (char.eventId == null) {
        return;
      }
      evId = char.eventId();
    }
    key = [$gameMap.mapId(), evId, switchId];
    $gameSelfSwitches.setValue(key, switchState);
  };
  // * sw_43_true, sw_222_false
  _.executeSwitchAction = function(action) {
    var args, switchId, switchState;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    switchId = parseInt(args[1]);
    if (switchId <= 0) {
      return;
    }
    switchState = Boolean(args[2].toLowerCase());
    $gameSwitches.setValue(switchId, switchState);
  };
  // * vr_54_2123, vr_44_9932
  _.executeVariableAction = function(action) {
    var args, value, varId;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    varId = parseInt(args[1]);
    if (varId <= 0) {
      return;
    }
    value = args[2];
    if (isFinite(value)) {
      value = parseInt(value);
    }
    $gameVariables.setValue(varId, value);
  };
  // * ce_43, ce_11_this (?)
  _.executeCommonEventAction = function(action, char) {
    var args, ceId;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    ceId = parseInt(args[1]);
    if (ceId <= 0) {
      return;
    }
    if ((args[2] != null) && args[2] === "this" && char instanceof Game_Event) {
      if (char != null) {
        char.aaStartCommonEvent(ceId);
      }
    } else {
      $gameTemp.reserveCommonEvent(ceId);
    }
  };
  // * ev_5 ; start event 5 on this map
  _.executeMapEventAction = function(action) {
    var args, event;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    event = this._getEventByArgId(args[1]);
    if (event != null) {
      event.start();
    }
  };
  _._getEventByArgId = function(argX) {
    var eventId;
    eventId = parseInt(argX);
    if (eventId <= 0) {
      return null;
    }
    return $gameMap.event(eventId);
  };
  // * ap_viewRadius_5, ap_viewRadius_4_12 (evId)
  _.executeAIModelAction = function(action, char) {
    var args, event, paramName, paramValue;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    paramName = args[1];
    if (!String.any(paramName)) {
      return;
    }
    paramValue = args[2];
    // * Преобразование числа
    if (isFinite(paramValue)) {
      paramValue = Number(paramValue);
    }
    //TODO: Как быть с массивами данных??? approachMoveData
    if (args[3] != null) {
      event = this._getEventByArgId(args[4]);
      if (event == null) {
        return;
      }
      char = event;
    }
    // * char
    if (char == null) {
      return;
    }
    if (!char.isABS()) {
      return;
    }
    char.aaChangeModelParam(paramName, paramValue);
  };
  // * an_4 (self), an_5_3 (evId), an_2_1_2 (x,y)
  _.executeAnimationAction = function(action, char) {
    var animationId, args, event, mapX, mapY;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    animationId = parseInt(args[1]);
    if (animationId <= 0) {
      return;
    }
    // * x, y
    if (args[3] != null) {
      mapX = parseInt(args[2]);
      mapY = parseInt(args[3]);
      AABattleActionsManager.playAnimationOnMap(mapX, mapY, animationId);
    } else if (args[2] != null) {
      event = this._getEventByArgId(args[2]);
      if (event == null) {
        return;
      }
      AABattleActionsManager.playAnimationOnCharacter(event, animationId); // * on self
    } else {
      if (char == null) {
        return;
      }
      AABattleActionsManager.playAnimationOnCharacter(char, animationId);
    }
  };
  // * ef_shake_10, ef_shake_10_12 (evId)
  // * ef_shatter_4_4 (dx, dy), ef_shatter_4_4_2 (evId)
  _.executeEffectAction = function(action, char) {
    var args, effectName;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    effectName = args[1];
    switch (effectName) {
      case "shatter":
        _._executeEffect_Shatter(args, char);
        break;
      case "shake":
        _._executeEffect_Shake(args, char);
        break;
      default:
        AA.w("SAction: effect " + effectName + " not registred in ABS");
    }
  };
  _._executeEffect_Shatter = function(args, char) {
    var dx, dy, event;
    dx = parseInt(args[2]);
    dy = parseInt(args[3]);
    if (args[4] != null) {
      event = this._getEventByArgId(args[4]);
      if (event != null) {
        event.aaRequestShatterEffect(dx, dy); // * char
      }
    } else {
      if (char != null) {
        char.aaRequestShatterEffect(dx, dy);
      }
    }
  };
  _._executeEffect_Shake = function(args, char) {
    var event, time;
    time = parseInt(args[2]);
    if (args[3] != null) {
      event = this._getEventByArgId(args[3]);
      if (event != null) {
        event.aaRequestShakeEffect(time); // * char
      }
    } else {
      if (char != null) {
        char.aaRequestShakeEffect(time);
      }
    }
  };
  // * se_Bell1_90_100 (volume, pitch)
  _.executeSESoundAction = function(action) {
    var args, name, pitch, volume;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    name = args[1];
    if (!String.any(name)) {
      return;
    }
    // * volume and pitch - не обязательные
    if (args[2] != null) {
      volume = parseInt(args[2]);
      if (args[3]) {
        pitch = parseInt(args[3]);
      }
    }
    KDCore.Utils.playSE(name, volume, pitch);
  };
  // * ba_1, ba_2_4 (evId)
  _.executeBallonIcon = function(action, char) {
    var args, balloonId;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    balloonId = parseInt(args[1]);
    if (args[2] != null) {
      char = this._getEventByArgId(args[2]);
    }
    if (char != null) {
      $gameTemp.requestBalloon(char, balloonId);
    }
  };
})();

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
    this.animaXAction = "Attack";
    this.actionStartDelay = 10;
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

// Generated by CoffeeScript 2.5.1
// * Класс оболочка навыка на карте (т.е. когда навык уже "запущен")
// * Содержит методы обработки урона, целей и прочие механики работы АБС навыка

//@[STORABLE]
var AASkill2MapAction;

AASkill2MapAction = class AASkill2MapAction {
  constructor(aaSkill, subject, point) {
    this.aaSkill = aaSkill;
    // * Эти значения меняются из Sprite_AAMapSkill2Projectile
    this.x = 0;
    this.y = 0;
    this.totalFlyTime = this._calculateFlyTime();
    this.setSubject(subject);
    this.setTargetPoint(point);
    return;
  }

  setSubject(subject) {
    this.packedSubject = null;
    if (!subject.isABS()) {
      return;
    }
    this.packedSubject = AA.Utils.packAAEntity(subject);
    this._initStartPoint();
  }

  setTargetPoint(point) {
    if (this.packedSubject != null) {
      point = this.preparePoint(point);
    }
    if (point instanceof Game_Character) {
      point = point.toPoint();
    }
    // * Точки на экране
    this.scX = this._convertPointValue(point.x);
    this.scY = this._convertPointValue(point.y);
    // * Точки на карте
    this.tX = point.x;
    this.tY = point.y;
  }

  preparePoint(point) {
    var direction, subject;
    if (this.aaSkill.isInPoint()) {
      return point;
    } else {
      // * По направлению персонажа (face direction)
      subject = this.getSubject();
      if ((subject._diagonalDir != null) && subject._diagonalDir !== false) {
        direction = subject._diagonalDir;
      } else {
        direction = subject.direction();
      }
      return AA.Utils.Math.getProjectilePointByDirection(subject.toPoint(), direction);
    }
  }

  isSubjectIsPlayer() {
    return (this.packedSubject != null) && this.packedSubject.type === 0;
  }

  isSubjectIsEvent() {
    return (this.packedSubject != null) && this.packedSubject.type === 1;
  }

  getSubjectEvId() {
    if (this.isSubjectIsEvent()) {
      return this.packedSubject.id;
    } else {
      return -1;
    }
  }

  getSubject() {
    return AA.Utils.unpackAAEntity(this.packedSubject);
  }

  id() {
    return this.aaSkill.idA;
  }

  zLevel() {
    return this.aaSkill.z;
  }

  image() {
    return this.aaSkill.skillImg;
  }

  hitOffset() {
    return this.aaSkill.hitOffset;
  }

  speed() {
    return this.aaSkill.speed;
  }

  isHaveRegion(regionId) {
    var globalRegions;
    globalRegions = AA.PP.getProjectileRestrictedRegions();
    if (globalRegions.contains(regionId)) {
      return true;
    }
    return this.aaSkill.noPassRegions.contains(regionId);
  }

  isHaveTerrain(terrainTag) {
    var globalTerrains;
    globalTerrains = AA.PP.getProjectileRestrictedTerrains();
    if (globalTerrains.contains(terrainTag)) {
      return true;
    }
    return this.aaSkill.noPassTerrains.contains(terrainTag);
  }

  isCanHitPoint() {
    return this.aaSkill.isInCertainPoint();
  }

  isNoContact() {
    return this.aaSkill.isNoContact();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkill2MapAction.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkill2MapAction.prototype;
  _._initStartPoint = function() {
    var subject;
    subject = this.getSubject();
    this.x = this._convertPointValue(subject.x);
    this.y = this._convertPointValue(subject.y);
  };
  // * Приводим обе точки (старт и финишь) к одному формату
  _._convertPointValue = function(value) {
    var tw;
    tw = $gameMap.tileWidth();
    return Number(value * tw + tw / 2);
  };
  
  // * Дистанцию полёта определяем по времени, а не по дистанции
  _._calculateFlyTime = function() {
    var dist;
    if (this.aaSkill.range <= 0 || this.speed() <= 0) {
      return 10;
    } else {
      dist = this.aaSkill.range * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
      return dist / this.speed();
    }
  };
})();

// ■ END AASkill2MapAction.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с основными методами системы
AA.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ABS SYSTEM".p();
      AA.EV.init();
      this.loadParameters();
      this.applyParameters();
    };
    _.loadParameters = function() {
      return AA.PP = new AA.ParamsManager();
    };
    // * В зависимости от параметров, добавление новых методов
    _.applyParameters = function() {
      return AA.Input.init(AA.PP.getParam('inputSettings'));
    };
    _.loadFonts = function() {
      var font, i, len, ref;
      if (AA.PP == null) {
        return;
      }
      ref = AA.PP.fonts();
      for (i = 0, len = ref.length; i < len; i++) {
        font = ref[i];
        if (String.any(font)) {
          KDCore.Utils.loadFont(font);
        }
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Управление АБС системой
    // -----------------------------------------------------------------------
    // * Этот метод выполняется всегда когда загружается карта
    // * Не зависимо, ABS в паузе или нет
    _.startABS = function() {
      "START ABS SESSION ON MAP".p();
      if ($gameSystem._isABS == null) {
        // * По умлочанию, система всегда активированна
        this.resumeABS();
      }
      $gamePlayer.initABS();
      $gameMap.initABS();
    };
    _.resumeABS = function() {
      return $gameSystem._isABS = true;
    };
    _.pauseABS = function() {
      if (!this.isABSActive()) {
        return;
      }
      $gameSystem._isABS = false;
      AA.EV.call("PauseABS");
    };
    _.isABSActive = function() {
      return $gameSystem._isABS === true;
    };
    _.update = function() {};
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Управление переходами и состояниями
    // -----------------------------------------------------------------------
    // * Главное меню (или Scene_Boot)
    _.onGameDataLoaded = function() {
      // * Парсим (читаем) АБС параметры в БД
      AA.Utils.Parser.processABSSkillsNotetags();
      AA.Utils.Parser.processABSEnemiesNotetags();
    };
    // * Сцена карты загрузилась (или попали на сцену из меню, или Transfer)
    _.onMapSceneLoaded = function() {
      this.startABS();
      AA.UI.refresh();
    };
    // * Сцена карты завершается (переключение сцены)
    _.onMapSceneStopped = function() {
      AA.UI.terminate();
      $gamePlayer.aaOnMapSceneEnd();
      $gameTemp.aaClearAILogicThreads();
    };
    _.onTitleScreen = function() {};
    // * Новая карта (Data)
    _.onNewMapLoaded = function() {};
    // * Перед сохранением
    _.onGameSave = function() {};
    // * После сохранения
    _.onGameSaved = function() {};
    // * Перед загрузкой
    _.onGameLoad = function() {};
    // * После загрузки
    _.onGameLoaded = function() {};
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Машина состояний для АИ
//@[STORABLE]
var AIFlowMachine;

AIFlowMachine = class AIFlowMachine {
  constructor(id) {
    this.id = id;
    this.state = 0;
    this._stateFlows = [];
    this._setup();
  }

  registerFlowForState(stateId, flowObject) {
    return this._stateFlows[stateId] = flowObject;
  }

  char() {
    return $gameMap.event(this.id);
  }

  entity() {
    return this.char().AAEntity();
  }

  battler() {
    return this.char().AABattler();
  }

  isActive() {
    return this.char().isActive();
  }

  logic() {
    return this.char().AALogic();
  }

  model() {
    return this.char().AAModel();
  }

  // * Сбросить состояние
  resetState() {
    return this.setState(0);
  }

  // * Установить состояние
  setState(newState) {
    // * Предыдущее состояние
    this.prevState = this.state;
    // * Текущее состояние (новое)
    this.state = newState;
    this._onStateChanged();
  }

  // * Перейти в состояние (без сброса данных, плавно)
  translateToState(newState) {
    this.prevState = this.state;
    this.state = newState;
    this._onStateTranslated();
  }

  update() {
    if (this.char() == null) {
      return;
    }
    if (!this.isActive()) {
      return;
    }
    return this._updateStates();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AIFlowMachine.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AIFlowMachine.prototype;
  _._setup = function() {}; // * EMPTY
  _._updateStates = function() {
    if (this.state < 0) {
      return;
    }
    if (this._stateFlows.length === 0) {
      return;
    }
    return this._stateFlows[this.state].update();
  };
  _._onStateChanged = function() {
    if (this.prevState >= 0) {
      this._stateFlows[this.prevState].onStateEnd();
    }
    this._stateFlows[this.state].onStateStart();
  };
  _._onStateTranslated = function() {
    if (this.prevState >= 0) {
      this._stateFlows[this.prevState].onStatePause();
    }
    this._stateFlows[this.state].onStateResume(this.prevState);
  };
})();

// ■ END AIFlowMachine.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: переместить в A_CORE или KDCOre

//TODO: см метод hitIndex в Window_Selectable - Там конверт глобал координат в локальные простой

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (AA.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

(function() {  // * Draggable sprite
  //? KDCore.Sprite extension
  // * NOTHING
  var ALIAS__update, _;
  _ = KDCore.Sprite.prototype;
  _.setDraggable = function(_isDragActive) {
    this._isDragActive = _isDragActive;
    if (this._isDragActive === true) {
      return this._updateDragging = this._updateDraggingActive;
    } else {
      if (this.isDragging()) {
        this.resetDrag();
      }
      return this._updateDragging = function() {}; // * EMPTY
    }
  };
  _.isDraggable = function() {
    return this._isDragActive === true;
  };
  _.activateDrag = function() {
    $gameTemp._kdDragSprite = this;
    this._dragging = true;
    this._lastTouchPosition = TouchInput.toPoint();
    this._deltaXY = this.toPoint().delta(this._lastTouchPosition);
    if (this.dragStartHandler != null) {
      return this.dragStartHandler();
    }
  };
  _.resetDrag = function() {
    this._dragging = false;
    if (!this._lastTouchPosition.isSame(TouchInput.toPoint())) {
      if (this.dragEndHandler != null) {
        this.dragEndHandler();
      }
    }
    if ($gameTemp._kdDragSprite === this) {
      $gameTemp._kdDragSprite = null;
    }
    this._lastTouchPosition = null;
  };
  _.isDragging = function() {
    return this._dragging === true;
  };
  _.setOnDragEnd = function(dragEndHandler) {
    this.dragEndHandler = dragEndHandler;
  };
  _.setOnDragStart = function(dragStartHandler) {
    this.dragStartHandler = dragStartHandler;
  };
  _.setOnDrag = function(dragProcessHandler) {
    this.dragProcessHandler = dragProcessHandler;
  };
  _.isCanStartDragging = function() {
    return true;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this._updateDragging();
  };
  //?DYNAMIC
  _._updateDragging = function() {}; // * DUMMY
  _._updateDraggingActive = function() {
    if (this.isDragging()) {
      return this._updateDraggingProcess();
    } else {
      if ($gameTemp._kdDragSprite != null) {
        return;
      }
      if (TouchInput.isPressed() && this.isCanStartDragging()) {
        if (this.isUnderMouse()) {
          return this.activateDrag();
        }
      }
    }
  };
  _._updateDraggingProcess = function() {
    if (TouchInput.isPressed()) {
      if (!KDCore.Utils.isPointInScreen(TouchInput)) {
        return;
      }
      this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
      if (this.dragProcessHandler != null) {
        return this.dragProcessHandler();
      }
    } else {
      return this.resetDrag();
    }
  };
})();

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
    //skillInNewPos = @getSkillForSymbol(symbNew)
    this.currentSet()[symbNew] = skillId;
  }

  //if skillInNewPos > 0
  //    @currentSet()[symbOld] = skillInNewPos if symbOld?
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

// Generated by CoffeeScript 2.5.1
// * Класс для Action для навыков ABS

// * Большинство методов из Game_Action просто не используются
// * Вынесен в отдельный класс чтобы не мешать обычной битве
var AABattleAction;

AABattleAction = class AABattleAction extends Game_Action {
  constructor(subject, aaSkill) {
    super(subject, true);
    this.setAASkill(aaSkill);
  }

  setAASkill(aaSkill) {
    if (aaSkill == null) {
      this.clear();
    }
    if (aaSkill.isItem()) {
      this.setItem(aaSkill.databaseId());
    } else {
      this.setSkill(aaSkill.idA);
    }
  }

  AASkill() {
    return this.item().AASkill;
  }

  //$[OVER]
  // * canUse проверяется перед выполнением действия, поэтому тут пропускаем
  isValid() {
    return (this._packedSubject != null) && (this.item() != null) && (this.item().AASkill != null);
  }

  //$[OVER]
  // * Проверки сокращены, так как не используются стандартные настройки
  testApply(target) {
    return true;
  }

  // * Нет смысла, так как testLifeAndDeath == true всегда
  // * А проверки валидности цели идут на фильтре целей
  /*return @testLifeAndDeath() && (
      (@isHpRecover() && target.hp < target.mhp) ||
      (@isMpRecover() && target.mp < target.mmp) ||
      @hasItemAnyValidEffects(target)
  )*/
  //$[OVER]
  // * Нет необходимости в этой проверке
  testLifeAndDeath(target) {
    return true;
  }

  //$[OVER]
  setSubject(subject) {
    if (subject == null) {
      return this._packedSubject = null;
    } else {
      return this._packedSubject = AA.Utils.packAAEntity(subject);
    }
  }

  //$[OVER]
  subject() {
    var subject;
    subject = AA.Utils.unpackAAEntity(this._packedSubject);
    if (subject != null) {
      return subject.AABattler();
    }
    return null;
  }

  //$[OVER]
  apply(target) {
    var b;
    b = target.AABattler();
    Game_Action.prototype.apply.call(this, b);
    b.result().setUsedAASkill(this.AASkill());
  }

  //$[OVER]
  updateLastUsed() {} // * EMPTY

  //TODO: Сохранять на Subject полседний использованный AASkill ???
  //Чтобы например он onActionOnMe использовать

    //$[OVER]
  updateLastSubject() {} // * EMPTY

};

// Generated by CoffeeScript 2.5.1
// * Класс с методами взаимодействия навыков и Entities (аналог Battle Process)
var AABattleActionsManager;

AABattleActionsManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AABattleActionsManager;
  _.startAASkill = function(aaSkill, subject, targetPoint) {
    var direction, i, j, nextPoint, ref, target;
    if (aaSkill == null) {
      return;
    }
    if (aaSkill.isSelfAction()) {
      "SELF ACTION".p();
      this.applySkillAction(subject, subject, aaSkill);
    } else if (aaSkill.isInstant()) {
      "INSTANT ACTION".p();
      // * Надо получить точку по направлению
      if (!aaSkill.isInPoint()) {
        nextPoint = subject;
        direction = subject.direction();
        for (i = j = 1, ref = aaSkill.range; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          nextPoint = AA.Utils.Math.getProjectilePointByDirection(nextPoint, direction);
          target = AATargetsManager.getTargetInPoint(subject, aaSkill, nextPoint);
          if (target == null) {
            // * Если цели нет, просто передаём точку на карте (для NoContact навыков)
            target = nextPoint;
          }
          this.applySkillAction(subject, target, aaSkill);
        }
      } else {
        this.applySkillAction(subject, targetPoint, aaSkill);
      }
    } else {
      $gameMap.startAASkill(aaSkill, subject, targetPoint);
    }
  };
  _.startNonProjectileAASkill = function() {};
  _.startProjectileAASkill = function() {};
  // * Выполнение действия АБС навыка на карте или Entity
  _.applySkillAction = function(subject, target, absSkill) {
    var animationId, e, targets, x, y;
    try {
      "applySkillAction".p();
      animationId = this.getProperAnimationId(subject, absSkill);
      if (target instanceof Game_Character) {
        if (absSkill.animationOnMap === 0) {
          this.playAnimationOnCharacter(target, animationId);
        } else {
          this.playAnimationOnMap(target.x, target.y, animationId);
        }
      } else {
        // * Если навык требует контакт, то нет никаких эффектов
        if (!absSkill.isNoContact()) {
          return;
        }
        ({x, y} = target);
        this.playAnimationOnMap(x, y, animationId);
      }
      targets = AATargetsManager.collectTargtesForSkill(subject, absSkill, target);
      this.performBattleAction(subject, absSkill, targets);
    } catch (error) {
      //TODO: Do Common Action (Выполнение обычных действий на событиях или персонажах)
      e = error;
      AA.w(e);
    }
  };
  //TODO: Добавить параметр Animation Scalling ??? Чтобы скалировать обычную анимацию на карте и не переделывать каждую

  // * Анимация с учётом оружия
  _.getProperAnimationId = function(subject, absSkill) {
    var animationId, e;
    try {
      animationId = absSkill.animationId();
      if (animationId === -1) { // * Normal attack
        return subject.AABattler().attackAnimationId1();
      }
      //TODO: attackAnimationId2 if dual weild
      return animationId;
    } catch (error) {
      e = error;
      AA.w(e);
      return 0;
    }
  };
  //TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

  // * Воспроизвести анимацию на персонаже
  _.playAnimationOnCharacter = function(char, animationId) {
    var e;
    try {
      if ((animationId != null) && animationId > 0) {
        $gameTemp.requestAnimation([char], animationId, false);
      }
    } catch (error) {
      e = error;
      KDCore.warning("playAnimationOnCharacter", e);
    }
  };
  // * Воспроизвести анимацию в точке на карте
  _.playAnimationOnMap = function(x, y, animationId) {
    var e;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    try {
      if ((animationId != null) && animationId > 0) {
        $gameMap.aaRequestMapAnimation(x, y, animationId);
      }
    } catch (error) {
      e = error;
      KDCore.warning("playAnimationOnMap", e);
    }
  };
  // * ======================================================================
  // * BATTLE ACTION LOGIC

  // * subject и target - это characters, не battlers
  _.performBattleAction = function(subject, skill, targets) {
    var action, e;
    "PERFORM BATTLE ACTION".p();
    "SUB".p();
    console.info(subject);
    "SKILL".p();
    console.info(skill);
    "TARG".p();
    console.info(targets);
    if (subject == null) {
      return;
    }
    if (skill == null) {
      return;
    }
    try {
      action = new AABattleAction(subject, skill);
      if (!action.isValid()) {
        return;
      }
      this._startAction(action, targets);
      this._endAction(action);
    } catch (error) {
      e = error;
      KDCore.warning("performBattleAction", e);
    }
  };
  _._startAction = function(action, targets) {
    var e, j, len, t;
    try {
      // * Вызов общих событий навыка (предмета)
      //TODO: Вызов общих событий AASkill ???
      action.applyGlobal();
      for (j = 0, len = targets.length; j < len; j++) {
        t = targets[j];
        this._invokeAction(t, action);
      }
    } catch (error) {
      e = error;
      KDCore.warning("_startAction", e);
    }
  };
  _._invokeAction = function(target, action) {
    var e;
    try {
      //TODO: repeats time?
      action.apply(target);
      //TODO: CE on Use
      //TODO: Impulse?
      this._onActionResult(target, action);
    } catch (error) {
      e = error;
      KDCore.warning("_invokeAction", e);
    }
  };
  _._onActionResult = function(target, action) {
    var battler, e;
    try {
      battler = target.AABattler();
      if (!battler.result().used) {
        return;
      }
      this._performActionResultOnTarget(target);
      battler.startDamagePopup();
      action.subject().startDamagePopup();
      target.aaOnActionOnMe(action);
    } catch (error) {
      e = error;
      KDCore.warning("_onActionResult", e);
    }
  };
  // * Звуковые и визуальные эффекты после действия (на цели)
  _._performActionResultOnTarget = function(target) {
    var battler, e, result;
    try {
      battler = target.AABattler();
      result = battler.result();
      // * MISS
      if (result.missed) {
        battler.performMiss();
      // * EVADE
      } else if (result.evaded) {
        if (result.physical) {
          battler.performEvasion();
        } else {
          battler.performMagicEvasion(); // * DAMAGE
        }
      } else {
        // * HP
        if (result.hpAffected) {
          if (result.hpDamage > 0 && !result.drain) {
            battler.performDamage();
          }
          if (result.hpDamage < 0) {
            battler.performRecovery();
          }
        }
        // * MP and TP
        if (battler.isAlive() && (result.mpDamage !== 0 || result.tpDamage !== 0)) {
          if (result.mpDamage < 0 || result.tpDamage < 0) {
            battler.performRecovery();
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning("_actionResultOnDamage", e);
    }
  };
  //TODO: Надо каждую секунду вызывать battler.onTurnEnd ???
  _._endAction = function(action) {
    var battler, e;
    try {
      battler = action.subject();
      battler.onAAActionEnd();
    } catch (error) {
      e = error;
      KDCore.warning("_endAction", e);
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с вспомогательными методами для АБС боя
var AABattleManager;

AABattleManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AABattleManager;
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
//TODO: Не нужен по сути

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
    if (skillIdOrObject == null) {
      return false;
    }
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
  _.unpackAASkill = function(idA) {
    var object;
    object = this.getAASkillObject(idA);
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

// Generated by CoffeeScript 2.5.1
// * Методы формирования Damage PopUp на персонаже
var AADamagePopUpFactory;

AADamagePopUpFactory = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AADamagePopUpFactory;
  _.createDamagePopUpData = function(battler) {
    var result;
    result = battler.result();
    if (result.missed || result.evaded) {
      return this._createMiss();
    } else if (result.hpAffected) {
      return this._createHpDamage(result, battler.isEnemy());
    } else if (battler.isAlive() && result.mpDamage !== 0) {
      return this._createMpDamage(result);
    }
    return null; // * Нет ничего
  };
  
  //TODO: Miss Вынести в словарь (параметры плагина)
  _._createMiss = function() {
    return this._createFromSettings("Miss_For_All", "Miss");
  };
  _._createFromSettings = function(styleId, value) {
    return {
      settings: AA.PP.getPopUpDamageSettings(styleId),
      value: value
    };
  };
  _._createHpDamage = function(result, isEnemy) {
    var isHeal, styleId, value;
    isHeal = result.hpDamage < 0;
    value = this._convertValue(result.hpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      if (isHeal === true) {
        return this._createFromSettings("Heal_For_All", value);
      } else {
        if (isEnemy) {
          styleId = "Damage_HP_For_Enemy";
        } else {
          styleId = "Damage_HP_For_Player";
        }
        if (result.critical) {
          styleId += "_Critical";
        }
        return this._createFromSettings(styleId, value);
      }
    }
  };
  _._createMpDamage = function(result) {
    var isHeal, value;
    isHeal = result.mpDamage < 0;
    value = this._convertValue(result.mpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      return this._createFromSettings("Damage_Other_Any", value);
    }
  };
  // * Чтобы лечение было с +
  _._convertValue = function(value) {
    if (value >= 0) {
      return value;
    }
    value *= -1;
    return "+" + value;
  };
  // * Есть ли у навыка специальный пользовательский стиль урона?
  _._isHaveSpecialStyle = function(result) {
    var aaSkill;
    aaSkill = result.getUsedAASkill();
    return (aaSkill != null) && String.any(aaSkill.popUpStyleId);
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Так же передаём номер события, чтобы был доступ к модели и логике
var AAEnemyBattler;

AAEnemyBattler = class AAEnemyBattler extends Game_Enemy {
  constructor(enemyId, eventId) {
    super(enemyId, 0, 0);
    this.eventId = eventId;
    // * Проверка делается один раз, так как навыки не меняются
    this._isHaveAnyAASkill = this._checkAASkillsInActions();
    this._aaAttackHitAnimationId = this.char().AAModel().hitAnimationId;
    return;
  }

  char() {
    return $gameMap.event(this.eventId);
  }

  getAASkills() {
    return this._selectAASkillsFromActions().map(function(skillId) {
      return $dataSkills[skillId];
    });
  }

  
    // * Если ли у врага хотябы одно действие с АБС навыком
  isHaveAnyAASkill() {
    return this._isHaveAnyAASkill === true;
  }

  aaIsActionValid(action) {
    return AA.Utils.isAAObject(action.skillId);
  }

  isActionValid(action) {
    var isABS;
    isABS = this.aaIsActionValid(action);
    return isABS && Game_Enemy.prototype.isActionValid.call(this, action);
  }

  attackAnimationId1() {
    return this._aaAttackHitAnimationId;
  }

  // * У монстров не может быть двуручной атаки, поэтому всегда 0
  attackAnimationId2() {
    return 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AAEnemyBattler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAEnemyBattler.prototype;
  // * Среди всех действий врага, есть хотябы одно АБC
  // * Эта проверка нужна, чтобы сразу отметить врага как неспособного сражаться
  _._checkAASkillsInActions = function() {
    var aaActions;
    aaActions = this.enemy().actions.filter((a) => {
      return this.aaIsActionValid(a);
    });
    return aaActions.length > 0;
  };
  // * Выборка всех возможных АБС навыков из доступных действий
  // * (Тут смотритеся и canUse и можно ли использовать действие по условию в самом действии)
  _._selectAASkillsFromActions = function() {
    var aaSkills, actionList;
    aaSkills = [];
    actionList = this.enemy().actions.filter((a) => {
      return this.isActionValid(a);
    });
    if (actionList.length > 0) {
      aaSkills = this._aaSelectAllABSActions(actionList);
    }
    return aaSkills;
  };
  
  // * Метод аналогичен selectAllActions, только изменён под АБС
  // * Возвращает все АА навыки, которые проходят условия Action из БД
  _._aaSelectAllABSActions = function(actionList) {
    var aaSkills, action, i, j, ratingMax, ratingZero, ref;
    aaSkills = [];
    ratingMax = Math.max(...actionList.map(function(a) {
      return a.rating;
    }));
    ratingZero = ratingMax - 3;
    actionList = actionList.filter(function(a) {
      return a.rating > ratingZero;
    });
    for (i = j = 0, ref = actionList.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      action = this.selectAction(actionList, ratingZero);
      if (action != null) {
        aaSkills.push(action.skillId);
      }
    }
    return aaSkills;
  };
})();

// ■ END AAEnemyBattler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс используется для AAEntity врагов на карте
var AAEnemyEntity;

AAEnemyEntity = class AAEnemyEntity extends AAEntity {
  constructor(eventId) {
    super();
    this.eventId = eventId;
  }

  // * Группа у них 1, как и у стандартных врагов, чтобы враги их игнорировали
  teamId() {
    return 1;
  }

  character() {
    return $gameMap.event(this.eventId);
  }

  battler() {
    return this.aaBattler;
  }

  isEnemy() {
    return true;
  }

  logic() {
    return this.aaLogic;
  }

  // * Настройки и параметры
  model() {
    return this.aaModel;
  }

  initABS() {
    if (this.model() == null) {
      super.initABS();
      // * Инициализация системы в первый раз
      this.aaModel = new AAEnemyModelData(this.eventId);
      this.aaBattler = new AAEnemyBattler(this.aaModel.enemyId, this.eventId);
      this.aaLogic = new EnemyAI_FlowMachine(this.eventId);
    } else {

    }
  }

};

// * Ничего
// * Повторная инициализация (например после выхода из меню) не нужна

// Generated by CoffeeScript 2.5.1
// * Класс, который содержит все настройки и параметры AA сущности врага на карте
// * Аналог AIBehavModel из ABS MV

//@[STORABLE]
//@[GLOBAL]
var AAEnemyModelData;

AAEnemyModelData = (function() {
  class AAEnemyModelData {
    constructor(eventId) {
      this.eventId = eventId;
      this.enemyId = this.eventSettings().getEnemyId();
      this._initBaseParameters();
      this._applyParametersFromDB();
      this._applyParametersFromEvent();
      this._convertParameters();
    }

    //TODO: Делать редактор или нет?

      //TODO: Игрок должен иметь возмможность менять значения во время игры
    //TODO: basik shake effect strength when hitted
    enemy() {
      return $dataEnemies[this.enemyId];
    }

    eventSettings() {
      return $gameMap.event(this.eventId).aaEventSettings;
    }

    isHaveDeadSwitch() {
      return AA.Utils.checkSwitch(this.deadSwitch);
    }

    isHaveOnDeathAction() {
      return AA.SAaction.isProper(this.onDeath);
    }

  };

  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = AAEnemyModelData.prototype;
    
    // * Инициализация базовых настроек
    _._initBaseParameters = function() {
      this._initMain();
      this._initOnMapSettings();
      this._initOtherSettings();
      this._initVisualSettings();
      this._initAnimationSettings();
      this._initMovingSettings();
    };
    _._initMain = function() {
      this.onDeath = 0; //AScript
      this.returnRadius = 12;
      this.viewRadius = 5;
      //TODO: Каждый враг может иметь свои ограничения видимости
      this.noPassVisionRegions = 0;
      this.noPassVisionTerrains = 0;
    };
    _._initOnMapSettings = function() {
      this.shatterEffect = 1;
      this.deadSwitch = 0; //Switch (A, B, C, D)
      this.eraseOnDead = 1;
    };
    _._initVisualSettings = function() {
      this.faceName = ""; // имя файла в папке faces
      this.faceIndex = 0;
      this.UIInfo = 1; // * Если 1 - показывать Target UI при наведени курсора
      this.miniHpGaugeStyle = ""; //TODO: * no used
      return this.miniHPGaugeOffset = [
        0,
        0 //TODO: * no used
      ];
    };
    _._initOtherSettings = function() {};
    _._initAnimationSettings = function() {
      this.hitAnimationId = 1; // ID анимации
    };
    _._initMovingSettings = function() {
      // Range (when start), Freq, Speed
      this.approachMoveData = [3, 5, 4];
      // Min dist, Freq, Speed, isRandomStep
      this.inBattleMoveData = [1, 3, 3, 0];
    };
    //TODO: returnMoveData
    _._applyParametersFromDB = function() {
      var i, len, p, params;
      params = this.enemy().AAEnemy;
      if (params == null) {
        return;
      }
      for (i = 0, len = params.length; i < len; i++) {
        p = params[i];
        this[p[0]] = p[1];
      }
    };
    // * Применяем параметры из страницы события
    _._applyParametersFromEvent = function() {
      var i, len, param, ref, settings;
      settings = this.eventSettings();
      if (!settings.isHaveExtraParameters()) {
        return;
      }
      ref = settings.getParameters();
      for (i = 0, len = ref.length; i < len; i++) {
        param = ref[i];
        this[param[0]] = param[1];
      }
    };
    // * Преобразует некоторые параметры
    _._convertParameters = function() {
      this.miniHPGaugeOffset = AA.Utils.Parser.convertArrayFromParameter(this.miniHPGaugeOffset); //TODO: * no used
      this.approachMoveData = AA.Utils.Parser.convertArrayFromParameter(this.approachMoveData);
      this.inBattleMoveData = AA.Utils.Parser.convertArrayFromParameter(this.inBattleMoveData);
    };
  })();

  return AAEnemyModelData;

}).call(this);

// ■ END PRIVATE
//---------------------------------------------------------------------------
// * Не используются (для Selection circle)
//@selectionVisible = true
//@selectionColor = "#FF00FF"
//@selectionOffset = [0, -10]
//@selectionImage = "targetSelectedDottedSquare"

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAEventSettingsParser.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AAEventSettingsParser;
  AAEventSettingsParser = class AAEventSettingsParser {
    constructor(list) {
      this.list = []; // * Список всех комментариев
      this.absParameters = []; // * ABS параметры
      this.param = null; // * Параметр плагина (MZ)
      this.mainLine = ""; // * <ABS:X>
      this.parsedParams = []; // * Финальные значения параметров на замену
      this._pasreEventList(list);
      this._parseABSParamsBase();
      this._parseABSParamsSequence();
      this._parseParams();
      this._parsePluginCommand();
      return;
    }

    isHaveExtraParameters() {
      return this.parsedParams.length > 0;
    }

    getParameters() {
      return this.parsedParams;
    }

    getEnemyId() {
      var param;
      param = AA.Utils.Parser.extractABSParameter(this.mainLine);
      if (param == null) {
        return 0;
      }
      return param[1];
    }

    
      // * Извлечает из списка команд только комменатрии или определённую команду плагина
    _pasreEventList(list) {
      var j, len, line, ref;
      for (j = 0, len = list.length; j < len; j++) {
        line = list[j];
        if (line == null) {
          continue;
        }
        if (line.code === 108 || line.code === 408) {
          this.list.push(line.parameters[0]);
        } else if (line.code === 357 && ((ref = line.parameters) != null ? ref[1] : void 0) === "ABSEventSettings") {
          this.param = line;
        }
      }
    }

    // * Собирает параметры в базовом представлении < > (как в оригинале)
    _parseABSParamsBase() {
      var j, l, len, param, ref;
      ref = this.list;
      for (j = 0, len = ref.length; j < len; j++) {
        l = ref[j];
        if (l == null) {
          continue;
        }
        param = AA.Utils.Parser.extractABSParameter(l);
        if (param == null) {
          continue;
        }
        if (param[0] === 'ABS') {
          // * Не добавляем ABS, он идёт отдельно
          continue;
        }
        this.parsedParams.push(param);
      }
    }

    // * Собирает все строки с АБС параметрами от <ABS> до </ABS>
    _parseABSParamsSequence() {
      var endElement, i, j, ref, ref1, startIndex;
      this.mainLine = this.list.find(function(l) {
        return l.contains('<ABS');
      });
      endElement = this.list.find(function(l) {
        return l.contains('</ABS>');
      });
      if (endElement == null) {
        return;
      }
      startIndex = this.list.indexOf(this.mainLine);
      if (startIndex < 0) {
        return;
      }
      for (i = j = ref = startIndex + 1, ref1 = this.list.length; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
        if (this.list[i] === endElement) {
          break;
        }
        this.absParameters.push(this.list[i]);
      }
    }

    // * Парсинг всех параметров из строк в структуру (имя: значение)
    _parseParams() {
      var j, len, pair, param, ref;
      if (this.absParameters.length === 0) {
        return;
      }
      ref = this.absParameters;
      for (j = 0, len = ref.length; j < len; j++) {
        param = ref[j];
        pair = AA.Utils.Parser.extractABSParameter(param);
        if (pair == null) {
          continue;
        }
        // * Пропускаем ещё один ABS параметр, если был добавлен
        //TODO: Можно делать проверку при передаче данных на Model
        if (pair[0] === 'ABS') {
          continue;
        } else {
          this.parsedParams.push(pair);
        }
      }
    }

    //TODO: Доработать: исключить группы, правильный конвентор

      //TODO: deadSwitch
    // * Извлекает параметры из команды плагина
    _parsePluginCommand() {
      var k, p, params, v;
      if (this.param == null) {
        return;
      }
      if (!KDCore.isMZ()) {
        return;
      }
      params = this.param.parameters[3];
      if (params == null) {
        return;
      }
      for (k in params) {
        v = params[k];
        if (k.contains("Group")) {
          // * Пропускаем заголовки групп
          continue;
        }
        p = [k, AA.Utils.Parser.convertParameterValue(v)];
        this.parsedParams.push(p);
      }
    }

  };
  AA.link(AAEventSettingsParser);
})();

// ■ END AAEventSettingsParser.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для АБС события игры (НЕ события на карте)

//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAGEvent.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GEvent;
  GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.listeners = [];
    }

    addListener(listener) {
      if (listener != null) {
        return this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

  };
  AA.link(GEvent);
})();

// ■ END AAGEvent.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс хранит информацию и состояния всех ABS объектов на карте

//@[STORABLE]
//@[GLOBAL]
var AAMapEntitiesSet;

AAMapEntitiesSet = class AAMapEntitiesSet {
  constructor(mapId) {
    this.mapId = mapId;
  }

};

// Generated by CoffeeScript 2.5.1
var AAPlayerEntity;

AAPlayerEntity = class AAPlayerEntity extends AAEntity {
  constructor() {
    super();
  }

  // * Номер команды игрока (и группы) всегда 0
  teamId() {
    return 0;
  }

  isPlayer() {
    return true;
  }

  character() {
    return $gamePlayer;
  }

  battler() {
    return $gameParty.leader();
  }

  setTarget(target) {
    super.setTarget(target);
    AA.EV.call("PlayerTarget");
  }

};

// Generated by CoffeeScript 2.5.1
// * Менеджер по работе с целями (поиск целей, определение)
var AATargetsManager;

AATargetsManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AATargetsManager;
  // * Используется для определения цели для Instant NoProjectile Direction навыков
  // * Проверка точки на наличие целей для навыка
  //?[OUTER - used by AABattleActionsManager]
  //? Этот навык используется напрямую для выбора целей в битве
  _.getTargetInPoint = function(subject, aaSkill, point) {
    var events, targets;
    events = this._collectAllAAEntitiesInPoints([point]);
    if (events.isEmpty()) {
      return null;
    }
    // * В зависимости от Subject и в зависимости от действия навыка
    targets = this.filteredTargetsForSubject(subject, aaSkill, events);
    if ((targets != null) && targets.length > 0) {
      return targets[0];
    } else {
      return null;
    }
  };
  // * Отфильтровать цели (из найденных в точках) для Subject (навыка)
  _.filteredTargetsForSubject = function(subject, aaSkill, targets) {
    var candidates, e, entity, k, l, len, len1, t;
    try {
      entity = subject.AAEntity();
      candidates = [];
      if (aaSkill.isForEnemies()) {
        for (k = 0, len = targets.length; k < len; k++) {
          t = targets[k];
          if (entity.isMyEnemy(t.AAEntity())) {
            candidates.push(t);
          }
        }
      }
      if (aaSkill.isForFriends()) {
        for (l = 0, len1 = targets.length; l < len1; l++) {
          t = targets[l];
          if (!entity.isMyEnemy(t.AAEntity())) {
            candidates.push(t);
          }
        }
      }
      return candidates;
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Собрать цели для навыка (Projectile)
  //?[OUTER - used by AABattleActionsManager]
  //? Этот навык используется напрямую для выбора целей в битве
  _.collectTargtesForSkill = function(subject, absSkill, point) {
    var targets;
    targets = [];
    // * Точные цели селектора, если мнгновенный навык (только для игрока)
    if (absSkill.isInstant() && ($gameTemp._aaSkillSelectorTargets != null)) {
      targets = $gameTemp._aaSkillSelectorTargets;
    } else {
      targets = this.collectTargetsForSkillInMapPoint(absSkill, point);
    }
    // * Убираем НЕ АБС события
    targets = targets.filter(function(t) {
      return t.isActive();
    });
    targets = this.filteredTargetsForSubject(subject, absSkill, targets);
    // * Сбрасываем цели селектора
    $gameTemp._aaSkillSelectorTargets = null;
    return targets;
  };
  // * Собирает все возможные цели для навыка в точке карты
  // * (Лучше использовать этот метод для определения целей)
  _.collectTargetsForSkillInMapPoint = function(aaSkill, point) {
    var kdPoint, targets;
    if (aaSkill == null) {
      return [];
    }
    if (point == null) {
      return [];
    }
    targets = [];
    if (point instanceof Game_Character && aaSkill.isSingleTargetArea()) {
      targets = [point];
    } else {
      if (aaSkill.isSingleTargetArea()) {
        targets = $gameMap.eventsXyAAExt(point.x, point.y);
      } else {
        kdPoint = new KDCore.Point(point.x, point.y);
        targets = this.collectTargetsForSkillInScreenPoint(aaSkill, kdPoint.convertToScreen());
      }
    }
    return targets;
  };
  // * Собирает все возможные цели для навыка в точке экрана
  // * (Используется для сбора событий в радиусе)
  _.collectTargetsForSkillInScreenPoint = function(aaSkill, point) {
    var searchMapPoints, targets;
    if (aaSkill == null) {
      return [];
    }
    if (point == null) {
      return [];
    }
    targets = [];
    // * Сформировать квадрат выбора
    searchMapPoints = this._createSquarePoints(aaSkill.radius, point);
    targets = this._collectAllAAEntitiesInPoints(searchMapPoints);
    return targets;
  };
  _.collectTargetsForPlayerSelector = function(aaSkill) {
    var e, targets;
    try {
      targets = this.collectTargetsForSkillInScreenPoint(aaSkill, TouchInput);
      // * Фильтр целей сразу
      return this.filteredTargetsForSubject($gamePlayer, aaSkill, targets);
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Создаём точки карты в квадратной области навыка (пиксели)
  _._createSquarePoints = function(radius, point) {
    var cellSize, cellSize2, ex, ey, i, j, k, l, points, pxRadius, ref, ref1, ref2, ref3, ref4, ref5, sx, sy;
    cellSize = $gameMap.tileWidth();
    cellSize2 = cellSize / 2;
    points = [];
    pxRadius = radius * cellSize / 2;
    sx = point.x - pxRadius;
    sy = point.y - pxRadius;
    ex = point.x + pxRadius;
    ey = point.y + pxRadius;
    for (i = k = ref = sx, ref1 = ex, ref2 = cellSize; ref2 !== 0 && (ref2 > 0 ? k < ref1 : k > ref1); i = k += ref2) {
      for (j = l = ref3 = sy, ref4 = ey, ref5 = cellSize; ref5 !== 0 && (ref5 > 0 ? l < ref4 : l > ref4); j = l += ref5) {
        points.push(new KDCore.Point(i + cellSize2 / 2, j + cellSize2).convertToMap());
      }
    }
    return points;
  };
  // * Собирает все АБС сущности (события + игрок + партия)
  _._collectAllAAEntitiesInPoints = function(points) {
    var aaEntities;
    aaEntities = [];
    aaEntities.push(...this._collectAAEventsInPoints(points));
    aaEntities.push(...this._collectPartyMembersInPoints(points));
    return aaEntities;
  };
  // * Собирает все АБС события (Активные) в точках карты
  _._collectAAEventsInPoints = function(points) {
    var e, events, k, len, p;
    events = [];
    try {
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        events.push(...$gameMap.eventsXyAAExt(p.x, p.y));
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return events;
  };
  _._collectPartyMembersInPoints = function(points) {
    var e, k, len, members, p;
    members = [];
    try {
    //TODO: followers
    // * Сейчас только проверка на игрока
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        if ($gamePlayer.posExt(p.x, p.y)) {
          members.push($gamePlayer);
          break;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return members;
  };
  // * Быстрый метод проверки, находится ли игрок в определённом радиусе
  _.isPlayerInRadius = function(point, radius) {
    var e;
    try {
      return this.isCharExtInRadius(point, radius, $gamePlayer);
    } catch (error) {
      e = error;
      AA.w(e);
      return false;
    }
  };
  // * Получить сущности в радиусе (из набора сущностей)
  _.getFilteredInRadius = function(point, radius, candidates) {
    var c, e, k, len, members;
    members = [];
    try {
      for (k = 0, len = candidates.length; k < len; k++) {
        c = candidates[k];
        if (this.isCharExtInRadius(point, radius, c)) {
          members.push(c);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return members;
  };
  // * Находится ли персонаж (точка) в радиусе (с учётом расширенных HitBox)
  _.isCharExtInRadius = function(point, radius, char) {
    var e, k, len, p, points, x, y;
    try {
      ({x, y} = point);
      points = $gameMap.aaGetExtendedPointsFor(char);
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        if ($gameMap.distance(x, y, p.x, p.y) <= radius) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
  // * Получить дистанцию между персонажем и точкой (на экране)
  // * Учитываются расширенные HitBox
  _.getScreenExtDistance = function(char, offsetY, x2, y2) {
    var dist, e, k, l, len, len1, screenXs, screenYs, x, y;
    try {
      if (char == null) {
        return 1000;
      }
      if (char.aaIsHaveExtendedHitBoxes()) {
        screenXs = char.screenXExt();
        screenYs = char.screenYExt();
        dist = [];
        for (k = 0, len = screenXs.length; k < len; k++) {
          x = screenXs[k];
          for (l = 0, len1 = screenYs.length; l < len1; l++) {
            y = screenYs[l];
            dist.push(AA.Utils.Math.getXYDistance(x, y - offsetY, x2, y2));
          }
        }
        return dist.min();
      } else {
        return AA.Utils.Math.getXYDistance(char.screenX(), char.screenY() - offsetY, x2, y2);
      }
    } catch (error) {
      e = error;
      AA.w(e);
      return 1000;
    }
  };
  // * Цель подходящая (проверки, см. BattleManagerABS.isValidTarget)
  //TODO: isValidTarget
  _.isValidTarget = function(char, targetChar) {
    return true;
  };
  // * Находится ли точка (цель) в области дейтсвия навыка (range)
  _.isInSkillRange = function(char, skillId, targetPoint) {
    var dataObj, dist, e, skill;
    try {
      //TODO: ПОка просто
      dist = char.distTo(targetPoint);
      dataObj = AA.Utils.getAASkillObject(skillId);
      skill = dataObj.AASkill;
      //console.log("D " + dist)
      //console.log("R " + skill.range)
      return dist <= skill.range;
    } catch (error) {
      e = error;
      AA.w(e);
      return false;
    }
  };
  // * Получить всех ботов, которые имеют игрока своей целью
  //TODO: TeamID учёт
  // * На данный момент не проверяется кто именно цель, так как нету сопартийцев и teamId
  _.getAllWhoHavePlayerAsTarget = function() {
    return $gameMap.eventsAA().filter(function(e) {
      return e.AAEntity().isHasTarget();
    });
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Основной класс менеджер интерфейса (API)
AA.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AA.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
    return this._subscribeForEvents();
  };
  _.isValid = function() {
    return this.uiSet != null;
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.onGameMessageStart() : void 0;
  };
  //TODO: Опция, чтобы автоматически закрывать окно выбора навыков, когда появляется сообщение

  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.onGameMessageEnd() : void 0;
  };
  // * Когда было нажатие мышки на какой-либо UI элемент
  _.isUITouched = function() {
    return false;
  };
  // * Вызывается когда сцена карты заканчивается
  _.terminate = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.terminate() : void 0;
  };
  (function() {    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
    };
    _.refreshElement = function(tag) {
      var ref, ref1;
      if ((ref = this.uiSet) != null) {
        ref.refreshElement(tag);
      }
      if ((ref1 = this.uiSet) != null) {
        ref1.refreshController(tag);
      }
    };
    _.hide = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.hide() : void 0;
    };
    _.show = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.show() : void 0;
    };
    // * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
    return _.isAnyUIElementTouchProcess = function() {
      // * Обработка окна выбора навыков
      if (this._isSkillSelectorProcessHandler()) {
        return true;
      } else {
        return false;
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Набор навыков
    // -----------------------------------------------------------------------
    // * Открыть окно выбора навыка для слота (символа)
    _.openSkillSelectorFor = function(symbol) {
      var cntrl, e, item;
      if (!this.isValid()) {
        return;
      }
      try {
        if (symbol == null) {
          return this.closeSkillSelector();
        } else {
          cntrl = this.uiSet.getController("skills");
          item = cntrl._getItemForSymbol(symbol);
          if (item != null) {
            return this.uiSet.fwSkillsSelector.prepareAndOpenForSlot(item);
          }
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Открыто ли окно выбора навыка
    _.isSkillSelectorOpen = function() {
      var e;
      if (!this.isValid()) {
        return;
      }
      try {
        return this.uiSet.fwSkillsSelector.isOpen();
      } catch (error) {
        e = error;
        AA.w(e);
      }
      return false;
    };
    _.closeSkillSelector = function() {
      var e;
      if (!this.isValid()) {
        return;
      }
      try {
        this.uiSet._terminateSkillSelectorWindow();
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
    // * Когда игрок нажал на кнопку какого-либо навыка на панели навыков
    _.skillPerformResult = function(skillId, result) {
      var cntrl, e;
      try {
        if (!this.isValid()) {
          return;
        }
        cntrl = this.uiSet.getController("skills");
        return cntrl != null ? cntrl.onSkillPerformResult(skillId, result) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Если открыто окно выбора навыка для слота, то оно закрывается сперва
    // * Если правой кнопкой по навыку, то открывается окно
    return _._isSkillSelectorProcessHandler = function() {
      var e, ref;
      if (!this.isValid()) {
        return false;
      }
      try {
        return (ref = this.uiSet.getController("skills")) != null ? ref.handleSkillSelectorProcess() : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    //TODO: Удалить этот код? (УЖЕ НЕ ИСПОЛЬЗУЕТСЯ)
    // * Цель игрока
    // -----------------------------------------------------------------------
    // * Круг под выбранной целью (установить спрайт круга)
    _.setSelectedCircle = function(selectedCircle) {
      this.selectedCircle = selectedCircle;
    };
    // * Выбрать цель на карте
    _.selectTargetOnMap = function(char) {
      var ref;
      return (ref = this.selectedCircle) != null ? ref.setTarget(char) : void 0;
    };
    // * Сбросить выбор цели на карте
    _.resetTargetSelection = function() {
      return _.selectTargetOnMap(null);
    };
    //TODO: Либо проверять спрайт либо есть ли цель у игрока (TargetManager)
    return _.isSelectedCircleVisible = function() {
      var ref;
      return ((ref = this.selectedCircle) != null ? ref.visible : void 0) === true;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Выбор зоны применения навыка на карте
    // -----------------------------------------------------------------------
    // * Установить спрайт зоны поражаения навыка
    _.setSkillImpactSelector = function(skillSelector) {
      this.skillSelector = skillSelector;
    };
    // * Активировать зону поражения (показать спрайт)
    _.activateSkillImpactSelector = function(aaSkill) {
      var ref;
      return (ref = this.skillSelector) != null ? ref.activate(aaSkill) : void 0;
    };
    return _.resetSkillImpactSelector = function() {
      var ref;
      return (ref = this.skillSelector) != null ? ref.deactivate() : void 0;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Обработка АБС событий
    // -----------------------------------------------------------------------
    _._subscribeForEvents = function() {
      AA.EV.subscribeFor("PlayerTarget", this.gev_onPlayerTargetChanged);
      //AA.EV.subscribeFor("PlayerChangeState", @gev_onPlayerStateChanged)
      return AA.EV.subscribeFor("PlayerSkillSelector", this.gev_onPlayerSkillSelector);
    };
    // * Когда цель игрока была изменена
    _.gev_onPlayerTargetChanged = function() {
      "PLAYER TARGET CHANGED".p();
      return AA.UI.selectTargetOnMap($gamePlayer.AATarget());
    };
    // * Когда статус (поведения, действия) игрока меняется
    _.gev_onPlayerStateChanged = function() {};
    _.gev_onPlayerSkillSelector = function() {
      if ($gamePlayer.isInSkillTargetingState()) {
        return AA.UI.activateSkillImpactSelector($gamePlayer.activeAASkill());
      } else {
        return AA.UI.resetSkillImpactSelector();
      }
    };
  })();
})();

// ■ END AA.UI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Менеджер по работе с визорами АИ
var AAVisionManager;

AAVisionManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAVisionManager;
  // * Проверка видимости между визором (событием) и точкой (TRUE - видно точку)
  _.isVisionLineIsFree = function(visor, endPoint) {
    var allPoints, betweenPoints, dist, e, eP, j, l, len, len1, p, sP;
    try {
      dist = $gameMap.distance(visor.x, visor.y, endPoint.x, endPoint.y);
      if (dist <= 1) {
        // * Если дистанция 1 (рядом), то значит на линии видимости не может быть помех
        return true;
      }
      // * Количество точек проверок на линии
      // * Хватит точности 1 к 1, поэтому количество точек = дистанции
      allPoints = this.getLineBetweenTwoPoints(visor, endPoint, dist);
      betweenPoints = [];
      // * Убираем End и Start точки с результата
      // * Нам важно проверить путь между начальной и конечной точкой
      sP = [visor.x, visor.y];
      eP = [endPoint.x, endPoint.y];
      for (j = 0, len = allPoints.length; j < len; j++) {
        p = allPoints[j];
        if (!AA.Utils.isSamePointA(p, sP) && !AA.Utils.isSamePointA(p, eP)) {
          betweenPoints.push(p);
        }
      }
      if (betweenPoints.length === 0) {
        
        // * Если между нет точек, то значит на линии видимости
        return true;
      }
      console.log(betweenPoints);
      for (l = 0, len1 = betweenPoints.length; l < len1; l++) {
        p = betweenPoints[l];
        // * Если в точке находится объект (зона), что мешает зрению, значит false
        if (this.isPointIsColiderForVision(visor, p[0], p[1])) {
          return false;
        }
      }
      return true;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
  // * Возвращает линию из точек между начальной и конечной точкой (включая начальную и конечную)
  _.getLineBetweenTwoPoints = function(startPoint, endPoint, precission) {
    var cpx, cpy, e, eX, eY, i, j, k, points, px, py, ref, sX, sY, tw;
    try {
      tw = $gameMap.tileWidth();
      sX = Number(startPoint.x * tw + tw / 2);
      sY = Number(startPoint.y * tw + tw / 2);
      eX = Number(endPoint.x * tw + tw / 2);
      eY = Number(endPoint.y * tw + tw / 2);
      points = [];
      for (i = j = 1, ref = precission; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        k = i / precission;
        px = k * (eX - sX) + sX;
        py = k * (eY - sY) + sY;
        cpx = Math.floor(px / $gameMap.tileWidth());
        cpy = Math.floor(py / $gameMap.tileHeight());
        points.push([cpx, cpy]);
      }
      return points;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return [];
  };
  // * Находится ли в данной точке карты что-либо, что мешает видимости
  // * TRUE - нельзя "видеть" через эту точку
  _.isPointIsColiderForVision = function(visor, x, y) {
    var e, events, noVisionRegions, noVisionTerrains;
    try {
      noVisionRegions = AA.PP.getVisionRestrictedRegions();
      noVisionTerrains = AA.PP.getVisionRestrictedTerrains();
      if (noVisionRegions.contains($gameMap.regionId(x, y))) {
        return true;
      }
      if (noVisionTerrains.contains($gameMap.terrainTag(x, y))) {
        return true;
      }
      // * События с расширенными HitBox участвуют в области видимости
      events = $gameMap.eventsXyExt(x, y);
      if (events.isEmpty()) {
        return false;
      }
      // * Если хоть один блокирует, то значит заблокирована видимость
      return events.some(function(e) {
        return e.aaIsBlockVision();
      });
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return true;
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Состояние АИ
var AIFlow;

AIFlow = class AIFlow extends AIFlowMachine {
  constructor() {
    super(...arguments);
    // * Состояние в режиме ожидания
    this.paused = false;
    this.translatedFrom = -1;
    return;
  }

  update() {
    super.update();
    return this._updateFlow();
  }

  prepare(inputData) { // * EMPTY
    this.inputData = inputData;
  }

  onStateStart() {} // * EMPTY

  onStateEnd() {} // * EMPTY

  
    // * При "переходе" в это состояние
  // * Поддерживает инициацию, если не было паузы
  // * Запоминает номер состояния после которого был запущен
  onStateResume(translatedFrom) { // * EMPTY
    this.translatedFrom = translatedFrom;
  }

  
    // * При "переходе" в другое состояние
  onStatePause() {} // * EMPTY

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AIFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AIFlow.prototype;
  _._updateFlow = function() {};
})();

// ■ END AIFlow.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var BuffIconsController;
  // * Общий контроллер для отрисовки бафов персонажа (игрока)
  //?rev 17.10.20
  BuffIconsController = class BuffIconsController extends AA.UIElementController {
    // * buffSprites - Sprite_ActorStateIcon (массив)
    constructor(buffSprites) {
      super();
      this.buffSprites = buffSprites;
      this.maxCount = Math.min(this.buffSprites.length, 8);
    }

    //TODO: Теперь значения в секундах храняться, учесть это!
    //TODO: refresh метод надо вызывать ВРУЧНУЮ когда добавляется или удаляется бафф

      // * Собирает индексы существующих баффов
    collectBuffs() {
      var buffs, i, j;
      buffs = [];
      for (i = j = 0; j < 8; i = ++j) {
        if (this.source._buffs[i] > 0) {
          buffs.push(i);
        }
      }
      return buffs;
    }

    // * Получает количество ходов (секунд) баффа
    collectBuffTurn(buffIndex) {
      return this.source._buffTurns[buffIndex];
    }

  };
  AA.link(BuffIconsController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.BuffIconsController.prototype;
  //$[OVER]
  _._setupThread = function() {
    return this.createThread(30, 4);
  };
  //$[OVER]
  _._refresh = function() {
    var buffs, i, icon, icons, j, ref, ref1, turns;
    buffs = this.collectBuffs();
    icons = this.source.buffIcons();
    for (i = j = 0, ref = this.maxCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      icon = icons[i];
      turns = this.collectBuffTurn(buffs[i]);
      if ((ref1 = this.buffSprites[i]) != null) {
        ref1.draw(icon, turns);
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Состояние (машина) для врага в битве
var EnemyAI_BattleFlow;

EnemyAI_BattleFlow = class EnemyAI_BattleFlow extends AIFlow {
  constructor() {
    super(...arguments);
    return;
  }

  target() {
    return this.entity().getTarget();
  }

  onStateStart() {
    "IN BATTLE STATE".p();
    // * Таймер следующей выборки действия
    // * Когда действие было выбранно, идёт небольшая пауза
    // * перед следующей выборкой действия
    this._nextActionCheck = 0;
    // *
    this._canFightNow = true;
    // * Бот отступает из боя
    return this._fleeFromBattle = false;
  }

  //TODO: change move type
  //TEMP: остановлю ботика
  //@char()._moveType = 0
  //@char().aaSetMoveTypeKeepBattleDistance()
  //TODO: filter skills
  onStateEnd() {
    //on char сделать метод основной
    this.entity().resetBattle();
    //TODO: clear target and other stuff (onBattleEnd for battle etc)
    return "BATTLE END".p();
  }

};

(function() {  // * onStateEnd нету, так как Free состояние базовое

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_BattleFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_BattleFlow.prototype;
  _._setup = function() {};
  
  //TODO: ЕСТЬ БАГ, если убить одного врага, другие не хотят сражаться, остаюстя в keep
  _._updateFlow = function() {
    if (this._canFightNow === true) {
      this._updateOutOfHomeFlow();
      return this._updateBattleFlow();
    } else {
      return this._updateFleeFlow();
    }
  };
  // * Если отошёл слишком далеко от "дома", надо вернуться
  _._updateOutOfHomeFlow = function() {
    if (this._isTooFarFromHomePoint()) {
      return this._canFightNow = false;
    }
  };
  _._isTooFarFromHomePoint = function() {
    var homePoint;
    homePoint = this.char().homePoint;
    if (homePoint == null) {
      return false;
    }
    return this.char().distTo(homePoint) > (this.model().returnRadius);
  };
  _._updateBattleFlow = function() {
    if (this._isTargetValid()) {
      this._selectActionToUse();
      if (this._isActionIsExists()) {
        if (this._isActionInDistance()) {
          return this._executeAction();
        } else {
          return this._movingCloserToTarget();
        }
      } else {
        return this._waitForAction();
      }
    } else {
      return this.logic().switchToFreeState();
    }
  };
  _._isTargetValid = function() {
    return this._isTargetInViewRadius() && AATargetsManager.isValidTarget(this.char(), this.target());
  };
  //TODO: Сделать параметр SeekTime - когда цель вне видимости, какой-то время (в сек) всё равно преследовать
  // * или следовать в точку где последний раз видел
  // * Можно отдельное состояние (поиск по маршруту или случайно)
  // * Объеденить с системой слышымости (по сути это и есть - движение к источнику звука и патруль)
  _._isTargetInViewRadius = function() {
    return this.char().distTo(this.target()) <= (this.model().viewRadius + 1);
  };
  _._selectActionToUse = function() {
    var skills;
    this._nextActionCheck--;
    if (this._nextActionCheck > 0) {
      return;
    }
    //TODO: алгоритм выбора действия для использования сейчас
    skills = this.battler().getUsableAASkills();
    if (skills.length > 0) {
      if (skills.length === 1) {
        this._setCurrentAction(skills[0]);
      } else {
        this._selectBetterActionForNow(skills);
      }
    } else {
      this._resetCurrentAction();
    }
  };
  _._setCurrentAction = function(_currentAction) {
    this._currentAction = _currentAction;
    //TODO: Надо это или нет?
    return this._nextActionCheck = 20;
  };
  _._selectBetterActionForNow = function(skills) {
    //TODO: Все навыки применить testApply и выбрать лучший + тот который
    // можно использовать без подхода к цели
    //TODO: пока просто первый возвращаем
    this._setCurrentAction(skills.first());
  };
  _._resetCurrentAction = function() {
    this._currentAction = null;
    this._nextActionCheck = 0;
  };
  _._isActionIsExists = function() {
    return this._currentAction != null;
  };
  // * Находится ли цель на расстроянии применения действия
  _._isActionInDistance = function() {
    var aaSkill;
    aaSkill = this._currentAction.AASkill;
    if (aaSkill.isSelfAction()) {
      // * Если для врагов, то проверим, что враг в области radius действия навыка
      if (aaSkill.isForEnemies()) {
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.radius, this.target());
      } else {
        return true;
      }
    } else {
      // * range <= 1 тут используется, чтобы монстр мог ударить диагонально, но не больше 1 клетки
      if (aaSkill.isInPoint() || aaSkill.range <= 1) {
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.range, this.target());
      } else {
        // * Пока просто проверка расстояния
        //range = aaSkill.range
        //TODO: * Цель должна быть передо мной (на прямом направлении)
        // (см. inDirectionHard в Alpha ABS)
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.range, this.target());
      }
    }
  };
  _._executeAction = function() {
    var char, e;
    try {
      //TODO: Custom Attack Move Route
      "EXECUTE".p();
      //TODO: EXECUTE ACITON !!!
      // * Дополнительная проверка ещё раз перед выполнением действия
      // * Это нужно, потому что АИ выбирает очередное действие после выбора через время
      // * см. @_nextActionCheck
      if (!this.battler().canUse(this._currentAction)) {
        return this._resetCurrentAction();
      } else {
        "EEXECUTGE".p();
        char = this.char();
        char.setActiveAASkill(this._currentAction.idA);
        return char.startPerformAASkill($gamePlayer);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._movingCloserToTarget = function() {
    "APPROACH".p();
    return this.char().aaSetMoveTypeApproachTarget();
  };
  _._waitForAction = function() {
    "KEEP ".p();
    this.char().aaSetMoveTypeKeepBattleDistance();
  };
  // * Враг возвращается (отступает) к точке дом
  // * Пока не увидит дом (в View Radius)
  // * В отличии от Free State, точка дома не меняется, поэтому враг получается
  // * всегда будет держаться своего "дома" и сражаться в определённом радиусе
  //TODO: Custom Move Route?
  // * Задать параметр, чтобы АИ выполнял в бою customMoveRoute если нет навыков
  _._updateFleeFlow = function() {
    "FLEE".p();
    if (this.char().distTo(this.char().homePoint) <= (this.model().viewRadius - 1)) {
      this._canFightNow = true;
    } else {
      this.char().aaSetMoveTypeReturnToHomePoint();
    }
  };
})();

// ■ END EnemyAI_BattleFlow.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Машина состояний для АИ врагов на карте
var EnemyAI_FlowMachine;

EnemyAI_FlowMachine = class EnemyAI_FlowMachine extends AIFlowMachine {
  constructor() {
    super(...arguments);
    this.registerFlowForState(0, new EnemyAI_FreeFlow(this.id));
    this.registerFlowForState(1, new EnemyAI_BattleFlow(this.id));
    // * Начальное состояние - свободное
    this.switchToFreeState();
    return;
  }

  switchToFreeState() {
    return this.setState(0);
  }

  switchToBattleState() {
    return this.setState(1);
  }

  isFreeState() {
    return this.state === 0;
  }

  isBattleState() {
    return this.state === 1;
  }

};

(function() {  //TODO: search, return???
  //TODO: move

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_FlowMachine.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_FlowMachine.prototype;
})();

// ■ END EnemyAI_FlowMachine.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Свободное состояние для АИ враг
var EnemyAI_FreeFlow;

EnemyAI_FreeFlow = class EnemyAI_FreeFlow extends AIFlow {
  constructor() {
    super(...arguments);
    return;
  }

  onStateStart() {
    "IN FREE STATE".p();
    this._restoreMoveData();
    this._isTargetInViewRadius = false;
  }

  onStateEnd() {
    "FREE END".p();
    this._storeHomePoint();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_FreeFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_FreeFlow.prototype;
  _._setup = function() {
    this._checkVisionTimer = 0;
    this._checkTargetInRangeTimer = 0;
  };
  _._updateFlow = function() {
    this._updateReturnToHome();
    //TODO: Временно отключим Visor для врагов, у которых нет АБС навыков вообще
    if (!this.battler().isHaveAnyAASkill()) {
      return;
    }
    return this._updateVision();
  };
  _._updateReturnToHome = function() {
    var char, e, homePoint;
    char = this.char();
    if (char == null) {
      return;
    }
    homePoint = char.homePoint;
    if (homePoint == null) {
      return;
    }
    try {
      if (char.aaIsNearThePoint(homePoint, 1)) {
        char.aaResetHomePoint(); // * Сброс точки "дома"
        this._restoreMoveData(); // * Выход из режима движения
      } else {
        char.aaSetMoveTypeReturnToHomePoint();
      }
    } catch (error) {
      e = error;
      this._restoreMoveData();
      AA.w(e);
    }
  };
  // * Используется двойная проверка. Сперва простая проверка, что цель в радиусе видимости
  // * Уже затем, если цель в радиусе, проверяется линия видимости
  //TODO: Целей может быть несколько, надо проверять линию на каждую и находить оптимальную (видимую)
  _._updateVision = function() {
    // * Если цель в радиусе видимости
    if (this._isTargetInViewRadius === true) {
      // * То проверяем чтобы цель была в линии видиомости (нет препятствий)
      this._updateVisionLine();
    }
    // * В любом случае, проверяем снова, что цель в радиусе видимости
    return this._updateVisionRadius();
  };
  _._updateVisionRadius = function() {
    this._checkVisionTimer++;
    if (this._checkVisionTimer >= 4) {
      this._checkVisionTimer = 0;
      //TODO: Сейчас идёт проверка только на игрока
      //TODO: Добавить фильтр isActive (например когда игрок в технике)
      this._isTargetInViewRadius = AATargetsManager.isPlayerInRadius(this.char(), this.model().viewRadius);
      if (this._isTargetInViewRadius === true) {
        "PL IN RADIUS".p();
      }
    }
  };
  _._updateVisionLine = function() {
    if (this._isTargetInViewRadius === false) {
      return;
    }
    this._checkTargetInRangeTimer++;
    if (this._checkTargetInRangeTimer >= 2) {
      this._checkTargetInRangeTimer = 0;
      if (AAVisionManager.isVisionLineIsFree(this.char(), $gamePlayer)) {
        //TODO: Тут надо фильтры применять, чтобы проверять только врагов, а не всех подряд
        this._onSeeTarget($gamePlayer);
      }
    }
  };
  _._onSeeTarget = function(target) {
    this.entity().setTarget(target);
    "SEE TARGET IN LINE".p();
    //TODO: if enemy have actions, then switch to battle state
    if (this.battler().isHaveAnyAASkill()) {
      this.logic().switchToBattleState();
    } else {

    }
  };
  
  // * Восстановить настройки движения, если они были сохраненны
  //TODO: if can't fight?
  //TODO: escapeFromBattle like (Типо отходить от игрока)
  // * Тоже самое поведение, что и если не может драться (noFight)
  //TODO: noFight - такого параметра не будет, хотите чтобы не дрался, не давайте действий
  _._restoreMoveData = function() {
    var e, ref;
    try {
      "RESTORE MOVE DATA".p();
      if ((ref = this.char()) != null) {
        ref.aaRestoreMoveData();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Сохранить позицию перед выходом из состояния
  _._storeHomePoint = function() {
    var ref;
    if ((ref = this.char()) != null) {
      ref.aaStoreHomePoint();
    }
  };
})();

// ■ END EnemyAI_FreeFlow.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var FWindow_SkillSelect;

FWindow_SkillSelect = class FWindow_SkillSelect extends AA.FloatingWindow {
  constructor() {
    super(...arguments);
  }

  getSettings() {} // TODO: implement

  
    // * Сдвинуть позицию окна с учётом позиции элемента Skills Panel
  moveRelativeSlotPosition(x, y) {
    var h2, sector, w2;
    // Screen sectors
    // 1 | 2
    // 3 | 4
    // ==============
    sector = 1;
    w2 = Graphics.width / 2;
    h2 = Graphics.height / 2;
    
    // * Определяем сектор экрана, на котромнаходится элемент
    if (x < w2) {
      if (y < h2) {
        sector = 1;
      } else {
        sector = 3;
      }
    } else {
      if (y < h2) {
        sector = 2;
      } else {
        sector = 4;
      }
    }
    
    // * Настраиваем позиции в зависимости от секторов
    if (sector === 3 || sector === 1) {
      this.x = x;
    }
    if (sector === 2 || sector === 4) {
      this.x = x - this.width + 32; //TODO: margins from settings
    }
    if (sector >= 3) {
      this.y = y - this.height;
    } else {
      this.y = y + 32 + 2;
    }
  }

  
    // * Подготовить окно и октрыть для элемента Skills Panel
  // * slotItem = Sprite_SKillPanelItem
  prepareAndOpenForSlot(slotItem) {
    var symbol, x, y;
    ({x, y, symbol} = slotItem);
    this.moveRelativeSlotPosition(x, y);
    // * Тут всегда категория 0 по умолчанию
    this.refreshSkillList(0, symbol);
    this.open();
  }

  // * Создание списка навыков для группы
  // * Этот метод вызывается когда окно открывается для слота
  refreshSkillList(category, symbol) {
    if (this.skillsList == null) {
      return;
    }
    // * Запоминаем символ, чтобы установить навык при выборе
    this.skillsList.setSymbol(symbol);
    // * При смене категории список формируется (т.е. refresh)
    this.changeCategory(0);
  }

  changeCategory(category) {
    var e;
    try {
      this._refreshCategoryButtons(category);
      this._refreshHeader(category);
      return this.skillsList.setCategory(category);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  // * Данное окно (выбор навыков и вещей) нельзя двигать
  //$[OVER]
  //isDraggable: -> false
  //TODO: или можно?
  update() {
    super.update();
    return this._updateSkillSelectClick();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FWindow_SkillSelect.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = FWindow_SkillSelect.prototype;
  //$[OVER]
  _._createCustomElements = function() {
    this._createCategoriesButtons();
    this._createCategoriesHeader();
    this._refreshCategoryButtons(0);
    this._createSkillsList();
  };
  _._createCategoriesButtons = function() {
    //TODO: from settings
    this.buttonCat0 = new KDCore.ButtonM("Button_SkSSkillsGroup", true, "Alpha");
    this.buttonCat0.addClickHandler(() => {
      return this.changeCategory(0);
    });
    this.buttonCat0.move(26, 6);
    this.addContent(this.buttonCat0);
    this.buttonCat1 = new KDCore.ButtonM("Button_SkSItemsGroup", true, "Alpha");
    this.buttonCat1.addClickHandler(() => {
      return this.changeCategory(1);
    });
    this.buttonCat1.move(this.buttonCat0.x + 60, this.buttonCat0.y);
    this.addContent(this.buttonCat1);
  };
  _._createCategoriesHeader = function() {
    var p;
    //TODO: from parameters
    p = {
      visible: true,
      size: {
        w: 160,
        h: 28
      },
      alignment: "center",
      font: {
        face: "AABS_0",
        size: 14,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#FFFFFF".toCss()
    };
    this.headerText = new AA.Sprite_UIText(p);
    // * Добавляем на Header (поверх всего)
    this.addChild(this.headerText);
  };
  _._createSkillsList = function() {
    //TODO: from settings
    this.skillsList = new Window_SkillSelectorList(new Rectangle(0, 50, this.width, this.height - 80));
    return this.addContent(this.skillsList);
  };
  _._updateSkillSelectClick = function() {
    var ref;
    if (!this.isOpen()) {
      return;
    }
    if (TouchInput.isTriggered() && this.isMouseIn()) {
      if ((ref = this.skillsList) != null) {
        ref.onClick();
      }
    }
  };
  _._refreshCategoryButtons = function(newCategory) {
    this.buttonCat0.disable();
    this.buttonCat1.disable();
    if (newCategory === 0) {
      this.buttonCat1.enable();
    } else {
      this.buttonCat0.enable();
    }
  };
  _._refreshHeader = function(category) {
    if (category === 0) {
      this.headerText.draw("SKILLS");
    } else {
      this.headerText.draw("ITEMS");
    }
  };
})();

// ■ END FWindow_SkillSelect.coffee
//---------------------------------------------------------------------------

// Когда в фокусе (мышка в зоне окна) - прокрутка колесом мышки

// Элемент - (Кнопка на которой (иконка + текст))
// Сделать через Window_Selectable ??? - урезанный, контроль только через это окно и мышку

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._lastAASkill = null;
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  // * Запоминаем АБС навык, который был использован
  _.setUsedAASkill = function(aaSkill) {
    return this._lastAASkill = aaSkill.idA;
  };
  _.getUsedAASkill = function() {
    if (this._lastAASkill != null) {
      return AA.Utils.unpackAASkill(this._lastAASkill);
    } else {
      return null;
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__learnSkill, ALIAS__performDamage, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__performDamage = _.performDamage;
  _.performDamage = function() {
    if (AA.isABSMap()) {
      if (this.isPlayer() && AA.PP.isShakeScreenWhenPlayerGetDamage()) {
        // * Стандартный метод (тряска экрана и звук)
        return ALIAS__performDamage.call(this);
      } else {
        // * Если не игрок, то нет тряски и звука
        return Game_Battler.prototype.performDamage.call(this);
      }
    } else {
      return ALIAS__performDamage.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__learnSkill = _.learnSkill;
  _.learnSkill = function(skillId) {
    var shouldAddNewSkillToPanel;
    // * Сперва флаг - что не надо добавлять
    shouldAddNewSkillToPanel = false;
    if (!this.isLearnedSkill(skillId) && AA.PP.isAddNewSkillsOnPanelOnLearning()) {
      shouldAddNewSkillToPanel = true;
    }
    ALIAS__learnSkill.call(this, skillId);
    // * Добавляем после, чтобы навык уже был у игрока
    // * Дополнительно проверяем, выучен ли он и надо ли его добавлять
    if (this.isLearnedSkill(skillId) && shouldAddNewSkillToPanel === true) {
      //#TODO: Учитывать членов группы, но пока только игрок
      // * Чтобы добавить на панель члена партии, надо ActorID менять у SkillSet
      // * И потом опять его возвращать
      if (this.isPlayer() && AA.Utils.isAAObject(skillId)) {
        uAPI.setSkillToPanel(skillId);
      }
    }
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
  //$[OVER]
  _.isPlayer = function() {
    return this === $gameParty.leader();
  };
  //$[OVER]
  _.getAASkills = function() {
    var attackSkillId, list;
    // * Включает атаку и защиту (базовые 1 и 2)
    //TODO: навык защиты надо тоже под АБС автоматически дорабатывать при загрузке
    attackSkillId = this.attackSkillId();
    list = this.skills().concat([$dataSkills[attackSkillId]]);
    // * Включает АБС предметы (так как они по сути тоже навыки)
    // * Используется метод $gameParty.items() для быстродействия, чтобы 2 раза не проверять
    list = list.concat($gameParty.items());
    return list.filter(function(skill) {
      return skill.AASkill != null;
    });
  };
  //$[OVER]
  _.getAAItems = function() {
    return $gameParty.items().filter(function(item) {
      return AA.Utils.isAAObject(item);
    });
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  // * Все ABS навыки персонажа
  // У Actor и Enemy разные источники, поэтому метод тут не имеет тела
  _.getAASkills = function() {
    return [];
  };
  // * Все ABS предметы персонажа
  _.getAAItems = function() {
    return [];
  };
  // * ABS навыки, которые можно использовать в данный момент (включая предметы)
  _.getUsableAASkills = function() {
    return this.getAASkills().filter((skill) => {
      return this.canUse(skill);
    });
  };
  // * Когда совершили какое-либо АБС действие (навык)
  // * Не используется стандартный onAllActionsEnd, так как он очищает result
  _.onAAActionEnd = function() {
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------
//TODO: attackSkillId - метод у МЗ лучше, чем у МВ (там капец)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canUse, ALIAS__initMembers, ALIAS__isAppeared, ALIAS__isOccasionOk, ALIAS__paySkillCost, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Этот метод используется в методе canMove, поэтому дополняем его
  // * В АБС бою, монстр всегда Appeared (видимый)
  //@[ALIAS]
  ALIAS__isAppeared = _.isAppeared;
  _.isAppeared = function() {
    if (AA.isABSMap()) {
      return true;
    } else {
      return ALIAS__isAppeared.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.initAASkills();
  };
  //@[ALIAS]
  ALIAS__canUse = _.canUse;
  _.canUse = function(item) {
    if (AA.isABSMap() && (item.AASkill != null)) {
      return this.canUseABSItem(item);
    } else {
      return ALIAS__canUse.call(this, item);
    }
  };
  //@[ALIAS]
  ALIAS__paySkillCost = _.paySkillCost;
  _.paySkillCost = function(skill) {
    ALIAS__paySkillCost.call(this, skill);
    if (AA.isABSMap() && (skill.AASkill != null)) {
      this.aaSetSkillTimer(skill);
    }
  };
  // * АБС навыки не учитывают область действия, так как их можно использовать только на карте
  //@[ALIAS]
  ALIAS__isOccasionOk = _.isOccasionOk;
  _.isOccasionOk = function(item) {
    if (AA.isABSMap() && (item.AASkill != null)) {
      return true;
    } else {
      return ALIAS__isOccasionOk.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------
// * Есть стандартный у МЗ (если у МВ нету, то будет этот метод)
//@[ALIAS]
/*ALIAS__attackSkillId = _.attackSkillId
_.attackSkillId = ->
 * * У оружия может быть свой АБС навык на атакую этим оружием
    if AA.isMap()
        if !@hasNoWeapons() and @weapons()[0]?
            weapon = @weapons()[0]
            if weapon.meta.aaAttackSkillId?
                skillId = parseInt(weapon.meta.aaAttackSkillId)
                return skillId if AA.Utils.isAAObject(skillId)
    return ALIAS__attackSkillId.call(@) */

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  _.isPlayer = function() {
    return false;
  };
  _.aaUpdateABS = function() {
    // * Обновление таймеров навыков
    return this.aaSkillsTimers.update();
  };
  // * Расчёт значения по формуле для текущего бойца
  // * Выполняется внутри Battler, чтобы можно было получить
  // * знаения базовых параметров
  _.aaCalculateFormula = function(formula) {
    var e;
    try {
      return eval(formula);
    } catch (error) {
      e = error;
      AA.w(e);
      return 0;
    }
  };
  _.initAASkills = function() {
    this.aaSkillsTimers = new AASkillsTimers();
  };
  // * Запустить таймер перезарядки для навыка
  _.aaSetSkillTimer = function(skill) {
    var time;
    time = skill.AASkill.getReloadTime(this);
    if (time > 0) {
      this.aaSkillsTimers.startTimerForSkill(skill.idA, time);
    }
  };
  // * Если у навыка есть таймер, значит он не готов (не важно сколько осталось времени)
  _.aaIsSkillReadyInTime = function(skill) {
    return !this.aaSkillsTimers.isSkillHaveTimer(skill.idA);
  };
  // * Получить таймер навыка (используется для панели навыков в основном)
  _.aaGetRemainTimeForSkill = function(skillId) {
    // * Если таймер меньше секунды, то будет возращён 0 (чтобы не начинать визуальный отсчёт)
    if (this.aaSkillsTimers.isSkillHaveTimerToShow(skillId)) {
      return this.aaSkillsTimers.getRemainTimeForSkill(skillId);
    } else {
      return 0;
    }
  };
  _.canUseABSItem = function(item) {
    if (item == null) {
      return false;
    }
    if (!AA.isABSActive()) {
      return false;
    }
    if (!this.canMove()) {
      return false;
    }
    if (!AA.Utils.isAAObject(item)) {
      return false;
    }
    if (DataManager.isSkill(item)) {
      return this.meetsABSSkillContitions(item);
    } else if (DataManager.isItem(item)) {
      return this.meetsABSItemContitions(item);
    } else {
      return false;
    }
  };
  _.meetsABSSkillContitions = function(skill) {
    return this.aaIsSkillReadyInTime(skill) && this.meetsSkillConditions(skill);
  };
  // * Вещи не имеют таймеров
  _.meetsABSItemContitions = function(item) {
    return this.meetsItemConditions(item);
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__searchLimit, _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  //@[ALIAS]
  ALIAS__searchLimit = _.searchLimit;
  _.searchLimit = function() {
    if (this.isABS()) {
      return 24;
    } else {
      return ALIAS__searchLimit.call(this);
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Методы ABS (Цель)
    // -----------------------------------------------------------------------
    _.AATarget = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.getTarget() : void 0;
    };
    //TODO: Это можно удалить

    // * Попытка установить активную цель
    _.aaTrySetTarget = function(target) {
      var ref;
      if (this.aaIsValidTargetToSet(target)) {
        if ((ref = this.AAEntity()) != null) {
          ref.setTarget(target);
        }
        return true;
      }
      return false;
    };
    
    // * Этот метод лучше переопределять у Game_Event и Game_Player
    _.aaIsValidTargetToSet = function(target) {
      return false;
    };
    // * Есть ли активная цель?
    return _.aaIsHaveTarget = function() {
      return this.AATarget() != null;
    };
  })();
  (function() {})();  
    // * Методы ABS (Навыки)
  // -----------------------------------------------------------------------
  (function() {    // * Методы ABS (Движение)
    // -----------------------------------------------------------------------
    return _.aaTurnTowardTouchInput = function() {
      return this.turnTowardCharacter(TouchInput.toMapPoint());
    };
  })();
  (function() {    
    // -----------------------------------------------------------------------

    // * Методы ABS (Бой и состояния)
    // -----------------------------------------------------------------------
    // * Когда какое-либо действие было выполненно на мне
    _.aaOnActionOnMe = function(action) {};
    // * Когда персонаж повержен
    // * Отличается от aaOnDeath так как тут надо давать бонусы победившему
    _.aaOnDefeat = function() {};
    // * Когда надо сменить состояние персонажа на Dead (вывести из АБС системы)
    return _.aaOnDeath = function() {};
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  _.setActiveAASkill = function(_activeAASkillId) {
    this._activeAASkillId = _activeAASkillId;
  };
  //TODO: А если предмет???
  _.activeAASkill = function() {
    if (this._activeAASkillId > 0) {
      return AA.Utils.getAASkillObject(this._activeAASkillId).AASkill;
    } else {
      return null;
    }
  };
  _.startPerformAASkill = function(point) {
    var skill;
    skill = this.activeAASkill();
    if (skill.isInPoint()) {
      this.turnTowardCharacter(point);
    }
    //TODO: Тут можно ещё дополнительную проверку canUse
    // так как пока шёл выборо цели (например) мана могла закончиться
    this.aaPlayAASkillXAnimation(skill);
    // * Персонаж "платит" за навык как только использует его
    this.AABattler().useItem(skill.dbItem());
    // * Стоит ограничение задержки для безопасности
    if (skill.actionStartDelay > 0 && skill.actionStartDelay <= 60) {
      this.setupDelayedAASkill(skill, point);
    } else {
      AABattleActionsManager.startAASkill(skill, this, point);
    }
  };
  _.aaPlayAASkillXAnimation = function(skill) {
    var e;
    try {
      if (!Imported.PKD_AnimaX) {
        return;
      }
      if (!this.isAnimX()) {
        return;
      }
      if (String.any(skill.animaXAction)) {
        // * Special
        return this.startAnimaXCustomAction(skill.animaXAction, false, true); // * Default one
      } else {
        return this.startAnimaXCustomAction("Skill", false, true);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.setupDelayedAASkill = function(skill, point) {
    this.aaDelayedSkillActions.push([skill.actionStartDelay, skill.idA, AA.Utils.packAAPoint(point)]);
  };
  _._aaUpdateDelayedSkillActions = function() {
    var action, i, len, point, ref, skill;
    ref = this.aaDelayedSkillActions;
    //TODO: Навык с задержкой должен иметь задержку перед использованием иначе ошибка, если спамить навык
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (action == null) {
        continue;
      }
      if (action[0]-- <= 0) {
        skill = AA.Utils.unpackAASkill(action[1]);
        point = AA.Utils.unpackAAPoint(action[2]);
        AABattleActionsManager.startAASkill(skill, this, point);
        this.aaDelayedSkillActions.delete(action);
      }
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createNewAnimaXForCharacter, _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  // * Методы ниже даже не учитываются, если плагин не подключён
  if (Imported.PKD_AnimaX !== true) {
    return;
  }
  
  // * Логика состояний анимации (бой, смерть) (всегда работает)
  _.aaUpdateABSAnimaX = function() {
    if (!this.isAnimX()) {
      return;
    }
    if (this._aaIsInBattleAnimaXState()) {
      if (this._axState !== 'inBattle') {
        this.switchToXAnimaState('inBattle');
      }
    } else {
      if (this._axState !== 'base') {
        this.resetXAnimaState();
      }
    }
  };
  // * Game_Event and Game_Player имеют разную реализацию
  _._aaIsInBattleAnimaXState = function() {
    return false;
  };
  //@[ALIAS]
  ALIAS__createNewAnimaXForCharacter = _.createNewAnimaXForCharacter;
  _.createNewAnimaXForCharacter = function(animaXProfile) {
    ALIAS__createNewAnimaXForCharacter.call(this, animaXProfile);
    this.refreshAnimaXABSStates(animaXProfile);
  };
  // * Загрузка состояний анимации
  _.refreshAnimaXABSStates = function(animaXProfile) {
    var animaXStateBattle, animaXStateDead;
    animaXStateBattle = XAnimaTools.getXAnimaParamsForState('inBattle', animaXProfile);
    this.registerAnimaXState('inBattle', animaXStateBattle);
    animaXStateDead = XAnimaTools.getXAnimaParamsForState('dead', animaXProfile);
    if (animaXStateDead != null) {
      this.registerAnimaXState('dead', animaXStateDead);
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    // * Набор навыков с задержкой
    this.aaDelayedSkillActions = [];
    return this.aaClearCharacterEffects();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isABS()) {
      if (Imported.PKD_AnimaX) {
        this.aaUpdateABSAnimaX();
      }
      if (AA.isABSActive()) {
        this.aaUpdateABS();
      }
    }
  };
  (function() {    
    // * Диагональное движение
    // -----------------------------------------------------------------------
    var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__realMoveSpeed, ALIAS__setDirection;
    
    //@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed;
    _.realMoveSpeed = function() {
      var speed;
      speed = ALIAS__realMoveSpeed.call(this);
      if (this._diagonalDir) {
        return speed * AA.Input.diagonalSpeed;
      } else {
        return speed;
      }
    };
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(direction) {
      this._diagonalDir = false;
      return ALIAS__moveStraight.call(this, direction);
    };
    //@[ALIAS]
    ALIAS__setDirection = _.setDirection;
    _.setDirection = function(direction) {
      if (this._diagStraigten === true) {
        this._diagonalDir = false;
      }
      return ALIAS__setDirection.call(this, direction);
    };
    
    //@[ALIAS]
    ALIAS__moveDiagonally = _.moveDiagonally;
    _.moveDiagonally = function(horz, vert) {
      var diag, norm;
      if (AA.Input.IsDiagonal === true) {
        diag = this.canPassDiagonally(this._x, this._y, horz, vert);
        norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
        if (diag) {
          this._diagonalDir = AA.Utils.get4Dir(horz, vert);
          this._x = $gameMap.roundXWithDirection(this._x, horz);
          this._y = $gameMap.roundYWithDirection(this._y, vert);
          this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
          this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
          this.increaseSteps();
        } else if (norm) {
          this._diagonalDir = false;
          this.moveStraight(this.aaGetOtherDiagDirection(horz, vert));
        }
        this._diagStraigten = false;
        if (this._direction === this.reverseDir(horz)) {
          this.setDirection(horz);
        }
        if (this._direction === this.reverseDir(vert)) {
          this.setDirection(vert);
        }
        return this._diagStraigten = true;
      } else {
        return ALIAS__moveDiagonally.call(this, horz, vert);
      }
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Общие методы ABS
    // -----------------------------------------------------------------------
    // * Основной метод, является ли персонаж вообще ABS объектом
    // * Тут НЕЛЬЗЯ добавлять доп. проверку на AA.isABSActive()
    _.isABS = function() {
      return this.AAEntity() != null;
    };
    _.AAEntity = function() {
      return this.aaEntity;
    };
    _.initABS = function() {
      var ref, ref1;
      if ((ref = this.aaEntity) != null) {
        ref.initABS();
      }
      return (ref1 = this.AASprite()) != null ? ref1.initABS() : void 0;
    };
    // * Деактивировать АБС режим
    _.stopABS = function() {
      var ref;
      return (ref = this.aaEntity) != null ? ref.deactivate() : void 0;
    };
    // * Полностью отключить (очистить) АБС режим у персонажа
    _.clearABS = function() {
      return this.aaEntity = null;
    };
    _.AABattler = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.battler() : void 0;
    };
    _.AASprite = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.sprite() : void 0;
    };
    // * Логика АИ
    _.AALogic = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.logic() : void 0;
    };
    _.inBattle = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.inBattle() : void 0;
    };
    _.isActive = function() {
      var ref;
      return this.isABS() && ((ref = this.AAEntity()) != null ? ref.isActive() : void 0);
    };
    _.onTurnEnd = function() {};
    _.isMyEnemy = function(character) {
      if (!this.isABS()) {
        return false;
      }
      if (character == null) {
        return false;
      }
      if (!character.isABS()) {
        return false;
      }
      return this.AAEntity().isMyEnemy(character.AAEntity());
    };
    // * Логика АБС (только если АБС включена)
    return _.aaUpdateABS = function() {
      var ref;
      this._aaUpdateDelayedSkillActions();
      return (ref = this.AABattler()) != null ? ref.aaUpdateABS() : void 0;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Эффекты спрайта (тряска и прочее)
    // -----------------------------------------------------------------------
    _.aaClearCharacterEffects = function() {
      // * Первое значение - время
      // * Второе значение DX (отклонение по X)
      this._aaShakeEffectData = [0, 0];
      // * [Запрос, массив данных для сохранения, флаг что надо создать части, DX, DY]
      //TODO: Сохранение не используется пока что
      this._aaShatterEffectData = [false, [], true, 0, 0];
    };
    _.aaMotionDX = function() {
      return this._aaShakeEffectData[1];
    };
    _.aaRequestShakeEffect = function(time = 10) {
      return this._aaShakeEffectData[0] = time;
    };
    _.aaIsShakeRequested = function() {
      return this._aaShakeEffectData[0] > 0;
    };
    _.aaIsShatterRequested = function() {
      return this._aaShatterEffectData[0] === true;
    };
    _.aaRequestShatterEffect = function(dx = 0.5, dy = -4) {
      this._aaShatterEffectData = [true, [], true, dx, dy];
    };
    return _.aaOnShatterEffectCreated = function() {
      return this._aaShatterEffectData[0] = false;
    };
  })();
  // -----------------------------------------------------------------------

  // * Добавим MaxTp чтобы Gauge контроллеры работали
  Object.defineProperties(_, {
    mtp: {
      get: function() {
        return this.maxTp();
      },
      configurable: true
    }
  });
  // * Добавляем метод canMove для всех персонажей
  // * В основном он нужен чтобы AAEntities не ходили во время XAnima
  _.canMove = function() {
    if (this.isAnimX()) {
      if (this.isAnimXIsBusy()) {
        // * Персонаж не может идти, если он выполняет действие анимации
        return false;
      }
    }
    if (AA.isABSMap()) {
      return this.AABattler().canMove();
    }
    return true;
  };
  // * Позиция с учётом расширенных HitBox
  // * Реализован отдельный метод, так как HitBox учитывается только при поражении навыками
  _.posExt = function(x, y) {
    var d, l, r, u;
    if (this.aaIsHaveExtendedHitBoxes()) {
      l = this.x - this._aaExtendedHitBox[3];
      r = this.x + this._aaExtendedHitBox[1];
      u = this.y - this._aaExtendedHitBox[0];
      d = this.y + this._aaExtendedHitBox[2];
      return l <= x && x <= r && u <= y && y <= d;
    } else {
      return this.pos(x, y);
    }
  };
  // * Позиции X на экране, с учётом расширенных HitBox
  _.screenXExt = function() {
    var i, j, k, l, points, r, ref, ref1, tw, x;
    points = [this.screenX()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      r = this._aaExtendedHitBox[1];
      l = this._aaExtendedHitBox[3];
      tw = $gameMap.tileWidth();
      // * Точка права (если есть)
      if (r > 0) {
        for (i = j = 1, ref = r; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          x = $gameMap.adjustX(this._realX + i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
      // * Точка слева (если есть)
      if (l > 0) {
        for (i = k = 1, ref1 = l; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          x = $gameMap.adjustX(this._realX - i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
    }
    return points;
  };
  // * Позиции Y на экране, с учётом расширенных HitBox
  _.screenYExt = function() {
    var d, i, j, k, points, ref, ref1, th, u, y;
    points = [this.screenY()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      u = this._aaExtendedHitBox[0];
      d = this._aaExtendedHitBox[2];
      th = $gameMap.tileHeight();
      // * Точка снизу (если есть)
      if (d > 0) {
        for (i = j = 1, ref = d; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          y = $gameMap.adjustY(this._realY + i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
      // * Точка сверху (если есть)
      if (u > 0) {
        for (i = k = 1, ref1 = u; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          y = $gameMap.adjustY(this._realY - i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
    }
    return points;
  };
  // * Есть ли у персонажа расширенные HitBox для АБС навыков
  _.aaIsHaveExtendedHitBoxes = function() {
    return this._aaExtendedHitBox != null;
  };
  _.aaUpdateABSAnimaX = function() {}; // * EMPTY (Переопределяется в Game_Character_AnimaX)
})();

// ■ END Game_CharacterBase.coffee
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
  _.distTo = function(point) {
    return $gameMap.distance(this.x, this.y, point.x, point.y);
  };
  _.aaGetOtherDiagDirection = function(horz, vert) {
    if (this.canPass(this._x, this._y, horz)) {
      return horz;
    } else {
      return vert;
    }
  };
  // * Находится ли на Х расстоянии к точке
  _.aaIsNearThePoint = function(point, minDist = 1) {
    var e, sx, sy;
    try {
      sx = Math.abs(this.deltaXFrom(point.x));
      sy = Math.abs(this.deltaYFrom(point.y));
      return (sx + sy) <= minDist;
    } catch (error) {
      e = error;
      AA.w;
      return false;
    }
  };
  // * Двигаться к цели
  _.aaMoveTypeToTarget = function() {
    var e, target;
    try {
      target = this.AAEntity().getTarget();
      if (!this.aaIsNearThePoint(target)) {
        return this.aaMoveTypeToPoint(target);
      } else {
        return this.aaTurnTowardTarget();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * ОСНОВНОЙ метод
  // * Движение к точке карты
  _.aaMoveTypeToPoint = function(point) {
    var direction, e, horz, vert;
    try {
      if (point == null) {
        return;
      }
      if (AA.Input.IsDiagonal === true) {
        direction = this.aaFindDirectionToDiagonal(point.x, point.y);
        if (direction % 2 === 0) {
          return this.aaMoveToPointStraight(point);
        } else if (Math.abs(direction % 2) === 1) {
          [horz, vert] = AA.Utils.get8Dir(direction);
          return this.moveDiagonally(horz, vert);
        }
      } else {
        return this.aaMoveToPointStraight(point);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Движение к точки (4 way only)
  _.aaMoveToPointStraight = function(point) {
    var dir;
    if (point == null) {
      return;
    }
    dir = this.findDirectionTo(point.x, point.y);
    if (dir > 0) {
      return this.moveStraight(dir);
    }
  };
  
  // * Повернуться к цели
  _.aaTurnTowardTarget = function() {
    var e;
    try {
      return this.turnTowardCharacter(this.AAEntity().getTarget());
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Поиск пути (диагональное движение)
  _.aaFindDirectionToDiagonal = function(goalX, goalY) {
    var best, bestIndex, closedList, current, deltaX1, deltaX2, deltaY1, deltaY2, diag, direction, g1, g2, goaled, horz, i, index2, j, mapWidth, neighbor, node, nodeList, openList, pos1, pos2, searchLimit, start, vert, x1, x2, y1, y2;
    searchLimit = this.searchLimit();
    mapWidth = $gameMap.width();
    nodeList = [];
    openList = [];
    closedList = [];
    start = {};
    best = start;
    if (this.x === goalX && this.y === goalY) {
      return 0;
    }
    start.parent = null;
    start.x = this.x;
    start.y = this.y;
    start.g = 0;
    start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
    nodeList.push(start);
    openList.push(start.y * mapWidth + start.x);
    while (nodeList.length > 0) {
      bestIndex = 0;
      i = 0;
      while (i < nodeList.length) {
        if (nodeList[i].f < nodeList[bestIndex].f) {
          bestIndex = i;
        }
        i++;
      }
      current = nodeList[bestIndex];
      x1 = current.x;
      y1 = current.y;
      pos1 = y1 * mapWidth + x1;
      g1 = current.g;
      nodeList.splice(bestIndex, 1);
      openList.splice(openList.indexOf(pos1), 1);
      closedList.push(pos1);
      if (current.x === goalX && current.y === goalY) {
        best = current;
        goaled = true;
        break;
      }
      if (g1 >= searchLimit) {
        continue;
      }
      j = 0;
      while (j < 9) {
        direction = 1 + j;
        if (direction === 5) {
          j++;
          continue;
        }
        diag = Math.abs(direction % 2) === 1;
        [horz, vert] = AA.Utils.get8Dir(direction);
        if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
          x2 = $gameMap.roundXWithDirection(x1, horz);
          y2 = $gameMap.roundYWithDirection(y1, vert);
        } else if (this.canPass(x1, y1, direction)) {
          x2 = $gameMap.roundXWithDirection(x1, direction);
          y2 = $gameMap.roundYWithDirection(y1, direction);
        } else {
          j++;
          continue;
        }
        pos2 = y2 * mapWidth + x2;
        if (closedList.contains(pos2)) {
          j++;
          continue;
        }
        g2 = g1 + 1;
        index2 = openList.indexOf(pos2);
        if (index2 < 0 || g2 < nodeList[index2].g) {
          if (index2 >= 0) {
            neighbor = nodeList[index2];
          } else {
            neighbor = {};
            nodeList.push(neighbor);
            openList.push(pos2);
          }
          neighbor.parent = current;
          neighbor.x = x2;
          neighbor.y = y2;
          neighbor.g = g2;
          neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
          if (!best || neighbor.f - neighbor.g < best.f - best.g) {
            best = neighbor;
          }
        }
        j++;
      }
    }
    node = best;
    while (node.parent && node.parent !== start) {
      node = node.parent;
    }
    deltaX1 = $gameMap.deltaX(node.x, start.x);
    deltaY1 = $gameMap.deltaY(node.y, start.y);
    if (deltaY1 > 0 && deltaX1 > 0) {
      return 3;
    } else if (deltaY1 > 0 && deltaX1 < 0) {
      return 1;
    } else if (deltaY1 < 0 && deltaX1 < 0) {
      return 7;
    } else if (deltaY1 < 0 && deltaX1 > 0) {
      return 9;
    }
    if (deltaY1 > 0) {
      return 2;
    } else if (deltaX1 < 0) {
      return 4;
    } else if (deltaX1 > 0) {
      return 6;
    } else if (deltaY1 < 0) {
      return 8;
    }
    deltaX2 = this.deltaXFrom(goalX);
    deltaY2 = this.deltaYFrom(goalY);
    if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
      if (deltaX2 > 0) {
        return 4;
      } else {
        return 6;
      }
    } else if (deltaY2 !== 0) {
      if (deltaY2 > 0) {
        return 8;
      } else {
        return 2;
      }
    }
    return 0;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__list, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this.aaInitExtraParams();
  };
  (function() {})();  
    // * Система анимации XAnima
  // -----------------------------------------------------------------------
  (function() {    // -----------------------------------------------------------------------

    // * Система AAEntity
    // -----------------------------------------------------------------------
    var ALIAS__clearPageSettings, ALIAS__setupPage;
    //@[ALIAS]
    ALIAS__setupPage = _.setupPage;
    _.setupPage = function() {
      ALIAS__setupPage.call(this);
      this.aaCheckABSEventState();
      this.aaCheckExtraParams();
    };
    //@[ALIAS]
    ALIAS__clearPageSettings = _.clearPageSettings;
    _.clearPageSettings = function() {
      ALIAS__clearPageSettings.call(this);
      if (this.isABS()) {
        return this.clearABS();
      }
    };
  })();
  // -----------------------------------------------------------------------

  //@[ALIAS]
  ALIAS__list = _.list;
  _.list = function() {
    var e, t;
    try {
      // * Вызов общего события, которое было bind к этому событию (SActions)
      if (this._aaExtraEventList != null) {
        t = this._aaExtraEventList;
        // * Один раз, поэтому зануляем
        this._aaExtraEventList = null;
        return [
          {
            // * Команда "Вызов Общего события" внутри этого события
            // * (Так можно использовать this. и есть _eventId)
            code: 117,
            indent: 0,
            parameters: [t]
          }
        ];
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return ALIAS__list.call(this);
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
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      if (this.AALogic() == null) {
        return;
      }
      if (!this.AALogic().isFreeState()) {
        return this.AALogic().switchToFreeState();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Система AAEntity
    // -----------------------------------------------------------------------
    // * Когда мы переключили страницу события, надо пересоздать Battler и активировать АБС
    _.aaIsShouldBeReActivated = function() {
      return this.isABS() && (this.AABattler() == null);
    };
    _.aaCheckABSEventState = function() {
      if (this.aaIsABSEventPage()) {
        //TODO: Проверить переключение с АБС на АБС событие
        return this._initMembersABS();
      } else {
        if (this.isABS()) {
          // * Если переключили страницу, но событие было АИ, то надо отключить
          this.clearABS();
        }
      }
    };
    _.aaIsABSEventPage = function() {
      var ABSComment, enemyId;
      if (this.page() == null) {
        return false;
      }
      // * Для сохранения производительности, сперва просто смотрим есть ли ABS комментарий
      ABSComment = KDCore.Utils.getEventCommentValue("ABS", this.list());
      if (ABSComment != null) {
        // * Дополнительная проверка, что указан правильный ID
        enemyId = AA.Utils.Parser.getABSEnemyId(ABSComment);
        if (enemyId > 0) {
          if (AA.Utils.Guard.isProperEnemyIdForABSEvent(enemyId)) {
            this.aaEventSettings = new AA.AAEventSettingsParser(this.list());
            //console.info @aaEventSettings
            return true;
          } else {
            AA.w("Enemy ID " + enemyId + " not exists in DB or not have a name");
          }
        } else {
          AA.w("Can't read Enemy ID from <ABS> comment for event " + this.eventId());
        }
      }
      return false;
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAEnemyEntity(this.eventId());
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Основная логика АБС
    // -----------------------------------------------------------------------
    var ALIAS__aaOnActionOnMe, ALIAS__aaOnDeath, ALIAS__aaOnDefeat, ALIAS__aaOnShatterEffectCreated, ALIAS__clearABS, ALIAS__initABS, ALIAS__isActive, ALIAS_aaUpdateABS;
    // * Этот метод выполняется из отдельного потока для логики АИ
    //$[OUTER]
    _.aaUpdateAILogic = function() {
      var e;
      try {
        if (this.isActive()) {
          if (AA.isABSActive()) {
            return this.AALogic().update();
          }
        } else {
          return $gameTemp.aaClearAILogicThreads(this.eventId());
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
      this.aaStoreMoveData();
      $gameTemp.aaRegisterAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__clearABS = _.clearABS;
    _.clearABS = function() {
      ALIAS__clearABS.call(this);
      $gameTemp.aaClearAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__isActive = _.isActive;
    _.isActive = function() {
      return ALIAS__isActive.call(this) && !this._erased;
    };
    // * Этот метод работает только когда АБС активна
    //@[ALIAS]
    ALIAS_aaUpdateABS = _.aaUpdateABS;
    _.aaUpdateABS = function() {
      ALIAS_aaUpdateABS.call(this);
      this._aaUpdateDeadState();
    };
    //@[ALIAS]
    ALIAS__aaOnShatterEffectCreated = _.aaOnShatterEffectCreated;
    _.aaOnShatterEffectCreated = function() {
      ALIAS__aaOnShatterEffectCreated.call(this);
      if (!this.isABS()) {
        return;
      }
      this.aaOnDefeat();
    };
    //@[ALIAS]
    ALIAS__aaOnDefeat = _.aaOnDefeat;
    _.aaOnDefeat = function() {
      ALIAS__aaOnDefeat.call(this);
      //TODO: call items drop!
      //TODO: gain EXP, money
      return this.aaOnDeath();
    };
    //@[ALIAS]
    ALIAS__aaOnDeath = _.aaOnDeath;
    _.aaOnDeath = function() {
      var model;
      ALIAS__aaOnDeath.call(this);
      model = this.AAModel();
      if (model.isHaveDeadSwitch()) {
        // * Включаем self.switch
        AA.SAaction.execute("ss_" + model.deadSwitch + "_true", this);
      } else {
        if (model.eraseOnDead === 1) {
          this.erase();
        }
      }
      if (model.isHaveOnDeathAction()) {
        AA.SAaction.execute(model.onDeath, this);
      }
    };
    //@[ALIAS]
    //TODO: Что делать с xAnimaDead ???
    ALIAS__aaOnActionOnMe = _.aaOnActionOnMe;
    _.aaOnActionOnMe = function() {
      var result;
      ALIAS__aaOnActionOnMe.call(this);
      result = this.AABattler().result();
      if (result == null) {
        return;
      }
      //TODO: Может только если HP damage?
      if (result.isHit()) {
        //TODO: model paramter or skill parameter (shake str)
        this.aaRequestShakeEffect();
      }
    };
    _._aaUpdateDeadState = function() {
      if (this.isActive() && !this.AABattler().isAlive()) {
        // * Отключаем АБС для этого события
        this.stopABS();
        // * Если параметр включён, запускаем эффект
        if (this.AAModel().shatterEffect === 1) {
          this.aaRequestShatterEffect(); // * Иначе сразу
        } else {
          this.aaOnDefeat();
        }
      }
    };
    _._aaIsInBattleAnimaXState = function() {
      return this.AAEntity().inBattle();
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Дополнительные возможности АБС события
    // -----------------------------------------------------------------------
    // * Запускает общее события внутри данного события (т.е. внутри себя вызов общего)
    // * Это позволяет использовать this. и менять АБС параметры события
    _.aaStartCommonEvent = function(ceId) {
      var commonEvent, e;
      try {
        this._aaExtraEventList = null;
        if (ceId <= 0) {
          return;
        }
        "Call outer CE ".p(ceId);
        commonEvent = $dataCommonEvents[ceId];
        if (commonEvent == null) {
          return;
        }
        this._aaExtraEventList = ceId;
        // * Переключаем напрямую, без метода start(), так как не нужен Lock
        this._starting = true;
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

//TODO: СБРОС ЦЕЛИ
//TODO: ОФФСЕТ ДЛЯ ВЫБОРА
//TODO: МИНИ ХП БАР
// Также добавить управление ним во время игры (один из трёх типов)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.AAModel = function() {
    return this.AAEntity().model();
  };
  // * Изменить параметр AAModel у данного события
  _.aaChangeModelParam = function(paramName, newValue) {
    var e, log, model;
    try {
      if (!String.any(paramName)) {
        return;
      }
      model = this.AAModel();
      if (model == null) {
        return;
      }
      log = "Model param: " + paramName + " changed to " + newValue;
      log.p();
      return model[paramName] = newValue;
    } catch (error) {
      // * Надо может какой то метод что параметры были изменены?
      //TODO: some refresh or _convertParameters? on onParamsChanged?
      e = error;
      return AA.w(e);
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
  var ALIAS__updateSelfMovement, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //TODO: Параметр, может ли враг двигаться диагонально

  // * Сохраняем базовые настройки движения события
  _.aaStoreMoveData = function() {
    var i, item, len, ref;
    // * Выполняется один раз, при первой инициализации
    if (this._storedMoveData != null) {
      return;
    }
    this._storedMoveData = {};
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this._storedMoveData[item] = this[item];
    }
  };
  // * Восстанавливаем базоыве настройки движения события
  _.aaRestoreMoveData = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  
  // * Восстановить базовую скорость движения события
  _.aaResetDefaultFreqAndSpeed = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  // * Сохранить текущую координату как точка "дом"
  _.aaStoreHomePoint = function() {
    this.homePoint = {
      x: this.x,
      y: this.y
    };
  };
  _.aaResetHomePoint = function() {
    return this.homePoint = null;
  };
  //@[ALIAS]
  ALIAS__updateSelfMovement = _.updateSelfMovement;
  _.updateSelfMovement = function() {
    if (this._moveType > 3) {
      return this.aaUpdateSelfMovementForAI();
    } else {
      return ALIAS__updateSelfMovement.call(this);
    }
  };
  
  // * AI Free State управляет этим процессом (начинает и завершает)
  _.aaSetMoveTypeReturnToHomePoint = function() {
    var e;
    try {
      if (this._moveType === 93) {
        return;
      }
      if (this.homePoint == null) {
        return;
      }
      return this._moveType = 93;
    } catch (error) {
      //returnMoveData[F, S]
      //TODO:
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeApproachTarget = function() {
    var e, params;
    try {
      if (this._moveType === 91) {
        return;
      }
      // * Быстрая проверка, что есть цель
      if (!this.AAEntity().inBattle()) {
        return;
      }
      // * Approach target
      this._moveType = 91;
      params = this.AAModel().approachMoveData;
      if (this.distTo(this.AAEntity().getTarget()) >= params[0]) {
        this.setMoveFrequency(params[1]);
        return this.setMoveSpeed(params[2]);
      } else {
        return this.aaResetDefaultFreqAndSpeed();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeKeepBattleDistance = function() {
    var e, params;
    try {
      if (this._moveType === 92) {
        return;
      }
      if (!this.AAEntity().inBattle()) {
        return;
      }
      this._moveType = 92;
      params = this.AAModel().inBattleMoveData;
      this.setMoveFrequency(params[1]);
      this.setMoveSpeed(params[2]);
      this._aaMinPatrolDist = params[0];
      this._aaMaxPatrolDist = this.AAModel().viewRadius;
      return this._aaCanMakeRandomPatrolMove = params[3];
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Все эти режимы движения, не имеют собственной логики окончания (выхода из режима)
  _.aaUpdateSelfMovementForAI = function() {
    if (!this._locked && !this.isMoving() && this.isNearTheScreen()) {
      switch (this._moveType) {
        case 91: // * Approach target
          this.aaMoveTypeToTarget(); //TODO: Пока просто к игроку
          break;
        case 92:
          this.aaMoveTypeKeepDistance();
          break;
        case 93:
          "HOME ".p();
          if (this.homePoint != null) {
            this.aaMoveTypeToPoint(this.homePoint);
          } else {
            this.aaRestoreMoveData();
          }
          break;
      }
    }
  };
  // * Держать дистанцию боя
  // * Не подходить близко и не отходить далеко
  // * NOTHING
  // Просто стоим
  _.aaMoveTypeKeepDistance = function() {
    var distance, e, target;
    try {
      // * Если меньше 0, то ничего
      if (this._aaMinPatrolDist <= 0) {
        this.aaTurnTowardTarget();
        return;
      }
      target = this.AAEntity().getTarget();
      distance = this.distTo(target);
      if (distance >= this._aaMaxPatrolDist) {
        "DIST > MAX".p();
        this.aaMoveTypeToTarget(target);
        return;
      }
      if (distance <= this._aaMinPatrolDist) {
        "DIST <= MIN".p();
        this.moveAwayFromCharacter(target);
        this.aaTurnTowardTarget();
        return;
      }
      if (this._aaCanMakeRandomPatrolMove) {
        "RAND MOVE".p();
        this.moveRandom();
        this.aaTurnTowardTarget();
      }
    } catch (error) {
      e = error;
      AA.w(e);
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

// * Дополнительные параметры, которые расширяют возможности взаимодействия событий в АБС
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  // * При попадании Projectile в событие
  _.aaOnVectorHit = function(skillId) {
    var action, e, i, len, ref;
    if (!this.aaIsHaveVectorHitAction(skillId)) {
      // * Если нет для skillId ничего, то смотрим общие - 0
      skillId = 0;
      if (!this.aaIsHaveVectorHitAction(0)) {
        return;
      }
    }
    try {
      ref = this._aaMapSkillVectorHitActions[skillId];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        AA.SAaction.execute(action, this);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Блокирует ли данное событие Visor
  _.aaIsBlockVision = function() {
    return this._aaNoVisionPass === true;
  };
  // * Есть ли действие при попадании конкретного Vector?
  _.aaIsHaveVectorHitAction = function(skillId) {
    var actions;
    if (this._aaMapSkillVectorHitActions == null) {
      return false;
    }
    actions = this._aaMapSkillVectorHitActions[skillId];
    return (actions != null) && !actions.isEmpty();
  };
  // * Инициализация расширенных параметров события
  _.aaInitExtraParams = function() {
    this._aaMapSkillVectorBlockList = null;
    this._aaMapSkillVectorHitActions = null;
    this._aaMapSkillVectorOffset = 0;
    this._aaExtendedHitBox = null;
    this._aaNoVisionPass = false;
  };
  // * Проверка дополнительных параметров, которые могут касаться не только АА но и всех событий
  _.aaCheckExtraParams = function() {
    this.aaInitExtraParams();
    if (this.page() == null) {
      return;
    }
    this._aaExtractVectorOffsetParam();
    this._aaExtractVectorHitActions();
    this._aaExtractVectorBlockList();
    this._aaExtractExtendedHitBoxes();
    this._aaExtractNoVisionPass();
  };
  // * Извлекает параметр смщенеия вектора для данного события
  // * Т.е. смещение начала графики, когда данное событие "выпускает" вектор из себя
  // * <vectorOffset:X>
  _._aaExtractVectorOffsetParam = function() {
    var e, param, svOffset;
    try {
      svOffset = KDCore.Utils.getEventCommentValue("vectorOffset", this.list());
      if (svOffset == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameter(svOffset);
      if (param != null) {
        this._aaMapSkillVectorOffset = param[1];
      }
      return console.info(this._aaMapSkillVectorOffset);
    } catch (error) {
      e = error;
      return AA.warning(e);
    }
  };
  // * Извлекает все onVectorHit действия
  // * Пример: <onVectorHit_307:ss_A_true>
  // * Можно 0 - тогда будет для всех навыков (для любого) или просто onVectorHit:SA>
  _._aaExtractVectorHitActions = function() {
    var action, actionData, args, e, i, len, onHitActions, skillId;
    try {
      onHitActions = KDCore.Utils.getEventCommentValueArray("onVectorHit", this.list());
      if (onHitActions.isEmpty()) {
        return;
      }
      this._aaMapSkillVectorHitActions = {};
      for (i = 0, len = onHitActions.length; i < len; i++) {
        action = onHitActions[i];
        try {
          actionData = AA.Utils.Parser.extractABSParameterAny(action);
          args = actionData[0].split("_");
          if (args.length > 1) {
            skillId = parseInt(args[1]);
          } else {
            skillId = 0; // * any
          }
          this._aaRegisterOnHitActionForSkill(skillId, actionData[1]);
        } catch (error) {
          e = error;
          AA.warning(e);
        }
      }
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Регестрирует SAction для навыка skillId при OnVectorHit
  _._aaRegisterOnHitActionForSkill = function(skillId, actionString) {
    var e;
    try {
      if (this._aaMapSkillVectorHitActions[skillId] == null) {
        this._aaMapSkillVectorHitActions[skillId] = [];
      }
      this._aaMapSkillVectorHitActions[skillId].push(actionString);
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Извлекает список ID навыков, которые блокирет данное событие
  // * <vectorBlock:no> - ничего не блокирует
  // * <vectorBlock:all> - всё блокирует (по умолчанию)
  // * <vectorBlock: 301, 302> - НЕ блокирует 301 и 302 навыки
  _._aaExtractVectorBlockList = function() {
    var e, param, vectorBlockList;
    try {
      vectorBlockList = KDCore.Utils.getEventCommentValue("vectorBlock", this.list());
      if (vectorBlockList == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameterAny(vectorBlockList);
      if (param[1] === "no") {
        this._aaMapSkillVectorBlockList = [];
      } else if (param[1] === "all") {
        this._aaMapSkillVectorBlockList = null;
      } else {
        this._aaMapSkillVectorBlockList = AA.Utils.Parser.convertArrayFromParameter(param[1]);
      }
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Расширенные границы коллизии события (учитывается только для АБС навыков)
  // * UP, RIGHT, DOWN, LEFT (по часовой)
  // * Пример: <extraHitBoxes:1,0,0,0> - расширение на 1 клетку вверх
  _._aaExtractExtendedHitBoxes = function() {
    var e, param, values;
    try {
      values = KDCore.Utils.getEventCommentValue("extraHitBoxes", this.list());
      if (values == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameterAny(values);
      this._aaExtendedHitBox = AA.Utils.Parser.convertArrayFromParameter(param[1]);
    } catch (error) {
      e = error;
      AA.w(e);
      this._aaExtendedHitBox = null;
    }
  };
  // * Если есть этот комментарий, Visor АИ не может проходить через это событие
  // * <noVisionPass>
  //TODO: Добавить except ID событий (или врагов) как с vectorBlock
  //TODO: Т.е. только определённые враги могут видеть через этот объект
  _._aaExtractNoVisionPass = function() {
    var e, value;
    try {
      value = KDCore.Utils.getEventCommentValue("noVisionPass", this.list());
      // * Не важно какое значение, если есть комментарий, значит noVisionPass есть
      this._aaNoVisionPass = value != null;
    } catch (error) {
      e = error;
      AA.w(e);
      this._aaNoVisionPass = false;
    }
  };
})();

// ■ END Game_Event.coffee
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
  (function() {    // * Управление АБС событиями
    // -----------------------------------------------------------------------
    // * Изменить параметр АА события (врага)
    _.aaChangeAIParam = function(paramName, newValue) {
      var char, e;
      try {
        if (this.eventId() <= 0) {
          return;
        }
        char = $gameMap.event(this.eventId());
        if (char == null) {
          return;
        }
        if (!char.isABS()) {
          return;
        }
        return char.aaChangeModelParam(paramName, newValue);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Выполнить SAction
    return _.aaExecuteSAction = function(action) {
      var char, e;
      try {
        if (this.eventId() >= 0) {
          char = $gameMap.event(this.eventId());
        }
        return AA.SAaction.execute(action, char);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  return;
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    return this.initABSMembers();
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshABSMembers();
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Инициализация переменных ABS
  _.initABSMembers = function() {
    return this.aaMapAnimations = [];
  };
  // * Проверка АБС событий и активация по требованию
  _.refreshABSMembers = function() {
    var e, j, len, ref, results;
    ref = this.eventsAA();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      if (e.aaIsShouldBeReActivated()) {
        results.push(e.initABS());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  // * Когда карта загружена, происходит активация ABS событий
  _.initABS = function() {
    var e, j, len, ref, results;
    ref = this.eventsAA();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      results.push(e.initABS());
    }
    return results;
  };
  // * Все ABS события на карте
  _.eventsAA = function() {
    return this.events().filter(function(e) {
      return e.isABS();
    });
  };
  // * ABS события в указанной точке
  _.eventsXyAA = function(x, y) {
    var e;
    try {
      return this.eventsXy(x, y).filter(function(e) {
        return e.isActive();
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * ABS события в указанной точке (с учётом Extended Hit Box)
  _.eventsXyAAExt = function(x, y) {
    var e;
    try {
      return this.eventsXyExt(x, y).filter(function(e) {
        return e.isActive();
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * События в указанной точке (с учётом Extended Hit Box)
  _.eventsXyExt = function(x, y) {
    var e;
    try {
      return this.events().filter(function(event) {
        return event.posExt(x, y);
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Возвращяет спрайтсет карты (!Надо проверять сцену сперва)
  _.spriteset = function() {
    return SceneManager._scene._spriteset;
  };
  _.aaIsMapAnimationRequested = function() {
    return this.aaMapAnimations.length > 0;
  };
  _.aaRequestMapAnimation = function(x, y, animationId) {
    if (animationId <= 0) {
      return;
    }
    this.aaMapAnimations.push({x, y, animationId});
  };
  // * Данный метод возвращает позиции с учётом расширенного HitBox
  _.aaGetExtendedPointsFor = function(char) {
    var d, e, i, j, k, l, m, n, positions, r, ref, ref1, ref2, ref3, u;
    try {
      positions = [
        {
          x: char.x,
          y: char.y
        }
      ];
      if (char.aaIsHaveExtendedHitBoxes()) {
        l = char._aaExtendedHitBox[3];
        r = char._aaExtendedHitBox[1];
        u = char._aaExtendedHitBox[0];
        d = char._aaExtendedHitBox[2];
        if (r > 0) {
          for (i = j = 1, ref = r; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
            positions.push({
              x: char.x + i,
              y: char.y
            });
          }
        }
        if (l > 0) {
          for (i = k = 1, ref1 = l; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
            positions.push({
              x: char.x - i,
              y: char.y
            });
          }
        }
        if (u > 0) {
          for (i = m = 1, ref2 = u; (1 <= ref2 ? m <= ref2 : m >= ref2); i = 1 <= ref2 ? ++m : --m) {
            positions.push({
              x: char.x,
              y: char.y - i
            });
          }
        }
        if (d > 0) {
          for (i = n = 1, ref3 = d; (1 <= ref3 ? n <= ref3 : n >= ref3); i = 1 <= ref3 ? ++n : --n) {
            positions.push({
              x: char.x,
              y: char.y + i
            });
          }
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return positions;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    // * Храним все навыки на карте
    this._aaMapSkills = [];
    $gameTemp.aaProjYOff = $gameMap.tileWidth() * 0.25;
    ALIAS__setup.call(this, mapId);
  };
  _.aaMapSkills = function() {
    return this._aaMapSkills;
  };
  // * Инициализировать (создать объект) навык на карте
  _.startAASkill = function(aaSkill, subject, targetPoint) {
    var mapSkill;
    if (aaSkill == null) {
      return;
    }
    //TODO: Возможно не надо полный навык хранить, а только ID из базы
    mapSkill = new AASkill2MapAction(aaSkill, subject, targetPoint);
    this._registerNewAASkill(mapSkill);
  };
  // * Добавить навык
  _._registerNewAASkill = function(skill) {
    var i, index, j, ref;
    index = 0;
    for (i = j = 0, ref = this._aaMapSkills.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (this._aaMapSkills[i] == null) {
        index = i;
        break;
      }
    }
    this._aaMapSkills[index] = skill;
    "PROJECTILE REGISTRED ON MAP".p(index);
    $gameMap.spriteset().aaCreateNewMapSkill(index);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__gainItem, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //TODO: Пока только игрок может быть (АБС)
  //TODO: Добавить игнорирование членов группы с пустыми именами (частая ошибка новичков)
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    ALIAS__setupStartingMembers.call(this);
    this._actors = [this._actors.first()];
  };
  
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    ALIAS__gainItem.call(this, item, amount, includeEquip);
    //TODO: Пока так, но вообще это будет отдельный плагин
    if (amount > 0 && (this.itemContainer(item) != null)) {
      if (AA.PP.isShowItemGainNotify()) {
        this.aaShowNotifyForItemGain(item, amount);
      }
      if (AA.PP.isAddNewItemOnPanelOnPickup()) {
        this.aaAddGainedItemToPanel(item, amount);
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.aaAddGainedItemToPanel = function(item, count) {
    if (!AA.Utils.isAAObject(item)) {
      return;
    }
    // * Новый предмет (т.е. раньше не было)
    if (this.numItems(item) === count) {
      // * Тут надо использовать idA
      if (!$gamePlayer.aaSkillsSet.isHaveItemOnPanel(item.idA)) {
        // * Тут используется обычный ID (так как конвертируется в методе)
        uAPI.setItemToPanel(item.id);
      }
    }
  };
  //TODO: Добавить ещё проверку флага, чтобы пропускать Notify, например когда с инвентаря снимаем вещь
  _.aaShowNotifyForItemGain = function(item, count) {
    var char, e, popUpItem;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (count <= 0) {
        return;
      }
      if (item == null) {
        return;
      }
      // * Специальный флаг, чтобы скрыть Notify
      // * Этот флаг использует Map Inventory (когда снимаешь предмет)
      if ($gameTemp.aaNotNeedItemPopUpNotify === true) {
        return;
      }
      popUpItem = new AA.Sprite_PopTreasureItem();
      popUpItem.setItem(item, count);
      char = $gamePlayer.AASprite();
      //TODO: Сделать проверку на предыидущий предмет, если сразу одинаковый, то х2
      //TODO: Звук какой-нибудь когда вещь поднимаешь!
      if (char == null) {
        return;
      }
      // * Если нету, создаём
      if (char.aaTreasurePopEngine == null) {
        return char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem);
      // * Если есть, но закончился, то пересоздаём
      } else if (char.aaTreasurePopEngine.isEmtpy()) {
        char.aaTreasurePopEngine.stop();
        return char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem); // * Добавляем
      } else {
        return char.aaTreasurePopEngine.addItem(popUpItem);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
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
  var ALIAS__canMove, ALIAS__initMembers, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
    return this._initMembersABS();
  };
  // ======================================================================
  //TODO: Как определять?

  //TODO: TEST

  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
  };
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    var canMove;
    canMove = ALIAS__canMove.call(this);
    if (canMove && this.isABS() & AA.isABSActive()) {
      return this.AABattler().canMove();
    } else {
      return canMove;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (AA.isABSActive()) {
      return this._aaUpdatePlayerABS(sceneActive);
    }
  };
  (function() {    // * Диагональное движение
    // -----------------------------------------------------------------------
    var ALIAS__executeMove, ALIAS__findDirectionTo, ALIAS__getInputDirection;
    //@[ALIAS]
    ALIAS__getInputDirection = _.getInputDirection;
    _.getInputDirection = function() {
      if (AA.Input.IsDiagonal === true) {
        return Input.dir8;
      } else {
        return ALIAS__getInputDirection.call(this);
      }
    };
    
    //@[ALIAS]
    ALIAS__executeMove = _.executeMove;
    _.executeMove = function(direction) {
      var horz, vert;
      if (AA.Input.IsDiagonal === true) {
        if (direction % 2 === 0) {
          return ALIAS__executeMove.call(this, direction);
        } else if (Math.abs(direction % 2) === 1) {
          [horz, vert] = AA.Utils.get8Dir(direction);
          return this.moveDiagonally(horz, vert);
        }
      } else {
        return ALIAS__executeMove.call(this, direction);
      }
    };
    
    //@[ALIAS]
    ALIAS__findDirectionTo = _.findDirectionTo;
    _.findDirectionTo = function(goalX, goalY) {
      if (AA.Input.IsDiagonal === true) {
        return this.aaFindDirectionToDiagonal(goalX, goalY);
      } else {
        return ALIAS__findDirectionTo.call(this, goalX, goalY);
      }
    };
  })();
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
  // * Когда сцена карты останавливается (сменяется другой)
  _.aaOnMapSceneEnd = function() {
    if (this.isInSkillTargetingState()) {
      return this.onSkillTargetCancel();
    }
  };
  // * Можно ли управлять? (АБС элементы: навыки, атака и всё в этом роде)
  _.canBeControlled = function() {
    return this.isActive() && AA.isABSMap();
  };
  _.isInSkillTargetingState = function() {
    return this.aaState === 'skill';
  };
  // * Если ли у игрока АБС навык с ID
  _.aaIsHaveABSSkill = function(skillId) {
    return this.AABattler().getAASkills().getById(skillId) != null;
  };
  //TODO:?
  // * Проверка цели (см. Game_CharacterBase_AA)
  _.aaIsValidTargetToSet = function(target) {
    return true;
  };
  // * Когда игрок выбрал зону поражения навыка на карте (нажал левую кнопку мыши)
  _.onSkillTargetSelected = function() {
    "SKILL ZONE SELECTED".p();
    console.info($gameTemp._aaSkillSelectorTargets);
    this.startPerformAASkill(TouchInput.toMapPoint());
    // * Сбрасываем состояние?
    return this.onSkillTargetCancel();
  };
  _.onSkillTargetCancel = function() {
    return this._resetAAState();
  };
  //TODO: Возможно эта реализация довольно затратная по производительности
  //TODO: Сделать параметр плагина - использовать боевую стойку или нет
  _._aaIsInBattleAnimaXState = function() {
    var inRadius, myEnemies;
    if (!AA.isABSActive()) {
      return false;
    }
    myEnemies = AATargetsManager.getAllWhoHavePlayerAsTarget();
    if (myEnemies.length > 0) {
      inRadius = AATargetsManager.getFilteredInRadius(this, 10, myEnemies);
      return inRadius.length > 0;
    }
    return false;
  };
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      // * Сбрасываем состояние (выбор навыка)
      return this._resetAAState();
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Основные (приватные) методы АБС
    // -----------------------------------------------------------------------
    var ALIAS__initABS;
    
    //TODO: Доделать поддержку техники
    // * Боты сейчас не учитывают isActive
    // * Надо там добавить isTagetValid
    //@[ALIAS]
    //ALIAS__isActive = _.isActive
    //_.isActive = ->
    //    ALIAS__isActive.call(@) && !@isInVehicle()

    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      this.aaRefreshABSSkillsForPanel();
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAPlayerEntity();
      this.aaState = null; // * Свободное состояние (нулевое)
      this.aaSkillsSet = new AASkillsSet();
    };
    _._setAAStateToSelectSkillTarget = function() {
      // * Наверное должно быт в AAEntity!!! Так как у ботов тоже будет этот параметр
      this.aaState = 'skill';
      //TODO: Так же рисовать круг области range навыка активного!
      return AA.EV.call("PlayerSkillSelector");
    };
    //AA.EV.call("PlayerChangeState")
    //TODO: rise event -> Scene_Map pick event and change mode to select map zone
    _._setAAStateToSmartSkillUse = function(skillId, point) {
      this.aaState = 'smartAttack';
      this._aaSmartSkillId = skillId;
      this._aaSmartPoint = point;
    };
    _._resetAAState = function() {
      this.aaState = null;
      return AA.EV.call("PlayerSkillSelector");
    };
    //AA.EV.call("PlayerChangeState")
    _._aaUpdatePlayerABS = function(sceneActive) {
      if (sceneActive === true) {
        this._aaUpdateStates();
        return this._aaUpdatePlayerInput();
      }
    };
    _._aaUpdateStates = function() {
      switch (this.aaState) {
        case 'skill':
          // * Обновляем цели под кругом выбора
          return $gameTemp._aaSkillSelectorTargets = AATargetsManager.collectTargetsForPlayerSelector(this.activeAASkill());
        //? Не используется пока что
        // * Работает, но проблема что надо сбрасывать во многих случаях - путаница
        case 'smartAttack':
          if (!this.isMoving()) {
            if (AATargetsManager.isInSkillRange(this, this._aaSmartSkillId, this._aaSmartPoint)) {
              this._resetAAState();
              return this.aaTryPerformSkill(this._aaSmartSkillId);
            } else {
              return this.aaMoveTypeToPoint(this._aaSmartPoint);
            }
          }
          break;
      }
    };
  })();
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

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
        skill = AA.Utils.getAASkillObject(skillId);
        if (!AA.Utils.isAAObject(skill)) {
          // * Только АБС навык можно выполнить через этот метод
          skill = null;
        }
      } else {
        // * Иначе навык должен быть готов к использованию и выучен
        skill = this.AABattler().getUsableAASkills().find(function(s) {
          return s.idA === skillId;
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
    this.setActiveAASkill(skill.idA);
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

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Только атака по нажатию LMB или RMB в режиме поворота (Cntr зажата)
  //TODO: Plugin Parameter
  //TODO: Можно DYNAMIC сделать метод (т.е. если параметр отключён, занулить его)
  // см. AASystem -> applyParameters метод (в нём можно занулять)
  _.aaIsStaticAttackInRotation = function() {
    return this.aaInRotation === true && AA.Input.IsStaticAttackWhenRotating === true;
  };
  _._aaUpdatePlayerInput = function() {
    var e;
    if (!$gamePlayer.canBeControlled()) {
      return;
    }
    try {
      this._aaUpdateInput_Rotation();
    } catch (error) {
      //TODO: Action Keys
      //@_aaUpdateInput_ActionKeys()
      e = error;
      AA.w(e);
    }
  };
  _._aaUpdateInput_Rotation = function() {
    // * Чтобы не поворачивался во время анимации, проверяем и canMove()
    this.aaInRotation = this.canMove() && Input.isPressed(AA.IKey.ROT);
    if (this.aaInRotation) {
      this.turnTowardCharacter(TouchInput.toMapPoint());
    }
  };
  _._aaUpdateInput_ActionKeys = function() {
    if (Input.isTriggered(AA.IKey.REL)) {
      return;
    }
    //TODO: reload firearm
    if (Input.isTriggered(AA.IKey.CMD)) {

    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------
//TODO: AI command menu

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  (function() {    // * Пользовательские настройки интерфейса
    // -----------------------------------------------------------------------
    _.aaInitUserUISettings = function() {
      return this._aaUserUiSettings = new AAUserUISettings();
    };
    _.aaGetUserUISettings = function() {
      if (this._aaUserUiSettings == null) {
        this.aaInitUserUISettings();
      }
      return this._aaUserUiSettings;
    };
  })();
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  _._aaInitAILogicThreads = function() {
    if (this.__aaAILogicThreads == null) {
      return this.__aaAILogicThreads = {};
    }
  };
  _.aaRegisterAILogicThread = function(eventId) {
    var thread;
    "THREAD REGISTERED FOR".p(eventId);
    this._aaInitAILogicThreads();
    thread = setInterval((function() {
      var ev;
      if (!AA.isABSMap()) {
        return;
      }
      ev = $gameMap.event(eventId);
      if (ev != null) {
        return ev.aaUpdateAILogic();
      } else {
        return $gameTemp.aaClearAILogicThread(eventId);
      }
    }), 100);
    this.__aaAILogicThreads[eventId] = thread;
  };
  _.aaClearAILogicThread = function(eventId) {
    var thread;
    this._aaInitAILogicThreads();
    thread = this.__aaAILogicThreads[eventId];
    if (thread != null) {
      clearInterval(thread);
    }
    this.__aaAILogicThreads[eventId] = null;
  };
  _.aaClearAILogicThreads = function() {
    var key, ref, value;
    if (this.__aaAILogicThreads == null) {
      return;
    }
    ref = this.__aaAILogicThreads;
    for (key in ref) {
      value = ref[key];
      this.aaClearAILogicThread(key);
    }
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //TODO: НЕ, лучше не трогать Game_Troop, так как у нас есть стандартный бой тоже!!!

  // * Через класс Game_Troop мы будем обращаться ко всем АБС врагам (АИ) на карте

  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var GaugeController;
  // * Общий контроллер для Sprite_UIGauge (HP, MP, TP, ...)
  //?rev 03.07.21
  GaugeController = class GaugeController extends AA.UIElementController {
    constructor(gaugeSprite) {
      super();
      this.gaugeSprite = gaugeSprite;
    }

    
      // * source - Game_Battler
    // * valueFieldName - название поля (hp)
    //$[OVER]
    setup(source, valueFieldName, maxValueFieldName) {
      this.source = source;
      this.valueFieldName = valueFieldName;
      this.maxValueFieldName = maxValueFieldName;
      this.value = 0;
      this.max = 0;
      this.createThread(10, 4);
    }

    
      // * 0 - value (100), 1 - % (100%), 2 - full (100 / 100)
    setValueTextType(valueTextType) {
      switch (valueTextType) {
        case 1:
          this.getTypedText = this.getValuePercentText;
          break;
        case 2:
          this.getTypedText = this.getValueAndMaxText;
          break;
        default:
          this.getTypedText = this.getValueText;
      }
    }

    refreshGauge() {
      var e;
      if (this.gaugeSprite == null) {
        return;
      }
      try {
        this._refreshValues();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Останавливаем работу метода
        this.refreshGauge = function() {};
      }
    }

    //?DYNAMIC
    // * Этот метод используется чтобы получить текст исходя из настроек контроллера
    // * По стандарту - обычное значение
    getTypedText() {
      return this.getValueText();
    }

    getValueText() {
      return this.value;
    }

    getValueAndMaxText() {
      return this.value + " / " + this.max;
    }

    getValuePercentText() {
      return Math.round((this.value / this.max) * 100) + '%';
    }

  };
  AA.link(GaugeController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.GaugeController.prototype;
  //$[OVER]
  _._refresh = function() {
    var sourceMaxValue, sourceValue;
    sourceValue = this.source[this.valueFieldName];
    sourceMaxValue = this.source[this.maxValueFieldName];
    // * Перерисовываем только если значния изменились
    if (this.value !== sourceValue || this.max !== sourceMaxValue) {
      this.value = sourceValue;
      this.max = sourceMaxValue;
      this.refreshGauge();
    }
  };
  _._refreshValues = function() {
    this.gaugeSprite.drawGauge(this.value / this.max);
    this.gaugeSprite.drawText(this.getTypedText());
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GUARD.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.Guard;
})();

// ■ END GUARD.coffee
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
    return this.loadBitmap('img/charactersAA/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MATH.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AP, _;
  //@[DEFINES]
  _ = AA.Utils.Math;
  AP = KDCore.Point;
  // * Алтернативный метод, расчитаный на более быстрое вычисление (без создания Point)
  // * Используется в проверке коллизий Map AA Skills Projectiles
  _.getXYDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };
  _.getProjectilePointByDirection = function(startPoint, d) {
    var diagTable, e, horVer, px, py, x, y;
    try {
      "START POINT".p();
      console.info(startPoint);
      ({x, y} = startPoint);
      "FACE DIRECTION".p();
      // * Диагональное направление 8
      if ([1, 3, 7, 9].contains(d)) {
        diagTable = {
          1: [4, 2],
          3: [6, 2],
          7: [4, 8],
          9: [6, 8]
        };
        horVer = diagTable[d];
        px = $gameMap.roundXWithDirection(x, horVer[0]);
        py = $gameMap.roundYWithDirection(y, horVer[1]);
      } else {
        // * Обычное направление 4
        px = $gameMap.xWithDirection(x, d);
        py = $gameMap.yWithDirection(y, d);
      }
      return new KDCore.Point(px, py);
    } catch (error) {
      e = error;
      return KDCore.Point.Empty;
    }
  };
})();

// ■ END MATH.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами плагина
(function() {
  var ParamsManager;
  
    //TODO: Заменить Test на другой символ
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("AABSZ");
      this._prepareParameters();
      return;
    }

    xAnimations() {
      if (Imported.PKD_AnimaX === true) {
        return PKD_ANIMAX.Animations;
      } else {
        return [];
      }
    }

    // * Стандартные: ["AABS_0","AABS_1", "AABS_2"]
    fonts() {
      return this.getParam("fonts", []);
    }

    uiData(tag) {
      switch (tag) {
        case "hpGauge":
          // * В классе Sprite_ActorStateGauge прописаны настройки HP как стандартные
          return AA.Sprite_ActorStateGauge.prototype.defaultParams();
        case "mpGauge":
          return {
            visible: true,
            position: {
              x: 454,
              y: 560
            },
            label: "Player_MPGaugeLabel",
            labelMargins: {
              x: -37,
              y: 5
            },
            isCanBeEdited: true,
            isHideWithMessage: true,
            text: {
              visible: true,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Player_MPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "tpGauge":
          return {
            visible: false,
            position: {
              x: 454,
              y: 560
            },
            label: "Player_TPGaugeLabel",
            labelMargins: {
              x: -37,
              y: 5
            },
            isCanBeEdited: true,
            isHideWithMessage: true,
            text: {
              visible: true,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Player_TPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge1":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: null,
            labelMargins: {
              x: 0,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge2":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: null,
            labelMargins: {
              x: 0,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge2",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge3":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: "Event_HPGauge3_Label",
            labelMargins: {
              x: -20,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge3",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        default:
          return null;
      }
    }

    getMiniHpGaugeSettings() {
      return {
        active: true,
        showOnlyOnHover: true,
        showOnDamage: true
      };
    }

    //TODO: Первые два обязательны, так как отвечают за атаку и защиту (мышка)
    getUISkillsItems() {
      return [
        {
          position: {
            x: 218,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "E"
        },
        {
          position: {
            x: 255,
            y: 583
          },
          visibleIfEmpty: false,
          symbol: "Q"
        },
        {
          position: {
            x: 302,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "1"
        },
        {
          position: {
            x: 339,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "2"
        },
        {
          position: {
            x: 376,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "3"
        },
        {
          position: {
            x: 413,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "4"
        },
        {
          position: {
            x: 450,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "5"
        },
        {
          position: {
            x: 487,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "6"
        },
        {
          position: {
            x: 524,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "7"
        },
        {
          position: {
            x: 561,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "8"
        }
      ];
    }

    isShakeScreenWhenPlayerGetDamage() {
      return true;
    }

    //TODO: ItemGain вынести в отдельный плагин
    isShowItemGainNotify() {
      return true;
    }

    // * Добавлять автоматически новый навык на панель навыков при изучении навыка
    isAddNewSkillsOnPanelOnLearning() {
      return true;
    }

    // * Добавлять автоматически АБС предметы на панель навыков
    isAddNewItemOnPanelOnPickup() {
      return true;
    }

    // * Глобальные непроходимые участки карты для визоров и Projectile
    getVisionRestrictedRegions() {
      return this.getParam("enemies_noPassVision", []);
    }

    getVisionRestrictedTerrains() {
      return this.getParam("enemies_noPassVision2", []);
    }

    getProjectileRestrictedRegions() {
      return this.getParam("map_noProjectilePass", []);
    }

    getProjectileRestrictedTerrains() {
      return this.getParam("map_noProjectilePass2", []);
    }

    //TODO: Всплывающий урон вынести в отдельный плагин
    //TODO: Сделать параметры всплывающего урона
    getPopUpDamageSettings(id) {
      var data, settings;
      settings = this.getParam("popUpDamageTable", []);
      data = settings.getById(id);
      if (data != null) {
        return data;
      } else {
        return {
          id: "default",
          randDX: 10,
          randDY: 10,
          stayTime: 12,
          noFlyUp: false,
          noFadeOut: false,
          changeFontSize: 26,
          text: {
            visible: true,
            marginX: 0,
            marginY: 0,
            position: "center",
            outlineColor: null,
            outlineWidth: 2,
            fontFace: null,
            textColor: "#E6E6E6",
            fontSize: 22,
            fontItalic: false
          },
          image: {
            name: "",
            marginX: 0,
            marginY: 0,
            fadeInSpeed: 20
          }
        };
      }
    }

  };
  AA.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.ParamsManager.prototype;
  _._prepareParameters = function() {};
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
//TODO: Может и не надо этот метод, раньше тут был конверт анимаций

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PARSER.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.Parser;
  //TODO: IN ACORE
  _.convertParameterValue = function(paramValue) {
    if (isFinite(paramValue)) {
      return Number(paramValue);
    } else {
      if (paramValue === "true") {
        return 1;
      } else if (paramValue === "false") {
        return 0;
      } else {
        return paramValue;
      }
    }
  };
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
      return values.split(",").map(function(i) {
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

// Generated by CoffeeScript 2.5.1
(function() {
  var PopTreasureController;
  // * Контроллер прикрепляется к спрайту, показывает все Items и удаляется самостоятельно
  // * Сам по себе он не "живёт", поэтому нужен начальный popTreasureItem
  PopTreasureController = class PopTreasureController extends Sprite {
    constructor(parentCharacter, popTreasureItem) {
      super();
      this.parentCharacter = parentCharacter;
      this._init();
      if (popTreasureItem != null) {
        this.addItem(popTreasureItem);
      }
      return;
    }

    // * Стандартный набор настроек
    //TODO: load from AA parameters manager directly
    defaultParams() {
      return {
        margins: {
          x: 0,
          y: -60
        },
        opacityStep: 10,
        moveStep: 1,
        stayTime: 80,
        dyBetweenLines: 20
      };
    }

    addItem(popTreasureItem) {
      var e;
      if (popTreasureItem == null) {
        return;
      }
      try {
        if (!this.isEmtpy()) {
          this._moveUpItems();
        }
        this.addChild(popTreasureItem);
        this.items.push(popTreasureItem);
        popTreasureItem.start(this.params);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }

    isEmtpy() {
      return this.items.isEmpty();
    }

    stop() {
      return this._destroyMe();
    }

    update() {
      super.update();
      this._checkAllItems();
      if (this.isEmtpy()) {
        return this._destroyMe();
      }
    }

  };
  AA.link(PopTreasureController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.PopTreasureController.prototype;
  _._init = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    this.items = [];
    this._linkMe();
  };
  // * Удалить себя из родителя
  _._destroyMe = function() {
    var e;
    if (this.parentCharacter == null) {
      return;
    }
    try {
      this.parentCharacter.removeChild(this);
      this.visible = false;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Присоединиться к "родителю"
  _._linkMe = function() {
    var e;
    try {
      this.parentCharacter.addChild(this);
      this.move(this.params.margins.x, this.params.margins.y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Поиск и удаление тех item, которые not Active
  _._checkAllItems = function() {
    var e, i, item, len, ref;
    try {
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (!item.isActive()) {
          this.items.delete(item);
          this._checkAllItems(); // * продолжить снова
          break; // * завершить цикл
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Сдвиг элементов
  _._moveUpItems = function() {
    var e, i, item, len, ref;
    try {
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item != null) {
          item.y -= this.params.dyBetweenLines;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__loadGameFonts, ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем систему АБС
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    return AA.System.initSystem();
  };
  // * Загрузка шрифтов системы АБС
  //@[ALIAS]
  ALIAS__loadGameFonts = _.loadGameFonts;
  _.loadGameFonts = function() {
    ALIAS__loadGameFonts.call(this);
    AA.System.loadFonts();
  };
  // * Начальная настройка (и сброс) системы АБС
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    AA.System.onGameDataLoaded();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__stop, ALIAS__update, ALIAS__updateCallMenu, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    AA.System.onMapSceneLoaded();
    return this.aaCreateMouseDetectionThread();
  };
  //@[ALIAS]
  // * Создаём интерфейс боевой системы
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._aaUI = new AA.Spriteset_UI();
    this.addChild(this._aaUI);
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    AA.System.onMapSceneStopped();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (AA.isABSActive()) {
      this.updateABS();
    }
  };
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  // * Сохранение алиаса, чтобы использовать в другом файле
  _.ALIAS__onMapTouch = ALIAS__onMapTouch;
  _.onMapTouch = function() {
    if (AA.UI.isUITouched()) {
      return;
    }
    if (AA.isABSActive()) {
      return this.onMapTouchAA();
    } else {
      return ALIAS__onMapTouch.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateCallMenu = _.updateCallMenu;
  _.updateCallMenu = function() {
    if (TouchInput.isCancelled()) {
      //if AA.UI.performCancelActionOnMap()
      if (this.onMapCancelTouchAA()) {
        return;
      }
    }
    //TODO: Меню не вызывается если isMoving, также сделать если игрок в действии (анимация, удар)
    // * Если действие выполненно, то не надо вызывать меню
    return ALIAS__updateCallMenu.call(this);
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
  _.updateABS = function() {
    return this.aaUpdateMouseDetection();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------
//@aaUpdateMapScroolByMouse() #TODO: доработать скролл (взять из AABS MV)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Левой)
    // -----------------------------------------------------------------------
    // * ТОЛЬКО левая кнопка мыши
    _.onMapTouchAA = function() {
      //TODO: $gamePlayer.canBeControlled() ??? Надо или нет???
      // * Если игрок в режиме выбора зоны навыка, то активация навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetSelected();
      } else {
        // * Новая система (без выбора целей)
        // * Обновим поиск цели под курсором
        this.aaRefreshMouseDetection();
        // * Статичная атака при повороте
        if ($gamePlayer.aaIsStaticAttackInRotation()) {
          $gamePlayer.aaPerformPlayerAttack01(false);
          return;
        }
        if ($gameTemp._aaEventUnderCursor != null) {
          // * Нажатие по цели
          this._aaOnTouchOnTarget();
        } else {
          // * Нажатие по карте (просто)
          this._aaOnTouchOnMapBasic();
        }
      }
    };
    _._aaOnTouchOnTarget = function() {
      var char, mode;
      if (AA.isDEV()) {
        char = $gameTemp._aaEventUnderCursor;
        window.__selected = char;
        if (char != null) {
          "SELECTED ON MAP".p(char.AABattler().name());
        }
      }
      mode = AA.Input.LMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack01(false);
          break;
        case 1: // * DEFAULT (move)
          _.ALIAS__onMapTouch.call(this);
          break;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack01(true); // * 3, TURN
          break;
        default:
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
      }
    };
    _._aaOnTouchOnMapBasic = function() {
      var mode;
      mode = AA.Input.LMBMapTouchMode;
      if (mode === 0) { // * ATTACK ONLY
        $gamePlayer.aaPerformPlayerAttack01(false);
      } else if (mode === 1) { // * DEFAULT (move)
        _.ALIAS__onMapTouch.call(this); // mode == 2
      } else {

      }
    };
    // TODO: Пока только события собирает
    // * NOTHING, ничего
    _.aaGetABSEntityInPosition = function(point) {
      var e, events;
      try {
        events = $gameMap.eventsXyAA(point.x, point.y);
        if (events.length > 0) {
          return events.first();
        }
      } catch (error) {
        e = error;
        AA.w;
      }
      return null;
    };
    return _.aaOnClickOnABSCharacter = function(char) {
      var e;
      try {
        $gamePlayer.aaTrySetTarget(char);
        //? DEBUG ONLY
        if (AA.isDEV()) {
          window.__selected = char;
          if (char != null) {
            return "SELECTED ON MAP".p(char.AABattler().name());
          }
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Правой)
    // -----------------------------------------------------------------------
    // * Если вернуть true - то меню НЕ будет показано
    _.onMapCancelTouchAA = function() {
      var isNotShowMenu;
      if (AA.UI.isAnyUIElementTouchProcess()) {
        // * инвернтарь, Hot бар и т.д.
        return true;
      }
      // * Отмена выбора зоны поражения навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetCancel();
        return true;
      }
      // * Новая система (без выбора целей)
      // * Обновим поиск цели под курсором
      this.aaRefreshMouseDetection();
      // * Статичная атака при повороте
      if ($gamePlayer.aaIsStaticAttackInRotation()) {
        $gamePlayer.aaPerformPlayerAttack02(false);
        return true;
      }
      if ($gameTemp._aaEventUnderCursor != null) {
        // * Нажатие по цели
        isNotShowMenu = this._aaOnCancelTouchOnTarget();
      } else {
        // * Нажатие по карте (просто)
        isNotShowMenu = this._aaOnCancelTouchBasic();
      }
      return isNotShowMenu;
    };
    _._aaOnCancelTouchOnTarget = function() {
      var mode;
      mode = AA.Input.RMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 1: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack02(true);
          return true;
        case 3: // TURN
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
          return true; // * 4, MENU
        default:
          return false;
      }
    };
    return _._aaOnCancelTouchBasic = function() {
      var mode;
      mode = AA.Input.RMBMapTouchMode;
      switch (mode) {
        case 0: // * Menu
          return false; // * false - значит меню будет открыто
        case 1: // * Attack Secondary
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 2: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 3: // * Turn
          $gamePlayer.turnTowardCharacter(TouchInput.toMapPoint());
          return true; // * Nothing
        default:
          return true;
      }
    };
  })();
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
  _.aaCreateMouseDetectionThread = function() {
    $gameTemp._aaEventUnderCursor = null;
    return this._aaMouseDetectThread = new KDCore.TimedUpdate(2, this.aaRefreshMouseDetection.bind(this));
  };
  _.aaUpdateMouseDetection = function() {
    return this._aaMouseDetectThread.update();
  };
  // * Этот метод отвечает за "сбор" событий и объектов под курсором
  _.aaRefreshMouseDetection = function() {
    var eventUnderCursor;
    eventUnderCursor = this.aaGetABSEntityInPosition(TouchInput.toMapPoint());
    if (eventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor !== eventUnderCursor) {
        $gameTemp._aaEventUnderCursor = eventUnderCursor;
        AA.EV.call("UnderMouseEventChanged");
      }
    } else {
      if ($gameTemp._aaEventUnderCursor != null) {
        $gameTemp._aaEventUnderCursor = null;
        AA.EV.call("UnderMouseEventChanged");
      }
    }
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
  //TODO: Сделать задержку и проверку за Canvas
  //TODO: optional и параметры (границы, скорость)
  // Сделать возможность отключать, включать в игре
  _.aaUpdateMapScroolByMouse = function() {
    var isScroll, p, scroolSpeed;
    if ($gamePlayer.isMoving()) {
      return;
    }
    //TODO: destination is valid
    // * Когда мышка у края экрана, делать scrol
    isScroll = false;
    scroolSpeed = 5;
    p = TouchInput;
    if (p.y > Graphics.height - 20) {
      //"DOWN".p()
      $gameMap.startScroll(2, 1, scroolSpeed);
      //if p.y > 710
      //    $gameMap.startScroll(2, 2, 5)
      isScroll = true;
    } else {

    }
    if (p.y > 0 && p.y < 20) {
      //"UP".p()
      $gameMap.startScroll(8, 1, scroolSpeed);
      //if p.y > 710
      //    $gameMap.startScroll(2, 2, 5)
      isScroll = true;
    } else {

    }
    if (p.x > 0 && p.x < 20) {
      //"Left".p()
      $gameMap.startScroll(4, 1, scroolSpeed);
      isScroll = true;
    } else {

    }
    if (p.x > Graphics.width - 20) {
      //"right".p()
      $gameMap.startScroll(6, 1, scroolSpeed);
      isScroll = true;
    }
    if (!isScroll) {
      return $gameMap.startScroll(0, 0, 0);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    AA.System.onTitleScreen();
    return ALIAS__start.call(this);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена игрового визуального редактора интерфейса
(function() {
  var Scene_UIEditor;
  Scene_UIEditor = class Scene_UIEditor extends Scene_Base {
    constructor() {
      super();
      this.elementUnderMouse = null;
      this.isDrag = false;
      this.preEditElementsStates = [];
      return;
    }

    create() {
      super.create();
      // * Запоминаем состояние АБС, так как надо его ставить на паузу
      $gameTemp._needRestoreABSSystemAfterUIEdit = AA.isABSActive();
      AA.System.pauseABS();
      this.createMain(); //# -> 0
      //TODO: Добавить опцию (Показывать ли скрытые в редактре...)
      this.showNotVisibleElements();
      //TODO: Добавить опцию (параметр  Показывать ли..)
      return this.showNotEditableElements();
    }

    // * Элементы, которые нельзя редактировать, мы отмечаем (блюр)
    showNotEditableElements() {
      var e, i, len, ref;
      ref = this.elements();
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (!e.isCanBeEdited()) {
          this.deactivateElement(e);
        }
      }
    }

    // * Элемнты, которые скрыты, мы показываем прозрачными
    showNotVisibleElements() {
      var e, i, len, ref;
      ref = this.elements();
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (!e.visible) {
          // * Тут проверяется по флагу visible, а не isActive
          this.transparentElement(e);
        }
      }
    }

    deactivateElement(element) {
      // * Сохраняем значения перед редактированием
      this.preEditElementsStates.push([element, element.visible, element.opacity]);
      element.opacity = 150;
      element.desaturate();
    }

    transparentElement(element) {
      this.preEditElementsStates.push([element, element.visible, element.opacity]);
      element.visible = true;
      element.opacity = 120;
    }

    // * Сбросить значения по умолчанию
    resetElement(element) {
      var user;
      element.reset("position");
      user = $gameSystem.aaGetUserUISettings();
      return user.set(element.tag, "resetPosition");
    }

    // * Сохранить позицию элемента
    saveElementPosition(element) {
      var user, x, y;
      user = $gameSystem.aaGetUserUISettings();
      ({x, y} = element);
      user.set(element.tag, "setPosition", [x, y]);
    }

    elements() {
      return this.uiSpriteset.elements;
    }

    //TODO: Добавить кнопка H - скрыть\показать или скрыть \ показать последний (если не на элементе курсор)
    // Например стоит опция не показывать скрытые

      //TODO: Параметр плагина - OFF, Всегда, Только в режиме разработки

      //TODO: Кнопка - Сбросить до последний позиции???
    update() {
      super.update();
      this.updateMain(); //# -> Mouse
      this.updateExit();
      if (!this.isDrag) {
        // * Обновляем пользовательское управление (если не Drag)
        return this.updateInput();
      }
    }

    updateExit() {
      if (Input.isCancel()) {
        return this.popScene();
      }
    }

    updateInput() {
      // * Сброс позиции по умолчанию
      if (Input.isTriggered('r')) {
        if (this.elementUnderMouse != null) {
          this.resetElement(this.elementUnderMouse);
        }
      }
    }

    stop() {
      var elementData, i, len, ref;
      super.stop();
      if ($gameTemp._needRestoreABSSystemAfterUIEdit === true) {
        AA.System.resumeABS();
      }
      ref = this.preEditElementsStates;
      // * Восстанавливаем прозрачность и видимость которые были перед редактированием
      for (i = 0, len = ref.length; i < len; i++) {
        elementData = ref[i];
        elementData[0].visible = elementData[1];
        elementData[0].opacity = elementData[2];
      }
    }

  };
  AA.link(Scene_UIEditor);
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_UIEditor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Scene_UIEditor.prototype;
  _.createMain = function() {
    this.createBackground();
    // * Показать что в редакторе находимся
    this.createEditorMark();
    // * Сетки
    this.createGrids();
    this.createUI();
    this.createXYHelpText();
    return this.createTagHelpText();
  };
  // * За заднем плане карта
  _.createBackground = function() {
    this._backgroundSprite = new Sprite(SceneManager.backgroundBitmap());
    this.addChild(this._backgroundSprite);
    return this._backgroundSprite.opacity = 250;
  };
  _.createEditorMark = function() {
    var eLayer, eText, p;
    eLayer = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height);
    eLayer.fillAll("#C0C0C0".toCss());
    eLayer.opacity = 75;
    p = AA.Sprite_UIText.prototype.defaultParams();
    p.size = {
      w: Graphics.width,
      h: 200
    };
    p.font.size = 72;
    eText = new AA.Sprite_UIText(p);
    eText.drawText('UI Editor');
    eText.y = Graphics.height / 2 - 100;
    eLayer.addChild(eText);
    return this.addChild(eLayer);
  };
  // * Сетка для визуальной привязки (для шага 10)
  _.createGrids = function() {
    this.xGrid = this.createGridSprite(10);
    return this.addChild(this.xGrid);
  };
  _.createGridSprite = function(size) {
    var drawLineHor, drawLineVert, grid, i, j, k, l, ref, ref1;
    grid = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height);
    drawLineVert = function(b, i) {
      return b.fillRect(0, i * size, b.width, 1, 'rgba(0, 0, 0, 1)');
    };
    drawLineHor = function(b, i) {
      return b.fillRect(i * size, 0, 1, b.height, 'rgba(0, 0, 0, 1)');
    };
    for (i = k = 0, ref = grid.b().height / size; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      drawLineVert(grid.bitmap, i);
    }
    for (j = l = 0, ref1 = grid.b().width / size; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
      drawLineHor(grid.bitmap, j);
    }
    grid.visible = false;
    grid.opacity = 75;
    return grid;
  };
  // * В этом методе создаётся AA UI (не обновляемый)
  _.createUI = function() {
    this.uiSpriteset = new AA.Spriteset_UI();
    this.uiSpriteset.show(); // * Всегда видимый в редакторе
    this.addChild(this.uiSpriteset);
  };
  _.createXYHelpText = function() {
    var p;
    p = AA.Sprite_UITextWithBack.prototype.defaultParams();
    p.text.size.w = 80;
    p.rect.size.w = 80;
    p.rect.borderColor = "";
    p.text.textColor = "#FFFFFF".toCss();
    this.xyText = new AA.Sprite_UITextWithBack(p);
    this.xyText.fill("#C0C0C0".toCss());
    return this.addChild(this.xyText);
  };
  _.createTagHelpText = function() {
    var p;
    p = AA.Sprite_UITextWithBack.prototype.defaultParams();
    p.text.size.w = 120;
    p.rect.size.w = 120;
    p.rect.borderColor = "";
    p.text.textColor = "#FFFFFF".toCss();
    this.tagText = new AA.Sprite_UITextWithBack(p);
    this.tagText.fill("#808080".toCss());
    return this.addChild(this.tagText);
  };
})();

// ■ END Scene_UIEditor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_UIEditor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Scene_UIEditor.prototype;
  _.updateMain = function() {
    this.updateMouse();
    return this.updateXYText();
  };
  _.updateMouse = function() {
    this.xGrid.visible = false;
    if (this.isDrag === true) {
      this.updateDragEnd();
      return this.updateMouseDrag();
    } else {
      this.updateMouseHover();
      return this.updateDragStart();
    }
  };
  _.updateMouseHover = function() {
    var underMouse;
    this.elementUnderMouse = null;
    underMouse = this.elements().filter(function(e) {
      return e.isUnderMouse();
    });
    if (underMouse.isEmpty()) {
      return;
    }
    return this.elementUnderMouse = underMouse.last();
  };
  _.updateDragStart = function() {
    if (this.elementUnderMouse == null) {
      return;
    }
    if (!this.elementUnderMouse.isCanBeEdited()) {
      return;
    }
    if (TouchInput.isPressed()) {
      this.isDrag = true;
      this._lastElementPosition = this.elementUnderMouse.toPoint();
      // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
      this._deltaXY = this.getDeltaXY();
    }
  };
  _.getDeltaXY = function() {
    var dx, dy, x, y;
    ({x, y} = this.elementUnderMouse);
    dx = TouchInput.x - x;
    dy = TouchInput.y - y;
    return new KDCore.Point(dx, dy);
  };
  _.updateMouseDrag = function() {
    // * Проверка, есть ли элемент
    this.elementUnderMouse.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
    if (Input.isPressed('shift')) {
      this.applyMargin(2);
    } else if (Input.isPressed('control')) {
      this.applyMargin(10);
      this.xGrid.visible = true;
    }
    if (TouchInput.isCancelled()) {
      this.resetAfterDrag();
    }
  };
  // * Применить "привязывание" к координатам
  _.applyMargin = function(delta) {
    var x, y;
    ({x, y} = this.elementUnderMouse);
    while (x % delta !== 0) {
      x += 1;
    }
    while (y % delta !== 0) {
      y += 1;
    }
    return this.elementUnderMouse.move(x, y);
  };
  _.resetAfterDrag = function() {
    this.isDrag = false;
    TouchInput.clear();
    return this.elementUnderMouse.move(this._lastElementPosition);
  };
  _.updateDragEnd = function() {
    if (TouchInput.isReleased()) {
      this.isDrag = false;
      this.saveElementPosition(this.elementUnderMouse); //# -> @
    }
  };
  _.updateXYText = function() {
    var fillColor, t;
    fillColor = "#C0C0C0".toCss();
    this.tagText.visible = false;
    if (this.elementUnderMouse != null) {
      // * Показываем координаты элемента
      t = this.getXYTextFormat(this.elementUnderMouse);
      if (this.isDrag === true) {
        fillColor = "#008040".toCss();
      } else {
        if (this.elementUnderMouse.isCanBeEdited()) {
          fillColor = "#008080".toCss();
        } else {
          fillColor = "#FF8080".toCss();
        }
        this.tagText.draw(this.elementUnderMouse.tag);
        this.tagText.visible = true;
      }
    } else {
      t = this.getXYTextFormat(TouchInput);
    }
    this.xyText.fill(fillColor);
    this.xyText.draw(t);
    return this.moveXYTextHelp();
  };
  _.moveXYTextHelp = function() {
    this.xyText.move(TouchInput.x + 16, TouchInput.y + 16);
    this.tagText.move(this.xyText.x - 20, this.xyText.y + this.xyText.realHeight());
    // * Если слишком низки (за экран выходит)
    if (this.tagText.y + this.tagText.realHeight() > Graphics.height) {
      this.xyText.y = TouchInput.y - 16 - this.xyText.realHeight();
      this.tagText.y = this.xyText.y + this.xyText.realHeight();
    }
  };
  _.getXYTextFormat = function(point) {
    var x, y;
    ({x, y} = point);
    return "X:" + x + " ; Y:" + y;
  };
})();

// ■ END Scene_UIEditor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_AADamagePopUpItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Sprite_AADamagePopUpItem;

Sprite_AADamagePopUpItem = class Sprite_AADamagePopUpItem extends KDCore.Sprite {
  constructor(settings1, value1) {
    super();
    this.settings = settings1;
    this.value = value1;
    this._init();
    this._createSprites();
    this._start();
  }

  dispose() {
    var ref;
    this.disposed = true;
    this.visible = false;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
  }

  update() {
    super.update();
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    this.thread.update();
    this._updateZoom();
    this._updateImageFadeIn();
  }

  // * Установить позицию и применить случайный сдвиг координат
  setStartPoint(x, y) {
    this.move(x, y);
    if (this.settings.randDX > 0) {
      this.x = this.x + Math.randomInt(this.settings.randDX) - Math.randomInt(this.settings.randDX * 2);
    }
    if (this.settings.randDY > 0) {
      this.y = this.y + Math.randomInt(this.settings.randDY);
    }
  }

  // * Общие методы создания Pop объекта
  // * Находяться прямо в классе, чтобы не создавать доп. менеджер
  static CreateOnCharacter(char, settings, value) {
    var charSprite, e, spriteset, x, y;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (char == null) {
        return;
      }
      spriteset = $gameMap.spriteset();
      charSprite = spriteset.findTargetSprite(char);
      if (charSprite == null) {
        return;
      }
      ({x, y} = charSprite);
      y = y - charSprite.patternHeight() - $gameMap.tileWidth() / 2;
      return Sprite_AADamagePopUpItem.CreateOnScreen(x, y, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnMap(x, y, settings, value) {
    var e, screenX, screenY, tempChar;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      tempChar = new Game_Character();
      tempChar.setPosition(x, y);
      screenX = tempChar.screenX();
      screenY = tempChar.screenY() - $gameMap.tileWidth();
      return Sprite_AADamagePopUpItem.CreateOnScreen(screenX, screenY, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnScreen(x, y, settings, value) {
    var e, popItem, spriteset;
    try {
      if (settings == null) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      popItem = new Sprite_AADamagePopUpItem(settings, value);
      popItem.setStartPoint(x, y);
      spriteset = $gameMap.spriteset();
      return spriteset.aaGetDamagePopUpLayer().addChild(popItem);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_AADamagePopUpItem.prototype;
  _._init = function() {
    this.disposed = false;
    this.isNeedZoom = true;
    this.stayTime = 0;
    this.maxStayTime = this.settings.stayTime; // * 60
  };
  _._createSprites = function() {
    var e;
    if (this.settings == null) {
      return;
    }
    // * Используется для расчёта размера текста
    this.bitmap = new Bitmap(50, 50);
    this.anchor.set(0.5);
    try {
      this.bitmap.fontSize = Math.max(this.settings.text.fontSize, this.settings.changeFontSize);
      this._createValueText();
      if ((this.settings.image != null) && String.any(this.settings.image.name)) {
        return this._createImage();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._createValueText = function() {
    var e, h, w;
    try {
      w = this.bitmap.measureTextWidth(this.value) + 4;
      h = this.settings.text.fontSize + 10;
      this.valueSprite = KDCore.Sprite.FromBitmap(w, h);
      this.valueSprite.anchor.set(0.5);
      this.applyTextSettingsByJson(this.valueSprite, this.settings);
      this.valueSprite.onReady(this._drawValue.bind(this));
      return this.add(this.valueSprite);
    } catch (error) {
      e = error;
      AA.w(e);
      return this.valueSprite = new Sprite();
    }
  };
  _._drawValue = function() {
    this.valueSprite.clear();
    return this.valueSprite.drawTextFull(this.value, this.settings.text.position);
  };
  _._createImage = function() {
    var e, settings;
    try {
      settings = this.settings.image;
      this.imageSprite = KDCore.Sprite.FromImg(settings.name);
      this.imageSprite.x = settings.marginX;
      this.imageSprite.y = settings.marginY;
      this.imageSprite.anchor.set(0.5);
      this.imageSprite.opacity = 0;
      return this.add(this.imageSprite);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._start = function() {
    this.thread = new KDCore.TimedUpdate(2, this._updateLife.bind(this));
  };
  _._updateLife = function() {
    // * Сперва идёт анимация увеличения, затемм только отсчёт таймера
    if (this.isNeedZoom === true) {
      return;
    }
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    if (this.maxStayTime <= 0) {
      this.dispose();
    } else {
      if (this.stayTime++ < this.maxStayTime) {
        return;
      }
    }
    this._updateOpacity();
    this._updateMoveUp();
    if (this.opacity <= 0) {
      this.dispose();
    }
  };
  _._updateOpacity = function() {
    var e;
    try {
      // * Если не надо, то сразу исчезает
      if (this.settings.noFadeOut === true) {
        this.opacity = 0;
      } else {
        this.opacity -= 25;
      }
    } catch (error) {
      e = error;
    }
  };
  _._updateMoveUp = function() {
    var e;
    if (this.settings.noFlyUp === true) {
      return;
    }
    try {
      this.move(this.x, this.y - 1);
    } catch (error) {
      e = error;
    }
  };
  _._updateZoom = function() {
    var b, e;
    if (!this.isNeedZoom) {
      return;
    }
    try {
      b = this.valueSprite.bitmap;
      if (b.fontSize === this.settings.changeFontSize) {
        this.isNeedZoom = false;
        return;
      }
      if (b.fontSize < this.settings.changeFontSize) {
        b.fontSize = b.fontSize + 1;
      } else if (b.fontSize > this.settings.changeFontSize) {
        b.fontSize = b.fontSize - 1;
      }
      this._drawValue();
    } catch (error) {
      e = error;
    }
  };
  _._updateImageFadeIn = function() {
    var e;
    try {
      if (this.imageSprite == null) {
        return;
      }
      if (this.imageSprite.opacity >= 255) {
        return;
      }
      this.imageSprite.opacity += this.settings.image.fadeInSpeed;
    } catch (error) {
      e = error;
    }
  };
})();

// ■ END Sprite_AADamagePopUpItem.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Sprite_AAMapSkill2Projectile;

Sprite_AAMapSkill2Projectile = class Sprite_AAMapSkill2Projectile extends Sprite {
  constructor(mapIndex) {
    super();
    this.mapIndex = mapIndex;
    this.skill = $gameMap.aaMapSkills()[this.mapIndex];
    this._id = this.skill.id();
    this._ended = false;
    this._hasHit = false;
    this._initParams();
    this._setupImage();
    this._setupDirection();
    this._collisionDetectionThread = new KDCore.TimedUpdate(2, this._checkCollision.bind(this));
    this._updatePosition();
    if (this._frames != null) {
      this._updateFrame();
    }
    return;
  }

  // * Навыв завершён (достиг цели или расстояния)
  isEnd() {
    return this._ended === true;
  }

  update() {
    super.update();
    this._updatePosition();
    if (this._frames != null) {
      this._updateFrame();
    }
    if (this._hasHit === true) {
      // * Зануляем принудительно, если достиг цели
      this.skill.totalFlyTime = 0;
    } else {
      this._updateMove();
      this._collisionDetectionThread.update();
      this.skill.totalFlyTime -= 1;
    }
    this._updateEnd();
  }

};

(function() {  
  //TODO: СИСТЕМАТИЗАЦИЯ И КОММЕНТАРИИ

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Sprite_AAMapSkill2Projectile.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Sprite_AAMapSkill2Projectile.prototype;
  _._initParams = function() {
    this._framesBeforeStartFadeToEnd = 5;
    // * FROM START SUBJECT OFFSET ?
    //TODO: С события можно считать (с врага), а с игрока как?
    this._yOffset = 0;
    // * Получается всегда, так как навыки могут только персонажи использовать
    this._yOffsetChar = false; //always? #@skill.isCharPoint
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.z = this.skill.zLevel();
    this._hitDist = this.skill.hitOffset();
  };
  _._setupImage = function() {
    this._setupAnimatedImg();
    this.bitmap = ImageManager.loadPicture(this.skill.image());
  };
  _._setupAnimatedImg = function() {
    var frames;
    this._curFrame = 0;
    this._frameTimer = 0;
    frames = this.skill.image().match(/\((.*)\)/i);
    if (frames != null) {
      frames = frames[1].split(',');
      this._frames = Number(frames[0]);
      this._frameSpeed = Number(frames[1]);
    }
  };
  _._setupDirection = function() {
    var eX, eY, sX, sY, yo;
    //yo = if @_yOffset and @_yOffsetChar then @_yOffset / 48 else 0
    yo = 0;
    eX = this.skill.scX;
    eY = this.skill.scY;
    sX = this.skill.x;
    sY = this.skill.y;
    this._angle = Math.atan2(eY - yo - sY, eX - sX) * 180 / Math.PI;
    //pi = Math.PI / 180
    //TODO: pi
    this.rotation = (this._angle + 90) * Math.PI / 180;
    this.dx = this.skill.speed() * Math.cos(this._angle * Math.PI / 180);
    this.dy = this.skill.speed() * Math.sin(this._angle * Math.PI / 180);
  };
  _._updatePosition = function() {
    this.x = this.skill.x - $gameMap.displayX() * $gameMap.tileWidth();
    this.y = this.skill.y - $gameMap.displayY() * $gameMap.tileWidth() + this._yOffset;
  };
  _._updateMove = function() {
    this.skill.x += this.dx;
    this.skill.y += this.dy;
  };
  _._updateFrame = function() {
    var ph, pw, sx, sy;
    pw = this.bitmap.width / this._frames;
    ph = this.bitmap.height;
    sx = this._curFrame * pw;
    sy = 0;
    if (this._frameTimer >= this._frameSpeed) {
      this._frameTimer = 0;
      this._curFrame = this._curFrame >= this._frames - 1 ? 0 : this._curFrame + 1;
    }
    this.setFrame(sx, sy, pw, ph);
    this._frameTimer += 1;
  };
  _._updateEnd = function() {
    var x, y;
    if (this.skill.totalFlyTime > 0) {
      return;
    }
    if (this._framesBeforeStartFadeToEnd < 0) {
      this.opacity -= 40;
      if (this.opacity <= 0) {
        this._ended = true;
        // * Если навык без контактный и его "время" закончено, он должен сработать всё равно
        if (this._hasHit === false && this.skill.isNoContact()) {
          x = Math.floor(this.skill.x / $gameMap.tileWidth());
          y = Math.floor(this.skill.y / $gameMap.tileWidth());
          this.onHit({x, y});
        }
        return AA.EV.call("MapSkillsRequestsClean");
      }
    } else {
      return this._framesBeforeStartFadeToEnd -= 1;
    }
  };
  _._checkCollision = function() {
    var event, map, playerHit, point, x, y;
    if (this.opacity < 255) {
      return;
    }
    playerHit = this._checkHitPlayer();
    if (playerHit === true) {
      "PLAYER HIT".p();
      this.onHit($gamePlayer);
      return;
    }
    // * Для оптимизации, считаем один раз тут, а не в каждом методе
    x = Math.floor(this.skill.x / $gameMap.tileWidth());
    y = Math.floor(this.skill.y / $gameMap.tileWidth());
    map = this._checkHitMap(x, y);
    if (map === true) {
      "MAP OBSTCL HIT".p();
      this.onHit({x, y});
      return;
    }
    point = this._checkHitPoint(x, y);
    if (point === true) {
      "POINT HIT".p();
      this.onHit({x, y});
      return;
    }
    event = this._checkHitEvent();
    if (event != null) {
      "EVENT HIT".p();
      this.onHit(event);
    }
  };
  // * Когда достиг игрока
  _._checkHitPlayer = function() {
    var dist;
    if (this.skill.isSubjectIsPlayer()) {
      //TODO: friendlyfier is 1
      return false;
    }
    dist = AATargetsManager.getScreenExtDistance($gamePlayer, $gameTemp.aaProjYOff, this.x, this.y);
    return dist < this._hitDist && this.isSameMapLevel($gamePlayer._priorityType);
  };
  // * Когда достиг точки на карте (указанной как цель)
  _._checkHitPoint = function(tx, ty) {
    if (!this.skill.isCanHitPoint()) {
      return false;
    }
    return this.skill.tX === tx && this.skill.tY === ty;
  };
  // * Когда препятсвие на карте (Регион или Terrain)
  _._checkHitMap = function(tx, ty) {
    return this.skill.isHaveRegion($gameMap.regionId(tx, ty)) || this.skill.isHaveTerrain($gameMap.terrainTag(tx, ty));
  };
  // * Когда достиг события
  _._checkHitEvent = function() {
    var dist, ev, i, len, ref, subId;
    subId = this.skill.getSubjectEvId();
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      if (ev.eventId() === subId) {
        // * В себя нельзя попасть
        continue;
      }
      dist = AATargetsManager.getScreenExtDistance(ev, $gameTemp.aaProjYOff, this.x, this.y);
      if (dist < this._hitDist && this.isEventIsObstacle(ev)) {
        return ev;
      }
    }
    return null;
  };
  _.isSameMapLevel = function(priorityType) {
    if (this.z <= 2) {
      // * Ниже персонажей
      return priorityType === 0;
    }
    if (this.z <= 4) {
      // * На одном уровне
      return priorityType === 1;
    }
    // * Выше
    return priorityType === 3;
  };
  // * Блокирует ли событие Projectile ?
  _.isEventIsObstacle = function(event) {
    if (event._erased) {
      return false;
    }
    if (event.isThrough()) {
      return false;
    }
    if (event._aaMapSkillVectorBlockList == null) {
      return this.isSameMapLevel(event._priorityType);
    } else {
      if (event._aaMapSkillVectorBlockList.isEmpty()) {
        return false;
      }
      return !event._aaMapSkillVectorBlockList.contains(this.skill.id());
    }
  };
  _.onHit = function(target) {
    this._hasHit = true;
    this.opacity = 0;
    "HIT".p();
    console.info(target);
    AABattleActionsManager.applySkillAction(this.skill.getSubject(), target, this.skill.aaSkill);
    // * Vector On Hit Actions работают отдельно, не в AABattleActionsManager
    if (target instanceof Game_Event) {
      target.aaOnVectorHit(this.skill.id());
    }
  };
})();

// ■ END Sprite_AAMapSkill2Projectile.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для показа базовых параметров игрока HP, MP, TP
(function() {
  var Sprite_ActorStateGauge;
  Sprite_ActorStateGauge = class Sprite_ActorStateGauge extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    //TODO: Переделать вывод значения как у Enemy Mini HP
    defaultParams() {
      return {
        visible: true,
        position: {
          x: 304,
          y: 560
        },
        label: "Player_HPGaugeLabel",
        labelMargins: {
          x: -33,
          y: 5
        },
        isCanBeEdited: true,
        isHideWithMessage: true,
        text: {
          visible: true,
          size: {
            w: 100,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_0",
            size: 13,
            italic: false
          },
          margins: {
            x: 10,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#edead8".toCss()
        },
        gauge: {
          visible: true,
          fill: "Player_HPGauge",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 160,
          vertical: false
        }
      };
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    drawGauge(percent) {
      return this.gauge.draw(percent);
    }

    drawText(text) {
      return this.text.draw(text);
    }

  };
  AA.link(Sprite_ActorStateGauge);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_ActorStateGauge.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createGauge();
    this._createText();
    this._createLabel();
    return this.move(this.params.position);
  };
  _._createGauge = function() {
    this.gauge = new AA.Sprite_UIGauge(this.params.gauge);
    return this.add(this.gauge);
  };
  _._createText = function() {
    this.text = new AA.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
  _._createLabel = function() {
    var label;
    if (String.isNullOrEmpty(this.params.label)) {
      return;
    }
    label = new AA.Sprite_UIImage();
    label.draw(this.params.label);
    label.move(this.params.labelMargins);
    return this.add(label);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для показа иконки состояния или баффа игрока
(function() {
  var Sprite_ActorStateIcon;
  Sprite_ActorStateIcon = class Sprite_ActorStateIcon extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
      this._lastIconIndex = 0;
      this._lastTextValue = null;
    }

    defaultParams() {
      return {
        visible: true,
        position: {
          x: 0,
          y: 0
        },
        isCanBeEdited: true,
        text: {
          visible: true,
          size: {
            w: 38,
            h: 14
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 16,
            italic: false
          },
          margins: {
            x: -2,
            y: -4
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#fafdec".toCss()
        },
        icon: {
          visible: true,
          index: 0,
          size: 32
        }
      };
    }

    draw(iconIndex, text) {
      if (this._lastIconIndex !== iconIndex) {
        this.drawIcon(iconIndex);
        this._lastIconIndex = iconIndex;
      }
      if (this._lastTextValue !== text) {
        if ((text != null) && isFinite(text)) {
          this.drawText(KDCore.Utils.convertTimeShort(text));
        } else {
          this.drawText(text);
        }
        return this._lastTextValue = text;
      }
    }

    drawIcon(index) {
      return this.icon.draw(index);
    }

    drawText(text) {
      return this.text.draw(text);
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

  };
  AA.link(Sprite_ActorStateIcon);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_ActorStateIcon.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createIcon();
    this._createText();
    return this.move(this.params.position);
  };
  _._createIcon = function() {
    this.icon = new AA.Sprite_UIIcon(this.params.icon);
    return this.add(this.icon);
  };
  _._createText = function() {
    this.text = new AA.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    AA.EV.subscribeFor("PlayerSkillSelector", this.gev_onPlayerSkillSelector.bind(this));
    return AA.EV.subscribeFor("UnderMouseEventChanged", this.gev_onUnderMouseEventChanged.bind(this));
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    // * Если в зоне навыка, подсвечиваться
    this._aaUpdate();
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
  // * Создать дополнительные спрайты для ABS системы
  _.initABS = function() {
    return this._aaSetupExtraInfo();
  };
  _.isPlayer = function() {
    return this._character === $gamePlayer;
  };
  _.isABSEntity = function() {
    return (this._character != null) && this._character.isABS() && (this._character.AABattler() != null);
  };
  //TODO: this two methods
  _.isAllyParty = function() {
    return false;
  };
  _.isEnemy = function() {
    return false;
  };
  _._aaUpdate = function() {
    this._aaUpdateSelectionBlend();
    this._aaUpdateDamagePopUps();
    this._aaUpdateSpriteEffects();
  };
  _._aaUpdateDamagePopUps = function() {
    var b, data;
    if (!this.isABSEntity()) {
      return;
    }
    b = this._character.AABattler();
    if (!b.isDamagePopupRequested()) {
      return;
    }
    data = AADamagePopUpFactory.createDamagePopUpData(b);
    if (data != null) {
      Sprite_AADamagePopUpItem.CreateOnCharacter(this._character, data.settings, data.value);
    }
    this._aaRefreshExtraInfoOnDamage();
    b.clearDamagePopup();
    b.clearResult();
  };
  // * Если спрайт в зоне навыка, то подсвечивать его
  //?DYNAMIC
  _._aaUpdateSelectionBlend = function() {}; // * DUMMY
  _._aaUpdateSelectionBlendBody = function() {
    if ($gameTemp._aaSkillSelectorTargets == null) {
      return;
    }
    if ($gameTemp._aaSkillSelectorTargets.contains(this._character)) {
      return this._aaSetSelectionBySkill();
    } else {
      return this._aaResetSelectionBySkill();
    }
  };
  _._aaSetSelectionBySkill = function() {
    // * Сохраняем оригинальный цвет
    if (this.__originalBlend == null) {
      this.__originalBlend = this.getBlendColor();
    }
    this.setBlendColor(this._aaSelectBlendColor);
  };
  _._aaResetSelectionBySkill = function() {
    if (this.__originalBlend == null) {
      return;
    }
    this.setBlendColor(this.__originalBlend);
    return this.__originalBlend = null;
  };
  _.gev_onPlayerSkillSelector = function() {
    var arr;
    if (!$gamePlayer.isInSkillTargetingState()) {
      this._aaResetSelectionBySkill();
      // * Больше этот метод не будет работать
      return this._aaUpdateSelectionBlend = function() {};
    } else {
      //TODO: Один раз цвет конвертировать и сохранять в $gameTemp
      this._aaSelectBlendColor = KDCore.Color.FromHex($gamePlayer.activeAASkill().selectorColor);
      arr = [...this._aaSelectBlendColor.ARR];
      arr[3] = 150;
      this._aaSelectBlendColor = arr;
      // * Подключаем метод обновления
      return this._aaUpdateSelectionBlend = this._aaUpdateSelectionBlendBody;
    }
  };
  _.gev_onUnderMouseEventChanged = function() {
    var e;
    try {
      return this._aaRefreshExtraInfoState();
    } catch (error) {
      e = error;
      return AA.w(e);
    }
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
  _._aaUpdateSpriteEffects = function() {
    this._aaUpdateSpriteEffectValues();
    if (this._character.aaIsShakeRequested()) {
      this._aaUpdateSpriteShakeEffect();
    }
    if (this._character.aaIsShatterRequested()) {
      this._aaStartSpriteShatterEffect();
    }
  };
  // * Применение дополнительных значений к базовым
  _._aaUpdateSpriteEffectValues = function() {
    this.x += this._character.aaMotionDX();
  };
  _._aaUpdateSpriteShakeEffect = function() {
    var remainingTime;
    this._character._aaShakeEffectData[0] -= 1;
    remainingTime = this._character._aaShakeEffectData[0];
    this._character._aaShakeEffectData[1] += Math.round(remainingTime * 0.4 * Math.cos(remainingTime));
    if (this._character._aaShakeEffectData[0] <= 0) {
      // * Возвращаем на 0, когда время вышло
      this._character._aaShakeEffectData[1] = 0;
    }
  };
  _._aaStartSpriteShatterEffect = function() {
    $gameMap.spriteset().aaCreateShatterEffect(this);
    this._character.aaOnShatterEffectCreated();
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
  _._aaSetupExtraInfo = function() {
    if (!this.isABSEntity()) {
      return;
    }
    // * Игрок не имеет дополнительной информации
    if (this.isPlayer()) {
      return;
    }
    this._characterAASettings = this._character.AAEntity().model();
    if (this._characterAASettings == null) {
      return;
    }
    this._aaSetupMiniHpGauge();
  };
  _._aaSetupMiniHpGauge = function() {
    if (!AA.PP.getMiniHpGaugeSettings().active) {
      return;
    }
    //if @_characterAASettings. #TODO: settings
    this.aaMiniHPGauge = new AA.Sprite_CharacterMiniGauge();
    this.aaMiniHPGauge.setupController(this._character.AABattler(), "hpRate");
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === true) {
      this._aaMiniHpShowHideOnHover = true;
      this.aaMiniHPGauge.hideInstant();
    }
    return this.addChild(this.aaMiniHPGauge);
  };
  _._aaRefreshExtraInfoState = function() {
    // * Использую как флаг, что у спрайта есть АБС персонаж
    if (this._characterAASettings == null) {
      return;
    }
    if (!this._aaMiniHpShowHideOnHover) {
      return;
    }
    if ($gameTemp._aaEventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor === this._character) {
        this.aaMiniHPGauge.showSlow();
      } else {
        this.aaMiniHPGauge.hideSlow();
      }
    } else {
      this.aaMiniHPGauge.hideSlow();
    }
  };
  _._aaRefreshExtraInfoOnDamage = function() {
    if (this.aaMiniHPGauge == null) {
      return;
    }
    this.aaMiniHPGauge.refreshValues();
    // * Если всегда видно, то нет смысла
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === false) {
      return;
    }
    // * Только если опция включена
    if (!AA.PP.getMiniHpGaugeSettings().showOnDamage) {
      return;
    }
    this.aaMiniHPGauge.showAndHide();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для показа полоски здоровья над персонажами на карте
// * Имеет свой встроенный контроллер
(function() {
  var Sprite_CharacterMiniGauge;
  //rev 30.06.2021
  Sprite_CharacterMiniGauge = class Sprite_CharacterMiniGauge extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
      // * По умолчанию нету доп. смещения
      // * (у каждого события может быть своё, это см. в Model)
      this.setExtraMargins(0, 0);
      return;
    }

    setupController(battler, rateGetter) {
      this.battler = battler;
      this.rateGetter = rateGetter;
      // * Если изначально в параметрах visible == false, то ничего
      if (!this.isActive()) {
        return;
      }
      this.visible = this.battler != null;
      this.controllerThread = new KDCore.TimedUpdate(10, this.refreshValues.bind(this));
    }

    defaultParams() {
      return {
        visible: true,
        position: {
          x: -19,
          y: -56
        },
        label: null,
        labelMargins: {
          x: 0,
          y: 0
        },
        // * TEXT не используется в этой реализации
        text: {
          visible: false,
          size: {
            w: 100,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_0",
            size: 13,
            italic: false
          },
          margins: {
            x: 10,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#edead8".toCss()
        },
        gauge: {
          visible: true,
          fill: "Event_HPGauge2",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 160,
          vertical: false
        }
      };
    }

    setExtraMargins(dx, dy) {
      this.dx = dx;
      this.dy = dy;
    }

    refreshPosition(x, y) {
      // * Настройки сперва (смещение)
      this._resetPosition();
      // * Затем координаты на экране
      this.x += x;
      this.y += y;
      // * Теперь дополнительные настройки
      this.x += this.dy;
      this.y += this.dy;
    }

    showInstant() {
      return this.visible = true;
    }

    showSlow() {
      if (this.visible === true && this.opacity >= 255) {
        return;
      }
      this.refreshValues();
      this.visible = true;
      this.changer = new AA.Changer(this);
      this.changer.change('opacity').from(0).to(255).step(35).start();
      this.showHideThread = null;
    }

    hideInstant() {
      return this.visible = false;
    }

    hideSlow() {
      if (this.visible === false) {
        return;
      }
      if (this.showHideThread != null) {
        return;
      }
      if (this.opacity <= 0) {
        return;
      }
      this.changer = new AA.Changer(this);
      this.changer.change('opacity').from(this.opacity).to(0).step(45).start().done(() => {
        return this.visible = false;
      });
    }

    showAndHide() {
      if (this.visible === true) {
        return;
      }
      if (this.showHideThread != null) {
        return;
      }
      this.showSlow();
      this.showHideThread = new KDCore.TimedUpdate(60, this._hideAfterTime.bind(this));
      this._updateShowHide = this._updateShowHideBody;
    }

    drawGauge(percent) {
      return this.gauge.draw(percent);
    }

    drawText(text) {
      return this.text.draw(text);
    }

    //TODO: Динамическую смену
    refreshValues() {
      var newRate;
      if (this.__prevRate == null) {
        this.__prevRate = this.battler[this.rateGetter]();
        this.drawGauge(this.__prevRate);
      } else {
        newRate = this.battler[this.rateGetter]();
        //TODO: animated?
        //if newRate < @__prevRate
        //    diff = @__prevRate - newRate
        if (newRate !== this.__prevRate) {
          this.__prevRate = newRate;
          this.drawGauge(newRate);
        }
      }
    }

    update() {
      var ref;
      super.update();
      this._updateController();
      this._updateShowHide();
      if ((ref = this.changer) != null) {
        ref.update();
      }
    }

  };
  AA.link(Sprite_CharacterMiniGauge);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Sprite_CharacterMiniGauge.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_CharacterMiniGauge.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createGauge();
    this._createText();
    this._createLabel();
    return this.move(this.params.position);
  };
  _._createGauge = function() {
    this.gauge = new AA.Sprite_UIGauge(this.params.gauge);
    return this.add(this.gauge);
  };
  _._createText = function() {
    this.text = new AA.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
  _._createLabel = function() {
    var label;
    if (String.isNullOrEmpty(this.params.label)) {
      return;
    }
    label = new AA.Sprite_UIImage();
    label.draw(this.params.label);
    label.move(this.params.labelMargins);
    return this.add(label);
  };
  _._updateController = function() {
    if (!this.isActive()) {
      return;
    }
    if (this.battler == null) {
      return;
    }
    return this.controllerThread.update();
  };
  _._hideAfterTime = function() {
    this.showHideThread = null;
    return this.hideSlow();
  };
  //?DYNAMIC
  _._updateShowHide = function() {}; // * EMPTY
  _._updateShowHideBody = function() {
    var ref;
    return (ref = this.showHideThread) != null ? ref.update() : void 0;
  };
})();

// ■ END Sprite_CharacterMiniGauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для отображения информации о враге на экране (портрет, здоровье и т.д.)
(function() {
  var Sprite_EnemyInfo;
  Sprite_EnemyInfo = class Sprite_EnemyInfo extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    defaultParams() {
      return {
        visible: true,
        position: {
          x: 640,
          y: 66
        },
        image: "Enemy_Background",
        isCanBeEdited: true,
        isHideWithMessage: true,
        nameFormat: "%1",
        levelFormat: "Lv. %1",
        hpTextFormat: "%1 / %2", // * %3 - Для процента, %1 - текущее, %2 - максимум
        nameText: {
          visible: true,
          size: {
            w: 100,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_2",
            size: 16,
            italic: false
          },
          margins: {
            x: 10,
            y: 6
          },
          outline: {
            color: null,
            width: 3
          },
          textColor: "#d05816".toCss()
        },
        hpText: {
          visible: true,
          size: {
            w: 100,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_0",
            size: 13,
            italic: false
          },
          margins: {
            x: 12,
            y: 28
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#edead8".toCss()
        },
        levelText: {
          visible: true,
          size: {
            w: 100,
            h: 20
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 60,
            y: 4
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#edeb6a".toCss()
        },
        gauge: {
          visible: true,
          fill: "Player_HPGauge",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 160,
          vertical: false,
          margins: {
            x: 6,
            y: 28
          }
        },
        face: {
          visible: true,
          faceName: "",
          faceIndex: 0,
          mirror: false,
          size: 74,
          margins: {
            x: 92,
            y: 10
          }
        },
        battleState: {
          visible: true,
          image: "Enemy_BattleState_Free",
          margins: {
            x: 142,
            y: 60
          }
        },
        foregroundImage: {
          visible: false,
          image: "",
          margins: {
            x: 0,
            y: 0
          }
        }
      };
    }

    //TODO: Уже есть в двух классах, может вынести на UIElement ???
    //(Sprite_CharacterMiniGauge)
    showSlow() {
      if (this.visible === true && this.opacity >= 255) {
        return;
      }
      this.visible = true;
      this.changer = new AA.Changer(this);
      this.changer.change('opacity').from(0).to(255).step(35).start();
    }

    hideSlow() {
      if (this.visible === false) {
        return;
      }
      if (this.opacity <= 0) {
        return;
      }
      this.changer = new AA.Changer(this);
      this.changer.change('opacity').from(this.opacity).to(0).step(45).start().done(() => {
        return this.visible = false;
      });
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    // * Value: level
    drawLevelWithFormat(value) {
      var ref;
      return (ref = this.levelText) != null ? ref.draw(this.params.levelFormat.replace("%1", value)) : void 0;
    }

    // * Values: current, max, rate
    drawHpWithFormat(value1, value2, value3) {
      var text;
      if (this.hpText == null) {
        return;
      }
      text = this.params.hpTextFormat.replace("%1", value1);
      if (value2 != null) {
        text = text.replace("%2", value2);
      }
      if (value3 != null) {
        text = text.replace("%3", value3);
      }
      return this.hpText.draw(text);
    }

    // * Value: name
    drawNameWithFormat(value) {
      var ref;
      return (ref = this.nameText) != null ? ref.draw(this.params.nameFormat.replace("%1", value)) : void 0;
    }

    drawFace(faceName, faceIndex) {
      var ref;
      return (ref = this.face) != null ? ref.draw(...arguments) : void 0;
    }

    //TODO: Отрисовка пользовательских картинок цели
    drawCustomImages() {}

    // * удаляются и отрисовываются заного
    update() {
      var ref;
      super.update();
      return (ref = this.changer) != null ? ref.update() : void 0;
    }

  };
  AA.link(Sprite_EnemyInfo);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_EnemyInfo.prototype;
  //$[OVER]
  _._createContent = function() {
    if (!this.isActive()) {
      return;
    }
    this._createBase();
    this._createGauge();
    this._createHpText();
    this._createFaceImage();
    this._createNameText();
    this._createLevelText();
    this._createBattleState();
    // * Слой для статусов и бафов
    this._statesLayer = new Sprite();
    this.addChild(this._statesLayer);
    // * Для пользовательских картинок из параметров конкретного монстра
    this._customImagesLayer = new Sprite();
    this.addChild(this._customImagesLayer);
    this._createForegroundImage();
    return this.move(this.params.position);
  };
  _._createBase = function() {
    this.base = new AA.Sprite_UIImage(this.params);
    this.add(this.base);
  };
  _._createGauge = function() {
    this.gauge = new AA.Sprite_UIGauge(this.params.gauge);
    this.gauge.move(this.params.gauge.margins);
    return this.add(this.gauge);
  };
  _._createHpText = function() {
    this.hpText = new AA.Sprite_UIText(this.params.hpText);
    return this.add(this.hpText);
  };
  _._createFaceImage = function() {
    this.face = new AA.Sprite_UIFace(this.params.face);
    this.face.move(this.params.face.margins);
    return this.add(this.face);
  };
  _._createNameText = function() {
    this.nameText = new AA.Sprite_UIText(this.params.nameText);
    return this.add(this.nameText);
  };
  _._createLevelText = function() {
    this.levelText = new AA.Sprite_UIText(this.params.levelText);
    return this.add(this.levelText);
  };
  _._createBattleState = function() {
    this.battleState = new AA.Sprite_UIImage(this.params.battleState);
    this.battleState.move(this.params.battleState.margins);
    return this.add(this.battleState);
  };
  // * Для пользователя, по умолчанию не используется
  _._createForegroundImage = function() {
    var foregroundImage;
    foregroundImage = new AA.Sprite_UIImage(this.params.foregroundImage);
    foregroundImage.move(this.params.foregroundImage.margins);
    return this.add(foregroundImage);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_PopTreasureItem;
  // * PopUp для предметов или текста, не используется для урона
  Sprite_PopTreasureItem = class Sprite_PopTreasureItem extends KDCore.Sprite {
    constructor(params) {
      super();
      this.params = params;
      this._isActive = true;
      // * Анимация запущена
      this._isStarted = false;
      this._init();
      return;
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        text: {
          visible: true,
          size: {
            w: 80,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#EAEAEA".toCss()
        },
        icon: {
          visible: true,
          index: 0,
          size: 14
        },
        countSymbol: "x",
        countText: {
          visible: true,
          size: {
            w: 50,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_0",
            size: 11,
            italic: false
          },
          margins: {
            x: 0,
            y: 2
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#BDFDFD".toCss()
        }
      };
    }

    // * Аналог !isDisposed()
    isActive() {
      return this._isActive === true;
    }

    // * Можно ли удалять popUp
    isDisposed() {
      return !this.isActive();
    }

    isStarted() {
      return this._isStarted === true;
    }

    setItem(item, count) {
      if (item == null) {
        return;
      }
      return this.set(item.name, item.iconIndex, count);
    }

    //TODO: Золото, опыт ???

      // * Задаём данные (текст, иконку, количество)
    set(text1, iconIndex, count1) {
      this.text = text1;
      this.iconIndex = iconIndex;
      this.count = count1;
      if (!String.any(this.text)) {
        return;
      }
      if (!this.isActive()) {
        return;
      }
      this._createPopItemContent();
    }

    start(effectParams) {
      this.effectParams = effectParams;
      if (!this.isActive()) {
        return;
      }
      return this._startEffect();
    }

    //stayTime
    //opacityChangeStep
    //moveStep

      // * Завершить работу popUp
    stop() {
      this._isStarted = false;
      this._isActive = false;
      this._updateEffect = function() {};
    }

    update() {
      super.update();
      return this._updateEffect();
    }

  };
  AA.link(Sprite_PopTreasureItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_PopTreasureItem.prototype;
  // * Подготовка элемента (проверка параметров)
  _._init = function() {
    var e;
    try {
      if (this.params == null) {
        return this.params = this.defaultParams();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  _._createPopItemContent = function() {
    var e;
    try {
      this._createMainText();
      if (this.textSpr == null) {
        return;
      }
      if (Number.prototype.any(this.iconIndex)) {
        this._createIcon();
      }
      if (this.count != null) {
        this._createCountText();
      }
      this._applyCenter();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.isActive = function() {
        return false;
      };
    }
  };
  _._createMainText = function() {
    // * Нет try, catch, потому что без основного текста, PopUp не может существовать
    // * Ошибка перехватывается выше и делает isActive = false
    this.textSpr = new AA.Sprite_UIText(this.params.text);
    this.textSpr.draw(this.text);
    // * Размер текста (нужен для автоцентровки)
    this._textWidth = this._getRealTextWidth(this.textSpr, this.text);
    this.addChild(this.textSpr);
  };
  _._getRealTextWidth = function(textSpr, text) {
    var textWidth;
    textWidth = textSpr._textSpr.bitmap.measureTextWidth(text);
    textWidth += textSpr.x;
    textWidth = Math.round(textWidth);
    return textWidth;
  };
  _._createIcon = function() {
    var e;
    try {
      this.iconSpr = new AA.Sprite_UIIcon(this.params.icon);
      this.iconSpr.draw(this.iconIndex);
      this.iconSpr.x -= this.params.icon.size + 1;
      // * Ставим иконку вертикально по центру
      this.iconSpr.y = this.params.text.size.h / 2;
      this.iconSpr.zeroChild().anchor.y = 0.5;
      return this.addChild(this.iconSpr);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createCountText = function() {
    var e, text;
    try {
      this.countTextSpr = new AA.Sprite_UIText(this.params.countText);
      text = this.params.countSymbol + this.count;
      this.countTextSpr.draw(text);
      this.countTextSpr.x += this._textWidth + 1;
      // * Не плюсуем, т.к. countTextSpr начинается уже после textSpr (x)
      this._textWidth = this._getRealTextWidth(this.countTextSpr, text);
      return this.addChild(this.countTextSpr);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._applyCenter = function() {
    var allWidth;
    //@setStaticAnchor(0.5, 0.5)
    allWidth = this._textWidth;
    this.x -= allWidth / 2;
    if (this.iconSpr != null) {
      this.x += this.params.icon.size / 2;
    }
  };
  _._startEffect = function() {
    if (this.effectParams == null) {
      return;
    }
    // * Эффект появления
    this._apperChanger = new AA.Changer(this);
    this._apperChanger.change('opacity').from(0).to(255).step(55).start();
    this._nextPhaseThread = new KDCore.TimedUpdate(this.effectParams.stayTime, this._startEndPhase.bind(this));
    this._nextPhaseThread.once();
    this._isStarted = true;
  };
  _._startEndPhase = function() {
    // * Затухание после показа
    this._fadeOutChanger = new AA.Changer(this);
    this._fadeOutChanger.change('opacity').from(255).to(0).step(this.effectParams.opacityStep).done(this.stop.bind(this)).start();
    // * Поднятие вверх после показа
    this._moveOutChanger = new AA.Changer(this);
    this._moveOutChanger.change('y').from(this.y).to(-Graphics.height - 100).step(this.effectParams.moveStep).done(this.stop.bind(this)).start();
  };
  _._updateEffect = function() {
    var ref, ref1;
    if (!this.isActive()) {
      return;
    }
    if (!this.isStarted()) {
      return;
    }
    this._apperChanger.update();
    this._nextPhaseThread.update();
    if ((ref = this._fadeOutChanger) != null) {
      ref.update();
    }
    return (ref1 = this._moveOutChanger) != null ? ref1.update() : void 0;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_SelectedCircle;
  
    // * Спрайт - круг на карте под выбранной целью
  Sprite_SelectedCircle = class Sprite_SelectedCircle extends KDCore.Sprite {
    constructor() {
      super();
      this.bitmap = this.defaultCircle();
      this.anchor.set(0.5);
      // * Изначально не видимый
      this.visible = false;
    }

    isActive() {
      return this.visible === true;
    }

    // * Установить цель (показать круг и переместить к цели)
    setTarget(char) {
      if ((char != null) && char.isABS()) {
        return this._linkToTarget(char);
      } else {
        return this._reset();
      }
    }

    resetTarget() {
      return this.setTarget(null);
    }

    defaultCircle() {
      return ImageManager.loadAA(this.defaultSettings().selectionImage);
    }

    //TODO: Учёт начальной видимости
    //TODO: Это из plugin parameters
    defaultSettings() {
      return {
        visible: true,
        selectionImage: "targetSelectedCircle",
        margins: {
          x: 0,
          y: 0
        },
        animation: true // * Это касается мерцания
      };
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  AA.link(Sprite_SelectedCircle);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SelectedCircle.prototype;
  _._reset = function() {
    this._updateMain = function() {};
    this.move(-100, -100);
    this.visible = false;
    this._deleteHpGauge();
  };
  _._linkToTarget = function(char) {
    var e;
    try {
      this.visible = false;
      this._targetSpr = char.AASprite();
      this._charSettings = char.AAEntity().model();
      //TODO: Определять видимость из параметров
      this._determineTargetColor(char);
      this._determineTargetImage();
      this._updateMain = this._updateWithTarget;
      if (this.defaultSettings().animation === true) {
        this._createOpacityChanger();
      }
      return this._updateWithTarget();
    } catch (error) {
      //TODO: TEMP
      //@_createHPMiniBar()
      e = error;
      KDCore.warning(e);
      return this._reset();
    }
  };
  _._createOpacityChanger = function() {
    this.changer = new AA.Changer(this);
    this.changer.change('opacity').from(255).to(150).step(5).reverse().repeat().start();
    this._updateOpacityEffect = () => {
      return this.changer.update();
    };
  };
  //?DYNAMIC
  _._updateMain = function() {}; // * EMPTY
  
  // * Перемещение к позиции цели
  _._updateWithTarget = function() {
    var e;
    this.move(this._targetSpr.x, this._targetSpr.y);
    try {
      if ((this._charSettings != null) && (this._charSettings.selectionOffset != null)) {
        this.x += this._charSettings.selectionOffset[0];
        this.y += this._charSettings.selectionOffset[1];
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return this._updateOpacityEffect();
  };
  //?DYNAMIC
  _._updateOpacityEffect = function() {}; // * EMPTY
  
  // * Определить какой цвет установить
  _._determineTargetColor = function(char) {
    var e;
    try {
      if ((this._charSettings != null) && String.any(this._charSettings.selectionColor)) {
        this._applyCustomColor(this._charSettings.selectionColor);
        return;
      }
      if (char.AABattler().isActor()) {
        this._applyAllyColor();
      } else {
        if ($gamePlayer.isMyEnemy(char)) {
          this._applyEnemyColor();
        } else {
          this._applyNetralColor();
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._applyUnknownColor();
    }
  };
  // * Определяет какую картинку выделения использовать
  _._determineTargetImage = function() {
    var e;
    try {
      if ((this._charSettings != null) && String.any(this._charSettings.selectionImage)) {
        this.bitmap = ImageManager.loadAA(this._charSettings.selectionImage);
      } else {
        this.bitmap = this.defaultCircle();
      }
      this.bitmap.addLoadListener(() => {
        return this.visible = true;
      });
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Цвет, когда выбран враг
  _._applyEnemyColor = function() {
    return this.setBlendColor(KDCore.Color.RED.ARR);
  };
  // * Когда выбран член партии
  _._applyAllyColor = function() {
    return this.setBlendColor(KDCore.Color.GREEN.ARR);
  };
  // * Когда выбран монстр с teamId == 0
  _._applyNetralColor = function() {
    return this.setBlendColor(KDCore.Color.AQUA.ARR);
  };
  // * В случае ошибки
  _._applyUnknownColor = function() {
    return this.setBlendColor(KDCore.Color.YELLOW.ARR);
  };
  
  // * Из настроек цели
  _._applyCustomColor = function(color) {
    var c;
    c = KDCore.Color.FromHex(color);
    return this.setBlendColor(c.ARR);
  };
  _._createHPMiniBar = function() {
    var data, hpBar, p;
    //TODO: Тут полный бардак, плюс этот метод не тут должен быть вообще!
    // * Сделано только для показа
    // Надо HP на спрайте отрисовывать
    this._deleteHpGauge();
    data = "miniHpGauge1";
    if (String.any(this._charSettings.miniHpGaugeStyle)) {
      data = this._charSettings.miniHpGaugeStyle;
    }
    p = AA.PP.uiData(data);
    p.position.x = this.x - 28;
    p.position.y = this.y - 62;
    if (this._charSettings.miniHPGaugeOffset != null) {
      p.position.x += this._charSettings.miniHPGaugeOffset[0];
      p.position.y += this._charSettings.miniHPGaugeOffset[1];
    }
    hpBar = new AA.Sprite_ActorStateGauge(p);
    this.parent.addChild(hpBar);
    return this.hpGauge = hpBar;
  };
  _._deleteHpGauge = function() {
    if (this.hpGauge != null) {
      return this.parent.removeChild(this.hpGauge);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_SkillImpactSelector;
  Sprite_SkillImpactSelector = class Sprite_SkillImpactSelector extends KDCore.Sprite {
    constructor() {
      super();
      this.anchor.set(0.5);
      this.visible = false;
      return;
    }

    activate(aaSkill) {
      this.aaSkill = aaSkill;
      this.visible = true;
      return this._applyStyle(this.aaSkill);
    }

    deactivate() {
      this.aaSkill = null;
      this.visible = false;
    }

    update() {
      super.update();
      if (!this.visible) {
        return;
      }
      return this.move(TouchInput);
    }

  };
  AA.link(Sprite_SkillImpactSelector);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SkillImpactSelector.prototype;
  // * Отрисовка зонвы выбора в зависимости от параметров навыка
  _._applyStyle = function({radius, selectorColor, selectorImg, selectorOpacity}) {
    this._applyRadius(radius);
    this._applyColor(selectorColor);
    this._applyImage(selectorImg);
    this.opacity = selectorOpacity;
  };
  _._applyRadius = function(radius) {
    if (radius <= 0) {
      this.bitmap = new Bitmap(0, 0);
    } else {
      this.bitmap = new Bitmap(radius * $gameMap.tileWidth(), radius * $gameMap.tileHeight());
    }
  };
  _._applyColor = function(color) {
    return this.bitmap.fillAll(color.toCss());
  };
  //TODO: If empty, load default from AABS folder
  return _._applyImage = function(image) {
    if (!String.any(image)) {
      this.bitmap = ImageManager.loadAA("RadiusSelect");
    } else {
      this.bitmap = ImageManager.loadPicture(image);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс ячейки быстрого доступа для АБС навыка (предмета)
//rev 07.07.21
(function() {
  var Sprite_SKillPanelItem;
  Sprite_SKillPanelItem = class Sprite_SKillPanelItem extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Позиция не определяется, так как каждый элемент имеет свою позицию
    defaultParams() {
      return {
        visible: true,
        isCanBeEdited: true,
        isHideWithMessage: true,
        outlineMargins: {
          x: -2,
          y: -2
        },
        iconMargins: {
          x: 2,
          y: 2
        },
        outlinePulseSpeed: 40,
        selectedOutlineColor: "#fcba03",
        clickedOutlineColor: "#0b03fc",
        readyOutlineColor: "#21b53c",
        badOutlineColor: "#d61a1a",
        icon: {
          visible: true,
          size: 32,
          index: 0
        },
        symbolText: {
          visible: true,
          size: {
            w: 20,
            h: 20
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 14,
            italic: false
          },
          margins: {
            x: 18,
            y: 22
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#e0cfbf".toCss()
        },
        timeText: {
          visible: true,
          size: {
            w: 32,
            h: 32
          },
          alignment: "center",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 2,
            y: 2
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#fcba03".toCss()
        },
        countText: {
          visible: true,
          size: {
            w: 32,
            h: 32
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 0,
            y: -6
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#eb852d".toCss()
        }
      };
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    //$[OVER]
    isUnderMouse() {
      return this.button.isUnderMouse();
    }

    pulseClick() {
      return this.notifyOutline.pulse(this._clickedColor, this.params.outlinePulseSpeed);
    }

    pulseReady() {
      return this.notifyOutline.pulse(this._readyColor, this.params.outlinePulseSpeed);
    }

    pulseAlert() {
      return this.notifyOutline.pulse(this._badColor, this.params.outlinePulseSpeed);
    }

    hideOutline() {
      return this.notifyOutline.hide();
    }

    select() {
      return this.selectionOutline.show(this._selectionColor);
    }

    deselect() {
      return this.selectionOutline.hide();
    }

    clear() {
      this.enable();
      this.drawIcon(0);
      this.drawCount("");
      return this.drawTime("");
    }

    //@disable() #??? or @enable()
    //TODO: hide if option
    drawIcon() {
      return this.icon.draw(...arguments);
    }

    drawSymbol() {
      return this.text.draw(...arguments);
    }

    drawCount(a) {
      return this.countText.draw(...arguments);
    }

    drawTime() {
      return this.timeText.draw(...arguments);
    }

    disable() {
      this.button.disable();
      this.state.visible = true;
    }

    enable() {
      this.button.enable();
      this.state.visible = false;
    }

    switchState(isEnabled) {
      if (isEnabled === true) {
        if (this.isDisabled()) {
          this.enable();
          return true; // * Вновь доступна
        }
      } else {
        if (!this.isDisabled()) {
          this.disable();
        }
      }
      return false;
    }

    isDisabled() {
      return this.state.visible === true;
    }

  };
  AA.link(Sprite_SKillPanelItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SKillPanelItem.prototype;
  _._createContent = function() {
    this._initColors();
    this._createOutline();
    this._createMain();
    this._createIcon();
    //@_createImage() #TODO: if item have image instead icon
    // * Disabled darker hover image
    this._createState();
    this._createInfo();
  };
  _._initColors = function() {
    this._tryConvertColor("_selectionColor", "selectedOutlineColor");
    this._tryConvertColor("_clickedColor", "clickedOutlineColor");
    this._tryConvertColor("_readyColor", "readyOutlineColor");
    this._tryConvertColor("_badColor", "badOutlineColor");
  };
  _._tryConvertColor = function(colorFieldName, paramName) {
    var e;
    try {
      this[colorFieldName] = KDCore.Color.FromHex(this.params[paramName]).ARR;
    } catch (error) {
      e = error;
      AA.w(e);
      this[colorFieldName] = [0, 0, 0, 1];
    }
  };
  _._createOutline = function() {
    this.notifyOutline = new AA.Sprite_SkillPanelOutline();
    this.notifyOutline.move(this.params.outlineMargins);
    this.add(this.notifyOutline);
    this.selectionOutline = new AA.Sprite_SkillPanelOutline();
    this.selectionOutline.move(this.params.outlineMargins);
    this.add(this.selectionOutline);
  };
  _._createMain = function() {
    this.button = new KDCore.ButtonM("SkillSlot", false, "Alpha");
    this.button.addClickHandler(() => {
      return $gamePlayer.aaTryPerformSkill(this.skillId);
    });
    return this.add(this.button);
  };
  _._createIcon = function() {
    this.icon = new AA.Sprite_UIIcon(this.params.icon);
    this.icon.move(this.params.iconMargins);
    return this.add(this.icon);
  };
  _._createState = function() {
    this.state = new AA.Sprite_UIImage();
    this.state.draw("SkillSlot_Disabled");
    this.state.visible = false;
    return this.add(this.state);
  };
  _._createInfo = function() {
    this._createTimer();
    this._createCountText();
    return this._createSymbolText();
  };
  _._createTimer = function() {
    this.timeText = new AA.Sprite_UIText(this.params.timeText);
    return this.add(this.timeText);
  };
  _._createCountText = function() {
    this.countText = new AA.Sprite_UIText(this.params.countText);
    return this.add(this.countText);
  };
  _._createSymbolText = function() {
    this.text = new AA.Sprite_UIText(this.params.symbolText);
    return this.add(this.text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс подсветки (вокруг) ячейки быстрого доступа
//rev 07.07.21
(function() {
  var Sprite_SkillPanelOutline;
  Sprite_SkillPanelOutline = class Sprite_SkillPanelOutline extends AA.Sprite_UIImage {
    constructor() {
      super(...arguments);
      this.visible = false;
    }

    defaultParams() {
      return {
        visible: true,
        image: "SkillSlot_Outline"
      };
    }

    show(colorArr) {
      this.visible = true;
      if (this._changer != null) {
        this._changer = null;
      }
      this.setBlendColor(colorArr);
      this.opacity = 255;
    }

    hide() {
      if (this._changer != null) {
        this._changer = null;
      }
      return this.visible = false;
    }

    pulse(colorArr, speed) {
      this.show(colorArr);
      this.opacity = 0;
      this._changer = new AA.Changer(this);
      this._changer.change('opacity').from(0).to(255).step(speed).repeat(2).reverse();
      this._changer.start().done(() => {
        return this.hide();
      });
    }

    update() {
      var ref;
      super.update();
      return (ref = this._changer) != null ? ref.update() : void 0;
    }

  };
  AA.link(Sprite_SkillPanelOutline);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SkillPanelOutline.prototype;
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, ALIAS__createTilemap, ALIAS__createUpperLayer, ALIAS__initialize, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._aaMapAnimationSprites = [];
    this._aaMapSpriteEffects = [];
    this._aaMapDynamicSprites = [];
  };
  //@[ALIAS]
  ALIAS__createUpperLayer = _.createUpperLayer;
  _.createUpperLayer = function() {
    this.aaCreateExtraMapUpLayer();
    this.aaCreateDamagePopUpLayer();
    return ALIAS__createUpperLayer.call(this);
  };
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this);
    this.aaCreateExtraMapDownLayer();
    this.aaCreateSelectedCircle();
    this.aaCreateSkillImpactSelector();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    this.aaRefreshMapAnimation();
    this.aaUpdateShatterEffect();
    return this.aaUpdateDynamicSprites();
  };
  
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    this.aaCreateMapSkills();
    AA.EV.subscribeFor("MapSkillsRequestsClean", this._aaClearMapSkills.bind(this));
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  // * Регестрирует спрайт как статический на карте (не движется с экраном)
  // * Требует привязки к персонажу на карте, позволяет задать смещение
  _.aaRegisterDynamicSprite = function(sprite, character, dx = 0, dy = 0) {
    this._aaMapDynamicSprites.push(sprite);
    sprite._aaDynamicParent = character;
    sprite._aaDynX = dx;
    sprite._aaDynY = dy;
  };
  // * Обновление динамических спрайтов (обновление позиции относительно камеры)
  _.aaUpdateDynamicSprites = function() {
    var dx, dy, i, len, p, ref, sprite;
    ref = this._aaMapDynamicSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if ((sprite != null) && (sprite._aaDynamicParent != null)) {
        p = sprite._aaDynamicParent;
        dx = sprite._aaDynX;
        dy = sprite._aaDynY;
        sprite.move(p.screenX() + dx, p.screenY() + dy);
      } else {
        this._aaMapDynamicSprites.delete(sprite);
      }
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    // * Анимация на карте
    // -----------------------------------------------------------------------
    //TODO: Учёт позиционированния анимации ??? (см. в редакторе alignBottom)

    //TODO: Через GEvent событие? (оптимизация)
    _.aaRefreshMapAnimation = function() {
      if ($gameMap.aaIsMapAnimationRequested()) {
        this.aaSetupMapAnimation($gameMap.aaMapAnimations.shift());
      } else {
        this.aaClearMapAnimations();
      }
    };
    _.aaSetupMapAnimation = function(animationRequest) {
      var animation, animationId, spr, tempChar, x, y;
      if (animationRequest == null) {
        return;
      }
      ({x, y, animationId} = animationRequest);
      animation = $dataAnimations[animationId];
      if (animation == null) {
        KDCore.warning("Animation with ID " + animationId + " not found!");
        return;
      }
      // * Создаём временного персонажа как координата карты
      tempChar = new Game_Character();
      tempChar.setPosition(x, y);
      spr = new Sprite_Character(tempChar);
      this._aaMapAnimationSprites.push(spr);
      this._characterSprites.push(spr);
      this._effectsContainer.addChild(spr);
      AABattleActionsManager.playAnimationOnCharacter(tempChar, animationId);
    };
    // * Очистка анимаций карты
    _.aaClearMapAnimations = function() {
      if (this._aaMapAnimationSprites.length === 0) {
        return;
      }
      // * Если нет никаких анимаций на карте, то удаляем всех созданных "временных" персонажей для анимаций
      if (this._animationSprites.length === 0) {
        this._aaMapAnimationSprites = [];
      }
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    // * Дополнительные слои (под и над персонажами, но на карте)
    // -----------------------------------------------------------------------
    // * Под персонажами
    _.aaCreateExtraMapDownLayer = function() {
      this._aaLayer01 = new Sprite();
      this._aaLayer01.z = 1;
      this._tilemap.addChild(this._aaLayer01);
    };
    // * Над персонажами
    _.aaCreateExtraMapUpLayer = function() {
      this._aaLayer02 = new Sprite();
      this.addChild(this._aaLayer02);
    };
    _.aaCreateDamagePopUpLayer = function() {
      this._aaPopUpLayer = new Sprite();
      this._aaLayer02.addChild(this._aaPopUpLayer);
    };
    _.aaGetDamagePopUpLayer = function() {
      return this._aaPopUpLayer;
    };
    _.aaCreateSelectedCircle = function() {
      this._aaSelectedCircle = new AA.Sprite_SelectedCircle();
      this._aaLayer01.addChild(this._aaSelectedCircle);
      AA.UI.setSelectedCircle(this._aaSelectedCircle);
    };
    //TODO: Может над персонажами?
    _.aaCreateSkillImpactSelector = function() {
      this._aaSkillImpactSelector = new AA.Sprite_SkillImpactSelector();
      this._aaLayer01.addChild(this._aaSkillImpactSelector);
      AA.UI.setSkillImpactSelector(this._aaSkillImpactSelector);
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    
    // * Эффект Shatter на карте
    // -----------------------------------------------------------------------
    _.aaCreateShatterEffect = function(characterSprite) {
      var char, effectBase, i, j, k, l, len, maxw, pSize, part, ph, pw, ref, shatterEffectsSet, sx, sx2, sy, sy2, x, y, y3, y_perc;
      char = characterSprite._character;
      effectBase = new Sprite();
      this._tilemap.addChild(effectBase);
      this.aaRegisterDynamicSprite(effectBase, char, -characterSprite.width / 2, -characterSprite.height);
      x = char._aaShatterEffectData[3];
      y = char._aaShatterEffectData[4];
      shatterEffectsSet = [];
      pSize = 8;
      pw = characterSprite.patternWidth();
      ph = characterSprite.patternHeight();
      maxw = Math.floor((pw / pSize) * (ph / pSize));
      if (characterSprite._tileId > 0) {
        sx = (Math.floor(characterSprite._tileId / 128) % 2 * 8 + characterSprite._tileId % 8) * pw;
        sy = Math.floor(characterSprite._tileId % 256 / 8) % 16 * ph;
      } else {
        sx = (characterSprite.characterBlockX() + characterSprite.characterPatternX()) * pw;
        sy = (characterSprite.characterBlockY() + characterSprite.characterPatternY()) * ph;
      }
      for (i = j = 0, ref = maxw; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        shatterEffectsSet[i] = new Sprite(characterSprite.bitmap);
        shatterEffectsSet[i].anchor.set(0.5);
        l = Math.floor(pSize * i / pw);
        x = pSize * i - (l * pw);
        y = Math.floor(l * pSize);
        y_perc = pSize * (i + 1) / Math.floor(pw / pSize) / ph;
        y3 = Math.floor(l * pSize);
        if (y >= ph - pSize) {
          y = ph - pSize;
        }
        sx2 = sx + x;
        sy2 = Math.floor(sy + y);
        shatterEffectsSet[i].x = x;
        shatterEffectsSet[i].y = y;
        shatterEffectsSet[i].y_perc = y_perc;
        shatterEffectsSet[i].setFrame(sx2, sy2, pSize, pSize);
        effectBase.addChild(shatterEffectsSet[i]);
        this._aaCreateShatterPartAnimation(shatterEffectsSet[i], char._aaShatterEffectData[3], char._aaShatterEffectData[4]);
      }
      for (k = 0, len = shatterEffectsSet.length; k < len; k++) {
        part = shatterEffectsSet[k];
        this._aaMapSpriteEffects.push(part);
      }
    };
    _._aaCreateShatterPartAnimation = function(sprite, x, y) {
      var r, sx, sy;
      sx = Math.random() * x + 0.1;
      sy = (Math.random() * 0.3) + 0.7 * y;
      r = Math.randomInt(2);
      if (r !== 0) {
        sx *= -1;
      }
      sprite.sx = sx;
      sprite.sy = sy;
      sprite.op = (Math.random() * 2) + 2.0;
      sprite.sc = 0;
      sprite.rt = (Math.random() + 0.5) * 0.1;
    };
    _._aaUpdateShatterEffectPartSprite = function(part) {
      var g, ground;
      if (part == null) {
        return;
      }
      g = 0.16;
      ground = 24 * (1 - part.y_perc) + 72 * part.y_perc;
      if (part.y < ground) {
        part.sy += g;
        part.rt = (Math.random() + 0.5) * 0.1;
      } else {
        part.sy = Math.min(-2, part.sy * (-0.5));
      }
      part.y += part.sy;
      part.x += part.sx;
      part.opacity -= part.op;
      part.scale.x += part.sc;
      part.scale.y += part.sc;
      part.rotation += part.rt;
    };
    _.aaUpdateShatterEffect = function() {
      var j, len, part, ref;
      ref = this._aaMapSpriteEffects;
      for (j = 0, len = ref.length; j < len; j++) {
        part = ref[j];
        this._aaUpdateShatterEffectPartSprite(part);
        if (part.opacity <= 0) {
          this._aaDeleteShatterEffectPartSprite(part);
          return;
        }
      }
    };
    // * Выход из цикла, так как удалили элемент
    _._aaDeleteShatterEffectPartSprite = function(part) {
      var parent;
      // * Смотрим родителя
      parent = part.parent;
      parent.removeChild(part);
      // * Если у него больше нет частей
      if (parent.children.length === 0) {
        // * Удаляем его из динамических спрайтов
        this._aaMapDynamicSprites.delete(parent);
      }
      this._aaMapSpriteEffects.delete(part);
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.aaCreateMapSkills = function() {
    var i, j, ref;
    this._aaMapSkills = [];
// * Создаём уже существующие (зарегестрированные) на карте
    for (i = j = 0, ref = $gameMap.aaMapSkills().length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      this.aaCreateNewMapSkill(i);
    }
  };
  _.aaCreateNewMapSkill = function(index) {
    var skill, sprite;
    skill = $gameMap.aaMapSkills()[index];
    if (skill == null) {
      return;
    }
    sprite = new Sprite_AAMapSkill2Projectile(index);
    this._aaMapSkills[index] = sprite;
    this._tilemap.addChild(sprite);
  };
  //@[EVENT]
  _._aaClearMapSkills = function() {
    var i, j, ref;
    for (i = j = 0, ref = $gameMap.aaMapSkills().length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (!this._aaMapSkills[i] || this._aaMapSkills[i].isEnd()) {
        this._tilemap.removeChild(this._aaMapSkills[i]);
        this._aaMapSkills[i] = null;
        $gameMap.aaMapSkills()[i] = null;
      }
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init(); //#Spriteset_UI_0
      this.applyUserSettings(); // * Применить настройки игрока
    }

    isActive() {
      return this.visible === true;
    }

    show() {
      return this.visible = true;
    }

    hide() {
      return this.visible = false;
    }

    terminate() {
      this._terminateElements(); //#Spriteset_UI_0
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {
      var controller, i, len, ref;
      ref = this.controllers;
      for (i = 0, len = ref.length; i < len; i++) {
        controller = ref[i];
        controller.refresh();
      }
    }

    onGameMessageStart() {
      return this.getElementsWithMessageFlag().forEach(function(e) {
        return e.opacity = 50;
      });
    }

    onGameMessageEnd() {
      return this.getElementsWithMessageFlag().forEach(function(e) {
        return e.opacity = 255;
      });
    }

    // * Применить пользовательские настройки ко всем элементам
    applyUserSettings() {
      var e, i, len, ref, user;
      user = $gameSystem.aaGetUserUISettings();
      this._applyVisibility(user);
      ref = this.elements;
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (user.isHaveFor(e.tag)) {
          //#Spriteset_UI_0
          this._applyUserSettingsFor(e, user);
        }
      }
    }

    // * Обновить элемент (применить настройки)
    refreshElement(tag) {
      var element;
      element = this.getElement(tag);
      if (element == null) {
        return;
      }
      this._applyUserSettingsFor(element, $gameSystem.aaGetUserUISettings()); //#Spriteset_UI_0
    }

    // * Обновить контроллер элемента
    refreshController(tag) {
      var controller;
      controller = this.getController(tag);
      if (controller == null) {
        return;
      }
      controller.refresh();
    }

    // * Восстановить настройки элемента
    resetElement(tag) {
      var element;
      element = this.getElement(tag);
      if (element == null) {
        return;
      }
      element.reset("position");
      element.reset("visible");
    }

    getElement(tag) {
      return this.elements.find(function(e) {
        return e.tag === tag;
      });
    }

    getController(tag) {
      return this.controllers.find(function(c) {
        return c.tag === tag;
      });
    }

    // * Данный метод "собирает" один раз
    getElementsWithMessageFlag() {
      if (this._elementsWithMessageFlag == null) {
        this._elementsWithMessageFlag = this.elements.filter(function(e) {
          return e.isHaveHideWithMessageFlag();
        });
      }
      return this._elementsWithMessageFlag;
    }

  };
  AA.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    AA.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    // * Набор всех компонентов
    this.uiSets = [];
    //TODO: Загрузка всех компонентов из параметров и подготовка
    return this._create();
  };
  // * Дополнительное закрытие элементов (перед закрытием всего UI)
  _._terminateElements = function() {
    return this._terminateSkillSelectorWindow(); //#Spriteset_UI_SkillsSet
  };
  
  // * Получить все элементы
  // * Обновить элемент по тэгу
  // * (возможно) Обновить все элементы
  // * Получить элемент по тэгу
  _._create = function() {
    this._createLowerUILayer();
    this._createNormalUILayer();
    return this._createElements();
  };
  // * Нижний слой нужен для пользовательских UI элементов, которые должны быть ниже UI
  _._createLowerUILayer = function() {
    this.lowerLayer = new Sprite();
    return this.addChild(this.lowerLayer);
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    return this._createDefaultElements();
  };
  //@_createUserElements()
  _._createDefaultElements = function() {
    this._createSkillsSet(); //#Spriteset_UI_SkillsSet
    this._createSkillSelectorWindow(); //#Spriteset_UI_SkillsSet
    this._createActorUI(); //#Spriteset_UI_ActorUI
    return this._createTargetUI(); //#Spriteset_UI_Target
  };
  
  // * Добавить набор и зарегестрировать все элементы и контроллеры из набора
  _._registerUISet = function(uiSet) {
    this.elements.push(...uiSet.elements);
    this.controllers.push(...uiSet.controllers);
    this.uiSets.push(uiSet);
    this._addElementToUI(uiSet);
  };
  // * Добавить элемент на обычный слой (выше пользовательских)
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
  // * Применить пользовательские настройки к элементу
  _._applyUserSettingsFor = function(element, settings) {
    var key, pos, visible;
    key = element.tag;
    pos = settings.getPositionFor(key);
    if (pos != null) {
      element.move(pos.x, pos.y);
    } else {
      element.reset("position");
    }
    visible = settings.getVisibleFor(key);
    if (visible != null) {
      element.visible = visible;
    } else {
      element.reset("visible");
    }
  };
  
  // * Обновить видимость всего UI
  _._applyVisibility = function(settings) {
    var visible;
    if (!settings.isHaveFor("main")) {
      this.show(); // * По стандарту, всегда видно
      return;
    }
    visible = settings.getVisibleFor("main");
    if (visible != null) {
      if (visible === true) {
        return this.show();
      } else {
        return this.hide();
      }
    } else {
      return this.show(); // * По стандарту, всегда видно
    }
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createActorUI = function() {
    return this._createActorGauges();
  };
  _._createActorGauges = function() {
    this.sActorGauges = new AA.UISet_ActorGauges(this);
    return this._registerUISet(this.sActorGauges); //# Spriteset_UI_0
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createSkillsSet = function() {
    this.sSkills = new AA.UISet_Skills(this);
    return this._registerUISet(this.sSkills); //# Spriteset_UI_0
  };
  _._createSkillSelectorWindow = function() {
    //TODO: Ширина и высота из параметров
    this.fwSkillsSelector = new FWindow_SkillSelect(this, 160, 360);
    return this._addElementToUI(this.fwSkillsSelector);
  };
  _._terminateSkillSelectorWindow = function() {
    var ref;
    return (ref = this.fwSkillsSelector) != null ? ref.close() : void 0;
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createTargetUI = function() {
    //TODO: А если не активен?
    this.sTargetInfo = new AA.UISet_TargetInfo(this);
    return this._registerUISet(this.sTargetInfo); //# Spriteset_UI_0
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------

//TODO: Сделать как параметр плагина? 12, 24, 32
//$[OVER]
Game_Character.prototype.searchLimit = function() {
    return 24; // * По умлочанию 12
};

Spriteset_Base.prototype.createAnimation = function(request) {
    const animation = $dataAnimations[request.animationId];
    const targets = request.targets;
    const mirror = request.mirror;
    let delay = this.animationBaseDelay();
    const nextDelay = this.animationNextDelay();
    if (this.isAnimationForEach(animation)) {
        for (const target of targets) {
            this.createAnimationSprite([target], animation, mirror, delay);
            delay += nextDelay;
        }
    } else {
        this.createAnimationSprite(targets, animation, mirror, delay);
    }
};

Spriteset_Base.prototype.createAnimationSprite = function(
    targets, animation, mirror, delay
) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_Animation.prototype.updateEffectGeometry = function() {
    const scale = this._animation.scale / 100;
    const r = Math.PI / 180;
    const rx = this._animation.rotation.x * r;
    const ry = this._animation.rotation.y * r;
    const rz = this._animation.rotation.z * r;
    if (this._handle) {
        this._handle.setLocation(0, 0, 0);
        this._handle.setRotation(rx, ry, rz);
        this._handle.setScale(scale, scale, scale);
        this._handle.setSpeed(this._animation.speed / 100);
    }
};

Sprite_Animation.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._delay > 0) {
        this._delay--;
    } else if (this._playing) {
        if (!this._started && this.canStart()) {
            if (this._effect) {
                if (this._effect.isLoaded) {
                    this._handle = Graphics.effekseer.play(this._effect);
                    this._started = true;
                } else {
                    EffectManager.checkErrors();
                }
            } else {
                this._started = true;
            }
        }
        if (this._started) {
            this.updateEffectGeometry();
            this.updateMain();
            this.updateFlash();
        }
    }
};


Game_Temp.prototype.animation = function(x, y) {

    SceneManager._scene._spriteset.aaCreateAnimationOnMap(x, y);
    
};

Game_Temp.prototype.animationCursor = function() {
    setTimeout(() => {
        "START".p();
        SceneManager._scene._spriteset.aaCreateLinkedAnimation();
    }, 250);
};


// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var uAPI;

uAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = uAPI;
  //TODO: Execute SAction (global)

  // * Добавить навык на панель навыков
  // * 0 - убрать из слота
  // * slotSymbol == null - в любое не занятое место
  _.setSkillToPanel = function(skillId, slotSymbol) {
    var e, ref, ref1, ref2;
    try {
      if (skillId <= 0) { // * Удаляем навык из панели
        if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
          if ((ref = $gamePlayer.aaSkillsSet) != null) {
            ref.setSymbolForSkill(0, slotSymbol, null); // * Устанавливаем навык на панель
          }
        }
      } else {
        // * Если НАВЫК, то должен быть изучен
        if (AA.Utils.isAASkill(skillId)) {
          if (!$gamePlayer.aaIsHaveABSSkill(skillId)) {
            return;
          }
        }
        // * Предметы можно устанавливать, даже если нет в инвентаре (будет 0)
        if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
          if ((ref1 = $gamePlayer.aaSkillsSet) != null) {
            ref1.setSymbolForSkill(skillId, slotSymbol, null); // * Если символ не указан (или указан неверно, то устанавливаем в свободное место)
          }
        } else {
          if ((ref2 = $gamePlayer.aaSkillsSet) != null) {
            ref2.setSkillInEmptySlot(skillId);
          }
        }
      }
      AA.UI.refreshElement('skills');
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Добавить предмет на панель навыков, поддерживает как обычные ID, так и idA
  _.setItemToPanel = function(itemId, slotSymbol) {
    var e;
    try {
      // * Автоматическое преобразование в ID предмета
      if (itemId > 0 && !AA.Utils.isAAItem(itemId)) {
        itemId += AA.Utils.ItemsIDStart;
      }
      this.setSkillToPanel(itemId, slotSymbol);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Если навыка нет или неверно указан slotSymbol - будет возвращён 0
  _.getSkillIdFromPanel = function(slotSymbol) {
    var ref;
    return (ref = $gamePlayer.aaSkillsSet) != null ? ref.getSkillForSymbol(slotSymbol) : void 0;
  };
  _.pauseABS = function() {
    return AA.System.pauseABS();
  };
  _.resumeABS = function() {
    return AA.System.resumeABS();
  };
  _.editUI = function() {
    var e;
    try {
      if (AA.isMap()) {
        return SceneManager.push(AA.Scene_UIEditor);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.controlUIElement = function() {
    var e, user;
    try {
      user = $gameSystem.aaGetUserUISettings();
      user.set(...arguments);
      return AA.UI.refreshElement(arguments[0]);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.showUI = function() {
    var e, user;
    try {
      user = $gameSystem.aaGetUserUISettings();
      // * Просто удаляем настройки, так как по умолчанию интерфейс всегда видно
      // * других настроек у интерфейса нету
      user.set("main", "clear");
      return AA.UI.show();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //TODO: Кнопки нажимаются напанели, даже если скрытый интерфейс
  //TODO: Надо метод isValid дополнить (который в AA.UI) и делать проверки
  _.hideUI = function() {
    var e, user;
    try {
      user = $gameSystem.aaGetUserUISettings();
      user.set("main", "setVisible", false);
      return AA.UI.hide();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //TODO: Этот метод добавить в SActions !!!
  //TODO: show on map point, show on screen point
  _.showPopUpOnChar = function(charId, styleId, value, isVariable) {
    var char, e, settings;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (value > 0 && isVariable === true) {
        value = $gameVariables.value(value);
      }
      if (charId === 0) {
        char = $gamePlayer;
      } else {
        char = $gameMap.event(charId);
      }
      settings = AA.PP.getPopUpDamageSettings(styleId);
      if (settings == null) {
        AA.w("PopUp settings with ID " + styleId + " not found!");
      } else {
        Sprite_AADamagePopUpItem.CreateOnCharacter(char, settings, value);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс хранит все gauge игрока, отвечает за их работу
(function() {
  var UISet_ActorGauges;
  // * В качестве аргумента получает класс интерфейса
  UISet_ActorGauges = class UISet_ActorGauges extends Sprite {
    constructor() {
      super();
      this.controllers = [];
      this.elements = [];
      this._create();
      this.refresh();
    }

    refresh() {
      var e, ref, ref1, ref2;
      try {
        if ((ref = this.hpGauge) != null) {
          ref.setup($gameParty.leader(), 'hp', 'mhp');
        }
        if ((ref1 = this.mpGauge) != null) {
          ref1.setup($gameParty.leader(), 'mp', 'mmp');
        }
        return (ref2 = this.tpGauge) != null ? ref2.setup($gameParty.leader(), 'tp', 'mtp') : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_ActorGauges);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_ActorGauges.prototype;
  _._create = function() {
    this.hpGauge = this._createGauge("hpGauge");
    this.tpGauge = this._createGauge("tpGauge");
    return this.mpGauge = this._createGauge("mpGauge");
  };
  _._createGauge = function(tag) {
    var e, gauge, gaugeCnt, p;
    try {
      p = AA.PP.uiData(tag);
      gauge = new AA.Sprite_ActorStateGauge(p);
      gauge.tag = tag;
      gaugeCnt = new AA.GaugeController(gauge);
      gaugeCnt.tag = tag;
      this.controllers.push(gaugeCnt);
      this.elements.push(gauge);
      this.addChild(gauge);
      return gaugeCnt;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс хранит все ячейки навыков (предметов) на интерфейсе
(function() {
  var UISet_Skills;
  // * В качестве аргумента получает класс интерфейса
  UISet_Skills = class UISet_Skills extends Sprite {
    constructor() {
      super();
      this.controllers = [];
      this.elements = [];
      this._create();
      this.refresh();
    }

    // * Этот метод нужен обязательно
    refresh() {
      var e;
      try {

      } catch (error) {
        e = error;
        return AA.warning(e);
      }
    }

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_Skills);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_Skills.prototype;
  _._create = function() {
    var i, item, len, ref;
    ref = AA.PP.getUISkillsItems();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item != null) {
        this._createSkillItem(item);
      }
    }
    this._createController();
  };
  _._createSkillItem = function(itemSettings) {
    var e, skillItem;
    try {
      //TODO: p = AA.PP.uiData(tag)
      skillItem = new AA.Sprite_SKillPanelItem(); //parametri from p
      skillItem.tag = "skillItem_" + itemSettings.symbol;
      skillItem.move(itemSettings.position);
      skillItem.drawSymbol(itemSettings.symbol);
      skillItem.symbol = itemSettings.symbol;
    } catch (error) {
      e = error;
      AA.w(e);
      skillItem = null;
    }
    if (skillItem == null) {
      return;
    }
    this.addChild(skillItem);
    this.elements.push(skillItem);
  };
  _._createController = function() {
    var skillsCnt;
    skillsCnt = new UISkillsItemsController(this.elements);
    skillsCnt.tag = "skills";
    this.controllers.push(skillsCnt);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс харинт UI выбранной (под курсором) цели и контроллеры
(function() {
  var UISet_TargetInfo;
  UISet_TargetInfo = class UISet_TargetInfo extends Sprite {
    constructor() {
      super();
      // * Эти два поля обязательные для набора элементов интерфейса
      // * Они используются в методе _registerUISet в Spriteset UI
      this.controllers = [];
      this.elements = [];
      //TODO: register global event
      this._create();
      return;
    }

    refresh() {}

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_TargetInfo);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ UISet_TargetInfo.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_TargetInfo.prototype;
  _._create = function() {
    this.infoSpr = new AA.Sprite_EnemyInfo();
    this.infoSpr.tag = "targetInfo"; // * Это надо для управленя элементов через uAPI и редактор
    this.infoSprCnt = new UITargetInfoController(this.infoSpr);
    this.infoSprCnt.tag = "targetInfo";
    this.controllers.push(this.infoSprCnt);
    this.elements.push(this.infoSpr);
    return this.addChild(this.infoSpr);
  };
})();

// ■ END UISet_TargetInfo.coffee
//---------------------------------------------------------------------------

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
    this._updThreadItemCount = new KDCore.TimedUpdate(30, this._updateItemsCount.bind(this));
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
    var i, item, j, len, len1, panelItems, ref, skill;
    this._clearItems();
    ref = this.battler.getAASkills();
    for (i = 0, len = ref.length; i < len; i++) {
      skill = ref[i];
      this._setupItem(skill);
    }
    // * Предметы отдельно, так как могут быть не в наличии
    panelItems = this.skillSet.getAllItemsFromPanel().map(function(id) {
      return AA.Utils.getAASkillObject(id);
    });
    for (j = 0, len1 = panelItems.length; j < len1; j++) {
      item = panelItems[j];
      this._setupItem(item);
    }
    this._updateItemsCount(); // * Сразу обновим количество
  }

  update() {
    var ref, ref1, ref2;
    if ((ref = this._updThread) != null) {
      ref.update();
    }
    if ((ref1 = this._updThreadTimers) != null) {
      ref1.update();
    }
    if ((ref2 = this._updThreadItemCount) != null) {
      ref2.update();
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
  _._updateItemsCount = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemCount(item));
    }
    return results;
  };
  // * Обновить состояние (таймер, доступность)
  _._updateItemState = function(item) {
    var e, useCases;
    try {
      useCases = this.battler.getUsableAASkills().map(function(skill) {
        return skill.idA;
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
  // * Обновить количество (для предметов)
  _._updateItemCount = function(item) {
    // * Навыки пропускаем
    if (AA.Utils.isAASkill(item.skillId)) {
      return;
    }
    item.drawCount($gameParty.numItems(AA.Utils.getAASkillObject(item.skillId)));
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
    var iconIndex, item, symb;
    if (skill == null) {
      return;
    }
    symb = this.skillSet.getSymbolForSkill(skill.idA);
    // * Нету символа для навыка (т.е. навык не находится в ячейках)
    if (symb == null) {
      return;
    }
    item = this._getItemForSymbol(symb);
    if (item == null) {
      return;
    }
    item.skillId = skill.idA;
    if (item.skillId === this.battler.attackSkillId()) {
      iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, this.battler);
      item.drawIcon(iconIndex);
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
  // * Обработка нажатия правкой кнопкой мыши по слоту (вызывается из AA.UI)
  _.handleSkillSelectorProcess = function() {
    var symbol;
    if (AA.UI.isSkillSelectorOpen()) {
      AA.UI.closeSkillSelector();
      // * Если было нажатие на другой слот, то сразу открываем его
      symbol = this._getSkillSymbolSelectorHandled();
      if ((symbol != null) && $gameTemp.__aaLastSkillSelectorSymbol !== symbol) {
        return this.handleSkillSelectorProcess(); // * Если было нажатие на слот, но этот же, закрываем его
      } else {
        $gameTemp.__aaLastSkillSelectorSymbol = null;
        return true;
      }
    } else {
      symbol = this._getSkillSymbolSelectorHandled();
      if (symbol != null) {
        AA.UI.openSkillSelectorFor(symbol);
        $gameTemp.__aaLastSkillSelectorSymbol = symbol;
        return true;
      }
    }
    return false;
  };
  // * Возвращает symbol слота, если было открыто меню выбора навыка (правой кнопкой по слоту)
  _._getSkillSymbolSelectorHandled = function() {
    var item;
    // * Только по правой кнопке мыши (всегда)
    if (TouchInput.isCancelled()) {
      item = this._getItemUnderCursor();
      if (item != null) {
        return item.symbol;
      }
    }
    return null;
  };
  
  // * Получить Skill Item под курсором
  _._getItemUnderCursor = function() {
    return this.skillItems.find(function(item) {
      return item.isUnderMouse();
    });
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Систематизация класса
var UITargetInfoController;

UITargetInfoController = class UITargetInfoController {
  constructor(targetInfoSpr) {
    this.targetInfoSpr = targetInfoSpr;
    AA.EV.subscribeFor("UnderMouseEventChanged", this.gev_onUnderMouseEventChanged.bind(this));
    this._createSoControllers();
    this.targetInfoSpr.visible = false;
    return;
  }

  refresh() {
    return this.gev_onUnderMouseEventChanged();
  }

  setup(target) {
    this.target = target;
    if (this.target == null) {
      this.hideTargetInfo();
    }
    this.gaugeCnt.setup(this.target.AABattler(), "hp", "mhp");
    this.showTargetInfo();
  }

  hideTargetInfo() {
    this.targetInfoSpr.hideSlow();
    this.target = null;
  }

  showTargetInfo() {
    var battler, model;
    model = this.target.AAEntity().model();
    if (model.UIInfo === 0) {
      return;
    }
    battler = this.target.AABattler();
    //TODO: Values from enemy
    this.targetInfoSpr.drawNameWithFormat(battler.name());
    //TODO: level from what?
    this.targetInfoSpr.drawLevelWithFormat(1);
    this.targetInfoSpr.drawFace(model.faceName, model.faceIndex);
    //TODO: battle state show and refresh by AI state
    this.targetInfoSpr.showSlow();
  }

  update() {
    if (!this.targetInfoSpr.visible) {
      return;
    }
    this.gaugeCnt.update();
  }

  gev_onUnderMouseEventChanged() {
    if ($gameTemp._aaEventUnderCursor != null) {
      if (this.target !== $gameTemp._aaEventUnderCursor) {
        this.setup($gameTemp._aaEventUnderCursor);
      }
    } else {
      this.hideTargetInfo();
    }
  }

  _createSoControllers() {
    this.gaugeCnt = new AA.GaugeController(this.targetInfoSpr.gauge);
    // * Используется свой метод для отрисовки значения (с форматом)
    this.gaugeCnt.targetInfoSpr = this.targetInfoSpr;
    this.gaugeCnt._refreshValues = function() {
      var rate;
      rate = this.value / this.max;
      this.gaugeSprite.drawGauge(rate);
      return this.targetInfoSpr.drawHpWithFormat(this.value, this.max, rate);
    };
  }

};

// Generated by CoffeeScript 2.5.1
// * Данный класс содержит пользовательские (временные) настройки UI элементов

//@[GLOBAL]
//@[STORABLE]
var AAUserUISettings;

AAUserUISettings = class AAUserUISettings {
  constructor() {
    this.settings = {};
  }

  isHaveFor(key) {
    return this.settings[key] != null;
  }

  createFor(key) {
    return this.settings[key] = {};
  }

  //?[UNSAFE]
  //? Cперва надо сделать проверку isHaveFor
  // * Если поля нету, возращают null, значит вообще не учитывать пользовательскую настройку
  // * return KDCore.Point
  getPositionFor(key) {
    var e, ref;
    try {
      return (ref = this.settings[key]) != null ? ref.position : void 0;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  }

  //?[UNSAFE]
  getVisibleFor(key) {
    var e, state;
    try {
      state = this.settings[key].visible;
      if (state != null) {
        return state;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  }

  set(key, command, value) {
    var e;
    if (!this.isHaveFor(key)) {
      // * Создаём для элемента данные, если нету ещё
      this.createFor(key);
    }
    try {
      switch (command) {
        case "setPosition":
          // * Значние должно быть массивом
          this.settings[key].position = KDCore.Utils.jsonPos(value).simple();
          break;
        case "setVisible":
          // * Значение должно быть bool
          this.settings[key].visible = value;
          break;
        case "resetPosition":
          // * Нет значения, просто сброс
          this.settings[key].position = null;
          break;
        case "clear":
          // * Нет значения, удаление всех настроек
          delete this.settings[key];
          break;
        default:
          KDCore.warning('Unknown command ' + command);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleSkill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__includes, _;
  //@[DEFINES]
  _ = Window_BattleSkill.prototype;
  // * Прячем ABS навыки из битвы со специальным флагом hideOutsideABS == 1
  //@[ALIAS]
  ALIAS__includes = _.includes;
  _.includes = function(item) {
    var isInclude;
    isInclude = ALIAS__includes.call(this, item);
    if (isInclude === true) {
      if (AA.Utils.isAAObject(item)) {
        if (item.AASkill.hideOutsideABS === 1) {
          return false;
        }
      }
    }
    return isInclude;
  };
})();

// ■ END Window_BattleSkill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return AA.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return AA.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Добавить настройки, чтобы и размер иконок и текста можно было менять
var Window_SkillSelectorList;

Window_SkillSelectorList = class Window_SkillSelectorList extends Window_Selectable {
  constructor(rect) {
    super(...arguments);
    this.setBackgroundType(2);
    this.catIndex = -1;
    this.skillSymbol = null;
    this.skills = [];
    return;
  }

  // * При нажатии на окно выбора навыков
  onClick() {
    var e, hitIndex, skillId;
    if (this.skillSymbol == null) {
      return;
    }
    if (this.catIndex < 0) {
      return;
    }
    hitIndex = this.hitIndex();
    if (hitIndex < 0) {
      return;
    }
    try {
      skillId = this._skills[hitIndex].id;
      if (this.catIndex === 0) {
        uAPI.setSkillToPanel(skillId, this.skillSymbol);
      } else {
        uAPI.setItemToPanel(skillId, this.skillSymbol);
      }
      if (skillId > 0) {
        SoundManager.playEquip();
        // * Если навык был установлен (а не удалён)
        AA.UI.closeSkillSelector();
        // * Чтобы персонаж не пошёл к точку карты после закрытия окна
        TouchInput.clear();
      } else {
        SoundManager.playCursor();
        this.refresh();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  // * 0 - Skills
  // * 1 - Items
  setCategory(catIndex) {
    this.catIndex = catIndex;
    this.refresh();
    this.scrollTo(0, 0);
  }

  // * Символ навыка, чтобы установить (убрать) на панель
  setSymbol(skillSymbol) {
    this.skillSymbol = skillSymbol;
  }

  // * Всегда можно прокручивать, так как окно не будет Active
  //$[OVER]
  isScrollEnabled() {
    return true;
  }

  maxCols() {
    return 1;
  }

  maxItems() {
    if (this._skills != null) {
      return this._skills.length;
    } else {
      return 0;
    }
  }

  refresh() {
    this._prepareSkillsList();
    Window_Selectable.prototype.refresh.call(this);
  }

  drawItem(index) {
    var _tIconIndex, e, iconIndex, item, rect;
    this.__drawIndex = index;
    item = this._skills[index];
    if (item == null) {
      return;
    }
    rect = this.itemLineRect(index);
    try {
      //TODO: Этот метод может вызвать проблемы
      //? ТУТ ИСПОЛЬЗУЕТСЯ ДОВОЛЬНО ОПАСНЫЙ приём подмены иконки в Data объекте
      //? Это сделано чтобы не переписывать весь метод drawItemName
      // * Если навык атаки, то надо рисовать иконку оружия
      // * Тут TryCatch так как есть системный placeholder вместо Item
      // * и модифицированный другими плагинами метод drawItemName
      // * может не найти поле необходимое, которое есть у Game_Items
      if (this._isAttackSkill(index)) {
        _tIconIndex = item.iconIndex;
        iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, $gameParty.leader());
        if (iconIndex > 0) {
          item.iconIndex = iconIndex;
        }
      }
      this.drawItemName(item, rect.x, rect.y, rect.width);
      if (_tIconIndex != null) {
        // * После метода отрисовки, иконку надо вернуть
        item.iconIndex = _tIconIndex;
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  //TODO: from settings
  //$[OVER]
  resetFontSettings() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 14;
    this.resetTextColor();
  }

  //TODO: from settings
  resetTextColor() {
    super.resetTextColor();
    if (this.catIndex < 0) {
      return;
    }
    if (this.__drawIndex === 0) {
      return this.changeTextColor("#e32614"); // * [Remove]
    // * Атака может быть только в категории навыков
    // * А может и не быть (если установлена)
    } else if (this._isAttackSkill(this.__drawIndex)) {
      return this.changeTextColor("#148de3"); // * Attack
    } else {
      //TODO: Items name color plugin compatability
      if (this.catIndex === 0) {
        return this.changeTextColor("#dba512");
      } else {
        return this.changeTextColor("#20d67b");
      }
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_SkillSelectorList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_SkillSelectorList.prototype;
  _._prepareSkillsList = function() {
    var e, skills;
    this._skills = [];
    // * ID навыка атаки в списке, если == 0 - нет навыка
    this._attackSkillId = 0;
    if (this.catIndex < 0) {
      return;
    }
    try {
      if (this.catIndex === 0) { // * Skills only
        skills = $gameParty.leader().getAASkills();
        // * Так как метод getAASkills возвращает все навыки (включая предметы)
        // * то дополнительный фильтр от предметов
        skills = skills.filter(function(s) {
          return AA.Utils.isAASkill(s.idA); // * Items only
        });
      } else {
        skills = $gameParty.leader().getAAItems();
      }
      this._skills = skills;
      this._removeAlreadyInPanelSkills();
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
    if (this.catIndex === 0) {
      this._checkAttackSkillInList();
    }
    this._skills.unshift(this._removeCommandItem());
  };
  _._removeCommandItem = function() {
    return {
      //TODO: from parameters
      id: 0,
      idA: 0,
      iconIndex: 16,
      name: "[Remove]"
    };
  };
  // * Удаляет из списка навыков те, что уже установленны на панель навыков
  _._removeAlreadyInPanelSkills = function() {
    var e, i, len, notInPanelSkills, ref, s, skillPanel;
    try {
      notInPanelSkills = [];
      skillPanel = $gamePlayer.aaSkillsSet;
      if (skillPanel == null) {
        return;
      }
      ref = this._skills;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (skillPanel.getSymbolForSkill(s.idA) == null) {
          notInPanelSkills.push(s);
        }
      }
      this._skills = notInPanelSkills;
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
  };
  _._checkAttackSkillInList = function() {
    var attackSkill, attackSkillId, e;
    try {
      attackSkillId = $gameParty.leader().attackSkillId();
      attackSkill = this._skills.find(function(s) {
        return s.id === attackSkillId;
      });
      if (attackSkill != null) {
        this._skills.delete(attackSkill);
        // * Запоминаем ID (значит есть в списке)
        this._attackSkillId = attackSkillId;
        // * Ставим на первое место в список
        this._skills.unshift(attackSkill);
      }
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
  };
  _._isAttackSkill = function(index) {
    var e, ref;
    try {
      if (this.catIndex === 0 && this._attackSkillId > 0) {
        if (((ref = this._skills[index]) != null ? ref.id : void 0) === this._attackSkillId) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
})();

// ■ END Window_SkillSelectorList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Floating Window.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //TODO: В ACore

  //@[DEFINES]
  _ = AA.FloatingWindow.prototype;
  _._createParts = function() {
    this._createLayers();
    this._loadHeader();
    this._createCloseButton();
    this._moveToStartPosition();
    this._createCustomElements();
  };
  // * Содание прочих элементов окна (для наследников)
  _._createCustomElements = function() {}; // * EMTPY
})();

// ■ END Floating Window.coffee
//---------------------------------------------------------------------------

//TODO: _createContent удалить и этот _createCustomElements заместо него

//Plugin Alpha_ABSZ automatic build by PKD PluginBuilder 1.9.2 18.09.2021
