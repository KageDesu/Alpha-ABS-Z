#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #TODO: регистрация действий на персонаже?
    # Если вызвано действие, но данных нету, то надо пропускать, без ошибок!

    #@[DEFINES]
    _ = Game_Character::

    # * Система анимации XAnima
    # -----------------------------------------------------------------------
    do ->
        
        #@[FROM Game_CharacterBase]

        # * Персонаж использует XAnima
        _.isAnimX = -> @_isHaveAnimaX == true

        # * ID набора анимаций (по нему определяется имя папки)
        _.animXId = -> @_axId

        # * Есть ли Idle анимация у текущего состояния
        _.isHaveIdleAnimaX = -> @_axIdle()?

        # * Есть ли анимация для состояния
        _.isHaveAnimaXState = (state) -> @_axStates[state]?

        # * Находится ли анимация в действии
        _.isInAnimXAction = -> @isAnimX() and @getCurrentAnimX().isAction()

        # * Находится ли анимация в движении (имеется в виду moveSet)
        _.isInMovementAnimaX = -> @_axCurrent == @_axMovement()

        # * Есть ли Idle анимация у текущего состояния
        _.isInIdleAnimaX = -> @_axCurrent == @_axIdle()

        # * Когда запускается действие
        _.onAnimaXActionStart = ->
            @_xAnimaToIdleTimer = 0 # * Сбро таймера перехода в Idle

        # * Когда действие заканчивается
        _.onAnimaXActionEnd = -> @resetXAnima()

        # * Должен ли ждать завершения действия
        _.isShouldWaitAnimaXAction = ->
            return false if @isInMovementAnimaX()
            # * Если не в действии, то нет (т.к. нет действия)
            return false unless @isInAnimXAction()
            anima = @getCurrentAnimX()
            # * Idle тоже считается действием! Поэтому доп. проверка isAction
            return anima.isAction() and anima.isWait()

        # * Есть ли данное действие у текущей XAnima конфигурации
        _.isHaveAnimaXActionWithName = (name) ->
            @_axAvailableActionsList.contains(name)

        # -----------------------------------------------------------------------

        # * Текущий XAnimaSet
        _.getCurrentAnimX = -> @_axCurrent

        # * Запустить действие
        _.startAnimaXAction = (animX) -> @_axCurrent = animX

        # * Переключить состояние анимации (обычное, бой, и т.д.)
        _.switchToXAnimaState = (state) ->
            if @isHaveAnimaXState(state)
                @_axState = state
                @resetXAnima()
            else
                #KDCore.warning 'AnimaX Set for ' + state + ' not registed'
                @resetXAnimaState()
            return

        # * Инициализация
        # * Base состояние - стандартное, инициализируется всегда
        # * Если нет Base или нет movement, то не акитвируется система
        _.initAnimaX  = (@_axId, data) ->
            #@animaXParts = {}
            @_axAvailableActionsList = []
            @_axStates = {}
            @_axState = 'base' # * Базовое состояние
            @registerAnimaXState(@_axState, data)
            return unless @_axStates[@_axState]?
            @resetXAnima()
            @_isHaveAnimaX = true
            return

        # * Добавить анимацию для состояния
        _.registerAnimaXState = (state, data) ->
            try
                return unless data?
                moveSet = @_createAnimaXSetFromParams(0, state, data.move)
                # * moveSet обязателен!
                return unless moveSet?
                idleSet = @_createAnimaXSetFromParams(1, state, data.idle)
                if idleSet? && data.moveToIdleDelay?
                    idleSet.moveToIdleDelay = data.moveToIdleDelay
                # * idleSet - опционально
                @_createXAnimaSetsForState(state, moveSet, idleSet)
            catch e
                KDCore.warning e
                @_axStates[state] = null
            return

        # * Сбросить состояние до базового
        _.resetXAnimaState = ->
            @_axState = 'base'
            @resetXAnima()
            return

        # * Сбросить анимацию
        _.resetXAnima = ->
            @_inAnimXAction = false
            @_xAnimaToIdleTimer = 0
            @_setAnimaXToMovement()
            return

        # * Добавить действие (зарегестрировать, чтобы не было ошибок если вызвано, а нету файлов)
        _.registerAnimaXAction = (actionName) ->
            @_axAvailableActionsList.push actionName

        # -----------------------------------------------------------------------

        _._initMembersAnimaX = ->
            @_xAnimaPartsRequireRefresh = false
            @_xAnimaToIdleTimer = 0
            @_isHaveAnimaX = false

        _._createXAnimaSetsForState = (state, moveSet, idleSet) ->
            @_axStates[state] = {}
            moveSet.preLoad()
            @_axStates[state].moveSet = moveSet
            if idleSet?
                idleSet.isLoop = true
                idleSet.preLoad()
                @_axStates[state].idleSet = idleSet
            else
                @_axStates[state].idleSet = null
            return

        _._createAnimaXSetFromParams = (type, state, data) ->
            axSet = null
            try
                if type == 0
                    axSet = XAnimaTools.createXAnimaSetForMove(@animXId(), state, data) if data?
                else
                    axSet = XAnimaTools.createXAnimaSetForIdle(@animXId(), state, data) if data?
            catch e
                KDCore.warning e
                axSet = null
            return axSet

        _._updateAnimX = ->
            @_updateMovingAnimX()
            if @isHaveIdleAnimaX() && @isInMovementAnimaX()
                @_updateMoveIdleAnimaX()

        _._updateMovingAnimX = ->
            return unless @isMoving()
            @_xAnimaToIdleTimer = 0
            @resetXAnima() unless @isInMovementAnimaX()

        _._updateMoveIdleAnimaX = ->
            unless @isMoving()
                @_xAnimaToIdleTimer++
                if @_xAnimaToIdleTimer >= @_getAnimaXMoveToIdleDelay()
                    @_setAnimaXToIdle()

        _._getAnimaXMoveToIdleDelay = -> @_axIdle().moveToIdleDelay
        
        _._axMovement = -> @_axStates[@_axState].moveSet

        _._axIdle = -> @_axStates[@_axState].idleSet

        _._setAnimaXToIdle = -> @_axCurrent = @_axIdle()

        _._setAnimaXToMovement = -> @_axCurrent = @_axMovement()

        # * PARTS - NOT IMPLEMENTED

        _.isAnimXPartsChanged = -> false # * NOT IMPLEMENTED

        _.onAnimXPartsRefreshed = -> # * NOT IMPLEMENTED

        _.addNewXAnimPart = (id, partX) -> # * NOT IMPLEMENTED

        _.removeXAnimPart = (id) -> # * NOT IMPLEMENTED

        _.clearXAnimParts = -> # * NOT IMPLEMENTED

        return
    # -----------------------------------------------------------------------
    
    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------