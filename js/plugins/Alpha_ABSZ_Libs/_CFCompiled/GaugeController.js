// Generated by CoffeeScript 2.5.1
(function() {
  var GaugeController;
  // * Общий контроллер для Sprite_UIGauge (HP, MP, TP, ...)
  //?rev 03.07.21
  GaugeController = class GaugeController extends AA.UIElementController {
    constructor(gaugeSprite) {
      super();
      this.gaugeSprite = gaugeSprite;
    }

    
      // * source - Game_Battler
    // * valueFieldName - название поля (hp)
    //$[OVER]
    setup(source, valueFieldName, maxValueFieldName) {
      this.source = source;
      this.valueFieldName = valueFieldName;
      this.maxValueFieldName = maxValueFieldName;
      this.value = 0;
      this.max = 0;
      this.createThread(10, 4);
    }

    
      // * 0 - value (100), 1 - % (100%), 2 - full (100 / 100)
    setValueTextType(valueTextType) {
      switch (valueTextType) {
        case 1:
          this.getTypedText = this.getValuePercentText;
          break;
        case 2:
          this.getTypedText = this.getValueAndMaxText;
          break;
        default:
          this.getTypedText = this.getValueText;
      }
    }

    refreshGauge() {
      var e;
      if (this.gaugeSprite == null) {
        return;
      }
      try {
        this._refreshValues();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Останавливаем работу метода
        this.refreshGauge = function() {};
      }
    }

    //?DYNAMIC
    // * Этот метод используется чтобы получить текст исходя из настроек контроллера
    // * По стандарту - обычное значение
    getTypedText() {
      return this.getValueText();
    }

    getValueText() {
      return this.value;
    }

    getValueAndMaxText() {
      return this.value + " / " + this.max;
    }

    getValuePercentText() {
      return Math.round((this.value / this.max) * 100) + '%';
    }

  };
  AA.link(GaugeController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.GaugeController.prototype;
  //$[OVER]
  _._refresh = function() {
    var sourceMaxValue, sourceValue;
    sourceValue = this.source[this.valueFieldName];
    sourceMaxValue = this.source[this.maxValueFieldName];
    // * Перерисовываем только если значния изменились
    if (this.value !== sourceValue || this.max !== sourceMaxValue) {
      this.value = sourceValue;
      this.max = sourceMaxValue;
      this.refreshGauge();
    }
  };
  _._refreshValues = function() {
    this.gaugeSprite.drawGauge(this.value / this.max);
    this.gaugeSprite.drawText(this.getTypedText());
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------