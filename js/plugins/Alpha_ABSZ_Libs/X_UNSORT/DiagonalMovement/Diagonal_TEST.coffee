#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

get8Dir = (d) ->
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

get4Dir = (horz, vert) ->
    return 1 if horz == 4 and vert == 2
    return 3 if horz == 6 and vert == 2
    return 7 if horz == 4 and vert == 8
    return 9 if horz == 6 and vert == 8
    0

do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    #@[ALIAS]
    ALIAS__moveStraight = _.moveStraight
    _.moveStraight = (d) ->
        @_diagonalDir = false
        ALIAS__moveStraight.call(@, d)
    
    #@[ALIAS]
    #ALIAS__setDirection = _.setDirection
    #_.setDirection = (d) ->
    #    #TODO:Это проверить
    #    if @_diagStraigten is true
    #        @_diagonalDir = false
    #    ALIAS__setDirection.call(@, d)


    #@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed
    _.realMoveSpeed = ->
        speed = ALIAS__realMoveSpeed.call(@)
        return if @_diagonalDir then speed * 0.9 else speed

    #$[OVER]
    _.moveDiagonally = (horz, vert) ->
        #TODO: optimaze norm -> вынести вниз else
        diag = @canPassDiagonally(@_x, @_y, horz, vert)
        norm = @canPass(@_x, @_y, horz) or @canPass(@_x, @_y, vert)
        if diag
            @_diagonalDir = get4Dir(horz, vert)
            @_x = $gameMap.roundXWithDirection(@_x, horz)
            @_y = $gameMap.roundYWithDirection(@_y, vert)
            @_realX = $gameMap.xWithDirection(@_x, @reverseDir(horz))
            @_realY = $gameMap.yWithDirection(@_y, @reverseDir(vert))
            @increaseSteps()
        else if norm
            @_diagonalDir = false
            @moveStraight(@getOtherDirection(horz, vert))
        #@_diagStraigten = false
        @setDirection horz if @_direction == @reverseDir(horz)
        @setDirection vert if @_direction == @reverseDir(vert)
        #@_diagStraigten = true
        return

    _.getOtherDirection = (horz, vert) -> if @canPass(@_x, @_y, horz) then horz else vert

    

    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    #$[OVER]
    _.canPassDiagonally = (x, y, horz, vert) ->
        #TODO: false unless parameter
        x2 = $gameMap.roundXWithDirection(x, horz)
        y2 = $gameMap.roundYWithDirection(y, vert)
        if @canPass(x, y, vert) && @canPass(x, y2, horz) &&
            @canPass(x, y, horz) && @canPass(x2, y, vert)
                return true
        return false
    
    #$[OVER]
    _.getInputDirection = -> Input.dir8
    
    #@[ALIAS]
    ALIAS__executeMove = _.executeMove
    _.executeMove = (direction) ->
        if direction % 2 is 0
            ALIAS__executeMove.call(@, direction)
        else if Math.abs(direction % 2) is 1
            [horz, vert] = get8Dir(direction)
            @moveDiagonally(horz, vert)
    
    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Character::

    #TODO: turnTowardCharacter
    
    #@[ALIAS]
    #$[OVER]
    ALIAS__findDirectionTo = _.findDirectionTo
    _.findDirectionTo = (goalX, goalY) ->
        #TODO: Параметр плагина который этот код добавляет или нет, если не используется 8 вай
        
        #ALIAS__findDirectionTo.call(@, goalX, goalY)

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
                [horz, vert] = get8Dir(direction)

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
# ■ END Game_Character.coffee
#---------------------------------------------------------------------------

