#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    #TODO: WIKI создать страничку

    # * Управление АБС событиями
    # -----------------------------------------------------------------------
    do ->

        # * Изменить параметр АА события (врага)
        _.aaChangeAIParam = (paramName, newValue) ->
            try
                return if @eventId() <= 0
                char = $gameMap.event(@eventId())
                return unless char?
                return unless char.isABS()
                char.aaChangeModelParam(paramName, newValue)
            catch e
                AA.w e

        # * Выполнить SAction
        _.aaExecuteSAction = (action) ->
            try
                char = $gameMap.event(@eventId()) if @eventId() >= 0
                AA.SAaction.execute(action, char)
            catch e
                AA.w e

        # * Получить опыт с данного события "врага"
        _.aaGainExp = () ->
            try
                return if @eventId() <= 0
                uAPI.gainExpForEnemyEv(@eventId())
            catch e
                AA.w e
            return

    return
    # -----------------------------------------------------------------------
    
    
    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------