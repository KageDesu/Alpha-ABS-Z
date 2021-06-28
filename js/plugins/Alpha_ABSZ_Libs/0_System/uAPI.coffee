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

    _.showPopUpOnChar = (charId, styleId, value, isVariable) ->
        try
            return unless KDCore.Utils.isSceneMap()
            value = $gameVariables.value(value) if value > 0 && isVariable is true
            if charId == 0
                char = $gamePlayer
            else
                char = $gameMap.event(charId)
            settings = AA.PP.getPopUpDamageSettings(styleId)
            unless settings?
                AA.w "PopUp settings with ID " + styleId + " not found!"
            else
                Sprite_AADamagePopUpItem.CreateOnCharacter(char, settings, value)
            return
        catch e
            KDCore.warning e

    #TODO: show on map point, show on screen point

    
    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------