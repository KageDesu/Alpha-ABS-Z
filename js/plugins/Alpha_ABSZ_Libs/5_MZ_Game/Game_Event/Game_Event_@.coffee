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