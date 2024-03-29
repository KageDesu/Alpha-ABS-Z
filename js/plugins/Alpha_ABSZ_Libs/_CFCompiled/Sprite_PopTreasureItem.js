// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_PopTreasureItem;
  // * PopUp для предметов или текста, не используется для урона
  Sprite_PopTreasureItem = class Sprite_PopTreasureItem extends KDCore.Sprite {
    constructor(params) {
      super();
      this.params = params;
      this._isActive = true;
      // * Анимация запущена
      this._isStarted = false;
      this._init();
      return;
    }

    // * Стандартный набор настроек
    defaultParams() {
      return {
        text: {
          visible: true,
          size: {
            w: 80,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#EAEAEA".toCss()
        },
        icon: {
          visible: true,
          index: 0,
          size: 14
        },
        countSymbol: "x",
        countText: {
          visible: true,
          size: {
            w: 50,
            h: 20
          },
          alignment: "left",
          font: {
            face: "AABS_0",
            size: 11,
            italic: false
          },
          margins: {
            x: 0,
            y: 2
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#BDFDFD".toCss()
        }
      };
    }

    // * Аналог !isDisposed()
    isActive() {
      return this._isActive === true;
    }

    // * Можно ли удалять popUp
    isDisposed() {
      return !this.isActive();
    }

    isStarted() {
      return this._isStarted === true;
    }

    setItem(item, count) {
      if (item == null) {
        return;
      }
      return this.set(item.name, item.iconIndex, count);
    }

    //TODO: Золото, опыт ???

      // * Задаём данные (текст, иконку, количество)
    set(text1, iconIndex, count1) {
      this.text = text1;
      this.iconIndex = iconIndex;
      this.count = count1;
      if (!String.any(this.text)) {
        return;
      }
      if (!this.isActive()) {
        return;
      }
      this._createPopItemContent();
    }

    start(effectParams) {
      this.effectParams = effectParams;
      if (!this.isActive()) {
        return;
      }
      return this._startEffect();
    }

    //stayTime
    //opacityChangeStep
    //moveStep

      // * Завершить работу popUp
    stop() {
      this._isStarted = false;
      this._isActive = false;
      this._updateEffect = function() {};
    }

    update() {
      super.update();
      return this._updateEffect();
    }

  };
  AA.link(Sprite_PopTreasureItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_PopTreasureItem.prototype;
  // * Подготовка элемента (проверка параметров)
  _._init = function() {
    var e;
    try {
      if (this.params == null) {
        return this.params = this.defaultParams();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  _._createPopItemContent = function() {
    var e;
    try {
      this._createMainText();
      if (this.textSpr == null) {
        return;
      }
      if (Number.prototype.any(this.iconIndex)) {
        this._createIcon();
      }
      if (this.count != null) {
        this._createCountText();
      }
      this._applyCenter();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.isActive = function() {
        return false;
      };
    }
  };
  _._createMainText = function() {
    // * Нет try, catch, потому что без основного текста, PopUp не может существовать
    // * Ошибка перехватывается выше и делает isActive = false
    this.textSpr = new AA.Sprite_UIText(this.params.text);
    this.textSpr.draw(this.text);
    // * Размер текста (нужен для автоцентровки)
    this._textWidth = this._getRealTextWidth(this.textSpr, this.text);
    this.addChild(this.textSpr);
  };
  _._getRealTextWidth = function(textSpr, text) {
    var textWidth;
    textWidth = textSpr._textSpr.bitmap.measureTextWidth(text);
    textWidth += textSpr.x;
    textWidth = Math.round(textWidth);
    return textWidth;
  };
  _._createIcon = function() {
    var e;
    try {
      this.iconSpr = new AA.Sprite_UIIcon(this.params.icon);
      this.iconSpr.draw(this.iconIndex);
      this.iconSpr.x -= this.params.icon.size + 1;
      // * Ставим иконку вертикально по центру
      this.iconSpr.y = this.params.text.size.h / 2;
      this.iconSpr.zeroChild().anchor.y = 0.5;
      return this.addChild(this.iconSpr);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createCountText = function() {
    var e, text;
    try {
      this.countTextSpr = new AA.Sprite_UIText(this.params.countText);
      text = this.params.countSymbol + this.count;
      this.countTextSpr.draw(text);
      this.countTextSpr.x += this._textWidth + 1;
      // * Не плюсуем, т.к. countTextSpr начинается уже после textSpr (x)
      this._textWidth = this._getRealTextWidth(this.countTextSpr, text);
      return this.addChild(this.countTextSpr);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._applyCenter = function() {
    var allWidth;
    //@setStaticAnchor(0.5, 0.5)
    allWidth = this._textWidth;
    this.x -= allWidth / 2;
    if (this.iconSpr != null) {
      this.x += this.params.icon.size / 2;
    }
  };
  _._startEffect = function() {
    if (this.effectParams == null) {
      return;
    }
    // * Эффект появления
    this._apperChanger = new AA.Changer(this);
    this._apperChanger.change('opacity').from(0).to(255).step(55).start();
    this._nextPhaseThread = new KDCore.TimedUpdate(this.effectParams.stayTime, this._startEndPhase.bind(this));
    this._nextPhaseThread.once();
    this._isStarted = true;
  };
  _._startEndPhase = function() {
    // * Затухание после показа
    this._fadeOutChanger = new AA.Changer(this);
    this._fadeOutChanger.change('opacity').from(255).to(0).step(this.effectParams.opacityStep).done(this.stop.bind(this)).start();
    // * Поднятие вверх после показа
    this._moveOutChanger = new AA.Changer(this);
    this._moveOutChanger.change('y').from(this.y).to(-Graphics.height - 100).step(this.effectParams.moveStep).done(this.stop.bind(this)).start();
  };
  _._updateEffect = function() {
    var ref, ref1;
    if (!this.isActive()) {
      return;
    }
    if (!this.isStarted()) {
      return;
    }
    this._apperChanger.update();
    this._nextPhaseThread.update();
    if ((ref = this._fadeOutChanger) != null) {
      ref.update();
    }
    return (ref1 = this._moveOutChanger) != null ? ref1.update() : void 0;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
