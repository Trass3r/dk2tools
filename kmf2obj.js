var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports, module) {
    "use strict";
    module.exports = RangeError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports, module) {
    "use strict";
    module.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports, module) {
    "use strict";
    module.exports = TypeError;
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports, module) {
    "use strict";
    var test = {
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $RangeError = require_range();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!hasPropertyDescriptors()) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var hasPropertyDescriptors = require_has_property_descriptors()();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    var $SyntaxError = GetIntrinsic("%SyntaxError%");
    var $TypeError = GetIntrinsic("%TypeError%");
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $floor = GetIntrinsic("%Math.floor%");
    module.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var setFunctionLength = require_set_function_length();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    var hasToStringTag = require_shams2()();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/is-generator-function/index.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = require_shams2()();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var GeneratorFunction;
    module.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn) === GeneratorFunction;
    };
  }
});

// node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// node_modules/for-each/index.js
var require_for_each = __commonJS({
  "node_modules/for-each/index.js"(exports, module) {
    "use strict";
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    var forEach = function forEach2(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
    module.exports = forEach;
  }
});

// node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? global : globalThis;
    module.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBind = require_call_bind();
    var callBound = require_callBound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? global : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var getPrototypeOf = Object.getPrototypeOf;
    var $indexOf = callBound("Array.prototype.indexOf", true) || /** @type {(array: readonly unknown[], value: unknown) => keyof array} */
    function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          cache["$" + typedArray] = callBind(descriptor.get);
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
          cache["$" + typedArray] = callBind(fn);
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var found = false;
      forEach(
        // eslint-disable-next-line no-extra-parens
        /** @type {Record<`\$${TypedArrayName}`, typeof cache>} */
        /** @type {any} */
        cache,
        /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */
        function(getter, typedArray) {
          if (!found) {
            try {
              if ("$" + getter(value) === typedArray) {
                found = $slice(typedArray, 1);
              }
            } catch (e) {
            }
          }
        }
      );
      return found;
    };
    var trySlices = function tryAllSlices(value) {
      var found = false;
      forEach(
        // eslint-disable-next-line no-extra-parens
        /** @type {any} */
        cache,
        /** @type {(getter: typeof cache, name: `\$${TypedArrayName}`) => void} */
        function(getter, name) {
          if (!found) {
            try {
              getter(value);
              found = $slice(name, 1);
            } catch (e) {
            }
          }
        }
      );
      return found;
    };
    module.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
          return tag;
        }
        if (tag !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    var whichTypedArray = require_which_typed_array();
    module.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  }
});

// node_modules/util/support/types.js
var require_types = __commonJS({
  "node_modules/util/support/types.js"(exports) {
    "use strict";
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});

// node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/util/support/isBufferBrowser.js"(exports, module) {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/util/util.js"(exports) {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (false) {
      debugEnv = false;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = require_types();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  }
});

// (disabled):iconv-lite
var require_iconv_lite = __commonJS({
  "(disabled):iconv-lite"() {
  }
});

// (disabled):zlib
var require_zlib = __commonJS({
  "(disabled):zlib"() {
  }
});

