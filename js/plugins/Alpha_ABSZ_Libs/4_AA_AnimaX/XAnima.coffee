# * Анимация (одна единица анимации, последовательность кадров)

#* STORABLE - значит класс сохраняется в сохранение (т.е. создаётся на игровом объекте)
#@[STORABLE]
class XAnima
    constructor: (@framesCount, @fileName) ->
        @frames = []
        @_parseFrames()

    # * Хранит только названия картинок кадров
    _parseFrames: ->
        for i in [0...@framesCount]
            @frames.push @fileName + "_" + i

    # * Умножить первый кадр times раз
    expandFirstFrame: (times) ->
        @framesCount += times
        for i in [0...times]
            @frames.splice(1, 0, @frames[0])

    preLoad: ->
        ImageManager.loadAnimaX(f) for f in  @frames

    getFrame: (index) -> ImageManager.loadAnimaX(@frames[index])


#TODO: Загрузка всех анимаций при запуске игры?