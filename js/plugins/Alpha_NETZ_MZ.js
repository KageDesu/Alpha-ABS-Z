/*:
 * @plugindesc (v.0.6)[PRO] Multiplayer for RPG Maker
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/alpha-net-z/
 *
 * @help
 *
 * Alpha NET Z plugin is still in development
 *
 * WebPage: https://kdworkshop.net/plugins/alpha-net-z/
 * Documentation: https://github.com/KageDesu/Alpha-NET-Z/wiki
 *
 * Required content:
 *  - plugin Alpha_Core.js
 *  - plugin SocketIO.js
 *  - file css\anet.css
 *  - folder img\Alpha\*all files*
 *
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"195.161.41.20","serverPort":"3034"}
 * @desc [PRO] If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameModeSettingsGroup
 * @text Multiplayer Settings
 * 
 * @param onlySameMap:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Wait Map Transfer?
 * @default false
 * @desc When player transferred to the new map he will wait until all players not transfered on same map.
 * 
 * @param singlePlayerAllowed:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text New Game Allowed?
 * @default true
 * @desc If false, the menu item "New Game" will not be displayed in title menu
 * 
 * @param roomFilter:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Rooms Filter?
 * @on ON
 * @off OFF
 * @default false
 * @desc [PRO] If filter is ON, you can see only this (same) game rooms in lobby
 * 
 * @param saveLoadGame:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Save and Load Allowed?
 * @on YES
 * @off NO
 * @default true
 * @desc Can player save and load network game?
 * 
 * @param inGameChat:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text In-Game Chat?
 * @on YES
 * @off NO
 * @default false
 * @desc [PRO] In-Game chat on Map Scene? (More chat settings will be in next update...)
 * 
 * @param chatStartMessage
 * @parent inGameChat:b
 * @text Start Message
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Message when New Game started. Leave empty if not need any start message.
 * 
 * @param chatOpenCloseKey
 * @parent inGameChat:b
 * @text Chat Key
 * @default t
 * @desc Key to open (close) chat window in game.
 * 
 * @param chatSayKey
 * @parent inGameChat:b
 * @text Say Key
 * @default t
 * @desc Key to open input message scene. Only when chat visible. Can be same with Chat Key.
 * 
 * @param playersSettingsGroup
 * @text Players Settings
 * 
 * 
 * @param actorsForNetwork:intA
 * @parent playersSettingsGroup
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players. More than 2 - PRO only.
 * 
 * @param isActorSelectionAllowed:b
 * @parent playersSettingsGroup
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param isSinglePlayerStartAllowed:b
 * @parent playersSettingsGroup
 * @text One player start?
 * @type boolean
 * @default true
 * @desc If in room only 1 player (host), he can start game alone?
 * 
 * @param playerActorNameType
 * @parent playersSettingsGroup
 * @text Player Name for Actor
 * @type select
 * @option Not Show
 * @option Instead Name
 * @option Instead Nickname
 * @default Instead Nickname
 * @desc Show network player name instead of his Actor name (or nickname)
 * 
 * @param playerLeaveGameCommonEvent:int
 * @parent playersSettingsGroup
 * @text On Player Disconnect CE
 * @type common_event
 * @default 0
 * @desc That common event will be called when somebody leave (disconnect) game. 0 - nothing
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 


 * @command EventStartOptions
 * @text Event Options
 * @desc Event network start options
 * 
 * @arg whoSelector
 * @text Who can start
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @desc Select who can start this event
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg lockMode
 * @text Lock Event?
 * @type boolean
 * @default false
 * @desc If true - event will be locked while executed. Nobody can't start locked event
 * 
 * @arg sharedMode
 * @text Shared Mode
 * @type select
 * @option No
 * @option Strict
 * @option Optional
 * @desc Shared event - starts for all players simultaneously, synchronized commands execution
 * @default No
 * 
 * 
 * @command EventCommandSelector
 * @text Command Options
 * @desc Next Event Command network start options
 * 
 * @arg whoSelector
 * @text Execute for
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @option Me Except
 * @desc Select for who this event command will be executed
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg scope
 * @text Scope
 * @type select
 * @option Same map
 * @option All world
 * @default Same map
 * @desc For which players will the virtual command be executed?
 * 
 * @arg executeMode
 * @text Execute Mode
 * @type select
 * @option Auto
 * @option Virtual
 * @option Common Event
 * @default Auto
 * @desc How this command will be exectuted for other players. Read Wiki for more info
 * 
 * @command SharedBattle
 * @text Set Shared Battle
 * @desc Make next Battle Processing command shared between all players
 * 
 * @arg battleId
 * @text ID
 * @default
 * @desc Unique battle ID. Empty - not shared battle (by default)
 * 
 * 
 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option 195.161.41.20
@desc Server IP address (ip4)
@default 195.161.41.20

@param serverPort
@text Port
@default 3034

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/
// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 60; // 0.6.0

ANET.ServerRev = 112; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};


ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
}

ANET.isPro = function() {
    return true;
};
// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за подключение и хранит общие методы отправки и обработки команд

//$[ENCODE]

//@[GLOBAL]
window.ANNetwork = function() {};

//@[EXTEND]
window.NET = window.ANNetwork;

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("Network");
  LOG.setColors(KDCore.Color.GREEN, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANNetwork;
  _.isConnected = function() {
    return this.socket != null;
  };
  _.myId = function() {
    var ref;
    return (ref = this.socket) != null ? ref.id : void 0;
  };
  _.isMasterClient = function() {
    return this._isHost === true;
  };
  // * Игроки могу находится на одной карте
  _.isSameMapMode = function() {
    return ANET.PP.isOnlySameMapMode();
  };
  // * Надо ждать сеть
  _.isBusy = function() {
    return this.isConnected() && (this.isWaitServer() || ANGameManager.isShouldWaitServer());
  };
  // * Ждёт ответ от сервера
  _.isWaitServer = function() {
    return this.isConnected() && this._isWaitServer === true;
  };
  (function() {    // * MAIN NETWORK ====================================================
    _.initSystem = function() {
      this.socket = null;
      this.client = null;
      this._isWaitServer = false;
      this._isHost = false; // * Мастер клиент?
      return "Network inited".p();
    };
    _.stop = function() {
      var ref;
      NetClientMethodsManager.setConnectionToMasterCallback(null);
      if ((ref = this.client) != null) {
        ref.disconnect();
      }
      this._isWaitServer = false;
      this.socket = null;
      ANGameManager.reset();
    };
    _.startConnection = function() {
      var adr, ip, port;
      ip = ANET.PP.serverIp();
      port = ANET.PP.serverPort();
      adr = 'http://' + ip + ":" + port;
      console.log("Connect to " + adr);
      this.socket = io(adr);
      this.client = new NetworkClientHandler(this.socket);
    };
    _.setConnection = function(callback) {
      NetClientMethodsManager.setConnectionToMasterCallback(callback);
      this.startConnection();
    };
    // * Просто отправить данные на сервер
    _.send = function(msg, noLog = false) {
      if (!this.isConnected()) {
        LOG.p("You try send message, but NOT connection!");
      } else {
        if (!noLog) {
          LOG.p("Send: " + msg.fullName());
        }
        msg.setFrom(this.socket.id).send();
      }
    };
    // * Отправить сообщение и ждать! результат (есть Timeout)
    _.get = function(msg, onData, onTimeout, timeoutTime = 2000) {
      var _onData, _onTimeout, msgName;
      if (!this.isConnected()) {
        LOG.p("You try get data from Server, but NOT connection!");
      } else {
        msgName = msg.fullName();
        // * Ставим игру на паузу
        this._isWaitServer = true;
        HUIManager.showLoader();
        // * Дополняем callbacks, чтобы снять игру автоматически с паузы
        _onTimeout = function(...args) {
          LOG.p("Timeout for: " + msgName);
          if (onTimeout != null) {
            onTimeout.apply(this, args);
          }
          ANNetwork._isWaitServer = false;
          return HUIManager.hideLoader();
        };
        _onData = function(...args) {
          LOG.p("Response (get) for: " + msgName);
          if (onData != null) {
            onData.apply(this, args);
          }
          ANNetwork._isWaitServer = false;
          return HUIManager.hideLoader();
        };
        LOG.p("Send, get!: " + msgName);
        msg.setFrom(this.socket.id).get(_onData, _onTimeout, timeoutTime);
      }
    };
    // * Отправить сообщение и вызвать callback, когда прийдёт ответ
    _.callback = function(msg, method) {
      var _method, msgName;
      if (!this.isConnected()) {
        LOG.p("You try send callback message, but NOT connection!");
      } else {
        msgName = msg.fullName();
        _method = function(...args) {
          LOG.p("Callback for: " + msgName);
          return method.apply(this, args);
        };
        LOG.p("Send, callback: " + msgName);
        msg.setFrom(this.socket.id).callback(_method);
      }
    };
    return _.trace = function(text) {
      return this.send(NMS.Trace(text));
    };
  })();
  (function() {    // * ROOMS ======================================================
    // * Этот метод вызывается когда создаём комнату
    _.setRoomMaster = function(room) {
      this.room = room;
      this._isHost = true;
      return LOG.p("You are Master (host) of room: " + this.room.name);
    };
    //TODO: установить флаг в NetMessage? что типо теперь send.to

    // * Когда подключаемся к комнате
    _.setRoomJoin = function(room) {
      this.room = room;
      this._isHost = false;
      return LOG.p("You are joined to room: " + this.room.name);
    };
    //TODO: установить флаг в NetMessage? что типо теперь send.to

    // * Обновить данные команты (к которой подключён)
    _.onRoomDataFromServer = function(room) {
      this.room = room;
    };
    // * Комната была закрыта
    _.onRoomClosed = function() {
      if (!this.isConnected()) {
        return;
      }
      if (this.room == null) {
        return;
      }
      this.leaveRoom();
      this._isHost = false;
      this.room = null;
    };
    // * Закрыть комнату (созданную этим клиентом)
    _.closeRoom = function() {
      if (!this.isMasterClient()) {
        return;
      }
      if (this.room == null) {
        return;
      }
      this.send(NMS.Lobby("closeRoom"));
    };
    // * Покинуть комнату (к которой этот клиент подключился)
    _.leaveRoom = function() {
      if (this.room == null) {
        return;
      }
      ANGameManager.onLeaveRoom();
      this.send(NMS.Lobby("leaveRoom", this.room.name));
    };
    
    // * Запросить данные о игроках в комнате
    return _.requestRoomRefresh = function() {
      if (!this.isConnected()) {
        return;
      }
      this.send(NMS.Lobby("getRoomData"));
    };
  })();
  // * HELPERS ====================================================

  // * Получить общие данные о игре для сети (комнаты)
  // * (используется при создании комнаты)
  _.getNetworkGameInfoData = function() {
    return {
      id: ANET.VD.getGameVersion(),
      title: $dataSystem.gameTitle,
      version: KDCore.isMZ() ? 0 : 1,
      maxPlayers: ANET.PP.actorsForNetwork().length,
      mode: 0 //TODO: Deprecated
    };
  };
})();

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с основными методами системы
ANET.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ANET SYSTEM".p();
      this.loadParameters();
      this.applyParameters();
      ANET.loadPluginCommands();
      HUIManager.init();
    };
    _.loadParameters = function() {
      return ANET.PP = new ANET.ParamsManager();
    };
    _.applyParameters = function() {};
  })();
  // -----------------------------------------------------------------------

  // * Все эти команды нельзя запускать через опции (виртуально), но
  // * их теоретически можно вызывать через общее событие у другого игрока
  //TODO: Например конфигурация классов (dinamyc методов)
  _.ForbiddenVirtualCommandsList = [
    // * Message
    101,
    102,
    103,
    104,
    105,
    // * Flow Control
    111,
    112,
    113,
    115,
    118,
    119,
    108,
    // * Party
    129,
    // * Movement
    201,
    202,
    204,
    206,
    // * Character
    216,
    217,
    // * Timing
    230,
    // * Scene Control
    302,
    303,
    351,
    352,
    // * System Settings
    137,
    // * Meta
    0,
    401,
    402,
    403,
    411,
    413,
    657
  ];
  // * Список комманд которые запускаются через общее событие, а не виртуально
  _.NonVirtualCommandsList = [
    // * Flow Control
    117,
    // * Scene Control
    301
  ];
  // * Дополнительные полня для синхронизации в битве
  _.BattlerObserverFields = [
    "_tpbChargeTime",
    //"_tpbCastTime"
    //"_tpbIdleTime"
    //"_tpbTurnCount"
    //"_tpbTurnEnd"
    //"_speed"
    //"_actionState"
    //"_damagePopup"
    //"_effectType"
    //"_motionType"
    //"_weaponImageId"
    //"_motionRefresh"
    //"_selected"
    "_tpbState"
  ];
  _.ActorObserverFields = ["_name", "_nickname", "_classId", "_level", "_characterName", "_characterIndex", "_faceName", "_faceIndex", "_battlerName", "_exp", "_equips"];
  return _.EnemyObserverFields = [
    "_enemyId",
    //"_letter"
    //"_plural"
    "_screenX",
    "_screenY"
  ];
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный менедреж отвечает за различие в версиях плагина для MZ и MV
ANET.VD = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.VD;
  _.getGameVersion = function() {
    if (KDCore.isMZ()) {
      return $dataSystem.advanced.gameId;
    } else {
      return $dataSystem.versionId;
    }
  };
  return _.getWindowBackgroundType = function() {
    if (KDCore.isMZ()) {
      return 2;
    } else {
      return 0;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за HTML элементы пользовательского интерфейса на сценах

//https://github.com/caroso1222/notyf

//TODO: load material icons? make more notifies (info, warning?)

//<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

//$[ENCODE]
window.HUIManager = function() {};

(function() {
  var _;
  //@[DEFINES]
  _ = window.HUIManager;
  //TODO: Есть проблемы с позиционированнием, надо динамически менять свойства элемента
  _.init = function() {
    this._isMouseHoverHtmlElement = false;
    this._loadCSS();
    this._createRelativeParent();
    this._createLoadSpinner();
    this._createNotify();
    // * Отключаем контекстное меню у новых элементов
    Graphics._disableContextMenu();
  };
  _.isUnderMouse = function() {
    return this._isMouseHoverHtmlElement === true;
  };
  // * Когда происходит смена сцены в игре
  // * (надо убирать лишние элементы, которые не могут переходить на другую сцену)
  _.onGameSceneChanged = function() {
    return this.hideWaitingInfo();
  };
  _.showLoader = function(delay = 200) {
    var e;
    try {
      if (this.isLoaderActive()) {
        return;
      }
      this._loaderThread = setTimeout((function() {
        if (!document.getElementById("anetLoader")) {
          return document.body.appendChild(HUIManager._loader);
        }
      }), delay);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.hideLoader = function() {
    var e;
    try {
      if (!this.isLoaderActive()) {
        return;
      }
      clearTimeout(this._loaderThread);
      this._loaderThread = null;
      if (document.getElementById("anetLoader")) {
        document.body.removeChild(this._loader);
      }
    } catch (error) {
      e = error;
      console.log(e);
    }
  };
  _.isLoaderActive = function() {
    return this._loaderThread != null;
  };
  _.showWaitingInfo = function(text, text2, delay = 200) {
    var e;
    try {
      if (this.isWaitingInfoActive()) {
        return;
      }
      this._waitingInfoThread = setTimeout((function() {
        return HUIManager._createWaitPlayersAlert(text, text2);
      }), delay);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.hideWaitingInfo = function() {
    var e;
    try {
      if (!this.isWaitingInfoActive()) {
        return;
      }
      clearTimeout(this._waitingInfoThread);
      this._waitingInfoThread = null;
      if (this._waitPlayers != null) {
        document.getElementById("anetCanvasElements").removeChild(this._waitPlayers);
        this._waitPlayers = null;
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.isWaitingInfoActive = function() {
    return this._waitingInfoThread != null;
  };
  _.notifyError = function(msg) {
    var e;
    try {
      return this._notify.error(msg);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.notifySucess = function(msg) {
    var e;
    try {
      return this._notify.success(msg);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.isInputActive = function() {
    return this._input != null;
  };
  _.showInput = function(placeholder) {
    if (this._input != null) {
      this.removeInput();
    }
    this._createInputField(placeholder);
  };
  _.removeInput = function() {
    if (this._input == null) {
      return;
    }
    // * Не всегда автоматически выключается, поэтому надо выключить флаг вручную
    HUIManager._isMouseHoverHtmlElement = false;
    document.getElementById("anetCanvasElements").removeChild(this._input);
    this._input = null;
  };
  _.focusInput = function() {
    var ref;
    if (this._input == null) {
      return;
    }
    if ((ref = document.getElementById("anetInputName")) != null) {
      ref.focus();
    }
  };
  _.getInputValue = function() {
    var ref;
    if (this._input == null) {
      return "";
    }
    return (ref = document.getElementById("anetInputName")) != null ? ref.value : void 0;
  };
  _.setInputValue = function(value) {
    var ref;
    if (this._input == null) {
      return;
    }
    if ((ref = document.getElementById("anetInputName")) != null) {
      ref.value = value;
    }
  };
  _.updateCanvasHtmlElements = function() {
    if (this._canvasRelativeElements == null) {
      return;
    }
    this._canvasRelativeElements.style.zIndex = 2;
    this._canvasRelativeElements.width = Graphics.width;
    this._canvasRelativeElements.height = Graphics.height;
    Graphics._centerElement(this._canvasRelativeElements);
  };
  // * PRIVATE  ======================================================
  _._loadCSS = function() {
    // * Подгружаем CSS стиль
    document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"css/anet.css\" />");
  };
  _._createLoadSpinner = function() {
    this._loader = document.createElement("div");
    this._loader.id = "anetLoader";
    this._loaderThread = null;
  };
  _._createNotify = function() {
    this._notify = new Notyf({
      duration: 1400,
      position: {
        x: 'center',
        y: 'bottom'
      },
      ripple: false
    });
  };
  // * Информация при ожидании других игроков (или другая информация, ожидание сервера)
  _._createWaitPlayersAlert = function(text, extraText) {
    var htmlCode;
    this._waitPlayers = document.createElement("blockquote");
    this._waitPlayers.id = "anetWaitPlayersAlert";
    this._waitPlayers.classList.add("speech-bubble");
    htmlCode = "<p>" + text + "</p>" + "<cite>" + extraText + "</cite>";
    this._waitPlayers.insertAdjacentHTML('beforeend', htmlCode);
    this._canvasRelativeElements.appendChild(this._waitPlayers);
  };
  // * Элемент родитель, который будет изменяться вместе с размерами Canvas
  // * Это позволит сохранять фиксированные позиции HTML элементов не зависимо от размера окна игры
  _._createRelativeParent = function() {
    this._canvasRelativeElements = document.createElement("div");
    this._canvasRelativeElements.id = "anetCanvasElements";
    this.updateCanvasHtmlElements();
    document.body.appendChild(this._canvasRelativeElements);
  };
  _._createInputField = function(placeholder) {
    var htmlCode;
    this._input = document.createElement("div");
    this._input.id = "anetInput";
    this._input.addEventListener("mouseenter", function() {
      return HUIManager._isMouseHoverHtmlElement = true;
    });
    this._input.addEventListener("mouseleave", function() {
      return HUIManager._isMouseHoverHtmlElement = false;
    });
    this._input.classList.add("form__group");
    this._input.classList.add("field");
    htmlCode = "<input type=\"input\" class=\"form__field\" placeholder=\"" + placeholder + "\" autocomplete=\"off\" name=\"anetInputName\" id='anetInputName' required /> <label for=\"anetInputName\" class=\"form__label\">" + placeholder + "</label>";
    this._input.insertAdjacentHTML('beforeend', htmlCode);
    this._canvasRelativeElements.appendChild(this._input);
  };
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_Map.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
})();

(function() {  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Input.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------

  //TODO: Временно отключил, так как пока нет HUI элементов на карте
  /*if KDCore.isMV()
      #@[ALIAS]
      ALIAS__processMapTouch = _.processMapTouch
      _.processMapTouch = ->
          return if HUIManager.isUnderMouse()
          ALIAS__processMapTouch.call(@)
          return
  else
      #@[ALIAS]
      ALIAS__onMapTouch = _.onMapTouch
      _.onMapTouch = ->
          return if HUIManager.isUnderMouse()
          ALIAS__onMapTouch.call(@)
          return */
  var ALIAS___onKeyDown, ALIAS___shouldPreventDefault, _;
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS___shouldPreventDefault = _._shouldPreventDefault;
  _._shouldPreventDefault = function() {
    // * Чтобы backspace и стрелки работали в поле ввода текста
    if (HUIManager.isInputActive()) {
      return false;
    } else {
      return ALIAS___shouldPreventDefault.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS___onKeyDown = _._onKeyDown;
  _._onKeyDown = function(event) {
    // * Чтобы игнорировать стандартные кнопки Z, X, space во время ввода
    if (HUIManager.isInputActive()) {
      if (event.keyCode === 90 || event.keyCode === 88 || event.keyCode === 32) {
        this.clear();
        return;
      }
    }
    return ALIAS___onKeyDown.call(this, event);
  };
})();

(function() {  // ■ END Input.coffee
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Graphics.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS___updateCanvas, _;
  //@[DEFINES]
  _ = Graphics;
  //@[ALIAS]
  ALIAS___updateCanvas = _._updateCanvas;
  _._updateCanvas = function() {
    ALIAS___updateCanvas.call(this);
    return HUIManager.updateCanvasHtmlElements();
  };
})();

// ■ END Graphics.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Дополнительные расширения для KDCore

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (ANET.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

// * NOTHING

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessage.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
//@[GLOBAL]
var NetMessage;

NetMessage = (function() {
  class NetMessage {
    constructor(socket1) {
      this.socket = socket1;
      this.name = "trace";
      this.from = "";
      this.to = "";
      this.data = "";
      //@myMapId = 0
      //@myPlayerIndex = -1 # * -1 = server
      this.waited = false;
    }

    setName(name) {
      this.name = name;
      return this;
    }

    setTo(socketId) {
      this.to = socketId;
      return this;
    }

    setFrom(socketId) {
      this.from = socketId;
      return this;
    }

    setData(data) {
      this.data = data;
      return this;
    }

    fullName() {
      if ((this.data != null) && this.data.id) {
        return this.name + "_" + this.data.id;
      } else {
        return this.name;
      }
    }

    //setWait: (symbol) ->
    //    @waited = true
    //    Network.waitServerResponse @, symbol
    //    @

      //setRepeat: (symbol) ->
    //    @waited = true
    //    Network.waitServerResponseRepeated @, symbol
    //    @

      //TODO: @socket.to.emit? комната?
    send(data) {
      this.socket.emit(this.name, this._makeData(data));
      return this;
    }

    callback(method, data) {
      this.socket.emit(this.name, this._makeData(data), method);
      return this;
    }

    get(methodA, methodB, timeout, data) {
      var timeoutFunc;
      timeoutFunc = NetMessage.WithTimeout;
      this.socket.emit(this.name, this._makeData(data), timeoutFunc(methodA, methodB, timeout));
      return this;
    }

    //TODO: наверное тут не надо
    broadcast(data) {
      return this.socket.broadcast.emit(this.name, this._makeData(data));
    }

    _makeData(data = null) {
      var netData;
      netData = {};
      if (data == null) {
        data = this.data;
      } else {
        this.data = data;
      }
      netData.data = data;
      netData.from = this.from;
      netData.to = this.to;
      netData.waited = this.waited;
      return netData;
    }

    static SetOwnSocket(socket) {
      return NetMessage.Socket = socket;
    }

    static Trace(text, socket) {
      return this.EmptyMessage(socket).setName("trace").setData(text);
    }

    static EmptyMessage(socket = null) {
      var msg, targetSocket;
      targetSocket = socket;
      if (socket == null) {
        targetSocket = this.Socket;
      }
      msg = new NetMessage(targetSocket);
      if (targetSocket != null) {
        msg.setFrom(targetSocket.id);
      }
      return msg;
    }

    static EmptyMessageWithFlag(flagName, data, socket = null) {
      var msg;
      msg = this.EmptyMessage(socket);
      msg.setData({
        id: flagName,
        content: data
      });
      return msg;
    }

    static WithTimeout(onSuccess, onTimeout, timeout) {
      var called, timer;
      called = false;
      timer = setTimeout(function() {
        if (called) {
          return;
        }
        called = true;
        return onTimeout();
      }, timeout);
      return function(...args) {
        if (called) {
          return;
        }
        called = true;
        clearTimeout(timer);
        return onSuccess.apply(this, args);
      };
    }

  };

  // * Сокет текущего клиента (по умолчанию)
  NetMessage.Socket = null;

  return NetMessage;

}).call(this);

//@[EXTENDD]
window.NMS = NetMessage;

window.NetMessage = NetMessage;

// ■ END NetMessage.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных игрока
var NetPlayerDataWrapper;

NetPlayerDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetPlayerDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetPlayerDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    var plName;
    // * Загружаем с настроек, если нету, то случайное
    if (String.any(ConfigManager.netPlayerName)) {
      plName = ConfigManager.netPlayerName;
    } else {
      if ($gameTemp._tempPlayerNetworkName == null) {
        $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000);
      }
      plName = $gameTemp._tempPlayerNetworkName;
    }
    return {
      id: ANNetwork.myId(),
      name: plName,
      mapId: 0,
      actorId: 0,
      index: 0,
      scene: "",
      characterReady: false,
      isMapMaster: false,
      onEvent: 0,
      onCommonEvent: 0
    };
  };
  _.isCharOnMap = function(p) {
    return p.mapId === $gameMap.mapId() && p.characterReady === true;
  };
  _.isCurrentPlayerActor = function(actor, p) {
    return actor.actorId() === p.actorId;
  };
  _.isOnEvent = function(p, eventId) {
    return p.onEvent === eventId;
  };
  _.getRequestedNetworkState = function(p) {
    if (p.scene === "menu") {
      return 2;
    }
    if (p.scene === "battle") {
      return 5;
    }
    if (p.scene === "chat") {
      return 6;
    }
    if (_.isOnAnyEvent(p)) {
      return 1;
    }
    return -1;
  };
  _.getNetCharacterForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameMap.networkCharacterById(p.id);
  };
  _.getActorForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameActors.actor(p.actorId);
  };
  _.isOnAnyEvent = function(p) {
    if (p == null) {
      return false;
    }
    return (p.onEvent > 0 || p.onCommonEvent > 0) && _.isCharOnMap(p);
  };
})();

// ■ END NetPlayerDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных комнаты
var NetRoomDataWrapper;

NetRoomDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetRoomDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetRoomDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    return {
      name: "Room " + Math.randomInt(100),
      masterId: "",
      masterName: "",
      inGame: false,
      playersIds: [],
      readyPlayersIds: [],
      gameId: 0,
      gameTitle: "",
      rpgVersion: 0,
      maxPlayers: 0,
      gameMode: 0,
      canConnect: true,
      uniqueSaveID: null
    };
  };
  _.isRoomFull = function(r) {
    if (r == null) {
      return true;
    }
    return r.playersIds.length >= r.maxPlayers;
  };
  _.isRoomProperToJoin = function(r) {
    var e, myGameId;
    if (r == null) {
      return false;
    }
    try {
      // * Нельзя подключиться если разные игры
      myGameId = ANET.VD.getGameVersion();
      if (r.gameId !== myGameId) {
        return false;
      }
      // * Пока нельзя подключаться к уже запущенной игре
      if (r.inGame === true) {
        return false;
      }
      // * Нельзя подключаться, если комната полная
      if (_.isRoomFull(r)) {
        return false;
      }
      // * Если разные движки
      if (!_.isMyRPGVersion(r)) {
        return false;
      }
      // * Если комната загрузки сетевого сохранения
      if (_.isLoadGameRoom(r)) {
        // * То клиент должен иметь файл данного сохранения
        if (!DataManager.nIsHaveNetworkSaveWithId(r.uniqueSaveID)) {
          return false;
        }
      }
    } catch (error) {
      // * Если специальный флаг
      //TODO: Пока не обрабатывается
      //if r.canConnect is false
      //    return false
      e = error;
      ANET.w(e);
    }
    return true;
  };
  _.isMyRPGVersion = function(r) {
    if (r == null) {
      return false;
    }
    if (r.rpgVersion === 0) {
      return KDCore.isMZ();
    } else {
      return KDCore.isMV();
    }
  };
  _.isLoadGameRoom = function(r) {
    return r.uniqueSaveID != null;
  };
})();

// ■ END NetRoomDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var NetworkClientHandler;

NetworkClientHandler = class NetworkClientHandler {
  constructor(socket) {
    this.socket = socket;
    this._init();
  }

  disconnect() {
    var ref;
    return (ref = this.socket) != null ? ref.disconnect() : void 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetworkClientHandler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, _C;
  //@[DEFINES]
  _C = null; //? ClientManager
  _ = NetworkClientHandler.prototype;
  _._init = function() {
    _C = NetClientMethodsManager;
    // * Задаём ссылку на собственный сокет в класс сообщений
    // Чтобы можно было отправлять сообщения каждый раз не передавая сокет
    NetMessage.SetOwnSocket(this.socket);
    return this._handleCommands();
  };
  _._handleCommands = function() {
    this._handleBaseSocketEvents();
    this._handleDebugEvents();
    return this._handleANETServerEvents();
  };
  _._handleBaseSocketEvents = function() {
    this.socket.on('disconnect', function() {
      return _C.onDisconnect();
    });
    this.socket.on('connect', function() {
      return _C.onConnect();
    });
    return this.socket.on('connect_error', function() {
      return _C.onConnectionError();
    });
  };
  _._handleDebugEvents = function() {
    return this.socket.on('trace', function(n) {
      return console.log("Trace: " + n);
    });
  };
  _._handleANETServerEvents = function() {
    return this.socket.on('serverPrc', (n) => {
      return this._handleServerPrcEvent(n);
    });
  };
  _._handleServerPrcEvent = function(n) {
    var content, eventHandlerMethodName, flag, id;
    ({id, flag, content} = n);
    eventHandlerMethodName = id + "_" + flag;
    if (_C.isExistPrcEvent(eventHandlerMethodName)) {
      return _C.handlePrcEvent(eventHandlerMethodName, content);
    } else {
      return console.log("Unknown Event from server " + eventHandlerMethodName);
    }
  };
})();

// ■ END NetworkClientHandler.coffee
//---------------------------------------------------------------------------

