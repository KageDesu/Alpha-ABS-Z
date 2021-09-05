# Количество элементов всего
# Количество элементов на показ
# Метод showNext
# Метод showPrev
#
# items = []
# maxItems = items.length
# startIndex, endIndex
# currentItems = items[s,e] (получить массив элементов от A до B)
# refresh -> draw currentItems
# canGoNext? -> endIndex < maxItems
# canGoPrev? -> startIndex > 0

#TODO: Данный класс пока нигде не используется

class SimpleItemsSelector
    constructor: (@items, @countPerPage) ->
        @startIndex = 0
        @_refreshEndIndex()
        
    maxItems: -> @items.length

    getCurrentItems: ->
        items = []
        for i in [@startIndex...@endIndex]
            items.push(@items[i])
        return items

    goNext: ->
        return unless @isCanGoNextPage()
        @startIndex++
        @_refreshEndIndex()

    goPrev: ->
        return unless @isCanGoPrevPage()
        @startIndex--
        @_refreshEndIndex()

    isCanGoNextPage: -> @endIndex < @maxItems()

    isCanGoPrevPage: -> @startIndex > 0

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ SimpleItemsSelector.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = SimpleItemsSelector::

    _._refreshEndIndex = ->
        @endIndex = @countPerPage + @startIndex
        if @endIndex >= @maxItems()
            @endIndex = @maxItems() - 1
        return
    
    return
# ■ END SimpleItemsSelector.coffee
#---------------------------------------------------------------------------


