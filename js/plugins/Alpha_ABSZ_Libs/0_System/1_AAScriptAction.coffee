# * Глабольный менедреж выполнения скриптовых действий
AA.SAaction = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.SAaction

    _.ACTIONS = ["ss", "sw", "vr", "ce", "ap", "ev", "an", "ef", "se", "ba"]

    _.isProper = (actionLine) ->
        return false unless actionLine?
        return false if isFinite(actionLine)
        try
            parts = actionLine.split("_")
            cmd = parts[0]
        catch e
            AA.w e
            cmd = null
        return _.ACTIONS.contains(cmd)

    #?MAIN OUTER (Основной метод вызова)
    # * Выполнить AA Script Action
    _.execute = (action, char) ->
        return unless _.isProper(action)
        try
            cmd = action.split("_")[0]
            switch cmd
                when "ss"
                    _.executeSelfSwitchAction(action, char)
                when "sw"
                    _.executeSwitchAction(action)
                when "vr"
                    _.executeVariableAction(action)
                when "ce"
                    _.executeCommonEventAction(action, char)
                when "ap"
                    _.executeAIModelAction(action, char)
                when "ev"
                    _.executeMapEventAction(action)
                when "an"
                    _.executeAnimationAction(action, char)
                when "ef"
                    _.executeEffectAction(action, char)
                when "se"
                    _.executeSESoundAction(action)
                when "ba"
                    _.executeBallonIcon(action, char)
                else
                    AA.w "Unknown script action: " + action
        catch e
            AA.w e

    # * ss_A_true_2 , ss_B_false, ss_C_false_3 (evId)
    _.executeSelfSwitchAction = (action, char) ->
        args = action.split("_")
        return if args.length < 3
        switchId = args[1]
        return unless AA.Utils.checkSwitch(switchId)
        switchState = Boolean(args[2].toLowerCase())
        if args[3]?
            evId = parseInt(args[3])
        else
            return unless char?
            return unless char.eventId?
            evId = char.eventId()
        key = [$gameMap.mapId(), evId, switchId]
        $gameSelfSwitches.setValue(key, switchState)
        return

    # * sw_43_true, sw_222_false
    _.executeSwitchAction = (action) ->
        args = action.split("_")
        return if args.length < 3
        switchId = parseInt(args[1])
        return if switchId <= 0
        switchState = Boolean(args[2].toLowerCase())
        $gameSwitches.setValue(switchId, switchState)
        return

    # * vr_54_2123, vr_44_9932
    _.executeVariableAction = (action) ->
        args = action.split("_")
        return if args.length < 3
        varId = parseInt(args[1])
        return if varId <= 0
        value = args[2]
        value = parseInt(value) if isFinite(value)
        $gameVariables.setValue(varId, value)
        return

    # * ce_43, ce_11_this (?)
    _.executeCommonEventAction = (action, char) ->
        args = action.split("_")
        return if args.length < 2
        ceId = parseInt(args[1])
        return if ceId <= 0
        if args[2]? and args[2] == "this" and char instanceof Game_Event
            char?.aaStartCommonEvent(ceId)
        else
            $gameTemp.reserveCommonEvent(ceId)
        return

    # * ev_5 ; start event 5 on this map
    _.executeMapEventAction = (action) ->
        args = action.split("_")
        return if args.length < 2
        event = @_getEventByArgId(args[1])
        event?.start()
        return

    _._getEventByArgId = (argX) ->
        eventId = parseInt(argX)
        return null if eventId <= 0
        return $gameMap.event(eventId)

    # * ap_viewRadius_5, ap_viewRadius_4_12 (evId)
    _.executeAIModelAction = (action, char) ->
        args = action.split("_")
        return if args.length < 2
        paramName = args[1]
        return unless String.any(paramName)
        paramValue = args[2]
        # * Преобразование числа
        paramValue = Number(paramValue) if isFinite(paramValue)
        #TODO: Как быть с массивами данных??? approachMoveData
        if args[3]? # * evId
            event = @_getEventByArgId(args[4])
            return unless event?
            char = event
        # * char
        return unless char?
        return unless char.isABS()
        char.aaChangeModelParam(paramName, paramValue)
        return

    # * an_4 (self), an_5_3 (evId), an_2_1_2 (x,y)
    _.executeAnimationAction = (action, char) ->
        args = action.split("_")
        return if args.length < 2
        animationId = parseInt(args[1])
        return if animationId <= 0
        # * x, y
        if args[3]?
            mapX = parseInt(args[2])
            mapY = parseInt(args[3])
            AABattleActionsManager.playAnimationOnMap(mapX, mapY, animationId)
        else if args[2]? # * eventId
            event = @_getEventByArgId(args[2])
            return unless event?
            AABattleActionsManager.playAnimationOnCharacter(event, animationId)
        else # * on self
            return unless char?
            AABattleActionsManager.playAnimationOnCharacter(char, animationId)
        return

    # * ef_shake_10, ef_shake_10_12 (evId)
    # * ef_shatter_4_4 (dx, dy), ef_shatter_4_4_2 (evId)
    _.executeEffectAction = (action, char) ->
        args = action.split("_")
        return if args.length < 3
        effectName = args[1]
        switch effectName
            when "shatter"
                _._executeEffect_Shatter(args, char)
            when "shake"
                _._executeEffect_Shake(args, char)
            else
                AA.w("SAction: effect " + effectName + " not registred in ABS")
        return

    _._executeEffect_Shatter = (args, char) ->
        dx = parseInt(args[2])
        dy = parseInt(args[3])
        if args[4]? # * evId
            event = @_getEventByArgId(args[4])
            event?.aaRequestShatterEffect(dx, dy)
        else # * char
            char?.aaRequestShatterEffect(dx, dy)
        return

    _._executeEffect_Shake = (args, char) ->
        time = parseInt(args[2])
        if args[3]? # * evId
            event = @_getEventByArgId(args[3])
            event?.aaRequestShakeEffect(time)
        else # * char
            char?.aaRequestShakeEffect(time)
        return

    # * se_Bell1_90_100 (volume, pitch)
    _.executeSESoundAction = (action) ->
        args = action.split("_")
        return if args.length < 2
        name = args[1]
        return unless String.any(name)
        # * volume and pitch - не обязательные
        if args[2]?
            volume = parseInt(args[2])
            pitch = parseInt(args[3]) if args[3]
        KDCore.Utils.playSE(name, volume, pitch)
        return

    # * ba_1, ba_2_4 (evId)
    _.executeBallonIcon = (action, char) ->
        args = action.split("_")
        return if args.length < 2
        balloonId = parseInt(args[1])
        if args[2]? # * evId
            char = @_getEventByArgId(args[2])
        $gameTemp.requestBalloon(char, balloonId) if char?
        return

    return

