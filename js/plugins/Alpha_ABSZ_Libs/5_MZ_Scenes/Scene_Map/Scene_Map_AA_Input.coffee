#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    # * Пользовательский ввод (управление ABS и игроком)
    # -----------------------------------------------------------------------
    _.aaUpdatePlayerInput = ->
        @aaUpdatePlayerInput()
        @aaUpdateCommonInput()
    
    _.aaUpdatePlayerInput = ->
        return unless $gamePlayer.canBeControlled()
        @aaUpdatePlayerInput_Rotation()
        @aaUpdatePlayerInput_ActionKeys()

    #TODO: Возможно стоит вынести методы на Game_Player, сами обработки, так как проврок много

    _.aaUpdatePlayerInput_ActionKeys = ->
        if Input.isTriggered(AA.IKey.ATK)
            $gamePlayer.aaPerformAttack()
            return
        if Input.isTriggered(AA.IKey.DEF)
            $gamePlayer.aaPerformDefense()
            return
        if Input.isTriggered(AA.IKey.REL)
            #TODO: reload firearm
            return
        if Input.isTriggered(AA.IKey.CMD)
            #TODO: AI command menu
            return
        # AA.EV.Subcribe(PlayerTarget, () -> )
        # AA.EV.Call(PlayerTarget)

    _.aaUpdatePlayerInput_Rotation = ->
        # * Чтобы не поворачивался во время анимации
        return unless $gamePlayer.canMove()
        if Input.isPressed(AA.IKey.ROT)
            switch AA.Input.RotateType
                when 2
                    rotateTarget = TouchInput.toMapPoint()
                when 1
                    #TODO: target
                    rotateTarget = window.__selected
                else
                    #TODO: target
                    if window.__selected?
                        rotateTarget = window.__selected
                    else
                        rotateTarget = TouchInput.toMapPoint()
            if rotateTarget?
                $gamePlayer.turnTowardCharacter(rotateTarget)
        return

    _.aaUpdateCommonInput = ->
        if Input.isTriggered(AA.IKey.TRS)
            #TODO: Nearest or next target select
            return
        if Input.isTriggered(AA.IKey.TRR)
            #TODO: Reset target
            @_aaResetPlayerTarget()
            return
        

    # * Обработка нажатия мыши (Touch) на карте (Левой)
    # -----------------------------------------------------------------------
    do ->
        _.onMapTouchAA = ->
            # * Стоит выбор целей на левую кнопку мыши (общий)
            if AA.Input.TargetSelectClick is 1
                # * Тут выбор цели на левую кнопку мыши игнорируется (он и так есть)
                if AA.Input.TouchMode isnt 2
                    @aaTrySelectTargetUnderTouch()
            switch AA.Input.TouchMode
                when 0 # * Attack only
                    $gamePlayer.aaTurnTowardTouchInput()
                    $gamePlayer.aaPerformAttack()
                when 2 # * Combined
                    console.log("combined")
                    @_combinedTouchProcess()
                else # * Movement only, other...
                    # * Default Moving to point
                    _.ALIAS__onMapTouch.call(@)
            return

        #TODO: REQUIRE Доделать и тесты
        # * Смешанный режим (как в АBS было)
        _._combinedTouchProcess = ->
            char = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
            if char?
                #TODO: if char == player target
                # * Если цель == цели игрока, то действие
                if char == window.__selected
                    # * Если ещё раз нажал на цель, если вне радиуса, то идти к цели
                    # * Если цель в радиусе атаки (и уже выбрана), то бить
                    console.log("CHECK ACTION, action or go")
                else
                    # * Нажал на цель, выбрать цель
                    @aaOnClickOnABSCharacter(char)
            else # * Если цели под курсором нет - идти просто
                if $gamePlayer.canBeControlled()
                    # * Default Moving to point
                    _.ALIAS__onMapTouch.call(@)
                return
            return

        # * Этот метод используется когда идёт просто выбор цели
        _.aaTrySelectTargetUnderTouch = ->
            "Target select".p()
            #TODO: возможно сравнить с текущей и не выбирать заного
            char = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
            @aaOnClickOnABSCharacter(char) if char?
            return

        _.aaGetABSEntityInPosition = (point) ->
            @_getABSEventOnPosition(point.x, point.y)

        _._getABSEventOnPosition = (x, y) -> $gameMap.eventsXyAA(x, y)?.first()
            
        _.aaOnClickOnABSCharacter = (char) ->
            try
                #TODO: debug only
                window.__selected = char
                "SELECTED ON MAP".p(char.AABattler().name()) if char?
                #AATargetsManager.setPlayerTarget char
                AA.UI.selectTargetOnMap(char)
            catch e
                AA.w e

    # * Обработка нажатия мыши (Touch) на карте (Правой)
    # -----------------------------------------------------------------------
    do ->

        # * Если вернуть true - то меню НЕ будет показано
        _.onMapCancelTouchAA = ->
            #TODO: тут проверки на открытые окна (инвентарь и т.д.)
            return @_targetSelectionCancelTouch()

        # * Обработка выбора или сброса целей на правую кнопку мыши
        # * Если вернуть true - то меню НЕ будет показано
        _._targetSelectionCancelTouch = ->
            # * Если стоит выбор цели на правую кнопку мышки
            if AA.Input.TargetSelectClick is 0 # * right select
                return @_onTargetSelectRMBProcess()
            else
                # * Если надо сбрасывать цель на RMB
                if AA.Input.isResetTargetOnRMB()
                    # * Если цель выбрана
                    if window.__selected?
                        @_aaResetPlayerTarget()
                        return true # * Не вызываем меню
                    else
                        # * Вызов меню
                        return !AA.Input.isOpenMenuByRMB()
                else
                    return !AA.Input.isOpenMenuByRMB()

        # * Обработка выбора цели правой кнопкой мыши
        # * Если вернуть true - то меню НЕ будет показано
        _._onTargetSelectRMBProcess = ->
            # * Если сбрасывать не надо, то просто выбор цели
            unless AA.Input.isResetTargetOnRMB()
                @aaTrySelectTargetUnderTouch()
                char = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
                unless char?
                    return !AA.Input.isOpenMenuByRMB()
                else
                    return true # * Если цель выбрана, то не открывать меню
            else
                # * Если надо сбрасывать, то смотрим есть ли кто-то под курсором
                char = @aaGetABSEntityInPosition(TouchInput.toMapPoint())
                unless char?
                    # * Если нету, то сброс цели
                    # * Используется условие, чтобы не вызывать меню если цель только была сброшена
                    if window.__selected?
                        @_aaResetPlayerTarget()
                        return true
                    # * Иначе, если и не было, то будет вызвано меню (если стоит опция)
                else
                    # * Если есть, то выбор цели
                    @aaTrySelectTargetUnderTouch()
            # * Если надо показывать меню по RMB
            if AA.Input.isOpenMenuByRMB()
                # * Если цель была выбрана, то не показывать меню
                if window.__selected?
                    return true
                else
                    # * Если нет (была сброшена, то показать)
                    return false
            else
                return true # * Не показываем меню

        # * Сбросить цель игрока
        _._aaResetPlayerTarget = ->
            #TODO: reset target
            #! Временный метод!!!
            window.__selected = null
            AA.UI.performCancelActionOnMap()

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------