/*:
 * @plugindesc (v.0.3)[PRO] New Active Battle System
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/
 *
 * @help
 *
 * Documentation: https://github.com/KageDesu/Alpha-ABS-Z/wiki
 *

 * @param AABSZ @text @desc
 * 
 * @param inputSettings:struct
 * @text Controls Settings
 * @type struct<LInputSettings>
 * @default {"LMBMapTouchMode":"Default (move)","RMBMapTouchMode":"Turn","LMBTargetTouchMode":"Smart attack (Primary)","RMBTargetTouchMode":"Smart attack (Secondary)","moveType":"WASD and Arrows","isDiagonalMovement:b":"true","isStaticAtkRot:b":"true","keybingind":"","kbReload":"R","kbCommandMenu":"C","kbRotate":"Control"}
 * @desc Controls and keybingind settings
 * 
 * @param spacer|common @text‏‏‎ ‎@desc ===============================================
 * 
 * @param commonSettingsGroup
 * @text Common Parameters
 * 
 * @param fonts:strA
 * @parent commonSettingsGroup
 * @text Fonts
 * @type text[]
 * @default []
 * @desc Font files names for preload (from fonts\ folder), without extension
 * 
 * @param spacer|popUpSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param popUpDamageSettingsGroup
 * @text Pop Up Settings
 * 
 * @param isShowPopUp:bool
 * @parent popUpDamageSettingsGroup
 * @type boolean
 * @text Is Enable?
 * @on Yes (enabled)
 * @off No (disabled)
 * @default true
 * @desc Is Pop Up system enabled? false - not any Pop Up's at all
 * 
 * @param popUpTextForMiss
 * @parent popUpDamageSettingsGroup
 * @text Text for Miss
 * @default Miss
 * @desc Text for Miss PopUp
 * 
 * @param popUpExpSettings:struct
 * @parent popUpDamageSettingsGroup
 * @text Experience Pop Up
 * @type struct<LDPUExp>
 * @default {"active:b":"true","styleId":"Experience","textFormat":"+%1 exp","aboveChar:b":"false","bindToChar:b":"false"}
 * @desc Settings for Experience Pop Up
 * 
 * @param popUpDamageTable:structA
 * @parent popUpDamageSettingsGroup
 * @text Pop Up Table
 * @type struct<LDamagePopUpVisualSettings>[]
 * @default ["{\"id\":\"Miss_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"13\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#E6E6E6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Heal_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#80FF00\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FFFFFF\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#e3483d\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy_Critical\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-5\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"26\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#F3E107\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player_Critical\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FF0000\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_Other_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#008080\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Experience\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-10\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#a365e6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}"]
 * @desc Damage (skills) PopUp's visual settings
 * 
 * @param spacer|skillPanel @text‏‏‎ ‎@desc ===============================================
 * 
 * @param skillPanelSettingsGroup
 * @text Skill Panel settings
 * 
 * @param isAddNewSkillsOnPanelOnLearning:bool
 * @parent skillPanelSettingsGroup
 * @text Add Skill On Learning?
 * @type boolean
 * @on Add
 * @off No
 * @default true
 * @desc When player learn new skill, add skill on skills panel automatically?
 * 
 * @param isAddNewItemOnPanelOnPickup:bool
 * @parent skillPanelSettingsGroup
 * @text Add Item On Pick up?
 * @type boolean
 * @on Add
 * @off No
 * @default true
 * @desc When player pick up new item, add item on skills panel automatically?
 * 
 * @param isUseOutlineEffect:bool
 * @parent skillPanelSettingsGroup
 * @text Outline effect?
 * @type boolean
 * @on Yes (quality)
 * @off No (performance)
 * @default true
 * @desc Outline glow effects for skill slots (when activated, ready, disabled) Turn OFF for better performance.
 * 
 * @param primaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Primary Attack Slot
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"218\",\"y:e\":\"583\"}","symbol":"E"}
 * @desc Required. Skill slot for primary attack (main weapon)
 * 
 * @param secondaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Secondary Attack Slot
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"255\",\"y:e\":\"583\"}","symbol":"Q"}
 * @desc Required. Skill slot for secondary attack
 * 
 * @param allSkillSlots:structA
 * @parent skillPanelSettingsGroup
 * @text Skill Slots
 * @type struct<LSkillSlotItem>[]
 * @default ["{\"position:struct\":\"{\\\"x:e\\\":\\\"302\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"1\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"339\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"2\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"376\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"3\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"413\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"4\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"450\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"5\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"487\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"6\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"524\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"7\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"561\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"8\"}"]
 * @desc Optional. Skill slots.
 * 
 * @param spacer|playerAndParty @text‏‏‎ ‎@desc ===============================================
 * 
 * @param playerAndPartySettingsGroup
 * @text Player and Party settings
 * 
 * @param isShakeScreenWhenPlayerGetDamage:bool
 * @parent playerAndPartySettingsGroup
 * @text Is Shake on Damage?
 * @type boolean
 * @on Shake
 * @off No
 * @default true
 * @desc Is shake screen when player receive damage?
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
 * @desc The numbers of the regions through which the enemies can not see. Global, for all enemies.
 * 
 * @param enemies_noPassVision2:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the enemies can not see. Global, for all enemies.
 * 
 * 
 * @param spacer|map @text‏‏‎ ‎@desc ===============================================
 * 
 * @param mapSettingsGroup
 * @text Map settings
 * 
 * @param mapScrolling:s
 * @text Map Scrolling
 * @parent mapSettingsGroup
 * @type struct<LMapScrollSettings>
 * @default {"isEnabled:b":"false","scrollZone:int":"10","speed:int":"5","delay:int":"60","resetOnMove:b":"true","resetOnAction:b":"true"}
 * @desc Mouse map scrolling settings
 * 
 * @param isShowItemGainNotify:bool
 * @parent mapSettingsGroup
 * @text Item gain notify
 * @type boolean
 * @on Show
 * @off No
 * @default true
 * @desc Shows a pop-up notification when gain item
 * 
 * @param map_noProjectilePass:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param map_noProjectilePass2:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param miniHpGaugeSetings:s
 * @text Mini HP Gauges
 * @parent mapSettingsGroup
 * @type struct<LMiniHpGaugeSettings>
 * @default {"active:b":"true","showOnlyOnHover:b":"true","showOnDamage:b":"true"}
 * @desc Mini HP gauges above ABS events settings
 * 
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

/*~struct~LDamagePopUpVisualSettings:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for refer to this settings in <popUpStyleId:X> parameter
 *
 * @param randDX:int
 * @text Rand DX
 * @type number
 * @default 0
 * @min 0
 * @desc Random value in pixels (> 0) to add to X at Pop Up start (x +- DX)
 *
 * @param randDY:int
 * @text Rand DY
 * @type number
 * @default 0
 * @min 0
 * @desc Random value in pixels (> 0) to add to Y at Pop Up start (y + DY)
 *
 * @param stayTime:int
 * @text Life Time
 * @type number
 * @default 12
 * @min 1
 * @desc Life time before PopUp starts disapear
 *
 * @param changeFontSize:int
 * @text Final Font Size
 * @type number
 * @default 22
 * @min 1
 * @desc Final value of font size. Can be more, equal or less that in Value text settings 
 *
 *
 * @param noFlyUp:bool
 * @text Is NO Fly?
 * @type boolean
 * @default false
 * @on Stay still
 * @off Fly Up
 * @desc Will be pop up stay still? False - will fly up to disapear
 * 
 * @param noFadeOut:bool
 * @text Is NO Fade?
 * @type boolean
 * @default false
 * @on No Fade
 * @off Fade out
 * @desc Will be pop up stay opaque all time? False - will fade out to disapear
 * 
 * @param text:struct
 * @text Value Text
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"100\",\"h:int\":\"100\"}","margins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","alignment:str":"center","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"3\"}","font:struct":"{\"face:str\":\"AABS_0\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#FFFFFF"}
 * @desc Text settings. TextBox Size parameter NOT uses.
 *
 * @param image:struct
 * @text Extra image
 * @default {"name":"","margins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","fadeInSpeed:int":"20"}
 * @type struct<LDPUImage>
*/

