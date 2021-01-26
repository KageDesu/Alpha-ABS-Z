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

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------