#╒═════════════════════════════════════════════════════════════════════════╛
# ■ COMMON.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils

    _.isAASkill = (skillIdOrSkill) ->
        if isFinite(skillIdOrSkill)
            return false if skillIdOrSkill <= 0
            skillIdOrSkill = $dataSkills[skillIdOrSkill]
        return skillIdOrSkill.AASkill?

    _.isAAItem = (itemIdOrItem) ->
        if isFinite(itemIdOrItem)
            return false if itemIdOrItem <= 0
            itemIdOrItem = $dataItems[skillIdOrSkill]
        return itemIdOrItem.AASkill?

    _.checkSwitch = (value) ->
        return false if isFinite(value)
        return KDCore.SDK.checkSwitch(value)

    _.isSamePointA = (point1, point2) -> point1[0] == point2[0] && point1[1] == point2[1]

    # * Является ли символ кнопкой панели навыков
    _.isSkillPanelSymbol = (symbol) ->
        return false unless String.any(symbol)
        symbols = AA.Input.skillPanelSymbols
        return symbols.contains(symbol)

    # * Методы распаковки и запаковки данных для хранения и сохранения игры

    _.packAASkill = (skill) -> skill.storeId()

    _.unpackAASkill = (data) -> AASkill2.FromStoreId(data)

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