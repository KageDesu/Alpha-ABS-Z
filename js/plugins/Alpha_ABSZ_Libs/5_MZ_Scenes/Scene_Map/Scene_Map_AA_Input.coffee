#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    # * Обработка нажатия мыши (Touch) на карте (Левой)
    # -----------------------------------------------------------------------
    do ->

        # * ТОЛЬКО левая кнопка мыши
        _.onMapTouchAA = ->
            #TODO: $gamePlayer.canBeControlled() ??? Надо или нет???
            # * Если игрок в режиме выбора зоны навыка, то активация навыка
            if $gamePlayer.isInSkillTargetingState()
                $gamePlayer.onSkillTargetSelected()
            else
                # * Новая система (без выбора целей)
                # * Обновим поиск цели под курсором
                @aaRefreshMouseDetection()
                # * Статичная атака при повороте
                if $gamePlayer.aaIsStaticAttackInRotation()
                    $gamePlayer.aaPerformPlayerAttack01(false)
                    return
                if $gameTemp._aaEventUnderCursor?
                    # * Нажатие по цели
                    @_aaOnTouchOnTarget()
                else
                    # * Нажатие по карте (просто)
                    @_aaOnTouchOnMapBasic()
            return

        _._aaOnTouchOnTarget = ->
            if AA.isDEV()
                char = $gameTemp._aaEventUnderCursor
                window.__selected = char
                "SELECTED ON MAP".p(char.AABattler().name()) if char?
            mode = AA.Input.LMBTargetTouchMode
            switch mode
                when 0 # * ATTACK ONLY
                    $gamePlayer.aaPerformPlayerAttack01(false)
                when 1 # * DEFAULT (move)
                    _.ALIAS__onMapTouch.call(@)
                when 2 # * SMART ATTACK
                    $gamePlayer.aaPerformPlayerAttack01(true)
                else # * 3, TURN
                    $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor)
            return

        _._aaOnTouchOnMapBasic = ->
            mode = AA.Input.LMBMapTouchMode
            if mode == 0 # * ATTACK ONLY
                $gamePlayer.aaPerformPlayerAttack01(false)
            else if mode == 1 # * DEFAULT (move)
                _.ALIAS__onMapTouch.call(@)
            else # mode == 2
                # * NOTHING, ничего
            return

        # TODO: Пока только события собирает
        _.aaGetABSEntityInPosition = (point) ->
            try
                events = $gameMap.eventsXyAA(point.x, point.y)
                return events.first() if events.length > 0
            catch e
                AA.w
            return null

        _.aaOnClickOnABSCharacter = (char) ->
            try
                $gamePlayer.aaTrySetTarget(char)
                #? DEBUG ONLY
                if AA.isDEV()
                    window.__selected = char
                    "SELECTED ON MAP".p(char.AABattler().name()) if char?
            catch e
                AA.w e

    # * Обработка нажатия мыши (Touch) на карте (Правой)
    # -----------------------------------------------------------------------
    do ->

        # * Если вернуть true - то меню НЕ будет показано
        _.onMapCancelTouchAA = ->
            # * инвернтарь, Hot бар и т.д.
            return true if AA.UI.isAnyUIElementTouchProcess()
            # * Отмена выбора зоны поражения навыка
            if $gamePlayer.isInSkillTargetingState()
                $gamePlayer.onSkillTargetCancel()
                return true
            # * Новая система (без выбора целей)
            # * Обновим поиск цели под курсором
            @aaRefreshMouseDetection()
            # * Статичная атака при повороте
            if $gamePlayer.aaIsStaticAttackInRotation()
                    $gamePlayer.aaPerformPlayerAttack02(false)
                    return true
            if $gameTemp._aaEventUnderCursor?
                # * Нажатие по цели
                isNotShowMenu = @_aaOnCancelTouchOnTarget()
            else
                # * Нажатие по карте (просто)
                isNotShowMenu = @_aaOnCancelTouchBasic()
            return isNotShowMenu

        _._aaOnCancelTouchOnTarget = ->
            mode = AA.Input.RMBTargetTouchMode
            switch mode
                when 0 # * ATTACK ONLY
                    $gamePlayer.aaPerformPlayerAttack02(false)
                    return true
                when 1 # * Move
                    _.ALIAS__onMapTouch.call(@)
                    return true
                when 2 # * SMART ATTACK
                    $gamePlayer.aaPerformPlayerAttack02(true)
                    return true
                when 3 # TURN
                    $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor)
                    return true
                else # * 4, MENU
                    return false

        _._aaOnCancelTouchBasic = ->
            mode = AA.Input.RMBMapTouchMode
            switch mode
                when 0 # * Menu
                    return false # * false - значит меню будет открыто
                when 1 # * Attack Secondary
                    $gamePlayer.aaPerformPlayerAttack02(false)
                    return true
                when 2 # * Move
                    _.ALIAS__onMapTouch.call(@)
                    return true
                when 3 # * Turn
                    $gamePlayer.turnTowardCharacter(TouchInput.toMapPoint())
                    return true
                else # * Nothing
                    return true

    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------