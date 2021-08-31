#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleSkill.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleSkill::

    # * Прячем ABS навыки из битвы со специальным флагом hideOutsideABS == 1
    #@[ALIAS]
    ALIAS__includes = _.includes
    _.includes = (item) ->
        isInclude = ALIAS__includes.call(@, item)
        if isInclude is true
            if AA.Utils.isAAObject(item)
                if item.AASkill.hideOutsideABS is 1
                    return false
        return isInclude
    
    return
# ■ END Window_BattleSkill.coffee
#---------------------------------------------------------------------------