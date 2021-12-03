// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NETCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
AA.Network.SetupNETCharacter = function() {
  var ALIAS__initMembersAABSZNET, ALIAS__isABS, _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
  //TODO: Синхронизировать Active состояние?

  //@[ALIAS]
  ALIAS__initMembersAABSZNET = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembersAABSZNET.call(this, ...arguments);
    // * Чтобы ID определился (Character_Base вызывает initMembers без ID)
    AA.Utils.callDelayed(this._initMembersABS.bind(this), 100);
  };
  //@[ALIAS]
  ALIAS__isABS = _.isABS;
  _.isABS = function() {
    return ALIAS__isABS.call(this) && (this.playerData() != null) && (this.actor() != null);
  };
  //$[OVER]
  // * Сам ничего не обновляет, принимает команду от сервера (если надо)
  _.aaUpdateABSAnimaXInBattleState = function() {}; // * EMPTY
  
  // * =================================================================
  _._initMembersABS = function() {
    if (this.id == null) {
      return;
    }
    this.aaEntity = new AANetworkCharEntity(this.id);
    this.initABS();
  };
  
  // * Переопределяем
  //$[OVER]
  _.aaGetExtendedHitBoxes = function() {
    if (this.isABS()) {
      return this.actor().aaGetExtendedHitBoxes();
    } else {
      return null;
    }
  };
};

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------
