#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Weapon.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Weapon::

    # * Настройки анимации оружия для ABS карты
    #TODO: settings to user for each type (scale, dx, dy)
    _.aaSetDirection = (direction) ->
        @scale.x = 0.7
        @scale.y = @scale.x
        @x = @y = 0

        switch direction
            when 6
                @x = 12
                @scale.x *= -1
            when 4
                @x = -12
            when 2
                @y = 0
            else
                @y = -10

        # * Начало в прозрачности (небольшой эффект)
        #TODO: тоже опция
        @_aaOpChanger = new AA.Changer(@)
        @_aaOpChanger.change('opacity').from(60).to(255).step(20).speed(1)
        @_aaOpChanger.start().done(() => @_aaOpChanger = null)

        return
    
    return
# ■ END Sprite_Weapon.coffee
#---------------------------------------------------------------------------