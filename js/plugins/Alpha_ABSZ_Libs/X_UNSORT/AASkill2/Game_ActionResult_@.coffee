#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_ActionResult.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_ActionResult::

    #@[ALIAS]
    ALIAS__clear = _.clear
    _.clear = ->
        ALIAS__clear.call(@)
        @_lastAASkill = null
        return

    _.setUsedAASkill = (aaSkill) ->
        @_lastAASkill = AA.Utils.packAASkill(aaSkill)

    _.getUsedAASkill = ->
        if @_lastAASkill?
            return AA.Utils.unpackAASkill(@_lastAASkill)
        else
            return null
        
    return
# ■ END Game_ActionResult.coffee
#---------------------------------------------------------------------------