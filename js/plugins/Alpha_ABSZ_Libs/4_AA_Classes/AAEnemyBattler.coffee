class AAEnemyBattler extends Game_Enemy
    constructor: (enemyId) ->
        super(enemyId, 0, 0)
        # * Проверка делается один раз, так как навыки не меняются
        @_isHaveAnyAASkill = @_checkAASkillsInActions()

    getAASkills: -> @_selectAASkillsFromActions().map (skillId) -> $dataSkills[skillId]
    
    # * Если ли у врага хотябы одно действие с АБС навыком
    isHaveAnyAASkill: -> @_isHaveAnyAASkill is true

    aaIsActionValid: (action) -> AA.Utils.isAASkill(action.skillId)

    isActionValid: (action) ->
        isABS = @aaIsActionValid(action)
        return isABS && Game_Enemy::isActionValid.call(@, action)

    #TODO: ABS parameter attackAnimationID - для базового навыка атаки своя анимация
    attackAnimationId1: -> 129 #TODO: temp

    # * У монстров не может быть двуручной атаки, поэтому всегда 0
    attackAnimationId2: -> 0

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AAEnemyBattler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AAEnemyBattler::

    # * Среди всех действий врага, есть хотябы одно АБC
    # * Эта проверка нужна, чтобы сразу отметить врага как неспособного сражаться
    _._checkAASkillsInActions = ->
        aaActions = @enemy().actions.filter (a) => @aaIsActionValid(a)
        return aaActions.length > 0


    # * Выборка всех возможных АБС навыков из доступных действий
    # * (Тут смотритеся и canUse и можно ли использовать действие по условию в самом действии)
    _._selectAASkillsFromActions = ->
        aaSkills = []
        actionList = @enemy().actions.filter (a) => @isActionValid(a)
        aaSkills = @_aaSelectAllABSActions(actionList) if actionList.length > 0
        return aaSkills
    
    # * Метод аналогичен selectAllActions, только изменён под АБС
    # * Возвращает все АА навыки, которые проходят условия Action из БД
    _._aaSelectAllABSActions = (actionList) ->
        aaSkills = []
        ratingMax = Math.max(...actionList.map (a) -> a.rating)
        ratingZero = ratingMax - 3
        actionList = actionList.filter (a) -> a.rating > ratingZero
        for i in [0...actionList.length]
            action = @selectAction(actionList, ratingZero)
            aaSkills.push(action.skillId) if action?
        return aaSkills


    return
# ■ END AAEnemyBattler.coffee
#---------------------------------------------------------------------------

    

    