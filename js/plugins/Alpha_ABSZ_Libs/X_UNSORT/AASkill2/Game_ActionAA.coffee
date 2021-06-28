# * Класс для Action для навыков ABS

# * Большинство методов из Game_Action просто не используются
# * Вынесен в отдельный класс чтобы не мешать обычной битве

class Game_ActionAA extends Game_Action
    constructor: (subject, aaSkill) ->
        super(subject, true)
        @setAASkill(aaSkill)
        
    setAASkill: (aaSkill) ->
        @clear() unless aaSkill?
        if aaSkill.isItem is true
            @setItem(aaSkill.databaseId)
        else
            @setSkill(aaSkill.databaseId)
        return
    
    AASkill: () -> @item().AASkill

    #$[OVER]
    # * canUse проверяется перед выполнением действия, поэтому тут пропускаем
    isValid: () -> @_packedSubject? and @item()? and @item().AASkill?

    #$[OVER]
    # * Проверки сокращены, так как не используются стандартные настройки
    testApply: (target) -> true
        # * Нет смысла, так как testLifeAndDeath == true всегда
        # * А проверки валидности цели идут на фильтре целей
        ###return @testLifeAndDeath() && (
            (@isHpRecover() && target.hp < target.mhp) ||
            (@isMpRecover() && target.mp < target.mmp) ||
            @hasItemAnyValidEffects(target)
        )###

    #$[OVER]
    # * Нет необходимости в этой проверке
    testLifeAndDeath: (target) -> true

    #$[OVER]
    setSubject: (subject) ->
        unless subject?
            @_packedSubject = null
        else
            @_packedSubject = AA.Utils.packAAEntity(subject)

    #$[OVER]
    subject: () ->
        subject = AA.Utils.unpackAAEntity(@_packedSubject)
        return subject.AABattler() if subject?
        return null

    #$[OVER]
    apply: (target) ->
        b = target.AABattler()
        Game_Action::apply.call(@, b)
        b.result().setUsedAASkill(@AASkill())
        return

    #$[OVER]
    updateLastUsed: () -> # * EMPTY
    #TODO: Сохранять на Subject полседний использованный AASkill ???
    #Чтобы например он onActionOnMe использовать

    #$[OVER]
    updateLastSubject: () -> # * EMPTY

    