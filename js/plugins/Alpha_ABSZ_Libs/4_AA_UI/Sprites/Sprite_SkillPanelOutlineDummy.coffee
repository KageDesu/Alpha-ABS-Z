# * Класс заглушка для подсветки (вокруг) ячейки быстрого доступа
# * Используется если отключён параметр плагина
# * Все методы данного класса ПУСТЫЕ

do ->

    class Sprite_SkillPanelOutlineDummy extends Sprite
        constructor: () ->
            super()

        defaultParams: -> {}

        show: (colorArr) ->

        hide: () ->

        pulse: (colorArr, speed) ->


    AA.link Sprite_SkillPanelOutlineDummy
    return
