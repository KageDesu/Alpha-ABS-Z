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
