// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами плагина
(function() {
  var ParamsManager;
  
    //TODO: Заменить Test на другой символ
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("AABSZ");
      this._prepareParameters();
      return;
    }

    // * Данный метод надо вызывать когда игра уже загружена (доступны $gameX объекты)
    applyParameters() {
      if (this.getMapScrollingSettings().isEnabled === false) {
        // * Отключение Scroll камеры, если не задан параметр
        uAPI.disableMapScroll();
      }
    }

    xAnimations() {
      if (Imported.PKD_AnimaX === true) {
        return PKD_ANIMAX.Animations;
      } else {
        return [];
      }
    }

    // * Стандартные: ["AABS_0","AABS_1", "AABS_2"]
    fonts() {
      return this.getParam("fonts", []);
    }

    uiData(tag) {
      switch (tag) {
        case "hpGauge":
          // * В классе Sprite_ActorStateGauge прописаны настройки HP как стандартные
          return AA.Sprite_ActorStateGauge.prototype.defaultParams();
        case "mpGauge":
          return {
            visible: true,
            position: {
              x: 454,
              y: 560
            },
            label: "Player_MPGaugeLabel",
            labelMargins: {
              x: -37,
              y: 5
            },
            isCanBeEdited: true,
            isHideWithMessage: true,
            text: {
              visible: true,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Player_MPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "tpGauge":
          return {
            visible: false,
            position: {
              x: 454,
              y: 560
            },
            label: "Player_TPGaugeLabel",
            labelMargins: {
              x: -37,
              y: 5
            },
            isCanBeEdited: true,
            isHideWithMessage: true,
            text: {
              visible: true,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Player_TPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge1":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: null,
            labelMargins: {
              x: 0,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge2":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: null,
            labelMargins: {
              x: 0,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge2",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        case "miniHpGauge3":
          return {
            visible: true,
            position: {
              x: 0,
              y: 0
            },
            label: "Event_HPGauge3_Label",
            labelMargins: {
              x: -20,
              y: 0
            },
            isCanBeEdited: false,
            isHideWithMessage: false,
            text: {
              visible: false,
              size: {
                w: 100,
                h: 20
              },
              alignment: "left",
              font: {
                face: "AABS_0",
                size: 13,
                italic: false
              },
              margins: {
                x: 10,
                y: 0
              },
              outline: {
                color: null,
                width: 2
              },
              textColor: "#edead8".toCss()
            },
            gauge: {
              visible: true,
              fill: "Event_HPGauge3",
              foreground: "",
              mask: "",
              backColor: "#000000".toCss(),
              backOpacity: 160,
              vertical: false
            }
          };
        default:
          return null;
      }
    }

    getMiniHpGaugeSettings() {
      return {
        active: true,
        showOnlyOnHover: true,
        showOnDamage: true
      };
    }

    //TODO: Первые два обязательны, так как отвечают за атаку и защиту (мышка)
    getUISkillsItems() {
      return [
        {
          position: {
            x: 218,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "E"
        },
        {
          position: {
            x: 255,
            y: 583
          },
          visibleIfEmpty: false,
          symbol: "Q"
        },
        {
          position: {
            x: 302,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "1"
        },
        {
          position: {
            x: 339,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "2"
        },
        {
          position: {
            x: 376,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "3"
        },
        {
          position: {
            x: 413,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "4"
        },
        {
          position: {
            x: 450,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "5"
        },
        {
          position: {
            x: 487,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "6"
        },
        {
          position: {
            x: 524,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "7"
        },
        {
          position: {
            x: 561,
            y: 583
          },
          visibleIfEmpty: true,
          symbol: "8"
        }
      ];
    }

    isShakeScreenWhenPlayerGetDamage() {
      return true;
    }

    //TODO: ItemGain вынести в отдельный плагин
    isShowItemGainNotify() {
      return true;
    }

    // * Добавлять автоматически новый навык на панель навыков при изучении навыка
    isAddNewSkillsOnPanelOnLearning() {
      return true;
    }

    // * Добавлять автоматически АБС предметы на панель навыков
    isAddNewItemOnPanelOnPickup() {
      return true;
    }

    // * Глобальные непроходимые участки карты для визоров и Projectile
    getVisionRestrictedRegions() {
      return this.getParam("enemies_noPassVision", []);
    }

    getVisionRestrictedTerrains() {
      return this.getParam("enemies_noPassVision2", []);
    }

    getProjectileRestrictedRegions() {
      return this.getParam("map_noProjectilePass", []);
    }

    getProjectileRestrictedTerrains() {
      return this.getParam("map_noProjectilePass2", []);
    }

    //TODO: Всплывающий урон вынести в отдельный плагин
    //TODO: Сделать параметры всплывающего урона
    getPopUpDamageSettings(id) {
      var data, settings;
      settings = this.getParam("popUpDamageTable", []);
      data = settings.getById(id);
      if (data != null) {
        return data;
      } else {
        return {
          id: "default",
          randDX: 10,
          randDY: 10,
          stayTime: 12,
          noFlyUp: false,
          noFadeOut: false,
          changeFontSize: 26,
          text: {
            visible: true,
            marginX: 0,
            marginY: 0,
            position: "center",
            outlineColor: null,
            outlineWidth: 2,
            fontFace: null,
            textColor: "#E6E6E6",
            fontSize: 22,
            fontItalic: false
          },
          image: {
            name: "",
            marginX: 0,
            marginY: 0,
            fadeInSpeed: 20
          }
        };
      }
    }

    // * Настройки для скролла карты курсором
    getMapScrollingSettings() {
      return {
        isEnabled: true,
        resetOnAction: true,
        resetOnMove: true,
        speed: 5,
        scrollZone: 10,
        delay: 30
      };
    }

  };
  AA.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.ParamsManager.prototype;
  // * Данный метод вызывается при старте системы, $game объекты ещё не доступны
  // * Например для конвертирования каких-либо значений
  _._prepareParameters = function() {};
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
