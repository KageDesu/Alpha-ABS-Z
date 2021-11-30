//=============================================================================
// main.js v1.3.3
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
,"js/plugins/Alpha_ABSZ_Libs/@@_Alpha_@Core_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/0_@AABSZ.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAEnemyBattler.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAExtensions.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAGEvents.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAInput.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AANetwork.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AAScriptAction.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AASkill2.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AASkill2MapAction.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AASystem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_AIFlowMachine.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_DevSymbol_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/1_KDCoreExt.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_AAEnemyBattler_Network.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/2_AIFlowMachine_Network.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/3_AASkillsSet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/3_AASkillsTimers.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/3_NETCharacter_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AABattleAction.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AABattleActionsManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AABattleManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AACommon.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AADamagePopUpFactory.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEnemyEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEnemyModelData.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAEventSettingsParser.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAMapEntitiesSet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AANetworkCharEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AANetworkManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAPlayerEntity.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AATargetsManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAUI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AAVisionManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/AIFlow.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/BuffIconsController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/DataManager_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/DataManager_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/EnemyAI_BattleFlow.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/EnemyAI_FlowMachine.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/EnemyAI_FreeFlow.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/FWindow_SkillSelect.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_ActionResult_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_ActionResult_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Actor_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Actor_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Battler_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Battler_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_BattlerBase_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_BattlerBase_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_AASkills.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Character_AnimaX.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_CharacterBase_AAMoving.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AANet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_AIMove.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Event_ExtraAAParams.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Interpreter_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Map_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Map_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Map_AASkills.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Party_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Party_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_AASkills.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Player_Input.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_System.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Temp_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Temp_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Game_Troop_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/GaugeController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Guard.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/ImageManager_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/MapAnimaion_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Math.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/ParamsManager.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Parser.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/PopTreasureController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Base.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Boot.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_443_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA_Input.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA_MouseDetection.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_AA_Scroll.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Map_TEST.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_Title.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_0.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Scene_UIEditor_Mouse.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_AADamagePopUpItem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_AAMapSkill2Projectile.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_ActorStateGauge.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_ActorStateIcon.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_AAEffects.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_AAInfo.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Character_AAWeapMotion.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_CharacterMiniGauge.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_EnemyInfo.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_PopTreasureItem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_SkillImpactSelector.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_SkillPanelItem.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_SkillPanelOutline.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_SkillPanelOutlineDummy.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Weapon_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Sprite_Weapon_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_AA.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_AA_Animation.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_AA_Layers.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_AA_SpriteEffects.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_Map_AASkills.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_0.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_ActorUI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_SkillsSet.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Spriteset_UI_Target.js"
,"js/plugins/Alpha_ABSZ_Libs/TempJS.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/uAPI.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UISet_ActorGauges.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UISet_Skills.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UISet_TargetInfo.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UISkillsItemsController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UITargetInfoController.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/UserUISettings.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Window_BattleSkill_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Window_Message_@.js"
,"js/plugins/Alpha_ABSZ_Libs/_CFCompiled/Window_SkillSelectorList.js"
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




































































