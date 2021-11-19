#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    _._aaSetupWeaponMotionSprite = ->
        @_aaSprWeapMotionHolder = new Sprite()
        @_aaSprWeapon = new Sprite_Weapon()
        @_aaSprWeapMotionHolder.addChild(@_aaSprWeapon)
        return

    _._aaUpdateWeaponMotion = ->
        return unless @_aaSprWeapMotionHolder?
        return unless @isABSEntity()
        @_aaSprWeapMotionHolder.move(@x, @y)
        b = @_character.AABattler()
        return unless b.isWeaponAnimationRequested()
        return unless @_aaSprWeapon?
        try
            @_aaSprWeapon.setup(b.weaponImageId())
            direction = @_character.direction()
            @_aaSprWeapon.aaSetDirection(direction)
            if direction == 8 # * UP
                # * Ниже персонажа, так как персонаж спиной к нам
                @parent.addChildAt(@_aaSprWeapMotionHolder, 1)
            else
                # * Выше персонажа
                @parent.addChild(@_aaSprWeapMotionHolder)
        catch e
            AA.w
        finally
            b.clearWeaponAnimation()
        return
    
    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------