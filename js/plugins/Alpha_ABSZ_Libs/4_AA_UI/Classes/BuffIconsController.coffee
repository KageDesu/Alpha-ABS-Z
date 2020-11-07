do ->
    # * Общий контроллер для отрисовки бафов персонажа (игрока)
    #?rev 17.10.20
    class BuffIconsController extends AA.UIElementController

        #* source - Game_Battler
        # * buffSprites - Sprite_ActorStateIcon (массив)
        constructor: (@buffSprites) ->
            super()
            @maxCount = Math.min(@buffSprites.length, 8)

        #TODO: Теперь значения в секундах храняться, учесть это!
        #TODO: refresh метод надо вызывать ВРУЧНУЮ когда добавляется или удаляется бафф


        # * Собирает индексы существующих баффов
        collectBuffs: ->
            buffs = []
            for i in [0...8]
                buffs.push(i) if @source._buffs[i] > 0
            return buffs

        # * Получает количество ходов (секунд) баффа
        collectBuffTurn: (buffIndex) -> @source._buffTurns[buffIndex]


    AA.link BuffIconsController
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.BuffIconsController::

    #$[OVER]
    _._setupThread = ->
        @createThread 30, 4

    #$[OVER]
    _._refresh = ->
        buffs = @collectBuffs()
        icons = @source.buffIcons()
        for i in [0...@maxCount]
            icon = icons[i]
            turns = @collectBuffTurn(buffs[i])
            @buffSprites[i]?.draw icon, turns
        return
        

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------