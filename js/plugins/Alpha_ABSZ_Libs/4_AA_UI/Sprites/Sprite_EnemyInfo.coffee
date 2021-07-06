# * Класс для отображения информации о враге на экране (портрет, здоровье и т.д.)
do ->

    class Sprite_EnemyInfo extends AA.Sprite_UIElement
        constructor: () ->
            super(...arguments)

        defaultParams: -> {
            visible: true
            position: { x: 640, y: 66 }
            image: "Enemy_Background"
            isCanBeEdited: true,
            isHideWithMessage: true,
            nameFormat: "%1"
            levelFormat: "Lv. %1"
            hpTextFormat: "%1 / %2" # * %3 - Для процента, %1 - текущее, %2 - максимум
            nameText: {
                visible: true
                size: { w: 100, h: 20 }
                alignment: "left"
                font: { face: "AABS_2", size: 16, italic: false }
                margins: { x: 10, y: 6 }
                outline: { color: null, width: 3 }
                textColor: "#d05816".toCss()
            }
            hpText: {
                visible: true
                size: { w: 100, h: 20 }
                alignment: "left"
                font: { face: "AABS_0", size: 13, italic: false }
                margins: { x: 12, y: 28 }
                outline: { color: null, width: 2 }
                textColor: "#edead8".toCss()
            }
            levelText: {
                visible: true
                size: { w: 100, h: 20 }
                alignment: "right"
                font: { face: "AABS_1", size: 12, italic: false }
                margins: { x: 60, y: 4 }
                outline: { color: null, width: 2 }
                textColor: "#edeb6a".toCss()
            }
            gauge: {
                visible: true
                fill: "Player_HPGauge",
                foreground: ""
                mask: ""
                backColor: "#000000".toCss()
                backOpacity: 160
                vertical: false
                margins: { x: 6, y: 28 }
            }
            face: {
                visible: true
                faceName: ""
                faceIndex: 0
                mirror: false
                size: 74
                margins: { x: 92, y: 10 }
            }
            battleState: {
                visible: true
                image: "Enemy_BattleState_Free"
                margins: { x: 142, y: 60 }
            }
            foregroundImage: {
                visible: false
                image: ""
                margins: { x: 0, y: 0 }
            }
        }

        #TODO: Уже есть в двух классах, может вынести на UIElement ???
        #(Sprite_CharacterMiniGauge)

        showSlow: ->
            return if @visible is true && @opacity >= 255
            @visible = true
            @changer = new AA.Changer(@)
            @changer.change('opacity')
                .from(0).to(255).step(35)
                .start()
            return

        hideSlow: ->
            return if @visible is false
            return if @opacity <= 0
            @changer = new AA.Changer(@)
            @changer.change('opacity')
                .from(@opacity).to(0).step(45)
                .start().done(() => @visible = false)
            return

        #$[OVER]
        isCanBeEdited: -> @params.isCanBeEdited is true

        #$[OVER]
        isHaveHideWithMessageFlag: -> @params.isHideWithMessage is true

        # * Value: level
        drawLevelWithFormat: (value) ->
            @levelText?.draw(@params.levelFormat.replace("%1", value))

        # * Values: current, max, rate
        drawHpWithFormat: (value1, value2, value3) ->
            return unless @hpText?
            text = @params.hpTextFormat.replace("%1", value1)
            text = text.replace("%2", value2) if value2?
            text = text.replace("%3", value3) if value3?
            @hpText.draw(text)

        # * Value: name
        drawNameWithFormat: (value) ->
            @nameText?.draw(@params.nameFormat.replace("%1", value))

        drawFace: (faceName, faceIndex) -> @face?.draw(...arguments)

        #TODO: Отрисовка пользовательских картинок цели
        drawCustomImages: () ->
            # * удаляются и отрисовываются заного

        update: ->
            super()
            @changer?.update()

    AA.link Sprite_EnemyInfo
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_EnemyInfo::

    #$[OVER]
    _._createContent = ->
        return unless @isActive()
        @_createBase()
        @_createGauge()
        @_createHpText()
        @_createFaceImage()
        @_createNameText()
        @_createLevelText()
        @_createBattleState()
        # * Слой для статусов и бафов
        @_statesLayer = new Sprite()
        @addChild @_statesLayer
        # * Для пользовательских картинок из параметров конкретного монстра
        @_customImagesLayer = new Sprite()
        @addChild @_customImagesLayer
        @_createForegroundImage()
        @move @params.position

    _._createBase = ->
        @base = new AA.Sprite_UIImage(@params)
        @add @base
        return

    _._createGauge = ->
        @gauge = new AA.Sprite_UIGauge(@params.gauge)
        @gauge.move @params.gauge.margins
        @add @gauge

    _._createHpText = ->
        @hpText = new AA.Sprite_UIText(@params.hpText)
        @add @hpText

    _._createFaceImage = ->
        @face = new AA.Sprite_UIFace(@params.face)
        @face.move @params.face.margins
        @add @face

    _._createNameText = ->
        @nameText = new AA.Sprite_UIText(@params.nameText)
        @add @nameText
    
    _._createLevelText = ->
        @levelText = new AA.Sprite_UIText(@params.levelText)
        @add @levelText

    _._createBattleState = ->
        @battleState = new AA.Sprite_UIImage(@params.battleState)
        @battleState.move @params.battleState.margins
        @add @battleState

    # * Для пользователя, по умолчанию не используется
    _._createForegroundImage = ->
        foregroundImage = new AA.Sprite_UIImage(@params.foregroundImage)
        foregroundImage.move @params.foregroundImage.margins
        @add foregroundImage

    return
# ■ END PRIVATE
#---------------------------------------------------------------------------