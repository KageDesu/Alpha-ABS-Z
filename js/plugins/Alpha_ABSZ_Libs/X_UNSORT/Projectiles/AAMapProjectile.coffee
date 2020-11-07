#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAMapProjectile.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Класс для перемещения "Вектора" по карте

#@[STORABLE]
#@[GLOBAL]
class AAMapProjectile
    constructor: (@speed = 0.15) ->
        
    # * Если конечная точка движется, то можем обновить её
    setEndPoint: (p) -> @_endPoint = p

    # * Координаты в клетках карты
    start: (@p1, @_endPoint)  ->
        @_started = true
        @_myPoint = @p1
        @onStarted()

    # * Когда начал движение
    onStarted: ->
        "STARTED".p(@_myPoint.toString())

    # * Когда достигнул конечной точки
    onEndPointReach: ->
        "END".p(@_endPoint.toString())

    update: ->
        return unless @isStarted()
        return if @isDisposed()
        @_myPoint = AA.Utils.Math.moveTo @_myPoint, @_endPoint, @speed
        #"AT POINT".p(@_myPoint.toString())
        if @inEndPoint()
            @onEndPointReach()
            #@dispose()
        
    isStarted: -> @_started is true

    isDisposed: -> @_disposed is true

    # * Уничтожить (больше не обновляется, не летит)
    dispose: -> @_disposed = true

    # * В конечной точке?
    inEndPoint: -> AA.Utils.Math.inRect @_myPoint, @_getPointRect(@_endPoint, 0.5)

    # * Почти в конечной точке
    isNearToEndPoint: -> AA.Utils.Math.inRect @_myPoint, @_getPointRect(@_endPoint, 1)

    #TODO: В классе обёртке для Projectile
    # * Есть ли какой-нибудь Entity в клетке
    #getEntity: -> AAHelperAI.getAllInRange(@getMapCell(), 1)

    # * Получить клетку карты (координату)
    getMapCell: -> @_myPoint.round()

    # * Получить регион карты в текущей клетке
    getMapRegionID: ->
        p = @getMapCell()
        $gameMap.regionId(p.x, p.y)

    # * Получить угол поворота относительно точки P (Sprite)
    getRotation: (p) ->
        p2 = @_endPoint.convertToScreen()
        Math.atan2(p2.y - p.y, p2.x - p.x) # * 180 / Math.PI

    getCurrentRotation: -> @getRotation(@getScreenPoint())

    # * Получить текущую точку в координатах экрана (пикселях)
    getScreenPoint: -> @_myPoint.convertToScreen()

    # * Применить координаты и поворот к спрайту
    apply: (sprite) ->
        return if @isDisposed()
        p = @getScreenPoint()
        sprite.move p
        sprite.rotation = @getRotation(p)
        return

# ■ END AAMapProjectile.coffee
#---------------------------------------------------------------------------

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAMapProjectile.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AAMapProjectile::

    # * Получить область вокруг точки, где areaSize - размер границ
    _._getPointRect = (point, areaSize) ->
        new PIXI.Rectangle(point.x - areaSize, point.y - areaSize, 1 + areaSize, 1 + areaSize)
    

    return
# ■ END AAMapProjectile.coffee
#---------------------------------------------------------------------------