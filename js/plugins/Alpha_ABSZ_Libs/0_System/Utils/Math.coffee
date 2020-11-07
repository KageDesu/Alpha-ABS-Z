# * Вспомогательные функции математических вычислений
AA.Utils.Math = ->


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ MATH.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AA.Utils.Math
    AP = KDCore.Point

    _.moveTo = (p1, p2, step) ->
        try
            rotated = _.rotateTo new AP(0, step), _.angle p1, p2
            fx = fy = 0
            if p2.y < p1.y then fy = p1.y - rotated.y else fy = p1.y + rotated.y
            if p2.x < p1.x then fx = p1.x + rotated.x else fx = p1.x - rotated.x
            return new AP(fx, fy)
        catch e
            KDCore.warning 'Utils.Math.moveTo', e
            return AP.Empty

    _.rotateTo = (p1, angle) ->
        try
            fx = p1.x * Math.cos(angle) - p1.y * Math.sin(angle)
            fy = p1.y * Math.cos(angle) + p1.x * Math.sin(angle)
            return new AP(fx, fy)
        catch e
            KDCore.warning 'Utils.Math.rotateTo', e
            return AP.Empty

    _.angle = (p1, p2) ->
        try
            d = _.getPointDistance p1, p2
            fx = Math.abs(p2.x - p1.x)
            fy = Math.abs(p2.y - p1.y)
            return 0 if d is 0 or fx is 0 or fy is 0
            return Math.acos((fy * fy + d * d - fx * fx) / (2 * fy * d))
        catch e
            KDCore.warning 'Utils.Math.angle', e
            return 0

    _.getPointDistance = (p1, p2) ->
        try
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        catch e
            KDCore.warning 'Utils.Math.getPointDistance', e
            return 0

    _.inRect = (p1, pixiRect) ->
        try
            return pixiRect.contains(p1.x, p1.y)
        catch e
            KDCore.warning 'Utils.Math.inRect', e
            return false

    return
# ■ END MATH.coffee
#---------------------------------------------------------------------------