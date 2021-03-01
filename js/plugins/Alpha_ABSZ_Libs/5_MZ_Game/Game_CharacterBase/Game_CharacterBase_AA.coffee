#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    # * Общие методы ABS
    # -----------------------------------------------------------------------
    do ->
        # * Основной метод, является ли персонаж вообще ABS объектом
        _.isABS = -> @AAEntity()?

        _.AAEntity = -> @aaEntity

        _.initABS = ->
            #TODO: Не стартовать если параметр выключен?
            @aaEntity?.initABS()

        _.stopABS = ->

        _.AABattler = -> @AAEntity()?.battler()

        _.AASprite = -> @AAEntity()?.sprite()

        _.inBattle = -> @AAEntity()?.inBattle()

        _.isActive = -> @isABS() && @AAEntity()?.isActive()
        
        _.onTurnEnd = ->

        _.isMyEnemy = (character) ->
            return false unless @isABS()
            return false unless character?
            return false unless character.isABS()
            @AAEntity().isMyEnemy(character.AAEntity())

        _.AATarget = -> @AAEntity()?.getTarget()

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

    # -----------------------------------------------------------------------


    # * Добавим MaxTp чтобы Gauge контроллеры работали
    Object.defineProperties _, {
        mtp: {
            get: () -> @maxTp()
            configurable: true
        }
    }

    # * Добавляем метод canMove для всех персонажей
    # * В основном он нужен чтобы AAEntities не ходили во время XAnima
    _.canMove = ->
        if @isAnimX()
            # * Персонаж не может идти, если он выполняет действие анимации
            return false if @isAnimXIsBusy()
        else
            return true

    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------