// node_modules/kaitai-struct/KaitaiStream.js
var require_KaitaiStream = __commonJS({
  "node_modules/kaitai-struct/KaitaiStream.js"(exports, module) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.KaitaiStream = factory();
      }
    })(typeof self !== "undefined" ? self : exports, function() {
      var KaitaiStream2 = function(arrayBuffer, byteOffset) {
        this._byteOffset = byteOffset || 0;
        if (arrayBuffer instanceof ArrayBuffer) {
          this.buffer = arrayBuffer;
        } else if (typeof arrayBuffer == "object") {
          this.dataView = arrayBuffer;
          if (byteOffset) {
            this._byteOffset += byteOffset;
          }
        } else {
          this.buffer = new ArrayBuffer(arrayBuffer || 1);
        }
        this.pos = 0;
        this.alignToByte();
      };
      KaitaiStream2.prototype = {};
      KaitaiStream2.depUrls = {
        // processZlib uses this and expected a link to a copy of pako.
        // specifically the pako_inflate.min.js script at:
        // https://raw.githubusercontent.com/nodeca/pako/master/dist/pako_inflate.min.js
        zlib: void 0
      };
      KaitaiStream2.prototype._byteLength = 0;
      Object.defineProperty(
        KaitaiStream2.prototype,
        "buffer",
        {
          get: function() {
            this._trimAlloc();
            return this._buffer;
          },
          set: function(v) {
            this._buffer = v;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._buffer.byteLength;
          }
        }
      );
      Object.defineProperty(
        KaitaiStream2.prototype,
        "byteOffset",
        {
          get: function() {
            return this._byteOffset;
          },
          set: function(v) {
            this._byteOffset = v;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._buffer.byteLength;
          }
        }
      );
      Object.defineProperty(
        KaitaiStream2.prototype,
        "dataView",
        {
          get: function() {
            return this._dataView;
          },
          set: function(v) {
            this._byteOffset = v.byteOffset;
            this._buffer = v.buffer;
            this._dataView = new DataView(this._buffer, this._byteOffset);
            this._byteLength = this._byteOffset + v.byteLength;
          }
        }
      );
      KaitaiStream2.prototype._trimAlloc = function() {
        if (this._byteLength === this._buffer.byteLength) {
          return;
        }
        var buf = new ArrayBuffer(this._byteLength);
        var dst = new Uint8Array(buf);
        var src = new Uint8Array(this._buffer, 0, dst.length);
        dst.set(src);
        this.buffer = buf;
      };
      KaitaiStream2.prototype.isEof = function() {
        return this.pos >= this.size && this.bitsLeft === 0;
      };
      KaitaiStream2.prototype.seek = function(pos) {
        var npos = Math.max(0, Math.min(this.size, pos));
        this.pos = isNaN(npos) || !isFinite(npos) ? 0 : npos;
      };
      Object.defineProperty(
        KaitaiStream2.prototype,
        "size",
        { get: function() {
          return this._byteLength - this._byteOffset;
        } }
      );
      KaitaiStream2.prototype.readS1 = function() {
        this.ensureBytesLeft(1);
        var v = this._dataView.getInt8(this.pos);
        this.pos += 1;
        return v;
      };
      KaitaiStream2.prototype.readS2be = function() {
        this.ensureBytesLeft(2);
        var v = this._dataView.getInt16(this.pos);
        this.pos += 2;
        return v;
      };
      KaitaiStream2.prototype.readS4be = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getInt32(this.pos);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readS8be = function() {
        this.ensureBytesLeft(8);
        var v1 = this.readU4be();
        var v2 = this.readU4be();
        if ((v1 & 2147483648) !== 0) {
          return -(4294967296 * (v1 ^ 4294967295) + (v2 ^ 4294967295)) - 1;
        } else {
          return 4294967296 * v1 + v2;
        }
      };
      KaitaiStream2.prototype.readS2le = function() {
        this.ensureBytesLeft(2);
        var v = this._dataView.getInt16(this.pos, true);
        this.pos += 2;
        return v;
      };
      KaitaiStream2.prototype.readS4le = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getInt32(this.pos, true);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readS8le = function() {
        this.ensureBytesLeft(8);
        var v1 = this.readU4le();
        var v2 = this.readU4le();
        if ((v2 & 2147483648) !== 0) {
          return -(4294967296 * (v2 ^ 4294967295) + (v1 ^ 4294967295)) - 1;
        } else {
          return 4294967296 * v2 + v1;
        }
      };
      KaitaiStream2.prototype.readU1 = function() {
        this.ensureBytesLeft(1);
        var v = this._dataView.getUint8(this.pos);
        this.pos += 1;
        return v;
      };
      KaitaiStream2.prototype.readU2be = function() {
        this.ensureBytesLeft(2);
        var v = this._dataView.getUint16(this.pos);
        this.pos += 2;
        return v;
      };
      KaitaiStream2.prototype.readU4be = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getUint32(this.pos);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readU8be = function() {
        this.ensureBytesLeft(8);
        var v1 = this.readU4be();
        var v2 = this.readU4be();
        return 4294967296 * v1 + v2;
      };
      KaitaiStream2.prototype.readU2le = function() {
        this.ensureBytesLeft(2);
        var v = this._dataView.getUint16(this.pos, true);
        this.pos += 2;
        return v;
      };
      KaitaiStream2.prototype.readU4le = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getUint32(this.pos, true);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readU8le = function() {
        this.ensureBytesLeft(8);
        var v1 = this.readU4le();
        var v2 = this.readU4le();
        return 4294967296 * v2 + v1;
      };
      KaitaiStream2.prototype.readF4be = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getFloat32(this.pos);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readF8be = function() {
        this.ensureBytesLeft(8);
        var v = this._dataView.getFloat64(this.pos);
        this.pos += 8;
        return v;
      };
      KaitaiStream2.prototype.readF4le = function() {
        this.ensureBytesLeft(4);
        var v = this._dataView.getFloat32(this.pos, true);
        this.pos += 4;
        return v;
      };
      KaitaiStream2.prototype.readF8le = function() {
        this.ensureBytesLeft(8);
        var v = this._dataView.getFloat64(this.pos, true);
        this.pos += 8;
        return v;
      };
      KaitaiStream2.prototype.alignToByte = function() {
        this.bitsLeft = 0;
        this.bits = 0;
      };
      KaitaiStream2.prototype.readBitsIntBe = function(n) {
        if (n > 32) {
          throw new RangeError("readBitsIntBe: the maximum supported bit length is 32 (tried to read " + n + " bits)");
        }
        var res = 0;
        var bitsNeeded = n - this.bitsLeft;
        this.bitsLeft = -bitsNeeded & 7;
        if (bitsNeeded > 0) {
          var bytesNeeded = (bitsNeeded - 1 >> 3) + 1;
          var buf = this.readBytes(bytesNeeded);
          for (var i = 0; i < bytesNeeded; i++) {
            res = res << 8 | buf[i];
          }
          var newBits = res;
          res = res >>> this.bitsLeft | this.bits << bitsNeeded;
          this.bits = newBits;
        } else {
          res = this.bits >>> -bitsNeeded;
        }
        var mask = (1 << this.bitsLeft) - 1;
        this.bits &= mask;
        return res >>> 0;
      };
      KaitaiStream2.prototype.readBitsInt = KaitaiStream2.prototype.readBitsIntBe;
      KaitaiStream2.prototype.readBitsIntLe = function(n) {
        if (n > 32) {
          throw new RangeError("readBitsIntLe: the maximum supported bit length is 32 (tried to read " + n + " bits)");
        }
        var res = 0;
        var bitsNeeded = n - this.bitsLeft;
        if (bitsNeeded > 0) {
          var bytesNeeded = (bitsNeeded - 1 >> 3) + 1;
          var buf = this.readBytes(bytesNeeded);
          for (var i = 0; i < bytesNeeded; i++) {
            res |= buf[i] << i * 8;
          }
          var newBits = bitsNeeded < 32 ? res >>> bitsNeeded : 0;
          res = res << this.bitsLeft | this.bits;
          this.bits = newBits;
        } else {
          res = this.bits;
          this.bits >>>= n;
        }
        this.bitsLeft = -bitsNeeded & 7;
        if (n < 32) {
          var mask = (1 << n) - 1;
          res &= mask;
        } else {
          res >>>= 0;
        }
        return res;
      };
      KaitaiStream2.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0;
      KaitaiStream2.prototype.readBytes = function(len) {
        return this.mapUint8Array(len);
      };
      KaitaiStream2.prototype.readBytesFull = function() {
        return this.mapUint8Array(this.size - this.pos);
      };
      KaitaiStream2.prototype.readBytesTerm = function(terminator, include, consume, eosError) {
        var blen = this.size - this.pos;
        var u8 = new Uint8Array(this._buffer, this._byteOffset + this.pos);
        for (var i = 0; i < blen && u8[i] !== terminator; i++)
          ;
        if (i === blen) {
          if (eosError) {
            throw "End of stream reached, but no terminator " + terminator + " found";
          } else {
            return this.mapUint8Array(i);
          }
        } else {
          var arr;
          if (include) {
            arr = this.mapUint8Array(i + 1);
          } else {
            arr = this.mapUint8Array(i);
          }
          if (consume) {
            this.pos += 1;
          }
          return arr;
        }
      };
      KaitaiStream2.prototype.ensureFixedContents = function(expected) {
        var actual = this.readBytes(expected.length);
        if (actual.length !== expected.length) {
          throw new UnexpectedDataError(expected, actual);
        }
        var actLen = actual.length;
        for (var i = 0; i < actLen; i++) {
          if (actual[i] !== expected[i]) {
            throw new UnexpectedDataError(expected, actual);
          }
        }
        return actual;
      };
      KaitaiStream2.bytesStripRight = function(data, padByte) {
        var newLen = data.length;
        while (data[newLen - 1] === padByte) {
          newLen--;
        }
        return data.slice(0, newLen);
      };
      KaitaiStream2.bytesTerminate = function(data, term, include) {
        var newLen = 0;
        var maxLen = data.length;
        while (newLen < maxLen && data[newLen] !== term) {
          newLen++;
        }
        if (include && newLen < maxLen)
          newLen++;
        return data.slice(0, newLen);
      };
      KaitaiStream2.bytesToStr = function(arr, encoding) {
        if (encoding == null || encoding.toLowerCase() === "ascii") {
          return KaitaiStream2.createStringFromArray(arr);
        } else {
          if (typeof TextDecoder === "function") {
            return new TextDecoder(encoding).decode(arr);
          } else {
            switch (encoding.toLowerCase()) {
              case "utf8":
              case "utf-8":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return new Buffer(arr).toString(encoding);
                break;
              default:
                if (typeof KaitaiStream2.iconvlite === "undefined")
                  KaitaiStream2.iconvlite = require_iconv_lite();
                return KaitaiStream2.iconvlite.decode(arr, encoding);
            }
          }
        }
      };
      KaitaiStream2.processXorOne = function(data, key) {
        var r = new Uint8Array(data.length);
        var dl = data.length;
        for (var i = 0; i < dl; i++)
          r[i] = data[i] ^ key;
        return r;
      };
      KaitaiStream2.processXorMany = function(data, key) {
        var dl = data.length;
        var r = new Uint8Array(dl);
        var kl = key.length;
        var ki = 0;
        for (var i = 0; i < dl; i++) {
          r[i] = data[i] ^ key[ki];
          ki++;
          if (ki >= kl)
            ki = 0;
        }
        return r;
      };
      KaitaiStream2.processRotateLeft = function(data, amount, groupSize) {
        if (groupSize !== 1)
          throw "unable to rotate group of " + groupSize + " bytes yet";
        var mask = groupSize * 8 - 1;
        var antiAmount = -amount & mask;
        var r = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++)
          r[i] = data[i] << amount & 255 | data[i] >> antiAmount;
        return r;
      };
      KaitaiStream2.processZlib = function(buf) {
        if (typeof __require !== "undefined") {
          if (typeof KaitaiStream2.zlib === "undefined")
            KaitaiStream2.zlib = require_zlib();
          var r = KaitaiStream2.zlib.inflateSync(
            Buffer.from(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
          );
          return r;
        } else {
          if (typeof KaitaiStream2.zlib === "undefined" && typeof KaitaiStream2.depUrls.zlib !== "undefined") {
            importScripts(KaitaiStream2.depUrls.zlib);
            KaitaiStream2.zlib = pako;
          }
          r = KaitaiStream2.zlib.inflate(buf);
          return r;
        }
      };
      KaitaiStream2.mod = function(a, b) {
        if (b <= 0)
          throw "mod divisor <= 0";
        var r = a % b;
        if (r < 0)
          r += b;
        return r;
      };
      KaitaiStream2.arrayMin = function(arr) {
        var min = arr[0];
        var x;
        for (var i = 1, n = arr.length; i < n; ++i) {
          x = arr[i];
          if (x < min)
            min = x;
        }
        return min;
      };
      KaitaiStream2.arrayMax = function(arr) {
        var max = arr[0];
        var x;
        for (var i = 1, n = arr.length; i < n; ++i) {
          x = arr[i];
          if (x > max)
            max = x;
        }
        return max;
      };
      KaitaiStream2.byteArrayCompare = function(a, b) {
        if (a === b)
          return 0;
        var al = a.length;
        var bl = b.length;
        var minLen = al < bl ? al : bl;
        for (var i = 0; i < minLen; i++) {
          var cmp = a[i] - b[i];
          if (cmp !== 0)
            return cmp;
        }
        if (al === bl) {
          return 0;
        } else {
          return al - bl;
        }
      };
      var EOFError = KaitaiStream2.EOFError = function(bytesReq, bytesAvail) {
        this.name = "EOFError";
        this.message = "requested " + bytesReq + " bytes, but only " + bytesAvail + " bytes available";
        this.bytesReq = bytesReq;
        this.bytesAvail = bytesAvail;
        this.stack = new Error().stack;
      };
      EOFError.prototype = Object.create(Error.prototype);
      EOFError.prototype.constructor = EOFError;
      var UnexpectedDataError = KaitaiStream2.UnexpectedDataError = function(expected, actual) {
        this.name = "UnexpectedDataError";
        this.message = "expected [" + expected + "], but got [" + actual + "]";
        this.expected = expected;
        this.actual = actual;
        this.stack = new Error().stack;
      };
      UnexpectedDataError.prototype = Object.create(Error.prototype);
      UnexpectedDataError.prototype.constructor = UnexpectedDataError;
      var UndecidedEndiannessError = KaitaiStream2.UndecidedEndiannessError = function() {
        this.name = "UndecidedEndiannessError";
        this.stack = new Error().stack;
      };
      UndecidedEndiannessError.prototype = Object.create(Error.prototype);
      UndecidedEndiannessError.prototype.constructor = UndecidedEndiannessError;
      var ValidationNotEqualError = KaitaiStream2.ValidationNotEqualError = function(expected, actual) {
        this.name = "ValidationNotEqualError";
        this.message = "not equal, expected [" + expected + "], but got [" + actual + "]";
        this.expected = expected;
        this.actual = actual;
        this.stack = new Error().stack;
      };
      ValidationNotEqualError.prototype = Object.create(Error.prototype);
      ValidationNotEqualError.prototype.constructor = ValidationNotEqualError;
      var ValidationLessThanError = KaitaiStream2.ValidationLessThanError = function(min, actual) {
        this.name = "ValidationLessThanError";
        this.message = "not in range, min [" + min + "], but got [" + actual + "]";
        this.min = min;
        this.actual = actual;
        this.stack = new Error().stack;
      };
      ValidationLessThanError.prototype = Object.create(Error.prototype);
      ValidationLessThanError.prototype.constructor = ValidationLessThanError;
      var ValidationGreaterThanError = KaitaiStream2.ValidationGreaterThanError = function(max, actual) {
        this.name = "ValidationGreaterThanError";
        this.message = "not in range, max [" + max + "], but got [" + actual + "]";
        this.max = max;
        this.actual = actual;
        this.stack = new Error().stack;
      };
      ValidationGreaterThanError.prototype = Object.create(Error.prototype);
      ValidationGreaterThanError.prototype.constructor = ValidationGreaterThanError;
      var ValidationNotAnyOfError = KaitaiStream2.ValidationNotAnyOfError = function(actual, io, srcPath) {
        this.name = "ValidationNotAnyOfError";
        this.message = "not any of the list, got [" + actual + "]";
        this.actual = actual;
        this.stack = new Error().stack;
      };
      ValidationNotAnyOfError.prototype = Object.create(Error.prototype);
      ValidationNotAnyOfError.prototype.constructor = ValidationNotAnyOfError;
      var ValidationExprError = KaitaiStream2.ValidationExprError = function(actual, io, srcPath) {
        this.name = "ValidationExprError";
        this.message = "not matching the expression, got [" + actual + "]";
        this.actual = actual;
        this.stack = new Error().stack;
      };
      ValidationExprError.prototype = Object.create(Error.prototype);
      ValidationExprError.prototype.constructor = ValidationExprError;
      KaitaiStream2.prototype.ensureBytesLeft = function(length) {
        if (this.pos + length > this.size) {
          throw new EOFError(length, this.size - this.pos);
        }
      };
      KaitaiStream2.prototype.mapUint8Array = function(length) {
        length |= 0;
        this.ensureBytesLeft(length);
        var arr = new Uint8Array(this._buffer, this.byteOffset + this.pos, length);
        this.pos += length;
        return arr;
      };
      KaitaiStream2.createStringFromArray = function(array) {
        var chunk_size = 32768;
        var chunks = [];
        var useSubarray = typeof array.subarray === "function";
        for (var i = 0; i < array.length; i += chunk_size) {
          chunks.push(String.fromCharCode.apply(null, useSubarray ? array.subarray(i, i + chunk_size) : array.slice(i, i + chunk_size)));
        }
        return chunks.join("");
      };
      return KaitaiStream2;
    });
  }
});

