#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    #@[ALIAS]
    ALIAS__performDamage = _.performDamage
    _.performDamage = ->
        if AA.isABSMap()
            if @isPlayer() and AA.PP.isShakeScreenWhenPlayerGetDamage()
                # * Стандартный метод (тряска экрана и звук)
                ALIAS__performDamage.call(@)
            else
                # * Если не игрок, то нет тряски и звука
                Game_Battler::performDamage.call(@)
        else
            ALIAS__performDamage.call(@)
    
    #@[ALIAS]
    ALIAS__learnSkill = _.learnSkill
    _.learnSkill = (skillId) ->
        # * Сперва флаг - что не надо добавлять
        shouldAddNewSkillToPanel = false
        # * Если навык не выучен был до этого и параметр ON, то надо добавить
        if !@isLearnedSkill(skillId) && AA.PP.isAddNewSkillsOnPanelOnLearning()
            shouldAddNewSkillToPanel = true
        ALIAS__learnSkill.call(@, skillId)
        # * Добавляем после, чтобы навык уже был у игрока
        # * Дополнительно проверяем, выучен ли он и надо ли его добавлять
        if @isLearnedSkill(skillId) and shouldAddNewSkillToPanel is true
            ##TODO: Учитывать членов группы, но пока только игрок
            # * Чтобы добавить на панель члена партии, надо ActorID менять у SkillSet
            # * И потом опять его возвращать
            if @isPlayer() && AA.Utils.isAAObject(skillId)
                uAPI.setSkillToPanel(skillId)
        return
    
    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------