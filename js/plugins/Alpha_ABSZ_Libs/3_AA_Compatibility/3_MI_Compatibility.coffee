#? Методы для улучшенной совместимости с MapInventory

#@[EXTENSION]
AA.extend ->

    # * Методы ниже даже не учитываются, если плагин не подключён
    return unless Imported.PKD_MapInventory is true

    #╒═════════════════════════════════════════════════════════════════════════╛
    # ■ PKD_MI.LIBS.MapChestController.coffee
    #╒═════════════════════════════════════════════════════════════════════════╛
    #---------------------------------------------------------------------------
    do ->
    
        #@[DEFINES]
        _ = PKD_MI.LIBS.MapChestController::
    
        #@[ALIAS]
        ALIAS___onGainItemFinal = _._onGainItemFinal
        _._onGainItemFinal = ->
            ALIAS___onGainItemFinal.call(@, ...arguments)
            AA.Utils.callDelayed($gameParty.pOnSomeItemBeenGained.bind($gameParty), 1)
            return
        
        return
    # ■ END PKD_MI.LIBS.MapChestController.coffee
    #---------------------------------------------------------------------------

    #╒═════════════════════════════════════════════════════════════════════════╛
    # ■ PKD_MI.LIBS.MapUserChestController.coffee
    #╒═════════════════════════════════════════════════════════════════════════╛
    #---------------------------------------------------------------------------
    do ->
    
        #@[DEFINES]
        _ = PKD_MI.LIBS.MapUserChestController::
    
        #@[ALIAS]
        ALIAS___onStoreItemFinal = _._onStoreItemFinal
        _._onStoreItemFinal = ->
            ALIAS___onStoreItemFinal.call(@, ...arguments)
            AA.Utils.callDelayed($gameParty.pOnSomeItemBeenGained.bind($gameParty), 1)
        
        return
    # ■ END PKD_MI.LIBS.MapUserChestController.coffee
    #---------------------------------------------------------------------------