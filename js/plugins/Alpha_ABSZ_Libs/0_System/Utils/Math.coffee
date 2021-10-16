#╒═════════════════════════════════════════════════════════════════════════╛
# ■ MATH.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils.Math
    AP = KDCore.Point

    # * Алтернативный метод, расчитаный на более быстрое вычисление (без создания Point)
    # * Используется в проверке коллизий Map AA Skills Projectiles
    _.getXYDistance = (x1, y1, x2, y2) -> Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

    # * Получить дистанцию между игроком и точкой (в масштабах карты)
    _.getDistanceMapPlayerPoint = (point) ->
        try
            return $gameMap.distance($gamePlayer.x, $gamePlayer.y, point.x, point.y)
        catch e
            AA.warning(e)
            return 0

    _.getProjectilePointByDirection = (startPoint, d) ->
        try
            "START POINT".p()
            console.info(startPoint)
            { x, y } = startPoint
            "FACE DIRECTION".p()
            # * Диагональное направление 8
            if [1, 3, 7, 9].contains(d)

                diagTable = {
                    1: [4, 2],
                    3: [6, 2],
                    7: [4, 8],
                    9: [6, 8]
                    }

                horVer = diagTable[d]
                px = $gameMap.roundXWithDirection(x, horVer[0])
                py = $gameMap.roundYWithDirection(y, horVer[1])
            else
                # * Обычное направление 4
                px = $gameMap.xWithDirection(x, d)
                py = $gameMap.yWithDirection(y, d)

            return new KDCore.Point(px, py)
        catch e
            return KDCore.Point.Empty

    return
# ■ END MATH.coffee
#---------------------------------------------------------------------------