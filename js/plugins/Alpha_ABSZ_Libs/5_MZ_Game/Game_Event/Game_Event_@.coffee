#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @aaInitExtraParams()

    #@[ALIAS]
    ALIAS__isCollidedWithEvents = _.isCollidedWithEvents
    _.isCollidedWithEvents = (x, y) ->
        # * АИ не учитывает события, которые выше или ниже по приоритету
        if @isABS()
            # * Собираем события в точке X, Y, которые с Normal Priority
            events = $gameMap.eventsXyNt(x, y).filter (ev) -> ev.isNormalPriority()
            # * Если таковых нет, то проходим (ниже и выше не учитываем)
            return false if events.length <= 0
            return @isNormalPriority() # * Если есть, то TRUE, если это событие тоже Normal Priority
        else
            return ALIAS__isCollidedWithEvents.call(@, x, y)
        
    #@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement
    _.updateSelfMovement = ->
        if @_moveType > 3
            @aaUpdateSelfMovementForAI()
        else
            ALIAS__updateSelfMovement.call(@)
    
    # * Система анимации XAnima
    # -----------------------------------------------------------------------
    do ->
        
        return
    # -----------------------------------------------------------------------


    # * Система AAEntity
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__setupPage = _.setupPage
        _.setupPage = ->
            ALIAS__setupPage.call(@)
            @aaCheckABSEventState()
            @aaCheckExtraParams()
            return

        #@[ALIAS]
        ALIAS__clearPageSettings = _.clearPageSettings
        _.clearPageSettings = ->
            ALIAS__clearPageSettings.call(@)
            @clearABS() if @isABS()

        return
    # -----------------------------------------------------------------------

    #@[ALIAS]
    ALIAS__list = _.list
    _.list = ->
        try
            # * Вызов общего события, которое было bind к этому событию (SActions)
            if @_aaExtraEventList?
                t = @_aaExtraEventList
                # * Один раз, поэтому зануляем
                @_aaExtraEventList = null
                # * Команда "Вызов Общего события" внутри этого события
                # * (Так можно использовать this. и есть _eventId)
                return [
                        {
                            code: 117
                            indent: 0
                            parameters: [t]
                        }
                    ]
        catch e
            AA.w e
        return ALIAS__list.call(@)

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------