// Generated by CoffeeScript 2.5.1
// * Класс для показа иконки состояния или баффа игрока
(function() {
  var Sprite_ActorStateIcon;
  Sprite_ActorStateIcon = class Sprite_ActorStateIcon extends AA.Sprite_UIElement {
    constructor() {
      super(...arguments);
      this._lastIconIndex = 0;
      this._lastTextValue = null;
    }

    defaultParams() {
      return {
        visible: true,
        position: {
          x: 0,
          y: 0
        },
        isCanBeEdited: true,
        text: {
          visible: true,
          size: {
            w: 38,
            h: 14
          },
          alignment: "right",
          font: {
            face: "AABS_1",
            size: 16,
            italic: false
          },
          margins: {
            x: -2,
            y: -4
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#fafdec".toCss()
        },
        icon: {
          visible: true,
          index: 0,
          size: 32
        }
      };
    }

    draw(iconIndex, text) {
      if (this._lastIconIndex !== iconIndex) {
        this.drawIcon(iconIndex);
        this._lastIconIndex = iconIndex;
      }
      if (this._lastTextValue !== text) {
        if ((text != null) && isFinite(text)) {
          this.drawText(KDCore.Utils.convertTimeShort(text));
        } else {
          this.drawText(text);
        }
        return this._lastTextValue = text;
      }
    }

    drawIcon(index) {
      return this.icon.draw(index);
    }

    drawText(text) {
      return this.text.draw(text);
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

  };
  AA.link(Sprite_ActorStateIcon);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_ActorStateIcon.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createIcon();
    this._createText();
    return this.move(this.params.position);
  };
  _._createIcon = function() {
    this.icon = new AA.Sprite_UIIcon(this.params.icon);
    return this.add(this.icon);
  };
  _._createText = function() {
    this.text = new AA.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
