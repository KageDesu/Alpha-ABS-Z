# * Глабольный менедреж управления персонажем в АБС

AA.Input = ->

# * Кнопки управления
AA.IKey = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Input

    # * Клавишы навыков (ячеек) для левой и правой кнопок мыши
    _.primarySkillSymbol = -> @skillPanelSymbols[0]
    _.secondarySkillSymbol = -> @skillPanelSymbols[1]
    # * Количество ячеек для навыков (и соответсвенно кнопок для них)
    # * Кнопки имеют имя SKL_(INDEX), от 0
    _.skillsSymbolsCount = -> @skillPanelSymbols.length

    _.getTriggeredSkillSymbol = ->
        for key in @__skillSymbols
            if Input.isTriggered(AA.IKey[key[0]])
                return key[1]
        return null

    _.init = (@settings) ->
        @_loadSkillPanelSymbols()
        @applyInputSettings()
        @applyKeybindings()
        "INIT ABS INPUT SUB SYSTEM".p()

    # * Загружаем кнопки, которые назначены для панели навыков
    _._loadSkillPanelSymbols = ->
        @skillPanelSymbols = AA.PP.getUISkillsItems().map (item) -> item.symbol

    # * Загружает данные с настроек плагина
    _.applyKeybindings = ->
        # * WASD нельзя переопределить из параметров
        @_asignKeyForAASymbol("ML", "a")
        @_asignKeyForAASymbol("MR", "d")
        @_asignKeyForAASymbol("MU", "w")
        @_asignKeyForAASymbol("MD", "s")
        @_asignDefaultActionsKeys()
        @_asingSkillPanelKeys()
        return
        
    _._asignKeyForAASymbol = (symbol, key) ->
        key = @convertUnsafeKey(key)
        AA.IKey[symbol] = key
        return

    _._asignDefaultActionsKeys = ->
        #@_asignKeyForAASymbol("ATK", @settings.kbAttack)
        #@_asignKeyForAASymbol("DEF", @settings.kbDefense)
        #@_asignKeyForAASymbol("TRS", @settings.kbSelectTarget)
        #@_asignKeyForAASymbol("TRR", @settings.kbResetTarget)
        #@_asignKeyForAASymbol("REL", @settings.kbReload)
        #@_asignKeyForAASymbol("CMD", @settings.kbCommandMenu)
        @_asignKeyForAASymbol("ROT", @settings.kbRotate)
        return

    _._asingSkillPanelKeys = ->
        # * Дополнительно присвоим для атак свои индтификаторы кнопок
        @_asignKeyForAASymbol("ATK1", @primarySkillSymbol())
        @_asignKeyForAASymbol("ATK2", @secondarySkillSymbol())
        # * Теперь для всех навыков (включая атаки тоже, дублируются)
        # * Для более быстрой проверки нажатия, отдельный массив
        @__skillSymbols = []
        for symb, index in @skillPanelSymbols
            key = "SKL_" + index
            @_asignKeyForAASymbol(key, symb)
            @__skillSymbols.push([key, symb])
        return

    # * Проверка на кнопки, которые переопределены RPG Maker'ом и не будут работать так
    _.convertUnsafeKey = (key) ->
        return '' unless key?
        key = key.toLowerCase()
        switch key
            when 'q'
                return 'pageup'
            when 'w'
                return 'pagedown'
            when 'x'
                return 'escape'
            when 'z', 'space'
                return 'ok'
            else
                return key

    _.applyInputSettings = ->
        @_applyMoveType()
        @_applyLMBMapTouchMode()
        @_applyRMBMapTouchMode()
        @_applyLMBTargetTouchMode()
        @_applyRMBTargetTouchMode()
        return

    _._applyMoveType = ->
        mt = @settings.moveType
        if mt.contains("WASD")
            @_applyWasdAndArrowMoveType()
        return

    # * Движение и на WASD и на стрелки
    _._applyWasdAndArrowMoveType = ->
        signXAA = ->
            x = 0
            x-- if @isPressed(AA.IKey.ML) || @isPressed("left")
            x++ if @isPressed(AA.IKey.MR ) || @isPressed("right")
            return x

        signYAA = ->
            y = 0
            y-- if @isPressed(AA.IKey.MU) || @isPressed("up")
            y++ if @isPressed(AA.IKey.MD) || @isPressed("down")
            return y

        #$[OVER]
        # * Переопределяет методы Input
        Input._signX = signXAA
        Input._signY = signYAA
        return

    # * Режим нажатия ЛЕВОЙ кнопкой мыши ПО КАРТЕ (без цели)
    #? 0 - Attack only
    #? 1 - Default (move)
    #? 2 - Nothing
    _._applyLMBMapTouchMode = ->
        _.LMBMapTouchMode = 1
        #TODO: parameters

    # * Режим нажатия ПРАВОЙ кнопкой мыши ПО КАРТЕ (без цели)
    #? 0 - Default (open menu)
    #? 1 - Attack only (second skill)
    #? 2 - Move
    #? 3 - Nothing
    _._applyRMBMapTouchMode = ->
        _.RMBMapTouchMode = 1
        #TODO: parameters

    #? 0 - Attack only
    #? 1 - Default (move)
    #? 2 - Smart attack
    #? 3 - Turn
    # * Режим нажатия ЛЕВОЙ кнопкой мыши ПО ЦЕЛИ
    _._applyLMBTargetTouchMode = ->
        _.LMBTargetTouchMode = 2
        #TODO: parameters

    #? 0 - Attack only
    #? 1 - Default (move)
    #? 2 - Smart attack
    #? 3 - Turn
    # * Режим нажатия ПРАВОЙ кнопкой мыши ПО ЦЕЛИ
    _._applyRMBTargetTouchMode = ->
        _.RMBTargetTouchMode = 2
        #TODO: parameters


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------