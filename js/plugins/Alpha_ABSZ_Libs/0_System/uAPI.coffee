# * Глабольный набор вспомогательных функций для пользователя

uAPI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = uAPI

    _.controlUIElement = () ->
        try
            user = $gameSystem.aaGetUserUISettings()
            user.set ...arguments
            AA.UI.refreshElement arguments[0] # * Tag
        catch e
            KDCore.warning e

    _.showUI = () ->
        try
            user = $gameSystem.aaGetUserUISettings()
            # * Просто удаляем настройки, так как по умолчанию интерфейс всегда видно
            # * других настроек у интерфейса нету
            user.set "main", "clear"
            AA.UI.show()
        catch e
            KDCore.warning e

    _.hideUI = () ->
        try
            user = $gameSystem.aaGetUserUISettings()
            user.set "main", "setVisible", false
            AA.UI.hide()
        catch e
            KDCore.warning e
    
    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------