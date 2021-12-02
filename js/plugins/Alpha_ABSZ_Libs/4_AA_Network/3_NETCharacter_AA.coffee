#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NETCharacter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
AA.Network.SetupNETCharacter = ->


    #@[DEFINES]
    _ = NETCharacter::

    #TODO: Синхронизировать Active состояние?

    #@[ALIAS]
    ALIAS__initMembersAABSZNET = _.initMembers
    _.initMembers = ->
        ALIAS__initMembersAABSZNET.call(@, ...arguments)
        # * Чтобы ID определился (Character_Base вызывает initMembers без ID)
        AA.Utils.callDelayed(@_initMembersABS.bind(@), 100)
        return

    #@[ALIAS]
    ALIAS__isABS = _.isABS
    _.isABS = ->
        ALIAS__isABS.call(@) and @playerData()? and @actor()?

    #$[OVER]
    # * Сам ничего не обновляет, принимает команду от сервера (если надо)
    _.aaUpdateABSAnimaXInBattleState = -> # * EMPTY

    # * =================================================================

    _._initMembersABS = ->
        return unless @id?
        @aaEntity = new AANetworkCharEntity(@id)
        @initABS()
        return
    
    return
# ■ END NETCharacter.coffee
#---------------------------------------------------------------------------