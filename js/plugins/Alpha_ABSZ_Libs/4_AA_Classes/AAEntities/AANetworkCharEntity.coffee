class AANetworkCharEntity extends AAEntity
    constructor: (@netId) ->
        super()

    # * Номер команды игрока (и группы) всегда 0
    teamId: -> 0

    isNetChar: -> true

    # * Пока союзник
    #TODO: Динамически, когда PvP
    isAlly: -> true

    character: -> $gameMap.networkCharacterById(@netId)

    battler: -> @character()?.actor()
