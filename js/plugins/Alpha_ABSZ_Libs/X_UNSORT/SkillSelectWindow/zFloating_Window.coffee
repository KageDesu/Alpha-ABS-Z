#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Floating Window.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #TODO: В ACore

    #@[DEFINES]
    _ = AA.FloatingWindow::

    _._createParts = () ->
        @_createLayers()
        @_loadHeader()
        @_createCloseButton()
        @_moveToStartPosition()
        @_createCustomElements()
        return

    # * Содание прочих элементов окна (для наследников)
    _._createCustomElements = -> # * EMTPY
    
    #TODO: _createContent удалить и этот _createCustomElements заместо него

    return
# ■ END Floating Window.coffee
#---------------------------------------------------------------------------