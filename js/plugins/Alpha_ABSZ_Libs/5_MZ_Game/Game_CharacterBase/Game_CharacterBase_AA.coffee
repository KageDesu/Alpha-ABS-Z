#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    # * Общие методы ABS
    # -----------------------------------------------------------------------
    do ->
        # * Основной метод, является ли персонаж вообще ABS объектом
        _.isABS = -> @AAEntity()?

        _.AAEntity = -> @aaEntity

        _.initABS = ->
            #TODO: Не стартовать если параметр выключен?
            @aaEntity?.initABS()
            @AASprite()?.initABS()

        _.stopABS = -> @AAEntity()?.stopABS()

        # * Полностью отключить (очистить) АБС режим у персонажа
        _.clearABS = ->
            @stopABS()
            @aaEntity = null

        _.AABattler = -> @AAEntity()?.battler()

        _.AASprite = -> @AAEntity()?.sprite()

        _.inBattle = -> @AAEntity()?.inBattle()

        _.isActive = -> @isABS() && @AAEntity()?.isActive()
        
        _.onTurnEnd = ->

        _.isMyEnemy = (character) ->
            return false unless @isABS()
            return false unless character?
            return false unless character.isABS()
            @AAEntity().isMyEnemy(character.AAEntity())

        # * Логика АБС (только если АБС включена)
        _.aaUpdateABS = ->
            @AABattler()?.aaUpdateABS()

    # -----------------------------------------------------------------------

    # * Эффекты спрайта (тряска и прочее)
    # -----------------------------------------------------------------------
    do ->

        _.aaClearCharacterEffects = ->
            # * Первое значение - время
            # * Второе значение DX (отклонение по X)
            @_aaShakeEffectData = [0, 0]
            # * [Запрос, массив данных для сохранения, флаг что надо создать части, DX, DY]
            #TODO: Сохранение не используется пока что
            @_aaShatterEffectData = [false, [], true, 0, 0]
            return

        _.aaMotionDX = -> @_aaShakeEffectData[1]

        _.aaRequestShakeEffect = (time = 10) -> @_aaShakeEffectData[0] = time

        _.aaIsShakeRequested = -> @_aaShakeEffectData[0] > 0

        _.aaIsShatterRequested = -> @_aaShatterEffectData[0] is true

        _.aaRequestShatterEffect = (dx = 0.5, dy = -4) ->
            @_aaShatterEffectData = [true, [], true, dx, dy]
            return

        _.aaOnShatterEffectCreated = ->
            @_aaShatterEffectData[0] = false

    # -----------------------------------------------------------------------

    # * Добавим MaxTp чтобы Gauge контроллеры работали
    Object.defineProperties _, {
        mtp: {
            get: () -> @maxTp()
            configurable: true
        }
    }

    # * Добавляем метод canMove для всех персонажей
    # * В основном он нужен чтобы AAEntities не ходили во время XAnima
    _.canMove = ->
        if @isAnimX()
            # * Персонаж не может идти, если он выполняет действие анимации
            return false if @isAnimXIsBusy()
        else
            return true

    # * Позиция с учётом расширенных HitBox
    # * Реализован отдельный метод, так как HitBox учитывается только при поражении навыками
    _.posExt = (x, y) ->
        if @aaIsHaveExtendedHitBoxes()
            l = @x - @_aaExtendedHitBox[3]
            r = @x + @_aaExtendedHitBox[1]
            u = @y - @_aaExtendedHitBox[0]
            d = @y + @_aaExtendedHitBox[2]
            return l <= x && x <= r && u <= y && y <= d
        else
            return @pos(x, y)

    # * Позиции X на экране, с учётом расширенных HitBox
    _.screenXExt = () ->
        points = [@screenX()]  # * базовая точка
        if @aaIsHaveExtendedHitBoxes()
            r = @_aaExtendedHitBox[1]
            l = @_aaExtendedHitBox[3]
            tw = $gameMap.tileWidth()
            # * Точка права (если есть)
            if r > 0
                for i in [1..r]
                    x = $gameMap.adjustX(@_realX + i)
                    x = Math.floor(x * tw + tw / 2)
                    points.push(x)
            # * Точка слева (если есть)
            if l > 0
                for i in [1..l]
                    x = $gameMap.adjustX(@_realX - i)
                    x = Math.floor(x * tw + tw / 2)
                    points.push(x)
        return points

    # * Позиции Y на экране, с учётом расширенных HitBox
    _.screenYExt = () ->
        points = [@screenY()]  # * базовая точка
        if @aaIsHaveExtendedHitBoxes()
            u = @_aaExtendedHitBox[0]
            d = @_aaExtendedHitBox[2]
            th = $gameMap.tileHeight()
            # * Точка снизу (если есть)
            if d > 0
                for i in [1..d]
                    y = $gameMap.adjustY(@_realY + i)
                    y = Math.floor(y * th + th - @shiftY() - @jumpHeight())
                    points.push(y)
            # * Точка сверху (если есть)
            if u > 0
                for i in [1..u]
                    y = $gameMap.adjustY(@_realY - i)
                    y = Math.floor(y * th + th - @shiftY() - @jumpHeight())
                    points.push(y)
        return points

    # * Есть ли у персонажа расширенные HitBox для АБС навыков
    _.aaIsHaveExtendedHitBoxes = -> @_aaExtendedHitBox?

    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------