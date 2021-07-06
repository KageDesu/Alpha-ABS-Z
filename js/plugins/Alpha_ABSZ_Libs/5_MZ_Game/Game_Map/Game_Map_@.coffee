#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        @initABSMembers()
    
    #@[ALIAS]
    ALIAS__refresh = _.refresh
    _.refresh = ->
        ALIAS__refresh.call(@)
        @refreshABSMembers()

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------