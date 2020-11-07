#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_UIEditor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Scene_UIEditor::

    _.createMain = ->
        @createBackground()
        # * Показать что в редакторе находимся
        @createEditorMark()
        # * Сетки
        @createGrids()
        @createUI()
        @createXYHelpText()
        @createTagHelpText()

    # * За заднем плане карта
    _.createBackground = ->
        @_backgroundSprite = new Sprite(SceneManager.backgroundBitmap())
        @addChild @_backgroundSprite
        @_backgroundSprite.opacity = 250

    _.createEditorMark = ->
        eLayer = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height)
        eLayer.fillAll "#C0C0C0".toCss()
        eLayer.opacity = 75
        p = AA.Sprite_UIText::defaultParams()
        p.size = { w: Graphics.width, h: 200 }
        p.font.size = 72
        eText = new AA.Sprite_UIText(p)
        eText.drawText 'UI Editor'
        eText.y = Graphics.height / 2 - 100
        eLayer.addChild eText
        @addChild eLayer

    # * Сетка для визуальной привязки (для шага 10)
    _.createGrids = ->
        @xGrid = @createGridSprite(10)
        @addChild @xGrid

    _.createGridSprite = (size) ->
        grid = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height)
        drawLineVert = (b, i) ->
            b.fillRect(0, i * size, b.width, 1, 'rgba(0, 0, 0, 1)')

        drawLineHor = (b, i) ->
            b.fillRect(i * size, 0, 1, b.height, 'rgba(0, 0, 0, 1)')

        for i in [0...grid.b().height / size]
            drawLineVert(grid.bitmap, i)

        for j in [0...grid.b().width / size]
            drawLineHor(grid.bitmap, j)
        
        grid.visible = false
        grid.opacity = 75
        return grid

    # * В этом методе создаётся AA UI (не обновляемый)
    _.createUI = ->
        @uiSpriteset = new AA.Spriteset_UI()
        @uiSpriteset.show() # * Всегда видимый в редакторе
        @addChild @uiSpriteset
        return
    
    _.createXYHelpText = ->
        p = AA.Sprite_UITextWithBack::defaultParams()
        p.text.size.w = 80
        p.rect.size.w = 80
        p.rect.borderColor = ""
        p.text.textColor = "#FFFFFF".toCss()
        @xyText = new AA.Sprite_UITextWithBack(p)
        @xyText.fill "#C0C0C0".toCss()
        @addChild @xyText

    _.createTagHelpText = ->
        p = AA.Sprite_UITextWithBack::defaultParams()
        p.text.size.w = 120
        p.rect.size.w = 120
        p.rect.borderColor = ""
        p.text.textColor = "#FFFFFF".toCss()
        @tagText = new AA.Sprite_UITextWithBack(p)
        @tagText.fill "#808080".toCss()
        @addChild @tagText

    return
# ■ END Scene_UIEditor.coffee
#---------------------------------------------------------------------------