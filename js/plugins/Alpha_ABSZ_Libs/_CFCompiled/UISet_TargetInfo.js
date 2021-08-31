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