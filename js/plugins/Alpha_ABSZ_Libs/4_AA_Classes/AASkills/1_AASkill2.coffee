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
#TODO: Навыки с ABS всегда есть на карте и в бою, а вот без ABS - нет на карте

#@[STORABLE]
class AASkill2
    constructor: (@aId) ->
        @_initBase()
        @_initMain()
        @_initOnMapSettings()
        @_initOtherSettings()
        @_initAnimationSettings()
        return
    
    isItem: -> AA.Utils.isAAItem(@aId)

    isSkill: -> !@isItem()

    databaseId: ->
        if @isItem()
            return @aId - AA.Utils.ItemsIDStart
        else
            return @aId

    # * Установить набор параметров из Note (принимает массив пар: имя - значение)
    setNoteParameters: (params) ->
        @[p[0]] = p[1] for p in params
        @_convertParameters()
        return
        
    animationId: ->
        if @hitAnimationId > 0
            return @hitAnimationId
        else
            return @dbItem().animationId

    dbItem: -> AA.Utils.getAASkillObject(@aId)

    # * Надо выбирать зону поражения для навыка
    isNeedSelectZone: -> @selectZone == 1 and @range > 0

    # * Нет "полёта", приминение сразу в точке (зоне поражения)
    isInstant: -> @speed <= 0

    # * Имеет направление (точка)
    isInPoint: -> @direction > 0

    # * Имеет конечную точку (летит прямо в точку)
    isInCertainPoint: -> @direction == 1

    # * Летит по направлению точки
    isInPointDirection: -> @direction == 2

    isNoContact: -> @noContact > 0

    # * Поражает только одну цель
    isSingleTargetArea: -> @radius <= 1

    isSelfAction: -> @range <= 0 and @isInstant()

    isHaveTimer: -> String.any(@reloadTime) || @reloadTime > 0

    # * Ближний бой = дистанция 1 и по направлению
    isMelee: -> !@isInPoint() && range == 1

    isForEnemies: -> @opponentsEffect is 1

    isForEnemiesOnly: -> @isForEnemies() and !@isForFriends()

    isForFriends: -> @friendlyEffect is 1

    isForFriendsOnly: -> @isForFriends() and !@isForEnemies()

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
        @reloadTime = 2
        @skillImg = ""
        @animaXAction = "Attack"
        @actionStartDelay = 10
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
    _._initBase = ->
        # * Область поражения (1 - Х)
        @radius = 1
        @range = 1
        #facing dir 0, point position 1, point direction 2
        @direction = 0
        @speed = 0
        return

    # * Основные АБС параметры навыка
    _._initMain = ->
        @friendlyEffect = 0 # * Еффект на дружественную команду (и себя)
        @opponentsEffect = 1 # * Еффект на противоположную команду
        # * В СЕКУНДАХ
        @reloadTime = 0 # * Данный параметр может быть строкой

    # * Настройки поведения на карте
    _._initOnMapSettings = ->
        @z = 3
        @selectZone = 0
        @skillImg = "bullet0(8,5)"
        @hitOffset = 28 #$gameMap.tileWidth() * 0.6
        # * Если 1, то навык срабатывает в конце своего пути в любом случае
        # * Если 0, то навык, НЕ достигнув цели, просто изчезнет
        @noContact = 0
        #TODO: to WIKI (+ image and example)
        @popUpStyleId = "" # * Default
        # * Дополнительная анимация (используется на АБС карте, используется взамен параметра из БД)
        @hitAnimationId = 0
        # * Если 1 , то в любом случае анимация будет на карте
        @animationOnMap = 0
        # * Непроходимые регионы
        @noPassRegions = []
        # * Непроходимые Terrain tags
        @noPassTerrains = []
        # * Селектор карты
        @_initSelector()
        return

    # * Параметры селектора на карте
    _._initSelector = ->
        @selectorColor = "#bf9324"#"#FF22AA"
        @selectorImg = null
        @selectorOpacity = 220#200

    # * Дополнительные настройки навыка
    _._initOtherSettings = ->
        @hideOutsideABS = 0

    # * Настройки анимации xAnima
    _._initAnimationSettings = ->
        @animaXAction = null
        @actionStartDelay = 0
    
    # * Преобразует некоторые параметры
    _._convertParameters = ->
        # * Из строки 1,2,3 в массив [1,2,3]
        @noPassRegions = AA.Utils.Parser.convertArrayFromParameter(@noPassRegions)
        @noPassTerrains = AA.Utils.Parser.convertArrayFromParameter(@noPassTerrains)
        return

    return
# ■ END AASkill2.coffee
#---------------------------------------------------------------------------