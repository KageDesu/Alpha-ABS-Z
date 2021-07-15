# * Данный класс используется для AAEntity врагов на карте
class AAEnemyEntity extends AAEntity
    constructor: (@eventId) ->
        super()

    # * Группа у них 1, как и у стандартных врагов, чтобы враги их игнорировали
    teamId: -> 1

    character: -> $gameMap.event(@eventId)

    battler: -> @aaBattler

    isEnemy: -> true

    logic: -> @aaLogic

    # * Настройки и параметры
    model: -> @aaModel

    initABS: ->
        unless @model()?
            super()
            # * Инициализация системы в первый раз
            @aaModel = new AAEnemyModelData(@eventId)
            @aaBattler = new AAEnemyBattler(@aaModel.enemyId)
            @aaLogic = new EnemyAI_FlowMachine(@eventId)
        else
            # * Повторная инициализация (например после выхода из меню)
            #TODO: resume ABS
        return