#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    #@[ALIAS]
    ALIAS__setup = _.setup
    _.setup = (mapId) ->
        # * Храним все навыки на карте
        @_aaMapSkills = []
        $gameTemp.aaProjYOff = $gameMap.tileWidth() * 0.25
        ALIAS__setup.call(@, mapId)
        return

    _.aaMapSkills = -> @_aaMapSkills

    # * Инициализировать (создать объект) навык на карте
    _.startAASkill = (aaSkill, subject, targetPoint) ->
        return unless aaSkill?
        #TODO: Возможно не надо полный навык хранить, а только ID из базы
        mapSkill = new AASkill2MapAction(aaSkill, subject, targetPoint)
        AANetworkManager.startAASkillOnMap(aaSkill, subject, targetPoint, mapSkill.uniqueId)
        @_registerNewAASkill(mapSkill)
        return

    # * Добавить навык
    _._registerNewAASkill = (skill) ->
        index = 0
        for i in [0...@_aaMapSkills.length]
            unless @_aaMapSkills[i]?
                index = i
                break
        @_aaMapSkills[index] = skill
        # * Запоминаем последний навык (если это сетевая игра и навык внешний)
        # * чтобы установить в него уникальный ID от сервера
        if AA.Network.isNetworkGame()
            $gameTemp.__lastAAMapSkill = skill
        "PROJECTILE REGISTRED ON MAP".p(index)
        if KDCore.Utils.isSceneMap()
            $gameMap.spriteset().aaCreateNewMapSkill(index)
        return

    
    
    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------