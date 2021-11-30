#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    #@[ALIAS]
    ALIAS__aaUpdateForNetwork = _.aaUpdateForNetwork
    _.aaUpdateForNetwork = ->
        ALIAS__aaUpdateForNetwork.call(@)
        return unless ANGameManager.isMapMaster()
        @AABattler()?._updateDataObserver()
        return
    
    #@[ALIAS]
    ALIAS__aaFillNetworkDataObserver = _.aaFillNetworkDataObserver
    _.aaFillNetworkDataObserver = ->
        ALIAS__aaFillNetworkDataObserver.call(@)
        # * Будем хранить точку "дома", чтобы АИ
        # мог вернуться домой, даже если
        # мастер карты был сменён в бою
        @aaResetHomePoint()
        @netDataObserver.addFields(@, [
            "homePoint"
        ])
        return

    #TODO: Помимо обновления раз в 1 секундку
    # * Сделать так что когда приходит какой-либо Action
    # * на событие, то ещё раз сразу обновить DataObserver 

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------