#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    #TODO: Вынести это в отдельный плагин
    #TODO: change GOLD and visual notify (command125)

    # * Показывает Notify только когда игрок получает предмет именно через команду, а не
    # * через игровой процесс (смена экипировки и т.д.)

    #@[ALIAS]
    ALIAS__command126 = _.command126
    _.command126 = ->
        r = ALIAS__command126.call(@, ...arguments)
        $gameParty.pOnSomeItemBeenGained()
        return r

    #@[ALIAS]
    ALIAS__command127 = _.command126
    _.command127 = ->
        r = ALIAS__command127.call(@, ...arguments)
        $gameParty.pOnSomeItemBeenGained()
        return r

    #@[ALIAS]
    ALIAS__command128 = _.command126
    _.command128 = ->
        r = ALIAS__command128.call(@, ...arguments)
        $gameParty.pOnSomeItemBeenGained()
        return r
    
    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------