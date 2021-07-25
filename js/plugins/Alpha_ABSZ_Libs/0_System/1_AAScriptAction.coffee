# * Глабольный менедреж выполнения скриптовых действий
AA.SAaction = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #TODO:balloon icon и поддержка | черты для нескольких действи

    #@[DEFINES]
    _ = AA.SAaction

    _.ACTIONS = ["ss", "sw", "vr", "ce", "ap", "ev", "an", "ef", "se"]

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
            #TODO: all this stuff below
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

    # * ce_43, ce_11_bind (?)
    _.executeCommonEventAction = (action, char) ->
        args = action.split("_")
        return if args.length < 2
        ceId = parseInt(args[1])
        return if ceId <= 0
        if args[2]? and args[2] == "bind" and char instanceof Game_Event
            char?.aaStartCommonEvent(ceId)
        else
            $gameTemp.reserveCommonEvent(ceId)
        return

    # * ev_5 ; start event 5 on this map
    _.executeMapEventAction = (action) ->
        args = action.split("_")
        return if args.length < 2
        eventId = parseInt(args[1])
        return if eventId <= 0
        event = $gameMap.event(eventId)
        return unless event?
        event.start()
        return

    # * ap_viewRadius_5, ap_viewRadius_4_12 (evId)
    _.executeAIModelAction = (action, char) ->
        #TODO:

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
            eventId = parseInt(args[2])
            return if eventId <= 0
            event = $gameMap.event(eventId)
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
            else
                # TODO: доделать shake
        return

    _._executeEffect_Shatter = (args, char) ->
        dx = parseInt(args[2])
        dy = parseInt(args[3])
        if args[4]? # * evId
            #TODO: можно в метод вынести, похожий код
            eventId = parseInt(args[4])
            return if eventId <= 0
            event = $gameMap.event(eventId)
            return unless event?
            event.aaRequestShatterEffect(dx, dy)
        else # * char
            return unless char?
            char.aaRequestShatterEffect(dx, dy)
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

    return

