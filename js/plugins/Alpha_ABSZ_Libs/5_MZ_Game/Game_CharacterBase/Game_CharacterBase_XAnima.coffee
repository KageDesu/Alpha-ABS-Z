#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    # * Система анимации XAnima
    # -----------------------------------------------------------------------
    do ->
        
        # * Персонаж использует XAnima
        _.isAnimX = -> false

        # * ID набора анимаций
        _.animXId = -> null

         # * Когда запускается действие
        _.onAnimaXActionStart = ->

        # * Когда действие заканчивается
        _.onAnimaXActionEnd = ->
        
        # * Находится ли анимация в действии
        _.isInAnimXAction = -> false

        # * Находится ли анимация в действии и необходимо ждать завершения
        _.isAnimXIsBusy = ->
            @isAnimX() && @isInAnimXAction() && @isShouldWaitAnimaXAction()

        # * Находится ли анимация в движении (имеется в виду moveSet)
        _.isInMovementAnimaX = -> false

        # * Находится ли анимация в Idle
        _.isInIdleAnimaX = -> false

        # * Есть ли Idle анимация у текущего состояния
        _.isHaveIdleAnimaX = -> false

        # * Есть ли анимация для состояния
        _.isHaveAnimaXState = -> false

        # * Есть ли данное действие у текущей XAnima конфигурации
        _.isHaveAnimaXActionWithName = -> false

        # * Должен ли ждать завершения действия
        _.isShouldWaitAnimaXAction = -> false

        return
    # -----------------------------------------------------------------------
    
    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------