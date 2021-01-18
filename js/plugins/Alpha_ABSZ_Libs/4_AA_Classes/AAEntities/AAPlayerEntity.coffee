class AAPlayerEntity extends AAEntity
    constructor: () ->
        super()

    # * Номер команды игрока (и группы) всегда 0
    teamId: -> 0

    isPlayer: -> true

    character: -> $gamePlayer

    battler: -> $gameParty.leader()