//?COMMISSION BY: Ve1dor (23.09.2020)
/*:
 * @plugindesc Активация события кнопками мыши, управление курсором
 * @author Pheonix KageDesu
 * @target MZ
 *
 * @help
 * 
 * Изображения курсоров поместить в папку img\cursors
 * 
 * Управление курсором (вызовы скриптов)
 * 
 * MChangeCursor(ImageName); - установить изображение курсора
 * MResetCursor(); - сбросить на стандартный
 * MHideCursor(); - спрятать курсор
 * MShowCursor(); - показать курсор
 * 
 * Добавьте на страницу события следующие комментарии
 * 
 *  ClickLeftCE_ID - вызов общего события ID 
 *  по левому клику мыши по событию
 *         Пример: ClickLeftCE_10 - вызов общего события номер 10
 * 
 *  ClickRightCE_ID - вызов общего события ID 
 *  по правому клику по событию
 * 
 *  ClickDoubleCE_ID - вызов общего события ID
 *  по двойному клику левой кнопкой мыши по событию
 * 
 *  ActivateLeftClick - активация события левой кнопкой мыши
 *  ActivateRightClick - активация события правой кнопкой мыши
 *  ActivateDoubleClick - активация события двойным нажатием левой кнопки
 * 
 *  ActivateHoverMouse - активация наведением мыши
 *  ActivateUnHoverMouse - активация при покидании мыши
 * 
 *  PlaySEHoverMouse_NAME - проигрывание SE при наведении
 * 
 *  ChangeCursorToImg_NAME - сменить курсор на картинку NAME
 * 
 *  ChangeCursorToIcon_INDEX - сменить курсор на иконку INDEX
 * 
 * 
 * 
 * 
    * @param DefaultCursor
    * @text Курсор по умолчанию
    * @type string
    * @default
    * @desc Имя картинки из папки img \ cursors
*/


