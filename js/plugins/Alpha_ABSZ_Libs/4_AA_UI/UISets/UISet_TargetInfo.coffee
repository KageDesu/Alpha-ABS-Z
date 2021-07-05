# * Класс харинт UI выбранной (под курсором) цели и контроллеры

do ->

    class UISet_TargetInfo extends Sprite
        constructor: () ->
            super()
            # * Эти два поля обязательные для набора элементов интерфейса
            # * Они используются в методе _registerUISet в Spriteset UI
            @controllers = []
            @elements = []

            #TODO: register global event
            @_create()
            return

        refresh: ->

        update: ->
            super()
            c.update() for c in @controllers


    AA.link UISet_TargetInfo
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ UISet_TargetInfo.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.UISet_TargetInfo::

    _._create = ->
        @infoSpr = new AA.Sprite_EnemyInfo()
        @infoSpr.tag = "targetInfo" # * Это надо для управленя элементов через uAPI и редактор
        @infoSprCnt = new UITargetInfoController(@infoSpr)
        @infoSprCnt.tag = "targetInfo"
        @controllers.push @infoSprCnt
        @elements.push @infoSpr
        @addChild @infoSpr

    
    return
# ■ END UISet_TargetInfo.coffee
#---------------------------------------------------------------------------