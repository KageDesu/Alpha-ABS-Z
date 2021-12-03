/*
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 *
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://http://kdworkshop.net//>
 *
 */

/*:
 * @plugindesc (v.1.3)[PRO] Allow you spawn Events during game with placement select
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/pocket-events/
 *
 * 
 * @help
 * 
 * This plugin allows player placing events from a specified 'template' map
 * with placement selecting for them in the current map.
 * This template map is designated with the "Templates Map" plugin setting.
 * 
 * For create rules and setup placement events, see plugin parameter
 * 'Placement Items'
 * 
 * For place and removing events, use plugin commands. 
 *
 *
 *
 * Since update 1.1. you can create draggable events.
 * Player can dragging those events by mouse to another place on map.
 * Set plugin parameter "Event Drag Drop?" to true for activate dragging.
 * Setup dragging event rules in "Draggable Templates" plugin parameter.
 *   
 * Add comment "draggable:X" (without quotes) on event page
 * where X - number of dragging template from plugin parameters
 *
  *
 *
 * Visit plugin web page for more information, also you can find Demo project.
 * 
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 *
 * @param TemplatesMap
 * @text Templates Map
 * @type number
 * @min 1
 * @default 1
 * @desc Map ID with Placement Events templates
 * 
 * @param GlobalExceptRegions
 * @text Forbidden Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region ID's where placement items cannot be placed
 * @default []
 * 
 * @param PlacementsList
 * @text Placement Items
 * @type struct<PlacementItem>[]
 * @desc Placement Items List
 * @default []
 * 
 * @param AllowArrowMove
 * @text Keyboard Moving?
 * @type boolean
 * @default false
 * @desc Allow moving placement item when place by arrow keys? (if false - only by mouse)
 * 
 * @param AllowEventDragging
 * @text Event Drag Drop?
 * @type boolean
 * @default true
 * @desc Allow player dragging draggable (must have special comment) events?
 * 
 * @param DraggableList
 * @text Draggable Templates
 * @type struct<DraggableItem>[]
 * @desc Draggable Events Settings Templates List
 * @default []


 * @command PlacePocketEvent
 * @text Place Pocket Event
 * @desc Placing pocket event on map with placement select
 * 
 * @arg placementItemId
 * @text Placement Item
 * @desc Placement Item Index from Placement Items plugin parameter
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg gameItemId
 * @text Consume Item
 * @desc Item that's will be deleting from inventory when item is placed [optional]
 * @type item
 * @default 0
 * 
 * @command RemovePocketEvent
 * @text PickUp By Place Item
 * @desc PickUp (removing) pocket event from map
 * 
 * @arg placementItemId
 * @text Placement Item
 * @desc Placement Item Index from Placement Items plugin parameter
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg gameItemId
 * @text Gain Item
 * @desc Item that's will be added to inventory when item is removed from map [optional]
 * @type item
 * @default 0
 * 
 * @command RemovePocketEvent2
 * @text PickUp By Event
 * @desc PickUp (removing) current pocket event from map
 * 
 * @arg gameItemId
 * @text Gain Item
 * @desc Item that's will be added to inventory when item is removed from map [optional]
 * @type item
 * @default 0


 */
/*~struct~PlacementItem:
@param eventId
@text Event ID
@type number
@default 1
@min 1
@desc Event ID on Placements Templates Map

@param animationId
@text Place Animation
@type animation
@default 0
@desc Animation that will be playing after item placed

@param gridVisiblity
@text Grid
@type boolean
@default true
@desc Show map grid when this item placing?

@param sSwitch
@text Self Switch
@type combo
@option None
@option A
@option B
@option C
@option D
@default None
@desc Select which Self Switch will be turned ON when item been placed

@param exceptRegions
@text Forbidden Regions
@type number[]
@min 1
@max 255
@desc Region ID's where this item cannot be placed 
@default []

@param onlyRegions
@text Allowed Only Regions
@type number[]
@min 1
@max 255
@desc Only Region ID's where this item can be placed
@default []

@param ceSpawnGood
@text On Placed CE
@type common_event
@default 0
@desc Common event called after item been placed

@param canSpawnOverEvents
@text Place On Events?
@type boolean
@default false
@desc Can be this item placed on (above) other map events?

@param ceSpawnCancel
@text On Cancel CE
@type common_event
@default 0
@desc Common event called if player not placed item, just cancel placement (ESC or right mouse click)

@param isShouldPauseMap
@text Pause Game?
@type boolean
@default false
@desc Pause game map when player placing this item?

@param maxDistance
@text Distance
@type number
@default 0
@min 0
@desc Maximum allowed distance (from player) to place this item. 0 - unlimited

@param allowMargin
@text Allow Y Offset?
@type boolean
@default false
@desc If true, you can change object height offset by mouse scroll (when placing)

@param marginStep
@parent allowMargin
@text Step
@type number
@default 1
@min 1
@desc Y coordinate changing step (in px)

@param marginMin
@parent allowMargin
@text Min Offset
@type number
@default -20
@min -100
@max -1
@desc Lower allowed height offset value

@param marginMax
@parent allowMargin
@text Max Offset
@type number
@default 20
@min 1
@max 100
@desc Upper allowed height offset value
*/

/*~struct~DraggableItem:
@param gridVisiblity
@text Grid
@type boolean
@default true
@desc Show map grid when this event dragging?

@param exceptRegions
@text Forbidden Regions
@type number[]
@min 1
@max 255
@desc Region ID's where this event cannot be placed after dragging 
@default []

@param ceSpawnGood
@text On Placed CE
@type common_event
@default 0
@desc Common event called after event been placed (after dragging)

@param canSpawnOverEvents
@text Place On Events?
@type boolean
@default false
@desc Can be this event placed on (above) other map events?

@param isShouldPauseMap
@text Pause Game?
@type boolean
@default false
@desc Pause game map when player dragging this event?

@param image
@text Drag Image
@type struct<DraggableItemImage>
@default
@desc Change event graphic to this image when event is dragging, optional
*/

/*~struct~DraggableItemImage:
@param characterName
@text Graphic
@type file
@dir img/characters/
@require 1
@default
@desc Character graphic file

@param characterIndex
@text Index
@type number
@min 0
@desc Charcter Index on character graphics
@default 0
 */


var Imported = Imported || {};
Imported.PKD_EasyPlacement = true;
Imported.PKD_PocketEvents = true;


var PKD_EasyPlacement = {};
PKD_EasyPlacement.LIBS = {};
PKD_EasyPlacement.register = function (library) {
    this.LIBS[library.name] = library;
};

var PKD_PocketEvents = PKD_EasyPlacement;


var KDCoreMini = {};

window.KDCoreMini = KDCoreMini;

KDCoreMini.Utils = {};

