var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

if(!Imported.Alpha_Core) {
    alert("Alpha ABSZ require Alpha_@Core plugin!");
}

// * Критическая ошибка, стоп игры
AA.cre = function(e, msg) {
    AA.w(e, msg);
    window.alert(msg || "Critical error occur!");
    SceneManager.update = () => {};
};

// * Если карта (Scene_Map) и включён режим АБС
AA.isABS = function() {
    return AA.System.isABS() && AA.isMap();
};

AA.isMap = function() {
    return AA.System.isMap();
};
