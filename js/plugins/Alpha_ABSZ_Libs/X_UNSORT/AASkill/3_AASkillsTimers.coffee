# * Класс хранит таймеры для набора АБС навыков (и предметов) для Battler

#@[STORABLE]
class AASkillsTimers
    constructor: () ->
        # * Таймеры для навыков
        @_timers = []
        # * Для оптимизации, ID навыков для которых запущен таймер храняться отдельно
        @_skills = []
        return

    startTimerForSkill: (skillId, time) ->
        timer = new AATimer()
        timer.skillId = skillId
        # * Перевод из секунд в кадры
        timer.start(time * 60)
        @_timers.push(timer)
        @_skills.push(skillId)
        return

    isSkillHaveTimer: (skillId) -> @_skills.contains(skillId)

    isSkillHaveTimerToShow: (skillId) ->
        @isSkillHaveTimer(skillId) and @getTimerForSkill(skillId).maxValue >= 60

    # * В секундах
    getRemainTimeForSkill: (skillId) ->
        if @isSkillHaveTimer(skillId)
            return @getTimerForSkill(skillId).getSecondsLeft()
        else
            return 0

    getTimerForSkill: (skillId) -> @_timers.find (t) -> t.skillId == skillId

    update: ->
        try
            toDelete = []
            # * Опасно удалять в переборке массива
            for t in @_timers
                continue unless t?
                t.update()
                if t.isReady()
                    @_skills.delete(t.skillId)
                    toDelete.push(t)
            @_timers.delete(t) for t in toDelete
        catch e
            AA.w e
        return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ AASkillsTimers.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = AASkillsTimers::


    
    return
# ■ END AASkillsTimers.coffee
#---------------------------------------------------------------------------