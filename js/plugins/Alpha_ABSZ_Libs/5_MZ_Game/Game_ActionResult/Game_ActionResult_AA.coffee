#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_ActionResult.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_ActionResult::

    # * Запоминаем АБС навык, который был использован
    _.setUsedAASkill = (aaSkill) ->
        @_lastAASkill = aaSkill.idA

    _.getUsedAASkill = ->
        if @_lastAASkill?
            return AA.Utils.unpackAASkill(@_lastAASkill)
        else
            return null
    
    return
# ■ END Game_ActionResult.coffee
#---------------------------------------------------------------------------