var Notyf = function () {
    "use strict";
    var n, t, o = function () {
            return (o = Object.assign || function (t) {
                for (var i, e = 1, n = arguments.length; e < n; e++)
                    for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
                return t
            }).apply(this, arguments)
        },
        s = (i.prototype.on = function (t, i) {
            var e = this.listeners[t] || [];
            this.listeners[t] = e.concat([i])
        }, i.prototype.triggerEvent = function (t, i) {
            var e = this;
            (this.listeners[t] || []).forEach(function (t) {
                return t({
                    target: e,
                    event: i
                })
            })
        }, i);

    function i(t) {
        this.options = t, this.listeners = {}
    }(t = n = n || {})[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove";
    var v, e, a = (r.prototype.push = function (t) {
        this.notifications.push(t), this.updateFn(t, n.Add, this.notifications)
    }, r.prototype.splice = function (t, i) {
        var e = this.notifications.splice(t, i)[0];
        return this.updateFn(e, n.Remove, this.notifications), e
    }, r.prototype.indexOf = function (t) {
        return this.notifications.indexOf(t)
    }, r.prototype.onUpdate = function (t) {
        this.updateFn = t
    }, r);

    function r() {
        this.notifications = []
    }(e = v = v || {}).Dismiss = "dismiss";
    var c = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {
                    className: "notyf__icon--success",
                    tagName: "i"
                }
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {
                    className: "notyf__icon--error",
                    tagName: "i"
                }
            }],
            duration: 2e3,
            ripple: !0,
            position: {
                x: "right",
                y: "bottom"
            },
            dismissible: !(e.Click = "click")
        },
        p = (d.prototype.on = function (t, i) {
            var e;
            this.events = o(o({}, this.events), ((e = {})[t] = i, e))
        }, d.prototype.update = function (t, i) {
            i === n.Add ? this.addNotification(t) : i === n.Remove && this.removeNotification(t)
        }, d.prototype.removeNotification = function (t) {
            var i, e, n = this,
                o = this._popRenderedNotification(t);
            o && ((e = o.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) {
                t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e))
            }))
        }, d.prototype.addNotification = function (t) {
            var i = this._renderNotification(t);
            this.notifications.push({
                notification: t,
                node: i
            }), this._announce(t.options.message || "Notification")
        }, d.prototype._renderNotification = function (t) {
            var i, e = this._buildNotificationCard(t),
                n = t.options.className;
            return n && (i = e.classList).add.apply(i, n.split(" ")), this.container.appendChild(e), e
        }, d.prototype._popRenderedNotification = function (t) {
            for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++) this.notifications[e].notification === t && (i = e);
            if (-1 !== i) return this.notifications.splice(i, 1)[0]
        }, d.prototype.getXPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.x) || "right"
        }, d.prototype.getYPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.y) || "bottom"
        }, d.prototype.adjustContainerAlignment = function (t) {
            var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                n = this.container.style;
            n.setProperty("justify-content", e), n.setProperty("align-items", i)
        }, d.prototype._buildNotificationCard = function (n) {
            var t, o = this,
                i = n.options,
                e = i.icon;
            this.adjustContainerAlignment(i);
            var s = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                a = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                r = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                c = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            c.innerHTML = i.message || "";
            var p, d, l, u, f, h = i.background || i.backgroundColor;
            e && "object" == typeof e && (p = this._createHTLMElement({
                tagName: "div",
                className: "notyf__icon"
            }), d = this._createHTLMElement({
                tagName: e.tagName || "i",
                className: e.className,
                text: e.text
            }), (l = null !== (t = e.color) && void 0 !== t ? t : h) && (d.style.color = l), p.appendChild(d), r.appendChild(p)), r.appendChild(c), s.appendChild(r), h && (i.ripple ? (a.style.background = h, s.appendChild(a)) : s.style.background = h), i.dismissible && (u = this._createHTLMElement({
                tagName: "div",
                className: "notyf__dismiss"
            }), f = this._createHTLMElement({
                tagName: "button",
                className: "notyf__dismiss-btn"
            }), u.appendChild(f), r.appendChild(u), s.classList.add("notyf__toast--dismissible"), f.addEventListener("click", function (t) {
                var i, e;
                null !== (e = (i = o.events)[v.Dismiss]) && void 0 !== e && e.call(i, {
                    target: n,
                    event: t
                }), t.stopPropagation()
            })), s.addEventListener("click", function (t) {
                var i, e;
                return null === (e = (i = o.events)[v.Click]) || void 0 === e ? void 0 : e.call(i, {
                    target: n,
                    event: t
                })
            });
            var m = "top" === this.getYPosition(i) ? "upper" : "lower";
            return s.classList.add("notyf__toast--" + m), s
        }, d.prototype._createHTLMElement = function (t) {
            var i = t.tagName,
                e = t.className,
                n = t.text,
                o = document.createElement(i);
            return e && (o.className = e), o.textContent = n || null, o
        }, d.prototype._createA11yContainer = function () {
            var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t
        }, d.prototype._announce = function (t) {
            var i = this;
            this.a11yContainer.textContent = "", setTimeout(function () {
                i.a11yContainer.textContent = t
            }, 100)
        }, d.prototype._getAnimationEndEventName = function () {
            var t, i = document.createElement("_fake"),
                e = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
            for (t in e)
                if (void 0 !== i.style[t]) return e[t];
            return "animationend"
        }, d);

    function d() {
        this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
            left: "flex-start",
            center: "center",
            right: "flex-end"
        }, this.Y_POSITION_FLEX_MAP = {
            top: "flex-start",
            center: "center",
            bottom: "flex-end"
        };
        var t = document.createDocumentFragment(),
            i = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
        t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
    }

    function l(t) {
        var n = this;
        this.dismiss = this._removeNotification, this.notifications = new a, this.view = new p;
        var i = this.registerTypes(t);
        this.options = o(o({}, c), t), this.options.types = i, this.notifications.onUpdate(function (t, i) {
            return n.view.update(t, i)
        }), this.view.on(v.Dismiss, function (t) {
            var i = t.target,
                e = t.event;
            n._removeNotification(i), i.triggerEvent(v.Dismiss, e)
        }), this.view.on(v.Click, function (t) {
            var i = t.target,
                e = t.event;
            return i.triggerEvent(v.Click, e)
        })
    }
    return l.prototype.error = function (t) {
        var i = this.normalizeOptions("error", t);
        return this.open(i)
    }, l.prototype.success = function (t) {
        var i = this.normalizeOptions("success", t);
        return this.open(i)
    }, l.prototype.open = function (i) {
        var t = this.options.types.find(function (t) {
                return t.type === i.type
            }) || {},
            e = o(o({}, t), i);
        this.assignProps(["ripple", "position", "dismissible"], e);
        var n = new s(e);
        return this._pushNotification(n), n
    }, l.prototype.dismissAll = function () {
        for (; this.notifications.splice(0, 1););
    }, l.prototype.assignProps = function (t, i) {
        var e = this;
        t.forEach(function (t) {
            i[t] = null == i[t] ? e.options[t] : i[t]
        })
    }, l.prototype._pushNotification = function (t) {
        var i = this;
        this.notifications.push(t);
        var e = void 0 !== t.options.duration ? t.options.duration : this.options.duration;
        e && setTimeout(function () {
            return i._removeNotification(t)
        }, e)
    }, l.prototype._removeNotification = function (t) {
        var i = this.notifications.indexOf(t); - 1 !== i && this.notifications.splice(i, 1)
    }, l.prototype.normalizeOptions = function (t, i) {
        var e = {
            type: t
        };
        return "string" == typeof i ? e.message = i : "object" == typeof i && (e = o(o({}, e), i)), e
    }, l.prototype.registerTypes = function (t) {
        var i = (t && t.types || []).slice();
        return c.types.map(function (e) {
            var n = -1;
            i.forEach(function (t, i) {
                t.type === e.type && (n = i)
            });
            var t = -1 !== n ? i.splice(n, 1)[0] : {};
            return o(o({}, e), t)
        }).concat(i)
    }, l
}();
// Generated by CoffeeScript 2.5.1
// * Данный класс хранит сетевые методы игры

//$[ENCODE]

//@[GLOBAL]
window.ANGameManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetGame");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANGameManager;
  _.isShouldWaitServer = function() {
    return this._waitMode != null;
  };
  // * Инициализация начальных данных (при подключении надо вызывать)
  _.init = function() {
    this.reset();
    this.createMyPlayerData();
    return ANPlayersManager.sendPlayerName();
  };
  // * Когда происходит отключение от сервера
  _.reset = function() {
    // * Флаг что игра только началась и надо установить персонажа когда карта загрузится
    this.networkGameStarted = false;
    this._waitMode = null;
    this.playersData = null;
    ANBattleManager.battleData = null;
  };
  _.createMyPlayerData = function() {
    // * Данные всех игроков в игре
    this.playersData = [];
    // * Сразу добавляем себя
    this.playersData.push(NetPlayerDataWrapper.createLocal());
  };
  _.isInited = function() {
    return this.playersData != null;
  };
  _.myPlayerData = function() {
    return this.getPlayerDataById(ANNetwork.myId());
  };
  _.myActorId = function() {
    return this.myPlayerData().actorId;
  };
  _.myIndex = function() {
    return this.myPlayerData().index;
  };
  _.isMapMaster = function() {
    return this.myPlayerData().isMapMaster === true;
  };
  // * Дублируется для удобства
  _.isBattleMaster = function() {
    return ANBattleManager.isBattleMaster();
  };
  _.isPlayerDataExists = function(id) {
    var data;
    data = this.playersData.find(function(p) {
      return p.id === id;
    });
    return data != null;
  };
  _.getPlayerDataById = function(id) {
    var data;
    data = this.playersData.find(function(p) {
      return p.id === id;
    });
    if (data != null) {
      return data;
    } else {
      ANET.w("Player data for " + id + " not found!");
    }
    return null;
  };
  _.getPlayerDataByActorId = function(actorId) {
    var data;
    data = this.playersData.find(function(p) {
      return p.actorId === actorId;
    });
    if (data != null) {
      return data;
    } else {
      ANET.w("Player data for Actor with ID " + actorId + " not found!");
    }
    return null;
  };
  _.setupNewNetworkGame = function() {
    this.networkGameStarted = true;
    return $gameParty.setupNetworkGame();
  };
  // * Когда клиент переходит на новую (другую) карту (а не на туже самую)
  _.onNewGameMapSetup = function() {
    // * На всякий случай и тут отключу
    $gameTemp._nLocalActorMode = false;
    this._shouldWaitPlayerOnSameMap = ANNetwork.isSameMapMode();
  };
  // * Когда на клиенте загрузилась карта
  _.onMapLoaded = function() {
    // * Отправляем что мы на карте (загрузились)
    ANMapManager.sendMapLoaded();
    // * Отправляем начальные данные (позиция игрока)
    ANMapManager.sendInitialMapData();
    // * Если загрузка
    if (ANET.Utils.isLoadGameRoom()) {
      // * Ждём игроков (Только при параметре)
      if (this._shouldWaitPlayerOnSameMap === true) {
        this.setWait('playersOnMap');
      } else {
        this.bindingActors(); // * Присвоение персонажей
      }
    } else {
      // * Ждём игроков (при параметре и если новая игра (чтобы начать события например))
      if (this._shouldWaitPlayerOnSameMap === true || this.networkGameStarted === true) {
        this.setWait('playersOnMap');
      }
    }
  };
  _.setWait = function(_waitMode) {
    this._waitMode = _waitMode;
    return HUIManager.showLoader(500);
  };
  _.resetWait = function() {
    this.setWait(null);
    return HUIManager.hideLoader();
  };
  //  * Все ли игроки на данной карте (и сцене)
  _.isAllPlayerOnSameMap = function() {
    //TODO: проверка что на сцене отдельно
    return this.playersData.every(function(p) {
      return p.mapId === $gameMap.mapId();
    });
  };
  // * Другие игроки (кроме этого клиента)
  _.anotherPlayers = function() {
    var myIndex;
    myIndex = this.myIndex();
    return this.playersData.filter(function(p) {
      return p.index !== myIndex;
    });
  };
  // * Все игроки (кроме клиента) на текущей карте (именно на карте, не обязательно на Сцене карты)
  _.anotherPlayersOnMap = function() {
    return this.anotherPlayers().filter(function(p) {
      return NetPlayerDataWrapper.isCharOnMap(p);
    });
  };
  // * Все ли игроки настроили персонажей
  _.isAllPlayersActorsReady = function() {
    return this.playersData.every(function(p) {
      return p.characterReady === true;
    });
  };
  // * Обновить иконку состояния игроков
  _.refreshNetworkStates = function() {
    var char, i, len, p, players, stateId;
    // * Используется _, так как метод вызывается в отдельном потоке тоже
    players = this.anotherPlayersOnMap();
    for (i = 0, len = players.length; i < len; i++) {
      p = players[i];
      stateId = NetPlayerDataWrapper.getRequestedNetworkState(p);
      char = NetPlayerDataWrapper.getNetCharacterForPlayer(p);
      if (char != null) {
        char.requestNetworkStateIcon(stateId);
      }
    }
  };
  // * Задаём игрового персонажа
  _.bindingActors = function() {
    "START BINDING ACTORS".p();
    this.networkGameStarted = false;
    if (ANET.PP.isActorSelectionAllowed() || ANET.Utils.isLoadGameRoom()) {
      this.actorBingingFromSelection();
    } else {
      this.staticActorBinging();
    }
  };
  // * Персонаж, выбранный из списка
  _.actorBingingFromSelection = function() {
    // * Так как персонаж уже был выбран в лобби, то сразу отправляем готовнотсть
    ANPlayersManager.sendActorReady();
  };
  // * Статический режимм присвоения персонажа
  _.staticActorBinging = function() {
    var actorId;
    // * -1, так как myIndex начинается с 1, а массив с 0
    actorId = ANET.PP.actorsForNetwork()[this.myIndex() - 1];
    //  * Пытаемся зарезервировать персонажа
    ANPlayersManager.sendBindActorFromGame(actorId);
  };
  // * Ожидание данных (игроков) от сервера
  _.updateWaiting = function() {
    if (!this.isShouldWaitServer()) {
      return;
    }
    switch (this._waitMode) {
      case 'playersOnMap':
        if (this.isAllPlayerOnSameMap()) {
          this.resetWait();
          this._shouldWaitPlayerOnSameMap = false;
          if (this.networkGameStarted === true) {
            this.bindingActors();
          }
        }
        break;
      case 'playersActors':
        if (this.isAllPlayersActorsReady()) {
          this.resetWait();
          this.startGame();
        }
        break;
    }
  };
  // * Начать игру (когда все уже определились с персонажами)
  // * just wait manul reset
  // * Ждёт когда ожидание будет сброшено вручную
  _.startGame = function() {
    "READY TO START GAME".p();
    ANMapManager.sendInitialMapData();
    if (!ANET.Utils.isLoadGameRoom()) {
      this.showStartGameChatMessage();
    }
  };
  // * Приветственное сообщение (системное) в чат
  _.showStartGameChatMessage = function() {
    var message;
    if (!ANET.PP.isGameChatAllowed()) {
      return;
    }
    message = ANET.PP.getChatStartMessage();
    if (!String.any(message)) {
      return;
    }
    ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message));
  };
  // * Когда игрок покидает игру (disconnect)
  _.anotherPlayerLeaveGame = function(actorId) {
    var ceId;
    LOG.p("Player leave game");
    ceId = ANET.PP.getPlayerLeaveGameCommonEventId();
    if (ceId > 0) {
      $gameTemp.reserveCommonEvent(ceId);
    }
  };
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendSceneChanging = function() {
    var sceneType;
    sceneType = "unknown";
    // * Тут не учитывается наследовательность, определяется точный класс через ===
    // * Чтобы на всех сценах, кроме карты была иконка, сделал через unless
    // * Это лучше, чем проверять все все сцены
    if (!SceneManager.isNextScene(Scene_Map)) {
      sceneType = "menu";
    }
    if (SceneManager.isNextScene(Scene_Battle)) {
      sceneType = "battle";
    }
    if (SceneManager.isNextScene(Scene_NetChatInput)) {
      sceneType = "chat";
    }
    ANNetwork.send(NMS.Game("sceneChange", sceneType));
  };
  // * Это запрос от мастер клиента на другие клиенты, что надо выполнить сохранение
  _.sendSaveDataRequest = function(savefileId) {
    var data;
    data = {
      uniqueSaveID: $gameTemp.nUniqueSaveID,
      savefileId: savefileId
    };
    ANNetwork.send(NMS.Game("saveDataRequest", data));
  };
  // * Это ответ от клиента, что он выполнил сохранение
  _.sendSaveDataCompleteFlag = function() {
    ANNetwork.send(NMS.Game("saveDataComplete", this.myActorId()));
  };
  // * Отправить сообщение в чат от текущего клиента
  _.sendMyChatMessage = function(channelId, message) {
    this.sendRawChatMessage(channelId, this.myActorId(), message);
  };
  _.sendRawChatMessage = function(channelId, actorId, message) {
    var data;
    data = ANET.Utils.buildChatMessage(channelId, actorId, message);
    ANNetwork.callback(NMS.Game("chatMessage", data), function() {
      return ANET.UI.addMessageToChat(data);
    });
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================

  //? СОБЫТИЯ (обработка событий от сервера, вызываются из NETClientMethodsManager)
  // * ===============================================================
  _.onPlayerName = function(playerId, name) {
    var playerData;
    if (this.isPlayerDataExists()) {
      playerData = this.getPlayerDataById(playerId);
      if (playerData != null) {
        playerData.name = name;
      }
    } else {

    }
  };
  // * Данные об игроках в комнате (подключился, ушёл и т.д.)
  // * Тут архитектурная ошибка или просчёт, суть в том, что когда покидаешь комнату,
  // * приходят данные о игроках команты, а текущего клиента нету, а так как идёт
  // * замена полностью (присваивание), теряются данные текущего игрока
  // * Поэтому проверяется, если данных текущего клиента нету (а это невозможно)
  // * то мы их снова добавляем
  //  * Значит смена имени игрока, с которым мы не в комнате
  // Пока ничего не делаем, так как не видим всех игроков на сервере
  _.onRoomPlayers = function(data) {
    var myPlayerData;
    // * Копия наших данных
    myPlayerData = this.myPlayerData();
    this.playersData = data;
    // * Если наших данных нету (когда покинули комнату бывает такое)
    // * добавляем копию своих данных
    if (!this.getPlayerDataById(ANNetwork.myId())) {
      this.playersData.push(myPlayerData);
    }
  };
  // * Данные (состояния) об игроках (NetPlayer Data новые)
  _.onGamePlayers = function(data) {
    this.onRoomPlayers(data);
    // * Проверить состояние для всех игроков (иконки)
    this.refreshNetworkStates();
    $gameMap.nSafeRefresh();
  };
  // * Когда кто-то из игроков выбрал своего персонажа (готов к игре)
  _.onRefreshGameParty = function() {
    var i, len, plData, ref;
    $gameParty._actors = [];
    ref = this.playersData;
    for (i = 0, len = ref.length; i < len; i++) {
      plData = ref[i];
      if (plData.actorId > 0 && plData.characterReady === true) {
        $gameParty._actors.push(plData.actorId);
      }
    }
    $gamePlayer.refresh();
    $gameMap.nSafeRefresh();
  };
  _.onLeaveRoom = function() {
    // * Удаляем остальных игроков, оставляем себя
    return this.createMyPlayerData();
  };
})();

//@[EXTEND]
window.NGAME = ANGameManager;

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]
var DataObserver;

DataObserver = class DataObserver {
  constructor(_checkTime = 0, _instante = false) {
    this._checkTime = _checkTime;
    this._instante = _instante;
    this._fields = {};
    this._isDataChanged = false;
    this._isShouldSkipCheck = false;
    this._timer = 0;
    return;
  }

  // * отправка без проверки изменений (по таймеру, если задан)
  setInstanteMode() {
    return this._instante = true;
  }

  // * проверка изменений (по таймеру, если задан)
  setCheckMode() {
    return this._instante = false;
  }

  // * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
  setCheckInterval(_checkTime) {
    this._checkTime = _checkTime;
  }

  // * Пропустить проверку данных, например когда данные пришли от сервера
  skip() {
    return this._isShouldSkipCheck = true;
  }

  addFields(obj, fieldsList) {
    var f, i, len;
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      this.readField(obj, f);
    }
  }

  removeFields(fieldsList) {
    var f, i, len, results;
    results = [];
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      results.push(delete this._fields[f]);
    }
    return results;
  }

  // * Прочитать все значения с объекта
  refreshAll(obj) {
    var f;
    for (f in this._fields) {
      this.readField(obj, f);
    }
    return this._isDataChanged = false;
  }

  readField(obj, field) {
    return this._fields[field] = obj[field];
  }

  check(obj) {
    var f;
    // * Если данные изменены, но зачем снова проверять?
    // * Всё равно не отслеживается какое именно поле было изменнено
    if (this.isDataChanged()) {
      return;
    }
    this._timer--;
    // * Если таймер, то ждём, не проверяем
    if (this._timer > 0) {
      return;
    }
    this._timer = this._checkTime;
    // * Если надо пропустить проверку, то пропускаем
    if (this._isShouldSkipCheck === true) {
      this._isShouldSkipCheck = false;
      return;
    }
    // * Если постоянное обновление, то сразу флаг и пропускаем проверку
    if (this._instante === true) {
      this._isDataChanged = true;
      return;
    }
    for (f in this._fields) {
      if (obj[f] !== this._fields[f]) {
        this._isDataChanged = true;
        break;
      }
    }
  }

  isDataChanged() {
    return this._isDataChanged === true;
  }

  // * Получить данные всех полей для отправки на сервер
  getDataForNetwork(obj) {
    this.refreshAll(obj);
    return this._fields;
  }

  // * Установить данные всех полей, когда пришли с сервера
  setDataFromNetwork(obj, observerData) {
    var f;
    for (f in this._fields) {
      obj[f] = observerData[f];
    }
    this.refreshAll(obj);
  }

};

// Generated by CoffeeScript 2.5.1
//$[ENCODE]

