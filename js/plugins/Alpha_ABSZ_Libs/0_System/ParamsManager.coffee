# * Класс которые работает с параметрами плагина

do ->
    
    #TODO: Заменить Test на другой символ
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("Test")
            @_prepareParameters()
            return

        xAnimations: ->
            if Imported.PKD_AnimaX is true
                return PKD_ANIMAX.Animations
            else
                return []

        # * Стандартные: ["AABS_0","AABS_1"]
        fonts: -> @getParam("fonts", [])

        uiData: (tag) ->
            switch tag
                when "hpGauge"
                    # * В классе Sprite_ActorStateGauge прописаны настройки HP как стандартные
                    AA.Sprite_ActorStateGauge::defaultParams()
                when "mpGauge"
                    {
                        visible: true,
                        position: { x: 454, y: 560 },
                        label: "Player_MPGaugeLabel",
                        labelMargins: { x: -37, y: 5 },
                        isCanBeEdited: true,
                        isHideWithMessage: true,
                        text: {
                            visible: true
                            size: { w: 100, h: 20 }
                            alignment: "left"
                            font: { face: "AABS_0", size: 13, italic: false }
                            margins: { x: 10, y: 0 }
                            outline: { color: null, width: 2 }
                            textColor: "#edead8".toCss()
                        }
                        gauge: {
                            visible: true
                            fill: "Player_MPGauge",
                            foreground: ""
                            mask: ""
                            backColor: "#000000".toCss()
                            backOpacity: 160
                            vertical: false
                        }
                    }
                when "tpGauge"
                    {
                        visible: false,
                        position: { x: 454, y: 560 },
                        label: "Player_TPGaugeLabel",
                        labelMargins: { x: -37, y: 5 },
                        isCanBeEdited: true,
                        isHideWithMessage: true
                        text: {
                            visible: true
                            size: { w: 100, h: 20 }
                            alignment: "left"
                            font: { face: "AABS_0", size: 13, italic: false }
                            margins: { x: 10, y: 0 }
                            outline: { color: null, width: 2 }
                            textColor: "#edead8".toCss()
                        }
                        gauge: {
                            visible: true
                            fill: "Player_TPGauge",
                            foreground: ""
                            mask: ""
                            backColor: "#000000".toCss()
                            backOpacity: 160
                            vertical: false
                        }
                    }
                when "miniHpGauge1"
                    {
                        visible: true,
                        position: { x: 0, y: 0 },
                        label: null,
                        labelMargins: { x: 0, y: 0 },
                        isCanBeEdited: false,
                        isHideWithMessage: false,
                        text: {
                            visible: false
                            size: { w: 100, h: 20 }
                            alignment: "left"
                            font: { face: "AABS_0", size: 13, italic: false }
                            margins: { x: 10, y: 0 }
                            outline: { color: null, width: 2 }
                            textColor: "#edead8".toCss()
                        }
                        gauge: {
                            visible: true
                            fill: "Event_HPGauge",
                            foreground: ""
                            mask: ""
                            backColor: "#000000".toCss()
                            backOpacity: 160
                            vertical: false
                        }
                    }
                when "miniHpGauge2"
                    {
                        visible: true,
                        position: { x: 0, y: 0 },
                        label: null,
                        labelMargins: { x: 0, y: 0 },
                        isCanBeEdited: false,
                        isHideWithMessage: false,
                        text: {
                            visible: false
                            size: { w: 100, h: 20 }
                            alignment: "left"
                            font: { face: "AABS_0", size: 13, italic: false }
                            margins: { x: 10, y: 0 }
                            outline: { color: null, width: 2 }
                            textColor: "#edead8".toCss()
                        }
                        gauge: {
                            visible: true
                            fill: "Event_HPGauge2",
                            foreground: ""
                            mask: ""
                            backColor: "#000000".toCss()
                            backOpacity: 160
                            vertical: false
                        }
                    }
                when "miniHpGauge3"
                    {
                        visible: true,
                        position: { x: 0, y: 0 },
                        label: "Event_HPGauge3_Label",
                        labelMargins: { x: -20, y: 0 },
                        isCanBeEdited: false,
                        isHideWithMessage: false,
                        text: {
                            visible: false
                            size: { w: 100, h: 20 }
                            alignment: "left"
                            font: { face: "AABS_0", size: 13, italic: false }
                            margins: { x: 10, y: 0 }
                            outline: { color: null, width: 2 }
                            textColor: "#edead8".toCss()
                        }
                        gauge: {
                            visible: true
                            fill: "Event_HPGauge3",
                            foreground: ""
                            mask: ""
                            backColor: "#000000".toCss()
                            backOpacity: 160
                            vertical: false
                        }
                    }
                else
                    null

        getMiniHpGaugeSettings: () -> {
            active: true
            showOnlyOnHover: true
            showOnDamage: true
        }

        #TODO:
        getPopUpDamageSettings: (id) ->
            {
                #TODO: Сделать эти настройки как default, если не найден ID
                id: "test",
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
            }

    AA.link ParamsManager
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.ParamsManager::

    _._prepareParameters = ->
        #TODO: Может и не надо этот метод, раньше тут был конверт анимаций

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------