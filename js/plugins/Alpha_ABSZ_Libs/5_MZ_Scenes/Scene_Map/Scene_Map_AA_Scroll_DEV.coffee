#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

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