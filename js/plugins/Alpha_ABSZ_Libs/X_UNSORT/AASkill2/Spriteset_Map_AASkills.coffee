#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    #@[ALIAS]
    ALIAS__createCharacters = _.createCharacters
    _.createCharacters = ->
        ALIAS__createCharacters.call(@)
        @aaCreateMapSkills()
        AA.EV.subscribeFor("MapSkillsRequestsClean", @_aaClearMapSkills.bind(@))
        return

    _.aaCreateMapSkills = ->
        @_aaMapSkills = []
        # * Создаём уже существующие (зарегестрированные) на карте
        for i in [0...$gameMap.aaMapSkills().length]
            @aaCreateNewMapSkill(i)
        return

    _.aaCreateNewMapSkill = (index) ->
        skill = $gameMap.aaMapSkills()[index]
        return unless skill?
        sprite = new Sprite_AAMapSkill2Projectile(index)
        @_aaMapSkills[index] = sprite
        @_tilemap.addChild(sprite)
        return

    #@[EVENT]
    _._aaClearMapSkills = ->
        for i in [0...$gameMap.aaMapSkills().length]
            if !@_aaMapSkills[i] || @_aaMapSkills[i].isEnd()
                @_tilemap.removeChild(@_aaMapSkills[i])
                @_aaMapSkills[i] = null
                $gameMap.aaMapSkills()[i] = null
        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------