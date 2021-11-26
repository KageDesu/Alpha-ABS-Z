# * Глабольный менеджер обработки (отправки) сетевых запросов

AANetworkManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AANetworkManager

    # * Методы (запросы - отправка на сервер, requests)
    # * ======================================================================
    # -----------------------------------------------------------------------
    do ->

        # * В этих методах всегда много проверок, чтобы не загружать лишний раз севрер

        #TODO: В MV другой метод немного
        _.playAnimationOnCharacter = (character, animationId) ->
            try
                return unless AA.Network.isNetworkGame()
                return unless character?
                return if animationId <= 0
                character = AA.Network.packMapChar(character)
                @sendToServer("playAnimationOnCharacter", { character, animationId })
            catch e
                AA.w e

        _.playAnimationOnMap = (x, y, animationId) ->
            try
                return unless AA.Network.isNetworkGame()
                return if animationId <= 0
                @sendToServer("playAnimationOnMap", { x, y, animationId })
            catch e
                AA.w e

        _.showDamagePopUpOnCharacter = (character, data) ->
            try
                return unless AA.Network.isNetworkGame()
                return unless character?
                return unless data?
                character = AA.Network.packMapChar(character)
                styleId = data.settings.id
                value = data.value
                @sendToServer("showDamagePopUpOnCharacter", { character, styleId, value })
            catch e
                AA.w e

        _.requestCharacterShakeEffect = (character, time) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("requestCharacterShakeEffect", { character, time })
            catch e
                AA.w e

        _.requestCharacterShatterEffect = (character, dx, dy) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("requestCharacterShatterEffect", { character, dx, dy })
            catch e
                AA.w e

        #TODO: Есть действия которые нельзя выполнять не на карте
        _.executeSA = (action, character) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("executeSA", { action, character })
            catch e
                AA.w e

    # * Обработка методов ОТ сервера (responses)
    # * ======================================================================
    # -----------------------------------------------------------------------
    do ->
        _.playAnimationOnCharacter_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, animationId } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                AABattleActionsManager.playAnimationOnCharacter(character, animationId)
            catch e
                AA.w e

        _.playAnimationOnMap_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { x, y, animationId } = response.content
                AABattleActionsManager.playAnimationOnMap(x, y, animationId)
            catch e
                AA.w e

        _.showDamagePopUpOnCharacter_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, styleId, value } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                data = AADamagePopUpFactory._createFromSettings(styleId, value)
                return unless data?
                Sprite_AADamagePopUpItem.CreateOnCharacterBinded(
                    character, data.settings, data.value
                )
                # * Чтобы HP минибар обновился
                character.AASprite()?._aaRefreshExtraInfoOnDamage()
            catch e
                AA.w e

        _.requestCharacterShakeEffect_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, time } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                return if character.aaIsShakeRequested()
                character?.aaRequestShakeEffect(time) if time? and time > 0
            catch e
                AA.w e

        _.requestCharacterShatterEffect_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, dx, dy } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                return if character.aaIsShatterRequested()
                character.aaRequestShatterEffect(dx, dy)
            catch e
                AA.w e

        _.executeSA_RESP = (response) ->
            try
                "CALL SA".p()
                { mapId } = response
                { action, character } = response.content
                cmd = action.split("_")[0]
                # * Self.Switch - своя обработка
                if cmd == "ss"
                    # * Тут используется  запакованный персонаж (чтобы передать EVENT ID другой карты)
                    AA.SAaction.executeSelfSwitchActionFromNetwork(action, character, mapId)
                else
                    # * Проверки определённых действий (только на карте и на сцене)
                    if ["an", "ef", "ba", "se", "ev", "ce"].contains(cmd)
                        return unless AA.Network.isAvailableForVisual(response)
                    unpackedCharacter = AA.Network.unpackMapChar(character)
                    AA.SAaction.execute(action, unpackedCharacter)
            catch e
                AA.w e

    # * Общие методы отправки и приёма команд
    # * ======================================================================
    # -----------------------------------------------------------------------
    do ->
        # * Обработка ответа (команды) от сервера (общий метод)
        _.onServerCommand = (name, response) ->
            try
                return if AA.Network.isShouldIgnoreServerCommand(response)
                # * Получить только имя команды (без префикса)
                cmd = name.replace(AA.Network.NETCmdPrefix, "")
                method = @[cmd + "_RESP"]
                if method?
                    $gameTemp.aaIsLocalOnly = true
                    try
                        method(response)
                    catch e
                        AA.w cmd, e
                    $gameTemp.aaIsLocalOnly = false
                else
                    AA.w 'Network: Handler for ' + cmd + ' not found'
            catch e
                AA.w e, "onServerCommand"

        # * Отправка команды на сервер (общий метод)
        _.sendToServer = (cmd, content) ->
            try
                return if $gameTemp.aaIsLocalOnly is true
                return unless AA.Network.isNetworkGame()
                nAPI.sendCustomCommand(
                    AA.Network.NETCmdPrefix + cmd,
                    AA.Network.createServCommand(content)
                )
            catch e
                AA.w e, "sendToServer"

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------

