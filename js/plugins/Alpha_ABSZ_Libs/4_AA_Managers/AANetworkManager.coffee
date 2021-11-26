# * Глабольный менеджер обработки (отправки) сетевых запросов

AANetworkManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AANetworkManager

    

    _.onServerCommand = (name, response) ->
        try
            # * Получить только имя команды (без префикса)
            cmd = name.replace(AA.Network.NETCmdPrefix, "")

        catch e
            AA.w e, "onServerCommand"

    _.sendToServer = (cmd, content) ->
        try
            return unless AA.Network.isNetworkGame()
            nAPI.sendCustomCommand(
                AA.Network.NETCmdPrefix + cmd,
                AA.Network.createServCommand(content)
            )
        catch e
            AA.w e, "sendToServer"

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------

