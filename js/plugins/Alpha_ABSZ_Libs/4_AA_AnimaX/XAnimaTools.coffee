# * Менеджер для работы с БД анимаций

XAnimaTools = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ XAnimaTools.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = XAnimaTools

    #TODO: test
    _.getXAnimaParamsForState = (state, id) ->
        data = AA.PP.xAnimations()[0]
        return data[state]


    #TODO: test
    _.getXAnimaParamsForAction = (id) ->
        data = AA.PP.xAnimations()[0].actions
        return data.find (a) -> a.name == id

    
    # * Конвертировать массив Actions из параметров плагина в более компактный вид
    _.convertActionsFromParameters = (actions) ->
        shrinked = []
        for action in actions
            item = action.animation
            item.name = action.name
            shrinked.push item
        return shrinked

    _.createXAnimaSetForAction = (id, params) ->
        try
            animaSet = @_createXAnimaSetFromParams(id, 2, null, params)
            return animaSet
        catch e
            KDCore.warning e
            return null

    _.createXAnimaSetForMove = (id, state, params) ->
        try
            animaSet = @_createXAnimaSetFromParams(id, 0, state, params)
            return animaSet
        catch e
            KDCore.warning e
            return null

    _.createXAnimaSetForIdle = (id, state, params) ->
        try
            animaSet = @_createXAnimaSetFromParams(id, 1, state, params)
            return animaSet
        catch e
            KDCore.warning e
            return null

    _._createXAnimaSetFromParams = (id, type, state, params) ->
        try
            { frames, speed, isOneDirection } = params
            if type == 2 # * Action
                filename = @createFilenameForAnimaAction(id, params.name)
            else
                filename = @createFilenameForAnimaState(id, state, type)
            animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection)
            if params.expandFirstFrame > 0
                animaSet.expandFirstFrameTimes params.expandFirstFrame
            # * Задать имя действия
            animaSet.setActionName params.name if type == 2
            return animaSet
        catch e
            KDCore.warning e
            return null
    
    _.createFilenameForAnimaState = (id, state, type) ->
        path = id + "/"
        if state != 'base'
            path += state + "/"
        if type == 0
            path += "Move"
        else
            path += "Idle"
        return path

    _.createFilenameForAnimaAction = (id, name) ->
        path = id + "/Actions/" + name
        return path

    return
# ■ END XAnimaTools.coffee
#---------------------------------------------------------------------------