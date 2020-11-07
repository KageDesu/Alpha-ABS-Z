#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ImageManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ImageManager

    _.loadAnimaX = (filename) -> @loadBitmap('img/charactersAA/', filename)
    
    _.loadAA = (filename) -> @loadBitmap('img/AABS/', filename)

    return
# ■ END ImageManager.coffee
#---------------------------------------------------------------------------