# * Глабольный менедреж выполнения скриптовых действий

#TODO: В ACore

AA.SAaction = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.SAaction

    _.ACTIONS = ["ss", "sw", "vr", "ce", "ap", "ev", "ef"]

    _.isProper = (actionLine) ->
        return false unless actionLine?
        return false if isFinite(actionLine)
        try
            parts = actionLine.split("_")
            cmd = parts[0]
        catch e
            AA.w e
            cmd = null
        return _.ACTIONS.contains(cmd)

    # * Выполнить AA Script Action
    # * Примеры:
    # ss_A_true_2 , ss_B_false, ss_C_false_3 (evId)
    # sw_43_true, sw_222_false
    # vr_54_2123, vr_44_9932
    # ce_43, ce_11_inner (?)
    # ap_viewRadius_5, ap_viewRadius_4_12 (evId)
    # ev_5 ; start event 5 on this map
    # an_4 (self), an_5_3 (evId), an_2_1_2 (x,y)
    # ef_shake_10, ef_shake_10_12 (evId), ef_shatter_4_4 (dx, dy), ef_shatter_4_4_2 (evId)

    _.execute = (action, char) ->
        return unless _.isProper(action)
        try
            cmd = action.split("_")[0]
            #TODO: all this stuff below
            switch cmd
                when "ss"
                    _.executeSelfSwitchAction(action, char)
                when "sw"
                    _.executeSwitchAction(action)
                when "vr"
                    _.executeVariableAction(action)
                when "ce"
                    _.executeCommonEventAction(action, char)
                when "ap"
                    _.executeAIModelAction(action, char)
                when "ev"
                    _.executeMapEventAction(action)
                when "an"
                    _.executeAnimationAction(action, char)
                when "ef"
                    _.executeEffectAction(action, char)
                else
                    AA.w "Unknown script action: " + action
        catch e
            AA.w e

    return
