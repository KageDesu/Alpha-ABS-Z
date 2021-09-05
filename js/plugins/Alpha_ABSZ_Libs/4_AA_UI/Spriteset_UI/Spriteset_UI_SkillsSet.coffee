#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_UI.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Spriteset_UI::

    _._createSkillsSet = ->
        @sSkills = new AA.UISet_Skills(@)
        @_registerUISet(@sSkills) ## Spriteset_UI_0
    
    _._createSkillSelectorWindow = ->
        #TODO: Ширина и высота из параметров
        @fwSkillsSelector = new FWindow_SkillSelect(@, 160, 360)
        @_addElementToUI @fwSkillsSelector

    _._terminateSkillSelectorWindow = -> @fwSkillsSelector?.close()
    
    return
# ■ END Spriteset_UI.coffee
#---------------------------------------------------------------------------