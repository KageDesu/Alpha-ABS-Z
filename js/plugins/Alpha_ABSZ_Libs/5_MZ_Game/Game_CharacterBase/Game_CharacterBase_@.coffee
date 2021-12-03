#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        # * Набор навыков с задержкой
        @aaDelayedSkillActions = []
        @aaClearCharacterEffects()
        return
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        if @isABS()
            @aaUpdateABSAnimaX() if Imported.PKD_AnimaX
            if AA.isABSActive()
                @aaUpdateABS()
                @aaUpdateNoPassFlag()
        return

        
    # * Диагональное движение
    # -----------------------------------------------------------------------
    do ->
        
        #@[ALIAS]
        ALIAS__realMoveSpeed = _.realMoveSpeed
        _.realMoveSpeed = ->
            speed = ALIAS__realMoveSpeed.call(@)
            return if @_diagonalDir then speed * AA.Input.diagonalSpeed else speed

        #@[ALIAS]
        ALIAS__moveStraight = _.moveStraight
        _.moveStraight = (direction) ->
            @_diagonalDir = false
            ALIAS__moveStraight.call(@, direction)

        #@[ALIAS]
        ALIAS__setDirection = _.setDirection
        _.setDirection = (direction) ->
            @_diagonalDir = false if @_diagStraigten is true
            ALIAS__setDirection.call(@, direction)
            
        #@[ALIAS]
        ALIAS__moveDiagonally = _.moveDiagonally
        _.moveDiagonally = (horz, vert) ->
            if AA.Input.IsDiagonal is true
                diag = @canPassDiagonally(@_x, @_y, horz, vert)
                norm = @canPass(@_x, @_y, horz) or @canPass(@_x, @_y, vert)
                if diag
                    @_diagonalDir = AA.Utils.get4Dir(horz, vert)
                    @_x = $gameMap.roundXWithDirection(@_x, horz)
                    @_y = $gameMap.roundYWithDirection(@_y, vert)
                    @_realX = $gameMap.xWithDirection(@_x, @reverseDir(horz))
                    @_realY = $gameMap.yWithDirection(@_y, @reverseDir(vert))
                    @increaseSteps()
                else if norm
                    @_diagonalDir = false
                    @moveStraight(@aaGetOtherDiagDirection(horz, vert))
                @_diagStraigten = false
                @setDirection horz if @_direction == @reverseDir(horz)
                @setDirection vert if @_direction == @reverseDir(vert)
                @_diagStraigten = true
            else
                ALIAS__moveDiagonally.call(@, horz, vert)

        return
    # -----------------------------------------------------------------------


    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------