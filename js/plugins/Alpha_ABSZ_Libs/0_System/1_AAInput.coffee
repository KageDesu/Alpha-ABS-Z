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

    # * Always reset target by right mouse click?
    _.isResetTargetOnRMB = -> @settings.targetReset is true

    # * Open menu by right mouse click?
    _.isOpenMenuByRMB = -> @settings.menuByRightClick is true


    _.init = (@settings) ->
        @applyInputSettings()
        @applyKeybindings()
        "INIT ABS INPUT".p()

    # * Загружает данные с настроек плагина
    _.applyKeybindings = ->
        # * WASD нельзя переопределить из параметров
        @_asignKeyForAASymbol("ML", "a")
        @_asignKeyForAASymbol("MR", "d")
        @_asignKeyForAASymbol("MU", "w")
        @_asignKeyForAASymbol("MD", "s")

        #TODO: Other keybinginds from parameters

        return
        
    _._asignKeyForAASymbol = (symbol, key) ->
        key = @convertUnsafeKey(key)
        AA.IKey[symbol] = key
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
        @_applyTouchMode()
        @_applyTargetSelectMode()
    
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

    # * Режим нажатия левой кнопки мыши
    _._applyTouchMode = ->
        _.TouchMode = 0 # * Attack only
        action = @settings.mouseAction
        if action.contains('Movement')
            _.TouchMode = 1
        else if action.contains('Combined')
            _.TouchMode = 2
        return

    _._applyTargetSelectMode = ->
        _.TargetSelectClick = 0 # * right
        if @settings.targetSelect.contains('Left')
            _.TargetSelectClick = 1 # * left
        return

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------