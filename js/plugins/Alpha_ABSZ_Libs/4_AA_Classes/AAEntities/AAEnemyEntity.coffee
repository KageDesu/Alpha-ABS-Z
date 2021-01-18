# * Данный класс используется для AAEntity врагов на карте
class AAEnemyEntity extends AAEntity
    constructor: (@eventId) ->
        super()
        

    # * Группа у них 1, как и у стандартных врагов, чтобы враги их игнорировали
    teamId: -> 1

    character: -> $gameMap.event(@eventId)

    battler: -> @aaBattler

    isEnemy: -> true

    # * Настройки и параметры
    model: -> @aaModel

    initABS: ->
        super()
        #TODO: enemyId from?

        #TODO: Этот тут временно для показа

        modelId = 10

        if @eventId == 2
            modelId = 11
        else if @eventId == 3
            modelId = 12

        @aaBattler = new AAEnemyBattler(modelId)
        @aaModel = new AAEnemyModelData(modelId)