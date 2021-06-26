# * Класс АБС навыка (дейсвтия), может быть спелл или предмет
# * Содержки настройки навыка
# * Новая версия - не требует целей


# * Не требует цели совсем
# * Базируется на 4х основных парметрах:
# Расстояние (0 или X)
# Область поражения (1 или Radius (square))
# Направление (direction or point(cursor))
# Скорость (0 или Х) - если больше 0, то летит, если 0 то мнгновенно


# * Пока новый навык не умеет следовать за целью (возможно введу потом)


#@[STORABLE]
class AASkill2
    constructor: (@databaseId, @isItem = false) ->
        @initMain()
        @initOnMapSettings()
        @initSelector()
    
    # * Установить набор параметров из Note (принимает массив пар: имя - значение)
    setNoteParameters: (params) ->
        @[p[0]] = p[1] for p in params
        return
        
    animationId: -> @dbItem().animationId

    dbItem: ->
        db = if @isItem is true then $dataItems else $dataSkills
        db[@databaseId]

    # * Надо выбирать зону поражения для навыка
    isNeedSelectZone: -> @isInPoint() and @range > 0

    # * Нет "полёта", приминение сразу в точке (зоне поражения)
    isInstant: -> @speed <= 0

    # * Направление - в точку
    isInPoint: -> @direction == 1

    isNoContact: -> @noContact > 0

    # * Поражает только одну цель
    isSingleTargetArea: -> @radius <= 1

    isSelfAction: -> @range <= 0 and @isInstant()

    # * Приминить стандартные настройки навыка 001 Атака
    applyDefaultAttack001: ->


    #TODO: splash damage (от каждой цели считается ещё доп. цели)
    #TODO: friendly fire

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AASkill2.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AASkill2::

    #custom action common ev,  switch, var (на любые события с Note)
    # события, которые могут пропускать через себя Proj, но выполнять действия

    # * Основные АБС параметры навыка
    _.initMain = ->
        # * Область поражения (1 - Х)
        @radius = 1
        @range = 1#4
        #facing dir 0, point 1
        @direction = 0
        @speed = 0#3
        return

    # * Настройки поведения на карте
    _.initOnMapSettings = ->
        @z = 3
        @skillImg = "bullet0(8,5)"
        @hitOffset = $gameMap.tileWidth() * 0.6
        # * Если 1, то навык срабатывает в конце своего пути в любом случае
        # * Если 0, то навык, не достигнув цели, просто изчезнет
        @noContact = 0
        return

    # * Параметры селектора на карте
    _.initSelector = ->
        @selectorColor = "#FF22AA"
        @selectorImg = null
        @selectorOpacity = 200

    
    return
# ■ END AASkill2.coffee
#---------------------------------------------------------------------------