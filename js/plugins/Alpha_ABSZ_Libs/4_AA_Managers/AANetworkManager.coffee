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
        #TODO: В MV другой метод немного
        _.playAnimationOnCharacter = (target, animationId) ->
            try
                return unless target?
                return if animationId <= 0
                target = AA.Network.packMapChar(target)
                @sendToServer("playAnimationOnCharacter", { target, animationId })
            catch e
                AA.w e

        _.playAnimationOnMap = (x, y, animationId) ->
            try
                return if animationId <= 0
                @sendToServer("playAnimationOnMap", { x, y, animationId })
            catch e
                AA.w e

    # * Обработка методов ОТ сервера (responses)
    # * ======================================================================
    # -----------------------------------------------------------------------
    do ->
        _.playAnimationOnCharacter_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { target, animationId } = response.content
                target = AA.Network.unpackMapChar(target)
                return unless target?
                AABattleActionsManager.playAnimationOnCharacter(target, animationId)
            catch e
                AA.w e

        _.playAnimationOnMap_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { x, y, animationId } = response.content
                AABattleActionsManager.playAnimationOnMap(x, y, animationId)
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
                    method(response)
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

