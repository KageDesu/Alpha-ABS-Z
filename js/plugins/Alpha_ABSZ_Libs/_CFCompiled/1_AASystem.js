// Generated by CoffeeScript 2.6.1
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
      this.loadExtensions();
    };
    _.loadParameters = function() {
      AA.PP = new AA.ParamsManager();
      AA.Input.init(AA.PP.getParam('inputSettings'));
    };
    // * Загрузка доп. методов совместимости с другими плагинами
    _.loadExtensions = function() {
      var e;
      try {
        AA.loadExtensions();
        return AA.Network.loadExtensions();
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.loadFonts = function() {
      var font, i, len, ref;
      ref = ["AABS_0", "AABS_1", "AABS_2", "AABS_3"];
      // * Загрузка стандартных шрифтов системы
      for (i = 0, len = ref.length; i < len; i++) {
        font = ref[i];
        KDCore.Utils.loadFont(font);
      }
      this.loadUserFonts();
    };
    // * Загрузка пользовательских шрифтов (из параметров плагина)
    _.loadUserFonts = function() {
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
        $gameSystem._isABS = true;
      }
      $gameMap.initABS();
      this.checkABSPlayerExists();
    };
    _.resumeABS = function() {
      // * Нельзя возобновить, если игрока нету
      if (!$gamePlayer.isABS()) {
        return;
      }
      $gameSystem._isABS = true;
    };
    _.pauseABS = function() {
      if (!this.isABSActive()) {
        return;
      }
      "PAUSE ABS SESSION ON MAP".p();
      $gameSystem._isABS = false;
      AA.EV.call("PauseABS");
    };
    _.isABSActive = function() {
      return $gameSystem._isABS === true && !$gameTemp._noABSPlayer;
    };
    _.update = function() {};
    _.checkABSPlayerExists = function() {
      // * Если нет персонажа, АБС не запускаем
      if ($gameParty.leader() == null) {
        this.onNoABSPlayer();
      } else {
        this.onNewABSPlayer();
      }
    };
    // * Когда в партии стало пусто (убрали всех, нет gameParty.leader())
    _.onNoABSPlayer = function() {
      $gameTemp._noABSPlayer = true;
      this.pauseABS();
      AA.EV.call("ABSPartyLeaderNone");
    };
    // * Когда появился хоть один член партии (gameParty.leader())
    _.onNewABSPlayer = function() {
      $gameTemp._noABSPlayer = false;
      this.resumeABS();
      AA.EV.call("ABSPartyLeaderReady");
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Управление переходами и состояниями
    // -----------------------------------------------------------------------
    // * Главное меню (или Scene_Boot)
    _.onGameDataLoaded = function() {
      // * Применяем динамические параметры
      AA.PP.applyParameters();
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
      $gameTemp.aaClearAllAILogicThreads();
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
