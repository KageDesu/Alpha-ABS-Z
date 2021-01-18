#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #@[ALIAS]
    ALIAS__onMapLoaded = _.onMapLoaded
    _.onMapLoaded = ->
        ALIAS__onMapLoaded.call(@)

        @uiLayer = new Sprite()
        @addChild @uiLayer

        # * TEMP FOR SCREENSHOTS

        plBack = new AA.Sprite_UIImage()
        plBack.draw "c"
        plFace = new AA.Sprite_UIImage()
        plFace.draw "Actor1_1_0"

        plFace.move 670, 410

        plBack.move 600, 520

        @changer = new AA.Changer(plFace)
        @changer2 = new AA.Changer(plFace)
        "CHANGER".p()

        # * Движение вверх
        @changer.change('y').from(plFace.y)
            .to(plFace.y - 20).step(1).delay(60).speed(1).then(@changer2)
            .start()

        # * Затем затухание
        @changer2.change('opacity').from(255)
            .to(0).step(5).speed(1).delay(10).done(() =>
                @changer = null
                @changer2 = null
            )


        p = AA.Sprite_UIText::defaultParams()
        p.size.w = 100
        p.size.h = 30

        p.font.face = "AABS_1"
        p.font.size = 24
        p.textColor = "#FF8D1C".toCss()

        plName = new AA.Sprite_UIText(p)
        plName.move 634, 528

        plName.draw "Reid"

        @uiLayer.addChild plFace
        #@uiLayer.addChild plBack
        #@uiLayer.addChild plName

        # * END TEMP FOR SCREENSHOTS

        #TODO: Список дополнительных шрифтов?

        #s = new AA.Sprite_SelectedCircle()
        #@addChild s

        icon = new AA.Sprite_ActorStateIcon()
        icon.move 8, 8
        @uiLayer.addChild icon

        icon2 = new AA.Sprite_ActorStateIcon()
        icon2.move 46, 8
        @uiLayer.addChild icon2

        @buffs = new AA.BuffIconsController([icon, icon2])
        @buffs.setup($gameParty.leader())

        btn = new AA.Sprite_UIButton()
        btn.move 700, 550
        @uiLayer.addChild btn

        $gameTemp._button = btn

        rect = new AA.Sprite_UIRect()
        rect.fill "#000000".toCss(), 120
        rect.move 10, 10
        rect.drawBorder "#22fF00".toCss(), 2, 20
        #@uiLayer.addChild rect

        textRect = new AA.Sprite_UITextWithBack()
        textRect.move 60, 60
        textRect.draw "Hello"
        #@uiLayer.addChild textRect


        @_projectile = new Sprite(new Bitmap(40, 8))
        @_projectile.bitmap.fillAll KDCore.Color.RED
        @_projectile.anchor.set(0.5)
        @_projectile.move 100, 100
        @_projectile.visible = false
        #@_projectile.angle = 15
        @addChild @_projectile


        @flWindow = new AA.FloatingWindow(@)

        btn.button.addClickHandler () => @flWindow.open()

        #faceTest = new AA.Sprite_UIFace()
        #$gameTemp.fT = faceTest
        #@addChild faceTest

        return

    _._startProjectile = (x, y, x2, y2) ->
        @proj = new AAMapProjectile()
        $gameTemp._proj = @proj
        p1 = new KDCore.Point(x, y)
        p2 = new KDCore.Point(x2, y2)
        @proj.start(p1, p2)

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        if Input.isRepeated("a")
            $gamePlayer.testX() if $gamePlayer.canMove()
        if Input.isTriggered("d")
            $gamePlayer.testX2() if $gamePlayer.canMove()
        if Input.isTriggered("f")
            $gamePlayer.switchToXAnimaState('inBattle')
        if Input.isTriggered("r")
            $gamePlayer.resetXAnimaState()
        @buffs.update()
        @changer?.update()
        @proj?.update()
        if @proj?
            @proj.apply(@_projectile)
            @proj.setEndPoint(TouchInput.toPoint().convertToMap())
            if @proj.isDisposed()
                @proj.dispose()

    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        @uiLayer.visible = false
        ALIAS__stop.call(@)

    _._testPopUp = ->


        popUpItem = new AA.Sprite_PopTreasureItem()
        data = [$dataWeapons, $dataArmors, $dataItems]
        item = data.sample().sample()
        while !item? || !String.any(item.name) || item.iconIndex <= 0
            item = data.sample().sample()
        popUpItem.setItem item, KDCore.SDK.rand(1, 6)

        char = SceneManager._scene._spriteset.findTargetSprite($gameMap.event(12))
        #char = $gamePlayer.AASprite()

        # * Если нету, создаём
        unless char.aaTreasurePopEngine?
            char.aaTreasurePopEngine = new AA.PopTreasureController(char, null)
        # * Если есть, но закончился, то пересоздаём
        else if char.aaTreasurePopEngine.isEmtpy()
            char.aaTreasurePopEngine.stop()
            char.aaTreasurePopEngine = new AA.PopTreasureController(char, null)
        char.aaTreasurePopEngine.addItem(popUpItem)
        return

    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------


window.StartProjectile = (x, y) ->
    p = $gamePlayer
    #debugger
    p2 = TouchInput.toPoint().convertToMap()
    SceneManager._scene._startProjectile(p.x, p.y, p2.x, p2.y)

window.testPopUp = ->
    SceneManager._scene._testPopUp()
    #SceneManager._scene._testPopUp()
    #SceneManager._scene._testPopUp()
    #SceneManager._scene._testPopUp()

window.testPopUp2 = ->
    SceneManager._scene._testPopUp()
    SceneManager._scene._testPopUp()
    SceneManager._scene._testPopUp()
