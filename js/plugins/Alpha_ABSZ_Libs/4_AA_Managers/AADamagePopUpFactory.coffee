# * Методы формирования Damage PopUp на персонаже

AADamagePopUpFactory = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AADamagePopUpFactory

    _.createDamagePopUpData = (battler) ->
        result = battler.result()
        if result.missed or result.evaded
            return @_createMiss()
        else if result.hpAffected
            return @_createHpDamage(result, battler.isEnemy())
        else if battler.isAlive() and result.mpDamage isnt 0
            return @_createMpDamage(result)
        return null # * Нет ничего

    #TODO: Miss Вынести в словарь (параметры плагина)
    _._createMiss = () -> @_createFromSettings("Miss_For_All", "Miss")

    _._createFromSettings = (styleId, value) ->
        return {
                settings: AA.PP.getPopUpDamageSettings(styleId),
                value: value
            }

    _._createHpDamage = (result, isEnemy) ->
        isHeal = result.hpDamage < 0
        value = @_convertValue(result.hpDamage)
        if @_isHaveSpecialStyle(result)
            return @_createFromSettings(result.getUsedAASkill().popUpStyleId, value)
        else
            if isHeal is true
                return @_createFromSettings("Heal_For_All", value)
            else
                if isEnemy
                    styleId = "Damage_HP_For_Enemy"
                else
                    styleId = "Damage_HP_For_Player"
                styleId += "_Critical" if result.critical
                return @_createFromSettings(styleId, value)

    _._createMpDamage = (result) ->
        isHeal = result.mpDamage < 0
        value = @_convertValue(result.mpDamage)
        if @_isHaveSpecialStyle(result)
            return @_createFromSettings(result.getUsedAASkill().popUpStyleId, value)
        else
            return @_createFromSettings("Damage_Other_Any", value)

    # * Чтобы лечение было с +
    _._convertValue = (value) ->
        return value if value >= 0
        value *= -1
        return "+" + value

    # * Есть ли у навыка специальный пользовательский стиль урона?
    _._isHaveSpecialStyle = (result) ->
        aaSkill = result.getUsedAASkill()
        return aaSkill? and String.any(aaSkill.popUpStyleId)


    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------