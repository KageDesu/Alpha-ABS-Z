// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"@XDEV_MZ","status":true,"description":"Developer Tools","parameters":{}},
{"name":"Alpha_@Core","status":true,"description":"(v.0.2) Alpha Core Plugin","parameters":{}},
{"name":"Alpha_ABSZ","status":true,"description":"(v.0.2)[PRO] New Active Battle System","parameters":{"AABSZ":"","inputSettings:struct":"{\"LMBMapTouchMode\":\"Default (move)\",\"RMBMapTouchMode\":\"Turn\",\"LMBTargetTouchMode\":\"Smart attack (Primary)\",\"RMBTargetTouchMode\":\"Smart attack (Secondary)\",\"moveType\":\"WASD and Arrows\",\"isDiagonalMovement:b\":\"true\",\"isStaticAtkRot:b\":\"true\",\"keybingind\":\"\",\"kbReload\":\"R\",\"kbCommandMenu\":\"C\",\"kbRotate\":\"Control\"}","spacer|visual":"","visualSettingsGroup":"","fonts:strA":"[\"AABS_0\",\"AABS_1\",\"AABS_2\"]","spacer|enemies":"","enemySettingsGroup":"","enemies_noPassVision:intA":"[\"40\"]","enemies_noPassVision2:intA":"[]","spacer|map":"","mapSettingsGroup":"","map_noProjectilePass:intA":"[\"40\"]","map_noProjectilePass2:intA":"[]"}},
{"name":"PKD_AnimaX_MZ","status":true,"description":"(v.1.1)[PRO] Characters animations system","parameters":{"xAnimations:structA":"[\"{\\\"id\\\":\\\"Reid\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid_Sword\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid8\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"true\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[]\\\"}\",\"{\\\"id\\\":\\\"Slime\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"6\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Skill\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Wolf\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"6\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"18\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"id\\\":\\\"Reid_Bow\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"ABSZe\\\":\\\"Only for Alpha ABS Z\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"dead:s\\\":\\\"\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"is8Way:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dx:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"dy:int\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]","xAnimaParts:structA":"[]"}}
];
