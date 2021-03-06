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

    # * Возвращяет спрайтсет карты (!Надо проверять сцену сперва)
    _.spriteset = () -> SceneManager._scene._spriteset

    _.aaIsMapAnimationRequested = () -> @aaMapAnimations.length > 0

    _.aaRequestMapAnimation = (x, y, animationId) ->
        return if animationId <= 0
        @aaMapAnimations.push({ x, y, animationId })
        return

    return
# ■ END Game_Map.coffee
#---------------------------------------------------------------------------