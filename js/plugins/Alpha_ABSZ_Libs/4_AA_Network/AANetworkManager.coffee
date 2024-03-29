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

        _.requestWeaponAnimation = (battler, weaponImageId) ->
            try
                return unless AA.Network.isNetworkGame()
                character = battler.AACharacter()
                return unless character?
                character = AA.Network.packMapChar(character)
                @sendToServer("requestWeaponAnimation", { character, weaponImageId })
            catch e
                AA.w e

        # * Смена состояния AnimaX (боевая стойка, кастинг, смерть и т.д.)
        # * Свой метод (у AnimaX 1.2 и ниже нету автосинхронизации на этот метод)
        _.animaXChangeState = (newState, character) ->
            try
                return unless AA.Network.isNetworkGame()
                return unless character?
                return unless String.any(newState)
                character = AA.Network.packMapChar(character)
                @sendToServer("animaXChangeState", { newState, character })
            catch e
                AA.w e

        _.executeSA = (action, character) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("executeSA", { action, character })
            catch e
                AA.w e

        # * Враги с eraseOnDead = 1 синхронизируются автоматически
        _.executeEraseOnDeadAAEvent = (eventId) ->
            try
                return unless AA.Network.isNetworkGame()
                @sendToServer("executeEraseOnDeadAAEvent", eventId)
            catch e
                AA.w e

        _.syncAAEntityObserver = (character, observerData) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("syncAAEntityObserver", { character, observerData })
            catch e
                AA.w e

        _.syncAIFlowMachineObserver = (eventId, observerData) ->
            try
                return unless AA.Network.isNetworkGame()
                @sendToServer("syncAIFlowMachineObserver", { eventId, observerData })
            catch e
                AA.w e

        _.syncAAEnemyBattlerObserver = (character, observerData) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                @sendToServer("syncAAEnemyBattlerObserver", { character, observerData })
            catch e
                AA.w e

        _.sendTurnTowardCharacter = (character, point) ->
            try
                return unless AA.Network.isNetworkGame()
                character = AA.Network.packMapChar(character)
                { x, y } = point
                @sendToServer("sendTurnTowardCharacter", { character, x, y })
            catch e
                AA.w e

        _.applyActionOnTarget = (target, action) ->
            try
                return unless AA.Network.isNetworkGame()
                return unless target?
                return unless action?
                target = AA.Network.packMapChar(target)
                subject = action._packedSubject
                skill = action.AASkill().idA
                @sendToServer("applyActionOnTarget", { subject, skill, target })
            catch e
                AA.w e

        # * Добавить MapSkill на карту (визуально, расчёт на мастере карты)
        _.startAASkillOnMap = (skill, subject, targetPoint, uniqueId) ->
            try
                return unless AA.Network.isNetworkGame()
                return unless subject?
                return unless skill?
                return unless targetPoint?
                direction = subject.direction
                diagonalDir = subject._diagonalDir
                subject = AA.Network.packMapChar(subject)
                skill = skill.idA
                { x, y } = targetPoint
                @sendToServer("startAASkillOnMap", {
                        subject, skill,
                        targetPoint: { x, y } ,
                        uniqueId,
                        direction,
                        diagonalDir
                    }
                )
            catch e
                AA.w e

        # * Удалить MapSkill (чисто визуально)
        _.endAASkillOnMap = (uniqueId) ->
            try
                return unless AA.Network.isNetworkGame()
                @sendToServer("endAASkillOnMap", uniqueId)
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

        _.requestWeaponAnimation_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, weaponImageId } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                character.AABattler()?.startWeaponAnimation(weaponImageId)
            catch e
                AA.w e

        _.executeSA_RESP = (response) ->
            try
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

        _.executeEraseOnDeadAAEvent_RESP = (response) ->
            try
                # * Тут сцена не важна
                return unless AA.Network.isOnSameMap(response)
                eventId = response.content
                return if eventId <= 0
                event = $gameMap.event(eventId)
                return unless event?
                #TODO: Может проверку что это ABS событие?
                event.erase()
            catch e
                AA.w e

        _.syncAAEntityObserver_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { character, observerData } = response.content
                return unless observerData?
                character = AA.Network.unpackMapChar(character)
                return unless character?
                character.AAEntity()?.applyObserverData(observerData)
            catch e
                AA.w e

        _.syncAIFlowMachineObserver_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { eventId, observerData } = response.content
                return if eventId <= 0
                return unless observerData?
                event = $gameMap.event(eventId)
                return unless event?
                return unless event.isABS()?
                event.AALogic()?.applyObserverData(observerData)
            catch e
                AA.w e

        _.syncAAEnemyBattlerObserver_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { character, observerData } = response.content
                return unless observerData?
                character = AA.Network.unpackMapChar(character)
                return unless character?
                character.AABattler()?.applyObserverData(observerData)
            catch e
                AA.w e

        _.animaXChangeState_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { character, newState } = response.content
                character = AA.Network.unpackMapChar(character)
                return unless character?
                return unless String.any(newState)?
                return unless character.isAnimX()
                if newState == 'base'
                    character.resetXAnimaState()
                else
                    character.switchToXAnimaState(newState)
            catch e
                AA.w e

        _.sendTurnTowardCharacter_RESP = (response) ->
            try
                return unless AA.Network.isAvailableForVisual(response)
                { character, x, y } = response.content
                character = AA.Network.unpackMapChar(character)
                character?.turnTowardCharacter( { x, y } )
            catch e
                AA.w e

        _.applyActionOnTarget_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { subject, skill, target } = response.content
                # * Мы брали запакованный Subject из Game_Action напрямую,
                # а там он так упакован (через AA.Utils)
                subject = AA.Utils.unpackAAEntity(subject)
                return unless subject?
                skill = AA.Utils.unpackAASkill(skill)
                return unless skill?
                action = new AABattleAction(subject, skill)
                target = AA.Network.unpackMapChar(target)
                return unless target?
                AABattleActionsManager._applyActionOnTarget(target, action)
            catch e
                AA.w e

        _.startAASkillOnMap_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                { subject, skill, targetPoint, uniqueId, direction, diagonalDir } = response.content
                subject = AA.Network.unpackMapChar(subject)
                return unless subject?
                subject.setDirection(direction)
                subject._diagonalDir = diagonalDir
                skill = AA.Utils.unpackAASkill(skill)
                return unless skill?
                $gameMap.startAASkill(skill, subject, targetPoint)
                # * Метод на gameMap () сохраняет последний созданный
                # * навык в $gameTemp.__lastAAMapSkill, чтобы можно
                # * было установить ID из сети (по индексу нельзя)
                if $gameTemp.__lastAAMapSkill?
                    $gameTemp.__lastAAMapSkill.setUniqueId(uniqueId)
                    $gameTemp.__lastAAMapSkill = null
            catch e
                AA.w e

        _.endAASkillOnMap_RESP = (response) ->
            try
                return unless AA.Network.isOnSameMap(response)
                uniqueId = response.content
                skill = $gameMap.aaMapSkills().find (s) -> s? and s.uniqueId == uniqueId
                return unless skill?
                # * Намеренно устанавливаем время в 0, чтобы удалился
                skill.totalFlyTime = 0
                skill.forceEndFromNetwork = true
            catch e
                AA.w e

    # * Общие методы отправки и приёма команд
    # * ======================================================================
    # -----------------------------------------------------------------------
    do ->
        # * Обработка ответа (команды) от сервера (общий метод)
        _.onServerCommand = (name, response) ->
            try
                return if SceneManager.isSceneChanging()
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
                return if SceneManager.isSceneChanging()
                # * Все команды только с карыт можно отправлять
                return unless KDCore.Utils.isSceneMap()
                nAPI.sendCustomCommand(
                    AA.Network.NETCmdPrefix + cmd,
                    AA.Network.createServCommand(content)
                )
            catch e
                AA.w e, "sendToServer"

# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------

