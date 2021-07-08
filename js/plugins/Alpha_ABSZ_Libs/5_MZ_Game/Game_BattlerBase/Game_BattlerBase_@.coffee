#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @initAASkills()
        return

    #@[ALIAS]
    ALIAS__canUse = _.canUse
    _.canUse = (item) ->
        if AA.isABS() and item.AASkill?
            return @canUseABSItem(item)
        else
            return ALIAS__canUse.call(@, item)

    # * АБС навыки не учитывают область действия, так как их можно использовать только на карте
    #@[ALIAS]
    ALIAS__isOccasionOk = _.isOccasionOk
    _.isOccasionOk = (item) ->
        if AA.isABS() and item.AASkill?
            return true
        else
            return ALIAS__isOccasionOk.call(@, item)

    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------