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

    #╒═════════════════════════════════════════════════════════════════════════╛
    # ■ Spriteset_InvUI.coffee
    #╒═════════════════════════════════════════════════════════════════════════╛
    #---------------------------------------------------------------------------
    do ->
    
        # * Возможность перетаскивания с инвентаря на панель навыков (только предметы)

        #@[DEFINES]
        _ = Spriteset_InvUI::
    
        return unless PKD_MI.isPro()

        #@[ALIAS]
        ALIAS___onReleaseDraggingCell = _._onRelaseDragginCell
        _._onRelaseDragginCell = ->
            symbol = AA.UI.getSkillSymbolUnderMouse()
            if String.any(symbol)
                if @_aaIsProperItemToPutInSkillPanelSlot()
                    uAPI.setItemToPanel(@_dragItem.id, symbol)
                else
                    SoundManager.playBuzzer()
                return
            ALIAS___onReleaseDraggingCell.call(@)

        #?[NEW]
        _._aaIsProperItemToPutInSkillPanelSlot = () ->
            DataManager.isItem(@_dragItem) && AA.Utils.isAAObject(@_dragItem)

        return
    # ■ END Spriteset_InvUI.coffee
    #---------------------------------------------------------------------------