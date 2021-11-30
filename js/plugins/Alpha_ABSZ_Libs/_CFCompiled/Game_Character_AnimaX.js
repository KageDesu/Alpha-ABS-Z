// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[EXTENSION]
AA.extend(function() {
  var ALIAS__createNewAnimaXForCharacter, _;
  // * Методы ниже даже не учитываются, если плагин не подключён
  if (Imported.PKD_AnimaX !== true) {
    return;
  }
  //@[DEFINES]
  _ = Game_Character.prototype;
  // * Логика состояний анимации (бой, смерть) (всегда работает)
  _.aaUpdateABSAnimaX = function() {
    if (!this.isAnimX()) {
      return;
    }
    return this.aaUpdateABSAnimaXInBattleState();
  };
  _.aaUpdateABSAnimaXInBattleState = function() {
    if (this._aaIsInBattleAnimaXState()) {
      if (this._axState !== 'inBattle') {
        this._aaOnGoInBattleAnimaXState();
      }
    } else {
      if (this._axState !== 'base') {
        this._aaOnOutFromInBattleAnimaXState();
      }
    }
  };
  _._aaOnGoInBattleAnimaXState = function() {
    this.switchToXAnimaState('inBattle');
    // * Только персонаж игрока сам определяет состояние "В бою"
    // * NET Character не определяет, только получает от севрера
    // * Game_Event - у него по AAEntity, target через Observer синхронизируется
    if (AA.Network.isNetworkGame() && this === $gamePlayer) {
      return AANetworkManager.animaXChangeState('inBattle', this);
    }
  };
  _._aaOnOutFromInBattleAnimaXState = function() {
    this.resetXAnimaState();
    if (AA.Network.isNetworkGame() && this === $gamePlayer) {
      return AANetworkManager.animaXChangeState('base', this);
    }
  };
  // * Game_Event and Game_Player имеют разную реализацию
  _._aaIsInBattleAnimaXState = function() {
    return false;
  };
  // * Из-за ALIAS пришлось выносить в Extenstion, чтобы не было зависимости от положения AnimaX плагина
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
});

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
