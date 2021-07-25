#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Coroutines.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
_coroutines = {}

setCoroutine = (generator) ->
    try
        name = generator.name
        iterator = generator name
        _coroutines[name] = iterator
        do iterator.next
        return name
    catch e
        clearCoroutine name if name?
        console.warn('Wrong coroutin generator method')
        console.error(e)
        return null

clearCoroutine = (name) -> _coroutines[name] = null

waitFor = (time, name) ->
    unless name?
        caller = arguments.callee.caller
        name = caller.name if caller?
    new Promise () ->
        setTimeout (->
            _coroutines[name].next() if name? and _coroutines[name]?
            return
            ), time

initCoroutineSystem = (obj) ->
    obj._coroutines = {}
    obj.setCoroutine = (generator) ->
        try
            name = generator.name
            iterator = generator name
            obj._coroutines[name] = iterator
            do iterator.next
            return name
        catch e
            obj.clearCoroutine name if name?
            console.warn e
            return null
    obj.clearCoroutine = (name) -> obj._coroutines[name] = null
    obj.waitFor = (time, name = "") ->
        return unless name?
        name = "bound " + name
        new Promise () ->
            setTimeout (->
                obj._coroutines[name].next() if obj._coroutines[name]?
                return
                ), time
    obj.clearAllCoroutines = -> obj._coroutines = {}

# ■ END Coroutines.coffee
#---------------------------------------------------------------------------