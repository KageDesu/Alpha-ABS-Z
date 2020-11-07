#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

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