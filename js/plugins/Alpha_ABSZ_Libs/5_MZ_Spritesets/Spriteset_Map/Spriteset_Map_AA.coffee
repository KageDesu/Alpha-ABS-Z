#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Spriteset_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Spriteset_Map::

    # * Регестрирует спрайт как статический на карте (не движется с экраном)
    # * Требует привязки к персонажу на карте, позволяет задать смещение
    _.aaRegisterDynamicSprite = (sprite, character, dx = 0, dy = 0) ->
        @_aaMapDynamicSprites.push(sprite)
        sprite._aaDynamicParent = character
        sprite._aaDynX = dx
        sprite._aaDynY = dy
        return

    # * Обновление динамических спрайтов (обновление позиции относительно камеры)
    _.aaUpdateDynamicSprites = ->
        for sprite in @_aaMapDynamicSprites
            if sprite? and sprite._aaDynamicParent?
                p = sprite._aaDynamicParent
                dx = sprite._aaDynX
                dy = sprite._aaDynY
                sprite.move(p.screenX() + dx, p.screenY() + dy)
            else
                @_aaMapDynamicSprites.delete(sprite)
        return

    return
# ■ END Spriteset_Map.coffee
#---------------------------------------------------------------------------