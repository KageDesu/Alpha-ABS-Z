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
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @_updTest() #TODO: TEST

    _._updTest = ->
        return unless @eventId() == 2
        return unless Input.isTriggered('i')
        if AATargetsManager.isPlayerInRadius(@, 10)
            "IN RADIUS, check vision line".p()
            if AAVisionManager.isVisionLineIsFree(@, $gamePlayer)
                "VISION LINE IS FREE".p()
    
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

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------