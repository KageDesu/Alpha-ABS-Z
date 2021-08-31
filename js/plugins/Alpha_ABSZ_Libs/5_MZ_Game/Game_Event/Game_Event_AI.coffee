#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    _.AAModel = -> @AAEntity().model()


    # * Изменить параметр AAModel у данного события
    _.aaChangeModelParam = (paramName, newValue) ->
        try
            return unless String.any(paramName)
            model = @AAModel()
            return unless model?
            log = "Model param: " + paramName + " changed to " + newValue
            log.p()
            model[paramName] = newValue
            # * Надо может какой то метод что параметры были изменены?
            #TODO: some refresh or _convertParameters? on onParamsChanged?
        catch e
            AA.w e

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------