#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_Message.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_Message::

    #@[ALIAS]
    ALIAS__startMessage = _.startMessage
    _.startMessage = ->
        ALIAS__startMessage.call(@)
        AA.UI.onGameMessageStart()
        
    #@[ALIAS]
    ALIAS__terminateMessage = _.terminateMessage
    _.terminateMessage = ->
        ALIAS__terminateMessage.call(@)
        AA.UI.onGameMessageEnd()
    
    return
# ■ END Window_Message.coffee
#---------------------------------------------------------------------------