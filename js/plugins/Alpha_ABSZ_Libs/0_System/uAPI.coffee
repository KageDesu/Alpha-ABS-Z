# * Глабольный набор вспомогательных функций для пользователя

uAPI = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #TODO: Execute SAction (global)

    #@[DEFINES]
    _ = uAPI

    # * Панель навыков
    # -----------------------------------------------------------------------
    do ->

        # * Добавить навык на панель навыков
        # * 0 - убрать из слота
        # * slotSymbol == null - в любое не занятое место
        _.setSkillToPanel = (skillId, slotSymbol) ->
            try
                slotSymbol = slotSymbol.toString() if slotSymbol?
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
        _.getSkillIdFromPanel = (slotSymbol) ->
            slotSymbol = slotSymbol.toString() if slotSymbol?
            return $gamePlayer.aaSkillsSet?.getSkillForSymbol(slotSymbol)

    # * Система АБС
    # -----------------------------------------------------------------------
    do ->

        _.pauseABS = -> AA.System.pauseABS()

        _.resumeABS = -> AA.System.resumeABS()

    # * Интерфейс АБС
    # -----------------------------------------------------------------------
    do ->

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
                    Sprite_AADamagePopUpItem.CreateOnCharacterBinded(char, settings, value)
                return
            catch e
                KDCore.warning e

        #TODO: Доделать и надо Wiki страницу и демку карту с примерами

        _.showPopUpOnMap = () ->

        _.showPopUpOnScreen = () ->

    # * Камера
    # -----------------------------------------------------------------------
    do ->

        # * Активировать скролл камеры
        _.enableMapScroll = () ->
            try
                Scene_Map::aaUpdateMapScrlByMouse = Scene_Map::aaUpdateMapScrlByMouseBody
                return
            catch e
                KDCore.warning e

        # * Отключить скролл камеры
        _.disableMapScroll = () ->
            try
                @resetMapScroll() if $gameTemp.aaIsMapScrolled()
                Scene_Map::aaUpdateMapScrlByMouse = -> # * EMPTY
                return
            catch e
                KDCore.warning e

        # * Сбросить скролл камеры (на центр - игрок)
        _.resetMapScroll = () ->
            try
                $gamePlayer.center($gamePlayer.x, $gamePlayer.y)
                $gameTemp.aaSetMapScrolled false
                return
            catch e
                KDCore.warning e

    # * Управление объектами
    # -----------------------------------------------------------------------
    do ->

        # * Получить опыт за врага по номеру в БД (isVisible == true -> PopUp)
        _.gainExpForEnemyDb = (enemyId, isVisible = true) ->
            try
                enemy = $dataEnemies[enemyId]
                return unless enemy?
                expValue = AA.Utils.getExpFromAAEnemy(enemy)
                $gameParty.aaGainExpForParty(expValue, isVisible)
            catch e
                KDCore.warning e
            return

        # * Получить опыт за врага по номеру события
        _.gainExpForEnemyEv = (eventId, isVisible = true) ->
            try
                event = $gameMap.event(eventId)
                return unless event?
                # * Событие не АБС и не было АБС ранее
                return unless event.aaEventSettings?
                # * Если есть специальная переменная для опыта, сразу из неё
                expVarId = event.aaEventSettings.getExpVarId()
                if expVarId > 0
                    expValue = $gameVariables.value(expVarId)
                    $gameParty.aaGainExpForParty(expValue, isVisible)
                else
                    @gainExpForEnemyDb(event.aaEventSettings.getEnemyId())
            catch e
                KDCore.warning e
            return

    
    # * Навыки
    # -----------------------------------------------------------------------
    do ->

        _.executeAASkillOnMap = (skillId, x, y) ->
            #TODO: Выполнить АА навык на карте

        _.executeAASkillOnChar = (skillId, charId) ->
            #TODO: Выполнить АА навык на объекте

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------