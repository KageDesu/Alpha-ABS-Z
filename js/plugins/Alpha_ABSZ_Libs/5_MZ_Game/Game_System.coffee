#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_System.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_System::

    # * Пользовательские настройки интерфейса
    # -----------------------------------------------------------------------
    do ->
        _.aaInitUserUISettings = ->
            @_aaUserUiSettings = new AAUserUISettings()

        _.aaGetUserUISettings = ->
            @aaInitUserUISettings() unless @_aaUserUiSettings?
            return @_aaUserUiSettings
        return
    # -----------------------------------------------------------------------
    
    

    return
# ■ END Game_System.coffee
#---------------------------------------------------------------------------