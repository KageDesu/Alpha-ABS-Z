var AA = {};
AA.Utils = {};

// * Если карта (Scene_Map) и включён режим АБС
AA.isABS = function() {
    return AA.System.isABS() && AA.isMap();
};

AA.isMap = function() {
    return AA.System.isMap();
};

AA.warning = function(e, msg) {
    KDCore.warning(e, msg);
};

AA.link = function (library) {
    this[library.name] = library;
};