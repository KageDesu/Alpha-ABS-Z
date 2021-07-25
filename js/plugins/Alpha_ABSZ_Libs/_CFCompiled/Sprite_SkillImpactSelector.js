// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_SkillImpactSelector;
  Sprite_SkillImpactSelector = class Sprite_SkillImpactSelector extends KDCore.Sprite {
    constructor() {
      super();
      this.anchor.set(0.5);
      this.visible = false;
      return;
    }

    activate(aaSkill) {
      this.aaSkill = aaSkill;
      this.visible = true;
      return this._applyStyle(this.aaSkill);
    }

    deactivate() {
      this.aaSkill = null;
      this.visible = false;
    }

    update() {
      super.update();
      if (!this.visible) {
        return;
      }
      return this.move(TouchInput);
    }

  };
  AA.link(Sprite_SkillImpactSelector);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SkillImpactSelector.prototype;
  // * Отрисовка зонвы выбора в зависимости от параметров навыка
  _._applyStyle = function({radius, selectorColor, selectorImg, selectorOpacity}) {
    this._applyRadius(radius);
    this._applyColor(selectorColor);
    this._applyImage(selectorImg);
    this.opacity = selectorOpacity;
  };
  _._applyRadius = function(radius) {
    if (radius <= 0) {
      this.bitmap = new Bitmap(0, 0);
    } else {
      this.bitmap = new Bitmap(radius * $gameMap.tileWidth(), radius * $gameMap.tileHeight());
    }
  };
  _._applyColor = function(color) {
    return this.bitmap.fillAll(color.toCss());
  };
  return _._applyImage = function(image) {
    if (!String.any(image)) {
      return;
    }
    this.bitmap = ImageManager.loadPicture(image);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
