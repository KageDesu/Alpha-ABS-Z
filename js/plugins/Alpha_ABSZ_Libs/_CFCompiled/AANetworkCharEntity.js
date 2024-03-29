// Generated by CoffeeScript 2.6.1
var AANetworkCharEntity;

AANetworkCharEntity = class AANetworkCharEntity extends AAEntity {
  constructor(netId) {
    super();
    this.netId = netId;
  }

  // * Номер команды игрока (и группы) всегда 0
  teamId() {
    return 0;
  }

  isNetChar() {
    return true;
  }

  // * Пока союзник
  //TODO: Динамически, когда PvP
  isAlly() {
    return true;
  }

  character() {
    return $gameMap.networkCharacterById(this.netId);
  }

  battler() {
    var ref;
    return (ref = this.character()) != null ? ref.actor() : void 0;
  }

};
