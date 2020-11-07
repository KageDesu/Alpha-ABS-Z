# * Класс хранит все gauge игрока, отвечает за их работу

do ->

    # * В качестве аргумента получает класс интерфейса

    class UISet_ActorGauges extends Sprite
        constructor: () ->
            super()
            @controllers = []
            @elements = []
            @_create()
            @refresh()

        refresh: ->
            try
                @hpGauge?.setup($gameParty.leader(), 'hp', 'mhp')
                @mpGauge?.setup($gameParty.leader(), 'mp', 'mmp')
                @tpGauge?.setup($gameParty.leader(), 'tp', 'mtp')
            catch e
                KDCore.warning e

        update: ->
            super()
            c.update() for c in @controllers
    
    AA.link UISet_ActorGauges
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.UISet_ActorGauges::

    _._create = ->
        @hpGauge = @_createGauge("hpGauge")
        @tpGauge = @_createGauge("tpGauge")
        @mpGauge = @_createGauge("mpGauge")

    _._createGauge = (tag) ->
        try
            p = AA.PP.uiData(tag)
            gauge = new AA.Sprite_ActorStateGauge(p)
            gauge.tag = tag
            gaugeCnt = new AA.GaugeController(gauge)
            gaugeCnt.tag = tag
            @controllers.push gaugeCnt
            @elements.push gauge
            @addChild gauge
            return gaugeCnt
        catch e
            KDCore.warning e
            return null
        return

    return
# ■ END PRIVATE
#---------------------------------------------------------------------------