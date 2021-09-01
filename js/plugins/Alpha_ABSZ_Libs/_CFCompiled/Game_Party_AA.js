// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.aaAddGainedItemToPanel = function(item, count) {
    if (!AA.Utils.isAAObject(item)) {
      return;
    }
    // * Новый предмет (т.е. раньше не было)
    if (this.numItems(item) === count) {
      // * Тут надо использовать aID
      if (!$gamePlayer.aaSkillsSet.isHaveItemOnPanel(item.aId)) {
        // * Тут используется обычный ID (так как конвертируется в методе)
        uAPI.setItemToPanel(item.id);
      }
    }
  };
  _.aaShowNotifyForItemGain = function(item, count) {
    var char, e, popUpItem;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (count <= 0) {
        return;
      }
      if (item == null) {
        return;
      }
      popUpItem = new AA.Sprite_PopTreasureItem();
      popUpItem.setItem(item, count);
      char = $gamePlayer.AASprite();
      //TODO: Сделать проверку на предыидущий предмет, если сразу одинаковый, то х2
      //TODO: Звук какой-нибудь когда вещь поднимаешь!
      if (char == null) {
        return;
      }
      // * Если нету, создаём
      if (char.aaTreasurePopEngine == null) {
        return char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem);
      // * Если есть, но закончился, то пересоздаём
      } else if (char.aaTreasurePopEngine.isEmtpy()) {
        char.aaTreasurePopEngine.stop();
        return char.aaTreasurePopEngine = new AA.PopTreasureController(char, popUpItem); // * Добавляем
      } else {
        return char.aaTreasurePopEngine.addItem(popUpItem);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
