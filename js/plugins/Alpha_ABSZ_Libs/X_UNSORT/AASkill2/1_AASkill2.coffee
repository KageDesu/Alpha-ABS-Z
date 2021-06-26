# * Класс АБС навыка (дейсвтия), может быть спелл или предмет
# * Содержки настройки навыка
# * Новая версия


# * Не требует цели совсем
# * Базируется на 4х основных парметрах


# * Базовое представление
# * 1 Активация, 2 выбор зоны применения, 3 эффект в зоне



# * 4 основных параметра:
# Расстояние (0 или X)
# Область поражения (1 или Radius (square))
# Направление (direction or point(cursor))
# Скорость (0 или Х) - если больше 0, то летит, если 0 то мнгновенно


# * Пока новый навык не умеет следовать за целью (возможно введу потом)

#TODO: Засунуть этот класс прямо к навыку $dataSkills[1].absSkill() -> этот класс

#TODO: DIRECTION SHOOT

#@[STORABLE]
class AASkill2
    constructor: (@databaseId, @isItem = false) ->
        @initMain()
        @initOnMapSettings()
        @initSelector()
    
    animationId: -> @dbItem().animationId

    dbItem: ->
        db = if @isItem is true then $dataItems else $dataSkills
        db[@databaseId]

    # * Надо выбирать зону поражения для навыка
    isNeedSelectZone: -> @isInPoint() and @range > 0

    # * Нет "полёта", приминение сразу в точке (зоне поражения)
    isInstantSpeed: -> @vSpeed <= 0

    # * Направление - в точку
    isInPoint: -> @direction == 1

    isNoContact: -> @noContact > 0

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
        # * Область поражения (0 - Х)
        @radius = 2
        @range = 4
        #facing dir 0, point 1
        @direction = 0
        @vSpeed = 3
        return

    # * Настройки поведения на карте
    _.initOnMapSettings = ->
        @z = 3
        @img = "bullet0(8,5)"
        @hitOffset = $gameMap.tileWidth() * 0.6
        # * Если 1, то навык срабатывает в конце своего пути в любом случае
        @noContact = 1
        return

    # * Параметры селектора на карте
    _.initSelector = ->
        @color = "#FF22AA"
        @image = null
        @opacity = 200

    
    return
# ■ END AASkill2.coffee
#---------------------------------------------------------------------------