//TODO: В KDCore
KDCoreMini.makeid = function(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

(function () {

    Array.prototype.delete = function () {
        var L, a, ax, what;
        what = void 0;
        a = arguments;
        L = a.length;
        ax = void 0;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    KDCoreMini.TimedUpdate = class TimedUpdate {
        constructor(interval, method1) {
            this.interval = interval;
            this.method = method1;
            this._timer = 0;
            this._once = false;
        }

        update() {
            if (this.interval == null) {
                return;
            }
            this._timer++;
            if (this._timer >= this.interval) {
                if (this.method != null) {
                    this.method();
                }
                this._timer = 0;
                if (this._once === true) {
                    return this.stop();
                }
            }
        }

        once() {
            return this._once = true;
        }

        onUpdate(method1) {
            this.method = method1;
        }

        stop() {
            return this.interval = null;
        }

        isAlive() {
            return this.interval != null;
        }

    };


    KDCoreMini.Utils.getEventCommentValue = function (commentCode, list) {
        var comment, e, item;
        try {
            if (list && list.length > 1) {
                i = 0;
                while (i < list.length) {
                    item = list[i++];
                    if (!item) {
                        continue;
                    }
                    if (item.code === 108) {
                        comment = item.parameters[0];
                        if (comment.contains(commentCode)) {
                            return comment;
                        }
                    }
                }
            }
        } catch (error1) {
            e = error1;
            console.warn(e);
        }
        return null;
    };

    KDCoreMini.isMZ = function () {
        return Utils.RPGMAKER_NAME.contains("MZ");
    };

})();
(function(){
    

    PKD_EasyPlacement.pluginName = "PKD_PocketEvents";

    PKD_EasyPlacement.LoadPluginSettings = () => {
        const params = PluginManager.parameters(PKD_EasyPlacement.pluginName);
        //console.info(params);
        PKD_EasyPlacement.ITEMS_MAP = parseInt(params.TemplatesMap) || 0;
        PKD_EasyPlacement.PARAMS = {};
        
        PKD_EasyPlacement.PARAMS.BAD_REGIONS = ParsePluginRegionArray(params.GlobalExceptRegions);
        PKD_EasyPlacement.PARAMS.ITEMS = ParsePluginItemsList(params.PlacementsList);
        PKD_EasyPlacement.PARAMS.ALLOW_ARROW_MOVE = JsonEx.parse(params.AllowArrowMove || "false");
        PKD_EasyPlacement.PARAMS.ALLOW_DRAG = JsonEx.parse(params.AllowEventDragging || "true");
        PKD_EasyPlacement.PARAMS.DRAG_ITEMS = ParsePluginDraggableList(params.DraggableList);

        //console.info(PKD_EasyPlacement.PARAMS);
        if(KDCoreMini.isMZ())
            RegisterPluginCommnads();
        ConfigurateClasses();
    };


    ParsePluginRegionArray = (arrayList) => {
        let list = JsonEx.parse(arrayList);
        list = list.map((e) => parseInt(e));
        return list;
    };

    ParsePluginItemsList = (arrayList) => {
        let lines = JsonEx.parse(arrayList);
        let parsed = lines.map((l) => JsonEx.parse(l));
        parsed.forEach(element => {
            element.gridVisiblity = JsonEx.parse(element.gridVisiblity);
            element.animationId = parseInt(element.animationId);
            element.eventId = parseInt(element.eventId);
            element.exceptRegions = ParsePluginRegionArray(element.exceptRegions);
            element.onlyRegions = ParsePluginRegionArray(element.onlyRegions);
            // * Проверка, так как параметры были добавлены в обновлениях
            if(element.ceSpawnGood) {
                element.ceSpawnGood = parseInt(element.ceSpawnGood);
            } else {
                element.ceSpawnGood = 0;
            }
            if(element.ceSpawnCancel) {
                element.ceSpawnCancel = parseInt(element.ceSpawnCancel);
            } else {
                element.ceSpawnCancel = 0;
            }
            if(element.canSpawnOverEvents) {
                element.canSpawnOverEvents = JsonEx.parse(element.canSpawnOverEvents);
            } else {
                element.canSpawnOverEvents = false;
            }
            if(element.isShouldPauseMap) {
                element.isShouldPauseMap = JsonEx.parse(element.isShouldPauseMap);
            } else {
                element.isShouldPauseMap = false;
            }
            if(element.maxDistance) {
                element.maxDistance = parseInt(element.maxDistance);
            } else {
                element.maxDistance = 0;
            }

            // * MARGINS
            if(element.allowMargin) {
                element.allowMargin = JsonEx.parse(element.allowMargin);
            } else {
                element.allowMargin = false;
            }
            if(element.marginStep) {
                element.marginStep = parseInt(element.marginStep);
            } else {
                element.marginStep = 1;
            }
            if(element.marginMix) {
                element.marginMix = parseInt(element.marginMix);
            } else {
                element.marginMin = -20;
            }
            if(element.marginMax) {
                element.marginMax = parseInt(element.marginMax);
            } else {
                element.marginMax = 20;
            }
        });
        parsed = [null].concat(parsed);
        return parsed;
    };

    ParsePluginDraggableList = (arrayList) => {
        if(!arrayList) return [];
        let lines = JsonEx.parse(arrayList);
        let parsed = lines.map((l) => JsonEx.parse(l));
        parsed.forEach(element => {
            element.gridVisiblity = JsonEx.parse(element.gridVisiblity);
            element.exceptRegions = ParsePluginRegionArray(element.exceptRegions);
            element.ceSpawnGood = parseInt(element.ceSpawnGood);
            element.canSpawnOverEvents = JsonEx.parse(element.canSpawnOverEvents);
            element.isShouldPauseMap = JsonEx.parse(element.isShouldPauseMap);
            if(element.image) {
                element.image = JsonEx.parse(element.image);
            } else {
                element.image = null;
            }
        });
        parsed = [null].concat(parsed);
        return parsed;
    };

    RegisterPluginCommnads = () => {

        PluginManager.registerCommand(PKD_EasyPlacement.pluginName, 'PlacePocketEvent', args => {
            try {
                let pItemId = parseInt(args.placementItemId);
                let gItemId = parseInt(args.gameItemId);
                if(pItemId >= 0)
                    PKD_EPManager.Start(pItemId, gItemId);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_EasyPlacement.pluginName, 'RemovePocketEvent', args => {
            try {
                let pItemId = parseInt(args.placementItemId);
                let gItemId = parseInt(args.gameItemId);
                if (pItemId >= 0)
                    PKD_EPManager.PickUpPlacedItem(pItemId, gItemId);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_EasyPlacement.pluginName, 'RemovePocketEvent2', args => {
            try {
                let gItemId = parseInt(args.gameItemId);
                let pEventId = $gameMap._interpreter.eventId();
                if (pEventId >= 0)
                    PKD_EPManager.PickUpPlacedItemByEvent(pEventId, gItemId);
            } catch (e) {
                console.warn(e);
            }
        });

    };

    ConfigurateClasses = () => {

        if(PKD_EasyPlacement.PARAMS.ALLOW_DRAG == false) {
            Scene_Map.prototype.pProcessMapEventDragging = () => {};
        }

        // * Совместимость с MapInventory (исправляет некоторые косячки)
        if(Imported.PKD_MapInventory == true) {
            PKD_EasyPlacement.applyMIPatch();
        }

        // * Совместимость с Alpha NET Z 
        if(Imported.Alpha_NETZ == true) {
            PKD_EasyPlacement.applyNETZPatch();
        }
    };

})();
// Generated by CoffeeScript 2.5.1
// * MAIN
Array.prototype.last = function() {
  return this[this.length - 1];
};

TouchInput.mapPoint = function() {
  var x, y;
  x = $gameMap.canvasToMapX(TouchInput.x);
  y = $gameMap.canvasToMapY(TouchInput.y);
  return {x, y};
};

TouchInput.mapScreenPoint = function() {
  var t, th, tw, x, y;
  ({x, y} = TouchInput.mapPoint());
  t = $gameMap.adjustX(x);
  tw = $gameMap.tileWidth();
  x = Math.round(t * tw + tw / 2);
  t = $gameMap.adjustY(y);
  th = $gameMap.tileHeight();
  y = Math.round(t * th + th);
  return {x, y};
};

// Generated by CoffeeScript 2.5.1
var PKD_EPManager;

PKD_EPManager = function() {};

(function() {
  var _;
  _ = PKD_EPManager;
  _.Scene = function() {
    return SceneManager._scene;
  };
  _.OnMapLoaded = function() {
    this.isActive = false;
    this.SetGridVisibility(false);
    if (this.isShouldLoadEvents()) {
      this.CreateEPEventsOnMap();
      $gameSystem.pRestoreDraggableEventsPositions();
      this.RestoreMargins();
      return this.isNextMapLoaded = false;
    }
  };
  _.OnNextMapLoaded = function() {
    return this.isNextMapLoaded = true;
  };
  _.isShouldLoadEvents = function() {
    return this.isNextMapLoaded === true;
  };
  _.IsGridVisible = function() {
    return this.isGridVisible;
  };
  _.IsActive = function() {
    return this.isActive === true;
  };
  _.IsPointIsGood = function() {
    if (this.IsActive()) {
      return this.IsPointIsGoodForPlacement();
    } else if (this.IsEventDragStart()) {
      return this.IsPointIsGoodForDrag();
    } else {
      return true;
    }
  };
  _.IsPointIsGoodForPlacement = function() {
    var x, y;
    // * Потому что добавил движение стрелками
    if ($gameTemp._epSpawned != null) {
      ({x, y} = $gameTemp._epSpawned);
    } else {
      ({x, y} = TouchInput.mapPoint());
    }
    // * Только если нельзя спавнить на другие события (по умолчанию)
    if (!$gameTemp._epSpawnModeOverEvents) {
      // * > 1 because self under mouse
      if ($gameMap.eventsXy(x, y).length > 1) {
        return false;
      }
    }
    if ($gamePlayer.pos(x, y)) {
      return false;
    }
    if (Game_CharacterBase.prototype.isCollidedWithVehicles(x, y)) {
      return false;
    }
    if (!this.CheckRegions(x, y)) {
      return false;
    }
    return this.CheckDistance(x, y);
  };
  _.CheckRegions = function(x, y) {
    var item, region, regionSet;
    regionSet = PKD_EasyPlacement.PARAMS.BAD_REGIONS;
    region = $gameMap.regionId(x, y);
    if (regionSet.contains(region)) {
      return false;
    }
    item = this.CurrentPlacementItemData();
    if (item == null) {
      return true;
    }
    if (item.onlyRegions.length > 0) {
      if (!item.onlyRegions.contains(region)) {
        return false;
      }
    } else if (item.exceptRegions.length > 0) {
      if (item.exceptRegions.contains(region)) {
        return false;
      }
    }
    return true;
  };
  _.CheckDistance = function(x, y) {
    var allowedDist, dist, item;
    item = this.CurrentPlacementItemData();
    if (item == null) {
      return true;
    }
    allowedDist = item.maxDistance;
    if (allowedDist > 0) {
      dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, x, y);
      return dist <= allowedDist;
    } else {
      return true;
    }
  };
  _.SetGridVisibility = function(isGridVisible) {
    this.isGridVisible = isGridVisible;
  };
  _.ItemData = function(pItemIndex) {
    return PKD_EasyPlacement.PARAMS.ITEMS[pItemIndex];
  };
  _.CurrentPlacementItemData = function() {
    var itemData;
    if (!$gameTemp._epPlacementItemId) {
      return null;
    }
    itemData = this.ItemData($gameTemp._epPlacementItemId);
    return itemData;
  };
  //?VERSION
  _.Start = function(pItemIndex, gItemId = 0) {};
  // * Сохраняем текущий предмет для дальнейшей работы с ним
  _.RegisterPlacementItem = function(pItemIndex, gItemId) {
    $gameTemp._epPlacementPartyItemId = gItemId;
    $gameTemp._epPlacementItemId = pItemIndex;
  };
  _.Stop = function() {
    //"STOP".p()
    this.Scene().pEndEPMode();
    this.SetGridVisibility(false);
    this.isActive = false;
    this.ClearRegisteredPlacementItem();
  };
  _.ClearRegisteredPlacementItem = function() {
    $gameTemp._epPlacementPartyItemId = null;
    $gameTemp._epPlacementItemId = null;
  };
  _.PlaceItemOn = function(x, y) {
    var commonEventId, dbItem, evId, itemId, marginY, uniqueId;
    evId = $gameTemp._epSpawned.eventId();
    itemId = $gameTemp._epPlacementItemId;
    dbItem = $gameSystem.pRegisterEPItem($gameMap.mapId(), itemId, x, y, evId);
    this.ActivatePlacedItem($gameMap.mapId(), itemId, evId);
    this.ChangePlacementItem(-1);
    this.CallPlacementAnimation($gameTemp._epSpawned, itemId);
    if (PKD_PocketEvents.IsNetworkGame()) {
      uniqueId = PKD_EPManager.GenerateUniqueId();
      dbItem.push(uniqueId);
      marginY = $gameTemp._epSpawned.epMY;
      PKD_EPManager.SendItemPlacedToServer(x, y, uniqueId, marginY);
    }
    commonEventId = this.ItemData(itemId).ceSpawnGood;
    if (commonEventId > 0) {
      $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  _.CallPlacementAnimation = function(event, itemId) {
    var animationId;
    animationId = this.ItemData(itemId).animationId;
    if (animationId > 0) {
      $gameTemp.requestAnimation([event], animationId);
    }
  };
  _.CallCancelCommonEvent = function() {
    var commonEventId, itemId;
    if ($gameTemp._epPlacementItemId == null) {
      return;
    }
    itemId = $gameTemp._epPlacementItemId;
    commonEventId = this.ItemData(itemId).ceSpawnCancel;
    if (commonEventId > 0) {
      $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  _.ChangePlacementItem = function(count) {
    var itemId;
    itemId = $gameTemp._epPlacementPartyItemId;
    if (itemId == null) {
      return;
    }
    if ($dataItems[itemId] == null) {
      return;
    }
    return $gameParty.gainItem($dataItems[itemId], count);
  };
  _.ActivatePlacedItem = function(mapId, itemId, eventId) {
    var key, sSwitch;
    sSwitch = this.ItemData(itemId).sSwitch;
    if (sSwitch === "None" || sSwitch === "") {
      return;
    }
    key = [mapId, eventId, sSwitch];
    $gameSelfSwitches.setValue(key, true);
    return $gameMap.requestRefresh();
  };
  _.ClearSelfSwitches = function(mapId, eventId) {
    var j, key, len, ref, s;
    ref = ['A', 'B', 'C', 'D'];
    for (j = 0, len = ref.length; j < len; j++) {
      s = ref[j];
      key = [mapId, eventId, s];
      $gameSelfSwitches.setValue(key, false);
    }
    if (mapId === $gameMap.mapId()) {
      $gameMap.requestRefresh();
    }
  };
  // * Удаляет по событию
  _.PickUpPlacedItemByEvent = function(eventId, gItemId = 0) {
    var ev, uniqueId;
    ev = $gameMap.event(eventId);
    if (ev == null) {
      return;
    }
    if (ev.pGetEPDynamicObjId() < 0) {
      return;
    }
    $gameSystem.pRemoveEPItem($gameMap.mapId(), eventId);
    this.Scene().pUnSpawnEPEvent(eventId);
    PKD_EPManager.ClearSelfSwitches($gameMap.mapId(), eventId);
    if (PKD_PocketEvents.IsNetworkGame()) {
      uniqueId = PKD_EPManager.GetUniqueIdBySpawnedEvent(eventId);
      PKD_EPManager.SendItemRemovedToServer(eventId, uniqueId);
    }
    if (gItemId <= 0) {
      return;
    }
    $gameTemp._epPlacementPartyItemId = gItemId;
    this.ChangePlacementItem(1);
    $gameTemp._epPlacementPartyItemId = null;
  };
  
  // * Удаляет по предмету, событие сам находит
  _.PickUpPlacedItem = function(pItemIndex, gItemId) {
    var db, item;
    db = $gameSystem.pGetEPDB()[$gameMap.mapId()];
    if (db == null) {
      return;
    }
    item = db.find(function(i) {
      return i[0] === pItemIndex;
    });
    if (item == null) {
      return;
    }
    return this.PickUpPlacedItemByEvent(item[3], gItemId);
  };
  //?VERSION
  _.CreateEPEventsOnMap = function() {};
  (function() {    // * EVENT DRAGGING SYSTEM
    // * ==================================================================
    _.IsEventDragStart = function() {
      return $gameTemp.pLastDraggableEvent != null;
    };
    _.OnEventDragEnd = function() {
      if ($gameTemp.pLastDraggableEvent == null) {
        return;
      }
      this.Scene().pOnDragEnd();
      $gameTemp.pLastDraggableEvent = null;
    };
    _.GetDraggableEventUnderMouse = function() {
      var event;
      event = null;
      // * Поиск по событию
      event = $gameMap.pGetDraggableEventInTouchPoint();
      // * Если не найдено, поиск по спрайту события
      if (event == null) {
        event = this.Scene().pGetDraggableEventInTouchPoint();
      }
      return event;
    };
    _.StartEventDrag = function() {
      $gameTemp.pPauseMap = false;
      $gameTemp.pLastDraggableEvent = this.GetDraggableEventUnderMouse();
      if ($gameTemp.pLastDraggableEvent == null) {
        return;
      }
      this.Scene().pOnDragStart();
    };
    _.OnEventDragProcess = function() {}; // * EMPTY
    _.IsPointIsGoodForDrag = function() {
      var x, y;
      ({x, y} = TouchInput.mapPoint());
      // * Только если нельзя спавнить на другие события (по умолчанию)
      if (!$gameTemp._epSpawnModeOverEvents) {
        // * Можно вернуть на своё место, поэтому доп. проверка на свою позицию
        if ($gameMap.eventsXy(x, y).length > 0 && !$gameTemp.pLastDraggableEvent.pos(x, y)) {
          return false;
        }
      }
      if ($gamePlayer.pos(x, y)) {
        return false;
      }
      if (Game_CharacterBase.prototype.isCollidedWithVehicles(x, y)) {
        return false;
      }
      return $gameTemp.pLastDraggableEvent.pOnDragCheckRegion(x, y);
    };
    //?VERSION
    return _.ExtractDraggableEventComment = function(list) {};
  })();
})();

// Generated by CoffeeScript 2.5.1
PKD_EPManager.CreateEPEventsOnMap = function() {
  var db, ev, i, item, itemData, len, mapId, ref;
  db = $gameSystem.pGetEPDB();
  mapId = $gameMap.mapId();
  if (!db[mapId]) {
    return;
  }
  ref = db[mapId];
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    itemData = this.ItemData(item[0]);
    ev = this.Scene().pSpawnEPEvent(itemData.eventId, item[1], item[2], item[3]);
  }
};

PKD_EPManager.Start = function(pItemIndex, gItemId = 0) {
  var item;
  //"START".p(pItemIndex)
  if (pItemIndex == null) {
    return;
  }
  if (pItemIndex < 0) {
    return;
  }
  item = this.ItemData(pItemIndex);
  if (item == null) {
    return;
  }
  if (item.eventId <= 0) {
    return;
  }
  this.RegisterPlacementItem(pItemIndex, gItemId);
  $gameTemp._epSpawnModeOverEvents = item.canSpawnOverEvents === true;
  // * В сетевой игре пауза игры недоступна
  $gameTemp.pPauseMap = item.isShouldPauseMap === true && !PKD_PocketEvents.IsNetworkGame();
  this.Scene().pActivateEPMode(item.eventId);
  this.SetGridVisibility(item.gridVisiblity);
  this.isActive = true;
};

PKD_EPManager.ExtractDraggableEventComment = function(list) {
  var comment, data, e;
  if (list == null) {
    return null;
  }
  try {
    comment = KDCoreMini.Utils.getEventCommentValue('draggable', list);
    if (comment != null) {
      data = parseInt(comment.split(':')[1]);
      return data;
    }
  } catch (error) {
    e = error;
    console.warn(e);
    return null;
  }
  return null;
};

PKD_EPManager.RestoreMargins = function() {
  $gameSystem.pRestoreEPMargins();
};

function Game_EPEvent() {
    this.initialize.apply(this, arguments);
}

Game_EPEvent.prototype = Object.create(Game_Event.prototype);
Game_EPEvent.prototype.constructor = Game_EPEvent;

Game_EPEvent.prototype.initialize = function (templateEventId, eventId, epItemId) {
    this._templateEventId = templateEventId;
    this._epItemId = epItemId;
    Game_Event.prototype.initialize.call(this, $gameMap.mapId(), eventId);
    DataManager.extractMetadata(this.event());
    this.setPosition(-1, -1);
};

Game_EPEvent.prototype.event = function () {
    return $dataEPEventsMap.events[this._templateEventId];
};

Game_EPEvent.prototype.pGetEPDynamicObjId = function () {
    return 1; // * JUST FOR CONDITIONS
};

// Generated by CoffeeScript 2.5.1
(function() {
  var Sprite_GridCell;
  Sprite_GridCell = class Sprite_GridCell extends Sprite {
    constructor() {
      super(new Bitmap($gameMap.tileWidth(), $gameMap.tileHeight()));
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this.z = 1;
      this.maxOpacity = 80;
      this.minOpacity = 40;
      this.opacity = this.maxOpacity;
      this.setNormalColor();
      this.updateOpacityChange = this.updateOpacityDown;
      this.colorChangeThread = new KDCoreMini.TimedUpdate(2, this._colorChange.bind(this));
      this._colorChange();
    }

    setNormalColor() {
      return this.bitmap.fillAll('rgba(255, 255, 255, 1)');
    }

    setForbiddenColor() {
      return this.bitmap.fillAll('rgba(255, 0, 0, 1)');
    }

    update() {
      super.update();
      if (this.visible === false) {
        return;
      }
      this.updateOpacityChange();
      return this.colorChangeThread.update();
    }

    _colorChange() {
      if (!this.visible) {
        return;
      }
      if (PKD_EPManager.IsPointIsGood()) {
        return this.setNormalColor();
      } else {
        return this.setForbiddenColor();
      }
    }

    updateOpacityChange() {} // * EMPTPY

    updateOpacityDown() {
      this.opacity -= 3;
      if (this.opacity <= this.minOpacity) {
        return this.updateOpacityChange = this.updateOpacityUp;
      }
    }

    updateOpacityUp() {
      this.opacity += 3;
      if (this.opacity >= this.maxOpacity) {
        return this.updateOpacityChange = this.updateOpacityDown;
      }
    }

  };
  PKD_EasyPlacement.register(Sprite_GridCell);
})();

// Generated by CoffeeScript 2.5.1
(function() {
  PKD_EasyPlacement.applyMIPatch = function() {
    var __moveCell, __onCellClick, __onHotCellClick;
    if (window.PKD_MI == null) {
      return;
    }
    __onCellClick = PKD_MI.onInvCellClick;
    PKD_MI.onInvCellClick = function() {
      if (PKD_EPManager.IsEventDragStart() || PKD_EPManager.IsActive()) {
        return;
      }
      return __onCellClick.call(this, ...arguments);
    };
    __onHotCellClick = PKD_MI.onMapHotCellClick;
    PKD_MI.onMapHotCellClick = function() {
      if (PKD_EPManager.IsEventDragStart() || PKD_EPManager.IsActive()) {
        return;
      }
      return __onHotCellClick.call(this, ...arguments);
    };
    __moveCell = PKD_MI.startMoveCell;
    PKD_MI.startMoveCell = function() {
      if (PKD_EPManager.IsEventDragStart() || PKD_EPManager.IsActive()) {
        return;
      }
      return __moveCell.call(this, ...arguments);
    };
  };
})();

// Generated by CoffeeScript 2.5.1
(function() {
  PKD_PocketEvents.IsNetworkGame = function() {
    return Imported.Alpha_NETZ === true && ANNetwork.isConnected();
  };
  // * Создать (поместить) событие от другого игрока (внешнее)
  PKD_EPManager.PlaceOuterItem = function({pItemIndex, x, y, mapId, spawnedEventId, uniqueId, marginY}) {
    var e, item;
    try {
      item = this.ItemData(pItemIndex);
      return this._SpawnEventOuter({
        mapId: mapId,
        x: x,
        y: y,
        pItemIndex: pItemIndex,
        eventId: item.eventId,
        spawnedEventId: spawnedEventId,
        // * Нужен чтобы была возможность добавлять события даже если
        // * у клиентов разный размер $gameMap._events
        uniqueId: uniqueId,
        marginY: marginY
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  PKD_EPManager.GenerateUniqueId = function() {
    var eventId, uniqueId;
    uniqueId = $gameParty.leader().actorId() + "_" + KDCoreMini.makeid(8) + "_" + $gameMap.mapId();
    // * Защита от копий
    eventId = this.FindSpawnedEventId($gameMap.mapId(), uniqueId);
    if (eventId < 0) {
      return uniqueId;
    } else {
      return PKD_EPManager.GenerateUniqueId();
    }
  };
  // * Создать (поместить) событие на карте (если карта таже) и зарегестрировать
  //?VERSION
  PKD_EPManager._SpawnEventOuter = function(eventData) {}; // * VERSION
  
  // * Сохранить состояние помещённого от другого игрока события
  // * Альтернатива PlaceItemOn
  //?VERSION
  PKD_EPManager._RegisterOuterItem = function(eventData) {}; // * VERSION
  
  // * Удалить внешнее (от другого игрока) событие
  // * Аналог PickUpPlacedItemByEvent
  //?VERSION
  PKD_EPManager.RemoveOuterItem = function() {}; // * VERSION
  
  // * Найти событие по уникальному ID
  PKD_EPManager.FindSpawnedEventId = function(mapId, uniqueId) {
    var db, eventData, i, len, mapData;
    db = $gameSystem.pGetEPDB();
    mapData = db[mapId];
    if (mapData == null) {
      return -1;
    }
    for (i = 0, len = mapData.length; i < len; i++) {
      eventData = mapData[i];
      if (eventData.last() === uniqueId) {
        return eventData[3];
      }
    }
    return -1;
  };
  // * Получить уникальный ID события
  PKD_EPManager.GetUniqueIdBySpawnedEvent = function(mapId, spawnedEventId) {
    var db, eventData, i, len, mapData;
    db = $gameSystem.pGetEPDB();
    mapData = db[mapId];
    if (mapData == null) {
      return null;
    }
    for (i = 0, len = mapData.length; i < len; i++) {
      eventData = mapData[i];
      if (eventData[3] === spawnedEventId && eventData.length > 3) {
        return eventData.last();
      }
    }
    return null;
  };
  // * Спавн (удаление) событий, которые были созданы (удалены) когда текущий игрок был в меню
  PKD_EPManager.OnMapLoadedFromMenu = function() {
    var db, evId, i, item, itemData, j, len, len1, mapId, ref, ref1;
    // * Если новая карта, то пропускаем
    if (this.isShouldLoadEvents()) {
      return;
    }
    if (!$gameTemp._requireNetEventsRefresh) {
      return;
    }
    db = $gameSystem.pGetEPDB();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      return;
    }
    ref = db[mapId];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item == null) {
        continue;
      }
      if ($gameMap.event(item[3]) == null) {
        itemData = this.ItemData(item[0]);
        this.Scene().pSpawnEPEvent(itemData.eventId, item[1], item[2], item[3]);
      }
    }
    if ($gameTemp._peNetEventsToRemove != null) {
      ref1 = $gameTemp._peNetEventsToRemove;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        evId = ref1[j];
        this.Scene().pUnSpawnEPEvent(evId);
      }
      $gameTemp._peNetEventsToRemove = [];
    }
    this.RestoreMargins();
    $gameTemp._requireNetEventsRefresh = false;
  };
  
  // * Сетевые методы (API)
  // * ===========================================
  PKD_EPManager.SendItemPlacedToServer = function(x, y, uniqueId, marginY) {
    var data, e;
    if (!PKD_PocketEvents.IsNetworkGame()) {
      return;
    }
    try {
      data = {
        actorId: ANGameManager.myActorId(),
        pItemIndex: $gameTemp._epPlacementItemId,
        x,
        y,
        mapId: $gameMap.mapId(),
        spawnedEventId: $gameTemp._epSpawned.eventId(),
        uniqueId,
        marginY
      };
      nAPI.sendCustomCommand("pkdPE:PlaceOuterItem", data);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  PKD_EPManager.SendItemRemovedToServer = function(spawnedEventId, uniqueId) {
    var data;
    if (!PKD_PocketEvents.IsNetworkGame()) {
      return;
    }
    data = {
      actorId: ANGameManager.myActorId(),
      mapId: $gameMap.mapId(),
      uniqueId,
      spawnedEventId
    };
    return nAPI.sendCustomCommand("pkdPE:RemoveOuterItem", data);
  };
  //@[OUTER]
  PKD_EPManager.PlaceOuterItemFromServer = function(data) {
    var e;
    if (data == null) {
      return;
    }
    try {
      if (data.actorId === ANGameManager.myActorId()) {
        return;
      }
      return PKD_EPManager.PlaceOuterItem(data);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  //@[OUTER]
  PKD_EPManager.RemoveOuterItemFromServer = function(data) {
    var e;
    if (data == null) {
      return;
    }
    try {
      if (data.actorId === ANGameManager.myActorId()) {
        return;
      }
      return PKD_EPManager.RemoveOuterItem(data);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Расширение методов
  // * -------------------------------------------
  PKD_EasyPlacement.applyNETZPatch = function() {
    var __aliasFixNET06, _alias_nAPI_onCustomCommand_PE4444;
    __aliasFixNET06 = ANMapManager.sendEventMove;
    ANMapManager.sendEventMove = function(eventId) {
      var event;
      event = $gameMap.event(eventId);
      if (event == null) {
        return;
      }
      __aliasFixNET06.call(this, eventId);
    };
    _alias_nAPI_onCustomCommand_PE4444 = nAPI.onCustomCommand;
    nAPI.onCustomCommand = function(name, data) {
      _alias_nAPI_onCustomCommand_PE4444.call(this, ...arguments);
      if (name === "pkdPE:PlaceOuterItem") {
        return PKD_EPManager.PlaceOuterItemFromServer(data);
      } else if (name === "pkdPE:RemoveOuterItem") {
        return PKD_EPManager.RemoveOuterItemFromServer(data);
      }
    };
  };
})();

// Generated by CoffeeScript 2.5.1
(function() {
  // * Создать (поместить) событие на карте (если карта таже) и зарегестрировать
  PKD_EPManager._SpawnEventOuter = function(eventData) {
    var e, eventId, mapId, marginY, pItemIndex, spawnedEvent, spawnedEventId, x, y;
    try {
      ({mapId, x, y, pItemIndex, eventId, spawnedEventId, marginY} = eventData);
      $gameTemp._requireNetEventsRefresh = false;
      $gameSystem.pSaveEPMargins(mapId, spawnedEventId, 0, marginY);
      if ($gameMap.mapId() === mapId) {
        if (KDCore.Utils.isSceneMap()) {
          spawnedEvent = this.Scene().pSpawnEPEvent(eventId, x, y, spawnedEventId);
          this.CallPlacementAnimation(spawnedEvent, pItemIndex);
          PKD_EPManager.RestoreMargins();
        } else {
          $gameTemp._requireNetEventsRefresh = true;
        }
      }
      return this._RegisterOuterItem(eventData);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Сохранить состояние помещённого от другого игрока события
  // * Альтернатива PlaceItemOn
  PKD_EPManager._RegisterOuterItem = function(eventData) {
    var eventId, mapId, pItemIndex, registred, spawnedEventId, uniqueId, x, y;
    ({mapId, x, y, pItemIndex, eventId, uniqueId, spawnedEventId} = eventData);
    registred = $gameSystem.pRegisterEPItem(mapId, pItemIndex, x, y, spawnedEventId);
    registred.push(uniqueId);
    this.ActivatePlacedItem(mapId, pItemIndex, spawnedEventId);
  };
  // * Удалить внешнее (от другого игрока) событие
  // * Аналог PickUpPlacedItemByEvent
  // * Общее событие тут не вызывается, только у того кто устанавливает
  PKD_EPManager.RemoveOuterItem = function({mapId, spawnedEventId, uniqueId}) {
    var e;
    try {
      //"REMOVE OUTER ITEM START".p()
      if ($gameMap.mapId() === mapId) {
        if (KDCore.Utils.isSceneMap()) {
          //"ON SCENE MAP - YES".p()
          // * Поиск по уникальному ID для надёжности
          //eventId = @FindSpawnedEventId(mapId, uniqueId)
          //"SPAWNED EVENT ID _ YES".p() if eventId > 0
          // * Но может и не найти
          //spawnedEventId = eventId if eventId > 0
          this.Scene().pUnSpawnEPEvent(spawnedEventId);
        } else {
          //"UNSPAWN _ GOOD".p()
          $gameTemp._requireNetEventsRefresh = true;
          if ($gameTemp._peNetEventsToRemove == null) {
            $gameTemp._peNetEventsToRemove = [spawnedEventId];
          } else {
            $gameTemp._peNetEventsToRemove.push(spawnedEventId);
          }
        }
      }
      $gameSystem.pRemoveEPItem(mapId, spawnedEventId);
      //"GAME SYSTEM REMOVED".p()
      return PKD_EPManager.ClearSelfSwitches(mapId, spawnedEventId);
    } catch (error) {
      //"SWITCHES CLEARED".p()
      e = error;
      return KDCore.warning(e);
    }
  };
})();

(function(){
    
    DataManager.pLoadEPEventData = function () {
        var mapId = PKD_EasyPlacement.ITEMS_MAP;
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this.loadDataFile('$dataEPEventsMap', filename);
        } else {
            console.warn("EasyPlacement.js: You didn't set a map ID for placement events!");
            window.alert("EasyPlacement.js: You didn't set a map ID for placement events!");
        }
    };

    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_EasyPlacement.LoadPluginSettings();
        DataManager.pLoadEPEventData();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * DUMMY
  _.pGetEPDynamicObjId = function() {
    return -1;
  };
  
  // * DUMMY
  _.epIsDraggable = function() {
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clearPageSettings, ALIAS__setupPageSettings, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__setupPageSettings = _.setupPageSettings;
  _.setupPageSettings = function() {
    var e;
    ALIAS__setupPageSettings.call(this);
    try {
      // * В версии 1.3. в сетевой игре Draggable отключён (временно)
      if (PKD_EasyPlacement.PARAMS.ALLOW_DRAG === true && !PKD_PocketEvents.IsNetworkGame()) {
        this._epDragDataId = PKD_EPManager.ExtractDraggableEventComment(this.list());
        this._epIsDraggableEvent = (this._epDragDataId != null) && this._epDragDataId > 0;
        if (this._epIsDraggableEvent === true) {
          return this.epSetupDragEvent();
        }
      } else {
        return this._epIsDraggableEvent = false;
      }
    } catch (error) {
      e = error;
      this._epIsDraggableEvent = false;
      return console.warn(e);
    }
  };
  //@[ALIAS]
  ALIAS__clearPageSettings = _.clearPageSettings;
  _.clearPageSettings = function() {
    ALIAS__clearPageSettings.call(this);
    return this._epIsDraggableEvent = false;
  };
  // * Прочие настройки перемещения из параметров плагина
  _.epSetupDragEvent = function() {
    var e;
    try {
      this._epDragData = PKD_EasyPlacement.PARAMS.DRAG_ITEMS[this._epDragDataId];
      this._epIsDraggableEvent = this._epDragData != null;
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.epIsDraggable = function() {
    return this._epIsDraggableEvent === true;
  };
  // * Параметры перемещения (сетка, регион, смена картинки, перемещение на другие события)
  _.epGetDragSettings = function() {
    return {};
  };
  // * Когда игрок начал двигать событие
  _.pOnDragStart = function() {
    var e;
    $gameTemp._epSpawnModeOverEvents = this._epDragData.canSpawnOverEvents === true;
    PKD_EPManager.SetGridVisibility(this._epDragData.gridVisiblity);
    // * В сетевой игре пауза игры недоступна
    $gameTemp.pPauseMap = this._epDragData.isShouldPauseMap && !PKD_PocketEvents.IsNetworkGame();
    this._opacity = 200;
    try {
      if (this._epDragData.image == null) {
        return;
      }
      this._pStoredImageData = {};
      this._pStoredImageData.characterIndex = this._characterIndex;
      this._pStoredImageData.characterName = this._characterName;
      this.pOnDragImageChange(this._epDragData.image);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.pOnDragImageChange = function(imageData) {
    if (imageData == null) {
      return;
    }
    if (imageData.characterName == null) {
      return;
    }
    if (imageData.characterName === "") {
      return;
    }
    return this.setImage(imageData.characterName, imageData.characterIndex);
  };
  // * Когда игрок отпустил мышку (закончить перемещение)
  _.pOnDragEnd = function() {
    var x, y;
    PKD_EPManager.SetGridVisibility(false);
    this._opacity = 255;
    this.pOnDragImageChange(this._pStoredImageData);
    this._pStoredImageData = null;
    if (PKD_EPManager.IsPointIsGoodForDrag()) {
      ({x, y} = TouchInput.mapPoint());
      this.locate(x, y);
      $gameSystem.pSaveDraggableEventPosition(this.eventId(), this.x, this.y);
      if (this._epDragData.ceSpawnGood > 0) {
        $gameTemp.reserveCommonEvent(this._epDragData.ceSpawnGood);
      }
    } else {
      SoundManager.playBuzzer();
    }
    // * just return to own place
    $gameTemp._epSpawnModeOverEvents = false;
  };
  _.pOnDragCheckRegion = function(x, y) {
    var region;
    region = $gameMap.regionId(x, y);
    return !this._epDragData.exceptRegions.contains(region);
  };
  _.pIsFacingPlayer = function() {
    var dir, x, y;
    ({x, y} = $gamePlayer);
    dir = $gamePlayer.direction();
    switch (dir) {
      case 8:
        y -= 1;
        break;
      case 6:
        x += 1;
        break;
      case 4:
        x -= 1;
        break;
      default:
        y += 1;
    }
    return this.pos(x, y);
  };
  _.setEPMargins = function(epMX, epMY) {
    this.epMX = epMX;
    this.epMY = epMY;
  };
  // * X пока не учитывается
  _.pOnMargin = function(x, y) {
    var _prevMY, itemSettings, step;
    itemSettings = PKD_EPManager.CurrentPlacementItemData();
    if (itemSettings == null) {
      return;
    }
    if (!itemSettings.allowMargin) {
      return;
    }
    if (this.epMY == null) {
      this.epMY = 0;
    }
    step = itemSettings.marginStep;
    _prevMY = this.epMY;
    this.epMY += y * step;
    if (this.epMY <= itemSettings.marginMin || this.epMY >= itemSettings.marginMax) {
      this.epMY = _prevMY;
    } else {
      $gameSystem.pSaveEPMargins($gameMap.mapId(), this.eventId(), 0, this.epMY);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    return PKD_EPManager.OnNextMapLoaded();
  };
  _.pGetDraggableEventInTouchPoint = function() {
    var events, x, y;
    events = this.pGetAllDraggableEvents();
    if (events.length > 0) {
      ({x, y} = TouchInput.mapPoint());
      return events.find(function(e) {
        return e.pos(x, y);
      });
    }
    //return @eventsXy(x, y).find (e) -> e.epIsDraggable()
    return null;
  };
  _.pGetAllDraggableEvents = function() {
    return this.events().filter(function(e) {
      return e.epIsDraggable();
    });
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    if ((PKD_EPManager.IsEventDragStart() || PKD_EPManager.IsActive()) && $gameTemp.pPauseMap === true) {

    } else {
      return ALIAS__update.call(this, sceneActive);
    }
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (PKD_EasyPlacement.PARAMS.ALLOW_ARROW_MOVE === true && PKD_EPManager.IsActive()) {
      return false;
    } else if (PKD_EPManager.IsEventDragStart()) {
      return false;
    } else {
      return ALIAS__canMove.call(this, ...arguments);
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_System.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this.pGetEPDB(); // * Pocket Events storage
    this.pGetEPDB2(); // * Draggable positions
    return this.pGetEPDB3(); // * Смещение
  };
  _.pGetEPDB = function() {
    if (this.pEPDB == null) {
      this.pEPDB = {};
    }
    return this.pEPDB;
  };
  _.pGetEPDB2 = function() {
    if (this.pEPDB2 == null) {
      this.pEPDB2 = {};
    }
    return this.pEPDB2;
  };
  _.pGetEPDB3 = function() {
    if (this.pEPDB3 == null) {
      this.pEPDB3 = {};
    }
    return this.pEPDB3;
  };
  _.pRegisterEPItem = function(mapId, itemId, x, y, eventId) {
    var db;
    // * Регестрирует созданный
    db = this.pGetEPDB();
    if (db[mapId] == null) {
      db[mapId] = [];
    }
    db[mapId].push([itemId, x, y, eventId]);
    //"REGISTER".p(itemId)
    return db[mapId].last();
  };
  _.pRemoveEPItem = function(mapId, eventId) {
    var db, i, item, itemToDelete, len, ref;
    // * Удаляет созданные
    db = this.pGetEPDB();
    if (db[mapId] == null) {
      return;
    }
    itemToDelete = null;
    ref = db[mapId];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      //if item[1] is x && item[2] is y
      //    itemToDelete = item
      if (item[3] === eventId) {
        itemToDelete = item;
      }
    }
    if (itemToDelete == null) {
      return;
    }
    db[mapId].delete(itemToDelete);
    this.pRemoveEPMargins(mapId, eventId);
  };
  _.pSaveDraggableEventPosition = function(eventId, x, y) {
    var db, mapId;
    // * Сохраняет позицию
    db = this.pGetEPDB2();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      db[mapId] = [];
    }
    db[mapId].push([eventId, x, y]);
  };
  _.pRestoreDraggableEventsPositions = function() {
    var db, i, len, mapId, position, ref;
    // * Возвращает позицию
    db = this.pGetEPDB2();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      return;
    }
    ref = db[mapId];
    for (i = 0, len = ref.length; i < len; i++) {
      position = ref[i];
      if (position == null) {
        continue;
      }
      $gameMap.event(position[0]).setPosition(position[1], position[2]);
    }
  };
  _.pSaveEPMargins = function(mapId, eventId, x, y) {
    var db;
    db = this.pGetEPDB3();
    if (db[mapId] == null) {
      db[mapId] = [];
    }
    db[mapId].push([eventId, x, y]);
  };
  _.pRemoveEPMargins = function(mapId, eventId) {
    var db, eventToDelete;
    db = this.pGetEPDB3();
    if (db[mapId] == null) {
      return;
    }
    eventToDelete = db[mapId].find(function(item) {
      return item[3] === eventId;
    });
    if (eventToDelete == null) {
      return;
    }
    db[mapId].delete(eventToDelete);
  };
  _.pRestoreEPMargins = function() {
    var db, event, i, len, mapId, margin, ref;
    db = this.pGetEPDB3();
    mapId = $gameMap.mapId();
    if (db[mapId] == null) {
      return null;
    }
    ref = db[mapId];
    for (i = 0, len = ref.length; i < len; i++) {
      margin = ref[i];
      if (margin == null) {
        continue;
      }
      event = $gameMap.event(margin[0]);
      if (event == null) {
        continue;
      }
      event.setEPMargins(margin[1], margin[2]);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isMenuEnabled, ALIAS__onMapLoaded, ALIAS__processMapTouch, ALIAS__update, ALIAS__updateDestination, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  // * evId - event to spawn and move
  _.pActivateEPMode = function(evId) {
    this._pInEPMode = true;
    this._pIsSetupOk = false; // * User place Event?
    $gameTemp._epSpawned = this.pSpawnEPEvent(evId, 0, 0, $gameMap._events.length);
  };
  _.pEndEPMode = function() {
    if (this._pIsSetupOk === false) {
      PKD_EPManager.CallCancelCommonEvent();
      this.pUnSpawnEPEvent($gameTemp._epSpawned._eventId);
    }
    $gameTemp._epSpawned = null;
    return this._pInEPMode = false;
  };
  _.pIsEPMode = function() {
    return this._pInEPMode === true;
  };
  _.pSpawnEPEvent = function(evId, x, y, newEvId) {
    var ev, ref;
    if (newEvId == null) {
      newEvId = $gameMap._events.length;
    }
    ev = new Game_EPEvent(evId, newEvId, $gameTemp._epPlacementItemId);
    $gameMap._events[newEvId] = ev;
    if (Imported.VisuMZ_1_EventsMoveCore === true) {
      if ((ref = $gameMap._eventCache) != null) {
        ref.push(ev);
      }
    }
    this._spriteset.pAddNewPlacementEvent(ev._eventId);
    ev.setPosition(x, y);
    return ev;
  };
  _.pUnSpawnEPEvent = function(evId) {
    var event, ref;
    event = $gameMap.event(evId);
    if (event == null) {
      return;
    }
    this._spriteset.pRemovePlacementEvent(evId);
    PKD_EPManager.ClearSelfSwitches($gameMap.mapId(), evId);
    $gameMap._events[evId] = null;
    if (Imported.VisuMZ_1_EventsMoveCore === true) {
      if ((ref = $gameMap._eventCache) != null) {
        ref.delete(event);
      }
    }
    $gameMap.requestRefresh();
  };
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    // * Если были созданы события, пока игрок был на другой сцене (меню)
    if (PKD_PocketEvents.IsNetworkGame()) {
      PKD_EPManager.OnMapLoadedFromMenu();
    }
    PKD_EPManager.OnMapLoaded();
  };
  //@[ALIAS]
  ALIAS__updateDestination = _.updateDestination;
  _.updateDestination = function() {
    if (this.pIsEPMode()) {
      if (!$gamePlayer.isMoving()) {
        $gamePlayer.turnTowardCharacter(TouchInput.mapPoint());
      }
    } else {
      return ALIAS__updateDestination.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isMenuEnabled = _.isMenuEnabled;
  _.isMenuEnabled = function() {
    if (this.pIsEPMode() || PKD_EPManager.IsEventDragStart()) {
      return false;
    } else {
      return ALIAS__isMenuEnabled.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.pIsEPMode()) {
      this.pUpdateEPArrowMove();
      this.pUpdateEPCommon();
      this.pUpdateMarginsScroll();
    } else {
      if (PKD_EPManager.IsEventDragStart()) {
        this.pCheckDragStop();
      }
    }
  };
  //@[ALIAS]
  ALIAS__processMapTouch = _.processMapTouch;
  _.processMapTouch = function() {
    if (this.pIsEPMode()) { // * В режиме placement нельзя draggable events movement!
      return ALIAS__processMapTouch.call(this);
    } else {
      this.pProcessMapEventDragging();
      if (!PKD_EPManager.IsEventDragStart()) {
        return ALIAS__processMapTouch.call(this);
      }
    }
  };
  //?DYNAMIC
  _.pProcessMapEventDragging = function() {
    var draggable;
    if ($gameMessage.isBusy()) {
      return;
    }
    draggable = PKD_EPManager.GetDraggableEventUnderMouse();
    if (draggable == null) {
      return;
    }
    if (draggable.pIsFacingPlayer()) {
      if (TouchInput.isLongPressed()) {
        this.pCheckDraggableEventUnderMouse();
      }
    } else {
      if (TouchInput.isPressed()) {
        this.pCheckDraggableEventUnderMouse();
      }
    }
  };
  _.pCheckDraggableEventUnderMouse = function() {
    if (!PKD_EPManager.IsEventDragStart()) {
      PKD_EPManager.StartEventDrag(); // * Может не выполниться, если нет под курсором события
    }
  };
  _.pCheckDragStop = function() {
    if (TouchInput.isReleased()) {
      PKD_EPManager.OnEventDragEnd();
    }
  };
  _.pGetDraggableEventInTouchPoint = function() {
    return this._spriteset.pGetDraggableEventInTouchPoint();
  };
  _.pOnDragStart = function() {
    if ($gameTemp.pLastDraggableEvent == null) {
      return;
    }
    $gameTemp.clearDestination();
    this._spriteset.pSetDraggableEventState($gameTemp.pLastDraggableEvent, true);
    $gameTemp.pLastDraggableEvent.pOnDragStart();
  };
  _.pOnDragEnd = function() {
    if ($gameTemp.pLastDraggableEvent == null) {
      return;
    }
    $gameTemp.pLastDraggableEvent.pOnDragEnd();
    this._spriteset.pSetDraggableEventState($gameTemp.pLastDraggableEvent, false);
  };
  _.pUpdateEPCommon = function() {
    var x, y;
    if (this.isMenuCalled()) {
      return PKD_EPManager.Stop();
    } else {
      if (!this.__pLTIX || (this.__pLTIX !== TouchInput.x || this.__pLTIY !== TouchInput.y)) {
        ({x, y} = TouchInput.mapPoint());
        $gameTemp._epSpawned.setPosition(x, y);
        this.__pLTIX = null; // * Достаточно сбросить X
      } else {

      }
      // * NO MOVING BY MOUSE (arrow key moving before)
      if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
        if (PKD_EPManager.IsPointIsGood()) {
          this.pPlaceEPItemOnSpot(x, y);
          return PKD_EPManager.Stop();
        } else {
          return SoundManager.playBuzzer();
        }
      }
    }
  };
  _.pUpdateMarginsScroll = function() {
    var threshold;
    threshold = 20;
    if (TouchInput.wheelY >= threshold) {
      $gameTemp._epSpawned.pOnMargin(0, -1);
    } else if (TouchInput.wheelY <= -threshold) {
      $gameTemp._epSpawned.pOnMargin(0, +1);
    }
  };
  _.pUpdateEPArrowMove = function() {
    if (!PKD_EasyPlacement.PARAMS.ALLOW_ARROW_MOVE) {
      return;
    }
    if ($gameTemp._epSpawned == null) {
      return;
    }
    if (Input.isRepeated('left')) {
      this.pMoveSpawnedByArrowKey(-1, 0);
    }
    if (Input.isRepeated('right')) {
      this.pMoveSpawnedByArrowKey(1, 0);
    }
    if (Input.isRepeated('down')) {
      this.pMoveSpawnedByArrowKey(0, 1);
    }
    if (Input.isRepeated('up')) {
      this.pMoveSpawnedByArrowKey(0, -1);
    }
  };
  _.pSetMouseLockWhenArrowMove = function() {
    var x, y;
    ({x, y} = TouchInput);
    this.__pLTIX = x;
    return this.__pLTIY = y;
  };
  _.pMoveSpawnedByArrowKey = function(dx, dy) {
    var x, y;
    this.pSetMouseLockWhenArrowMove();
    ({x, y} = $gameTemp._epSpawned);
    $gameTemp._epSpawned.setPosition(x + dx, y + dy);
  };
  _.pPlaceEPItemOnSpot = function(x, y) {
    PKD_EPManager.PlaceItemOn(x, y);
    return this._pIsSetupOk = true;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__updatePosition, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this.p_dragMode = false;
  };
  _.pSetDragMode = function(p_dragMode) {
    this.p_dragMode = p_dragMode;
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    if (this.p_dragMode === true) {
      this.x = TouchInput.x;
      this.y = TouchInput.y;
      this.z = this._character.screenZ();
    } else {
      ALIAS__updatePosition.call(this);
    }
    // * Смещение по Y, по X не учитываем пока что
    if (this._character.epMY != null) {
      this.y += this._character.epMY;
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createTilemap, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this);
    return this.pCreateEPGrid();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this.pUpdateEPGridLayer();
  };
  _.pCreateEPGrid = function() {
    var bitmap;
    this._pEPGridLayer = new Sprite();
    this._pEPGridLayer.opacity = 50;
    bitmap = new Bitmap($gameMap.width() * $gameMap.tileWidth(), $gameMap.height() * $gameMap.tileHeight());
    this._pEPGridLayer.bitmap = bitmap;
    bitmap.addLoadListener(this.pDrawEPGrid.bind(this));
    this._pEPGridLayer.z = 1;
    this._tilemap.addChild(this._pEPGridLayer);
    return this.pCreateEPHoverCell();
  };
  _.pCreateEPHoverCell = function() {
    this._pEPCell = new PKD_EasyPlacement.LIBS.Sprite_GridCell();
    return this._tilemap.addChild(this._pEPCell);
  };
  _.pDrawEPGrid = function() {
    var drawLineHor, drawLineVert, i, j, k, l, ref, ref1, results;
    drawLineVert = function(b, i) {
      return b.fillRect(0, i * $gameMap.tileWidth(), b.width, 1, 'rgba(0, 0, 0, 1)');
    };
    drawLineHor = function(b, i) {
      return b.fillRect(i * $gameMap.tileHeight(), 0, 1, b.height, 'rgba(0, 0, 0, 1)');
    };
    for (i = k = 0, ref = $gameMap.height(); (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      drawLineVert(this._pEPGridLayer.bitmap, i);
    }
    results = [];
    for (j = l = 0, ref1 = $gameMap.width(); (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
      results.push(drawLineHor(this._pEPGridLayer.bitmap, j));
    }
    return results;
  };
  _.pUpdateEPGridLayer = function() {
    var screenTouchPoint, screenX, screenY, th, tw, tw2;
    this._pEPGridLayer.visible = PKD_EPManager.IsGridVisible();
    this._pEPCell.visible = PKD_EPManager.IsGridVisible();
    if (!this._pEPGridLayer.visible) {
      return;
    }
    if (this._pEPGridLayer == null) {
      return;
    }
    tw = $gameMap.tileWidth();
    tw2 = tw / 2;
    th = $gameMap.tileHeight();
    screenX = Math.round($gameMap.adjustX(-0.5) * tw + tw2);
    screenY = Math.round($gameMap.adjustY(-1) * th + th);
    this._pEPGridLayer.move(screenX, screenY);
    // * Так как добавлена возможность двигать стрелами, то берём координаты $gameTemp._epSpawned
    if (PKD_EPManager.IsActive()) {
      screenTouchPoint = $gameTemp._epSpawned;
      if (screenTouchPoint == null) {
        return;
      }
      this._pEPCell.move(screenTouchPoint.screenX(), screenTouchPoint.screenY());
    } else {
      screenTouchPoint = TouchInput.mapScreenPoint();
      this._pEPCell.move(screenTouchPoint.x, screenTouchPoint.y);
    }
  };
  _.pAddNewPlacementEvent = function(id) {
    var event, spr;
    event = $gameMap._events[id];
    spr = new Sprite_Character(event);
    this._characterSprites.push(spr);
    this._tilemap.addChild(spr);
    spr.update();
  };
  _.pRemovePlacementEvent = function(id) {
    var spr;
    spr = this._characterSprites.find(function(i) {
      return (i._character != null) && i._character.pGetEPDynamicObjId() >= 0 && i._character._eventId === id;
    });
    if (spr == null) {
      return;
    }
    spr.visible = false;
    this._characterSprites.delete(spr);
    //for animSpr in spr._animationSprites
    //    @_tilemap.removeChild animSpr
    this._tilemap.removeChild(spr);
  };
  _.pGetDraggableEventInTouchPoint = function() {
    var events, k, len, s, sprites;
    events = $gameMap.pGetAllDraggableEvents();
    if (events.length > 0) {
      sprites = events.map((e) => {
        return this.findTargetSprite(e);
      });
      for (k = 0, len = sprites.length; k < len; k++) {
        s = sprites[k];
        if (this.pTouchInEvDragRect(s)) {
          return s._character;
        }
      }
    }
    return null;
  };
  _.pTouchInEvDragRect = function(item) {
    var bRealX, bRealY, x, y;
    ({x, y} = TouchInput);
    bRealX = item.x - item._frame.width / 2;
    bRealY = item.y - item._frame.height;
    return x >= bRealX && y >= bRealY && x < bRealX + item.width && y < item.height + bRealY;
  };
  _.pSetDraggableEventState = function(event, state) {
    var sprite;
    sprite = this.findTargetSprite(event);
    sprite.pSetDragMode(state);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_PocketEvents automatic build by PKD PluginBuilder 1.9.2 20.11.2021
