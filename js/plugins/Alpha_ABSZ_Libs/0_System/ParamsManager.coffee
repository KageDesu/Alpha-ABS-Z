# * Класс которые работает с параметрами плагина

do ->
    
    #TODO: Заменить Test на другой символ
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("AABSZ")
            @_prepareParameters()
            return

        # * Данный метод надо вызывать когда игра уже загружена (доступны $gameX объекты)
        applyParameters: ->
            # * Отключение Scroll камеры, если не задан параметр
            uAPI.disableMapScroll() if @getMapScrollingSettings().isEnabled is false
            return

        # * Стандартные: ["AABS_0","AABS_1", "AABS_2"]
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

        isShakeScreenWhenPlayerGetDamage: () -> true

        #TODO: Всплывающий урон вынести в отдельный плагин
        #TODO: Сделать параметры всплывающего урона
        getPopUpDamageSettings: (id) ->
            settings = @getParam("popUpDamageTable", [])
            data = settings.getById(id)
            if data?
                return data
            else
                return {
                    id: "default",
                    randDX: 10,
                    randDY: 10,
                    stayTime: 12,
                    noFlyUp: false,
                    noFadeOut: false,
                    changeFontSize: 22,
                    text: {
                        visible: true,
                        marginX: 0,
                        marginY: 0,
                        position: "center",
                        outlineColor: null,
                        outlineWidth: 2,
                        fontFace: "AABS_3",
                        textColor: "#E6E6E6",
                        fontSize: 18,
                        fontItalic: false
                    },
                    image: {
                        name: "",
                        marginX: 0,
                        marginY: 0,
                        fadeInSpeed: 20
                    }
                }

        isAutoExpAfterKillEnemy: -> true

        # * Карта
        # -----------------------------------------------------------------------

        # * Глобальные непроходимые участки карты для визоров и Projectile
        getVisionRestrictedRegions: -> @getParam("enemies_noPassVision", [])
        getVisionRestrictedTerrains: -> @getParam("enemies_noPassVision2", [])
        getProjectileRestrictedRegions: -> @getParam("map_noProjectilePass", [])
        getProjectileRestrictedTerrains: -> @getParam("map_noProjectilePass2", [])

        # * Настройки для скролла карты курсором
        getMapScrollingSettings: () -> @getParam("mapScrolling", {
            isEnabled: false
        })

        # * Показывать всплывающие предметы при получении
        #TODO: ItemGain вынести в отдельный плагин
        isShowItemGainNotify: -> @getParam("isShowItemGainNotify", true)


        # * Панель навыков
        # -----------------------------------------------------------------------

        # * Добавлять автоматически новый навык на панель навыков при изучении навыка
        isAddNewSkillsOnPanelOnLearning: -> @getParam("isAddNewSkillsOnPanelOnLearning", true)

        # * Добавлять автоматически АБС предметы на панель навыков
        isAddNewItemOnPanelOnPickup: -> @getParam("isAddNewItemOnPanelOnPickup", true)

        # * Эффект подсветки слотов навыков на панели
        isUseOutlineEffect: -> @getParam("isUseOutlineEffect", true)

        getSkillPanelItemVisualSettings: -> {} #TODO:

        # * Все слоты панели навыков
        getUISkillsItems: () -> @_skillPanelSlots || []


    AA.link ParamsManager
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.ParamsManager::

    # * Данный метод вызывается при старте системы, $game объекты ещё не доступны
    # * Например для конвертирования каких-либо значений
    _._prepareParameters = ->
        # * Если эффект отключён, заменяем класс на класс заглушку
        if @isUseOutlineEffect() == false
            AA.Sprite_SkillPanelOutline = AA.Sprite_SkillPanelOutlineDummy
        # * Собираем все слоты в один массив
        @_collectAllSkillSlots()
        return

    _._collectAllSkillSlots = ->
        primary = @_getPrimarySkillSlot()
        secondary = @_getSecondarySkillSlot()
        slots = @_getSkillSlots()
        @_skillPanelSlots = [primary, secondary, ...slots]
        return

    _._getPrimarySkillSlot = -> @getParam("primaryAttackSlot", {
            position: { x: 218, y: 583 },
            symbol: "E"
        })

    _._getSecondarySkillSlot = -> @getParam("secondaryAttackSlot", {
            position: { x: 255, y: 583 },
            symbol: "Q"
        })

    _._getSkillSlots = -> @getParam("allSkillSlots", [
            {
                position: { x: 302, y: 583 },
                symbol: "1"
            }
            {
                position: { x: 339, y: 583 },
                symbol: "2"
            }
            {
                position: { x: 376, y: 583 },
                symbol: "3"
            }
            {
                position: { x: 413, y: 583 },
                symbol: "4"
            }
            {
                position: { x: 450, y: 583 },
                symbol: "5"
            }
            {
                position: { x: 487, y: 583 },
                symbol: "6"
            }
            {
                position: { x: 524, y: 583 },
                symbol: "7"
            }
            {
                position: { x: 561, y: 583 },
                symbol: "8"
            }
        ])

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------