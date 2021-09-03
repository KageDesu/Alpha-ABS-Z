/*:
 * @plugindesc (v.0.1)[PRO] New Active Battle System
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/
 *
 * @help
 *
 * Alpha ABS Z - PREVIEW build
 * Not recommended making game with this plugins yet
 * Only for testing and preview purposes

 * @param AABSZ @text @desc
 * 
 * @param inputSettings:struct
 * @text Controls Settings
 * @type struct<LInputSettings>
 * @default {"LMBMapTouchMode":"Default (move)","RMBMapTouchMode":"Turn","LMBTargetTouchMode":"Smart attack (Primary)","RMBTargetTouchMode":"Smart attack (Secondary)","moveType":"WASD and Arrows","isDiagonalMovement:b":"true","isStaticAtkRot:b":"true","keybingind":"","kbReload":"R","kbCommandMenu":"C","kbRotate":"Control"}
 * @desc Controls and keybingind settings
 * 
 * @param spacer|visual @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettingsGroup
 * @text Visual Parameters
 * 
 * @param fonts:strA
 * @parent visualSettingsGroup
 * @text Fonts
 * @type text[]
 * @default ["AABS_0","AABS_1","AABS_2"]
 * @desc Font files names for preload (from fonts\ folder), without extension
 * 
 * @param spacer|enemies @text‏‏‎ ‎@desc ===============================================
 * 
 * @param enemySettingsGroup
 * @text Enemies settings
 * 
 * @param enemies_noPassVision:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the enemies can not see
 * 
 * @param enemies_noPassVision2:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the enemies can not see
 * 
 * 
 * @param spacer|map @text‏‏‎ ‎@desc ===============================================
 * 
 * @param mapSettingsGroup
 * @text Map settings
 * 
 * @param map_noProjectilePass:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the projectiles can not pass
 * 
 * @param map_noProjectilePass2:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the projectiles can not pass
 * 
 * 
 * 
 * 


 * @command ABSEventSettings
 * @text ABS Enemy Configurate
 * @desc Configurate enemy ABS parameters for this certaint event
 * 
 * @arg MainGroup
 * @text Main Group
 * 
 * @arg viewRadius
 * @parent MainGroup
 * @text View Radius
 * @type number
 * @min 1
 * @max 100
 * @default 5
 * @desc On how many map cells sees enemy
 * 
 * @arg returnRadius
 * @parent MainGroup
 * @text  Return Radius
 * @type number
 * @min 1
 * @max 100
 * @default 12
 * @desc How far can the enemy move away from the place where the battle begins
 * 
 * @arg onDeath
 * @parent MainGroup
 * @text On Death
 * @type text
 * @default
 * @desc ABS Script action (SAction), called when enemy is die
 * 
 * @arg MapGroup
 * @text Map Group
 * 
 * @arg shatterEffect
 * @parent MapGroup
 * @text Shatter Effect?
 * @type boolean
 * @default true
 * @desc Is play sprite shatter effect when enemy is die?
 * 
 * @arg deadSwitch
 * @parent MapGroup
 * @text Dead Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @option 0
 * @default 0
 * @desc Will turn ON this self.switch when enemy is die ( 0 - nothing )
 * 
 * @arg eraseOnDead
 * @parent deadSwitch
 * @text Erase on Dead?
 * @type boolean
 * @default true
 * @desc Erase Event when enemy is die? Only if NOT HAVE Dead Switch
 * 
 * @arg VisualGroup
 * @text Visual Group
 * 
 * @arg UIInfo
 * @parent VisualGroup
 * @text Show UI Info?
 * @type boolean
 * @default true
 * @desc Is show portrait UI when enemy is under cursor?
 * 
 * @arg faceName
 * @parent VisualGroup
 * @text Face Name
 * @type file
 * @required 1
 * @dir img\faces
 * @default
 * @desc Image name for portrait UI
 * 
 * @arg faceIndex
 * @parent faceName
 * @text Face Index
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Face index on face image for portrait UI
 * 
 * @arg AnimationGroup
 * @text Animation Group
 * 
 * @arg hitAnimationId
 * @parent AnimationGroup
 * @text Hit Animation
 * @type animation
 * @default 1
 * @desc Hit animation on character when enemy attacks
 * 


 */
/*~struct~LInputSettings:

@param LMBMapTouchMode
@text LMB Map Touch
@type select
@option Primary attack
@option Default (move)
@option Nothing
@default Default (move)
@desc TODO: wiki page?

@param RMBMapTouchMode
@text RMB Map Touch
@type select
@option Default (menu)
@option Secondary attack
@option Move
@option Turn
@option Nothing
@default Turn
@desc TODO: wiki page?

@param LMBTargetTouchMode
@text LMB Target Touch
@type select
@option Primary attack
@option Default (move)
@option Smart attack (Primary)
@option Turn
@default Smart attack (Primary)
@desc TODO: wiki page?

@param RMBTargetTouchMode
@text RMB Target Touch
@type select
@option Secondary attack
@option Move
@option Smart attack (Secondary)
@option Turn
@default Smart attack (Secondary)
@desc TODO: wiki page?

@param moveType
@text Movement
@type select
@option WASD and Arrows
@option Arrows only
@default WASD and Arrows
@desc Keyboard keys for character movement

@param isDiagonalMovement:b
@text Diagonal Movement?
@type boolean
@default true
@on Yes
@off No
@desc Moving in 8 directions?

@param isStaticAtkRot:b
@text Attack when rotation?
@type boolean
@default true
@on Yes
@off No
@desc Always only attack (no move) when rotating if mouse clicked on map?

@param keybingind
@text Key Bindings

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
 * @option AABS_2
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

