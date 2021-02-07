var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

if(!Imported.Alpha_Core) {
    alert("Alpha ABSZ require Alpha_@Core plugin!");
}

// * Если карта (Scene_Map) и включён режим АБС
AA.isABS = function() {
    return AA.System.isABS() && AA.isMap();
};

AA.isMap = function() {
    return AA.System.isMap();
};
