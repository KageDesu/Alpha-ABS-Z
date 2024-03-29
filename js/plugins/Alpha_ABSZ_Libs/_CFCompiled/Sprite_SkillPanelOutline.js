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
