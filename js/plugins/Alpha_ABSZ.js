/*:
 * @plugindesc (v.0.1)[PRO] Active Battle System
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kagedesuworkshop.blogspot.com
 *
 * @help
 *

 * @param Test
 * 
 * @param HPGauge:struct
 * @type struct<LActorGauge>
 * @default
 * @desc
 * 
 * @param fonts:strA
 * @text Fonts
 * @type text[]
 * @default ["AABS_0","AABS_1"]
 * @desc TODO:
 * 
 * @param inputSettings:struct
 * @text Input Settings
 * @type struct<LInputSettings>
 * @default
 * @desc Input and keybingind settings
 * 


 * @command ABSEventSettings
 * @text ABS Enemy Configurate
 * @desc Configurate enemy ABS parameters for this certaint event
 * 
 * @arg deadSwitch
 * @text Dead Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D 
 * @default D
 * @desc What self.switch will be turn ON when enemy is dead and turn OFF when is revive (alive)
 * 
 * @arg viewRadius
 * @text  View Range
 * @type number
 * @min 1
 * @max 50
 * @default 12
 * @desc Enemy view radius
 * 


 */
/*~struct~LInputSettings:

@param mouseAction
@text Left Mouse Click
@type select
@option Attack Only
@option Movement Only
@option Combined
@default Attack Only
@desc TODO: wiki page?

@param targetSelect
@text Target Select
@type select
@option Left Mouse Button
@option Right Mouse Button
@default Right Mouse Button
@desc TODO:

@param targetReset:b
@text Target Reset (RMB)
@type boolean
@on Yes
@off No
@default true
@desc Always reset target by right mouse click?

@param menuByRightClick:b
@text Open Menu (RMB)
@type boolean
@on Yes
@off No
@default false
@desc Open menu by right mouse click?


@param moveType
@text Movement
@type select
@option WASD and Arrows
@option Arrows only
@default WASD and Arrows
@desc Keyboard keys for character movement

@param rotateType
@text Rotatation
@type select
@option Target
@option Mouse
@option Both
@option None
@default Target
@desc When Rotate key pressed, rotate player toward...(None - no rotation)

@param keybingind
@text Key Bindings

@param kbAttack
@text Attack
@parent keybingind
@default E
@desc TODO:

@param kbDefense
@text Defense
@parent keybingind
@default F
@desc TODO:

@param kbSelectTarget
@text Next Target
@parent keybingind
@default Q
@desc TODO:

@param kbResetTarget
@text Reset Target
@parent keybingind
@default Z
@desc TODO:

@param kbReload
@text Reload
@parent keybingind
@default R
@desc TODO:

@param kbCommandMenu
@text Commands
@parent keybingind
@default C
@desc TODO:

@param kbRotate
@text Rotate
@parent keybingind
@default Control
@desc TODO:

*/
/*~struct~LActorGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible at start?
 * 
 * @param isCanBeEdited:bool
 * @text Is Editable?
 * @type boolean
 * @default true
 * @desc Can player edit this gauge in UI Editor?
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Position on screen
 * 
 * @param label
 * @text Label
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Label image for gauge, optional
 * 
 * @param lagelMargins:struct
 * @text Label Margins
 * @type struct<XY>
 * @default
 * @desc Position of label, relative gauge
 * 
 * @param valueTextType:str
 * @text Value Type
 * @default value
 * 
 * @param text:struct
 * @text Value Text
 * @type struct<CText>
 * 
 * @param gauge:struct
 * @text Gauge
 * @type struct<CGauge>
 * 
 * 
*/
/*~struct~CGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible?
 *
 * @param vertical:bool
 * @text Is Vertical?
 * @type boolean
 * @default false
 * @desc Gauge will use vertical fill?
 * 
 * @param fill
 * @text Fill Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Gaguge fill image, required!
 * 
 * @param foreground
 * @text Foreground Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Image above gauge fill, optional
 * 
 * @param mask
 * @text Mask Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Whole gauge image mask, optional
 * 
 * @param backColor:css
 * @type string
 * @text Background Color
 * @default #000000
 * @desc Text color in HEX format (#000000)
 * 
 * @param backOpacity:int
 * @type number
 * @min 0
 * @max 255
 * @text Background Opacity
 * @default 255
 * @desc from 0 to 255, 0 - transparent, 255 - opaque
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type combo
 * @option AABS_0
 * @option AABS_1
 * @default AABS_0
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */

