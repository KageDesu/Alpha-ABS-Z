#TODO: Систематизация класса

class UITargetInfoController
    constructor: (@targetInfoSpr) ->
        AA.EV.subscribeFor("UnderMouseEventChanged", @gev_onUnderMouseEventChanged.bind(@))
        @_createSoControllers()
        @targetInfoSpr.visible = false
        return
    
    refresh: ->
        @gev_onUnderMouseEventChanged()

    setup: (@target) ->
        @hideTargetInfo() unless @target?
        @gaugeCnt.setup(@target.AABattler(), "hp", "mhp")
        @showTargetInfo()
        return

    hideTargetInfo: ->
        @targetInfoSpr.hideSlow()
        @target = null
        return

    showTargetInfo: () ->
        battler = @target.AABattler()
        #TODO: Values from enemy
        @targetInfoSpr.drawNameWithFormat(battler.name())
        #TODO: level from what?
        @targetInfoSpr.drawLevelWithFormat(1)
        model = @target.AAEntity().model()
        @targetInfoSpr.drawFace("Monster", 2)
        #TODO: battle state show and refresh by AI state
        @targetInfoSpr.showSlow()
        return

    update: ->
        return unless @targetInfoSpr.visible
        @gaugeCnt.update()
        return

    gev_onUnderMouseEventChanged: ->
        if $gameTemp._aaEventUnderCursor?
            if @target != $gameTemp._aaEventUnderCursor
                @setup($gameTemp._aaEventUnderCursor)
        else
            @hideTargetInfo()
        return

    _createSoControllers: ->
        @gaugeCnt = new AA.GaugeController(@targetInfoSpr.gauge)
        # * Используется свой метод для отрисовки значения (с форматом)
        @gaugeCnt.targetInfoSpr = @targetInfoSpr
        @gaugeCnt._refreshValues = ->
            rate = @value / @max
            @gaugeSprite.drawGauge(rate)
            @targetInfoSpr.drawHpWithFormat(@value, @max, rate)
        return
