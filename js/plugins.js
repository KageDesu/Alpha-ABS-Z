// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"@XDEV_MZ","status":true,"description":"Developer Tools","parameters":{}},
{"name":"Alpha_@Core","status":false,"description":"(v.0.1) Alpha Core Plugin","parameters":{}},
{"name":"Alpha_ABSZ","status":true,"description":"(v.0.1)[PRO] Active Battle System","parameters":{"Test":"","HPGauge:struct":"{\"visible:bool\":\"true\",\"isCanBeEdited:bool\":\"true\",\"position:struct\":\"{\\\"x:e\\\":\\\"304\\\",\\\"y:e\\\":\\\"560\\\"}\",\"label\":\"Player_HPGaugeLabel\",\"lagelMargins:struct\":\"{\\\"x:int\\\":\\\"-33\\\",\\\"y:int\\\":\\\"5\\\"}\",\"valueTextType:str\":\"value\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"20\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_0\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#edead8\\\"}\",\"gauge:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"vertical:bool\\\":\\\"false\\\",\\\"fill\\\":\\\"Player_HPGauge\\\",\\\"foreground\\\":\\\"\\\",\\\"mask\\\":\\\"\\\",\\\"backColor:css\\\":\\\"#000000\\\",\\\"backOpacity:int\\\":\\\"160\\\"}\"}","xAnimations:structA":"[\"{\\\"id\\\":\\\"Reid\\\",\\\"base:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"inBattle:s\\\":\\\"{\\\\\\\"move:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"19\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"idle:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"moveToIdleDelay:i\\\\\\\":\\\\\\\"4\\\\\\\"}\\\",\\\"actions:structA\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Attack\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Defense\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"animation:s\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"isOneDirection:b\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frames:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"speed:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"expandFirstFrame:i\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]","fonts:strA":"[\"AABS_0\",\"AABS_1\"]"}},
{"name":"MYP_MouseEx","status":false,"description":"Активация события кнопками мыши, управление курсором","parameters":{"DefaultCursor":""}}
];
