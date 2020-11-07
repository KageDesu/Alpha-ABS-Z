#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Boot.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Boot::

    # * Загружаем и инициализируем систему АБС
    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        AA.System.initSystem()

    # * Загрузка шрифтов системы АБС
    #@[ALIAS]
    ALIAS__loadGameFonts = _.loadGameFonts
    _.loadGameFonts = ->
        ALIAS__loadGameFonts.call(@)
        AA.System.loadFonts()
        return

    # * Начальная настройка (и сброс) системы АБС
    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        ALIAS__start.call(@)
        AA.System.onGameDataLoaded()
        return
    
    return
# ■ END Scene_Boot.coffee
#---------------------------------------------------------------------------