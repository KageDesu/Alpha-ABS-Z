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