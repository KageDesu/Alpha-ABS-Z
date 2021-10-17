#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    _.aaInitMapScrollSystem = ->
        @aaScrollTimer = 0
        @aaIsNeedScroll = false
        @aaScrollParams = AA.PP.getMapScrollingSettings()
        return

    #@[DYNAMIC]
    _.aaUpdateMapScrlByMouse = ->
        # * По умолчанию скролл включён
        @aaUpdateMapScrlByMouseBody()
        return

    _.aaUpdateMapScrlByMouseBody = ->
        return if $gamePlayer.isMoving() || $gameTemp.isDestinationValid()
        # * Когда мышка у края экрана, тогда будет scroll карты
        @aaIsNeedScroll = false
        zone = @aaScrollParams.scrollZone

        p = TouchInput
        if p.y > Graphics.height - zone and p.y <= Graphics.height - 2
            @aaMakeScroll(2)
        else
        if p.y >= 2 and p.y < zone
            @aaMakeScroll(8)
        else
        if p.x >= 2 and p.x < zone
            @aaMakeScroll(4)
        else
        if p.x > Graphics.width - zone and p.x <= Graphics.width - 2
            @aaMakeScroll(6)
        
        unless @aaIsNeedScroll
            # * Не применяем, например delay ещё не прошёл
            $gameMap.startScroll(0, 0, 0)
            # * Сброс таймера
            @aaScrollTimer = 0 if @aaScrollTimer >= @aaScrollParams.delay
        
        # * Было ли движение камеры? (Тут только true может быть)
        $gameTemp.aaSetMapScrolled(true) if @aaIsNeedScroll is true
        return
    
    _.aaMakeScroll = (d) ->
        $gameMap.startScroll(d, 1, @aaScrollParams.speed)
        @aaScrollTimer++
        @aaIsNeedScroll = @aaScrollTimer >= @aaScrollParams.delay
        return
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------