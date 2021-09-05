#TODO: Добавить настройки, чтобы и размер иконок и текста можно было менять
class Window_SkillSelectorList extends Window_Selectable
    constructor: (rect) ->
        super(...arguments)
        @setBackgroundType(2)
        @catIndex = -1
        @skillSymbol = null
        @skills = []
        return

    # * При нажатии на окно выбора навыков
    onClick: ->
        return unless @skillSymbol?
        return if @catIndex < 0
        hitIndex = @hitIndex()
        return if hitIndex < 0
        try
            skillId = @_skills[hitIndex].id
            if @catIndex == 0
                uAPI.setSkillToPanel(skillId, @skillSymbol)
            else
                uAPI.setItemToPanel(skillId, @skillSymbol)
            if skillId > 0
                SoundManager.playEquip()
                # * Если навык был установлен (а не удалён)
                AA.UI.closeSkillSelector()
                # * Чтобы персонаж не пошёл к точку карты после закрытия окна
                TouchInput.clear()
            else
                SoundManager.playCursor()
                @refresh()
        catch e
            AA.w e
        return

    # * 0 - Skills
    # * 1 - Items
    setCategory: (@catIndex) ->
        @refresh()
        @scrollTo(0, 0)
        return

    # * Символ навыка, чтобы установить (убрать) на панель
    setSymbol: (@skillSymbol) ->

    # * Всегда можно прокручивать, так как окно не будет Active
    #$[OVER]
    isScrollEnabled: -> true

    maxCols: -> 1

    maxItems: ->
        if @_skills?
            return @_skills.length
        else
            return 0

    refresh: ->
        @_prepareSkillsList()
        Window_Selectable::refresh.call(@)
        return

    drawItem: (index) ->
        @__drawIndex = index
        item = @_skills[index]
        return unless item?
        rect = @itemLineRect(index)
        # * Тут TryCatch так как есть системный placeholder вместо Item
        # * и модифицированный другими плагинами метод drawItemName
        # * может не найти поле необходимое, которое есть у Game_Items
        try
            #TODO: Этот метод может вызвать проблемы
            #? ТУТ ИСПОЛЬЗУЕТСЯ ДОВОЛЬНО ОПАСНЫЙ приём подмены иконки в Data объекте
            #? Это сделано чтобы не переписывать весь метод drawItemName
            # * Если навык атаки, то надо рисовать иконку оружия
            if @_isAttackSkill(index)
                _tIconIndex = item.iconIndex
                iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, $gameParty.leader())
                item.iconIndex = iconIndex if iconIndex > 0
            @drawItemName(item, rect.x, rect.y, rect.width)
            # * После метода отрисовки, иконку надо вернуть
            item.iconIndex = _tIconIndex if _tIconIndex?
        catch  e
            AA.w e
        return

    #TODO: from settings
    #$[OVER]
    resetFontSettings: ->
        @contents.fontFace = $gameSystem.mainFontFace()
        @contents.fontSize = 14
        @resetTextColor()
        return

    #TODO: from settings
    resetTextColor: ->
        super()
        return if @catIndex < 0
        if @__drawIndex == 0
            @changeTextColor("#e32614") # * [Remove]
        # * Атака может быть только в категории навыков
        # * А может и не быть (если установлена)
        else if @_isAttackSkill(@__drawIndex)
            @changeTextColor("#148de3") # * Attack
        else
            #TODO: Items name color plugin compatability
            if @catIndex == 0
                @changeTextColor("#dba512")
            else
                @changeTextColor("#20d67b")

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_SkillSelectorList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_SkillSelectorList::

    _._prepareSkillsList = ->
        @_skills = []
        # * ID навыка атаки в списке, если == 0 - нет навыка
        @_attackSkillId = 0
        return if @catIndex < 0
        try
            if @catIndex == 0 # * Skills only
                skills = $gameParty.leader().getAASkills()
                # * Так как метод getAASkills возвращает все навыки (включая предметы)
                # * то дополнительный фильтр от предметов
                skills = skills.filter (s) -> AA.Utils.isAASkill(s.idA)
            else # * Items only
                skills = $gameParty.leader().getAAItems()
            @_skills = skills
            @_removeAlreadyInPanelSkills()
        catch e
            AA.w e
            @_skills = []
        @_checkAttackSkillInList() if @catIndex == 0
        @_skills.unshift(@_removeCommandItem())
        return

    _._removeCommandItem = ->
        #TODO: from parameters
            {
                id: 0
                idA: 0
                iconIndex: 16
                name: "[Remove]"
            }

    # * Удаляет из списка навыков те, что уже установленны на панель навыков
    _._removeAlreadyInPanelSkills = ->
        try
            notInPanelSkills = []
            skillPanel = $gamePlayer.aaSkillsSet
            return unless skillPanel?
            for s in @_skills
                unless skillPanel.getSymbolForSkill(s.idA)?
                    notInPanelSkills.push(s)
            @_skills = notInPanelSkills
        catch e
            AA.w e
            @_skills = []
        return

    _._checkAttackSkillInList = ->
        try
            attackSkillId = $gameParty.leader().attackSkillId()
            attackSkill = @_skills.find (s) -> s.id == attackSkillId
            if attackSkill?
                @_skills.delete(attackSkill)
                # * Запоминаем ID (значит есть в списке)
                @_attackSkillId = attackSkillId
                # * Ставим на первое место в список
                @_skills.unshift(attackSkill)
        catch e
            AA.w e
            @_skills = []
        return

    _._isAttackSkill = (index) ->
        try
            if @catIndex == 0 and @_attackSkillId > 0
                if @_skills[index]?.id == @_attackSkillId
                    return true
        catch e
            AA.w e
        return false

    return
# ■ END Window_SkillSelectorList.coffee
#---------------------------------------------------------------------------