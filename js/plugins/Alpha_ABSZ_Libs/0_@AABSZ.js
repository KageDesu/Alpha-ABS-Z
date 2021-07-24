var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

// * Проверка Alpha_Core
if(!Imported.Alpha_Core) {
    alert("Alpha ABSZ require Alpha_@Core plugin!");
}
//? Символ AA определяется в Alpha_Core

AA.Version = 10; // 0.1.0


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
