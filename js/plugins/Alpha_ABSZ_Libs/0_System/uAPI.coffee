# * Глабольный набор вспомогательных функций для пользователя

uAPI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = uAPI

    #TODO: Execute SAction (global)

    # * Добавить навык на панель навыков
    # * 0 - убрать из слота
    # * slotSymbol == null - в любое не занятое место
    _.setSkillToPanel = (skillId, slotSymbol) ->
        try
            if skillId <= 0 # * Удаляем навык из панели
                if AA.Utils.isSkillPanelSymbol(slotSymbol)
                    $gamePlayer.aaSkillsSet?.setSymbolForSkill(0, slotSymbol, null)
            else # * Устанавливаем навык на панель
                # * Если НАВЫК, то должен быть изучен
                if AA.Utils.isAASkill(skillId)
                    return unless $gamePlayer.aaIsHaveABSSkill(skillId)
                # * Предметы можно устанавливать, даже если нет в инвентаре (будет 0)
                if AA.Utils.isSkillPanelSymbol(slotSymbol)
                    $gamePlayer.aaSkillsSet?.setSymbolForSkill(skillId, slotSymbol, null)
                else # * Если символ не указан (или указан неверно, то устанавливаем в свободное место)
                    $gamePlayer.aaSkillsSet?.setSkillInEmptySlot(skillId)
            AA.UI.refreshElement('skills')
        catch e
            KDCore.warning e
        return

    # * Добавить предмет на панель навыков, поддерживает как обычные ID, так и idA
    _.setItemToPanel = (itemId, slotSymbol) ->
        try
            # * Автоматическое преобразование в ID предмета
            if itemId > 0 and !AA.Utils.isAAItem(itemId)
                itemId += AA.Utils.ItemsIDStart
            @setSkillToPanel(itemId, slotSymbol)
        catch e
            KDCore.warning e
        return

    # * Если навыка нет или неверно указан slotSymbol - будет возвращён 0
    _.getSkillIdFromPanel = (slotSymbol) -> $gamePlayer.aaSkillsSet?.getSkillForSymbol(slotSymbol)

    _.pauseABS = -> AA.System.pauseABS()

    _.resumeABS = -> AA.System.resumeABS()

    _.editUI = ->
        try
            if AA.isMap()
                SceneManager.push(AA.Scene_UIEditor)
        catch e
            KDCore.warning e

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

    #TODO: Кнопки нажимаются напанели, даже если скрытый интерфейс
    #TODO: Надо метод isValid дополнить (который в AA.UI) и делать проверки
    _.hideUI = () ->
        try
            user = $gameSystem.aaGetUserUISettings()
            user.set "main", "setVisible", false
            AA.UI.hide()
        catch e
            KDCore.warning e

    #TODO: Этот метод добавить в SActions !!!
    #TODO: show on map point, show on screen point
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

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------