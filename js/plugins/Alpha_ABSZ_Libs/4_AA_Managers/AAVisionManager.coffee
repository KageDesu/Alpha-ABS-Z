# * Менеджер по работе с визорами АИ

AAVisionManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AAVisionManager

    # * Проверка видимости между двумя точками (TRUE - видно точку)
    _.isVisionLineIsFree = (startPoint, endPoint) ->
        try
            dist = $gameMap.distance(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
            # * Если дистанция 1 (рядом), то значит на линии видимости не может быть помех
            return true if dist <= 1

            # * Количество точек проверок на линии
            # * Хватит точности 1 к 1, поэтому количество точек = дистанции
            allPoints = @getLineBetweenTwoPoints(startPoint, endPoint, dist)
            betweenPoints = []

            # * Убираем End и Start точки с результата
            # * Нам важно проверить путь между начальной и конечной точкой
            sP = [startPoint.x, startPoint.y]
            eP = [endPoint.x, endPoint.y]
            for p in allPoints
                if !AA.Utils.isSamePointA(p, sP) && !AA.Utils.isSamePointA(p, eP)
                    betweenPoints.push(p)
            
            # * Если между нет точек, то значит на линии видимости
            return true if betweenPoints.length == 0
            
            console.log(betweenPoints)

            for p in betweenPoints
                # * Если в точке находится объект (зона), что мешает зрению, значит false
                if @isPointIsColiderForVision(p[0], p[1])
                    return false

            return true

        catch e
            AA.w e
        return false

    # * Возвращает линию из точек между начальной и конечной точкой (включая начальную и конечную)
    _.getLineBetweenTwoPoints = (startPoint, endPoint, precission) ->
        try
            tw = $gameMap.tileWidth()

            sX = Number(startPoint.x * tw + tw / 2)
            sY = Number(startPoint.y * tw + tw / 2)
            eX = Number(endPoint.x * tw + tw / 2)
            eY = Number(endPoint.y * tw + tw / 2)

            points = []

            for i in [1..precission]
                k = (i / precission)
                px = (k * (eX - sX) + sX)
                py = (k * (eY - sY) + sY)
                cpx = Math.floor(px / $gameMap.tileWidth())
                cpy = Math.floor(py / $gameMap.tileHeight())
                points.push([cpx, cpy])

            return points
        catch e
            AA.w e
        return []

    # * Находится ли в данной точке карты что-либо, что мешает видимости
    # * TRUE - нельзя "видеть" через эту точку
    _.isPointIsColiderForVision = (x, y) ->
        try
            #TODO: каждоый враг имеет свой набор или общий набор регионов???
            noVisionRegions = []
            noVisionTerrains = []
            return true if noVisionRegions.contains($gameMap.regionId(x, y))
            return true if noVisionTerrains.contains($gameMap.terrainTag(x, y))
            # * События с расширенными HitBox участвуют в области видимости
            events = $gameMap.eventsXyExt(x, y)
            return false if events.isEmpty()
            # * Если хоть один блокирует, то значит заблокирована видимость
            return events.some (e) -> e.aaIsBlockVision()
        catch e
            AA.w e
        return true


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------

