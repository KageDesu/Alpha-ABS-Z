#╒═════════════════════════════════════════════════════════════════════════╛
# ■ COMMON.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils

    # * Общее
    # -----------------------------------------------------------------------
    do ->
        _.checkSwitch = (value) ->
            return false if isFinite(value)
            return KDCore.SDK.checkSwitch(value)

        _.isSamePointA = (point1, point2) -> point1[0] == point2[0] && point1[1] == point2[1]

        # * Является ли символ кнопкой панели навыков
        _.isSkillPanelSymbol = (symbol) ->
            return false unless String.any(symbol)
            symbols = AA.Input.skillPanelSymbols
            return symbols.contains(symbol)

        # * Получить значение опыта с врага (с учётом специальной переменной для опыта)
        _.getExpFromAAEnemy = (enemyDbData) ->
            try
                return 0 unless enemyDbData?
                if enemyDbData.AAEnemy?
                    param = enemyDbData.AAEnemy.find (p) -> p[0] == 'expVar'
                    if param?
                        expVarId = parseInt(param[1])
                        if expVarId? and expVarId > 0
                            return $gameVariables.value(expVarId)
                return enemyDbData.exp
            catch e
                AA.w e
                return 0

    # * Навыки и предметы
    # -----------------------------------------------------------------------
    do ->

        # * В ABS Z предметы и навыки имеют свои уникальные ID (поле idA)
        # * Это сделано так как предметы имели одинаковые ID что и навыки и было не удобно их различать
        # * Теперь предметы имеют idA = id + это значение
        _.ItemsIDStart = 9000

        # * Навык (или предмет) имеют AASkill данные в себе
        _.isAAObject = (skillIdOrObject) ->
            return false unless skillIdOrObject?
            if isFinite(skillIdOrObject)
                return false if skillIdOrObject <= 0
                skillIdOrObject = @getAASkillObject(skillIdOrObject)
            return skillIdOrObject.AASkill?

        _.isAASkill = (skillId) -> skillId <= @ItemsIDStart

        _.isAAItem = (skillId) -> skillId > @ItemsIDStart

        _.getAASkillObject = (skillId) ->
            return null if skillId <= 0
            if @isAAItem(skillId)
                return $dataItems[skillId - @ItemsIDStart]
            else
                return $dataSkills[skillId]

        # * Получить иконку оружия навыка атаки (или иконку навыка атаки, если нет оружия)
        _.getAttackSkillWeaponIconIndex = (skill, battler) ->
            try
                weapon = battler.weapons()[0]
                if weapon? and weapon.iconIndex > 0
                    return weapon.iconIndex
                else
                    return skill.iconIndex
            catch e
                AA.w e
                return 0

    # * Методы распаковки и запаковки данных для хранения и сохранения игры
    # -----------------------------------------------------------------------
    do ->
        _.unpackAASkill = (idA) ->
            object = @getAASkillObject(idA)
            if object?
                return object.AASkill
            else
                return null

        _.packAAPoint = (point) ->
            if point instanceof Game_Character
                return @packAAEntity(point)
            else
                x = point.x
                y = point.y
                return { x, y }

        _.unpackAAPoint = (data) ->
            if data.x?
                return new KDCore.Point(data.x, data.y)
            else
                return @unpackAAEntity(data)

        _.packAAEntity = (entity) ->
            return null unless entity?
            # * Для сетевой игры отдельный метод с учётом NetCharacter
            if AA.Network.isNetworkGame()
                return AA.Network.packMapChar(entity)
            else
                if entity == $gamePlayer
                    return { type: 0 }
                else if entity instanceof Game_Event
                    return { type: 1, id: entity.eventId(), mapId: $gameMap.mapId() }
                else # * PARTY MEMBER
                    # < 0 ?
                #    @subject = 1000 +
                #TODO: party member pack
                    #$gamePlayer.followers().follower(index), from 0 to 3
                    return { type: 2 }

        _.unpackAAEntity = (data) ->
            return null unless data?
            # * Для сетевой игры отдельный метод с учётом NetCharacter
            if AA.Network.isNetworkGame()
                return AA.Network.unpackMapChar(data)
            else
                switch data.type
                    when 0
                        return $gamePlayer
                    when 1
                        if $gameMap.mapId() == data.mapId
                            return $gameMap.event(data.id)
                        else
                            return null
                    when 2
                        #TODO: party member
                        return null
            return null


    # * Конвертирование направлений
    # -----------------------------------------------------------------------
    do ->

        _.get8Dir = (d) ->
            switch d
                when 1
                    [4, 2]
                when 3
                    [6, 2]
                when 7
                    [4, 8]
                when 9
                    [6, 8]
                else
                    [0, 0]

        _.get4Dir = (horz, vert) ->
            return 1 if horz == 4 and vert == 2
            return 3 if horz == 6 and vert == 2
            return 7 if horz == 4 and vert == 8
            return 9 if horz == 6 and vert == 8
            0

    return

# ■ END COMMON.coffee
#---------------------------------------------------------------------------