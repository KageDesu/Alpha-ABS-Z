#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_TilingFrame.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    class Sprite_TilingLine extends AA.Sprite_TilingFrame
        constructor: () ->
            super(...arguments)

        #$[OVER BASE ALL BELOW]

        _fillPadding: -> 0
        _refreshTFrame: -> # * EMPTY
        _fillImagePartWidth: -> 4
        _fillImagePartHeight: -> 26



    AA.link Sprite_TilingLine
    return
# ■ END Sprite_TilingFrame.coffee
#---------------------------------------------------------------------------