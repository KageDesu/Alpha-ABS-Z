#╒═════════════════════════════════════════════════════════════════════════╛
# ■ COMMON.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils

    _.isAASkill = (skillIdOrSkill) ->
        if isFinite(skillIdOrSkill)
            skillIdOrSkill = $dataSkills[skillIdOrSkill]
        return skillIdOrSkill.AASkill?

    _.isAAItem = (itemIdOrItem) ->
        if isFinite(itemIdOrItem)
            itemIdOrItem = $dataItems[skillIdOrSkill]
        return itemIdOrItem.AASkill?

    _.checkSwitch = (value) ->
        return false if isFinite(value)
        return KDCore.SDK.checkSwitch(value)

    _.isSamePointA = (point1, point2) -> point1[0] == point2[0] && point1[1] == point2[1]

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

    return

# ■ END COMMON.coffee
#---------------------------------------------------------------------------