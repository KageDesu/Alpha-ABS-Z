#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAEnemyBattler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AAEnemyBattler::

    #$[OVER]
    _.dataObserverHaveChanges = ->
        AANetworkManager.syncAAEnemyBattlerObserver(@AACharacter(), @getObserverDataForNetwork())
        return

    return
# ■ END AAEnemyBattler.coffee
#---------------------------------------------------------------------------