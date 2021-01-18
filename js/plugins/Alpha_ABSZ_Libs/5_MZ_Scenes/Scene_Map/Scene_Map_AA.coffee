#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    # * Обработка нажатия мыши (Touch) на карте
    _.onMapTouchAA = ->
        #TODO: isActive? может не надо? Например чтобы цели выбирать?
        return unless $gamePlayer.isActive()
        return unless $gamePlayer.canBeControlled()
        char = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
        if char?
            @aaOnClickOnABSCharacter(char)
        else
            # * Default Moving to point
            _.ALIAS__onMapTouch.call(@)

    _.aaGetABSEntityInPosition = (point) ->
        @_getABSEventOnPosition(point.x, point.y)

    _._getABSEventOnPosition = (x, y) -> $gameMap.eventsXyAA(x, y)?.first()
        
    _.aaOnClickOnABSCharacter = (char) ->
        try
            #TODO: debug only
            window.__selected = char
            "SELECTED ON MAP".p(char.AABattler().name()) if char?
            #AATargetsManager.setPlayerTarget char
            AA.UI.selectTargetOnMap(char)
        catch e
            AA.w e


    #TODO: Сделать задержку и проверку за Canvas
    #TODO: optional и параметры (границы, скорость)
    # Сделать возможность отключать, включать в игре
    _.aaUpdateMapScroolByMouse = ->
        return if $gamePlayer.isMoving()
        #TODO: destination is valid
        # * Когда мышка у края экрана, делать scrol
        isScroll = false
        scroolSpeed = 5

        p = TouchInput
        if p.y > Graphics.height - 20
            #"DOWN".p()
            $gameMap.startScroll(2, 1, scroolSpeed)
            #if p.y > 710
            #    $gameMap.startScroll(2, 2, 5)
            isScroll = true
        else
        if p.y > 0 and p.y < 20
            #"UP".p()
            $gameMap.startScroll(8, 1, scroolSpeed)
            #if p.y > 710
            #    $gameMap.startScroll(2, 2, 5)
            isScroll = true
        else
        if p.x > 0 and p.x < 20
            #"Left".p()
            $gameMap.startScroll(4, 1, scroolSpeed)
            isScroll = true
        else
        if p.x > Graphics.width - 20
            #"right".p()
            $gameMap.startScroll(6, 1, scroolSpeed)
            isScroll = true

        $gameMap.startScroll(0, 0, 0) unless isScroll
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------