// Kmf.js
var require_Kmf = __commonJS({
  "Kmf.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(["kaitai-struct/KaitaiStream"], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require_KaitaiStream());
      } else {
        root.Kmf = factory(root.KaitaiStream);
      }
    })(typeof self !== "undefined" ? self : exports, function(KaitaiStream2) {
      var Kmf2 = function() {
        Kmf3.MeshFormat = Object.freeze({
          MESH: 1,
          ANIM: 2,
          GROUP: 3,
          1: "MESH",
          2: "ANIM",
          3: "GROUP"
        });
        function Kmf3(_io, _parent, _root) {
          this._io = _io;
          this._parent = _parent;
          this._root = _root || this;
          this._read();
        }
        Kmf3.prototype._read = function() {
          this.magic = this._io.readBytes(4);
          if (!(KaitaiStream2.byteArrayCompare(this.magic, [75, 77, 83, 72]) == 0)) {
            throw new KaitaiStream2.ValidationNotEqualError([75, 77, 83, 72], this.magic, this._io, "/seq/0");
          }
          this.size = this._io.readU4le();
          this.version = this._io.readU4le();
          if (!(this.version == 17)) {
            throw new KaitaiStream2.ValidationNotEqualError(17, this.version, this._io, "/seq/2");
          }
          this.header = new Kmfheader(this._io, this, this._root);
          this.materials = new Matl(this._io, this, this._root);
          this.mesh = new Mesh(this._io, this, this._root);
        };
        var Kmfheader = Kmf3.Kmfheader = function() {
          function Kmfheader2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Kmfheader2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [72, 69, 65, 68]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([72, 69, 65, 68], this.magic, this._io, "/types/kmfheader/seq/0");
            }
            this.size = this._io.readU4le();
            this.format = this._io.readU4le();
            this.uk = this._io.readU4le();
            if (!(this.uk == 1)) {
              throw new KaitaiStream2.ValidationNotEqualError(1, this.uk, this._io, "/types/kmfheader/seq/3");
            }
          };
          return Kmfheader2;
        }();
        var Model = Kmf3.Model = function() {
          function Model2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Model2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [83, 80, 82, 83]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([83, 80, 82, 83], this.magic, this._io, "/types/model/seq/0");
            }
            this.size = this._io.readU4le();
            this.groups = [];
            for (var i = 0; i < this._parent.header.numGroups; i++) {
              this.groups.push(new Sphd(this._io, this, this._root, i));
            }
            this.groupData = [];
            for (var i = 0; i < this._parent.header.numGroups; i++) {
              this.groupData.push(new Sprs(this._io, this, this._root, i));
            }
          };
          var Sphd = Model2.Sphd = function() {
            function Sphd2(_io, _parent, _root, groupIdx) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this.groupIdx = groupIdx;
              this._read();
            }
            Sphd2.prototype._read = function() {
              this.magic = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magic, [83, 80, 72, 68]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([83, 80, 72, 68], this.magic, this._io, "/types/model/types/sphd/seq/0");
              }
              this.size = this._io.readU4le();
              this.numTrisPerLevel = [];
              for (var i = 0; i < this._parent._parent.header.numLods; i++) {
                this.numTrisPerLevel.push(this._io.readU4le());
              }
              this.numVertices = this._io.readU4le();
              this.mmFactor = this._io.readF4le();
            };
            return Sphd2;
          }();
          var Sprs = Model2.Sprs = function() {
            function Sprs2(_io, _parent, _root, groupIdx) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this.groupIdx = groupIdx;
              this._read();
            }
            Sprs2.prototype._read = function() {
              this.magic = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magic, [83, 80, 82, 83]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([83, 80, 82, 83], this.magic, this._io, "/types/model/types/sprs/seq/0");
              }
              this.size = this._io.readU4le();
              this.materialIdx = this._io.readU4le();
              this.polygons = new Poly(this._io, this, this._root, this.groupIdx);
              this.vertices = new Vert(this._io, this, this._root, this.groupIdx);
            };
            var Poly = Sprs2.Poly = function() {
              function Poly2(_io, _parent, _root, groupIdx) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this.groupIdx = groupIdx;
                this._read();
              }
              Poly2.prototype._read = function() {
                if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                  this.polyMagic = this._io.readBytes(4);
                  if (!(KaitaiStream2.byteArrayCompare(this.polyMagic, [80, 79, 76, 89]) == 0)) {
                    throw new KaitaiStream2.ValidationNotEqualError([80, 79, 76, 89], this.polyMagic, this._io, "/types/model/types/sprs/types/poly/seq/0");
                  }
                }
                if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                  this.polySize = this._io.readU4le();
                }
                this.lodLevels = [];
                for (var i = 0; i < this._parent._parent._parent.header.numLods; i++) {
                  this.lodLevels.push(new LodLevel(this._io, this, this._root, this.groupIdx, i));
                }
              };
              return Poly2;
            }();
            var LodLevel = Sprs2.LodLevel = function() {
              function LodLevel2(_io, _parent, _root, groupIdx, level) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this.groupIdx = groupIdx;
                this.level = level;
                this._read();
              }
              LodLevel2.prototype._read = function() {
                this.triangles = [];
                for (var i = 0; i < this._parent._parent._parent.groups[this.groupIdx].numTrisPerLevel[this.level]; i++) {
                  this.triangles.push(new Triangle(this._io, this, this._root));
                }
              };
              return LodLevel2;
            }();
            var Vert = Sprs2.Vert = function() {
              function Vert2(_io, _parent, _root, groupIdx) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this.groupIdx = groupIdx;
                this._read();
              }
              Vert2.prototype._read = function() {
                if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                  this.vertMagic = this._io.readBytes(4);
                  if (!(KaitaiStream2.byteArrayCompare(this.vertMagic, [86, 69, 82, 84]) == 0)) {
                    throw new KaitaiStream2.ValidationNotEqualError([86, 69, 82, 84], this.vertMagic, this._io, "/types/model/types/sprs/types/vert/seq/0");
                  }
                }
                if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                  this.vertSize = this._io.readU4le();
                }
                this.vertexData = [];
                for (var i = 0; i < this._parent._parent.groups[this.groupIdx].numVertices; i++) {
                  this.vertexData.push(new VertexData(this._io, this, this._root));
                }
              };
              return Vert2;
            }();
            return Sprs2;
          }();
          return Model2;
        }();
        var Itab = Kmf3.Itab = function() {
          function Itab2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Itab2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [73, 84, 65, 66]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([73, 84, 65, 66], this.magic, this._io, "/types/itab/seq/0");
            }
            this.size = this._io.readU4le();
            this.frameChunks = [];
            for (var i = 0; i < Math.floor((this._parent.header.numFrames - 1) / 128) + 1; i++) {
              this.frameChunks.push(new FrameChunk(this._io, this, this._root));
            }
          };
          var FrameChunk = Itab2.FrameChunk = function() {
            function FrameChunk2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            FrameChunk2.prototype._read = function() {
              this.geomBase = [];
              for (var i = 0; i < this._parent._parent.header.numItabEntries; i++) {
                this.geomBase.push(this._io.readU4le());
              }
            };
            return FrameChunk2;
          }();
          return Itab2;
        }();
        var VertexData = Kmf3.VertexData = function() {
          function VertexData2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          VertexData2.prototype._read = function() {
            if (this._root.header.format == Kmf3.MeshFormat.MESH) {
              this.geomIdx = this._io.readU2le();
            }
            this.u = this._io.readU2le();
            this.v = this._io.readU2le();
            this.normal = new Vec3(this._io, this, this._root);
            if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
              this.itabIdx = this._io.readU2le();
            }
          };
          Object.defineProperty(VertexData2.prototype, "uv", {
            get: function() {
              if (this._m_uv !== void 0)
                return this._m_uv;
              this._m_uv = [this.u / 32768, this.v / 32768];
              return this._m_uv;
            }
          });
          return VertexData2;
        }();
        var Ctrl = Kmf3.Ctrl = function() {
          function Ctrl2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Ctrl2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [67, 84, 82, 76]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([67, 84, 82, 76], this.magic, this._io, "/types/ctrl/seq/0");
            }
            this.size = this._io.readU4le();
            this.numCtrls = this._io.readU4le();
            this.ctrls = [];
            for (var i = 0; i < this.numCtrls; i++) {
              this.ctrls.push(new Ctrls(this._io, this, this._root));
            }
          };
          var Ctrls = Ctrl2.Ctrls = function() {
            function Ctrls2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Ctrls2.prototype._read = function() {
              this.uk1 = this._io.readU2le();
              this.uk2 = this._io.readU2le();
              this.uk3 = this._io.readU4le();
            };
            return Ctrls2;
          }();
          return Ctrl2;
        }();
        var Triangle = Kmf3.Triangle = function() {
          function Triangle2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Triangle2.prototype._read = function() {
            this.x = this._io.readU1();
            this.y = this._io.readU1();
            this.z = this._io.readU1();
          };
          return Triangle2;
        }();
        var Mesh = Kmf3.Mesh = function() {
          function Mesh2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Mesh2.prototype._read = function() {
            if (this._root.header.format == Kmf3.MeshFormat.MESH) {
              this.magic = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magic, [77, 69, 83, 72]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([77, 69, 83, 72], this.magic, this._io, "/types/mesh/seq/0");
              }
            }
            if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
              this.magicAnim = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magicAnim, [65, 78, 73, 77]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([65, 78, 73, 77], this.magicAnim, this._io, "/types/mesh/seq/1");
              }
            }
            this.size = this._io.readU4le();
            this.header = new Meshheader(this._io, this, this._root);
            this.ctrl = new Ctrl(this._io, this, this._root);
            this.model = new Model(this._io, this, this._root);
            if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
              this.itab = new Itab(this._io, this, this._root);
            }
            this.geom = new Geom(this._io, this, this._root);
            if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
              this.vgeo = new Vgeo(this._io, this, this._root);
            }
          };
          var Meshheader = Mesh2.Meshheader = function() {
            Meshheader2.FrameFactorFunction = Object.freeze({
              CLAMP: 0,
              WRAP: 1,
              0: "CLAMP",
              1: "WRAP"
            });
            function Meshheader2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Meshheader2.prototype._read = function() {
              this.magic = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magic, [72, 69, 65, 68]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([72, 69, 65, 68], this.magic, this._io, "/types/mesh/types/meshheader/seq/0");
              }
              this.size = this._io.readU4le();
              this.meshname = KaitaiStream2.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
              this.numGroups = this._io.readU4le();
              if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                this.numFrames = this._io.readU4le();
              }
              if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                this.numItabEntries = this._io.readU4le();
              }
              this.numBaseVertices = this._io.readU4le();
              if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                this.frameFactorFunction = this._io.readU4le();
              }
              this.translation = new Vec3(this._io, this, this._root);
              if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
                this.cubeScale = this._io.readF4le();
              }
              this.scale = this._io.readF4le();
              this.numLods = this._io.readU4le();
            };
            return Meshheader2;
          }();
          return Mesh2;
        }();
        var Matl = Kmf3.Matl = function() {
          function Matl2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Matl2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [77, 65, 84, 76]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([77, 65, 84, 76], this.magic, this._io, "/types/matl/seq/0");
            }
            this.size = this._io.readU4le();
            this.numMaterials = this._io.readU4le();
            this.materials = [];
            for (var i = 0; i < this.numMaterials; i++) {
              this.materials.push(new Mat2(this._io, this, this._root));
            }
          };
          var Mat2 = Matl2.Mat2 = function() {
            Mat22.MaterialFlags = Object.freeze({
              HAS_ALPHA: 1,
              DOUBLE_SIDED: 2,
              ALPHA_ADDITIVE: 4,
              UNKNOWN8: 8,
              UNKNOWN10: 16,
              UNKNOWN20: 32,
              IS_SHININESS_SET: 64,
              IS_BRIGHTNESS_SET: 128,
              INVISIBLE: 256,
              1: "HAS_ALPHA",
              2: "DOUBLE_SIDED",
              4: "ALPHA_ADDITIVE",
              8: "UNKNOWN8",
              16: "UNKNOWN10",
              32: "UNKNOWN20",
              64: "IS_SHININESS_SET",
              128: "IS_BRIGHTNESS_SET",
              256: "INVISIBLE"
            });
            function Mat22(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Mat22.prototype._read = function() {
              this.magic = this._io.readBytes(4);
              if (!(KaitaiStream2.byteArrayCompare(this.magic, [77, 65, 84, 50]) == 0)) {
                throw new KaitaiStream2.ValidationNotEqualError([77, 65, 84, 50], this.magic, this._io, "/types/matl/types/mat2/seq/0");
              }
              this.size = this._io.readU4le();
              this.name = KaitaiStream2.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
              this.numTextures = this._io.readU4le();
              this.textures = [];
              for (var i = 0; i < this.numTextures; i++) {
                this.textures.push(KaitaiStream2.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII"));
              }
              this.flags = this._io.readU4le();
              this.brightness = this._io.readF4le();
              this.shininess = this._io.readF4le();
              this.envmap = KaitaiStream2.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ASCII");
            };
            return Mat22;
          }();
          return Matl2;
        }();
        var Vec3 = Kmf3.Vec3 = function() {
          function Vec32(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Vec32.prototype._read = function() {
            this.x = this._io.readF4le();
            this.y = this._io.readF4le();
            this.z = this._io.readF4le();
          };
          return Vec32;
        }();
        var Vgeo = Kmf3.Vgeo = function() {
          function Vgeo2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Vgeo2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [86, 71, 69, 79]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([86, 71, 69, 79], this.magic, this._io, "/types/vgeo/seq/0");
            }
            this.size = this._io.readU4le();
            this.offsets = [];
            for (var i = 0; i < this._parent.header.numItabEntries; i++) {
              this.offsets.push(new Offset(this._io, this, this._root));
            }
          };
          var Offset = Vgeo2.Offset = function() {
            function Offset2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Offset2.prototype._read = function() {
              this.frameOffsets = [];
              for (var i = 0; i < this._parent._parent.header.numFrames; i++) {
                this.frameOffsets.push(this._io.readU1());
              }
            };
            return Offset2;
          }();
          return Vgeo2;
        }();
        var Geom = Kmf3.Geom = function() {
          function Geom2(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
          }
          Geom2.prototype._read = function() {
            this.magic = this._io.readBytes(4);
            if (!(KaitaiStream2.byteArrayCompare(this.magic, [71, 69, 79, 77]) == 0)) {
              throw new KaitaiStream2.ValidationNotEqualError([71, 69, 79, 77], this.magic, this._io, "/types/geom/seq/0");
            }
            this.size = this._io.readU4le();
            if (this._root.header.format == Kmf3.MeshFormat.MESH) {
              this.vertices = [];
              for (var i = 0; i < this._parent.header.numBaseVertices; i++) {
                this.vertices.push(new Vec3(this._io, this, this._root));
              }
            }
            if (this._root.header.format == Kmf3.MeshFormat.ANIM) {
              this.verticesAnim = [];
              for (var i = 0; i < this._parent.header.numBaseVertices; i++) {
                this.verticesAnim.push(new Vec3Anim(this._io, this, this._root));
              }
            }
          };
          var Vec3Packed = Geom2.Vec3Packed = function() {
            function Vec3Packed2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Vec3Packed2.prototype._read = function() {
              this.z = this._io.readBitsIntLe(10);
              this.y = this._io.readBitsIntLe(10);
              this.x = this._io.readBitsIntLe(10);
              this.pad = this._io.readBitsIntLe(2);
            };
            Object.defineProperty(Vec3Packed2.prototype, "xyz", {
              get: function() {
                if (this._m_xyz !== void 0)
                  return this._m_xyz;
                this._m_xyz = [(this.x - 512) / 511 * this._root.mesh.header.scale, (this.y - 512) / 511 * this._root.mesh.header.scale, (this.z - 512) / 511 * this._root.mesh.header.scale];
                return this._m_xyz;
              }
            });
            return Vec3Packed2;
          }();
          var Vec3Anim = Geom2.Vec3Anim = function() {
            function Vec3Anim2(_io, _parent, _root) {
              this._io = _io;
              this._parent = _parent;
              this._root = _root || this;
              this._read();
            }
            Vec3Anim2.prototype._read = function() {
              this.coords = new Vec3Packed(this._io, this, this._root);
              this.frameBase = this._io.readU1();
            };
            return Vec3Anim2;
          }();
          return Geom2;
        }();
        return Kmf3;
      }();
      return Kmf2;
    });
  }
});

