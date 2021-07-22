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

    # * Коэффицент скорости перемещения по диагонали
    _.diagonalSpeed = 0.8

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
        _.IsDiagonal = @settings.isDiagonalMovement
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
        @_asignKeyForAASymbol("REL", @settings.kbReload)
        @_asignKeyForAASymbol("CMD", @settings.kbCommandMenu)
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
        _.LMBMapTouchMode = 1 # * Deafult
        option = @settings.LMBMapTouchMode
        if option.contains("att")
            _.LMBMapTouchMode = 0
        else if option.contains("Noth")
            _.LMBMapTouchMode = 2
        return

    # * Режим нажатия ПРАВОЙ кнопкой мыши ПО КАРТЕ (без цели)
    #? 0 - Default (open menu)
    #? 1 - Attack only (second skill)
    #? 2 - Move
    #? 3 - Turn
    #? 4 - Nothing
    _._applyRMBMapTouchMode = ->
        _.RMBMapTouchMode = 0 # Default
        option = @settings.RMBMapTouchMode
        if option.contains("att")
            _.RMBMapTouchMode = 1
        else if option.contains("Mov")
            _.RMBMapTouchMode = 2
        else if option.contains("Tur")
            _.RMBMapTouchMode = 3
        else if option.contains("Noth")
            _.RMBMapTouchMode = 4
        return

    #? 0 - Attack only
    #? 1 - Default (move)
    #? 2 - Smart attack
    #? 3 - Turn
    # * Режим нажатия ЛЕВОЙ кнопкой мыши ПО ЦЕЛИ
    _._applyLMBTargetTouchMode = ->
        _.LMBTargetTouchMode = 1 # * Default
        option = @settings.LMBTargetTouchMode
        if option.contains("att")
            _.LMBTargetTouchMode = 0
        else if option.contains("Smar")
            _.LMBTargetTouchMode = 2
        else if option.contains("Tur")
            _.LMBTargetTouchMode = 3
        return

    #? 0 - Attack only
    #? 1 - Move
    #? 2 - Smart attack
    #? 3 - Turn
    # * Режим нажатия ПРАВОЙ кнопкой мыши ПО ЦЕЛИ
    _._applyRMBTargetTouchMode = ->
        _.RMBTargetTouchMode = 0 # * Attack only
        option = @settings.RMBTargetTouchMode
        if option.contains("Smart")
            _.RMBTargetTouchMode = 2
        else if option.contains("Mov")
            _.RMBTargetTouchMode = 1
        else if option.contains("Tur")
            _.RMBTargetTouchMode = 3
        return


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------