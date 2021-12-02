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
        $gameTemp._aaCanReceiveVisualFromServer is true &&
        @isOnSameMap(servCommand) &&
        KDCore.Utils.isSceneMap() &&
        !SceneManager.isSceneChanging()

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
                return { type: 0, id: ANNetwork.myId() }
            else if character instanceof Game_Event
                return { type: 1, id: character.eventId(), mapId: $gameMap.mapId() }
            else if character instanceof NETCharacter
                return { type: 0, id: character.id }
        catch e
            AA.w e
        return null # * Unknown

    _.unpackMapChar = (packed) ->
        try
            return null unless packed?
            return null unless packed.type?
            switch packed.type
                when 0
                    if packed.id == ANNetwork.myId()
                        return $gamePlayer
                    else
                        return $gameMap.networkCharacterById(packed.id)
                when 1
                    if $gameMap.mapId() == packed.mapId
                        return $gameMap.event(packed.id)
        catch e
            AA.w e
        return null

    _.loadExtensions = ->

        return unless Imported.Alpha_NETZ is true

        @SetupNETCharacter() # AA_Network/3_NETCharacter_AA.coffee

        # * Запускать АБС по готовности персонажа
        __alias_ANPM_bar = ANPlayersManager.bindActorResult
        ANPlayersManager.bindActorResult = (result) ->
            __alias_ANPM_bar.call(@, ...arguments)
            return unless result
            # * На всякий случай с задержкой
            AA.Utils.callDelayed(AA.System.checkABSPlayerExists.bind(AA.System), 10)
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

        # * Почему-то случается Game Crush при проигрывании анимаций по сети
        # * Не нашёл причину и решение, так что просто игнорируем
        _alias_SA_r = Sprite_Animation::_render
        Sprite_Animation::_render = () ->
            try
                _alias_SA_r.call(@, ...arguments)
            catch e
                AA.w e
                @_render = -> # * EMPTY
            return

        return

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------