// kmf2obj.mjs
var import_util = __toESM(require_util(), 1);
var import_Kmf = __toESM(require_Kmf(), 1);
var import_KaitaiStream = __toESM(require_KaitaiStream(), 1);
function kmf2obj(inputFileName, fileContent, output) {
  const inputFileBaseName = inputFileName.slice(inputFileName.lastIndexOf("/") + 1, -4);
  const kmf = new import_Kmf.default(new import_KaitaiStream.default(fileContent));
  if (kmf.header.format > 2) {
    return;
  }
  let numTotalVertexPositions = kmf.mesh.header.numBaseVertices;
  function computeAnimVertex(frameIdx2, itabIdx) {
    const geomBase = kmf.mesh.itab.frameChunks[Math.floor(frameIdx2 / 128)].geomBase[itabIdx];
    const geomOffset = kmf.mesh.vgeo.offsets[itabIdx].frameOffsets[frameIdx2];
    const geomIndex = geomBase + geomOffset;
    const curVertex = kmf.mesh.geom.verticesAnim[geomIndex];
    const frameBase = curVertex.frameBase;
    output.write(`# geomIndex ${geomIndex} base ${curVertex.frameBase} frame ${frameIdx2}
`);
    if ((frameIdx2 & 127) > frameBase) {
      const nextVertex = kmf.mesh.geom.verticesAnim[geomIndex + 1];
      const nextFrameBase = nextVertex.frameBase;
      const geomFactor = (frameIdx2 & 127 - frameBase) / (nextFrameBase - frameBase);
      output.write(`# nextBase ${nextFrameBase} geomFactor ${geomFactor}
`);
      let x = (curVertex.coords.x - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.x;
      let y = (curVertex.coords.y - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.y;
      let z = (curVertex.coords.z - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.z;
      x = x * (1 - geomFactor) + geomFactor * ((nextVertex.coords.x - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.x);
      y = y * (1 - geomFactor) + geomFactor * ((nextVertex.coords.y - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.y);
      z = z * (1 - geomFactor) + geomFactor * ((nextVertex.coords.z - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.z);
      output.write(import_util.default.format("v %d %d %d\n", x, -z, y));
      numTotalVertexPositions++;
      return numTotalVertexPositions;
    }
    return geomIndex + 1;
  }
  const isAnim = kmf.header.format === 2;
  let NumTriangles = 0;
  for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
    NumTriangles += kmf.mesh.model.groups[i].numTrisPerLevel[0];
  }
  output.write(`# mesh numGroups: ${kmf.mesh.header.numGroups} numVerts: ${kmf.mesh.header.numBaseVertices} numTriangles: ${NumTriangles}
`);
  for (let i = 0; i < kmf.materials.numMaterials; ++i) {
    const mat = kmf.materials.materials[i];
    output.write(`newmtl ${mat.name}
`);
    output.write(`map_kd ${mat.textures[0]}.png
`);
    output.write(`map_bump ${mat.textures[0]}_n.png
`);
  }
  output.write("\n\n");
  output.write(`mtllib ${inputFileBaseName}.mtl
`);
  output.write(`# ${kmf.mesh.header.numBaseVertices} vertices
`);
  for (let i = 0; i < kmf.mesh.header.numBaseVertices; ++i) {
    if (isAnim) {
      const vertex = kmf.mesh.geom.verticesAnim[i];
      output.write(import_util.default.format(
        "v %d %d %d\n",
        (vertex.coords.x - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.x,
        -((vertex.coords.z - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.z),
        (vertex.coords.y - 512) / 511 * kmf.mesh.header.scale - kmf.mesh.header.translation.y
      ));
    } else {
      const vertex = kmf.mesh.geom.vertices[i];
      output.write(import_util.default.format(
        "v %d %d %d\n",
        vertex.x - kmf.mesh.header.translation.x,
        -(vertex.z - kmf.mesh.header.translation.z),
        vertex.y - kmf.mesh.header.translation.y
      ));
    }
  }
  for (let i = 0; i < kmf.mesh.header.numGroups; ++i) {
    const meshGroup = kmf.mesh.model.groups[i];
    const meshGroupData = kmf.mesh.model.groupData[i];
    output.write(`# ${kmf.materials.materials[meshGroupData.materialIdx].name} ${meshGroup.numVertices} uniq verts
`);
    for (let j = 0; j < meshGroup.numVertices; ++j) {
      const vertex = meshGroupData.vertices.vertexData[j];
      output.write(import_util.default.format("vt %d %d\n", vertex.u / 32768, 1 - vertex.v / 32768));
    }
  }
  if (isAnim) {
    output.write(`# ${kmf.mesh.header.numFrames} frames
`);
  }
  let v1idx, v2idx, v3idx;
  let frameIdx = 0;
  const lodLevel = 0;
  for (frameIdx = 0; frameIdx < (isAnim ? kmf.mesh.header.numFrames : 1); ++frameIdx) {
    output.write(`o ${inputFileBaseName}_${frameIdx}

`);
    let verticesCounter = 0;
    for (let i = 0; i < kmf.mesh.header.numGroups; i++) {
      const meshGroup = kmf.mesh.model.groups[i];
      const meshGroupData = kmf.mesh.model.groupData[i];
      output.write(`g ${kmf.materials.materials[meshGroupData.materialIdx].name}_${frameIdx}
`);
      output.write(`usemtl ${kmf.materials.materials[meshGroupData.materialIdx].name}
`);
      output.write(`# ${meshGroup.numTrisPerLevel[lodLevel]} triangles
`);
      for (let j = 0; j < meshGroup.numTrisPerLevel[lodLevel]; ++j) {
        const triangle = meshGroupData.polygons.lodLevels[lodLevel].triangles[j];
        const v1 = meshGroupData.vertices.vertexData[triangle.x];
        const v2 = meshGroupData.vertices.vertexData[triangle.y];
        const v3 = meshGroupData.vertices.vertexData[triangle.z];
        if (isAnim) {
          output.write(`# grp ${i} tri ${j}
`);
          v1idx = computeAnimVertex(frameIdx, v1.itabIdx);
          v2idx = computeAnimVertex(frameIdx, v2.itabIdx);
          v3idx = computeAnimVertex(frameIdx, v3.itabIdx);
        } else {
          v1idx = v1.index + 1;
          v2idx = v2.index + 1;
          v3idx = v3.index + 1;
        }
        output.write(`f ${v1idx}/${verticesCounter + triangle.x + 1} ${v3idx}/${verticesCounter + triangle.z + 1} ${v2idx}/${verticesCounter + triangle.y + 1}
`);
      }
      verticesCounter += meshGroup.numVertices;
    }
  }
}
export {
  kmf2obj
};
