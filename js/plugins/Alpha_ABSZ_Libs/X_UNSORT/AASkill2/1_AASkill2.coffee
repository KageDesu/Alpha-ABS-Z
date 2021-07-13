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

#TODO: АБС навыки могут быть и в обычной битве тоже, т.е. используется два вида настроек
#TODO: Нужен специальный коммент <hideOutsideABS:1>
#TODO: Навыки с ABS всегда есть на карте и в бою, а вот без ABS - нет на карте

#@[STORABLE]
class AASkill2
    constructor: (@databaseId, @isItem = false) ->
        @initBase()
        @initMain()
        @initOnMapSettings()
        @initSelector()
        @initOtherSettings()
        @initAnimationSettings()
        return
    
    # * Восстановить класс навыка из сохранённого ID (распаковка)
    @FromStoreId: (storeId) ->
        if storeId[1] == true
            return $dataItems[storeId[0]].AASkill
        else
            return $dataSkills[storeId[0]].AASkill

    # * ID для хранения навыка, чтобы не хранить весь класс (упаковка)
    storeId: -> [@databaseId, @isItem]

    # * Установить набор параметров из Note (принимает массив пар: имя - значение)
    setNoteParameters: (params) ->
        @[p[0]] = p[1] for p in params
        return
        
    animationId: ->
        if @hitAnimation > 0
            return hitAnimation
        else
            return @dbItem().animationId

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

    isHaveTimer: -> String.any(@reloadTime) || @reloadTime > 0

    # * Время перезарядки навыка (cooldown)
    getReloadTime: (battlerOrChar) ->
        if isFinite(@reloadTime)
            return @reloadTime
        else
            unless battlerOrChar?
                return 0
            else
                if battlerOrChar instanceof Game_Character
                    battlerOrChar = battlerOrChar.AABattler()
                return battlerOrChar.aaCalculateFormula(@reloadTime)

    # * Приминить стандартные настройки навыка 001 Атака
    applyDefaultAttack001: ->
        # * Ближний бой перед собой (контактный только)
        @radius = 1
        @range = 1
        @direction = 0
        @speed = 0
        @noContact = 0
        @skillImg = ""
        return


    #TODO: splash damage (от каждой цели считается ещё доп. цели)

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AASkill2.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AASkill2::

    #custom action common ev,  switch, var (на любые события с Note)
    # события, которые могут пропускать через себя Proj, но выполнять действия

    #TODO: shake effect strheng for target

    #TODO: animationFor: eachTarget, centerPoint

    # * Базовые (фундаментальные) АБС параметры навыка
    _.initBase = ->
        # * Область поражения (1 - Х)
        @radius = 4
        @range = 4
        #facing dir 0, point select 1
        @direction = 0
        @speed = 3
        return

    # * Основные АБС параметры навыка
    _.initMain = ->
        @friendlyEffect = 0 #TODO:
        @opponentsEffect = 1 # * Еффект на противоположную команду
        # * В СЕКУНДАХ
        @reloadTime = 0 # * Данный параметр может быть строкой

    # * Настройки поведения на карте
    _.initOnMapSettings = ->
        @z = 3
        @skillImg = "bullet0(8,5)"
        @hitOffset = $gameMap.tileWidth() * 0.6
        # * Если 1, то навык срабатывает в конце своего пути в любом случае
        # * Если 0, то навык, НЕ достигнув цели, просто изчезнет
        @noContact = 1
        @popUpStyleId = "" # * Default
        # * Дополнительная анимация (используется на АБС карте, используется взамен параметра из БД)
        @hitAnimation = 0
        return

    # * Параметры селектора на карте
    _.initSelector = ->
        @selectorColor = "#bf9324"#"#FF22AA"
        @selectorImg = "RadiusSelect"#null
        @selectorOpacity = 220#200

    # * Дополнительные настройки навыка
    _.initOtherSettings = ->
        @hideOutsideABS = 0

    # * Настройки анимации xAnima
    _.initAnimationSettings = ->
        @actionStartDelay = 10
        #TODO: delay before skill apply
    
    return
# ■ END AASkill2.coffee
#---------------------------------------------------------------------------