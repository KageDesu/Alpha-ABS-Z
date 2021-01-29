//=============================================================================
// main.js v1.1.0
//=============================================================================

const scriptUrls = [
     "js/libs/pixi.js",
     "js/libs/pako.min.js",
     "js/libs/localforage.min.js",
     "js/libs/effekseer.min.js",
     "js/libs/vorbisdecoder.js",
     "js/rmmz_core.js",
     "js/rmmz_managers.js",
     "js/rmmz_objects.js",
     "js/rmmz_scenes.js",
     "js/rmmz_sprites.js",
     "js/rmmz_windows.js",
     "js/plugins.js"
,"js/plugins/Alpha_ABSZ_Libs/0_@AABSZ.js"
,"js/plugins/Alpha_ABSZ_Libs/0_KDCore.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AASystem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_Changer.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_FloatingWindow.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_Sprite_UIElement.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_UIElementController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIButton.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIFace.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIGauge.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIIcon.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIImage.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIRect.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UIText.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_Sprite_UITextWithBack.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEnemyBattler.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEnemyEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEnemyModelData.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAMapEntitiesSet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAMapProjectile.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAPlayerEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AATargetsManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAUI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/BuffIconsController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Diagonal_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_BattlerBase_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_XAnima.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_XAnima.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Map_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Party_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_System.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/GaugeController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/ImageManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/MapAnimaion_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Math.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/NoteParser_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/ParamsManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/PopTreasureController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Base.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Boot.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA_Scroll_DEV.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Title.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_0.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_Mouse.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_ActorStateGauge.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_ActorStateIcon.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_XAnima.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_PopTreasureItem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_SelectedCircle.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_TilingFrame.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_TilingLine.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_0.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_ActorUI.js"
,"js/plugins/Alpha_ABSZ_Libs/TempJS.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/uAPI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UISet_ActorGauges.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UserUISettings.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Window_Message_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/XAnima.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/XAnimaSet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/XAnimaSetController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/XAnimaTools.js"
];
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
    }

    run() {
        this.showLoadingSpinner();
        this.testXhr();
        this.loadMainScripts();
    }

    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    testXhr() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", document.currentScript.src);
        xhr.onload = () => (this.xhrSucceeded = true);
        xhr.send();
    }

    loadMainScripts() {
        for (const url of scriptUrls) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script.defer = true;
            script.onload = this.onScriptLoad.bind(this);
            script.onerror = this.onScriptError.bind(this);
            script._url = url;
            document.body.appendChild(script);
        }
        this.numScripts = scriptUrls.length;
        window.addEventListener("load", this.onWindowLoad.bind(this));
        window.addEventListener("error", this.onWindowError.bind(this));
    }

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
            PluginManager.setup($plugins);
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.target._url);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = this.makeErrorHtml(name, message);
            document.body.appendChild(errorPrinter);
        }
    }

    makeErrorHtml(name, message) {
        const nameDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        nameDiv.id = "errorName";
        messageDiv.id = "errorMessage";
        nameDiv.innerHTML = name;
        messageDiv.innerHTML = message;
        return nameDiv.outerHTML + messageDiv.outerHTML;
    }

    onWindowLoad() {
        if (!this.xhrSucceeded) {
            const message = "Your browser does not allow to read local files.";
            this.printError("Error", message);
        } else if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            Utils.isNwjs() &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        const onLoad = this.onEffekseerLoad.bind(this);
        const onError = this.onEffekseerError.bind(this);
        effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}

const main = new Main();
main.run();

//-----------------------------------------------------------------------------


























