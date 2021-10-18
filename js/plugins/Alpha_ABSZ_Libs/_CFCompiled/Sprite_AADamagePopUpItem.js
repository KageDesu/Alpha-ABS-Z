// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_AADamagePopUpItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Sprite_AADamagePopUpItem;

Sprite_AADamagePopUpItem = class Sprite_AADamagePopUpItem extends KDCore.Sprite {
  constructor(settings1, value1) {
    super();
    this.settings = settings1;
    this.value = value1;
    this._init();
    this._createSprites();
    this._start();
  }

  dispose() {
    var ref;
    this.disposed = true;
    this.visible = false;
    this._removeDynamic();
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
  }

  update() {
    super.update();
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    this.thread.update();
    this._updateZoom();
    this._updateImageFadeIn();
  }

  // * Установить позицию и применить случайный сдвиг координат
  setStartPoint(x, y) {
    this.move(x, y);
    if (this.settings.randDX > 0) {
      this.x = this.x + Math.randomInt(this.settings.randDX) - Math.randomInt(this.settings.randDX * 2);
    }
    if (this.settings.randDY > 0) {
      this.y = this.y + Math.randomInt(this.settings.randDY);
    }
  }

  // * Привязан, надо удалять себя (aaRemoveDynamicSprite)
  setDynamic() {
    return this._isDynamic = true;
  }

  // * Общие методы создания Pop объекта
  // * Находяться прямо в классе, чтобы не создавать доп. менеджер

    // * Двигается вместе с персонажем (а не экраном)
  static CreateOnCharacterBinded(char, settings, value) {
    var charSprite, dy, e, popDynamicParentSpr, popItem, spriteset, x, y;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (char == null) {
        return;
      }
      if (settings == null) {
        return;
      }
      spriteset = $gameMap.spriteset();
      charSprite = spriteset.findTargetSprite(char);
      if (charSprite == null) {
        return;
      }
      ({x, y} = charSprite);
      // * Создаётся спрайт "оболочка", которая будет привязана к координатам персонажа
      popDynamicParentSpr = new Sprite();
      popDynamicParentSpr.anchor.set(0.5);
      popItem = new Sprite_AADamagePopUpItem(settings, value);
      dy = -(charSprite.patternHeight() - $gameMap.tileWidth() / 2);
      popItem.setStartPoint(0, dy);
      // * Устанавливаем флаг, чтобы при Dispose удалять себя
      popItem.setDynamic();
      popDynamicParentSpr.addChild(popItem);
      // * Регестрируем как динамический спрайт
      spriteset.aaRegisterDynamicSprite(popDynamicParentSpr, char, 0, dy);
      // * Добавляем на слой PopUp
      return spriteset.aaGetDamagePopUpLayer().addChild(popDynamicParentSpr);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnCharacter(char, settings, value) {
    var charSprite, e, spriteset, x, y;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (char == null) {
        return;
      }
      spriteset = $gameMap.spriteset();
      charSprite = spriteset.findTargetSprite(char);
      if (charSprite == null) {
        return;
      }
      ({x, y} = charSprite);
      y = y - charSprite.patternHeight() - $gameMap.tileWidth() / 2;
      return Sprite_AADamagePopUpItem.CreateOnScreen(x, y, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnMap(x, y, settings, value) {
    var e, screenX, screenY, tempChar;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      tempChar = new Game_Character();
      tempChar.setPosition(x, y);
      screenX = tempChar.screenX();
      screenY = tempChar.screenY() - $gameMap.tileWidth();
      return Sprite_AADamagePopUpItem.CreateOnScreen(screenX, screenY, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnScreen(x, y, settings, value) {
    var e, popItem, spriteset;
    try {
      if (settings == null) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      popItem = new Sprite_AADamagePopUpItem(settings, value);
      popItem.setStartPoint(x, y);
      spriteset = $gameMap.spriteset();
      return spriteset.aaGetDamagePopUpLayer().addChild(popItem);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_AADamagePopUpItem.prototype;
  _._init = function() {
    this.disposed = false;
    this.isNeedZoom = true;
    this.stayTime = 0;
    this.maxStayTime = this.settings.stayTime; // * 60
  };
  _._createSprites = function() {
    var e;
    if (this.settings == null) {
      return;
    }
    // * Используется для расчёта размера текста
    this.bitmap = new Bitmap(50, 50);
    this.anchor.set(0.5);
    try {
      this.bitmap.fontSize = Math.max(this.settings.text.font.size, this.settings.changeFontSize);
      this._createValueText();
      if ((this.settings.image != null) && String.any(this.settings.image.name)) {
        return this._createImage();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._createValueText = function() {
    var e, h, w;
    try {
      w = this.bitmap.measureTextWidth(this.value) + 4;
      h = this.settings.text.font.size + 10;
      // * Присваеваем новые значение (посчитанные)
      this.settings.text.size.w = w;
      this.settings.text.size.h = h;
      this.valueSprite = KDCore.Sprite.FromParams(this.settings.text);
      this.valueSprite.anchor.set(0.5);
      this.valueSprite.onReady(this._drawValue.bind(this));
      return this.add(this.valueSprite);
    } catch (error) {
      e = error;
      AA.w(e);
      return this.valueSprite = new Sprite();
    }
  };
  _._drawValue = function() {
    this.valueSprite.clear();
    return this.valueSprite.drawTextFull(this.value, this.settings.text.alignment);
  };
  _._createImage = function() {
    var e, settings;
    try {
      settings = this.settings.image;
      this.imageSprite = KDCore.Sprite.FromImg(settings.name);
      this.imageSprite.x = settings.margins.x || 0;
      this.imageSprite.y = settings.margins.y || 0;
      this.imageSprite.anchor.set(0.5);
      this.imageSprite.opacity = 0;
      return this.add(this.imageSprite);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._start = function() {
    this.thread = new KDCore.TimedUpdate(2, this._updateLife.bind(this));
  };
  _._updateLife = function() {
    // * Сперва идёт анимация увеличения, затемм только отсчёт таймера
    if (this.isNeedZoom === true) {
      return;
    }
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    if (this.maxStayTime <= 0) {
      this.dispose();
    } else {
      if (this.stayTime++ < this.maxStayTime) {
        return;
      }
    }
    this._updateOpacity();
    this._updateMoveUp();
    if (this.opacity <= 0) {
      this.dispose();
    }
  };
  _._updateOpacity = function() {
    var e;
    try {
      // * Если не надо, то сразу исчезает
      if (this.settings.noFadeOut === true) {
        this.opacity = 0;
      } else {
        this.opacity -= 25;
      }
    } catch (error) {
      e = error;
    }
  };
  _._updateMoveUp = function() {
    var e;
    if (this.settings.noFlyUp === true) {
      return;
    }
    try {
      this.move(this.x, this.y - 1);
    } catch (error) {
      e = error;
    }
  };
  _._updateZoom = function() {
    var b, e;
    if (!this.isNeedZoom) {
      return;
    }
    try {
      b = this.valueSprite.bitmap;
      if (b.fontSize === this.settings.changeFontSize) {
        this.isNeedZoom = false;
        return;
      }
      if (b.fontSize < this.settings.changeFontSize) {
        b.fontSize = b.fontSize + 1;
      } else if (b.fontSize > this.settings.changeFontSize) {
        b.fontSize = b.fontSize - 1;
      }
      this._drawValue();
    } catch (error) {
      e = error;
    }
  };
  _._updateImageFadeIn = function() {
    var e;
    try {
      if (this.imageSprite == null) {
        return;
      }
      if (this.imageSprite.opacity >= 255) {
        return;
      }
      this.imageSprite.opacity += this.settings.image.fadeInSpeed;
    } catch (error) {
      e = error;
    }
  };
  _._removeDynamic = function() {
    var e, spriteset;
    if (this._isDynamic !== true) {
      return;
    }
    try {
      spriteset = $gameMap.spriteset();
      spriteset.aaRemoveDynamicSprite(this);
      if (this.parent != null) {
        return spriteset.aaRemoveDynamicSprite(this.parent);
      }
    } catch (error) {
      e = error;
      return AA.warning(e);
    }
  };
})();

// ■ END Sprite_AADamagePopUpItem.coffee
//---------------------------------------------------------------------------
