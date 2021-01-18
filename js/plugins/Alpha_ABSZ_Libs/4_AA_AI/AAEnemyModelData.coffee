# * Класс, который содержит все настройки и параметры AA сущности врага на карте
# * Аналог AIBehavModel из ABS MV

#@[STORABLE]
#@[GLOBAL]
class AAEnemyModelData
    constructor: (@enemyId) ->
        if @enemyId == 11
            @selectionVisible = true
            @selectionColor = "#FF00FF"
            @selectionOffset = [0, -10]
            @selectionImage = "targetSelectedDottedSquare"

            @miniHpGaugeStyle = "miniHpGauge2"
            @miniHPGaugeOffset = [8, 12]

        else if @enemyId == 10
            @selectionVisible = true
            @selectionColor = "#BBBB00"
            @selectionOffset = [0, -20]
            @selectionImage = "targetSelectedBigSquare"

            @miniHpGaugeStyle = "miniHpGauge3"
            @miniHPGaugeOffset = [-12, -58]


    #TODO: Игрок должен иметь возмможность менять значения во время игры