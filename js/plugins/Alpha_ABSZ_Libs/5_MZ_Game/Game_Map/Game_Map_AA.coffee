#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Map::

    # * Инициализация переменных ABS
    _.initABSMembers = ->
        @aaMapAnimations = []

    # * Проверка АБС событий и активация по требованию
    _.refreshABSMembers = ->
        for e in @eventsAA()
            e.initABS() if e.aaIsShouldBeReActivated()

    # * Когда карта загружена, происходит активация ABS событий
    _.initABS = () ->
        e.initABS() for e in @eventsAA()

    # * Все ABS события на карте
    _.eventsAA = () -> @events().filter (e) -> e.isABS()

    # * ABS события в указанной точке
    _.eventsXyAA = (x, y) ->
        try
            return @eventsXy(x, y).filter (e) -> e.isActive()
        catch e
            AA.w e
            return []

    # * ABS события в указанной точке (с учётом Extended Hit Box)
    _.eventsXyAAExt = (x, y) ->
        try
            return @eventsXyExt(x, y).filter (e) -> e.isActive()
        catch e
            AA.w e
            return []

    # * События в указанной точке (с учётом Extended Hit Box)
    _.eventsXyExt = (x, y) ->
        try
            return @events().filter (event) -> event.posExt(x, y)
        catch e
            AA.w e
            return []


    # * Возвращяет спрайтсет карты (!Надо проверять сцену сперва)
    _.spriteset = () -> SceneManager._scene._spriteset

    _.aaIsMapAnimationRequested = () -> @aaMapAnimations.length > 0

    _.aaRequestMapAnimation = (x, y, animationId) ->
        return if animationId <= 0
        @aaMapAnimations.push({ x, y, animationId })
        return

    # * Данный метод возвращает позиции с учётом расширенного HitBox
    _.aaGetExtendedPointsFor = (char) ->
        try
            positions = [ {
                    x: char.x,
                    y: char.y
                }]
            if char.aaIsHaveExtendedHitBoxes()
                extHitBoxes = char.aaGetExtendedHitBoxes()
                l = extHitBoxes[3]
                r = extHitBoxes[1]
                u = extHitBoxes[0]
                d = extHitBoxes[2]
                positions.push({ x: char.x + i, y: char.y }) for i in [1..r] if r > 0
                positions.push({ x: char.x - i, y: char.y }) for i in [1..l] if l > 0
                positions.push({ x: char.x, y: char.y - i }) for i in [1..u] if u > 0
                positions.push({ x: char.x, y: char.y + i }) for i in [1..d] if d > 0
        catch e
            AA.w e
        return positions

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------