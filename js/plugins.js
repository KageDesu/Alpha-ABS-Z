// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"@XDEV_MZ","status":true,"description":"Developer Tools","parameters":{}},
{"name":"Alpha_@Core","status":false,"description":"(v.0.3) Alpha Core Plugin","parameters":{}},
{"name":"Alpha_ABSZ","status":true,"description":"(v.0.2)[PRO] New Active Battle System","parameters":{"AABSZ":"","inputSettings:struct":"{\"LMBMapTouchMode\":\"Default (move)\",\"RMBMapTouchMode\":\"Turn\",\"LMBTargetTouchMode\":\"Smart attack (Primary)\",\"RMBTargetTouchMode\":\"Smart attack (Secondary)\",\"moveType\":\"WASD and Arrows\",\"isDiagonalMovement:b\":\"true\",\"isStaticAtkRot:b\":\"true\",\"keybingind\":\"\",\"kbReload\":\"R\",\"kbCommandMenu\":\"C\",\"kbRotate\":\"Control\"}","spacer|visual":"","visualSettingsGroup":"","fonts:strA":"[\"AABS_0\",\"AABS_1\",\"AABS_2\"]","spacer|enemies":"","enemySettingsGroup":"","enemies_noPassVision:intA":"[\"40\"]","enemies_noPassVision2:intA":"[]","spacer|map":"","mapSettingsGroup":"","map_noProjectilePass:intA":"[\"40\"]","map_noProjectilePass2:intA":"[]"}},
{"name":"PKD_AnimaX_MZ","status":true,"description":"(v.1.1)[PRO] Characters animations system","parameters":{"xAnimations:structA":"[\"{\\\"id\\\":\\\"Reid\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid_Sword\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid8\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[]\\\"}\",\"{\\\"id\\\":\\\"Slime\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"6\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Skill\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Wolf\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"6\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"18\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"dash:s\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid_Bow\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]","xAnimaParts:structA":"[]"}},
{"name":"PKD_MapInventory","status":true,"description":"(v.2.0)[PRO] Visual Map Inventory","parameters":{"OpenMapInventoryKey":"i","TakeAllChestKey":"t","useGamepad:b":"false","gpOpenKey":"Back","spacer|inventorySettings":"","headerInventorySettings":"","ShowEquipedItemsInInventory":"true","MapInventoryDrag":"true","MapInventorySortEquip":"true","MapInventorySortItems":"true","AllowAutoRefreshUsable":"true","UseSlider":"true","AllowPartySelect":"true","AllowNonBattlePartyMembers":"false","StaticDescPosition:b":"false","StaticDescPosXY:struct":"{\"x:e\":\"0\",\"y:e\":\"0\"}","spacer|chestsSettings":"","headerChestsSettings":"","AllowStoreInChest":"true","GoldItem:i":"0","spacer|weightSystem":"","UseWSystem":"false","wSystemVariableId":"1","wSystemAutoStateId":"0","wSystemAllowSlowDown":"false","spacer|limitedSystem":"","UseLimitedCellsSystem:b":"false","lcVariableItems:int":"1","lcVariableWeapons:int":"1","lcVariableArmors:int":"1","lsIgnoreLimitByGainItems:b":"true","spacer|screenButton":"","UseScreenButton":"true","spacer|rareItemsSystem":"","AllowRareItemSystem":"true","QualitySystemColor:b":"false","QualitySystemColorWindows:b":"false","spacer|equipStatsSystem":"","AllowEquipsStats":"true","ShowFullEquipedStats":"false","ExtraDescriptionsForStats:structA":"[]","spacer|outerItemsSystem":"","AllowOuterItems":"false","OIHotKeyText:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"22\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"18\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"Consolas\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#F9E159\"}","OIHotKeyEnable:bool":"true","OIHotCells:structA":"[\"{\\\"key:str\\\":\\\"1\\\",\\\"pos:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"560\\\\\\\"}\\\"}\", \"{\\\"key:str\\\":\\\"2\\\",\\\"pos:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"560\\\\\\\"}\\\"}\", \"{\\\"key:str\\\":\\\"3\\\",\\\"pos:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"560\\\\\\\"}\\\"}\", \"{\\\"key:str\\\":\\\"f\\\",\\\"pos:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"560\\\\\\\"}\\\"}\"]","spacer|cellsSystem":"","headerCellsSettings":"","UseImageIconsInWindows:b":"true","UseCustomCellsSize:b":"false","CustomCellSettings:struct":"{\"iconSize:i\":\"30\",\"columnsPerPage:i\":\"5\",\"rowsPerPage:i\":\"5\",\"iconMode:i\":\"1\"}","spacer|extraDescriptions":"","ExtraDescriptions:structA":"[]","spacer|throwOutSystem":"","AllowThrowOutSystem:b":"true","ThrowOutSettings:struct":"{\"margins:struct\":\"{\\\"x:int\\\":\\\"15\\\",\\\"y:int\\\":\\\"350\\\"}\",\"startOpacity:int\":\"175\",\"fadeOutSpeed:int\":\"5\",\"throwOutSE\":\"Wind7\"}"}}
];