/*~struct~LDPUImage:
 * @param name
 * @text Name
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Optional. Addition image file for Pop Up Item.
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Position of image, relative Pop Up item
 *
 * @param fadeInSpeed:int
 * @text Fade speed
 * @type number
 * @default 20
 * @min 1
 * @desc Image fade in speed. Image starts transparent. Set to 255 to show image opaque immediately
 */

 /*~struct~LDPUExp:

    @param active:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is need show Pop Up when EXP given to character? No - disable at all

    @param styleId
    @text Settings ID
    @default Experience
    @desc Pop Up Settings ID from Pop Up Table parameter

    @param textFormat
    @text Text Format
    @default +%1 exp
    @desc Pop Up Text, %1 will be replaced to experience value

    @param aboveChar:b
    @text Is Above Character?
    @type boolean
    @on Yes (above char)
    @off No (above enemy)
    @default false
    @desc Exp Pop Up show above character or above killed enemy?

    @param bindToChar:b
    @text Bind to char?
    @type boolean
    @on Yes (stay above char)
    @off No (stay on screen)
    @default false
    @desc Pop Up will stay above character or (if false) on screen (and moved with screen)
 */


/*~struct~LMiniHpGaugeSettings:
    @param active:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is need show Mini HP gauges for ABS events on map? No - disable at all

    @param showOnlyOnHover:b
    @text Is Show only on Hover?
    @type boolean
    @on Yes (hover)
    @off No (always)
    @default true
    @desc Is show Mini HP gauge only when event hovered? No - always

    @param showOnDamage:b
    @text Is Show on Damage?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is show Mini HP gauge for short time when ABS event receive damage?
*/
/*~struct~LMapScrollSettings:
    @param isEnabled:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default false
    @desc Is Map Scrolling enabled by default? For enable or disable during game you can use uAPI script calls.

    @param scrollZone:int
    @text Activation Border Size
    @type number
    @min 10
    @max 50
    @default 10
    @desc Scroll activation borders size on screen edges, in pixels

    @param speed:int
    @text Scrolling speed
    @type number
    @min 1
    @max 10
    @default 5
    @desc Camera scrolling speed

    @param delay:int
    @text Delay
    @type number
    @min 0
    @default 30
    @desc Delay in frames (60 = 1 second) before starts scrolling

    @param resetOnMove:b
    @text Reset when moving?
    @type boolean
    @on Reset
    @off No
    @default true
    @desc Center camera (reset scroll) when player starts moving?

    @param resetOnAction:b
    @text Reset on action?
    @type boolean
    @on Reset
    @off No
    @default true
    @desc Center camera (reset scroll) when player affected by any skill (get damage, attacked)?
*/
/*~struct~LSkillSlotItem:
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Skill slot position on screen
 *
 * @param symbol
 * @text Key
 * @default
 * @desc Keyboard key for activate skill slot
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
 * @option AABS_3
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
