// Generated by CoffeeScript 2.5.1
// * Класс ячейки быстрого доступа для АБС навыка (предмета)
//rev 07.07.21
(function() {
  var Sprite_SKillPanelItem;
  Sprite_SKillPanelItem = class Sprite_SKillPanelItem extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Позиция не определяется, так как каждый элемент имеет свою позицию
    defaultParams() {
      return {
        visible: true,
        isCanBeEdited: true,
        isHideWithMessage: true,
        outlineMargins: {
          x: -2,
          y: -2
        },
        iconMargins: {
          x: 2,
          y: 2
        },
        outlinePulseSpeed: 40,
        selectedOutlineColor: "#fcba03",
        clickedOutlineColor: "#0b03fc",
        readyOutlineColor: "#21b53c",
        badOutlineColor: "#d61a1a",
        icon: {
          visible: true,
          size: 32,
          index: 0
        },
        symbolText: {
          visible: true,
          size: {
            w: 20,
            h: 20
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 14,
            italic: false
          },
          margins: {
            x: 18,
            y: 22
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#e0cfbf".toCss()
        },
        timeText: {
          visible: true,
          size: {
            w: 32,
            h: 32
          },
          alignment: "center",
          font: {
            face: "AABS_1",
            size: 12,
            italic: false
          },
          margins: {
            x: 2,
            y: 2
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#fcba03".toCss()
        }
      };
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    //$[OVER]
    isUnderMouse() {
      return this.button.isUnderMouse();
    }

    pulseClick() {
      return this.notifyOutline.pulse(this._clickedColor, this.params.outlinePulseSpeed);
    }

    pulseReady() {
      return this.notifyOutline.pulse(this._readyColor, this.params.outlinePulseSpeed);
    }

    pulseAlert() {
      return this.notifyOutline.pulse(this._badColor, this.params.outlinePulseSpeed);
    }

    hideOutline() {
      return this.notifyOutline.hide();
    }

    select() {
      return this.selectionOutline.show(this._selectionColor);
    }

    deselect() {
      return this.selectionOutline.hide();
    }

    clear() {
      this.enable();
      this.drawIcon(0);
      this.drawCount("");
      return this.drawTime("");
    }

    //@disable() #??? or @enable()
    //TODO: hide if option
    drawIcon() {
      return this.icon.draw(...arguments);
    }

    drawSymbol() {
      return this.text.draw(...arguments);
    }

    drawCount() {} //@countText.draw(...arguments)

    drawTime() {
      return this.timeText.draw(...arguments);
    }

    disable() {
      this.button.disable();
      this.state.visible = true;
    }

    enable() {
      this.button.enable();
      this.state.visible = false;
    }

    switchState(isEnabled) {
      if (isEnabled === true) {
        if (this.isDisabled()) {
          this.enable();
          return true; // * Вновь доступна
        }
      } else {
        if (!this.isDisabled()) {
          this.disable();
        }
      }
      return false;
    }

    isDisabled() {
      return this.state.visible === true;
    }

  };
  AA.link(Sprite_SKillPanelItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SKillPanelItem.prototype;
  _._createContent = function() {
    this._initColors();
    this._createOutline();
    this._createMain();
    this._createIcon();
    //@_createImage() #TODO: if item have image instead icon
    // * Disabled darker hover image
    this._createState();
    this._createInfo();
  };
  _._initColors = function() {
    this._tryConvertColor("_selectionColor", "selectedOutlineColor");
    this._tryConvertColor("_clickedColor", "clickedOutlineColor");
    this._tryConvertColor("_readyColor", "readyOutlineColor");
    this._tryConvertColor("_badColor", "badOutlineColor");
  };
  _._tryConvertColor = function(colorFieldName, paramName) {
    var e;
    try {
      this[colorFieldName] = KDCore.Color.FromHex(this.params[paramName]).ARR;
    } catch (error) {
      e = error;
      AA.w(e);
      this[colorFieldName] = [0, 0, 0, 1];
    }
  };
  _._createOutline = function() {
    this.notifyOutline = new AA.Sprite_SkillPanelOutline();
    this.notifyOutline.move(this.params.outlineMargins);
    this.add(this.notifyOutline);
    this.selectionOutline = new AA.Sprite_SkillPanelOutline();
    this.selectionOutline.move(this.params.outlineMargins);
    this.add(this.selectionOutline);
  };
  _._createMain = function() {
    this.button = new KDCore.ButtonM("SkillSlot", false, "Alpha");
    this.button.addClickHandler(() => {
      return $gamePlayer.aaTryPerformSkill(this.skillId);
    });
    return this.add(this.button);
  };
  _._createIcon = function() {
    this.icon = new AA.Sprite_UIIcon(this.params.icon);
    this.icon.move(this.params.iconMargins);
    return this.add(this.icon);
  };
  _._createState = function() {
    this.state = new AA.Sprite_UIImage();
    this.state.draw("SkillSlot_Disabled");
    this.state.visible = false;
    return this.add(this.state);
  };
  _._createInfo = function() {
    this._createTimer();
    //@_createCountText #TODO: count text for items
    return this._createSymbolText();
  };
  _._createTimer = function() {
    this.timeText = new AA.Sprite_UIText(this.params.timeText);
    return this.add(this.timeText);
  };
  _._createSymbolText = function() {
    this.text = new AA.Sprite_UIText(this.params.symbolText);
    return this.add(this.text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
