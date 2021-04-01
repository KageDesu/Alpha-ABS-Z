do ->
    
    #TODO: Когда любой АИ персонаж попадает в "зону" выбора, он должен подсвечиваться whiten

    class Sprite_SkillImpactSelector extends KDCore.Sprite
        constructor: () ->
            super()
            @anchor.set(0.5)
            @visible = false
            @bitmap = new Bitmap(48, 48)
            @opacity = 200
            @fillAll()
            
        activate: (aaSkill) ->
            @visible = true
            #TODO: redraw depends on skill (radius, image?, color)
        
        deactivate: ->
            @visible = false

        update: ->
            super()
            return unless @visible
            @move TouchInput

    AA.link Sprite_SkillImpactSelector
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Sprite_SkillImpactSelector::



# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------
