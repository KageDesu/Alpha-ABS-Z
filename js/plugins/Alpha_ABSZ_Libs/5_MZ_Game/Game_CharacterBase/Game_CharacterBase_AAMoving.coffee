#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    _.distTo = (point) -> $gameMap.distance(@x, @y, point.x, point.y)

    _.aaGetOtherDiagDirection = (horz, vert) -> if @canPass(@_x, @_y, horz) then horz else vert

    # * Находится ли на Х расстоянии к точке
    _.aaIsNearThePoint = (point, minDist = 1) ->
        try
            sx = Math.abs(@deltaXFrom point.x)
            sy = Math.abs(@deltaYFrom point.y)
            return (sx + sy) <= minDist
        catch e
            AA.w
            return false

    # * Двигаться к цели
    _.aaMoveTypeToTarget = ->
        try
            target = @AAEntity().getTarget()
            unless @aaIsNearThePoint(target)
                @aaMoveTypeToPoint(target)
            else
                @aaTurnTowardTarget()
        catch e
            AA.w e

    # * ОСНОВНОЙ метод
    # * Движение к точке карты
    _.aaMoveTypeToPoint = (point) ->
        try
            return unless point?
            if AA.Input.IsDiagonal is true
                direction = @aaFindDirectionToDiagonal(point.x, point.y)
                if direction % 2 is 0
                    @aaMoveToPointStraight(point)
                else if Math.abs(direction % 2) is 1
                    [horz, vert] = AA.Utils.get8Dir(direction)
                    @moveDiagonally(horz, vert)
                    #TODO: В ANETZ до версии 0.7 нет автосинхронизации диагонального движения
                    #TODO: УБРАТЬ ЭТО ПОТОМ!!
                    if AA.Network.isNetworkGame()
                        if @ instanceof Game_Event
                            if ANET.Version < 70
                                ANMapManager.sendEventMove(@eventId())
            else
                @aaMoveToPointStraight(point)
        catch e
            AA.w e

    # * Движение к точки (4 way only)
    _.aaMoveToPointStraight = (point) ->
        return unless point?
        dir = @findDirectionTo(point.x, point.y)
        @moveStraight(dir) if dir > 0
        return
            
    # * Повернуться к цели
    _.aaTurnTowardTarget = ->
        try
            target = @AAEntity().getTarget()
            return unless target?
            @turnTowardCharacter(target)
            # * Дополнительно синхронизируем поворот к цели
            # * (сама цель уже синхронизирована у события)
            if AA.Network.isNetworkGame()
                AANetworkManager.sendTurnTowardTarget(@)
        catch e
            AA.w e

    # * Поиск пути (диагональное движение)
    _.aaFindDirectionToDiagonal = (goalX, goalY) ->
        searchLimit = @searchLimit()
        mapWidth = $gameMap.width()
        nodeList = []
        openList = []
        closedList = []
        start = {}
        best = start
        return 0 if @x == goalX and @y == goalY

        start.parent = null
        start.x = @x
        start.y = @y
        start.g = 0
        start.f = $gameMap.distance(start.x, start.y, goalX, goalY)
        nodeList.push start
        openList.push start.y * mapWidth + start.x

        while nodeList.length > 0
            bestIndex = 0
            i = 0
            while i < nodeList.length
                if nodeList[i].f < nodeList[bestIndex].f
                    bestIndex = i
                i++
            current = nodeList[bestIndex]
            x1 = current.x
            y1 = current.y
            pos1 = y1 * mapWidth + x1
            g1 = current.g

            nodeList.splice bestIndex, 1
            openList.splice openList.indexOf(pos1), 1
            closedList.push pos1

            if current.x is goalX && current.y is goalY
                best = current
                goaled = true
                break
            
            continue if g1 >= searchLimit

            j = 0
            while j < 9
                direction = 1 + j
                if direction == 5
                    j++
                    continue

                diag = Math.abs(direction % 2) == 1
                [horz, vert] = AA.Utils.get8Dir(direction)

                if diag && @canPassDiagonally(x1, y1, horz, vert) && (@canPass(x1, y1, horz) || @canPass(x1, y1, vert))
                    x2 = $gameMap.roundXWithDirection(x1, horz)
                    y2 = $gameMap.roundYWithDirection(y1, vert)
                else if @canPass(x1, y1, direction)
                    x2 = $gameMap.roundXWithDirection(x1, direction)
                    y2 = $gameMap.roundYWithDirection(y1, direction)
                else
                    j++
                    continue
                
                pos2 = y2 * mapWidth + x2

                if closedList.contains(pos2)
                    j++
                    continue
                
                g2 = g1 + 1
                index2 = openList.indexOf(pos2)

                if (index2 < 0 || g2 < nodeList[index2].g)
                    if index2 >= 0
                        neighbor = nodeList[index2]
                    else
                        neighbor = {}
                        nodeList.push(neighbor)
                        openList.push(pos2)
                    
                    neighbor.parent = current
                    neighbor.x = x2
                    neighbor.y = y2
                    neighbor.g = g2
                    neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY)
                    if (!best || neighbor.f - neighbor.g < best.f - best.g)
                        best = neighbor
                j++

        node = best
        while node.parent && node.parent != start
            node = node.parent
        
        deltaX1 = $gameMap.deltaX(node.x, start.x)
        deltaY1 = $gameMap.deltaY(node.y, start.y)
        if deltaY1 > 0 and deltaX1 > 0
            return 3
        else if deltaY1 > 0 and deltaX1 < 0
            return 1
        else if deltaY1 < 0 and deltaX1 < 0
            return 7
        else if deltaY1 < 0 and deltaX1 > 0
            return 9
        
        if deltaY1 > 0
            return 2
        else if deltaX1 < 0
            return 4
        else if deltaX1 > 0
            return 6
        else if deltaY1 < 0
            return 8
        
        deltaX2 = @deltaXFrom(goalX)
        deltaY2 = @deltaYFrom(goalY)
        if Math.abs(deltaX2) > Math.abs(deltaY2)
            return if deltaX2 > 0 then 4 else 6
        else if deltaY2 != 0
            return if deltaY2 > 0 then 8 else 2
        return 0
    
    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------