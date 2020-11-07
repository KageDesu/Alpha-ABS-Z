#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Player.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Player::

    _.testX = ->

        # * Имя файла должно собираться ID/Actions/NAME

        # * ID - это ID набора всех анимаций
        # * NAME - имя действия

        # * Регистрация делается после в refresh, из списка всех действий (парметров)
        @registerAnimaXAction 'Attack'


        # * Перед запуском (загрузкой и созданием, надо проверить, если ли действие у персонажа)

        anima = XAnimaTools.getXAnimaParamsForAction('Attack')
        return unless anima?

        animaSet = XAnimaTools.createXAnimaSetForAction(@animXId(), anima)
        animaSet.preLoad()
        animaSet.waitActionEnd = true


        # * Этот метод просто запускает загруженный сэт (без проверок)
        @startAnimaXAction animaSet
    
    _.testX2 = ->
        @registerAnimaXAction 'Defense'
        anima = XAnimaTools.getXAnimaParamsForAction('Defense')
        return unless anima?

        animaSet = XAnimaTools.createXAnimaSetForAction(@animXId(), anima)
        animaSet.isLoop = true
        animaSet.waitActionEnd = false
        animaSet.preLoad()
        @startAnimaXAction animaSet
        return


    return
# ■ END Game_Player.coffee
#---------------------------------------------------------------------------