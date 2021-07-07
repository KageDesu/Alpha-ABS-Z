# * Класс подсветки (вокруг) ячейки быстрого доступа
#rev 07.07.21
do ->

    class Sprite_SkillPanelOutline extends AA.Sprite_UIImage
        constructor: () ->
            super(...arguments)
            @visible = false

        defaultParams: -> {
            visible: true
            image: "SkillSlot_Outline"
        }

        show: (colorArr) ->
            @visible = true
            @_changer = null if @_changer?
            @setBlendColor(colorArr)
            @opacity = 255
            return

        hide: () ->
            @_changer = null if @_changer?
            @visible = false

        pulse: (colorArr, speed) ->
            @show(colorArr)
            @opacity = 0
            @_changer = new AA.Changer(@)
            @_changer.change('opacity').from(0).to(255).step(speed).repeat(2).reverse()
            @_changer.start().done( () => @hide())
            return

        update: ->
            super()
            @_changer?.update()
        

    AA.link Sprite_SkillPanelOutline
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SkillPanelOutline::



    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------