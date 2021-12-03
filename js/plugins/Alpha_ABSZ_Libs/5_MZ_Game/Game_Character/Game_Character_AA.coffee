#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    # * Методы ABS (Цель)
    # -----------------------------------------------------------------------
    do ->

        _.AATarget = -> @AAEntity()?.getTarget()

        #TODO: Это можно удалить

        # * Попытка установить активную цель
        _.aaTrySetTarget = (target) ->
            if @aaIsValidTargetToSet(target)
                @AAEntity()?.setTarget(target)
                return true
            return false
        
        # * Этот метод лучше переопределять у Game_Event и Game_Player
        _.aaIsValidTargetToSet = (target) -> false

        # * Есть ли активная цель?
        _.aaIsHaveTarget = -> @AATarget()?

    
    # * Методы ABS (Навыки)
    # -----------------------------------------------------------------------
    do ->



    # * Методы ABS (Движение)
    # -----------------------------------------------------------------------
    do ->
        _.aaTurnTowardTouchInput = ->
            @turnTowardCharacter(TouchInput.toMapPoint())
    
    # -----------------------------------------------------------------------

    # * Методы ABS (Бой и состояния)
    # -----------------------------------------------------------------------
    do ->
        # * Когда какое-либо действие было выполненно на мне
        _.aaOnActionOnMe = (action) ->

        # * Когда персонаж повержен
        # * Отличается от aaOnDeath так как тут надо давать бонусы победившему
        _.aaOnDefeat = ->

        # * Когда надо сменить состояние персонажа на Dead (вывести из АБС системы)
        _.aaOnDeath = ->

    # -----------------------------------------------------------------------

    return
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------