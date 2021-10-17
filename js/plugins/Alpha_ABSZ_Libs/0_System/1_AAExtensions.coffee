# * Глабольный менеджер расширений (кода совместимости)

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA

    # * Добавить метод расширения
    _.extend = (method) ->
        AA.__extenders = [] unless AA.__extenders?
        AA.__extenders.push(method)
        return

    # * Загрузить (выполнить) все методы расширения
    _.loadExtensions = ->
        return unless AA.__extenders?
        do method for method in AA.__extenders
        # * Освобождение памяти
        AA.__extenders = null
        return

    return
# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------