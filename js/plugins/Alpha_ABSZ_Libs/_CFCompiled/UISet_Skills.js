// Generated by CoffeeScript 2.6.1
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
