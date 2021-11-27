# * Глабольный менеджер сетевого режима (совместимость с Alpha NET Z)

AA.Network = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Network

    _.NETCmdPrefix = "aabsz:"

    _.isNetworkGame = -> Imported.Alpha_NETZ is true && ANNetwork.isConnected()

    _.isShouldIgnoreServerCommand = (servCommand) ->
        { actorId } = servCommand
        return actorId == ANGameManager.myActorId()

    _.isAvailableForVisual = (servCommand) ->
        @isOnSameMap(servCommand) && KDCore.Utils.isSceneMap()

    _.isOnSameMap = (servCommand) ->
        { mapId } = servCommand
        $gameMap.mapId() == mapId

    # * Собирает базовую команду для отправки на сервер
    _.createServCommand = (content) ->
        {
            mapId: $gameMap.mapId(),
            actorId: ANGameManager.myActorId(),
            content
        }

    _.packMapChar = (character) ->
        return null unless character?
        try
            if character == $gamePlayer
                return ANNetwork.myId()
            else if character instanceof Game_Event
                return character.eventId()
            else if character instanceof NETCharacter
                return character.id
        catch e
            AA.w e
        return null # * Unknown

    _.unpackMapChar = (netId) ->
        try
            return null unless netId?
            if isFinite(netId)
                return $gameMap.event(netId)
            else
                if netId == ANNetwork.myId()
                    return $gamePlayer
                else
                    return $gameMap.networkCharacterById(netId)
        catch e
            AA.w e
        return null

    

    _.loadExtensions = ->

        return unless Imported.Alpha_NETZ is true

        @SetupNETCharacter() # 3_NETCharacter_AA.coffee

        # * Запускать АБС по готовности персонажа
        __alias_ANPM_bar = ANPlayersManager.bindActorResult
        ANPlayersManager.bindActorResult = (result) ->
            __alias_ANPM_bar.call(@, ...arguments)
            return unless result
            # * На всякий случай с задержкой
            setTimeout (->
                    AA.System.checkABSPlayerExists()
                ), 10
            return

        _alias_nAPI_onCustomCommandABSZ = nAPI.onCustomCommand
        nAPI.onCustomCommand = (name) ->
            _alias_nAPI_onCustomCommandABSZ.call(@, ...arguments)
            if name.contains(AA.Network.NETCmdPrefix)
                AANetworkManager.onServerCommand(...arguments)
            return

        _alias_GCB_fillNetworkObserver = Game_CharacterBase::_fillNetworkObserver
        Game_CharacterBase::_fillNetworkObserver = ->
            _alias_GCB_fillNetworkObserver.call(@)
            @aaFillNetworkDataObserver()
            return

        return

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------