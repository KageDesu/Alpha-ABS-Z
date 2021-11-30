#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AIFlowMachine.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AIFlowMachine::

    _._createNetworkObserver = ->
        @netDataObserver = new DataObserver()
        @netDataObserver.setCheckInterval(10) #TODO: ???
        @_fillNetworkObserver()
        @netDataObserver.refreshAll(@)

    #TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    # * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = ->
        @netDataObserver.addFields(@, [
            "state"
            "prevState"
        ])

    _._updateDataObserver = ->
        return unless @netDataObserver?
        @netDataObserver.check(@)
        if @netDataObserver.isDataChanged()
            @dataObserverHaveChanges()
            @netDataObserver.refreshAll(@)
        return

    # * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = ->
        AANetworkManager.syncAIFlowMachineObserver(
            @id,
            @_getObserverDataForNetwork()
        )
        return

    _._getObserverDataForNetwork = -> @netDataObserver.getDataForNetwork(@)

    _.applyObserverData = (data) ->
        return unless @netDataObserver?
        @netDataObserver.setDataFromNetwork(@, data)
        return
    
    return
# ■ END AIFlowMachine.coffee
#---------------------------------------------------------------------------