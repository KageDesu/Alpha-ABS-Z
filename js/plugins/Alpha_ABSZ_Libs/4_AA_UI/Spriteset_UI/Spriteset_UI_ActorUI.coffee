#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_UI.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Spriteset_UI::

    _._createActorUI = ->
        @_createActorGauges()

    _._createActorGauges = ->
        @sActorGauges = new AA.UISet_ActorGauges(@)
        @_registerUISet(@sActorGauges) ## Spriteset_UI_0
    
    
    
    return
# ■ END Spriteset_UI.coffee
#---------------------------------------------------------------------------