var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

// * Проверка Alpha_Core
if(!Imported.Alpha_Core) {
    alert("Alpha ABSZ require Alpha_@Core plugin!");
} else {
    try {
        if(AA.Core.version < 0.4) {
            alert("Alpha ABSZ require Alpha_@Core version 0.4 or above!");
        }
    } catch (e) {
        console.warn("Something wrong with Alpha_@Core plugin");
        console.warn(e);
    }
}
//? Символ AA определяется в Alpha_Core

AA.Version = 30; // 0.3.0


//TODO: Задавать версию необходимого NET и проверять

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
AA._define = 'build'; // * По умолчанию -> сборка

// * Критическая ошибка, стоп игры
AA.cre = function(e, msg) {
    AA.w(e, msg);
    window.alert(msg || "Critical error occur!");
    SceneManager.update = () => {};
};

// * Если карта (Scene_Map) и включён режим АБС
AA.isABSMap = function() {
    return AA.isABSActive() && AA.isMap();
};

// * АБС в активном режиме
AA.isABSActive = function() {
    return AA.System.isABSActive();
};

AA.isMap = function() {
    return KDCore.Utils.isSceneMap();
};

AA.isDEV = function() {
    return AA._define == 'dev';
};

AA.isPro = function() {
    return true;
};
