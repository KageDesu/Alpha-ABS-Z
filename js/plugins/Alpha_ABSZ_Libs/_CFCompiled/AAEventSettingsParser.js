// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAEventSettingsParser.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AAEventSettingsParser;
  AAEventSettingsParser = class AAEventSettingsParser {
    constructor(list) {
      this.list = []; // * Список всех комментариев
      this.absParameters = []; // * ABS параметры
      this.param = null; // * Параметр плагина (MZ)
      this.mainLine = ""; // * <ABS:X>
      this.parsedParams = []; // * Финальные значения параметров на замену
      this._pasreEventList(list);
      this._parseABSParamsBase();
      this._parseABSParamsSequence();
      this._parseParams();
      this._parsePluginCommand();
      return;
    }

    isHaveExtraParameters() {
      return this.parsedParams.length > 0;
    }

    getParameters() {
      return this.parsedParams;
    }

    // * Получить значение переменной опыта
    // * Данный метод используется чтобы получить опыт с уже мёртвого врага (т.е. NOT ACTIVE ABS)
    // * (нету модели и Entity, только остались эти данные)
    // * (используется если коммент был задан на событии, а в БД нету)
    getExpVarId() {
      var param;
      param = this.getParameters().find(function(p) {
        return p[0] === 'expVar';
      });
      if (param == null) {
        return 0;
      }
      return parseInt(param[1]);
    }

    getEnemyId() {
      var param;
      param = AA.Utils.Parser.extractABSParameter(this.mainLine);
      if (param == null) {
        return 0;
      }
      return param[1];
    }

    
      // * Извлечает из списка команд только комменатрии или определённую команду плагина
    _pasreEventList(list) {
      var j, len, line, ref;
      for (j = 0, len = list.length; j < len; j++) {
        line = list[j];
        if (line == null) {
          continue;
        }
        if (line.code === 108 || line.code === 408) {
          this.list.push(line.parameters[0]);
        } else if (line.code === 357 && ((ref = line.parameters) != null ? ref[1] : void 0) === "ABSEventSettings") {
          this.param = line;
        }
      }
    }

    // * Собирает параметры в базовом представлении < > (как в оригинале)
    _parseABSParamsBase() {
      var j, l, len, param, ref;
      ref = this.list;
      for (j = 0, len = ref.length; j < len; j++) {
        l = ref[j];
        if (l == null) {
          continue;
        }
        param = AA.Utils.Parser.extractABSParameter(l);
        if (param == null) {
          continue;
        }
        if (param[0] === 'ABS') {
          // * Не добавляем ABS, он идёт отдельно
          continue;
        }
        this.parsedParams.push(param);
      }
    }

    // * Собирает все строки с АБС параметрами от <ABS> до </ABS>
    _parseABSParamsSequence() {
      var endElement, i, j, ref, ref1, startIndex;
      this.mainLine = this.list.find(function(l) {
        return l.contains('<ABS');
      });
      endElement = this.list.find(function(l) {
        return l.contains('</ABS>');
      });
      if (endElement == null) {
        return;
      }
      startIndex = this.list.indexOf(this.mainLine);
      if (startIndex < 0) {
        return;
      }
      for (i = j = ref = startIndex + 1, ref1 = this.list.length; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
        if (this.list[i] === endElement) {
          break;
        }
        this.absParameters.push(this.list[i]);
      }
    }

    // * Парсинг всех параметров из строк в структуру (имя: значение)
    _parseParams() {
      var j, len, pair, param, ref;
      if (this.absParameters.length === 0) {
        return;
      }
      ref = this.absParameters;
      for (j = 0, len = ref.length; j < len; j++) {
        param = ref[j];
        pair = AA.Utils.Parser.extractABSParameter(param);
        if (pair == null) {
          continue;
        }
        // * Пропускаем ещё один ABS параметр, если был добавлен
        //TODO: Можно делать проверку при передаче данных на Model
        if (pair[0] === 'ABS') {
          continue;
        } else {
          this.parsedParams.push(pair);
        }
      }
    }

    //TODO: Доработать: исключить группы, правильный конвентор

      //TODO: deadSwitch
    // * Извлекает параметры из команды плагина
    _parsePluginCommand() {
      var k, p, params, v;
      if (this.param == null) {
        return;
      }
      if (!KDCore.isMZ()) {
        return;
      }
      params = this.param.parameters[3];
      if (params == null) {
        return;
      }
      for (k in params) {
        v = params[k];
        if (k.contains("Group")) {
          // * Пропускаем заголовки групп
          continue;
        }
        p = [k, AA.Utils.Parser.convertParameterValue(v)];
        this.parsedParams.push(p);
      }
    }

  };
  AA.link(AAEventSettingsParser);
})();

// ■ END AAEventSettingsParser.coffee
//---------------------------------------------------------------------------