(function () {

    MYP_ME = {};

    var parameters = PluginManager.parameters('MYP_MouseEx');
    MYP_ME.DefaultCursor = String(parameters['DefaultCursor'] || '');


    window.MChangeCursor = (name) => {
            TouchInput._mypSetCursorImage(name);
            $gameSystem._lastCustomCursor = name;
    };
    window.MResetCursor = () => {
        TouchInput._mypResetCursor();
        $gameSystem._lastCustomCursor = null;
    };

    window.MHideCursor = () => TouchInput._mypHideCursor();

    window.MShowCursor = () => TouchInput._mypShowCursor();


    MYP_ME._lastEventUnderMouse = null;

    MYP_ME.playSE = function (seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
            return;
        }
        if (seFileName === "") {
            return;
        }
        sound = {
            name: seFileName,
            pan: 0,
            pitch: pitch,
            volume: volume
        };
        AudioManager.playStaticSe(sound);
    };

    MYP_ME.isEventUnderMouse = function () {
        return MYP_ME.getEventUnderMouse() != null;
    };

    MYP_ME.getEventUnderMouse = function () {
        var pageX = TouchInput.x;
        var pageY = TouchInput.y;
        x = $gameMap.canvasToMapX(pageX);
        y = $gameMap.canvasToMapY(pageY);
        var events = $gameMap.eventsXy(x, y);
        if (events.length > 0) {
            MYP_ME._lastEventUnderMouse = events[0];
            return MYP_ME._lastEventUnderMouse;
        } else
            return null;
    };

    MYP_ME.printError = function (error, message) {
        if (message)
            console.warn('MYP_MouseEx.js: ' + message);
        console.error(error);
    };

    MYP_ME.getCommentData = function(event, commentSymbol) {
        try {
            if (!event.page()) return;
            var list = event.list();
            if (list && list.length > 1) {
                var i = 0;
                while (i < list.length) {
                    var item = list[i++];
                    if (!item) continue;
                    if (item.code == 108) {
                        var comment = item.parameters[0];
                        if (comment.contains(commentSymbol)) {
                            var data = comment.split('_');
                            if(data.length > 1) {
                                if (commentSymbol.contains('ChangeCursorToImg') ||
                                    commentSymbol.contains('PlaySEHoverMouse')) {
                                    return data[1]; // * строка
                                } else
                                    return Number(data[1]);
                            } else {
                                return 1;
                            }
                        }
                    }
                }
            }
        } catch (e) {
            MYP_ME.printError(e, 'error while find data from event comments');
            return null;
        }
        return null;
    };

    //@[ALIAS]
    var _alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _alias_Scene_Map_start.call(this);
        this._mypTouchCount = 0;
        this._mypUpdateHoverTimer = 0;
    };

    //@[ALIAS]
    var _alias_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function () {
        if (MYP_ME.isEventUnderMouse()) {

            this.menuCalling = false;
        } else
            _alias_Scene_Map_callMenu.call(this);

    };

    //@[ALIAS]
    var _alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        if (MYP_ME.isEventUnderMouse()) {
            var event = MYP_ME._lastEventUnderMouse;
            if(event.isMouseExEvent()) {
                if (TouchInput.isTriggered()) {
                    this._mypTouchCount += 1;
                    if(event.onMouseExLClick()) {
                        this._mypTouchCount = 0;
                    }
                    if(this._mypTouchCount > 0) {
                        setTimeout(() => {
                            try {
                                this._mypTouchCount = 0;
                            } catch (error) {
                                
                            }
                        }, 400);
                    }
                    if(this._mypTouchCount >= 2) {
                        this._mypTouchCount = 0;
                        event.onMouseExDClick();
                    }
                } else {
                    if (TouchInput.isCancelled()) {
                        event.onMouseExRClick();
                    }
                }
            } else {
                _alias_Scene_Map_processMapTouch.call(this);
            }
        } 
        else
            _alias_Scene_Map_processMapTouch.call(this);
    };

    //@[ALIAS]
    var _alias_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _alias_Scene_Map_update.call(this);
        this._mypUpdateHoverTimer++;
        if(this._mypCISprite.visible == true) {
            this._mypCISprite.move(TouchInput.x, TouchInput.y);
        }
        if (this._mypUpdateHoverTimer >= 10) {
            this._mypUpdateHoverTimer = 0;
            if (MYP_ME.isEventUnderMouse()) {
                var event = MYP_ME._lastEventUnderMouse;
                if (event.isMouseExEvent()) {
                    if ($gameTemp._mypLastHoveredEventId != event.eventId()) {
                        $gameTemp._mypLastHoveredEventId = event.eventId();
                        event.mypProcessHover();
                    }
                }
            } else {
                $gameTemp._mypLastHoveredEventId = null;
            }
        }
        if ($gameTemp._mypIsSomeEventBeenHovered == true || $gameTemp._mypShouldRestoreCursor == true) {
            if (!MYP_ME.isEventUnderMouse()) {
                if($gameTemp._mypShouldRestoreCursor == true) {
                    /*if (PKD_DragEventSystem && PKD_DragEventSystem.isEventDragStart()) {
                        return;
                    }*/
                    $gameTemp._mypShouldRestoreCursor = false;
                    SceneManager._scene._mypHideCursorIcon();
                    TouchInput._mypResetCursorToLast();
                    TouchInput._mypShowCursor();
                }
                if ($gameTemp._mypIsSomeEventBeenHovered == true)
                    if ($gameTemp._mypLastHoveredEventId >= 1) {
                        $gameMap.event($gameTemp._mypLastHoveredEventId).start();
                        $gameTemp._mypLastHoveredEventId = null;
                    }
                $gameTemp._mypIsSomeEventBeenHovered = false;
            }
        }
    };

    //?[NEW]
    Game_Event.prototype.isMouseExEvent = function () {
        try {
            this._CEbyClickL = MYP_ME.getCommentData(this, 'ClickLeftCE');
            this._CEbyClickR = MYP_ME.getCommentData(this, 'ClickRightCE');
            this._CEbyClickD = MYP_ME.getCommentData(this, 'ClickDoubleCE');
            this._AByClickL = MYP_ME.getCommentData(this, 'ActivateLeftClick');
            this._AByClickR = MYP_ME.getCommentData(this, 'ActivateRightClick');
            this._AByClickD = MYP_ME.getCommentData(this, 'ActivateDoubleClick');
            this._AByHoverIn = MYP_ME.getCommentData(this, 'ActivateHoverMouse');
            this._SEByHoverIn = MYP_ME.getCommentData(this, 'PlaySEHoverMouse');
            this._AByHoverOut = MYP_ME.getCommentData(this, 'ActivateUnHoverMouse');
            this._CCByHoverImg = MYP_ME.getCommentData(this, 'ChangeCursorToImg');
            this._CCByHoverIcon = MYP_ME.getCommentData(this, 'ChangeCursorToIcon');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //?[NEW]
    Game_Event.prototype.onMouseExLClick = function () {
        if (this._CEbyClickL != null && this._CEbyClickL > 0) {
            $gameTemp.reserveCommonEvent(this._CEbyClickL);
            return true;
        }
        if (this._AByClickL != null && this._AByClickL > 0) {
            this.start();
            return true;
        }
        return false;
    };
    
    //?[NEW]
    Game_Event.prototype.onMouseExDClick = function () {
        if (this._CEbyClickD != null && this._CEbyClickD > 0) {
            $gameTemp.reserveCommonEvent(this._CEbyClickD);
            return;
        }
        if (this._AByClickD != null && this._AByClickD > 0) {
            this.start();
            return;
        }
    };

    //?[NEW]
    Game_Event.prototype.onMouseExRClick = function () {
        if (this._CEbyClickR != null && this._CEbyClickR > 0) {
            $gameTemp.reserveCommonEvent(this._CEbyClickR);
            return;
        }
        if (this._AByClickR != null && this._AByClickR > 0) {
            this.start();
            return;
        }
    };

    //?[NEW]
    Game_Event.prototype.mypProcessHover = function() {
        $gameTemp._mypIsSomeEventBeenHovered = false;
        if(this._CCByHoverImg || this._CCByHoverIcon) {
            $gameTemp._mypShouldRestoreCursor = true;
            if(this._CCByHoverImg) {
                TouchInput._mypSetCursorImage(this._CCByHoverImg);
            } else {
                SceneManager._scene._mypShowCursorIcon(this._CCByHoverIcon);
            }
        }
        if(this._SEByHoverIn != null) {
            MYP_ME.playSE(this._SEByHoverIn, 100, 80); // * name, pich, volume
        }
        if (this._AByHoverIn != null) {
            this.start();
            return;
        } else {
            $gameTemp._mypIsSomeEventBeenHovered = this._AByHoverOut != null;
            if ($gameTemp._mypIsSomeEventBeenHovered == true)
                $gameTemp._mypLastHoveredEventId = this.eventId();
        }
    };

    //@[ALIAS]
    var _alias_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function () {
        _alias_Scene_Map_createSpriteset.call(this);
        this._mypCreateCursorIconSprite();
    };

    //?[NEW]
    Scene_Map.prototype._mypCreateCursorIconSprite = function () {
        this._mypCISprite = new Sprite(new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight));
        this._mypCISprite.contents = this._mypCISprite.bitmap; // * for drawing Window method
        this._mypCISprite.drawIcon = Window_Base.prototype.drawIcon;
        this.addChild(this._mypCISprite);
    };

    //?[NEW]
    Scene_Map.prototype._mypHideCursorIcon = function () {
        this._mypCISprite.visible = false;
    };

    //?[NEW]
    Scene_Map.prototype._mypShowCursorIcon = function (iconIndex) {
        TouchInput._mypHideCursor();
        this._mypCISprite.bitmap.clear();
        this._mypCISprite.visible = true;
        if(iconIndex > 0)
            this._mypCISprite.drawIcon(iconIndex, 0, 0);
    };

    // * Работа с курсором =========================================================
    // * TOUCH INPUT ===============================================================

    (function(){
        
        var _ = TouchInput;

        const TI_init_43 = TouchInput.initialize;
        TouchInput.initialize = function() {
            TI_init_43.apply(this, arguments);
            this._mypCursorVisible = true;
            this._mypResetCursor();
        };

        _._mypHideCursor = function() {
            this._mypCursorVisible = false;
            document.body.style.cursor = 'none';
        };

        _._mypShowCursor = function() {
            this._mypCursorVisible = true;
            this._mypRefreshCursor();
        };

        _._mypSetCursorImage = function (image) {
            if (this._mypCursorImage !== image) {
                this._mypCursorImage = image;
                this._mypRefreshCursor();
            }
        };

        _._mypResetCursor = function() {
            this._mypSetCursorImage(MYP_ME.DefaultCursor);
        };

        _._mypResetCursorToLast = function () {
            if ($gameSystem && $gameSystem._lastCustomCursor)
                this._mypSetCursorImage($gameSystem._lastCustomCursor);
            else
                this._mypResetCursor();
        };

        _._mypRefreshCursor = function () {
            if(!this._mypCursorVisible) {
                document.body.style.cursor = 'none';
                return;
            }

            const cursorImage = this._mypCursorImage || MYP_ME.DefaultCursor;
            if (cursorImage) {
                const path = `img/cursors/${cursorImage}.png`;
                let x = 0;
                let y = 0;
                document.body.style.cursor = `url('${path}') ${x} ${y}, default`;
            } else {
                document.body.style.cursor = 'default';
            }
        };

    })();


    // * ===========================================================================

})();