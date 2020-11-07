#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    # * Общие методы ABS
    # -----------------------------------------------------------------------
    
    # * Основной метод, является ли персонаж вообще ABS объектом
    _.isABS = -> @AAEntity()?

    _.AAEntity = -> @aaEntity

    _.initABS = ->

    _.stopABS = ->

    _.AABattler = -> @AAEntity()?.battler()

    _.AASprite = -> @AAEntity()?.sprite()

    _.inBattle = -> @AAEntity()?.inBattle()

    _.isActive = -> @isABS() && @AAEntity()?.isActive()
    
    _.onTurnEnd = ->

    _.isMyEnemy = (character) ->
        return false unless @isABS()
        return false unless character?
        return false unless character.isABS()
        @AAEntity().isMyEnemy(character.AAEntity())

    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------