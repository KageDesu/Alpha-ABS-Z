# * Данный класс используется для AAEntity врагов на карте
class AAEnemyEntity extends AAEntity
    constructor: (@eventId) ->
        super()
        @_setupForNetwork() if AA.Network.isNetworkGame()

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
            @aaBattler = new AAEnemyBattler(@aaModel.enemyId, @eventId)
            @aaLogic = new EnemyAI_FlowMachine(@eventId)
        else
            # * Ничего
            # * Повторная инициализация (например после выхода из меню) не нужна
        return
