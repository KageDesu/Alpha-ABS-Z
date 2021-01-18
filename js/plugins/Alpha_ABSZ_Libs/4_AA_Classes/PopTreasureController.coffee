do ->
    # * Контроллер прикрепляется к спрайту, показывает все Items и удаляется самостоятельно
    # * Сам по себе он не "живёт", поэтому нужен начальный popTreasureItem
    class PopTreasureController extends Sprite
        constructor: (@parentCharacter, popTreasureItem) ->
            super()
            @_init()
            if popTreasureItem?
                @addItem popTreasureItem
            return

        # * Стандартный набор настроек
        #TODO: load from AA parameters manager directly
        defaultParams: -> {
            margins: { x: 0, y: -60 }
            opacityStep: 10,
            moveStep: 1,
            stayTime: 80
            dyBetweenLines: 20
        }

        addItem: (popTreasureItem) ->
            return unless popTreasureItem?
            try
                @_moveUpItems() unless @isEmtpy()
                @addChild popTreasureItem
                @items.push popTreasureItem
                popTreasureItem.start @params
            catch e
                KDCore.warning e
            return

        isEmtpy: -> @items.isEmpty()

        stop: -> @_destroyMe()

        update: ->
            super()
            @_checkAllItems()
            @_destroyMe() if @isEmtpy()
    
    AA.link PopTreasureController
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.PopTreasureController::

    _._init = ->
        @params = @defaultParams() unless @params?
        @items = []
        @_linkMe()
        return

    # * Удалить себя из родителя
    _._destroyMe = ->
        return unless @parentCharacter?
        try
            @parentCharacter.removeChild @
            @visible = false
        catch e
            KDCore.warning e
        return

    # * Присоединиться к "родителю"
    _._linkMe = () ->
        try
            @parentCharacter.addChild @
            @move @params.margins.x, @params.margins.y
        catch e
            KDCore.warning e
        return

    # * Поиск и удаление тех item, которые not Active
    _._checkAllItems = () ->
        try
            for item in @items
                unless item.isActive()
                    @items.delete(item)
                    @_checkAllItems() # * продолжить снова
                    break # * завершить цикл
        catch e
            KDCore.warning e
        return

    # * Сдвиг элементов
    _._moveUpItems = () ->
        try
            for item in @items
                item?.y -= @params.dyBetweenLines
        catch e
            KDCore.warning e
        return

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------