//@[GLOBAL]
window.NetClientMethodsManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetClientMethodsManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NET Client");
  LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200));
  LOG.on();
  //@[DEFINES]
  _ = window.NetClientMethodsManager;
  _.setConnectionToMasterCallback = function(onConnectCallback) {
    this.onConnectCallback = onConnectCallback;
  };
  _.onConnect = function() {
    LOG.p("Connected");
    // * Проверка версии сервера и клиента на соответствие
    ANNetwork.callback(NMS.Lobby("serverVerCheck", ANET.ServerRev), function(result) {
      if (!result) {
        LOG.p("Client not match server version");
        window.alert("Please update Alpha NET Z plugin");
        return ANNetwork.stop();
      }
    });
    if (this.onConnectCallback != null) {
      return this.onConnectCallback(1);
    }
  };
  _.onDisconnect = function() {
    var ref;
    LOG.p("Disconnected");
    // * Общее событие на все сцены
    if ((ref = SceneManager._scene) != null) {
      ref.onLostConnection();
    }
    HUIManager.notifyError("Disconnected from server");
    return ANNetwork.stop();
  };
  _.onConnectionError = function() {
    LOG.p("Can't connect to server!");
    if (this.onConnectCallback != null) {
      this.onConnectCallback(0);
    }
    return ANNetwork.stop();
  };
  // * Существует ли метод для обработки команды от сервера?
  _.isExistPrcEvent = function(eventHandlerMethodName) {
    return NetClientMethodsManager["event_" + eventHandlerMethodName] != null;
  };
  // * Выполнить команду от сервера
  _.handlePrcEvent = function(eventHandlerMethodName, content) {
    var noLog;
    noLog = ["game_observerData", "map_eventMove", "map_playerMove", "battle_battleMethod", "battle_battleMethodReceived"].contains(eventHandlerMethodName);
    if (!noLog) {
      LOG.p("Handle Event: " + eventHandlerMethodName);
    }
    NetClientMethodsManager["event_" + eventHandlerMethodName](content);
    // * Вызвать метод на сцене, если он существует
    // * Сцена уже сама знает, надо ей обновить (перерисовать) что-то или нет,
    // * определяет по имени метода
    this.callSceneCallback(eventHandlerMethodName);
    if (!noLog) {
      LOG.p("Event End: " + eventHandlerMethodName);
    }
  };
  _.callSceneCallback = function(eventName) {
    var ref;
    return (ref = SceneManager._scene) != null ? ref.onServerEvent(eventName) : void 0;
  };
  //? ОБРАБОТКА КОМАНД ОТ СЕРВЕРА
  // * =========================================================================

  //TODO: Это возможно и не нужно, так как игрок имя может поменять только перед входом в комнату( созданием)
  _.event_lobby_changePlayerName = function(content) {
    return ANGameManager.onPlayerName(content.who, content.name);
  };
  _.event_lobby_refreshRoomData = function(content) {
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    ANGameManager.onRoomPlayers(content.playersData);
    return ANNetwork.onRoomDataFromServer(content.room);
  };
  _.event_lobby_roomClosed = function(content) {
    return ANNetwork.onRoomClosed();
  };
  _.event_lobby_startGame = function() {
    ANGameManager.setupNewNetworkGame();
    return "STARTING GAME".p();
  };
  _.event_game_playersData = function(content) {
    ANGameManager.onGamePlayers(content);
    return "GAME PLAYERS DATA REFRESHED".p();
  };
  _.event_game_refreshParty = function() {
    ANGameManager.onRefreshGameParty();
    return "REFRESH PARTY".p();
  };
  _.event_game_observerData = function(content) {
    var e;
    try {
      return ANSyncDataManager.onObserverData(content.id, content.type, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_game_observerData", e);
    }
  };
  _.event_game_variable = function(content) {
    var e;
    try {
      return ANSyncDataManager.onVariableValue(content.id, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_game_variable", e);
    }
  };
  _.event_game_switch = function(content) {
    var e;
    try {
      return ANSyncDataManager.onSwitchValue(content.id, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_game_switch", e);
    }
  };
  _.event_game_saveDataRequest = function(content) {
    var e;
    try {
      $gameTemp.nUniqueSaveID = content.uniqueSaveID;
      // * Сохранение выполненно
      $gameSystem.onBeforeSave();
      DataManager.saveGame(content.savefileId);
      //TODO: Тут желательно ждать положительный результат, но пока сразу отправим флаг
      return ANGameManager.sendSaveDataCompleteFlag();
    } catch (error) {
      e = error;
      return console.warn("event_game_saveDataRequest", e);
    }
  };
  _.event_game_saveDataComplete = function(content) {
    var e, savedActorId;
    try {
      // * Если данный клиент не запускал сохранение, то игнор
      if ($gameTemp.nSaveData == null) {
        return;
      }
      savedActorId = content;
      //console.log(savedActorId)
      return $gameTemp.nSaveData.onAnswer(savedActorId, true);
    } catch (error) {
      e = error;
      return console.warn("event_game_saveDataComplete", e);
    }
  };
  _.event_game_chatMessage = function(content) {
    var channelId, e, mapId;
    try {
      mapId = content.mapId;
      channelId = content.channelId;
      if (channelId > 0) { // * MAP
        if ((mapId != null) && mapId === $gameMap.mapId()) {
          return ANET.UI.addMessageToChat(content);
        }
      } else {
        return ANET.UI.addMessageToChat(content);
      }
    } catch (error) {
      e = error;
      return console.warn("event_game_chatMessage", e);
    }
  };
  _.event_map_playerMove = function(content) {
    var e;
    try {
      return ANPlayersManager.onPlayerMove(content.id, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_map_playerMove", e);
    }
  };
  _.event_map_playerLocation = function(content) {
    var e;
    try {
      return ANPlayersManager.onPlayerLocation(content.id, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_map_playerLocation", e);
    }
  };
  _.event_map_eventMove = function(content) {
    var e;
    try {
      return ANMapManager.onEventMove(content.mapId, content.id, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_map_eventMove", e);
    }
  };
  // * Если пришёл этот метод, то надо отправить данные свои на карте, для синхронизации
  _.event_map_initialMapSynchronization = function(content) {
    var e;
    try {
      if ($gameMap.mapId() === content) {
        return ANMapManager.onInitialMapSync();
      }
    } catch (error) {
      e = error;
      return console.warn("event_map_eventMove", e);
    }
  };
  _.event_event_virtualEventCommand = function(content) {
    var e;
    try {
      return ANInterpreterManager.onVirtualCommand(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_virtualEventCommand", e);
    }
  };
  _.event_battle_battleMethod = function(content) {
    var e;
    try {
      return ANBattleManager.onBattleMethod(content.id, content.method, content.data);
    } catch (error) {
      e = error;
      return console.warn("event_battle_battleMethod", e);
    }
  };
  _.event_battle_animation = function(content) {
    var e;
    try {
      return ANBattleManager.onBattleAnimation(content);
    } catch (error) {
      e = error;
      return console.warn("event_battle_animation", e);
    }
  };
  _.event_battle_battleMethodReceived = function(content) {
    var e;
    try {
      return ANBattleManager.onBattleMethodReceived();
    } catch (error) {
      e = error;
      return console.warn("event_battleMethodReceived", e);
    }
  };
  _.event_battle_logMessage = function(content) {
    var e;
    try {
      return ANBattleManager.onLogWindowMessage(content.cmd, content.text);
    } catch (error) {
      e = error;
      return console.warn("event_battle_logMessage", e);
    }
  };
  _.event_battle_input = function(content) {
    var e;
    try {
      return ANBattleManager.onBattleInputState(content.inputState, content.inputActorId);
    } catch (error) {
      e = error;
      return console.warn("event_battle_input", e);
    }
  };
  _.event_battle_inputAction = function(content) {
    var e;
    try {
      return ANBattleManager.onBattleInputAction(content.inputActorId, content.action);
    } catch (error) {
      e = error;
      return console.warn("event_battle_inputAction", e);
    }
  };
  _.event_battle_serverBattleData = function(content) {
    var e;
    try {
      // * Обновляем данные, затем вызывается уже event сцены битвы
      return ANBattleManager.onBattleDataFromServer(content);
    } catch (error) {
      e = error;
      return console.warn("event_battle_serverBattleData", e);
    }
  };
  _.event_event_registerOnShared = function(content) {
    var e;
    try {
      "SHARED EVENT IN".p();
      return ANInterpreterManager.onRegisterOnSharedEventRequest(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_registerOnShared", e);
    }
  };
  _.event_event_registerDone = function(content) {
    var e;
    try {
      "SHARED EVENT ANSWER".p();
      return ANInterpreterManager.onRegisterOnSharedEventResponse(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_registerDone", e);
    }
  };
  _.event_event_sharedCanContinue = function(content) {
    var e;
    try {
      "SHARED EVENT CAN CONTINUE".p();
      return ANInterpreterManager.onContinueSharedEvent(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_sharedCanContinue", e);
    }
  };
  _.event_event_sharedForceCancel = function(content) {
    var e;
    try {
      "SHARED EVENT FORCE CANCELLED".p();
      return ANInterpreterManager.onSharedEventForceCancelFromServer(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_sharedForceCancel", e);
    }
  };
  _.event_event_sharedChoice = function(content) {
    var e;
    try {
      "SHARED EVENT CHOICE ACTION".p();
      return ANInterpreterManager.onSharedEventChoiceActionFromServer(content);
    } catch (error) {
      e = error;
      return console.warn("event_event_sharedForceCancel", e);
    }
  };
  _.event_game_userCommand = function(content) {
    var data, e, name;
    try {
      "CUSTOM COMMAND IN".p();
      ({name, data} = content);
      return nAPI.onCustomCommand(name, data);
    } catch (error) {
      e = error;
      return console.warn("event_game_userCommand", e);
    }
  };
  _.event_game_customCommandLink = function(content) {
    var commonEventId, e, name;
    try {
      "CUSTOM LINK IN".p();
      ({name, commonEventId} = content);
      return typeof $gameSystem !== "undefined" && $gameSystem !== null ? $gameSystem.nRegisterCustomCommandCE(name, commonEventId) : void 0;
    } catch (error) {
      e = error;
      return console.warn("event_game_userCommand", e);
    }
  };
})();

// ■ END NetClientMethodsManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку данных в бою

//$[ENCODE]

//@[GLOBAL]
window.ANBattleManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetBattle");
  LOG.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(135));
  LOG.on();
  //@[DEFINES]
  _ = window.ANBattleManager;
  _.isBattleMaster = function() {
    if (this.battleData != null) {
      return this.battleData.actors[0] === ANGameManager.myActorId();
    } else {
      return $gameParty.inBattle();
    }
  };
  _.isBattleRegistred = function() {
    return this.battleData != null;
  };
  _.isBattleLocal = function() {
    if (this.battleData != null) {
      return this.battleData.isLocal;
    } else {
      return true;
    }
  };
  _.isShouldWaitServer = function() {
    return this._waitMode != null;
  };
  _.battleMembers = function() {
    if (this.isBattleRegistred()) {
      return this.battleData.actors.map(function(a) {
        return $gameActors.actor(a);
      });
    } else {
      return [$gameParty.leader()];
    }
  };
  _.setWait = function(_waitMode) {
    this._waitMode = _waitMode;
    this._waitPool = 0;
    this._waitTimeout = 360;
    return HUIManager.showLoader(1000);
  };
  _.resetWait = function() {
    this.setWait(null);
    return HUIManager.hideLoader();
  };
  _.update = function() {
    if (this.isShouldWaitServer()) {
      if (this._waitTimeout <= 0) {
        LOG.p("TIME OUT");
        this.resetWait();
      } else {
        this._waitTimeout--;
        this.updateWaiting();
      }
    } else {
      if (this._battleMethodsPool.length > 0) {
        this._callBattleMethodOnServer(...this._battleMethodsPool.shift());
      }
      if (HUIManager.isLoaderActive()) {
        HUIManager.hideLoader();
      }
    }
  };
  // * Ожидание данных (игроков) от сервера
  _.updateWaiting = function() {
    if (!this.isShouldWaitServer()) {
      return;
    }
    "WAIT".p(this._waitPool);
    switch (this._waitMode) {
      case 'battleMethod':
        if (this._waitPool === $gameParty.battleMembers().length) {
          this.resetWait();
        }
    }
  };
  _.updateInputChange = function() {
    if ($gameParty.isOneBattler()) {
      return;
    }
    if (this._lastBattleManagerInputActor !== BattleManager._currentActor) {
      this._lastBattleManagerInputActor = BattleManager._currentActor;
      this.sendInputState();
    } else if (this._lastBattleManagerInputValue !== BattleManager._inputting) {
      this._lastBattleManagerInputValue = BattleManager._inputting;
      this.sendInputState();
    }
  };
  _.registerOnLocalBattle = function() {
    this.battleData = {
      isLocal: true,
      battleId: "local",
      actors: [ANGameManager.myActorId()]
    };
    LOG.p("STARTED LOCAL BATTLE");
  };
  _.onBattleStarted = function() {
    this._battleMethodsPool = [];
    this._lastBattleManagerInputValue = false;
    this._lastBattleManagerInputActor = null;
    this.sendBattleStarted();
  };
  _.onBattleEnd = function() {
    if (!this.isBattleLocal()) {
      this.sendBattleEnded();
    }
    this.battleData = null;
  };
  _.callBattleMethod = function(battler, method, args) {
    // * Если в бою только один игрок, то ничего не отправляем (чтобы не грузить сеть)
    if ($gameParty.isOneBattler()) {
      return;
    }
    if (ANET.PP.isForceBattleSyncMode()) {
      if (this._battleMethodsPool == null) {
        this._battleMethodsPool = [];
      }
      this._battleMethodsPool.push([battler, method, args]);
    } else {
      this._callBattleMethodOnServer(battler, method, args);
    }
  };
  
  // * Отправка метод из очереди (используется в режиме Force Battle Sync)
  _._callBattleMethodOnServer = function(battler, method, args) {
    "CALL BATTLE METHOD".p();
    // * Обновим данные перед методом битвы
    // * Без этого был баг, что приходил collapse эффект, а hp = 0 уже после
    ANSyncDataManager.sendBattlerObserver(battler);
    // * На всякий случай, чтобы не сбивать основную логику обновления
    battler.netDataObserver._isDataChanged = true;
    this.sendBattleMethod(method, battler.packForNetwork(), args);
    if (ANET.PP.isForceBattleSyncMode()) {
      // * Будем ждать игроков
      this.setWait('battleMethod');
      this._waitPool += 1; // * Мы уже готовы (мастер боя)
    }
  };
  // * Анимация в бою
  _.requestAnimation = function(targets, animationId, mirror = false) {
    var converted, data;
    if ($gameParty.isOneBattler()) {
      return;
    }
    converted = targets.map(function(t) {
      return t.packForNetwork();
    });
    data = {
      animationId: animationId,
      mirror: mirror,
      targets: converted
    };
    this.sendBattleAnimation(data);
  };
  // * Персонаж данного игрока сделал выбор в бою (ввод команды)
  _.battleInputActionDone = function() {
    var action;
    action = BattleManager.inputtingAction();
    // * Логика боя в MV другая, поэтому доп. проверка
    if (KDCore.isMV()) {
      if (action == null) {
        return;
      }
    }
    this.sendBattleInputAction(ANGameManager.myActorId(), action);
  };
  // * Регистрация на битву
  _.registerOnBattle = function(battleData) {
    LOG.p("Try register battle: " + battleData.battleId);
    return this.sendRegisterOnBattle(battleData);
  };
  // * Регистрация (вступление в битву) которая уже была начата
  _._registerToExistsSharedBattle = function() {
    LOG.p("Join Shared battle");
    $gameTemp._requestInitialSharedBattleRefresh = true;
  };
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================

  // * Отправить выбранное игроком (в битве) действие
  _.sendBattleInputAction = function(inputActorId, action) {
    ANNetwork.send(NMS.Battle("inputAction", {action, inputActorId}));
  };
  // * Отправить изменение состояния ввода
  _.sendInputState = function() {
    var inputActorId, inputState;
    inputState = BattleManager._inputting;
    if (BattleManager._currentActor != null) {
      inputActorId = BattleManager._currentActor.actorId();
    } else {
      inputActorId = null;
    }
    ANNetwork.send(NMS.Battle("input", {inputState, inputActorId}));
  };
  // * Отправить команду WindowLog на сервер
  _.sendWindowLogMessage = function(cmd, text) {
    ANNetwork.send(NMS.Battle("logMessage", {cmd, text}));
  };
  _.sendBattleStarted = function() {
    return ANNetwork.send(NMS.Battle("started"));
  };
  _.sendBattleEnded = function() {
    return ANNetwork.send(NMS.Battle("ended"));
  };
  _.sendBattleMethod = function(methodName, id, args) {
    var data;
    data = {
      method: methodName,
      id: id,
      data: args
    };
    ANNetwork.send(NMS.Battle("battleMethod", data), true);
  };
  _.sendBattleAnimation = function(data) {
    ANNetwork.send(NMS.Battle("animation", data));
  };
  _.sendBattleMethodReceived = function() {
    ANNetwork.send(NMS.Battle("battleMethodReceived"));
  };
  _.sendRegisterOnBattle = function(battleData) {
    ANNetwork.get(NMS.Battle("register", battleData), function(result) {
      return ANBattleManager.onBattleRegisterResult(result);
    }, function() {
      // * Снять флаг сетевой битвы (чтобы сцена Start выполнела)
      BattleManager.nSetNetworkBattle(null);
      // * Запускаем локальную битву (чтобы battleData существовал)
      return ANBattleManager.registerOnLocalBattle();
    });
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onBattleDataFromServer = function(battleData) {
    // * Если этот клиент не участвует в битве, то ничего
    if (!this.isBattleRegistred()) {
      return;
    }
    // * Если я в локальной битве (сам), то меня не касается
    if (this.isBattleLocal()) {
      return;
    }
    // * Данные битвы касаются моей битвы?
    if (this.battleData.battleId === battleData.battleId) {
      $gameTemp._previousNetBattleActors = [...this.battleData.actors];
      this.battleData = battleData;
    }
  };
  _.onBattleRegisterResult = function(result) {
    var _evCallback;
    "REGISTER SUCCESS".p();
    this.battleData = result;
    // * Эта команда обязательно должны быть ниже этой @battleData = result
    // * После регистрации на сетевую битву, устанавливается Troop
    // * из сервера, чтобы у всех одинаковый был
    // * Чтобы не сбросился callback результата битвы, переносим его
    // * Так как initMembers получается второй раз вызывается
    _evCallback = BattleManager._eventCallback;
    BattleManager.setup(...result.options);
    if (_evCallback != null) {
      BattleManager.setEventCallback(_evCallback);
    }
    "SETUP".p(result.options);
    console.info(result);
    if (!this.isBattleMaster()) {
      this._registerToExistsSharedBattle();
    }
  };
  // * С сервера пришла команда проиграть анимацию
  _.onBattleAnimation = function(data) {
    var e, targets;
    try {
      targets = data.targets.map(function(t) {
        return ANET.Utils.unpackBattlerFromNetwork(t);
      });
      $gameTemp.requestAnimation(targets, data.animationId, data.mirror);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * С сервера пришла команда (метод) боя
  _.onBattleMethod = function(battlerNetData, method, args) {
    var battler, e;
    try {
      //"BATTLE METHOD RECEIVED".p()
      // * Отправляю мастеру битвы информацию что я получил команду
      if (ANET.PP.isForceBattleSyncMode()) {
        this.sendBattleMethodReceived();
      }
      battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData);
      if (battler[method] != null) {
        //TODO: convert arguments
        battler[method](args);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Игрок принял команду боя
  _.onBattleMethodReceived = function() {
    var e;
    try {
      this._waitPool += 1;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Пришло изменение состояние ввода
  _.onBattleInputState = function(inputState, inputActorId) {
    var e;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      BattleManager._inputting = inputState;
      if (inputActorId === ANGameManager.myActorId()) {
        return BattleManager.nSetCurrentClientInput();
      } else {
        // * Если не мой персонаж, то никакого ввода
        return BattleManager.nClearClientInput();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onBattleInputAction = function(inputActorId, action) {
    var e;
    try {
      if (!ANGameManager.isBattleMaster()) {
        return;
      }
      //TODO: Тут есть проблема в MV версии
      //TODO: Проверка что inputActorId = BattleManager._currentActor.actorId()
      BattleManager.inputtingAction().setFromNetwork(action);
      // * Далее (продолжить бой)
      return BattleManager.selectNextCommand();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onLogWindowMessage = function(cmd, text) {
    var e, ref, ref1;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      switch (cmd) {
        case "add":
          if ((ref = BattleManager._logWindow) != null) {
            ref.addText(text);
          }
          break;
        default:
          if ((ref1 = BattleManager._logWindow) != null) {
            ref1.clear();
          }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку интерпретера и команд события

//$[ENCODE]

//@[GLOBAL]
window.ANInterpreterManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetIntr");
  LOG.setColors(KDCore.Color.YELLOW, KDCore.Color.BLACK.getLightestColor(15));
  LOG.on();
  //@[DEFINES]
  _ = window.ANInterpreterManager;
  // * Когда закончелось событие
  _.eventProcessExit = function() {
    if ($gameMessage.isBusy()) {
      $gameMessage.nSetEndCallback(_.eventProcessExit);
    } else {
      if (!$gameMap.isEventRunning()) {
        _.sendEventEnded();
        _.resetSharedEvent();
      }
    }
  };
  // * Дополнительная проверка что статус игрока соответсвует событию (запущено или нет)
  _.checkEventRunning = function() {
    var evId;
    if (NetPlayerDataWrapper.isOnAnyEvent(ANGameManager.myPlayerData())) {
      if (!$gameMap.isEventRunning()) {
        if (!$gameMessage.isBusy()) {
          this.sendEventEnded();
        }
      }
    } else {
      if ($gameMap.isEventRunning()) {
        evId = $gameMap._interpreter.eventId();
        this.sendEventStarted(evId);
      }
    }
  };
  // * Выполнить виртуальную команду (list) вне очереди (не ожидая сцены или другого события)
  // * mapId - ID карты не текущей, а того, от кого пришла команда (нужно для Self.Switch)
  _.startVirtualCommand = function(list, eventId, mapId) {
    var e, key, virtualInter;
    try {
      // * Self.Switch имеет отдельную обработку (так как mapId отличается)
      if (list[0].code === 123 && eventId > 0) {
        key = [mapId, eventId, list[0].parameters[0]];
        $gameSelfSwitches.setValue(key, list[0].parameters[1] === 0); // * Команда может быть только одна (всегда), поэтому else (больше команд нету)
      } else {
        virtualInter = new Game_Interpreter();
        virtualInter.setup(list, eventId);
        virtualInter.executeCommand(); // * force execute
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Выполнить комадну виртуально?
  _.isVirtualCommand = function(commandCode) {
    return !ANET.System.NonVirtualCommandsList.contains(commandCode);
  };
  // * Сброс общего события
  _.resetSharedEvent = function() {
    this._sharedInterpreter = null;
    this._sharedEventMaster = false;
    // * На всякий случай
    this.hideWaitPlayersOnSharedEvent();
  };
  // * Когда игрок запускает общее событие, оно регестрируется этим методом
  // * ссылка на сам interpreter и флаг - является ли игрок мастером - кто первый запустил
  _.setupSharedInterpreter = function(_sharedInterpreter, _sharedEventMaster) {
    this._sharedInterpreter = _sharedInterpreter;
    this._sharedEventMaster = _sharedEventMaster;
    // * Сброс флага необходимости закрытия (для клиентов)
    $gameTemp._shouldForceExitSharedEvent = false;
    // * Нельзя, если уже зарезервированно общее событие от сервера
    if ($gameTemp.isNetworkSharedEventReserved()) {
      return;
    }
    if (this._sharedInterpreter == null) {
      return;
    }
    LOG.p("Shared event registred " + this._sharedInterpreter.eventId());
  };
  // * Является ли данный клиент мастером общего события
  _.isSharedEventMaster = function() {
    return this.isSharedEventIsRunning() && this._sharedEventMaster === true;
  };
  _.isSharedEventIsRunning = function() {
    return (this._sharedInterpreter != null) && $gameMap.isEventRunning();
  };
  // * Отмена ожидания игроков (когда Shared mode == optional)
  _.forceCancelSharedEvent = function() {
    if (!this.isSharedEventMaster()) {
      return;
    }
    LOG.p("Shared event force cancelled");
    "SEND ALL CANCEL EVENT".p();
    this.sendForceCancelSharedEvent();
    this.hideWaitPlayersOnSharedEvent();
  };
  _.showWaitPlayersOnSharedEvent = function() {
    var text, text2;
    this.hideWaitPlayersOnSharedEvent();
    //TODO: Вынести все строки в параметры
    text = "Waiting players";
    text2 = "";
    if (this.isSharedEventMaster() && this._sharedInterpreter.nIsSharedEventCanBeForceCancelled()) {
      text2 = "Press ESC to cancel";
    }
    if (typeof HUIManager !== "undefined" && HUIManager !== null) {
      HUIManager.showWaitingInfo(text, text2, 1000);
    }
  };
  _.hideWaitPlayersOnSharedEvent = function() {
    return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
  };
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================

  // * Когда игрок запускает какое-либо событие
  _.sendEventStarted = function(eventId) {
    return ANNetwork.send(NMS.Event("eventStarted", eventId));
  };
  
  // * Когда игрок "выходит" из запущенного события
  _.sendEventEnded = function() {
    return ANNetwork.send(NMS.Event("eventEnded"));
  };
  
  // * Отправка виртуальной команды на сервер
  _.sendEventVirtualCommand = function(command, options, eventId) {
    var data, endCommand, vEvent;
    // * Эта команда всегда в конце
    endCommand = {
      code: 0,
      indent: 0,
      parameters: []
    };
    // * Модель общего события
    vEvent = {
      list: [command, endCommand]
    };
    data = {
      mapId: $gameMap.mapId(),
      eventId: eventId,
      event: vEvent,
      options: options
    };
    ANNetwork.send(NMS.Event("virtualEventCommand", data));
  };
  // * Отправка запроса чтобы все начали общее событие
  // * Игрок запустил общее событие и будет теперь ждать всех игроков (на карте)
  _.sendSharedEventRequireRegister = function() {
    var data;
    // * Только мастер может это отправить
    // * Плюс эта проверка гарантирует, что мы запустили событие
    if (!this.isSharedEventMaster()) {
      return;
    }
    data = {
      mapId: $gameMap.mapId(),
      eventId: this._sharedInterpreter.eventId(),
      index: this._sharedInterpreter.nSyncWaitCommandData.index,
      indent: this._sharedInterpreter.nSyncWaitCommandData.indent
    };
    ANNetwork.send(NMS.Event("registerOnShared", data));
  };
  // * Отправка ответа, что клиент зарегестрировался на общем событии
  _.sendSharedEventRegisteredDone = function() {
    var data;
    if (this.isSharedEventMaster()) {
      return;
    }
    data = {
      mapId: $gameMap.mapId(),
      eventId: this._sharedInterpreter.eventId(),
      actorId: ANGameManager.myActorId(),
      index: this._sharedInterpreter.nSyncWaitCommandData.index,
      indent: this._sharedInterpreter.nSyncWaitCommandData.indent
    };
    ANNetwork.send(NMS.Event("registerDone", data));
  };
  // * Мастер отправляет клиентам, что можно продолжать выполнение
  _.sendSharedEventReadyToContinue = function() {
    var data;
    if (!this.isSharedEventMaster()) {
      return;
    }
    data = {
      mapId: $gameMap.mapId(),
      eventId: this._sharedInterpreter.eventId()
    };
    ANNetwork.send(NMS.Event("sharedCanContinue", data));
  };
  // * Когда мастер общего события отменяет общее событие (на стадии ожидания игроков)
  _.sendForceCancelSharedEvent = function() {
    var data;
    if (!this.isSharedEventMaster()) {
      return;
    }
    data = {
      mapId: $gameMap.mapId(),
      eventId: this._sharedInterpreter.eventId()
    };
    ANNetwork.send(NMS.Event("sharedForceCancel", data));
  };
  _.sendChoiceSelection = function(index, action) {
    var data;
    if (!this.isSharedEventMaster()) {
      return;
    }
    data = {
      mapId: $gameMap.mapId(),
      eventId: this._sharedInterpreter.eventId(),
      index: index,
      action: action
    };
    ANNetwork.send(NMS.Event("sharedChoice", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================

  // * Просто общее событие ждёт, а некоторые вещи можно сразу выполнять, не зависимо от того игрок находится в событии или нет
  _.onVirtualCommand = function(data) {
    var e, event, list;
    try {
      // * Если только на одой карте, то проверяем номер карты
      if (data.options.scope === "Same map") {
        if ($gameMap.mapId() !== data.mapId) {
          return;
        }
      }
      // * Затем проверяем фильтр (для нас ли эта команда?)
      if (!ANET.Utils.isPassEventFilterOptions(data.options)) {
        return;
      }
      event = data.event;
      list = event.list;
      // * В зависимости от опции, запускаем в разных режимах
      switch (data.options.executeMode) {
        case "Virtual":
          _.startVirtualCommand(list, data.eventId, data.mapId);
          break;
        case "Common Event":
          $gameTemp.reserveVirtualCommonEvent(event); //? AUTO
          break;
        default:
          // * Некоторые команды можно выполнять сразу, не ожидая сцены (или другого события)
          if (_.isVirtualCommand(list[0].code)) {
            _.startVirtualCommand(list, data.eventId, data.mapId);
          } else {
            // * Остальные идут как общее событие (приоритетное)
            $gameTemp.reserveVirtualCommonEvent(event);
          }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Когда пришёл запрос с сервера, что надо начать общее событие
  _.onRegisterOnSharedEventRequest = function(data) {
    var e, eventId, indent, index, mapId;
    try {
      ({mapId, eventId, index, indent} = data);
      // * Если карта другая, то пропускаем это сообщение
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      // * Если общее событие уже запущено (не важно какое), игнорируем
      if (_.isSharedEventIsRunning()) {
        return;
      }
      // * Это событие уже начато, т.е. этот клиент опоздал (пришёл с другой карты)
      if (index !== 0) {
        return;
      }
      $gameTemp.reserveNetworkSharedEvent(eventId);
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Когда клиент на необходимой команде общего события
  _.onRegisterOnSharedEventResponse = function(data) {
    var actorId, e, eventId, indent, index, mapId;
    try {
      ({mapId, eventId, actorId, index, indent} = data);
      // * Если карта другая, то пропускаем это сообщение
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      // * Мы не мастер, игнорируем
      if (!_.isSharedEventMaster()) {
        return;
      }
      // * ID событий не совпадают, игнорируем
      if (_._sharedInterpreter.eventId() !== eventId) {
        return;
      }
      // * Регестрируем ответ
      _._sharedInterpreter.nOnSyncedEventCommandResponse(index, indent, actorId);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Когда все игроки "готовы" и можно продолжать выполнение общего события
  _.onContinueSharedEvent = function(data) {
    var e, eventId, mapId;
    try {
      ({mapId, eventId} = data);
      // * Если карта другая, то пропускаем это сообщение
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      // * Если общее событие не запущено, игнорируем
      if (!_.isSharedEventIsRunning()) {
        return;
      }
      // * Мы мастер, игнорируем (выполнение у мастера от пула внутри события)
      if (_.isSharedEventMaster()) {
        return;
      }
      // * ID событий не совпадают, игнорируем
      if (_._sharedInterpreter.eventId() !== eventId) {
        return;
      }
      return _._sharedInterpreter.nAllowContinueSharedEvent();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Когда мастер общего события отменил его
  _.onSharedEventForceCancelFromServer = function(data) {
    var e, eventId, mapId;
    try {
      ({mapId, eventId} = data);
      // * Если карта другая, то пропускаем это сообщение
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      // * Мы мастер, игнорируем
      if (_.isSharedEventMaster()) {
        return;
      }
      if (_.isSharedEventIsRunning()) {
        // * ID событий не совпадают, игнорируем
        if (_._sharedInterpreter.eventId() !== eventId) {
          return;
        }
        // * Ставим глобальны флаг (обаботка идёт внутри Game_Event)
        return $gameTemp._shouldForceExitSharedEvent = true;
      } else {
        // * Если событие ещё не было запущено (например этот клиент был в меню)
        // * Надо проверить не стоит ли событие в очереди на запуск
        if ($gameTemp.isNetworkSharedEventReserved()) {
          // * Если ID событий совпадает
          if (eventId === $gameTemp._reservedNetworkSharedEvent) {
            $gameTemp.retrieveNetworkSharedEvent(); // * Забираем без выполнения
          }
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Когда мастер общего события сменил выбор (или действие выбора) в окне выбора вариантов в сообщении
  _.onSharedEventChoiceActionFromServer = function(data) {
    var action, e, eventId, index, mapId;
    try {
      ({mapId, eventId, action, index} = data);
      // * Если карта другая, то пропускаем это сообщение
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      // * Если клиент не в общем событии, пропускаем
      if (!_.isSharedEventIsRunning()) {
        return;
      }
      // * ID событий не совпадают, игнорируем
      if (_._sharedInterpreter.eventId() !== eventId) {
        return;
      }
      // * Задаём глобальные данные
      $gameTemp.nSelectionActionFromNetwork = {action, index};
      return LOG.p("Shared Choice accepted from server");
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку игровых карт

//@[GLOBAL]
window.ANMapManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetMap");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANMapManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendMapLoaded = function() {
    return ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()));
  };
  _.sendInitialMapData = function() {
    // * Отправляем принудительно свои данные всем игрокам на карте
    ANSyncDataManager.sendPlayerObserver();
    ANPlayersManager.sendPlayerLocation();
    if (ANGameManager.isMapMaster()) {
      this.sendMapEventsInitialPositions();
    }
  };
  _.sendEventMove = function(eventId) {
    var data;
    data = {
      id: eventId,
      mapId: $gameMap.mapId(),
      data: $gameMap.event(eventId).getMoveDataForNetwork()
    };
    ANNetwork.send(NMS.Map("eventMove", data), true);
  };
  // * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
  _.sendMapEventsInitialPositions = function() {
    var ev, eventId, i, len, ref;
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      eventId = ev.eventId();
      setTimeout((function() {
        return ANMapManager.sendEventMove(eventId);
      }), 50); //TODO: Надо ли эту задержку?
    }
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onEventMove = function(mapId, eventId, moveData) {
    var e, event;
    try {
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onInitialMapSync = function() {
    var e;
    try {
      this.sendInitialMapData();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

//@[GLOBAL]
var ANPlayersManager;

ANPlayersManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetPlayer");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = ANPlayersManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendBindActorFromGame = function(actorId) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), this.bindActorResult.bind(this));
  };
  _.sendBindActorFromLobby = function(actorId, callback) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), callback);
  };
  _.sendPlayerName = function() {
    return ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name));
  };
  _.sendActorReady = function() {
    var actorData;
    actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId);
    ANNetwork.send(NMS.Game("actorReady", actorData));
    return ANGameManager.setWait('playersActors');
  };
  _.sendPlayerMove = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: $gamePlayer.getMoveDataForNetwork()
    };
    return ANNetwork.send(NMS.Map("playerMove", data), true);
  };
  _.sendPlayerLocation = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: [$gamePlayer.x, $gamePlayer.y]
    };
    return ANNetwork.send(NMS.Map("playerLocation", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.bindActorResult = function(result) {
    //TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
    // клиент готов начинать игру (и ожидание игроков включается)
    // false - значит данный персонаж занят, надо обрабатыватЬ!
    if (result === true) {
      "BINDING GOOD, send ActorReady".p();
      //TODO: Сейчас без кастомизации
      this.sendActorReady();
    }
  };
  _.onPlayerMove = function(id, moveData) {
    var char, e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onPlayerLocation = function(id, positionData) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.setPosition(positionData[0], positionData[1]);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за методы передачи, обработки и
// * синхронизации игровых данных (и Observers)

//$[ENCODE]

//@[GLOBAL]
window.ANSyncDataManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("DataSync");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANSyncDataManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendPlayerObserver = function() {
    return this._sendObserverData('playerChar', ANNetwork.myId(), $gamePlayer.getObserverDataForNetwork());
  };
  _.sendEventObserver = function(eventId) {
    this._sendObserverData('eventChar', {
      mapId: $gameMap.mapId(),
      eventId: eventId
    }, $gameMap.event(eventId).getObserverDataForNetwork());
  };
  _.sendActorObserver = function() {
    return this._sendObserverData('playerActor', ANNetwork.myId(), $gameParty.leader().getObserverDataForNetwork());
  };
  //TODO: через GET ? или callback
  _.sendBattleUnitsObserver = function(members) {
    var observers;
    //"SEND UNITS OBSERVER".p()
    if ($gameParty.isOneBattler()) {
      return;
    }
    observers = members.map(function(m) {
      return [m.packForNetwork(), m.getObserverDataForNetwork()];
    });
    //m.result().getObserverDataForNetwork()]
    this._sendObserverData('battleUnits', null, observers);
  };
  //TODO: NOT USED
  _.sendBattlerObserver = function(battler) {
    "SEND BATTLER OBSERVER".p();
    return this._sendObserverData('battler', battler.packForNetwork(), battler.getObserverDataForNetwork());
  };
  _.sendBattlerResultObserver = function(battler) {
    "SEND BATTLER RESULT".p();
    if ($gameParty.isOneBattler()) {
      return;
    }
    return this._sendObserverData('battlerResult', battler.packForNetwork(), battler.result().getObserverDataForNetwork());
  };
  _._sendObserverData = function(type, id, observerData) {
    var data;
    data = {
      type: type,
      id: id,
      data: observerData
    };
    ANNetwork.send(NMS.Game("observer", data), true);
  };
  //TODO: Может отправлять изменение на мастера, он уже все глобальные переменные всем отправляет
  _.sendGlobalVariableChange = function(varId, newValue) {
    var data;
    data = {
      id: varId,
      data: newValue
    };
    ANNetwork.send(NMS.Game("variable", data));
  };
  _.sendGlobalSwitchChange = function(switchId, newValue) {
    var data;
    data = {
      id: switchId,
      data: newValue
    };
    ANNetwork.send(NMS.Game("switch", data));
  };
  _.sendSyncGlobalVariables = function() {};
  //TODO: Синхронизация всех глобальных переменных
  //см. $gameVariables.getAllGlobalVariablesData()

  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onObserverData = function(id, type, content) {
    switch (type) {
      case 'playerChar':
        return this._onPlayerCharObserverData(id, content);
      case 'eventChar':
        return this._onEventCharObserverData(id, content);
      case 'playerActor':
        return this._onPlayerActorObserverData(id, content);
      case 'battler':
        return this._onBattlerObserverData(id, content);
      case 'battlerResult':
        return this._onBattlerResultObserverData(id, content);
      case 'battleUnits':
        return this._onBattleUnitsObserverData(content);
      default:
        LOG.p("From server: unknown observer data type: " + type);
    }
  };
  _._onPlayerCharObserverData = function(id, content) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.applyObserverData(content);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _._onEventCharObserverData = function(id, content) {
    var e, event, eventId, mapId;
    try {
      ({mapId, eventId} = id);
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.applyObserverData(content);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _._onPlayerActorObserverData = function(id, content) {
    var actor, e, player;
    try {
      // * Если событие перевело выбор персонажа в локальный режим
      // * то ставим специальный флаг что сейчас идёт обращение только
      // * к сетевому персонажу
      if ($gameTemp._nLocalActorMode === true) {
        $gameTemp._nNetworkActorPickRequest = true;
      }
      player = ANGameManager.getPlayerDataById(id);
      actor = NetPlayerDataWrapper.getActorForPlayer(player);
      // * На всякий случай сниму флаг
      $gameTemp._nNetworkActorPickRequest = false;
      if (actor == null) {
        return;
      }
      this._convertActorEquipmens(content);
      actor.applyObserverData(content);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _._onBattlerObserverData = function(battlerNetData, content) {
    var battler, e;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      //"ON BATTLER OBSERVER DATA".p()
      battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData);
      if (battler == null) {
        return;
      }
      this._convertActorEquipmens(content);
      battler.applyObserverData(content);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _._convertActorEquipmens = function(content) {
    var i, itemData, j, ref;
    if (content._equips == null) {
      return;
    }
    for (i = j = 0, ref = content._equips.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      itemData = content._equips[i];
      content._equips[i] = new Game_Item();
      content._equips[i]._dataClass = itemData._dataClass;
      content._equips[i]._itemId = itemData._itemId;
    }
  };
  _._onBattlerResultObserverData = function(battlerNetData, content) {
    var battler, e, ref;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      //"ON BATTLER RESULT DATA".p()
      battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData);
      if (battler == null) {
        return;
      }
      if ((ref = battler.result()) != null) {
        ref.applyObserverData(content);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _._onBattleUnitsObserverData = function(content) {
    var battler, e, j, len, netData;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
//"ON BATTLERS UNITS DATA".p()
      for (j = 0, len = content.length; j < len; j++) {
        netData = content[j];
        battler = ANET.Utils.unpackBattlerFromNetwork(netData[0]);
        if (battler != null) {
          this._convertActorEquipmens(netData[1]);
          battler.applyObserverData(netData[1]);
        }
      }
      // * Игрок только присоединился, нужен дополнительный refresh графики
      if ($gameTemp._requestInitialSharedBattleRefresh === true) {
        BattleManager.nRefreshSharedBattleState();
        $gameTemp._requestInitialSharedBattleRefresh = false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onVariableValue = function(varId, value) {
    var e;
    try {
      $gameVariables.onVariableFromServer(varId, value);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onSwitchValue = function(varId, value) {
    var e;
    try {
      $gameSwitches.onSwitchFromServer(varId, value);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET Common Utils Methods.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Набор вспомогательных функций для ANET
AA.Utils.ANET = {};

//?shortcut
ANET.Utils = AA.Utils.ANET;

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.ANET;
  // * Проверка, что комментарий является NET командой
  _.isNetCommentCommand = function(commentLine) {
    if (!String.any(commentLine)) {
      return false;
    }
    // * Все команды начинаются с буквы заглавной N, затем пробел и команда
    return /N\s.+/.exec(commentLine);
  };
  _.getNetCommentCommand = function(commentLine) {
    var command;
    if (!this.isNetCommentCommand(commentLine)) {
      return "";
    }
    // * Возвращает первое слово после N
    command = /N\s(!*\w+)/.exec(commentLine)[1];
    if (!String.any(command)) {
      return "";
    }
    return command;
  };
  //TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
  // * Сохраняет Battler в определённый формат для отправки по сети
  _.packBattlerForNetwork = function(battler) {
    if (battler instanceof Game_Actor) {
      return {
        type: "actor",
        id: battler.actorId()
      };
    } else {
      return {
        type: "enemy",
        id: battler.index()
      };
    }
  };
  // * Возвращяет конкретный Battler из данных сети
  _.unpackBattlerFromNetwork = function(data) {
    if (data.type === "actor") {
      return $gameActors.actor(data.id);
    } else {
      return $gameTroop.members()[data.id];
    }
  };
  _.isMyActorInValidListToStart = function(list, isInclude) {
    var e;
    try {
      list = JsonEx.parse(list).map(function(i) {
        return parseInt(i);
      });
      return list.contains(ANGameManager.myActorId()) === isInclude;
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.isPassEventFilterOptions = function(options) {
    var e;
    try {
      switch (options.whoSelector) {
        case "All":
          return true;
        case "Master":
          return ANNetwork.isMasterClient();
        case "Master Except":
          return !ANNetwork.isMasterClient();
        case "Actor List":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, true);
        case "Actor List Except":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, false);
        case "Me Except":
          // * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
          // * В опциях запуска события - не используется
          return true;
        default:
          return false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  // * Событие запущенно каким-либо игроком?
  _.isEventStartedByAny = function(eventId) {
    var e;
    try {
      return ANGameManager.anotherPlayersOnMap().some(function(p) {
        return NetPlayerDataWrapper.isOnEvent(p, eventId);
      });
    } catch (error) {
      e = error;
      ANET.w(e);
      // * В случае ошибки безопаснее вернуть true
      return true;
    }
  };
  // * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
  // * Список должен быть строкой! [1, 2, 3]
  _.buildEventCommandOptions = function(selector, list, scope, mode) {
    return {
      "actorList": list,
      "executeMode": mode,
      "scope": scope,
      "whoSelector": selector
    };
  };
  // * Конвертировать из команды комменатрия в параметр команды плагина
  _.convertEventCommandScopeAndMode = function(commentLine) {
    var mode, scope;
    // * SCOPE
    if (commentLine.contains("world")) {
      scope = "All world";
    } else {
      scope = "Same map";
    }
    // * MODE
    if (commentLine.contains("virtual")) {
      mode = "Virtual";
    } else if (commentLine.contains("common")) {
      mode = "Common Event";
    } else {
      mode = "Auto";
    }
    return {scope, mode};
  };
  // * Изъять список персонажей из комментария
  // * Формат выходной [1, 2, 3....]
  _.extractActorsListFromComment = function(commentLine) {
    var list, regex, resultList;
    regex = /forActors\s+([\d,\s*]*)/gm;
    resultList = regex.exec(commentLine);
    if (resultList == null) {
      return "[]";
    }
    if (resultList[1] == null) {
      return "[]";
    }
    list = "[" + resultList[1] + "]";
    return list;
  };
  _.parseEventStartOptionsFromCommentLine = function(commentLine) {
    var e, nStartOptions;
    try {
      // * Стандартный набор
      nStartOptions = {
        lockMode: "false",
        sharedMode: "No",
        whoSelector: "All",
        actorList: "[]"
      };
      if (commentLine.contains("lock")) {
        nStartOptions.lockMode = "true";
      }
      if (commentLine.contains("shared")) {
        nStartOptions.sharedMode = "Strict";
        // * Только если есть флаг sharedMode
        if (commentLine.contains("optional")) {
          nStartOptions.sharedMode = "Optional";
        }
      }
      if (commentLine.contains("master")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Master Except";
        } else {
          nStartOptions.whoSelector = "Master";
        }
      } else if (commentLine.contains("forActors")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Actor List Except";
        } else {
          nStartOptions.whoSelector = "Actor List";
        }
        nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine);
      }
      return nStartOptions;
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  _.generateSaveUniqueId = function() {
    var savefileId, versionId;
    versionId = ANET.VD.getGameVersion();
    savefileId = versionId + "" + Math.randomInt(versionId);
    // * Вероятность крайне крайне мала, но нельзя чтобы были повторы
    if (DataManager.nIsHaveNetworkSaveWithId(savefileId)) {
      return this.generateSaveUniqueId();
    } else {
      return savefileId;
    }
  };
  // * Текущая комната - загрузка сохранённой игры?
  _.isLoadGameRoom = function() {
    if (!ANNetwork.isConnected()) {
      return false;
    }
    if (ANNetwork.room == null) {
      return false;
    }
    return NetRoomDataWrapper.isLoadGameRoom(ANNetwork.room);
  };
  // * Построить Chat Message
  _.buildChatMessage = function(channelId, actorId, message) {
    return {
      channelId: channelId,
      actorId: actorId,
      text: message,
      mapId: $gameMap.mapId()
    };
  };
})();

// ■ END ANET Common Utils Methods.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__displayStartMessages, ALIAS__endBattle, ALIAS__processEscape, ALIAS__selectNextActor, ALIAS__selectPreviousActor, ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      if (!ANBattleManager.isBattleRegistred()) {
        // * Только если данные боя не установлены, но проверка сетевой битвы
        this.nSetupNetworkBattle();
      }
    }
  };
  //@[ALIAS]
  ALIAS__endBattle = _.endBattle;
  _.endBattle = function(result) {
    ALIAS__endBattle.call(this, result);
    if (ANNetwork.isConnected()) {
      // * Убрать флаг сетевой битвы
      this.nSetNetworkBattle(null);
    }
  };
  //@[ALIAS]
  ALIAS__selectNextActor = _.selectNextActor;
  _.selectNextActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
    } else {
      ALIAS__selectNextActor.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__selectPreviousActor = _.selectPreviousActor;
  _.selectPreviousActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectPreviousActorOnClient();
    } else {
      ALIAS__selectPreviousActor.call(this);
    }
  };
  //@[ALIAS]
  // * В сетевом режиме Update вызывается только на мастере боя!
  ALIAS__update = _.update;
  _.update = function(activeTime) {
    ALIAS__update.call(this, activeTime);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this.nUpdateNetwork();
  };
  //TEMP
  //TODO: Временно отключено начальное сообщение в бою
  //@[ALIAS]
  ALIAS__displayStartMessages = _.displayStartMessages;
  _.displayStartMessages = function() {
    if (ANNetwork.isConnected()) {

    } else {
      // * EMPTY
      return ALIAS__displayStartMessages.call(this);
    }
  };
  
  //TEMP
  //TODO: Если шанс побега не сработал, будет баг
  // * Временно шанс побега 100%
  //@[ALIAS]
  ALIAS__processEscape = _.processEscape;
  _.processEscape = function() {
    if (ANNetwork.isConnected()) {
      this._escapeRatio = 101;
    }
    return ALIAS__processEscape.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = BattleManager;
  _.nSetNetworkBattle = function(netBattleId) {
    this.netBattleId = netBattleId;
  };
  _.nIsNetworkBattle = function() {
    return this.netBattleId != null;
  };
  _.nSetupNetworkBattle = function() {
    var battleData;
    if (this.nIsNetworkBattle()) {
      battleData = {
        battleId: this.netBattleId,
        options: [$gameTroop._troopId, this._canEscape, this._canLose]
      };
      ANBattleManager.registerOnBattle(battleData);
    } else {
      ANBattleManager.registerOnLocalBattle();
    }
  };
  _.nSelectNextActorOnClient = function() {
    // * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
    // * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
    if (this._isShouldWaitMyNetworkAction === true) {
      // * Выбираем только своего персонажа снова (а не первого)
      this._currentActor = $gameParty.leader();
      if (KDCore.isMV()) {
        this._actorIndex = this.myNetworkActorIndex();
        $gameTemp._isBattleSceneShouldBeRefreshed = true;
      }
      return this._isShouldWaitMyNetworkAction = false;
    } else {
      ANBattleManager.battleInputActionDone();
      return this._inputting = false;
    }
  };
  
  // * В стандартном тактическом режиме боя если нажать "отмена" (назад)
  // * То мы можем поменять выбор предыдущего персонажа, но в сети,
  // * мы не можем это сделать, поэтому просто "выходим" на меню группы
  _.nSelectPreviousActorOnClient = function() {
    return this._currentActor = null;
  };
  _.nUpdateNetwork = function() {
    ANBattleManager.updateInputChange();
    $gameTroop.nUpdateBattleDataSync();
    $gameParty.nUpdateBattleDataSync();
  };
  _.nClearClientInput = function() {
    this._inputting = false;
    this._currentActor = null;
    this._isShouldWaitMyNetworkAction = true;
    if (KDCore.isMV()) {
      this.startTurn();
    }
  };
  _.nSetCurrentClientInput = function() {
    $gameParty.makeActions(); // * Чтобы был inputting action
    this._currentActor = $gameParty.leader();
    if (KDCore.isMV()) {
      this._actorIndex = this.myNetworkActorIndex();
    }
    // * Готов к отправке действия сразу (по умолчанию)
    // * Команда 'Fight' делает false (см nSelectNextActorOnClient)
    return this._isShouldWaitMyNetworkAction = false;
  };
  _.nRefreshSharedBattleState = function() {
    var e;
    try {
      if (SceneManager._scene.nRefreshSharedBattle != null) {
        SceneManager._scene.nRefreshSharedBattle();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Если во время боя был удалён (вышел) сетевой игрок
  // * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
  _.nSafeRemoveActor = function() {
    var e;
    if (this._phase !== "input") {
      return;
    }
    try {
      if (this._currentActor !== $gameParty.leader()) {
        return this.selectNextActor();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
  _.nIsLocalForceUpdatePhase = function() {
    return this.isAborting() || this.isBattleEnd();
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  // * Сохранение и загрузка сетевого имени игрока

  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.netPlayerName = this.netPlayerName;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.netPlayerName = config.netPlayerName;
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeSavefileInfo, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__makeSavefileInfo = _.makeSavefileInfo;
  _.makeSavefileInfo = function() {
    var info;
    info = ALIAS__makeSavefileInfo.call(this);
    if (ANNetwork.isConnected() && ($gameTemp.nUniqueSaveID != null)) {
      this.nWriteNetworkSaveFileInfo(info);
      // * Сбросим флаг
      $gameTemp.nUniqueSaveID = null;
    }
    return info;
  };
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
  // * Записать информацию о сетевом сохранении (что в этом файле сетевое сохранение)
  _.nWriteNetworkSaveFileInfo = function(info) {
    // * Для определения подходящих файлов у других клиентов
    info.nUniqueSaveID = $gameTemp.nUniqueSaveID;
    // * Для определения своего персонажа
    info.nMyActorId = ANGameManager.myActorId();
  };
  
  // * Является ли файл сохранения сетевым (созданным по сети)
  _.nIsNetworkSaveFile = function(savefileId) {
    var info;
    info = this.nGetInfoForSavefileId(savefileId);
    if ((info != null) && (info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      return true;
    }
    return false;
  };
  // * Есть ли файл сетевого сохранения с уникальным ID
  _.nIsHaveNetworkSaveWithId = function(uniqueSaveID) {
    return this.nGetNetworkSaveInfoWithId(uniqueSaveID) != null;
  };
  // * Получить данные сетвого сохранения по уникальному ID
  _.nGetNetworkSaveInfoWithId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index)) {
        if (file.nUniqueSaveID === uniqueSaveID) {
          return file;
        }
      }
    }
    return null;
  };
  // * Получить индекс файла сохранения по уникальнмоу ID
  // * Это нужно для загрузки правильного файла
  _.nGetNetworkSaveFileIdByUniqueId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index) && file.nUniqueSaveID === uniqueSaveID) {
        return index;
      }
    }
    return -1;
  };
  // * Методы различаются в MV и MZ
  _.nGetGlobalInfo = function() {
    if (KDCore.isMZ()) {
      return this._globalInfo;
    } else {
      return this.loadGlobalInfo();
    }
  };
  // * Методы различаются в MV и MZ
  _.nGetInfoForSavefileId = function(savefileId) {
    var info;
    if (KDCore.isMZ()) {
      info = DataManager.savefileInfo(savefileId);
    } else {
      info = DataManager.loadSavefileInfo(savefileId);
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var FWindow_InGameChat;

FWindow_InGameChat = class FWindow_InGameChat extends AA.FloatingWindow {
  constructor() {
    super(...arguments);
    this.params = this.getSettings();
    this.setDragEndHandler(this._savePlayerDragPosition.bind(this));
    return;
  }

  //TODO: From plugin parameters!!!
  getSettings() {
    return this.defaultSettings();
  }

  defaultSettings() {
    return {
      position: {
        x: 1,
        y: "Graphics.height - 193"
      },
      notActiveOpacity: 140,
      maxMessages: 9,
      firstChatMessageMargin: {
        x: 3,
        y: 145
      }
    };
  }

  //? message: {
  //   channelId
  //   actorId
  //   text
  //}
  addMessageToChat(message) {
    return this._addMessageToChat(message, true);
  }

  open() {
    super.open();
    return $gamePlayer._nChatIsClosed = false;
  }

  close() {
    super.close();
    return $gamePlayer._nChatIsClosed = true;
  }

  update() {
    var ref;
    super.update();
    return (ref = this._changer) != null ? ref.update() : void 0;
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FWindow_InGameChat.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var ALIAS___onMouseIn, ALIAS___onMouseOut, _;
  //@[DEFINES]
  _ = FWindow_InGameChat.prototype;
  //@[ALIAS]
  ALIAS___onMouseIn = _._onMouseIn;
  _._onMouseIn = function() {
    ALIAS___onMouseIn.call(this);
    if (this.opacity === 255) {
      return;
    }
    this._changer = new AA.Changer(this);
    this._changer.change('opacity').from(this.opacity).to(255).step(10);
    this._changer.start();
  };
  
  //@[ALIAS]
  ALIAS___onMouseOut = _._onMouseOut;
  _._onMouseOut = function() {
    ALIAS___onMouseOut.call(this);
    if (this.params.notActiveOpacity === 255) {
      return;
    }
    this._changer = new AA.Changer(this);
    this._changer.change('opacity').from(this.opacity).to(this.params.notActiveOpacity).step(5).delay(10);
    this._changer.start();
  };
  //$[OVER]
  _._createCustomElements = function() {
    this._lines = [];
    this._loadChatHistory();
  };
  _._loadChatHistory = function() {
    var j, len, message, ref;
    if ($gameTemp._nChatHistory == null) {
      $gameTemp._nChatHistory = [];
    }
    ref = $gameTemp._nChatHistory;
    for (j = 0, len = ref.length; j < len; j++) {
      message = ref[j];
      this._addMessageToChat(message, false);
    }
  };
  _._addMessageToChat = function(message, isNew) {
    var actorId, channelId, i, j, line, ref, text;
    if (message == null) {
      return;
    }
    ({channelId, actorId, text} = message);
    line = new ANET.Sprite_NetChatTextLine();
    this.addContent(line);
    line.drawChatMessage(channelId, actorId, text);
    if (isNew === true && KDCore.Utils.isSceneMap() && this.isOpen()) {
      // * Анимируем, если сцена карта и сообщение новое (а не из истории)
      line.animate();
    }
    line.move(this.params.firstChatMessageMargin);
    this._lines.unshift(line);
    if (this._lines.length % 2 === 0) {
      // * Разный цвет для каждой последующей
      line.applyBackgroundStyleB();
    }
    for (i = j = 1, ref = this._lines.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
      this._lines[i].moveUp();
      if (i === this.params.maxMessages) {
        this._removeLine(this._lines[i]);
        break;
      }
    }
    if (isNew === true) {
      // * Добавляем в историю только новые сообщения (а не из истории)
      $gameTemp._nChatHistory.push(message);
      // * Очищаем историю, чтобы память не занимала
      if ($gameTemp._nChatHistory.length > this.params.maxMessages) {
        $gameTemp._nChatHistory.shift();
      }
    }
  };
  _._removeLine = function(line) {
    var ref;
    line.visible = false;
    if ((ref = line.parent) != null) {
      ref.removeChild(line);
    }
    this._lines.delete(line);
  };
  //$[OVER]
  _._moveToStartPosition = function() {
    return this._moveToLastSavedPosition();
  };
  //$[OVER]
  _._afterOpen = function() {
    this._checkMousePositionAfterOpen();
    this._moveToStartPosition();
  };
  // * Доп. проверка нахождения курсора мышки при открытии окна
  _._checkMousePositionAfterOpen = function() {
    this._mouseIn = !this.isMouseIn();
    this._registerMouseInOut();
  };
  _._moveToLastSavedPosition = function() {
    var e, x, y;
    if ($gamePlayer._nLastChatWindowPosition == null) {
      ({x, y} = this.getSettings().position);
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: eval(x),
          y: eval(y)
        };
      } catch (error) {
        e = error;
        AA.warning(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    }
    this.move($gamePlayer._nLastChatWindowPosition);
  };
  _._savePlayerDragPosition = function() {
    $gamePlayer._nLastChatWindowPosition = {
      x: this.x,
      y: this.y
    };
  };
})();

// ■ END FWindow_InGameChat.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Action.prototype;
  // * Задать действие из сети (т.е. из действия другого игрока)
  _.setFromNetwork = function(action) {
    var f;
    this.clear();
    this._nParseActionItem(action._item);
    for (f in action) {
      if (f === "_item") {
        // * пропускаем Game_Item, он уже сконвертирован
        continue;
      }
      this[f] = action[f];
    }
  };
  // * Класс Game_Item отдельно
  _._nParseActionItem = function(item) {
    var f;
    if (item == null) {
      return;
    }
    for (f in item) {
      this._item[f] = item[f];
    }
  };
})();

// ■ END Game_Action.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nCreateObserver();
    }
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
  _.nCreateObserver = function() {
    this.netDataObserver = new DataObserver();
    this.nFillObserver();
    // * Создаём после nFillObserver, чтобы не было в списке полей Observer
    this.isDataObserverHaveChanges = false;
    this.netDataObserver.refreshAll(this);
  };
  // * Тут применён автоматический сбор всех полей
  _.nFillObserver = function() {
    var entries, fields, i, len, value;
    fields = [];
    entries = Object.entries(this);
    for (i = 0, len = entries.length; i < len; i++) {
      value = entries[i];
      if (value[0] === 'netDataObserver') {
        // * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
        continue;
      }
      fields.push(value[0]);
    }
    this.netDataObserver.addFields(this, fields);
  };
  _.nUpdateObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.nDataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
  // * Ставится флаг в TRUE, и Battler сам отправить данные
  _.nDataObserverHaveChanges = function() {
    return this.isDataObserverHaveChanges = true;
  };
  _.getObserverDataForNetwork = function() {
    this.isDataObserverHaveChanges = false;
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
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
  var ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(actorId) {
    ALIAS__setup.call(this, actorId);
    // * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
    if (ANNetwork.isConnected()) {
      this.refreshNetworkDummy = this.refreshNetwork;
      if (ANET.PP.playerActorNameType() > 0) {
        this.nSetupPlayerActorName();
      }
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshNetworkDummy();
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
  // * Данный персонаж - мой сетевой персонаж (текущего игрока)
  _.isMyNetworkActor = function() {
    if ($gameTemp._nLocalActorMode === true) {
      // * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
      // * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
      // * так как проверка через leader() обращается в Game_Actors, а ID всегда на
      // * своего персонажа (стоит Instance Mode, в этом ещё дело)
      // * Пока отключил передачу СВОИХ данных в режиме Local
      return false;
    }
    if ($gameParty.inBattle()) {
      return this.isMyNetworkBattler();
    } else {
      return this.actorId() === ANGameManager.myActorId();
    }
  };
  _.updateDataObserver = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this._updateDataObserver();
      } else {

      }
    } else {
      if (this.isMyNetworkActor()) {
        // * Если НЕ в бою, то проверка observer только свого персонажа
        // * Только приём данных
        this._updateDataObserver();
      }
    }
  };
  // * Отправка Observer только своего персонажа
  _.dataObserverHaveChanges = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this.requestNetBattleDataPush();
        // * Если только я в бою, то отправляю обычные данные
        // * Чтобы другие игроки видели HP и MP
        // TODO: Опция?
        if ($gameParty.isOneBattler()) {
          ANSyncDataManager.sendActorObserver();
        }
      }
    } else {
      // * Если не в бою, то только свои данные
      if (this.isMyNetworkActor()) {
        ANSyncDataManager.sendActorObserver();
      }
    }
  };
  
  //TODO: Может просто все все свойства передавать?
  // собрать их автоматически
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.ActorObserverFields);
  };
  //?{DYNAMIC}
  _.refreshNetworkDummy = function() {}; // * EMPTY
  _.refreshNetwork = function() {
    // * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
    // * Метод refresh вызывается ещё до того как Actor создан (класс)
    // * Принудительная отправка
    if (!$gameParty.inBattle()) {
      this.dataObserverHaveChanges();
    }
  };
  // * Установить заместо имени (никнейма) персонажа имя сетевого игрока
  _.nSetupPlayerActorName = function() {
    var playerData;
    // * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
    // * Данные других персонажей прийдут сами с Observer сразу
    if (this.actorId() !== ANGameManager.myActorId()) {
      return;
    }
    playerData = ANGameManager.myPlayerData();
    if (playerData == null) {
      return;
    }
    if (ANET.PP.playerActorNameType() === 1) {
      this._name = playerData.name;
    } else if (ANET.PP.playerActorNameType() === 2) {
      this._nickname = playerData.name;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actors.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__actor, _;
  //@[DEFINES]
  _ = Game_Actors.prototype;
  //TODO: Есть проблемы у этого способа! Надо больше тестов
  //TODO: Добавить дополнительные проверки, так как слишком опасно
  //@[ALIAS]
  ALIAS__actor = _.actor;
  _.actor = function(actorId) {
    // * Возвращять текущего персонажа для выборки в событии
    // * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1 (ОТМЕНА!)
    //TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
    //TODO: Временно убрал выборку только 1 актора
    if (ANNetwork.isConnected() && $gameTemp._nLocalActorMode === true) { //&& actorId == 1
      if ($gameTemp._nNetworkActorPickRequest === true) {
        $gameTemp._nNetworkActorPickRequest = false;
        return ALIAS__actor.call(this, actorId);
      } else {
        return this._data[ANGameManager.myActorId()];
      }
    } else {
      return ALIAS__actor.call(this, actorId);
    }
  };
})();

// ■ END Game_Actors.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onBattleEnd, ALIAS__onBattleStart, ALIAS__startDamagePopup, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nInitializeNetwork();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    if (ANNetwork.isConnected()) {
      this._nStartBattleObserver();
    }
    return ALIAS__onBattleStart.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this._nEndBattleObserver();
    }
  };
  // * Отдельная реализация, чтобы передавать battleResult
  //@[ALIAS]
  ALIAS__startDamagePopup = _.startDamagePopup;
  _.startDamagePopup = function() {
    if (ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()) {
      ANSyncDataManager.sendBattlerResultObserver(this);
      ANBattleManager.callBattleMethod(this, "startDamagePopup", null);
    }
    return ALIAS__startDamagePopup.call(this);
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
  _.nInitializeNetwork = function() {
    this._nRegisterSyncBattleMethod("requestEffect");
    this._nRegisterSyncBattleMethod("requestMotion");
    this._nRegisterSyncBattleMethod("startWeaponAnimation");
    this._nRegisterSyncBattleMethod("setActionState");
    // * Sound effects
    this._nRegisterSyncBattleMethod("performDamage");
    this._nRegisterSyncBattleMethod("performCollapse");
    this._nRegisterSyncBattleMethod("performMiss");
    this._nRegisterSyncBattleMethod("performRecovery");
    this._nRegisterSyncBattleMethod("performEvasion");
    this._nRegisterSyncBattleMethod("performMagicEvasion");
    this._nRegisterSyncBattleMethod("performCounter");
    this._nRegisterSyncBattleMethod("performReflection");
  };
  // * Данный баттлер является моим (этого сетевого игрока)
  _.isMyNetworkBattler = function() {
    if (ANNetwork.isConnected()) {
      return this === $gameParty.leader();
    } else {
      return true;
    }
  };
  // * Подписать метод на синхронизацию через сервер
  _._nRegisterSyncBattleMethod = function(methodName) {
    var alias;
    alias = this[methodName];
    this[methodName] = function() {
      if (ANNetwork.isConnected() && ANGameManager.isBattleMaster()) {
        // * В данной реализации передаётся только один аргумент, так как ... перед arguments
        ANBattleManager.callBattleMethod(this, methodName, ...arguments);
      }
      return alias.call(this, ...arguments);
    };
  };
  _.isNeedNetPushBattleData = function() {
    return this._netBattleObserverNeedToPush === true;
  };
  _.onNetBattleDataPushed = function() {
    return this._netBattleObserverNeedToPush = null;
  };
  _.requestNetBattleDataPush = function() {
    return this._netBattleObserverNeedToPush = true;
  };
  (function() {    // * Специальный Data Observer для боя
    // -----------------------------------------------------------------------
    // * Данные только для боя (эти данные передаёт только Battle Master)
    _._nStartBattleObserver = function() {
      // * Включаем Instance режим
      //@netDataObserver.setInstanteMode()
      this.netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate());
      this._addBattleFieldsToNetowrkDataObserver();
    };
    // * Добавляем дополнительные поля в Observer
    _._addBattleFieldsToNetowrkDataObserver = function() {
      this.netDataObserver.addFields(this, ANET.System.BattlerObserverFields);
    };
    // * После битвы нет необходимости хранить observer
    return _._nEndBattleObserver = function() {
      // * Возвращаем режим проверки
      this._applyDataObserverInitialParameters();
      // * Убираем добавленные для боя поля
      this.netDataObserver.removeFields(this, ANET.System.BattlerObserverFields);
    };
  })();
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__meetsItemConditions, ALIAS__onBattleEnd, ALIAS__onBattleStart, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    ALIAS__onBattleStart.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setCheckMode();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setInstanteMode();
    }
  };
  //TEMP
  //TODO: Временное решение, так как нет проверки кто именно
  // * Так как вещи другого игрока нет в инвентаре мастера боя, то
  // * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
  //@[ALIAS]
  ALIAS__meetsItemConditions = _.meetsItemConditions;
  _.meetsItemConditions = function(item) {
    if (ANNetwork.isConnected()) {
      return this.meetsUsableItemConditions(item);
    } else {
      return ALIAS__meetsItemConditions.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Специальное представление данных для сети
  _.packForNetwork = function() {
    return ANET.Utils.packBattlerForNetwork(this);
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this._applyDataObserverInitialParameters();
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    _._applyDataObserverInitialParameters = function() {
      // * Тут нужен Instante, чтобы данные на карте всегда были актуальны
      // * Если CheckMode, то при помощи событий можно менять параметры ХП
      // * всей группы и ХП других игроков будут отображаться не правильно
      this.netDataObserver.setInstanteMode();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    };
    //TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
    _._fillNetworkObserver = function() {
      this.netDataObserver.addFields(this, ["_hp", "_mp", "_tp", "_paramPlus", "_states", "_stateTurns", "_buffs", "_buffTurns"]);
    };
    //TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

    // * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
})();

// ■ END Game_BattlerBase.coffee
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
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANNetwork.isConnected()) {
      return this._updateDataObserver();
    }
  };
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
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    // * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = function() {
      return this.netDataObserver.addFields(this, ["_opacity", "_blendMode", "_walkAnime", "_stepAnime", "_directionFix", "_transparent", "_direction"]);
    };
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
  _.moveStraightFromServer = function(moveData) {
    // * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
    this.setMovementSuccess(true);
    this.setDirection(moveData.direction);
    this._x = moveData.x;
    this._y = moveData.y;
    this._realX = moveData.realX;
    this._realY = moveData.realY;
    // * Чтобы синхронизировать правильно бег
    this._moveSpeed = moveData.moveSpeed;
    this.increaseSteps();
  };
  _.getMoveDataForNetwork = function() {
    return {
      direction: this._direction,
      moveSpeed: this.realMoveSpeed(),
      x: this.x,
      y: this.y,
      realX: this._realX,
      realY: this._realY
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //TODO: Есть проблема, dead enemies не исчезают у второго игрока

  // * Дополнительные найстройки Observer для врагов
  _._addBattleFieldsToNetowrkDataObserver = function() {
    Game_Battler.prototype._addBattleFieldsToNetowrkDataObserver.call(this);
    // * Данные поля не нужны (наверное) врагам, так как не видно их полосу
    this.netDataObserver.removeFields(this, ["_tpbChargeTime"]);
  };
  // * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
  _.updateDataObserver = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this._updateDataObserver();
    }
  };
  _.dataObserverHaveChanges = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this.requestNetBattleDataPush();
    }
  };
  // * Добавляем свои поля
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.EnemyObserverFields);
  };
})();

// ■ END Game_Enemy.coffee
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
  (function() {    // * Синхронизация движения
    // -----------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__updateSelfMovement;
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveStraight.call(this, d);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            return ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        return ALIAS__moveStraight.call(this, d);
      }
    };
    
    //@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement;
    return _.updateSelfMovement = function() {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          return ALIAS__updateSelfMovement.call(this);
        } else {

        }
      } else {
        // * NOTHING
        // * Обновление движения события только на мастере карты
        return ALIAS__updateSelfMovement.call(this);
      }
    };
  })();
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
  _.dataObserverHaveChanges = function() {
    if (ANGameManager.isMapMaster()) {
      ANSyncDataManager.sendEventObserver(this.eventId());
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// * Если мы не отправляем данные Observer,
// * то check не будет работать, пока не сбросить флаг

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isSomeoneCollided, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Followers.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    if (ANNetwork.isConnected()) {
      return this._data = [];
    } else {
      // * Нет последователей! Используется другой класс
      return ALIAS__setup.call(this);
    }
  };
  
  // * Учёт коллизий с сетевыми игроками при движении событий
  // * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
  //@[ALIAS]
  ALIAS__isSomeoneCollided = _.isSomeoneCollided;
  _.isSomeoneCollided = function(x, y) {
    if (ANNetwork.isConnected()) {
      return $gameMap.netCharsIsSomeoneCollided(x, y);
    } else {
      return ALIAS__isSomeoneCollided.call(this, x, y);
    }
  };
})();

// ■ END Game_Followers.coffee
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
  (function() {    // * Статус запуска события
    // -----------------------------------------------------------------------
    var ALIAS__clear, ALIAS__initialize, ALIAS__setup, ALIAS__update, ALIAS__updateWaitMode;
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(depth) {
      ALIAS__initialize.call(this, depth);
      this._nRunningCheckTimer = 0;
      // * Отключаем некоторые команды
      if (ANNetwork.isConnected()) {
        this.nDisableNotNetCommands();
      }
    };
    //@[ALIAS]
    ALIAS__setup = _.setup;
    _.setup = function(list, eventId) {
      ALIAS__setup.call(this, list, eventId);
      if (ANNetwork.isConnected()) {
        // * Сброс сетевой битвы, если началось другое событие
        BattleManager.nSetNetworkBattle(null);
        this.nCheckEventStartOptions();
        if (!this.isPassStartOptions()) { // * Проверка опций запуска события
          this._list = []; // * Не будет выполняться
        } else {
          ANInterpreterManager.sendEventStarted(eventId);
          if (this.nIsEventIsShared()) {
            this.nPrepareSharedEvent();
          }
          this.nClearFlags();
        }
      }
    };
    
    //@[ALIAS]
    ALIAS__clear = _.clear;
    _.clear = function() {
      ALIAS__clear.call(this);
      if (ANNetwork.isConnected()) {
        ANInterpreterManager.eventProcessExit();
        this.nClearFlags();
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (ANNetwork.isConnected()) {
        this._nRunningCheckTimer++;
        if (this._nRunningCheckTimer >= 60) {
          ANInterpreterManager.checkEventRunning();
          this._nRunningCheckTimer = 0;
        }
      }
    };
    //@[ALIAS]
    ALIAS__updateWaitMode = _.updateWaitMode;
    return _.updateWaitMode = function() {
      if (this._waitMode === 'netPlayersPool') {
        return this.nUpdateWaitPlayersPool();
      } else if (this._waitMode === 'netNextCommand') {
        return this.nUpdateWaitServerNextCommandPermission();
      } else {
        return ALIAS__updateWaitMode.call(this);
      }
    };
  })();
  (function() {    // * Выполнение команд в сети
    // -----------------------------------------------------------------------
    var ALIAS__command108;
    //@[ALIAS, STORED]
    _.ALIAS__executeCommand = _.executeCommand;
    _.executeCommand = function() {
      if (ANNetwork.isConnected()) {
        if (this.nIsOptionsForCurrentCommand()) {
          return this.nProcessCommandWithOptions();
        }
      }
      return _.ALIAS__executeCommand.call(this);
    };
    //TODO: MV
    //@[ALIAS]
    ALIAS__command108 = _.command108;
    return _.command108 = function(params) {
      if (ANNetwork.isConnected()) {
        if (KDCore.isMV()) {
          params = this._params;
        }
        // * Проверить комментарий на наличие NET команд
        this._nCheckNetComment(params[0]);
      }
      return ALIAS__command108.call(this, params);
    };
  })();
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  // * Используется Virtual Interpreter. Команда от сервера запускается в отдельном Interpreter, а не
  // * в аналогичном событии (как это было в Alpha NET).
  // * Некоторы команды выполняются напрямую, а некоторые через общие события только с одной командой

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  // * Отключение не подходящих для сети комманд
  _.nDisableNotNetCommands = function() {
    var code, disableCommand, i, len, ref;
    disableCommand = function() {
      return _["command" + code] = function() {
        return true;
      };
    };
    ref = [129, 202, 206, 216, 217, 137];
    // * Change Party Member
    // * Set Vehicle Location
    // * Get on/off Vehicle
    // * Change Player Followers
    // * Gather Followers
    // * Change Formation Access
    for (i = 0, len = ref.length; i < len; i++) {
      code = ref[i];
      disableCommand(code);
    }
  };
  _.nIsHaveCommandOptions = function() {
    return this._nCommandOptionsRequested === true && (this.nCommandStartOptions != null);
  };
  _.nClearCommandOptions = function() {
    this._nCommandOptionsRequested = false;
    return this.nCommandStartOptions = null;
  };
  // * Устанавливаем опции (набор данных) и флаг что надо использовать на следующей команде
  _.nSetCommandOptions = function(nCommandStartOptions) {
    this.nCommandStartOptions = nCommandStartOptions;
    return this._nCommandOptionsRequested = true;
  };
  // * Опции подходят для "текущей" (следующей на выполнение) команды
  _.nIsOptionsForCurrentCommand = function() {
    if (!this.nIsHaveCommandOptions()) {
      return false;
    }
    if (ANET.System.ForbiddenVirtualCommandsList.contains(this.currentCommand().code)) {
      return false;
    }
    return true;
  };
  // * Проверка опций и выполнение команды в соответсвии с ними
  _.nProcessCommandWithOptions = function() {
    var e;
    try {
      // * Снимаем флаг, что надо использовать опции
      this._nCommandOptionsRequested = false;
      switch (this.nCommandStartOptions.whoSelector) {
        case "All":
          return this._nProcessCommandForAll();
        case "Master":
          return this._nProcessCommandForMaster(true);
        case "Master Except":
          return this._nProcessCommandForMaster(false);
        case "Actor List":
          return this._nProcessCommandForActorsList(true);
        case "Actor List Except":
          return this._nProcessCommandForActorsList(false);
        case "Me Except":
          return this._nProcessCommandNotMe();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return _.ALIAS__executeCommand.call(this);
  };
  _._nProcessCommandForAll = function() {
    this._nSendCommandToServer();
    // * Выполнение команды как обычно у себя (так как там broadcast)
    return _.ALIAS__executeCommand.call(this);
  };
  _._nProcessCommandForMaster = function(isInclude) {
    if (ANNetwork.isMasterClient() === isInclude) {
      return _.ALIAS__executeCommand.call(this);
    } else {
      this._nSendCommandToServer();
      return this._nSkipCommand();
    }
  };
  _._nProcessCommandForActorsList = function(isInclude) {
    this._nSendCommandToServer();
    if (ANET.Utils.isMyActorInValidListToStart(this.nCommandStartOptions.actorList, isInclude)) {
      return _.ALIAS__executeCommand.call(this);
    } else {
      return this._nSkipCommand();
    }
  };
  _._nProcessCommandNotMe = function() {
    this._nSendCommandToServer();
    return this._nSkipCommand();
  };
  _._nSkipCommand = function() {
    this._index++;
    this.nClearCommandOptions();
    return true;
  };
  _._nSendCommandToServer = function() {
    ANInterpreterManager.sendEventVirtualCommand(this.currentCommand(), this.nCommandStartOptions, this.eventId());
  };
  // * Проверить комментарий на наличие NET команд
  _._nCheckNetComment = function(commentLine) {
    var command;
    command = ANET.Utils.getNetCommentCommand(commentLine);
    if (!String.any(command)) {
      return;
    }
    switch (command) {
      case "localActor":
        this._nOnNetCommand_LocalActor(commentLine);
        break;
      case "all":
        this._nOnNetCommand_SingleSelectorEventCommand("All", commentLine);
        break;
      case "!me":
        this._nOnNetCommand_SingleSelectorEventCommand("Me Except", commentLine);
        break;
      case "master":
        this._nOnNetCommand_SingleSelectorEventCommand("Master", commentLine);
        break;
      case "!master":
        this._nOnNetCommand_SingleSelectorEventCommand("Master Except", commentLine);
        break;
      case "forActors":
        this._nOnNetCommand_ActorListSelectorEventCommand(commentLine, true);
        break;
      case "!forActors":
        this._nOnNetCommand_ActorListSelectorEventCommand(commentLine, false);
        break;
      case "wait":
        if (ANInterpreterManager.isSharedEventIsRunning()) {
          this.nRequestSyncedNextEventCommand();
        } else {
          console.warn("N wait can be used only in Shared Events");
        }
        break;
      case "choicesForMaster":
        if (ANInterpreterManager.isSharedEventIsRunning()) {
          this.nRequestMasterOnlyChoicesModeForNextChoice();
        } else {
          console.warn("N choicesForMaster can be used only in Shared Events");
        }
        break;
      case "start":
        break;
      default:
        // * Это коммент опций запуска, просто пропускаем, чтобы ошибку не писать в консоль
        // * Обрабатывается он отдельно, так как если условие ложно, событие не должно
        // * Вообще запускаться, а эти команды обрабатываеются уже в запущенном событии
        console.warn("Unknown NET Comment command " + command);
    }
  };
  // * Сделать следующую битву сетевой битвой (общей, расшаринной)
  _.nSetSharedBattle = function(battleId) {
    if (!String.any(battleId)) {
      // * Если пустая строка, то Null
      battleId = null;
    }
    BattleManager.nSetNetworkBattle(battleId);
  };
  // * Сбросить все сетевые флаги \ настройки перед запуском очередного события
  _.nClearFlags = function() {
    $gameTemp._nLocalActorMode = false;
    this._nRunningCheckTimer = 0;
    this.nClearCommandOptions();
  };
  (function() {    // * Опции запуска события
    // -----------------------------------------------------------------------
    _.isHaveNetworkStartOptions = function() {
      return this.nStartOptions != null;
    };
    // * Может ли данный игрок запустить это событие
    _.isPassStartOptions = function() {
      // * Если это общее событие и запускаетс от сервера, то по любому можно запускать
      if (this.nIsEventIsShared() && $gameTemp._nSharedEventOuterStartFlag === true) {
        return true;
      } else {
        if (!this.isHaveNetworkStartOptions()) {
          return true;
        }
        if (this.nIsLockedEvent()) {
          if (ANET.Utils.isEventStartedByAny(this.eventId())) {
            return false;
          }
        }
        return ANET.Utils.isPassEventFilterOptions(this.nStartOptions);
      }
    };
    // * Закрытыми могут быть только события с собственным ID (т.е. события карты)
    _.nIsLockedEvent = function() {
      var ref;
      return this.eventId() > 0 && ((ref = this.nStartOptions) != null ? ref.lockMode : void 0) === "true";
    };
    // * Есть ли опции (условия) запуска события для сети
    return _.nCheckEventStartOptions = function() {
      var e, options, ref;
      this.nStartOptions = null; // * сбрасываем
      try {
        options = (ref = this._list) != null ? ref.find(function(line) {
          var ref1;
          return line.code === 357 && ((ref1 = line.parameters) != null ? ref1[1] : void 0) === "EventStartOptions";
        }) : void 0;
        if (options != null) {
          this.nStartOptions = options.parameters[3];
        } else {
          // * Меньший приоритет, т.е. параметр плагина главнее
          this.nCheckEventStartOptionsFromCommentCommand();
        }
      } catch (error) {
        e = error;
        ANET.w(e);
        this.nStartOptions = null;
      }
    };
  })();
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
  // * Обработка комманд из комментариев (алтернатива командам плагинов)

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //input: "N localActor" | "N localActor end"
  _._nOnNetCommand_LocalActor = function(commentLine) {
    if (commentLine.contains("end")) {
      $gameTemp._nLocalActorMode = false;
    } else {
      $gameTemp._nLocalActorMode = true;
    }
  };
  
  //input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
  //selcetor: all, !me, master, !master
  //scope: world, mode: virtual
  _._nOnNetCommand_SingleSelectorEventCommand = function(selector, commentLine) {
    var mode, scope;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    this._nSetAnyEventCommandOptions(selector, "[]", scope, mode);
  };
  // * Установить опции команды события для следующей комманды
  _._nSetAnyEventCommandOptions = function(selector, list, scope, mode) {
    var options;
    if (!String.any(scope)) {
      // * Стандартные значения из команды плагина
      scope = "Same map";
    }
    if (!String.any(mode)) {
      mode = "Auto";
    }
    options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode);
    this.nSetCommandOptions(options);
  };
  _._nOnNetCommand_ActorListSelectorEventCommand = function(commentLine, isInclude) {
    var list, mode, scope, selector;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    list = ANET.Utils.extractActorsListFromComment(commentLine);
    selector = "Actor List";
    if (!isInclude) {
      selector += " Except";
    }
    this._nSetAnyEventCommandOptions(selector, list, scope, mode);
  };
  // * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
  _.nCheckEventStartOptionsFromCommentCommand = function() {
    var commentLine;
    if (this._list == null) {
      return;
    }
    commentLine = KDCore.Utils.getEventCommentValue("N start", this._list);
    if (commentLine == null) {
      return;
    }
    this.nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine);
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _.nIsEventIsShared = function() {
    var e;
    try {
      return this.isHaveNetworkStartOptions() && this.nStartOptions.sharedMode !== "No";
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.nIsEventIsSharedAndStrict = function() {
    var e, ref;
    try {
      return this.nIsEventIsShared() && ((ref = this.nStartOptions.sharedMode) != null ? ref.contains("Strict") : void 0);
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.nIsSharedEventCanBeForceCancelled = function() {
    return !this.nIsEventIsSharedAndStrict() && this.nSyncWaitCommandData.index === 0;
  };
  _.nPrepareSharedEvent = function() {
    ANInterpreterManager.resetSharedEvent();
    "PREPARE SHARED MOD".p(this._eventId);
    if ($gameTemp._nSharedEventOuterStartFlag == null) {
      // * Сброс пула игроков
      this.nPlayerPool = null;
      // * Регестрируем общее событие (второй аргумент флаг - мастер этот клиент?)
      ANInterpreterManager.setupSharedInterpreter(this, true);
      // * Запускаем пул игроков (на карте)
      this.nRequestSyncedNextEventCommand();
    } else {
      "OUUTER START".p();
      // * Сброс флага
      $gameTemp._nSharedEventOuterStartFlag = null;
      // * Отправим, что мы зарегестрировались на этом событии
      ANInterpreterManager.setupSharedInterpreter(this, false);
      // * Ждём разрешение на старт следующей команды (от сервера, мастера общего события)
      this.nRequestSyncedNextEventCommand();
    }
  };
  
  // * Игрок отменил ожидания других игроков (события должно закрыться сразу)
  _.nIsSharedEventWaitPoolCancelled = function() {
    var e;
    try {
      if (!this.nIsSharedEventCanBeForceCancelled()) {
        return;
      }
      if (Input.isCancel()) {
        // * Прерываем событие сразу (не запускаем)
        // * Очищаем ввод, чтобы меню сразу не выскочело после нажатия Esc
        Input.clear();
        ANInterpreterManager.forceCancelSharedEvent();
        this.terminate();
        return true;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
  // * Следующая команда события должна быть синхронизированна
  _.nRequestSyncedNextEventCommand = function() {
    this.nSyncWaitCommandData = {
      index: this._index,
      indent: this._indent
    };
    if (ANInterpreterManager.isSharedEventMaster()) {
      this.nSetWaitPlayerPool();
    } else {
      this.nSetWaitStartNextCommandFromServer();
    }
    ANInterpreterManager.showWaitPlayersOnSharedEvent();
  };
  // * Когда пришли данные от клиента
  _.nOnSyncedEventCommandResponse = function(index, indent, actorId) {
    var e;
    try {
      if (this.nSyncWaitCommandData == null) {
        return;
      }
      if (this.nPlayerPool == null) {
        return;
      }
      if (this.nSyncWaitCommandData.index === index && this.nSyncWaitCommandData.indent === indent) {
        "PLAYER ANSWER ".p(actorId);
        return this.nPlayerPool.onAnswer(actorId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Ожидания пула игроков
  _.nSetWaitPlayerPool = function() {
    "START POOL".p();
    if (this.nPlayerPool == null) {
      this.nPlayerPool = new PlayersWaitPool();
    } else {
      // * Не пересоздаём, так как нам важно учитывать только тех игроков на карте
      // * которые были во время запуска события, а не подключились позже
      this.nPlayerPool.reset();
    }
    // * Отправляем на сервер запрос
    this.nPlayerPool.register();
    this._waitMode = "netPlayersPool";
  };
  // * Ожидание готовности пула игроков (этот метод работает только на мастере общего события)
  _.nUpdateWaitPlayersPool = function() {
    var waiting;
    // * Пул надо обновлять (таймер внутри на повторную отправку запроса о готовности клиентов)
    this.nPlayerPool.update();
    if (this.nIsSharedEventWaitPoolCancelled()) {
      "STOP WAITING PLAYERS : IS CANCELED!".p();
      return true; // * Сразу выход из ожидания, если ожидание было преврано
    }
    waiting = !this.nPlayerPool.isReady();
    if (!waiting) {
      // * Теперь событие продолжается (мастер)
      "STOP WAITING PLAYERS : IS READY".p();
      ANInterpreterManager.sendSharedEventReadyToContinue();
      ANInterpreterManager.hideWaitPlayersOnSharedEvent();
      this.nClearSharedSyncEventCommandWait();
      this._waitMode = '';
    }
    return waiting;
  };
  // * Очистить пул и данные команды на синхронизацию
  _.nClearSharedSyncEventCommandWait = function() {
    this.nSyncWaitCommandData = null;
  };
  // * Ждать разрешение от сервера (мастера общего события) на запуск следующей команды события
  // * Этот метод работает только на клиентах (не мастере общего события)
  _.nSetWaitStartNextCommandFromServer = function() {
    this._canContinueSharedEvent = false;
    ANInterpreterManager.sendSharedEventRegisteredDone();
    "WAIT SERVER FOR NEXT COMMAND".p();
    // * Когда клиент уже на команде, которую надо синхронизировать, он будет
    // * каждую секунду "напоминать" о себе (снова отправлять что он готов продолжать)
    this._nRepeatAnswerToServerTimer = 60;
    this._waitMode = "netNextCommand";
  };
  // * Ожидание разрешения от сервера на запуск следующей команды
  _.nUpdateWaitServerNextCommandPermission = function() {
    var waiting;
    // * Сервер закрыл общее событие (отменил ожидание старта)
    // * В GameTemp, потому что может отменить, как тут ещё и не стартует это событие
    if ($gameTemp._shouldForceExitSharedEvent === true) {
      this.terminate();
      return true;
    }
    waiting = !this._canContinueSharedEvent;
    if (!waiting) {
      // * Событие продолжается (клиент)
      "CAN PROCESS TO NEXT COMMAND".p();
      this._waitMode = '';
    } else {
      if (this._nRepeatAnswerToServerTimer >= 0) {
        this._nRepeatAnswerToServerTimer--;
        if (this._nRepeatAnswerToServerTimer === 0) {
          this.nSetWaitStartNextCommandFromServer();
        }
      }
    }
    return true;
  };
  // * Получен ответ от сервера, что можно продолжать выполнение общего события
  _.nAllowContinueSharedEvent = function() {
    if (this._waitMode !== "netNextCommand") {
      return;
    }
    this._canContinueSharedEvent = true;
    // * Чтобы сброс переменной не произошёл снова
    this._nRepeatAnswerToServerTimer = -1;
    ANInterpreterManager.hideWaitPlayersOnSharedEvent();
  };
  // * Следующий выбор (команда 102) будет в режиме "только мастер события"
  _.nRequestMasterOnlyChoicesModeForNextChoice = function() {
    // * Если Пул игроков пустой, то не задаём флаг, чтобы сервер лишний раз не грузить
    if ((this.nPlayerPool != null) && this.nPlayerPool.isSinglePool()) {
      return;
    }
    "Shared Event Choices in Master only mode".p();
    $gameTemp.nRequireChoiceOnlyForMaster = true;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, ALIAS__setupStartingEvent, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._networkCharacters = new NETCharactersGroup();
  };
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    if (ANNetwork.isConnected()) {
      // * Клиент переходит на новую карту
      ANGameManager.onNewGameMapSetup();
      this.setupNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    if (ANNetwork.isConnected()) {
      return this.refreshNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__setupStartingEvent = _.setupStartingEvent;
  _.setupStartingEvent = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp.isNetworkSharedEventReserved()) {
        return this.nSetupNetworkSharedEvent();
      }
    }
    return ALIAS__setupStartingEvent.call(this);
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
  // * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
  _.nSafeRefresh = function() {
    var e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (typeof $dataMap === "undefined" || $dataMap === null) {
        return;
      }
      this.refresh();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.netCharsIsSomeoneCollided = function(x, y) {
    return this._networkCharacters.isSomeoneCollided(x, y);
  };
  _.netChars = function() {
    return this._networkCharacters.characters();
  };
  _.networkCharacterById = function(id) {
    return this._networkCharacters.characterById(id);
  };
  // * Инициализация персонажей отображаемых на карте
  _.setupNetworkCharacters = function() {
    return this._networkCharacters.setup();
  };
  _.updateNetwork = function() {
    return this._networkCharacters.update();
  };
  _.refreshNetworkCharacters = function() {
    return this._networkCharacters.refresh();
  };
  // * Запуск общего события (которое пришло от сервера)
  _.nSetupNetworkSharedEvent = function() {
    var e, event;
    try {
      event = this.event($gameTemp.retrieveNetworkSharedEvent());
      if (event == null) {
        return false;
      }
      $gameTemp._nSharedEventOuterStartFlag = true;
      event.start();
      return true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (ANNetwork.isConnected()) {
      return this.nEndCallback();
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  _.nSetEndCallback = function(_nEndCallbackMethod) {
    this._nEndCallbackMethod = _nEndCallbackMethod;
  };
  _.nEndCallback = function() {
    if (this._nEndCallbackMethod != null) {
      this._nEndCallbackMethod();
      this._nEndCallbackMethod = null;
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__battleMembers, ALIAS__charactersForSavefile, ALIAS__facesForSavefile, ALIAS__leader, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__battleMembers = _.battleMembers;
  _.battleMembers = function() {
    if (ANNetwork.isConnected()) {
      return ANBattleManager.battleMembers();
    } else {
      return ALIAS__battleMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    if (ANNetwork.isConnected()) {
      // * Нет начальной группы
      this._actors = [];
    } else {
      ALIAS__setupStartingMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__leader = _.leader;
  _.leader = function() {
    if (ANNetwork.isConnected()) {
      return this.networkLeader();
    } else {
      return ALIAS__leader.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__charactersForSavefile = _.charactersForSavefile;
  _.charactersForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.characterName(), actor.characterIndex()];
      });
    } else {
      return ALIAS__charactersForSavefile.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__facesForSavefile = _.facesForSavefile;
  _.facesForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.faceName(), actor.faceIndex()];
      });
    } else {
      return ALIAS__facesForSavefile.call(this);
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
  _.setupNetworkGame = function() {};
  // * В бою участвует только один персонаж?
  _.isOneBattler = function() {
    return this.battleMembers().length <= 1;
  };
  //TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
  _.networkLeader = function() {
    var actorId;
    actorId = ANGameManager.myPlayerData().actorId;
    return $gameActors.actor(actorId);
  };
  //TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
  // * Этот метод вызывается когда группа была изменена (кто-то отключился)
  _.nRefreshNetworkActors = function() {
    var actor, e, i, id, len, playerForActor, ref;
    try {
      ref = this.members();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        id = actor.actorId();
        // * Ищем игрока для каждого Actor
        playerForActor = ANGameManager.playersData.find(function(pl) {
          return pl.actorId === id;
        });
        // * Если нету больше игрока с таким Actor, удаляем из партии
        if (playerForActor == null) {
          this.removeActor(id);
          ANGameManager.anotherPlayerLeaveGame(id);
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
//TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function(d) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveStraight.call(this, d);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        return ANPlayersManager.sendPlayerMove();
      }
    } else {
      return ALIAS__moveStraight.call(this, d);
    }
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function(horz, vert) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveDiagonally.call(this, horz, vert);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        ANPlayersManager.sendPlayerMove();
      }
    } else {
      ALIAS__moveDiagonally.call(this, horz, vert);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      this.updateNetwork();
      if (sceneActive === true) {
        this.nUpdatePlayerInputForNetwork();
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
  _.dataObserverHaveChanges = function() {
    return ANSyncDataManager.sendPlayerObserver();
  };
  _.updateNetwork = function() {
    var ref;
    if ($gameParty.isEmpty()) {
      return;
    }
    // * Проверяем и обновляем DataObserver своего персонажа
    // * Тут этот ? (првоерка Null) нужна!
    return (ref = $gameParty.leader()) != null ? ref.updateDataObserver() : void 0;
  };
  _.nUpdatePlayerInputForNetwork = function() {
    if (ANET.PP.isGameChatAllowed()) { //TODO: DYNAMIC?
      return this.nUpdateChatInput();
    }
  };
  _.nUpdateChatInput = function() {
    var openChatButton, sayInChatButton;
    //TODO: Можно оптимизировать, в initMembers
    openChatButton = ANET.PP.getChatOpenCloseKey();
    sayInChatButton = ANET.PP.getChatSayKey();
    if (Input.isTriggered(openChatButton)) {
      if (ANET.UI.isChatOpen()) {
        // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
        if (openChatButton === sayInChatButton) {
          ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
          Input.clear(); // * иначе закрываем
        } else {
          ANET.UI.closeChat();
        }
      } else {
        ANET.UI.showChat();
      }
    } else if (Input.isTriggered(sayInChatButton)) {
      if (ANET.UI.isChatOpen()) {
        ANET.UI.showChatInputSafe();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, switchId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalSwitch(switchId)) {
          ANSyncDataManager.sendGlobalSwitchChange(switchId, this.value(switchId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, switchId, value);
    }
  };
  
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  _.isGlobalSwitch = function(switchId) {
    return ANET.PP.globalSwitchesIds().contains(switchId);
  };
  _.onSwitchFromServer = function(switchId, value) {
    this._data[switchId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  // * Инициализация набора общих событий для команд пользователя
  _.nInitCustomCommandsCE = function() {
    if (this.nCustomCommandsCE == null) {
      return this.nCustomCommandsCE = {};
    }
  };
  // * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
  _.nCheckCustomCommandForCEStart = function(name) {
    var ceId, e;
    try {
      this.nInitCustomCommandsCE();
      ceId = this.nCustomCommandsCE[name];
      if ((ceId != null) && ceId > 0) {
        $gameTemp.reserveCommonEvent(ceId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Зарегестрировать вызов общего события для кастомной команды
  _.nRegisterCustomCommandCE = function(name, ceId) {
    var e;
    try {
      this.nInitCustomCommandsCE();
      this.nCustomCommandsCE[name] = ceId;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCommonEventReserved, ALIAS__requestAnimation, ALIAS__retrieveCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Виртуальные общие события от сервера
    this._virtualEventQueue = [];
  };
  
  //@[ALIAS]
  ALIAS__isCommonEventReserved = _.isCommonEventReserved;
  _.isCommonEventReserved = function() {
    return this.isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(this);
  };
  
  // * Виртуальные события в приоритете
  //@[ALIAS]
  ALIAS__retrieveCommonEvent = _.retrieveCommonEvent;
  _.retrieveCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__retrieveCommonEvent.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__requestAnimation = _.requestAnimation;
  _.requestAnimation = function() {
    if (ANNetwork.isConnected()) {
      // * В бою анимацию синхронизируется (только мастер)(отправляется другим игрокам)
      if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
        ANBattleManager.requestAnimation(...arguments);
      }
    }
    return ALIAS__requestAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * Virtual Common Events
    // -----------------------------------------------------------------------
    _.reserveNetworkSharedEvent = function(_reservedNetworkSharedEvent) {
      this._reservedNetworkSharedEvent = _reservedNetworkSharedEvent;
    };
    _.isNetworkSharedEventReserved = function() {
      return this._reservedNetworkSharedEvent >= 1;
    };
    // * Забираем (и сразу очищаем)
    _.retrieveNetworkSharedEvent = function() {
      var eventId;
      eventId = this._reservedNetworkSharedEvent;
      this._reservedNetworkSharedEvent = 0;
      return eventId;
    };
    _.reserveVirtualCommonEvent = function(list) {
      return this._virtualEventQueue.push(list);
    };
    _.isVirtualCommonEventReserved = function() {
      return this._virtualEventQueue.length > 0;
    };
  })();
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
  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Unit.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Unit.prototype;
  _.nUpdateBattleDataSync = function() {
    var members;
    members = this.members();
    if (members.some(function(m) {
      return m.isNeedNetPushBattleData();
    })) {
      ANSyncDataManager.sendBattleUnitsObserver(members);
      members.forEach(function(m) {
        return m.onNetBattleDataPushed();
      });
    }
  };
})();

// ■ END Game_Unit.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, variableId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalVariable(variableId)) {
          ANSyncDataManager.sendGlobalVariableChange(variableId, this.value(variableId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, variableId, value);
    }
  };
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      return this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  _.isGlobalVariable = function(varId) {
    return ANET.PP.globalVariablesIds().contains(varId);
  };
  _.getAllGlobalVariablesData = function() {
    var i, j, variables;
    variables = [];
    for (i = j = 1; j <= 8; i = ++j) {
      variables.push([i, this.value[i]]);
    }
    return variables;
  };
  _.onVariableFromServer = function(varId, value) {
    this._data[varId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1


// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var nAPI;

nAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = nAPI;
  (function() {    // * NETWORK STATE
    // -----------------------------------------------------------------------
    _.isNetworkGame = function() {
      var e;
      try {
        return ANNetwork.isConnected();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    _.myPlayerIndex = function() {
      var e;
      try {
        return ANGameManager.myIndex();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.myActorId = function() {
      var e;
      try {
        return ANGameManager.myActorId();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.playersCount = function() {
      var e;
      try {
        return ANGameManager.playersData.length;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    return _.isMasterClient = function() {
      var e;
      try {
        return _.isNetworkGame() && ANNetwork.isMasterClient();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * HUI
    // -----------------------------------------------------------------------
    _.showGreenAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifySucess(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showRedAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifyError(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showInfoMessage = function(text1, text2 = "") {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.showWaitingInfo(text1, text2, 1) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.hideInfoMessage = function() {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * USER SERVER COMMANDS
    // -----------------------------------------------------------------------
    //@[ALIAS SUPPORT]
    // * FOR ALIASING (for plugin developers and custom commands implementation)
    _.onCustomCommand = function(name, data) {
      var e;
      try {
        if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
          $gameSystem.nCheckCustomCommandForCEStart(name);
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
      console.log("Custom network command received: " + name);
    };
    // * USER CUSTOM CODE HERE
    _.sendCustomCommand = function(name, data) {
      var e;
      try {
        if (!_.isNetworkGame()) {
          return;
        }
        return ANNetwork.callback(NMS.Game("userCommand", {name, data}), function() {
          //TODO: Может не надо выполнять и на данном клиенте?
          // * Сразу выполняем и на данном клиенте
          // * Так как сервер эту команду выполнит в режиме ретрансляции
          return nAPI.onCustomCommand(name, data);
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Подписать на определённую (кастомную) команду выполенине общего события
    return _.registerCommonEventForCommand = function(name, commonEventId) {
      var e;
      try {
        return ANNetwork.callback(NMS.Game("customCommandLink", {name, commonEventId}), function() {
          if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
            $gameSystem.nRegisterCustomCommandCE(name, commonEventId);
          }
          return console.log("Custom network command register to Common Event is done");
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * CHAT
    // -----------------------------------------------------------------------
    _.writeInChat = function(message, isGlobal = false) {
      var e;
      try {
        if (isGlobal === true && ANNetwork.isConnected()) {
          ANGameManager.sendRawChatMessage(0, 0, message);
        } else {
          ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message));
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.closeChatWindow = function() {
      var e;
      try {
        ANET.UI.closeChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.openChatWindow = function() {
      var e;
      try {
        ANET.UI.showChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.moveChatWindow = function(x = 0, y = 0) {
      var e;
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: x,
          y: y
        };
        if (this.isChatWindowOpened()) {
          ANET.UI.chat()._moveToStartPosition();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    };
    return _.isChatWindowOpened = function() {
      var e;
      try {
        return ANET.UI.isChatOpen();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для персонажей на карте других игроков
var NETCharacter;

NETCharacter = class NETCharacter extends Game_Character {
  constructor(id) {
    super();
    this.id = id;
    //* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
    this.networkStateIcon = null;
    this.refresh();
  }

  // * Синхронизация движения
  playerData() {
    return ANGameManager.getPlayerDataById(this.id);
  }

  actor() {
    return $gameActors.actor(this.playerData().actorId);
  }

  refresh() {
    var charIndex, charName;
    if (this.actor() == null) {
      return;
    }
    charName = this.actor().characterName();
    charIndex = this.actor().characterIndex();
    return this.setImage(charName, charIndex);
  }

  // * Сетевое состояние игрока
  // * =====================================================================
  requestNetworkStateIcon(networkStateIcon) {
    this.networkStateIcon = networkStateIcon;
  }

};

(function() {  
  // * =====================================================================

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharacter.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
})();

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
//?[STORABLE]
//@[GLOBAL]
var NETCharactersGroup;

NETCharactersGroup = class NETCharactersGroup {
  constructor() {
    this._data = [];
  }

  setup() {
    "SETUP NETWORK CHARS".p();
    this._data = [];
    this._refreshCharacters();
  }

  // * Вызывается из Game_Map.refresh
  refresh() {
    var char, i, len, ref;
    this._refreshCharacters();
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      char.refresh();
    }
  }

  characters() {
    return this._data;
  }

  characterById(id) {
    return this.characters().find(function(c) {
      return c.id === id;
    });
  }

  update() {
    var c, i, len, ref, results;
    ref = this.characters();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(c.update());
    }
    return results;
  }

  isSomeoneCollided(x, y) {
    return this.characters().some(function(c) {
      return c.pos(x, y);
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharactersGroup.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharactersGroup.prototype;
  
  // * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
  _._refreshCharacters = function() {
    var char, i, len, pl, x;
    this._removeNotExistsCharacters();
    this._addNewCharacters();
    this._refreshNetworkCharactersSprites();
    x = ANGameManager.anotherPlayers();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Удаляем (отключился или ушёл на другую карту)
  _._removeNotExistsCharacters = function() {
    var char, i, len, ref, x;
    x = ANGameManager.anotherPlayersOnMap();
    ref = this.characters();
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      if (char == null) {
        continue;
      }
      if (!x.find(function(c) {
        return c.id === char.id;
      })) {
        this._data.delete(char);
      }
    }
  };
  // * Добавляем новых персонажей
  //TODO: Надо проверять!
  _._addNewCharacters = function() {
    var char, i, len, pl, x;
    x = ANGameManager.anotherPlayersOnMap();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Пересоздать спрайты персонажей
  _._refreshNetworkCharactersSprites = function() {
    var ref;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    if ((ref = SceneManager._scene._spriteset) != null) {
      ref.refreshNetworkCharacters();
    }
  };
})();

// ■ END NETCharactersGroup.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(name, flag, data, socket) {
    return _M.EmptyMessageWithFlag(flag, data, socket).setName(name);
  };
  // * Обозначения
  // f - имя комманды (флага)
  // d - данные
  // s - сокет (либо ничего)

  //?LOBBY COMMANDS
  _M.Lobby = function(f, d, s) {
    return _CM('lobby', f, d, s);
  };
  //?MAP COMMANDS
  _M.Map = function(f, d, s) {
    return _CM('map', f, d, s);
  };
  //?GAME COMMANDS
  _M.Game = function(f, d, s) {
    return _CM('game', f, d, s);
  };
  //?INTERPRETER COMMANDS
  _M.Event = function(f, d, s) {
    return _CM('event', f, d, s);
  };
  //?BATTLE COMMANDS
  _M.Battle = function(f, d, s) {
    return _CM('battle', f, d, s);
  };
  //?OTHER COMMANDS
  _M.Other = function(f, d, s) {
    return _CM('other', f, d, s);
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Основной класс менеджер интерфейса (API)
// * Аналогичен классу AA.UI из ABSZ
ANET.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ ANET.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
  };
  _.isValid = function() {
    return (this.uiSet != null) && ANNetwork.isConnected();
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageStart();
  };
  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageEnd();
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
  (function() {    
    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
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
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Чат
    // -----------------------------------------------------------------------
    _.chat = function() {
      return this.uiSet.chatWindow;
    };
    // * Есть ли чат (создан ли), так как опциональный и нету в Basic
    _.isChatValid = function() {
      return this.isValid() && (this.chat() != null);
    };
    // * Открыто ли окно чата
    _.isChatOpen = function() {
      return this.isChatValid() && this.chat().isActive();
    };
    // * Показать сцену ввода сообщения в чат
    _.showChatInput = function() {
      if (!this.isValid()) {
        return;
      }
      SceneManager.push(Scene_NetChatInput);
    };
    // * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
    _.showChatInputSafe = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isCanChatInput()) {
        return this.showChatInput();
      }
    };
    _.showChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!this.isChatOpen()) {
        this.chat().open();
      }
    };
    _.closeChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isChatOpen()) {
        this.chat().close();
      }
    };
    
    //TODO: implement uAPI methods for system messages
    //? message: {
    //   channelId
    //   actorId
    //   text
    //   mapId
    //}
    // * Добавить сообщение в чат (можно вызывать на любой сцене)
    _.addMessageToChat = function(message) {
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      // * Если на карте, то добавляем прямо в чат
      if (KDCore.Utils.isSceneMap()) {
        this.chat().addMessageToChat(message);
      } else {
        // * Иначе в историю
        $gameTemp._nChatHistory.push(message);
      }
    };
    // * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
    _.isCanChatInput = function() {
      return !($gameMessage.isBusy() || $gameMap.isEventRunning());
    };
    
    // * Открыть (или не надо) чат при переходе на сцену карты
    return _.openChatAfterMapLoaded = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!$gamePlayer._nChatIsClosed) {
        return this.showChat();
      }
    };
  })();
})();

// ■ END ANET.UI.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами и командами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("ANETZ");
      this._prepareParameters();
    }

    
      //? CONNECTION -----------------------------------------------------------
    // * Настройки соединения
    serverIp() {
      return this._ip;
    }

    serverPort() {
      return this._port;
    }

    //? MULTIPLAYER GROUP -----------------------------------------------------------

      //Wait Map Transfer?
    isOnlySameMapMode() {
      return this.getParam("onlySameMap", true);
    }

    // New Game Allowed?
    // * Доступна ли обычная локальная Новая игра
    isSinglePlayerAllowed() {
      return this.getParam("singlePlayerAllowed", true);
    }

    //Rooms Filter?
    isRoomFilterON() {
      return ANET.isPro() && this.getParam("roomFilter", false);
    }

    //Save and Load Allowed?
    // * Сохранение и загрузка сетевой игры
    isSaveLoadAllowed() {
      return this.getParam("saveLoadGame", true);
    }

    //TODO: Параметр
    isSaveOnlyInMenu() {
      return false;
    }

    //In-Game Chat?
    isGameChatAllowed() {
      if (ANET.isPro()) {
        return this.getParam("inGameChat", false);
      } else {
        return false;
      }
    }

    //? CHAT SUBGROUP -----------------------------------------------------------
    //TODO: Параметр
    //TODO: param Open chat if closed and new message is arrived
    //TODO: format strings
    //TODO: visual settings

      //Start Message
    getChatStartMessage() {
      return this.getParam("chatStartMessage", "");
    }

    getChatOpenCloseKey() {
      return this.getParam("chatOpenCloseKey", "t");
    }

    getChatSayKey() {
      return this.getParam("chatSayKey", "t");
    }

    //? PLAYER SETTINGS GROUP -----------------------------------------------------------

      // * Набор персонажей Actors для сетевой игры
    //?VERSION
    //Actors
    actorsForNetwork() {
      return this.getParam("actorsForNetwork", [1, 2, 3, 4]);
    }

    // * Можно ли выбирать персонажа себе
    //Actor selection?
    isActorSelectionAllowed() {
      return this.getParam("isActorSelectionAllowed", true);
    }

    // * Можно ли начать сетевую игру одному
    //One player start?
    isSingleActorNetworkGameAllowed() {
      return this.getParam("isSinglePlayerStartAllowed", true);
    }

    // * Отображение имени игрока заместо имени персонажа
    // * 0 - Не показывать, 1 - Name, 2 - Nickname
    //?DINAMIC
    //Player Name for Actor
    playerActorNameType() {
      return 0;
    }

    //On Player Disconnect CE
    getPlayerLeaveGameCommonEventId() {
      return this.getParam("playerLeaveGameCommonEvent", 0);
    }

    //? OTHER -----------------------------------------------------------
    globalVariablesIds() {
      return this._globalVars;
    }

    globalSwitchesIds() {
      return this._globalSwitches;
    }

    //? NOT IN HEADER YET -------------------------------------

      // * Можно ли просматривать статус других игроков
    isOtherPlayersMenuStatusAllowed() {
      return true;
    }

    // * Видно ли других игроков в меню
    isOtherPlayersVisibleInMenu() {
      return true;
    }

    // * Ожидание получения действия от каждого игрока в битве
    isForceBattleSyncMode() {
      return true;
    }

    // * Время обновления данных игрока (на карте)
    playerDataRefreshRate() {
      return 60;
    }

    // * Время обновления данных в битве (влияет на производительность)
    battleDataRefreshRate() {
      return 60;
    }

  };
  ANET.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.ParamsManager.prototype;
  _._prepareParameters = function() {
    this._prepareConnectionSettings();
    this._preparePlayerActorName();
    return this._prepareGlobalData();
  };
  //?VERSION
  _._prepareConnectionSettings = function() {
    var p;
    p = this.getParam("connection", {
      serverIp: "195.161.41.20",
      serverPort: "3034"
    });
    this._ip = p.serverIp;
    this._port = p.serverPort;
  };
  _._preparePlayerActorName = function() {
    var p;
    p = this.getParam("playerActorNameType", "");
    switch (p) {
      case "Instead Name":
        this.playerActorNameType = function() {
          return 1;
        };
        break;
      case "Instead Nickname":
        this.playerActorNameType = function() {
          return 2;
        };
        break;
    }
  };
  // * Ничего, так как 0 по умолчанию
  _._prepareGlobalData = function() {
    var p;
    p = this.getParam("globalData", {
      globalSwitchesIds: [],
      globalVariablesIds: []
    });
    this._globalVars = p.globalVariablesIds;
    this._globalSwitches = p.globalSwitchesIds;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания флагов (или данных) от других игроков
var PlayersDataPool;

PlayersDataPool = class PlayersDataPool {
  constructor(anotherPlayersGetter) {
    this.anotherPlayersGetter = anotherPlayersGetter;
    this.reset();
    return;
  }

  // * Режим ожидания не данных, а чтобы у всех был TRUE
  setFlagMode() {
    return this._isFlagMode = true;
  }

  // * Главный метод -> отправка на сервер запроса
  register(requestMethod) {
    this.requestMethod = requestMethod;
    return this.requestMethod();
  }

  update() {
    if (this.isReady()) { // * Чтобы цикла не было по вызову callback
      return;
    }
    this._timeout--;
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      this.checkPool();
      if (!this.isReady()) {
        this.resetTimer();
        if (this._timeout > 0) {
          this.register(this.requestMethod);
        } else {
          this._isTimedOut = true;
          if (this.failCallback != null) {
            this.failCallback();
          }
          // * Сброс (например если Timeout не предусмотрен, не задан метод failCallback)
          this.resetTimeout();
        }
      } else {
        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }

  // * Проверка пула данных
  checkPool() {
    var anotherPlayersIds, i, id, len, poolSize;
    poolSize = 0;
    // * Подразумевается что в этом массиве только ID других игроков (кроме себя)
    anotherPlayersIds = this.anotherPlayersGetter().map(function(pl) {
      return pl.actorId;
    });
    for (i = 0, len = anotherPlayersIds.length; i < len; i++) {
      id = anotherPlayersIds[i];
      if (this.isDataExistsFor(id)) {
        poolSize += 1;
      }
    }
    if (poolSize === anotherPlayersIds.length) {
      // * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
      this._isReady = this.isMyDataExists();
    } else {
      this._isReady = false;
    }
  }

  onReady(callback) {
    this.callback = callback;
  }

  onFail(failCallback) {
    this.failCallback = failCallback;
  }

  isReady() {
    return this._isReady === true;
  }

  isTimedOut() {
    return this._isTimedOut === true;
  }

  setMyData(data) {
    return this.onAnswer(ANGameManager.myActorId(), data);
  }

  isMyDataExists() {
    return this.isDataExistsFor(ANGameManager.myActorId());
  }

  isDataExistsFor(actorId) {
    return this.getDataFor(actorId) != null;
  }

  getDataFor(actorId) {
    return this._anotherPlayersData[actorId];
  }

  getData() {
    return this._anotherPlayersData;
  }

  // * Этот метод вызывается внешне, когда пришли данные от сервера
  onAnswer(actorId, data) {
    if (!this._isFlagMode) {
      this._anotherPlayersData[actorId] = data;
    } else {
      // * Если в режиме флагов, то только при TRUE присваиваем данные
      if (data === true) {
        this._anotherPlayersData[actorId] = data;
      } else {
        // * null, а не false, потому что проверка через ? идёт
        this._anotherPlayersData[actorId] = null;
        delete this._anotherPlayersData[actorId];
      }
    }
  }

  reset() {
    this.resetTimer();
    this.resetTimeout();
    this._isReady = false;
    this._isFlagMode = false;
    this._isTimedOut = false;
    this._anotherPlayersData = {};
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  resetTimeout() {
    return this._timeout = 600;
  }

};

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания других игроков
var PlayersWaitPool;

PlayersWaitPool = class PlayersWaitPool {
  constructor() {
    // * Запоминается при создании, чтобы можно было сбросить
    // * Это нужно, чтобы если игрок новый переместился на карту, его
    // * не добавили в ожидание, если на этой карте уже запущено общее событие
    this._anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map(function(pl) {
      return pl.actorId;
    });
    this.reset();
    return;
  }

  // * Зарегестрировать (отправить на сервер)
  register() {
    this.resetTimer();
    ANInterpreterManager.sendSharedEventRequireRegister();
  }

  // * Только один игрок (мастер события) запустил событие (один на карте или в игре)
  isSinglePool() {
    return this._anotherPlayersIds.length === 0;
  }

  // * Проверить, что игроки, которые в пуле, онлайн (не отключились)
  checkPool() {
    var i, id, len, player, playersOnMap, ref;
    playersOnMap = ANGameManager.anotherPlayersOnMap();
    ref = this._anotherPlayersIds;
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      // * Если игрока больше нет на карте, мы его удаляем из пула
      player = playersOnMap.find(function(pl) {
        return pl.actorId === id;
      });
      if (player == null) {
        this._anotherPlayersIds.delete(id);
        // * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
        // * (в следующей команде он уже участвовать не будет, так как будет Reset)
        this._playersReady[id] = true;
      }
    }
  }

  // * Ответ от сервера
  onAnswer(actorId) {
    return this._playersReady[actorId] = true;
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      if (!this.isReady()) {
        this.checkPool();
        this.register();
      }
    }
  }

  isReady() {
    var pl, ref, value;
    ref = this._playersReady;
    for (pl in ref) {
      value = ref[pl];
      if (value === false) {
        // * Если хоть одно значение false, значит не готов
        return false;
      }
    }
    return true;
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  // * Сбросить до нового ожидания
  reset() {
    var i, id, len, ref;
    // * Добавляем себя как готового всегда (тут не важент именно ID)
    // * В принципе можно и не добавлять, так как важнее другие игроки
    this._playersReady = {
      myActorId: true
    };
    ref = this._anotherPlayersIds;
    // * Добавляем всех игроков как изначально не готовых
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      this._playersReady[id] = false;
    }
    this.resetTimer();
  }

};

// Generated by CoffeeScript 2.5.1
// * Команды плагина
// * Нет класса или менеджера, так как только методы регистрации команд
(function() {
  var registerPluginCommandsMV, registerPluginCommandsMZ;
  // * Основной метод загрузки (регистрации команд плагина)
  ANET.loadPluginCommands = function() {
    if (KDCore.isMZ()) {
      registerPluginCommandsMZ('Alpha_NETZ');
      return registerPluginCommandsMZ('Alpha_NETZ_MZ');
    } else {
      return registerPluginCommandsMV();
    }
  };
  registerPluginCommandsMZ = function(pluginName) {
    PluginManager.registerCommand(pluginName, 'EventCommandSelector', function(args) {
      var e;
      try {
        return this.nSetCommandOptions(args);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
    PluginManager.registerCommand(pluginName, 'SharedBattle', function(args) {
      var e;
      try {
        return this.nSetSharedBattle(args.battleId);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
  };
  registerPluginCommandsMV = function() {
    var e;
    try {
      // * Этот метод только для MV существует
      return ANET.registerMVPluginCommands();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__terminate, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (ANNetwork.isBusy()) {
      return ANGameManager.updateWaiting();
    } else {
      //console.log("wait network...")
      return ALIAS__update.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    // * Смена сцены
    if (ANNetwork.isConnected()) {
      ANGameManager.sendSceneChanging();
    }
    return ALIAS__terminate.call(this);
  };
})();

// ■ END Scene_Base.coffee
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
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {
    HUIManager.hideLoader();
    return SceneManager.goto(Scene_Title);
  };
  
  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  _.netOn_lobby_roomClosed = function() {
    // * По умолчанию из любой сцены выходит в главное меню
    return SceneManager.goto(Scene_Title);
  };
  // * Когда пришло какое-либо сообщение от сервера
  //?EVENT
  _.onServerEvent = function(name) {
    var eventMethod;
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    eventMethod = "netOn_" + name;
    if (this[eventMethod] != null) {
      console.log("Call scene callback for event " + name);
      this[eventMethod]();
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeInputWindow, ALIAS__commandFight, ALIAS__shouldAutosave, ALIAS__stop, ALIAS__updateBattleProcess, ALIAS__updateBattleProcessMV, ALIAS__updateTpbAutoBattle, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS, STORED]
  _.ALIAS__NET_start = _.start;
  _.start = function() {
    // * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
    if (ANNetwork.isConnected() && BattleManager.nIsNetworkBattle() && !ANBattleManager.isBattleRegistred()) {
      return;
    }
    // * Метод Start вызывается автоматически у SceneManager, поэтому когда
    // * данные прийдут, сцена старт
    _.ALIAS__NET_start.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleStarted();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleEnd();
    }
  };
  //TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
  //TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

  // * Игрок не может видеть команды "ввода" персонажей других игроков
  //@[ALIAS]
  ALIAS__changeInputWindow = _.changeInputWindow;
  _.changeInputWindow = function() {
    ALIAS__changeInputWindow.call(this);
    if (ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()) {
      if (BattleManager.actor() != null) {
        if (BattleManager.actor() !== $gameParty.leader()) {
          this.endCommandSelection();
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__commandFight = _.commandFight;
  _.commandFight = function() {
    if (ANNetwork.isConnected()) {
      // * Игрок снова должен сделать выбор
      BattleManager._isShouldWaitMyNetworkAction = true;
    }
    ALIAS__commandFight.call(this);
  };
  // * Должен идти перед переопределением общим, поэтому в этом файле
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__updateBattleProcessMV = _.updateBattleProcess;
    _.updateBattleProcess = function() {
      if (ANNetwork.isConnected()) {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
          this.changeInputWindow();
        }
        return BattleManager.update(); // * Надо обновлять не зависимо от условия вверху
      } else {
        return ALIAS__updateBattleProcessMV.call(this);
      }
    };
  }
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    // * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
    if (ANNetwork.isConnected()) {
      if ($gameParty.isOneBattler()) {
        // * Только обновлять данные HP и MP другим игрокам
        $gameParty.leader().updateDataObserver();
      } else {
        // * Логика сетевого боя (общая для мастера и клиентов)
        this.nUpdateBattleProcess();
        if (ANGameManager.isBattleMaster()) {
          ANBattleManager.update();
          // * Если ждём сервер, то не обновляем BattleManager
          if (ANBattleManager.isShouldWaitServer()) {
            return;
          }
        } else {
          // * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
          if (!BattleManager.nIsLocalForceUpdatePhase()) {
            return;
          }
        }
      }
    }
    ALIAS__updateBattleProcess.call(this);
  };
  
  // * На всякий случай отключу автобитву
  //@[ALIAS]
  ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle;
  _.updateTpbAutoBattle = function() {
    if (ANNetwork.isConnected()) {

    } else {
      return ALIAS__updateTpbAutoBattle.call(this);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Когда пришли данные о битве от сервера (регистрация, новый участник)
  // * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
  _.netOn_battle_serverBattleData = function() {
    var battler, battlerId, i, j, len, len1, ref, ref1;
    ref = $gameParty.battleMembers();
    // * Для всех новых, надо выполнять некоторые методы
    for (i = 0, len = ref.length; i < len; i++) {
      battler = ref[i];
      if (!$gameTemp._previousNetBattleActors.contains(battler.actorId())) {
        battler.onBattleStart();
        battler.makeActions();
      }
    }
    ref1 = $gameTemp._previousNetBattleActors;
    // * Всех старых, надо удалить из битвы
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      battlerId = ref1[j];
      if (!ANBattleManager.battleData.actors.contains(battlerId)) {
        $gameParty.removeActor(battlerId);
        BattleManager.nSafeRemoveActor();
      }
    }
    $gameTemp._previousNetBattleActors = [];
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
  };
  _.nOnBattleStarted = function() {
    // * Отправляем на сервер, что мы начали бой
    ANBattleManager.onBattleStarted();
  };
  _.nOnBattleEnd = function() {
    // * Отправляем на сервер, что мы покинули (закончили) бой
    ANBattleManager.onBattleEnd();
  };
  _.nUpdateBattleProcess = function() {
    var actor, enemy, i, j, len, len1, ref, ref1;
    // * За отправку данных отвечает только мастер боя
    if (ANGameManager.isBattleMaster()) {
      ref = $gameParty.battleMembers();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        actor.updateDataObserver();
      }
      ref1 = $gameTroop.members();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        enemy = ref1[j];
        enemy.updateDataObserver();
      }
    }
  };
  _.nRefreshSharedBattle = function() {
    // * Обновить спрайты врагов
    return this._spriteset.nRefreshNetBattle();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем сетевой код
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    ANET.System.initSystem();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onLoadFailure, ALIAS__terminate, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      if (KDCore.isMZ()) {
        this.nLoadNetworkGameFromSavefile(); // * В MV в одном потоке, не переключает сцену сразу после инициализации
      } else {
        setTimeout((() => {
          return this.nLoadNetworkGameFromSavefile();
        }), 1);
      }
    }
  };
  //@[ALIAS]
  ALIAS__onLoadFailure = _.onLoadFailure;
  _.onLoadFailure = function() {
    // * Своя обработка ошибки загрузки в сетевом режиме
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      this.nOnLoadFailure();
    } else {
      ALIAS__onLoadFailure.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    ALIAS__terminate.call(this);
    // * Сбросим флаг
    $gameTemp._nRequestLoadNetworkGame = false;
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  _.nLoadNetworkGameFromSavefile = function() {
    var savefileId;
    savefileId = DataManager.nGetNetworkSaveFileIdByUniqueId(ANNetwork.room.uniqueSaveID);
    if (savefileId < 0) {
      this.nOnLoadFailure();
    } else {
      this.executeLoad(savefileId);
    }
  };
  _.nOnLoadFailure = function() {
    HUIManager.notifyError("Can't load Save file!");
    // * Через timeout а то не успевает, если сразу ошибка
    setTimeout((function() {
      return SceneManager.goto(Scene_Title);
    }), 1);
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__shouldAutosave, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (ANNetwork.isConnected()) {
      ANGameManager.onMapLoaded();
      $gameParty.nRefreshNetworkActors();
    }
    // * Открыть (или нет) чат
    ANET.UI.openChatAfterMapLoaded();
  };
  
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS]
  // * Создаём интерфейс
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this._netUI = new ANET.Spriteset_UI();
    this.addChild(this._netUI);
  };
  // * Запрет движения при нажатии на UI элементы
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  _.onMapTouch = function() {
    if (ANNetwork.isConnected()) {
      if (ANET.UI.isUITouched()) {
        return;
      }
    }
    ALIAS__onMapTouch.call(this);
  };
  // * Закрываем интерфейс
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    ANET.UI.terminate();
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
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    //TODO: Если игрок отключился, надо общее событие!
    $gameParty.nRefreshNetworkActors();
    $gameMap.refreshNetworkCharacters();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MenuBase.prototype;
  //?EVENT
  // * Когда пришли какие-либо данные DataObserver
  _.netOn_game_observerData = function() {
    return this.refreshNetwork();
  };
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    var e, ref;
    try {
      $gameParty.nRefreshNetworkActors();
      // * Если есть окно с персонажами, обновить его
      // * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
      // * Так как тут в Scene_MenuBase тоже нужен метод
      if ((ref = this._statusWindow) != null) {
        ref.refresh();
      }
    } catch (error) {
      //TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
      e = error;
      ANET.w(e);
    }
  };
  // * Обновить все окна при изменениях данных из сети
  _.refreshNetwork = function() {
    var child, e, i, len, ref;
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      this.updateActor();
      if (this._windowLayer == null) {
        return;
      }
      ref = this._windowLayer.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if ((child != null) && (child.refresh != null)) {
          child.refresh();
        }
      }
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Scene_MenuBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена ввода сообщения для чата
var Scene_NetChatInput;

Scene_NetChatInput = class Scene_NetChatInput extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    if ($gameTemp._nChatLastChannelId == null) {
      $gameTemp._nChatLastChannelId = 0;
    }
    this._showNameInput();
    this._createGroupButtons();
    if (KDCore.isMZ()) {
      this._createOkButton();
    }
    // * Делаем фокус ввода
    setTimeout((function() {
      return HUIManager.focusInput();
    }), 100);
  }

  stop() {
    $gameTemp._nChatLastChannelId = this.buttonsGroup.getSelectedIndex();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel()) {
      this.popScene();
    } else if (Input.isTriggered("ok")) {
      this.onOkClick();
    }
  }

  onOkClick() {
    var msg;
    msg = HUIManager.getInputValue();
    if (String.any(msg)) {
      this._sendMessageToServer(msg);
    }
    return this.popScene();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetChatInput.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetChatInput.prototype;
  _._sendMessageToServer = function(msg) {
    var channelId, e;
    try {
      channelId = this.buttonsGroup.getSelectedIndex();
      console.log("Send message from chat: " + msg);
      if (ANNetwork.isConnected()) {
        ANGameManager.sendMyChatMessage(channelId, msg);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  _._showNameInput = function() {
    HUIManager.showInput("Enter your message...");
    HUIManager.setInputValue("");
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
  //TODO: Customizable
  _._createGroupButtons = function() {
    var y;
    this.buttonsGroup = new AA.Sprite_ButtonsGroup([
      {
        image: "nzButton_ChatGroup_All",
        position: [0,
      0]
      },
      {
        image: "nzButton_ChatGroup_Map",
        position: [100,
      0]
      }
    ], $gameTemp._nChatLastChannelId, null);
    if (KDCore.isMZ()) {
      y = this.buttonY();
    } else {
      y = 6;
    }
    this.buttonsGroup.move(4, y);
    this.addChild(this.buttonsGroup);
  };
  _._createOkButton = function() {
    this._okButton = new Sprite_Button("ok");
    this._okButton.x = Graphics.boxWidth / 2 - this._okButton.width / 2;
    this._okButton.y = Graphics.boxHeight / 2 - this._okButton.height / 2;
    this.addWindow(this._okButton);
  };
})();

// ■ END Scene_NetChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_NetworkGameMenu;

Scene_NetworkGameMenu = class Scene_NetworkGameMenu extends Scene_MenuBase {
  constructor() {
    super();
    return;
  }

  create() {
    super.create();
    // * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
    if (!ANNetwork.isConnected()) {
      this._initNetwork();
    } else {
      this._initSceneComponents();
      this.refreshWelcomeText();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateBackButton();
    this._updateRandomJoin(); //2
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.update();
    }
  }

  stop() {
    HUIManager.removeInput();
    HUIManager.hideLoader();
    return super.stop();
  }

  refreshWelcomeText() {
    var e, ref;
    try {
      return (ref = this._welcomeLine) != null ? ref.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name) : void 0;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  refreshPlayersCountText(count = 0) {
    var e;
    try {
      if (this._playerCountText == null) {
        return;
      }
      this._playerCountText.clear();
      return this._playerCountText.drawTextFull("Players on server: " + count);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  //?EVENT
  netOn_lobby_changePlayerName() {
    var ref;
    this.refreshWelcomeText();
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.call();
    }
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  // * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
  // * Так как пока нет необходимости $gameParty менять
  netOn_lobby_refreshRoomData() {} // * NOTHING

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._initNetwork = function() {
    HUIManager.showLoader();
    ANNetwork.initSystem();
    ANNetwork.setConnection(this._onConnectionStatus.bind(this));
  };
  //?EVENT
  // * 0 - error, 1 - connect
  _._onConnectionStatus = function(statusCode) {
    switch (statusCode) {
      case 0:
        this._onConnectionRefused();
        break;
      case 1:
        this._onConnectionGood();
    }
  };
  _._onConnectionRefused = function() {
    HUIManager.hideLoader();
    HUIManager.notifyError("Server not response in time");
    return this.popScene();
  };
  _._onConnectionGood = function() {
    //TODO: Server version check
    HUIManager.hideLoader();
    if (!ANGameManager.isInited()) {
      ANGameManager.init();
    }
    HUIManager.notifySucess("Connected to server");
    return this._initSceneComponents();
  };
  // * Отрисовка меню, если соединение  было установлено
  _._initSceneComponents = function() {
    this._createNetworkMenu(); //1
    this._createWelcomeText(); //1
    HUIManager.showInput("Room Name...");
    this._createServerPlayerCountText();
    this._createPlayerCountRefreshThread();
  };
  _._updateBackButton = function() {
    var ref;
    if (KDCore.isMV()) {
      return;
    }
    // * Тут может быть вылет, если нет проверки null (?)
    return (ref = this._cancelButton) != null ? ref.visible = !HUIManager.isLoaderActive() : void 0;
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._createWelcomeText = function() {
    //TODO: From UI Text Component with user settings
    this._welcomeLine = KDCore.Sprite.FromBitmap(400, 60);
    this._welcomeLine.bitmap.fontSize = 38;
    this._welcomeLine.x = Graphics.width / 2 - this._welcomeLine.bitmap.width / 2;
    this._welcomeLine.y = 80;
    return this.addChild(this._welcomeLine);
  };
  _._createNetworkMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    wh = this.calcWindowHeight(4, true);
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkGameMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('createRoom', this.commandCreateRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRoom', this.commandJoinRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRandRoom', this.commandJoinRandRoomMenu.bind(this)); //2
    this._commandsWindow.setHandler('settings', this.commandSettings.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _._createServerPlayerCountText = function() {
    this._playerCountText = KDCore.Sprite.FromBitmap(280, 40);
    this._playerCountText.bitmap.fontSize = 18;
    this._playerCountText.x = Graphics.width / 2 - this._playerCountText.bitmap.width / 2;
    this._playerCountText.y = this._commandsWindow.y + this._commandsWindow.height + 20;
    return this.addChild(this._playerCountText);
  };
  _._createPlayerCountRefreshThread = function() {
    var refreshMethod;
    refreshMethod = function() {
      //return if SceneManager.isSceneChanging()
      return ANNetwork.callback(NMS.Lobby("playersCountOnServ"), (count) => {
        var e;
        try {
          if (SceneManager.isSceneChanging()) {
            return;
          }
          return this.refreshPlayersCountText(count);
        } catch (error) {
          e = error;
          return ANET.w(e);
        }
      });
    };
    this._playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(this));
    this._playerCountRefreshThread.call();
  };
  _.commandCreateRoomMenu = function() {
    // * Сохраняем название команты
    $gameTemp._nLastRoomName = HUIManager.getInputValue();
    $gameTemp._nIsForwardTransitionToRoomTypeMenu = true;
    SceneManager.push(Scene_NetworkRoomTypeSelect);
  };
  _.commandJoinRoomMenu = function() {
    return SceneManager.push(Scene_NetworkRoomsList);
  };
  _.commandSettings = function() {
    return SceneManager.push(Scene_NetworkSettings);
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  // * Методы обработки подключения к случайной комнате
  _.commandJoinRandRoomMenu = function() {
    this.roomsList = null; // * Обнуляем список комнат
    this.requestRoomsListFromServer();
    this._waitRoomsForRandomJoin = true;
  };
  _.requestRoomsListFromServer = function() {
    ANNetwork.get(NMS.Lobby("getRoomsList"), (result) => {
      return this.roomsList = result;
    }, () => {
      // * Timeout
      console.log("Server not returns rooms list in time");
      return this._onCantJointRandomRoom();
    });
  };
  _._onCantJointRandomRoom = function() {
    this._waitRoomsForRandomJoin = false;
    this._commandsWindow.activate();
    HUIManager.notifyError("No available open rooms to join");
  };
  // * Ждём список комнат и пытаемся подключиться к случайной
  _._updateRandomJoin = function() {
    var randomRoomName;
    if (!this._waitRoomsForRandomJoin) {
      return;
    }
    if (this.roomsList == null) {
      return;
    }
    this._waitRoomsForRandomJoin = false;
    this.applyFiltersToRoomList();
    if (this.roomsList.length === 0) {
      this._onCantJointRandomRoom();
    } else {
      randomRoomName = this.roomsList.sample().name;
      this.joinToRoomRequest(randomRoomName);
    }
  };
  _.applyFiltersToRoomList = function() {
    if (this.roomsList == null) {
      this.roomsList = [];
    }
    if (this.roomsList.length === 0) {
      return;
    }
    this.roomsList = this.roomsList.filter((r) => {
      return this.isProperRoomToJoin(r);
    });
  };
  _.isProperRoomToJoin = function(roomData) {
    return NetRoomDataWrapper.isRoomProperToJoin(roomData);
  };
  _.joinToRoomRequest = function(roomName) {
    ANNetwork.get(NMS.Lobby("joinToRoom", roomName), (result) => {
      return this._onJoinedToRoom(result);
    }, () => {
      console.log("Can't join to Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._commandsWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Scene_NetworkRoom;

Scene_NetworkRoom = class Scene_NetworkRoom extends Scene_MenuBase {
  constructor() {
    super();
    this._startingGameTransition = false;
  }

  create() {
    super.create();
    this.room = ANNetwork.room;
    this.createRoomTitle();
    this.createCommands();
    this.createPlayersList();
    if (ANET.PP.isActorSelectionAllowed() && !this.isLoadGame()) {
      this.createActorSelectWindow();
    }
    if (this.isLoadGame()) {
      this.prepareSaveFile();
    }
    this.refreshRoom();
  }

  start() {
    super.start();
    ANNetwork.requestRoomRefresh();
    // * Так как есть искуственная задержка загрузки сцены на MV
    if (KDCore.isMV()) {
      setTimeout((function() {
        try {
          return ANNetwork.requestRoomRefresh();
        } catch (error) {

        }
      }), 300);
    }
  }

  isBottomHelpMode() {
    return false;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  refreshRoom() {
    this.room = ANNetwork.room;
    this._refreshRoomTitle();
    this._refreshPlayerList();
    this._refreshActorsList();
    return this._windowCommands.refresh();
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  netOn_lobby_refreshRoomData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  // * Когда игрок выбирает персонажа
  netOn_game_playersData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  netOn_lobby_startGame() {
    this._startingGameTransition = true;
    if (this.isLoadGame()) {
      this.loadAndStartGame();
    } else {
      this.startNewGame();
    }
  }

  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  netOn_lobby_roomClosed() {
    if (!this._shouldNotPopScene) {
      // * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
      // * Для мастера не надо, так как сцена и так закрывается сама и получается
      // * что возврат происходит на Scene_Title
      return this.popScene();
    }
  }

  update() {
    return super.update();
  }

  //TODO: Готов клиент или нет
  //if ANNetwork.isMasterClient() and Input.isTriggered('ok')
  //    ANNetwork.send(NMS.Lobby("startGame"))
  stop() {
    super.stop();
    // * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
    if (this._startingGameTransition === true) {
      return;
    }
    if (ANNetwork.isMasterClient()) {
      this._shouldNotPopScene = true;
      return ANNetwork.closeRoom();
    } else {
      return ANNetwork.leaveRoom();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkRoom.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoom.prototype;
  _.startNewGame = function() {
    // * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
    this._commandWindow = {
      close: function() {}
    };
    Scene_Title.prototype.commandNewGame.call(this);
  };
  _.loadAndStartGame = function() {
    // * Задаём флаг, что будем загружать сетевую игру
    $gameTemp._nRequestLoadNetworkGame = true;
    SceneManager.push(Scene_Load);
  };
  _.createRoomTitle = function() {
    this.createHelpWindow();
    return this._refreshRoomTitle();
  };
  _._refreshRoomTitle = function() {
    var ref, roomHostName;
    if (ANNetwork.isMasterClient()) {
      roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)";
    } else {
      if (this.room == null) {
        roomHostName = "Fetching...";
      } else {
        roomHostName = (ref = ANGameManager.getPlayerDataById(this.room.masterId)) != null ? ref.name : void 0;
      }
    }
    return this._helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName));
  };
  _._refreshPlayerList = function() {
    this._playersListWindow.refresh();
  };
  _.createCommands = function() {
    this._windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, this._helpWindow.y + this._helpWindow.height, 600, 100));
    this._windowCommands.setHandler('cancel', this.popScene.bind(this));
    this._windowCommands.setHandler('leave', this.popScene.bind(this));
    this._windowCommands.setHandler('start', this._onStartRoomCommand.bind(this));
    this._windowCommands.setHandler('ready', this._onReadyInRoomCommand.bind(this));
    this._windowCommands.setHandler('character', this._onCharacterSelectCommand.bind(this));
    this.addWindow(this._windowCommands);
    this._windowCommands.activate();
  };
  _._onStartRoomCommand = function() {
    if (this._isAllInRoomReady()) { // TODO: В Wrapper, так как окно тоже проверяет
      if (ANNetwork.isMasterClient()) {
        ANNetwork.send(NMS.Lobby("startGame"));
      }
    } else {
      this._windowCommands.activate();
    }
  };
  _._onReadyInRoomCommand = function() {};
  //TODO: Ничего пока нет
  _._onCharacterSelectCommand = function() {
    this._windowActorsList.show();
    this._windowActorsList.open();
    this._windowActorsList.activate();
    return this._playersListWindow.close();
  };
  //TODO: Флаги готовности, сбрасывать при нажатии Character
  // * См. readyPlayersIds у данных комнаты
  _._isAllInRoomReady = function() {
    return true;
  };
  _.createActorSelectWindow = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh));
    this._windowActorsList.setHandler('cancel', this._onActorSelectCancel.bind(this));
    this._windowActorsList.setHandler('ok', this._onActorSelectOk.bind(this));
    this._windowActorsList.hide();
    return this.addWindow(this._windowActorsList);
  };
  _._onActorSelectCancel = function() {
    return this._cancelActorSelection();
  };
  _._cancelActorSelection = function() {
    this._windowActorsList.close();
    this._windowCommands.activate();
    return this._playersListWindow.open();
  };
  _._onActorSelectOk = function() {
    var selectedActorId;
    selectedActorId = this._windowActorsList.selectedActorId();
    if (selectedActorId <= 0) {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    } else {
      ANPlayersManager.sendBindActorFromLobby(selectedActorId, this._onBindActorResult.bind(this));
    }
  };
  _._onBindActorResult = function(resultFlag) {
    if (resultFlag === true) {
      this._cancelActorSelection();
    } else {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    }
    this.refreshRoom();
  };
  _._refreshActorsList = function() {
    var ref;
    return (ref = this._windowActorsList) != null ? ref.refresh() : void 0;
  };
  _.createPlayersList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._playersListWindow);
    this._refreshPlayerList();
  };
  _.prepareSaveFile = function() {
    var info;
    info = DataManager.nGetNetworkSaveInfoWithId(this.room.uniqueSaveID);
    if (info == null) {
      HUIManager.notifyError("Save file data not found!");
      console.warn("Save file with ID " + this.room.uniqueSaveID + " not found!");
      this.popScene.bind(this);
    } else {
      //TODO: На сервере нет проверки на занятость персонажа??? НЕТУ в 112
      ANPlayersManager.sendBindActorFromLobby(info.nMyActorId, this.onBindLoadedActorResult.bind(this));
    }
  };
  _.onBindLoadedActorResult = function(resultFlag) {
    if (resultFlag === false) {
      SoundManager.playBuzzer();
      HUIManager.notifyError("Can't load Actor data or Actor already used by another player");
      this.popScene.bind(this);
    } else {
      this.refreshRoom();
    }
  };
})();

// ■ END Scene_NetworkRoom.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена со списком комнат на сервере
var Scene_NetworkRoomsList;

Scene_NetworkRoomsList = class Scene_NetworkRoomsList extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    //TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
    // * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
    this._refreshRoomsListThread = new KDCore.TimedUpdate(60, this._requestRoomsListFromServer.bind(this));
    this._createRoomsList();
    this._requestRoomsListFromServer();
  }

  refreshRooms() {
    if (ANET.PP.isRoomFilterON()) {
      this.applyFilterToRooms();
    }
    return this._roomsListWindow.refreshRooms(this.roomsList);
  }

  //?VERSION
  applyFilterToRooms() {}

  update() {
    super.update();
    return this._refreshRoomsListThread.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _._requestRoomsListFromServer = function() {
    // * В первый раз показываем Loader
    if (this.roomsList == null) {
      HUIManager.showLoader();
    }
    ANNetwork.callback(NMS.Lobby("getRoomsList"), (result) => {
      // * Если сцена была закрыта, а комнаты пришли
      if (!(SceneManager._scene instanceof Scene_NetworkRoomsList)) {
        return;
      }
      this.roomsList = result;
      if (this.roomsList == null) {
        return;
      }
      this.refreshRooms();
      return HUIManager.hideLoader();
    });
    this.refreshRooms();
  };
  _._createRoomsList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 140;
    wx = 50;
    wy = 70;
    this._roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh));
    this._roomsListWindow.setHandler('cancel', this.popScene.bind(this));
    this._roomsListWindow.setHandler('ok', this._onJoinRoomCommand.bind(this));
    this._roomsListWindow.activate();
    return this.addWindow(this._roomsListWindow);
  };
  _._onJoinRoomCommand = function() {
    var roomData;
    roomData = this._roomsListWindow.getSelectedRoom();
    if (NetRoomDataWrapper.isRoomProperToJoin(roomData)) {
      ANNetwork.get(NMS.Lobby("joinToRoom", roomData.name), (result) => {
        return this._onJoinedToRoom(result);
      }, () => {
        console.log("Can't join to Room, server not response in time");
        return this._roomsListWindow.activate();
      });
    } else {
      SoundManager.playBuzzer();
      this._roomsListWindow.activate();
    }
  };
  
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._roomsListWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

//TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkRoomTypeSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Сцена выбора "Новая игра" или "Загрузить" после выбора "Создать комнату"

//TODO: Если опция по возможности сохранения отключена, надо сразу перепрыгивать эту сцену
var Scene_NetworkRoomTypeSelect;

Scene_NetworkRoomTypeSelect = class Scene_NetworkRoomTypeSelect extends Scene_MenuBase {
  constructor() {
    super();
  }

  //TODO: Заголовок какой-нибудь ???
  create() {
    super.create();
    // * Если параметр выключен (сохранять и загружать нельзя), то пропуск данной сцены
    if (!ANET.PP.isSaveLoadAllowed()) {
      // * Если мы входим в сцену, то пропуск сразу в комнату
      if ($gameTemp._nIsForwardTransitionToRoomTypeMenu === true) {
        $gameTemp._nIsForwardTransitionToRoomTypeMenu = null;
        this.commandNewGame();
      } else {
        this.popScene(); // * Выход, не нужны компоненты сцены
      }
      return;
    }
    this._initSceneComponents();
  }

};

(function() {  // ■ END Scene_NetworkRoomTypeSelect.coffee
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomTypeSelect.prototype;
  _._initSceneComponents = function() {
    this._createRoomTypeSelectMenu();
    return this._createGamesToLoadList();
  };
  _._createRoomTypeSelectMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    if (KDCore.isMV()) {
      wh = this.calcWindowHeight(2, true);
    } else {
      // * Хоть команды 2, используется 4, чтобы сразу под курсором была команда
      wh = this.calcWindowHeight(4, true);
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkRoomTypeMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('newGame', this.commandNewGame.bind(this));
    this._commandsWindow.setHandler('continue', this.commandContinue.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _.commandNewGame = function() {
    this._createNewRoom(null); // * новая игра
  };
  _.commandContinue = function() {
    this._commandsWindow.hide();
    this._listWindow.show();
    this._listWindow.activate();
  };
  _._createNewRoom = function(uniqueSaveId) {
    var newRoomData, roomName;
    // * Используем название команаты с предыдущей сцены
    roomName = $gameTemp._nLastRoomName;
    if (!String.any(roomName)) {
      roomName = "Room_" + Math.randomInt(1000);
    }
    $gameTemp._nLastRoomName = null; // * очищаем
    
    // * Собираем данные об новой комнате
    newRoomData = {
      name: roomName,
      gameInfo: ANNetwork.getNetworkGameInfoData(),
      uniqueSaveID: uniqueSaveId
    };
    // * Отправляем данные об текущей игре (клиенте)
    ANNetwork.get(NMS.Lobby("createRoom", newRoomData), (result) => {
      return this._onRoomCreated(result);
    }, () => {
      console.log("Can't create Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onRoomCreated = function(roomData) {
    if (roomData != null) {
      ANNetwork.setRoomMaster(roomData);
      SceneManager.push(Scene_NetworkRoom);
    } else {
      HUIManager.notifyError("Can't create room with name: " + this._lastRoomName);
      this._commandsWindow.activate();
    }
  };
  _._createGamesToLoadList = function() {
    var rect, wh, ww, wx, wy;
    ww = Graphics.boxWidth - 100;
    if (KDCore.isMZ()) {
      wh = this.mainAreaHeight();
    } else {
      wh = Graphics.height - 20;
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onLoadFileSelected.bind(this));
    this._listWindow.setHandler("cancel", this.onLoadFileSelectCancel.bind(this));
    this._listWindow.setMode("loadNet", false);
    if (KDCore.isMZ()) {
      this._listWindow.selectSavefile(0);
    } else {
      this._listWindow.select(0);
    }
    this._listWindow.refresh();
    this._listWindow.hide();
    this.addWindow(this._listWindow);
  };
  _.onLoadFileSelected = function() {
    var info, savefileId;
    if (KDCore.isMZ()) {
      savefileId = this._listWindow.savefileId();
    } else {
      savefileId = this._listWindow.index() + 1;
    }
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      info = DataManager.nGetInfoForSavefileId(savefileId);
      this._createNewRoom(info.nUniqueSaveID);
    } else {
      SoundManager.playBuzzer();
      this._listWindow.activate();
    }
  };
  _.onLoadFileSelectCancel = function() {
    this._listWindow.hide();
    this._commandsWindow.show();
    this._commandsWindow.activate();
  };
})();

// Generated by CoffeeScript 2.5.1
// * Сцена настроек для сетевой игры

//TODO: Пока что просто ввод имени игрока
var Scene_NetworkSettings;

Scene_NetworkSettings = class Scene_NetworkSettings extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    return this._showNameInput();
  }

  stop() {
    this._savePlayerName();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel() || Input.isTriggered('ok')) {
      return this.popScene();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkSettings.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkSettings.prototype;
  _._showNameInput = function() {
    HUIManager.showInput("Enter your name for network...");
    HUIManager.setInputValue(ANGameManager.myPlayerData().name);
  };
  _._savePlayerName = function() {
    var newName;
    newName = HUIManager.getInputValue();
    if (String.any(newName)) {
      ANGameManager.myPlayerData().name = newName;
      // * Отправим на сервер
      ANPlayersManager.sendPlayerName();
      ConfigManager.netPlayerName = newName;
      ConfigManager.save();
    }
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
})();

// ■ END Scene_NetworkSettings.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  //TODO: В MV по другому скорее всего, не помню этот метод

  // * В MV нету метода executeSave, создадим его для совместимости
  if (KDCore.isMV()) {
    //?[NEW, from MZ]
    _.executeSave = function(savefileId) {
      $gameSystem.onBeforeSave();
      if (DataManager.saveGame(savefileId)) {
        this.onSaveSuccess();
      } else {
        this.onSaveFailure();
      }
    };
    // * Переопределим стандартный метод (только в МВ)
    // * Теперь в сетевом режиме он будет использовать новый метод executeSave
    //@[ALIAS]
    ALIAS__onSavefileOk = _.onSavefileOk;
    _.onSavefileOk = function() {
      if (ANNetwork.isConnected()) {
        Scene_File.prototype.onSavefileOk.call(this);
        this.executeSave(this.savefileId());
      } else {
        ALIAS__onSavefileOk.call(this);
      }
    };
  }
  //@[ALIAS, STORED]
  _.nALIAS__executeSave_43243 = _.executeSave;
  _.executeSave = function(savefileId) {
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isSaveOnlyInMenu()) {
        //TODO:
        //@nRequestClientsStatesForSave(savefileId)
        this.nExecuteNetworkSave(savefileId);
      } else {
        this.nExecuteNetworkSave(savefileId);
      }
    } else {
      _.nALIAS__executeSave_43243.call(this, savefileId);
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    if (this.nSaveDataPool == null) {
      return;
    }
    this.nUpdateSavePool();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    this.nClearTempSaveData();
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  _.nUpdateSavePool = function() {
    var ref;
    return (ref = this.nSaveDataPool) != null ? ref.update() : void 0;
  };
  _.nCreateTempSaveData = function() {
    // * Делаем глобальную переменную чтобы DataManager мог перехватить данные
    $gameTemp.nSaveData = this.nSaveDataPool;
    // * Чтобы у всех был одинаковый, нужно при опредлении какой файл загружать
    $gameTemp.nUniqueSaveID = ANET.Utils.generateSaveUniqueId();
  };
  _.nClearTempSaveData = function() {
    $gameTemp.nSaveData = null;
    return $gameTemp.nUniqueSaveID = null;
  };
  // * Запросить проверку статуса других игроков
  // * чтобы они не были "заняты" (например битва или событие)
  // * сейчас используется проверка, что все должны быть в меню
  _.nRequestClientsStatesForSave = function(savefileId) {};
  //TODO: пропустим пока что

  // * Отправить всем команду что нужны данные для сохранения
  _.nExecuteNetworkSave = function(savefileId) {
    // * Создаём пул данных сохранений для каждого игрока
    this.nSaveDataPool = new PlayersDataPool(function() {
      return ANGameManager.anotherPlayers();
    });
    // * Задаём сразу свои данные
    this.nSaveDataPool.setMyData(DataManager.makeSaveContents());
    // * Задаём методы callbacks
    this.nSaveDataPool.onFail(() => {
      return this.nOnWaitSaveDataDone(-1); // * fail
    });
    this.nSaveDataPool.onReady(() => {
      return this.nOnWaitSaveDataDone(savefileId);
    });
    this.nCreateTempSaveData();
    // * Посылаем запрос на сервер ($gameTemp.nUniqueSaveID должен быть уже создан)
    this.nSaveDataPool.register(function() {
      return ANGameManager.sendSaveDataRequest(savefileId);
    });
    this.nOnWaitSaveDataStart();
  };
  _.nOnWaitSaveDataStart = function() {
    return HUIManager.showLoader(600);
  };
  _.nOnWaitSaveDataDone = function(savefileId) {
    HUIManager.hideLoader();
    "SAVE DATA RECEIVED".p(savefileId);
    if (savefileId >= 0) {
      // * Вызываем стандартный метод
      _.nALIAS__executeSave_43243.call(this, savefileId);
    } else {
      this.onSaveFailure();
    }
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Skill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Skill.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Skill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Status.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме зависит от параметра
    if (ANNetwork.isConnected()) {
      return ANET.PP.isOtherPlayersMenuStatusAllowed();
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Status.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    if (ANNetwork.isConnected()) {
      ANNetwork.stop();
    }
    if (ANET.isDEV()) {
      return "Precc C for fast connect".p();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANET.isDEV()) {
      //TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
      return this.nUpdateDebugStart();
    }
  };
  (function() {    // * Добавляем команду сетевой игры в главное меню
    var ALIAS__calcWindowHeight, ALIAS__commandWindowRect, ALIAS__createCommandWindow;
    
    //@[ALIAS]
    ALIAS__createCommandWindow = _.createCommandWindow;
    _.createCommandWindow = function() {
      ALIAS__createCommandWindow.call(this);
      return this._commandWindow.setHandler("network", this.commandNetwork.bind(this));
    };
    //@[ALIAS]
    ALIAS__commandWindowRect = _.commandWindowRect;
    _.commandWindowRect = function() {
      // * little trick to not overwrite method
      this.___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine;
      return ALIAS__commandWindowRect.call(this);
    };
    //@[ALIAS]
    ALIAS__calcWindowHeight = _.calcWindowHeight;
    _.calcWindowHeight = function(numLines, selectable) {
      if (this.___isOneMoreCommand === true) {
        numLines += 1;
        if (!ANET.PP.isSinglePlayerAllowed()) {
          // * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
          numLines -= 1;
        }
      }
      return ALIAS__calcWindowHeight.call(this, numLines, selectable);
    };
  })();
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  (function() {    // DEV FAST GAME START
    // --------------------------------------------------------
    // * Метод только для отладки (быстрый старт на кнопку C)
    _.nUpdateDebugStart = function() {
      if (Input.isTriggered('c')) {
        this.nFastConnectToDevRoom();
      }
      if ($gameTemp._isDevNetGameWaitPlayers === true) {
        if (ANGameManager.playersData.length > 1) {
          return this.nFastGameStart();
        }
      }
    };
    //?EVENT
    _.netOn_lobby_startGame = function() {
      if ($gameTemp._isDevNetGameStart !== true) {
        return;
      }
      Scene_Title.prototype.commandNewGame.call(this);
    };
    _.nFastConnectToDevRoom = function() {
      if (ANET.PP.isActorSelectionAllowed()) {
        console.warn("Can't connect in Dev room in Actor Select mode");
        return;
      }
      ANNetwork.initSystem();
      return ANNetwork.setConnection(function(status) {
        if (status === 1) {
          HUIManager.notifySucess("Connected to server");
          ANGameManager.init();
          return ANNetwork.get(NMS.Lobby("createRoom", {
            name: "dev",
            gameInfo: ANNetwork.getNetworkGameInfoData()
          }), function(roomData) {
            if (roomData != null) {
              ANNetwork.setRoomMaster(roomData);
              return $gameTemp._isDevNetGameWaitPlayers = true;
            } else {
              return ANNetwork.get(NMS.Lobby("joinToRoom", "dev"), function(roomData) {
                $gameTemp._isDevNetGameStart = true;
                return ANNetwork.setRoomJoin(roomData);
              }, function() {
                return console.log("Can't join to Room, server not response in time");
              });
            }
          }, function() {
            return console.log("Can't create Room, server not response in time");
          });
        } else {
          return HUIManager.notifyError("Server not response in time");
        }
      });
    };
    _.nFastGameStart = function() {
      if (ANNetwork.isMasterClient()) {
        $gameTemp._isDevNetGameStart = true;
        return ANNetwork.send(NMS.Lobby("startGame"));
      }
    };
  })();
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {}; // * NOTHING
  _.commandNetwork = function() {
    this._commandWindow.close();
    return SceneManager.push(Scene_NetworkGameMenu);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeScene, _;
  //@[DEFINES]
  _ = SceneManager;
  //@[ALIAS]
  ALIAS__changeScene = _.changeScene;
  _.changeScene = function() {
    if (ANNetwork.isConnected() && this.isSceneChanging()) {
      if (typeof HUIManager !== "undefined" && HUIManager !== null) {
        HUIManager.onGameSceneChanged();
      }
    }
    ALIAS__changeScene.call(this);
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SceneManager;
  //? ONLY FOR MV
  _.isSceneReadyForNetwork = function() {
    return true;
  };
  // * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
  _.isBusyForNetworkData = function() {
    return SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork();
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Элементы интерфейса ANET Z на карте

// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init();
      return;
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
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {}

    onGameMessageStart() {}

    onGameMessageEnd() {}

  };
  ANET.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    ANET.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    return this._create();
  };
  _._create = function() {
    this._createNormalUILayer();
    return this._createElements();
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    if (ANET.PP.isGameChatAllowed()) {
      return this._createInGameChat();
    }
  };
  // * Создаём окно чата
  _._createInGameChat = function() {
    //TODO: from parameters
    this.chatWindow = new FWindow_InGameChat(this, 312, 192);
    this._addElementToUI(this.chatWindow);
  };
  // * Добавить элемент на обычный слой
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__retreat, _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  //TEMP
  //TODO: Временное врешение, работает только на мастере
  //@[ALIAS]
  ALIAS__retreat = _.retreat;
  _.retreat = function() {
    if (ANNetwork.isConnected()) {
      if ($gameParty.leader() === this._battler) {
        return this.startMove(300, 0, 30);
      } else {

      }
    } else {
      // * Другой персонаж не убегает
      return ALIAS__retreat.call(this);
    }
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this);
    return this._updateNetworkCharacter();
  };
  
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(character) {
    ALIAS__setCharacter.call(this, character);
    this._isNetworkCharacter = ANNetwork.isConnected() && character instanceof NETCharacter;
    // * Смена методов
    if (this._isNetworkCharacter === true) {
      this._updateNetworkCharacter = this._updateNetworkCharacterMain;
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
  //?DYNAMIC
  _._updateNetworkCharacter = function() {}; // * DUMMY
  _._updateNetworkCharacterMain = function() {
    return this._updateNetworkStateIcon();
  };
  _._updateNetworkStateIcon = function() {
    if (this.netStateIcon == null) {
      this._createNetworkStateIcon();
    } else {
      this.netStateIcon.x = this.x;
      this.netStateIcon.y = this.y - this.height;
    }
  };
  _._createNetworkStateIcon = function() {
    var e, ref;
    this.netStateIcon = new ANET.Sprite_PlayerNetworkStatus(this);
    this.netStateIcon.setupNETCharacter(this._character);
    try {
      // * Не лучший способ
      if ((ref = SceneManager._scene._spriteset) != null) {
        ref.addNetworkStatusIconForCharacter(this.netStateIcon);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Gauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__smoothness, _;
  //TTT

  //@[DEFINES]
  _ = Sprite_Gauge.prototype;
  //@[ALIAS]
  ALIAS__smoothness = _.smoothness;
  _.smoothness = function() {
    // * Делаем более плавное заполнение для сетевой битвы, чтобы не было видно "рывков"
    // * Рывки есть так как с сервера данные обновляются примерно раз в секунду в бою
    if (ANNetwork.isConnected()) {
      if (this._statusType === "time" && $gameParty.inBattle()) {
        return 60;
      }
    }
    return ALIAS__smoothness.call(this);
  };
})();

// ■ END Sprite_Gauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сообщение в чате
(function() {
  var Sprite_NetChatTextLine;
  Sprite_NetChatTextLine = class Sprite_NetChatTextLine extends KDCore.Sprite {
    constructor() {
      super();
      this.params = this.getSettings();
      this._needAnimation = false;
      this._create();
      return;
    }

    //TODO: From plugin parameters!!!
    getSettings() {
      return this.defaultSettings();
    }

    defaultSettings() {
      return {
        size: {
          w: 306,
          h: 18
        },
        backgroundA: {
          color: "#59a3d9".toCss(),
          opacity: 40
        },
        backgroundB: {
          color: "#59a3d9".toCss(),
          opacity: 70
        },
        textLine: {
          visible: true,
          size: {
            w: 520,
            h: 20
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 4,
            y: -3
          }
        },
        // 1 - Channel
        // 2 - Actor Name
        // 4 - Player Name
        // 3 - Message
        textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3",
        textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3",
        textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3",
        animationSpeedInPx: 18
      };
    }

    // * Применить стиль задника А (по умолчанию)
    applyBackgroundStyleA() {
      return this._applyBackgroundStyle(this.params.backgroundA);
    }

    // * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
    applyBackgroundStyleB() {
      return this._applyBackgroundStyle(this.params.backgroundB);
    }

    // * Написать сообщение
    drawChatMessage(channelId, actorId, text) {
      var actorName, channelIdText, playerName, textFormat;
      if (this._textSpr == null) {
        return;
      }
      if (this.isMyActorMessage(actorId)) {
        textFormat = this.params.textFormatForPlayer;
      } else {
        if (actorId <= 0) {
          textFormat = this.params.textFormatForSystem;
        } else {
          textFormat = this.params.textFormat;
        }
      }
      channelIdText = this._convertChannelIdToText(channelId); //1
      actorName = this._getActorName(actorId); //2
      playerName = this._getPlayerName(actorId); //4
      this._textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName);
    }

    // * Сообщение от меня (текущего клиента), имеет отдельный формат
    isMyActorMessage(actorId) {
      if (ANNetwork.isConnected()) {
        return ANGameManager.myActorId() === actorId;
      } else {
        return false;
      }
    }

    // * Сдвинуть эту строчку выше
    moveUp() {
      this.y -= this.params.size.h;
    }

    // * Анимированное появление сообщения (справа "едет")
    animate() {
      this._textSpr.x = -this.params.textLine.size.w;
      this._needAnimation = true;
    }

    update() {
      super.update();
      this._updateAnimation();
    }

  };
  ANET.link(Sprite_NetChatTextLine);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Sprite_NetChatTextLine.prototype;
  _._applyBackgroundStyle = function(params) {
    if (this._background == null) {
      return;
    }
    this._background.fillAll(params.color);
    this._background.opacity = params.opacity;
  };
  _._create = function() {
    this._createBackground();
    this._createTextLine();
  };
  _._createBackground = function() {
    this._background = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
    this.applyBackgroundStyleA();
    return this.add(this._background);
  };
  _._createTextLine = function() {
    this._textSpr = new AA.Sprite_UITextExt(this.params.textLine);
    return this.add(this._textSpr);
  };
  _._updateAnimation = function() {
    if (this._needAnimation === false) {
      return;
    }
    if (this.params.animationSpeedInPx === 0) {
      this._textSpr.x = 0; // * Сразу, без анимации
    } else {
      this._textSpr.x += this.params.animationSpeedInPx;
    }
    if (this._textSpr.x > 0) { // * Граница
      this._textSpr.x = 0;
    }
    this._needAnimation = this._textSpr.x !== 0;
  };
  _._convertChannelIdToText = function(channelId) {
    if (channelId <= 0) {
      return "ALL";
    }
    return "MAP";
  };
  _._getActorName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    return (ref = $dataActors[actorId]) != null ? ref.name : void 0;
  };
  _._getPlayerName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    if (ANNetwork.isConnected()) {
      return (ref = ANGameManager.getPlayerDataByActorId(actorId)) != null ? ref.name : void 0;
    } else {
      return this._getActorName(actorId);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_PlayerNetworkStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_PlayerNetworkStatus;
  Sprite_PlayerNetworkStatus = class Sprite_PlayerNetworkStatus extends Sprite_Balloon {
    constructor() {
      super();
      this.visible = false;
      return;
    }

    setupNETCharacter(_character) {
      this._character = _character;
      return this._checkStateThread = new KDCore.TimedUpdate(10, this._updateStateCheck.bind(this));
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadAA("PlayerStateIcons");
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      if (iconId == null) {
        if (this.visible === true) {
          this.reset();
        }
      } else {
        if (this._balloonId === iconId) {
          return;
        }
        this._balloonId = iconId;
        this.visible = true;
        this.restart();
      }
    }

    restart() {
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    reset() {
      this._duration = 0;
      this._balloonId = -1;
      return this.visible = false;
    }

    // * Не используется, так как прикрепляется к персонажу
    updatePosition() {} // * EMPTY

    update() {
      super.update();
      this._checkStateThread.update();
      // * Начинается снова
      if (this._balloonId >= 0 && this._duration <= 0) {
        this._firstStep = true;
        return this.restart();
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

    // * PRIVATE =====================================================
    _updateStateCheck() {
      if (this._character == null) {
        return;
      }
      this.setup(this._character.networkStateIcon);
    }

  };
  ANET.link(Sprite_PlayerNetworkStatus);
})();

// ■ END Sprite_PlayerNetworkStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  // * Началась битва
  // * Проверим и спрячем "dead" врагов (если мы присоединились)
  _.nRefreshNetBattle = function() {
    var e, i, len, ref, ref1, s;
    try {
      // * Если мы мастер, то не надо, значит мы НЕ присоединились
      if (ANBattleManager.isBattleMaster()) {
        return;
      }
      ref = this._enemySprites;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s == null) {
          continue;
        }
        if (!((ref1 = s._enemy) != null ? ref1.isAlive() : void 0)) {
          s.hide();
        }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    if (ANNetwork.isConnected()) {
      this._createNetworkCharacters();
      this._createNetworkCharactersInfo();
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
  _._createNetworkCharacters = function() {
    // * Отдельный массив для удобства
    this._networkCharacterSprites = [];
    this.refreshNetworkCharacters();
  };
  _.refreshNetworkCharacters = function() {
    var char, i, j, len, len1, ref, ref1, spr;
    ref = this._networkCharacterSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      this._removeNetCharInfo(char);
      this._characterSprites.delete(char);
      this._tilemap.removeChild(char);
    }
    this._networkCharacterSprites = [];
    ref1 = $gameMap.netChars();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      char = ref1[j];
      spr = new Sprite_Character(char);
      this._characterSprites.push(spr);
      this._networkCharacterSprites.push(spr);
      this._tilemap.addChild(spr);
    }
  };
  
  // * Специальный слой для иконок статусов и имён сетевых персонажей
  _._createNetworkCharactersInfo = function() {
    this._networkCharactersInfoSprites = [];
    this._networkCharactersInfoLayer = new Sprite();
    this._networkCharactersInfoLayer.z = 9;
    this._tilemap.addChild(this._networkCharactersInfoLayer);
  };
  // * Добавить иконку статуса для персонажа
  _.addNetworkStatusIconForCharacter = function(iconSpr) {
    this._destroyNetStatusIconDuplicate(iconSpr);
    this._networkCharactersInfoSprites.push(iconSpr);
    this._networkCharactersInfoLayer.addChild(iconSpr);
  };
  
  // * Надо найти и удалить, если икона уже существует для персонажа
  // * при refreshNetworkCharacters, их иконки не удаляются с ними
  // * так как находятся на другом слое
  _._destroyNetStatusIconDuplicate = function(iconSpr) {
    var i, len, ref, spr;
    if (iconSpr == null) {
      return;
    }
    ref = this._networkCharactersInfoSprites;
    //TODO: Возможно после создания таблиц имён надо разлелить метод
    // так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
    for (i = 0, len = ref.length; i < len; i++) {
      spr = ref[i];
      if (spr == null) {
        continue;
      }
      if (spr._character === iconSpr._character) {
        this._networkCharactersInfoLayer.removeChild(spr);
        this._networkCharactersInfoSprites.delete(spr);
      }
    }
  };
  // * Удаляет все связанные с персонажем спрайты информации (статус, имя)
  _._removeNetCharInfo = function(char) {
    if (char == null) {
      return;
    }
    return this._destroyNetStatusIconDuplicate(char.netStateIcon);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addText, ALIAS__clear, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (this.isNeedSendLogToServer()) {
      return ANBattleManager.sendWindowLogMessage("clear", null);
    }
  };
  //@[ALIAS]
  ALIAS__addText = _.addText;
  _.addText = function(text) {
    ALIAS__addText.call(this, text);
    if (this.isNeedSendLogToServer()) {
      ANBattleManager.sendWindowLogMessage("add", text);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  _.isNeedSendLogToServer = function() {
    return ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler();
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCancelEnabled, ALIAS__isCursorMovable, ALIAS__isOkEnabled, ALIAS__processCancel, ALIAS__processOk, ALIAS__select, ALIAS__start, ALIAS__update, _;
  //TODO: ПРОВЕРИТЬ НА MV

  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__isCursorMovable = _.isCursorMovable;
  _.isCursorMovable = function() {
    if (this.nIsNetworkSelection()) {
      return ANInterpreterManager.isSharedEventMaster();
    } else {
      return ALIAS__isCursorMovable.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isOkEnabled = _.isOkEnabled;
  _.isOkEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isOkEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__isCancelEnabled = _.isCancelEnabled;
  _.isCancelEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isCancelEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.nIsNetworkSelection()) {
      this.nUpdateNetworkSelection();
    }
  };
  // * Можно это тоже, но не обязательно, и так выбор не может сделать второй игрок
  //@[ALIAS]
  //ALIAS__processHandling = _.processHandling
  //_.processHandling = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processHandling.call(@)

  //@[ALIAS]
  //ALIAS__processTouch = _.processTouch
  //_.processTouch = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processTouch.call(@)

  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (this.nIsNetworkSelection()) {
      // * Если мастер, то выбор проходит и отправляем всем выбор
      if (ANInterpreterManager.isSharedEventMaster()) {
        ALIAS__select.call(this, index);
        return this.nSendNetworkSelection(index);
      } else {
        // * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
        if (this.nIsSelectFromNetworkMaster === true) {
          this.nIsSelectFromNetworkMaster = false;
          return ALIAS__select.call(this, index);
        } else {

        }
      }
    } else {
      // * NOTHING
      // * Клиент сам не может менять выбор
      return ALIAS__select.call(this, index);
    }
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      this.nSetNetworkSelectMode(false);
    }
  };
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    if (ANNetwork.isConnected()) {
      this.nPrepareNetworkSelection();
    }
    ALIAS__start.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processOk = _.processOk;
  _.processOk = function() {
    ALIAS__processOk.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('ok');
    }
  };
  //@[ALIAS]
  ALIAS__processCancel = _.processCancel;
  _.processCancel = function() {
    ALIAS__processCancel.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('cancel');
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  (function() {    // * Выбор (только одного игрока) в общем событии
    // -----------------------------------------------------------------------
    // * Подготовка окна к выбору по сети
    _.nPrepareNetworkSelection = function() {
      // * Обнуляем действие из сети
      $gameTemp.nSelectionActionFromNetwork = null;
      this.nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster);
      // * Сбрасываем флаг (чтобы не повторился на следующем выборе)
      $gameTemp.nRequireChoiceOnlyForMaster = false;
      // * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
      // * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
      this.nIsSelectFromNetworkMaster = true;
      // * Очищаем последний отправленный индекс
      this.__nLastSentIndex = null;
    };
    _.nSetNetworkSelectMode = function(_networkSelectMode) {
      this._networkSelectMode = _networkSelectMode;
    };
    _.nIsNetworkSelection = function() {
      return this._networkSelectMode === true && ANNetwork.isConnected();
    };
    // * Отправить на сервер индекс выбора
    _.nSendNetworkSelection = function(index) {
      // * Чтобы не спамить
      if (this.__nLastSentIndex === index) {
        return;
      }
      this.__nLastSentIndex = index;
      ANInterpreterManager.sendChoiceSelection(index, null);
    };
    // * Отправить на сервер действие (ОК, отмена)
    _.nSendNetworkSelectionAciton = function(action) {
      ANInterpreterManager.sendChoiceSelection(this.index(), action);
    };
    // * Ожидание действие от сервера (не мастер)
    return _.nUpdateNetworkSelection = function() {
      var action, index;
      if ($gameTemp.nSelectionActionFromNetwork == null) {
        return;
      }
      if (ANInterpreterManager.isSharedEventMaster()) {
        return;
      }
      ({action, index} = $gameTemp.nSelectionActionFromNetwork);
      this.nIsSelectFromNetworkMaster = true;
      if (index != null) {
        // * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
        this.select(index);
      }
      switch (action) {
        case 'ok':
          this.processOk();
          break;
        case 'cancel':
          this.processCancel(); // select
          break;
      }
      // * Ничего, выбор всегда идёт
      // * Флаг обработан, очищаем
      $gameTemp.nSelectionActionFromNetwork = null;
    };
  })();
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isFormationEnabled, ALIAS__isSaveEnabled, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  // * Команда Formation запрещена в сетевой игре всегда
  //@[ALIAS]
  ALIAS__isFormationEnabled = _.isFormationEnabled;
  _.isFormationEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isFormationEnabled.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__isSaveEnabled = _.isSaveEnabled;
  _.isSaveEnabled = function() {
    if (ANNetwork.isConnected()) {
      // * Если параметр включён
      return ANET.PP.isSaveLoadAllowed();
    } else {
      return ALIAS__isSaveEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCurrentItemEnabled, _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(rect) {
    ALIAS__initialize.call(this, rect);
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isOtherPlayersVisibleInMenu() === false) {
        this.setOnlyMyPlayerInMenuMode();
      }
    }
  };
  //@[ALIAS]
  ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled;
  _.isCurrentItemEnabled = function() {
    if (ANNetwork.isConnected()) {
      return this.isCurrentItemEnabledInNetworkGame();
    } else {
      return ALIAS__isCurrentItemEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  (function() {    // * Команды Skill, Statis, Equip
    // -----------------------------------------------------------------------
    _.isCurrentItemEnabledInNetworkGame = function() {
      if (this.isSymbolOnlyForMyNetActor()) {
        return this.isCurrentActorIsMyNetActor();
      } else {
        return true;
      }
    };
    // * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = function() {
      var e, isOnlyForMyActor, symbol;
      try {
        // * Плохой вариант получения команды, но работает
        symbol = SceneManager._scene._commandWindow.currentSymbol();
        // * Навыки и экипировка - только для моего персонажа
        isOnlyForMyActor = symbol === 'skill' || symbol === 'equip';
        if (ANET.PP.isOtherPlayersMenuStatusAllowed() === false) {
          isOnlyForMyActor = isOnlyForMyActor || (symbol === 'status');
        }
        return isOnlyForMyActor;
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
    
    // * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    return _.isCurrentActorIsMyNetActor = function() {
      var actor, e;
      try {
        actor = $gameParty.members()[this.index()];
        return actor.isMyNetworkActor();
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
  })();
  (function() {    // * Cписок игроков
    // -----------------------------------------------------------------------
    
    // * Будет видно только моего персонажа
    return _.setOnlyMyPlayerInMenuMode = function() {
      this.maxItems = function() {
        return 1;
      };
      this.actor = function(index) {
        return $gameParty.leader();
      };
      return this.selectLast = function() {
        return this.smoothSelect(0);
      };
    };
  })();
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

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
    return ANET.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return ANET.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkActorsList;

Window_NetworkActorsList = class Window_NetworkActorsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this.select(0);
  }

  maxItems() {
    return this.actorsForNetwork().length;
  }

  maxCols() {
    return 2;
  }

  actorsForNetwork() {
    return ANET.PP.actorsForNetwork();
  }

  isCurrentItemEnabled() {
    var e;
    try {
      return this.isEnable(this.index());
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  }

  selectedActorId() {
    if (!this.isCurrentItemEnabled()) {
      return 0;
    }
    return this.getActorData(this.index()).id;
  }

  isEnable(index) {
    var actorId;
    actorId = this.getActorData(index).id;
    return !ANGameManager.playersData.some(function(pl) {
      return pl.actorId === actorId;
    });
  }

  drawItem(index) {
    var actorData, faceBitmap, rect;
    actorData = this.getActorData(index);
    if (actorData == null) {
      return;
    }
    rect = this.itemRect(index);
    faceBitmap = ImageManager.loadFace(actorData.faceName);
    faceBitmap.addLoadListener(() => {
      return this._drawActor(rect, actorData, index);
    });
  }

  itemHeight() {
    return 110;
  }

  getActorData(index) {
    return $dataActors[this.actorsForNetwork()[index]];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkActorsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkActorsList.prototype;
  _._drawActor = function(rect, a, index) {
    this.changePaintOpacity(this.isEnable(index));
    this._drawActorInfo(rect, a);
    this._drawActorClass(rect, a);
    if (!this.isEnable(index)) {
      this._drawNetworkStatus(rect);
    }
    this.changePaintOpacity(1);
  };
  _._drawActorInfo = function(rect, a) {
    this.drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, this.itemHeight() - 8);
    return this.drawText(a.name, rect.x + 120, rect.y + 4, 168);
  };
  _._drawActorClass = function(rect, a) {
    var aClass, className, e;
    try {
      aClass = $dataClasses[a.classId];
      if (aClass != null) {
        className = aClass.name;
      } else {
        className = "";
      }
      if (KDCore.isMV()) {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(ColorManager.crisisColor());
      }
      this.contents.fontSize -= 8;
      this.drawText(className, rect.x + 132, rect.y + 44, 168);
      this.contents.fontSize += 8;
      this.resetTextColor();
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  _._drawNetworkStatus = function(rect) {
    if (KDCore.isMV()) {
      this.changeTextColor(this.deathColor());
    } else {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize -= 8;
    this.drawText('Picked', rect.x + 270, rect.y + 4);
    this.contents.fontSize += 8;
    this.resetTextColor();
  };
})();

// ■ END Window_NetworkActorsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkGameMenu;

Window_NetworkGameMenu = class Window_NetworkGameMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("Create Room", "createRoom");
    this.addCommand("Join Room", "joinRoom");
    this.addCommand("Join Random Room", "joinRandRoom");
    this.addCommand("Settings", "settings");
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkGameMenu.prototype;
})();

// ■ END Window_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkRoomCommands;

Window_NetworkRoomCommands = class Window_NetworkRoomCommands extends Window_HorzCommand {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  maxCols() {
    return 3;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  isCanSelectActors() {
    return ANET.PP.isActorSelectionAllowed() && !this.isLoadGame();
  }

  makeCommandList() {
    var leaveCommandName;
    if (ANNetwork.isMasterClient()) {
      this.addCommand('Start', 'start', this._isStartEnabled()); //TODO: Третий аргумент : enabled
    } else {
      //TODO: Надо проверять все ли готовы, только тогда кнопка активна
      //TODO: Ещё можно проверять больше 1 игрока или нет
      this.addCommand('Ready', 'ready', false);
    }
    //TODO: Пока отключим, нет функционала
    if (this.isCanSelectActors()) {
      this.addCommand("Character", 'character', this._isCharSelectEnabled());
    }
    leaveCommandName = ANNetwork.isMasterClient() ? "Close" : "Leave";
    this.addCommand(leaveCommandName, 'leave');
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomCommands.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomCommands.prototype;
  _._myActorId = function() {
    return ANGameManager.myPlayerData().actorId;
  };
  _._isAllPlayersSelectActors = function() {
    return ANGameManager.playersData.every(function(pl) {
      return pl.actorId !== 0;
    });
  };
  _._isStartEnabled = function() {
    if (!ANET.PP.isSingleActorNetworkGameAllowed()) {
      if (ANGameManager.playersData.length === 1) {
        return false;
      }
    }
    // * Надо выбрать персонажа, потом можно начинать игру
    if (this.isCanSelectActors() || this.isLoadGame()) {
      //TODO: Разрешить загружаться меньшему количеству игроков??? Опция или НЕТ?
      // * Сейчас может загрузить игру два игрока, если играло 3 или более например
      return this._isAllPlayersSelectActors();
    } else {
      return true;
    }
  };
  _._isCharSelectEnabled = function() {
    return this._myActorId() <= 0;
  };
})();

// ■ END Window_NetworkRoomCommands.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Список игроков в комнате
//TODO: Пока нельзя выделять игрока и что-то с ним делать
//TODO: Возможно добавить возможность кикнуть игрока
var Window_NetworkRoomPlayersList;

Window_NetworkRoomPlayersList = class Window_NetworkRoomPlayersList extends Window_Selectable {
  constructor(rect) {
    super(rect);
  }

  //@setBackgroundType ANET.VD.getWindowBackgroundType()
  maxItems() {
    return ANGameManager.playersData.length;
  }

  drawItem(index) {
    var playerData, rect;
    playerData = this.playerData(index);
    if (playerData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawPlayerInfo(rect, playerData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return true;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  playerData(index) {
    return ANGameManager.playersData[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomPlayersList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomPlayersList.prototype;
  _._drawPlayerInfo = function(rect, playerData) {
    var text;
    text = playerData.name;
    if (playerData.id === ANNetwork.room.masterId) {
      text = "\\C[1]" + text;
    } else if (playerData.id === ANNetwork.myId()) {
      text = "\\C[3]" + text;
    }
    if (ANET.PP.isActorSelectionAllowed() || this.isLoadGame()) {
      text += this._getActorName(playerData);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width, 'left');
  };
  _._getActorName = function(playerData) {
    var actorName;
    actorName = "...";
    if (playerData.actorId > 0) {
      actorName = $dataActors[playerData.actorId].name;
    }
    return "\\C[0] [%1]".format(actorName);
  };
})();

// ■ END Window_NetworkRoomPlayersList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Отключить комнаты других игр (параметр или от сервера зависит)
var Window_NetworkRoomsList;

Window_NetworkRoomsList = class Window_NetworkRoomsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this._createNoRoomsMessage();
    this.refreshRooms([]);
    return;
  }

  maxItems() {
    if (this.isHaveAnyRoom()) {
      return this.roomsList.length;
    } else {
      return 0;
    }
  }

  drawItem(index) {
    var rect, roomData;
    roomData = this.roomData(index);
    if (roomData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawRoomInfo(rect, roomData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return NetRoomDataWrapper.isRoomProperToJoin(this.roomData(index));
  }

  isCurrentRoomEnabled() {
    return this.isEnabled(this.index());
  }

  getSelectedRoom() {
    return this.roomData(this.index());
  }

  refreshRooms(roomsList) {
    this.roomsList = roomsList;
    //TODO: @_noRoomsTextSpr мелькает
    this._noRoomsTextSpr.visible = !this.isHaveAnyRoom();
    if (this._noRoomsTextSpr.visible === true) {
      this.select(-1);
    }
    this.refresh();
  }

  isHaveAnyRoom() {
    if (this.roomsList != null) {
      return this.roomsList.length > 0;
    } else {
      return false;
    }
  }

  roomData(index) {
    return this.roomsList[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomsList.prototype;
  _._createNoRoomsMessage = function() {
    var params;
    params = AA.Sprite_UIText.prototype.defaultParams();
    params.size.w = this.width;
    params.size.h = this.height;
    params.font.size = 32;
    params.outline.width = 3;
    this._noRoomsTextSpr = new AA.Sprite_UIText(params);
    this._noRoomsTextSpr.visible = false;
    this._noRoomsTextSpr.drawText("There are no rooms on server");
    return this.addChild(this._noRoomsTextSpr);
  };
  _._drawRoomInfo = function(rect, roomData) {
    var loadGame, roomText, rpgVersion, state;
    rpgVersion = roomData.rpgVersion === 0 ? 'MZ' : 'MV';
    state = roomData.inGame === true ? 'In Game' : 'In Lobby';
    loadGame = NetRoomDataWrapper.isLoadGameRoom(roomData) ? '[from Savefile]' : '';
    // * [VER](GAME NAME) RoomName 0\X (inGame|inLobby)
    roomText = "\\}\\C[1][%1]\\C[3](%2)\\{\\C[0]   %3   \\C[4]%4/%5 \\}\\C[5](%6) \\C[6]%7".format(rpgVersion, roomData.gameTitle, roomData.name, roomData.playersIds.length, roomData.maxPlayers, state, loadGame);
    this.drawTextEx(roomText, rect.x, rect.y, rect.width, 'left');
  };
})();

// ■ END Window_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkRoomTypeMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkRoomTypeMenu;

Window_NetworkRoomTypeMenu = class Window_NetworkRoomTypeMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("New Game", "newGame");
    this.addCommand("Load Game", "continue", this.isHaveSavedGames());
  }

  isHaveSavedGames() {
    return true; //TODO: првоерка наличия сетевых сохранений
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomTypeMenu.prototype;
})();

// ■ END Window_NetworkRoomTypeMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawTitle, ALIAS__isEnabled, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(savefileId) {
    // * Нельзя загружать сетевые сохранения из обычного меню загрузки
    if (this._mode === 'load' && DataManager.nIsNetworkSaveFile(savefileId)) {
      return false;
    } else if (this._mode === 'loadNet') {
      return DataManager.nIsNetworkSaveFile(savefileId);
    } else {
      return ALIAS__isEnabled.call(this, savefileId);
    }
  };
  
  //TODO: Добавить кастомизацию или опцию на отключение
  //@[ALIAS]
  ALIAS__drawTitle = _.drawTitle;
  _.drawTitle = function(savefileId, x, y) {
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      return this.drawText(TextManager.file + " " + savefileId + " [Network game]", x, y, 240);
    } else {
      return ALIAS__drawTitle.call(this, savefileId, x, y);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeCommandList, _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  //@[ALIAS]
  ALIAS__makeCommandList = _.makeCommandList;
  _.makeCommandList = function() {
    ALIAS__makeCommandList.call(this);
    this.addCommand('Network', "network");
    this._nRearangeNetworkCommand();
    if (!ANET.PP.isSinglePlayerAllowed()) {
      this._nRemoveNewGameCommand();
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  // * Чтобы не была последнией, меняю местами с командой options
  _._nRearangeNetworkCommand = function() {
    var e, netCmd, netCommandIndex, optionsCmd, optionsCommandIndex;
    try {
      optionsCommandIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "options";
      }));
      if (optionsCommandIndex < 0) {
        return;
      }
      netCommandIndex = this._list.length - 1;
      optionsCmd = this._list[optionsCommandIndex];
      netCmd = this._list[netCommandIndex];
      this._list[optionsCommandIndex] = netCmd;
      return this._list[netCommandIndex] = optionsCmd;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._nRemoveNewGameCommand = function() {
    var e, newGameIndex;
    try {
      newGameIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "newGame";
      }));
      return this._list.splice(newGameIndex, 1);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkRoomsList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _.applyFilterToRooms = function() {
    if (this.roomsList == null) {
      return;
    }
    // * Применяем фильтр по gameId
    this.roomsList = this.roomsList.filter(function(room) {
      return room.gameId === ANET.VD.getGameVersion();
    });
  };
})();

// ■ END Scene_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

//Plugin Alpha_NETZ automatic build by PKD PluginBuilder 1.9.2 13.10.2021
