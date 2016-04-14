(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Lunar", [], factory);
	else if(typeof exports === 'object')
		exports["Lunar"] = factory();
	else
		root["Lunar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _logger = __webpack_require__(/*! ./core/logger/logger */ 1);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _channel = __webpack_require__(/*! ./core/mediator/channel */ 51);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _module = __webpack_require__(/*! ./core/factories/module.factory */ 73);
	
	var _module2 = _interopRequireDefault(_module);
	
	var _proxy = __webpack_require__(/*! ./core/factories/proxy.factory */ 78);
	
	var _proxy2 = _interopRequireDefault(_proxy);
	
	var _activator = __webpack_require__(/*! ./core/factories/activator.factory */ 82);
	
	var _activator2 = _interopRequireDefault(_activator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Lunar(component) {
	  var createModule = _module2.default.bind(component),
	      createProxy = _proxy2.default.bind(component),
	      createActivator = _activator2.default.bind(component);
	
	  return {
	    Logger: _logger2.default,
	    Mediator: _channel2.default,
	    createModule: createModule,
	    createProxy: createProxy,
	    createActivator: createActivator
	  };
	}
	
	exports.default = Lunar;
	module.exports = exports['default'];

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./core/logger/logger.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 2);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 14);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 41);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var OFF = (0, _symbol2.default)('No logs will be shown'),
	    FATAL = (0, _symbol2.default)('Only errors that will break your app will be shown'),
	    ERROR = (0, _symbol2.default)('Any error will be logged'),
	    WARN = (0, _symbol2.default)('Errors and warnings will be shown'),
	    ALL = (0, _symbol2.default)('Everything will be logged and displayed on the console');
	
	var levels = {
	  OFF: OFF,
	  FATAL: FATAL,
	  ERROR: ERROR,
	  WARN: WARN,
	  ALL: ALL
	};
	
	var level = levels['OFF'],
	    levelString = 'OFF';
	
	var Logger = {
	  getLevel: function getLevel() {
	    return levelString;
	  },
	  setLevel: function setLevel(wantedLevel) {
	    if (levels[wantedLevel]) {
	      level = levels[wantedLevel];
	      levelString = wantedLevel;
	    }
	  },
	
	  log: log
	};
	
	function log(options) {
	  if (Array.isArray(options)) {
	    return multipleLogs(options);
	  } else if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
	    return singleLog(options);
	  }
	}
	
	function multipleLogs(logs) {
	  for (var i = 0; i < logs.length; i++) {
	    singleLog(logs[i]);
	  }
	}
	
	function singleLog() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var _ref$message = _ref.message;
	  var message = _ref$message === undefined ? null : _ref$message;
	  var _ref$level = _ref.level;
	  var level = _ref$level === undefined ? 'OFF' : _ref$level;
	
	  var levelsKeys = (0, _keys2.default)(levels);
	
	  if (levelString === 'OFF') return undefined;
	
	  if (levelsKeys.indexOf(levelString) >= levelsKeys.indexOf(level)) {
	    return output(message, level);
	  }
	}
	
	function output(message, level) {
	  var finalMessage = '[Lunar.Logger][' + level + '] ' + getDateString() + '\n' + message + '\n';
	
	  console.log(finalMessage);
	
	  return finalMessage;
	}
	
	function getDateString() {
	  var now = new Date(),
	      period = now.toLocaleString().slice(-3);
	
	  return now.toLocaleString().replace(period, ':' + now.getMilliseconds()) + period;
	}
	
	exports.default = Logger;
	module.exports = exports['default'];

/***/ },
/* 2 */
/*!*******************************************************!*\
  !*** /install/~/babel-runtime/core-js/object/keys.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 3), __esModule: true };

/***/ },
/* 3 */
/*!****************************************************!*\
  !*** /install/~/core-js/library/fn/object/keys.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.keys */ 4);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 10).Object.keys;

/***/ },
/* 4 */
/*!*************************************************************!*\
  !*** /install/~/core-js/library/modules/es6.object.keys.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./$.to-object */ 5);
	
	__webpack_require__(/*! ./$.object-sap */ 7)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 5 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.to-object.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./$.defined */ 6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/*!*******************************************************!*\
  !*** /install/~/core-js/library/modules/$.defined.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.object-sap.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./$.export */ 8)
	  , core    = __webpack_require__(/*! ./$.core */ 10)
	  , fails   = __webpack_require__(/*! ./$.fails */ 13);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 8 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/modules/$.export.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./$.global */ 9)
	  , core      = __webpack_require__(/*! ./$.core */ 10)
	  , ctx       = __webpack_require__(/*! ./$.ctx */ 11)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 9 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/modules/$.global.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/*!****************************************************!*\
  !*** /install/~/core-js/library/modules/$.core.js ***!
  \****************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/*!***************************************************!*\
  !*** /install/~/core-js/library/modules/$.ctx.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./$.a-function */ 12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.a-function.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/*!*****************************************************!*\
  !*** /install/~/core-js/library/modules/$.fails.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 14 */
/*!**************************************************!*\
  !*** /install/~/babel-runtime/helpers/typeof.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ 15);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 41);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 15 */
/*!***********************************************************!*\
  !*** /install/~/babel-runtime/core-js/symbol/iterator.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 16), __esModule: true };

/***/ },
/* 16 */
/*!********************************************************!*\
  !*** /install/~/core-js/library/fn/symbol/iterator.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 17);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 34);
	module.exports = __webpack_require__(/*! ../../modules/$.wks */ 31)('iterator');

/***/ },
/* 17 */
/*!*****************************************************************!*\
  !*** /install/~/core-js/library/modules/es6.string.iterator.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./$.string-at */ 18)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./$.iter-define */ 20)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 18 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.string-at.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./$.to-integer */ 19)
	  , defined   = __webpack_require__(/*! ./$.defined */ 6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 19 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.to-integer.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 20 */
/*!***********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iter-define.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./$.library */ 21)
	  , $export        = __webpack_require__(/*! ./$.export */ 8)
	  , redefine       = __webpack_require__(/*! ./$.redefine */ 22)
	  , hide           = __webpack_require__(/*! ./$.hide */ 23)
	  , has            = __webpack_require__(/*! ./$.has */ 27)
	  , Iterators      = __webpack_require__(/*! ./$.iterators */ 28)
	  , $iterCreate    = __webpack_require__(/*! ./$.iter-create */ 29)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 30)
	  , getProto       = __webpack_require__(/*! ./$ */ 24).getProto
	  , ITERATOR       = __webpack_require__(/*! ./$.wks */ 31)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 21 */
/*!*******************************************************!*\
  !*** /install/~/core-js/library/modules/$.library.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 22 */
/*!********************************************************!*\
  !*** /install/~/core-js/library/modules/$.redefine.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./$.hide */ 23);

/***/ },
/* 23 */
/*!****************************************************!*\
  !*** /install/~/core-js/library/modules/$.hide.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(/*! ./$ */ 24)
	  , createDesc = __webpack_require__(/*! ./$.property-desc */ 25);
	module.exports = __webpack_require__(/*! ./$.descriptors */ 26) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 24 */
/*!***********************************************!*\
  !*** /install/~/core-js/library/modules/$.js ***!
  \***********************************************/
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 25 */
/*!*************************************************************!*\
  !*** /install/~/core-js/library/modules/$.property-desc.js ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 26 */
/*!***********************************************************!*\
  !*** /install/~/core-js/library/modules/$.descriptors.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./$.fails */ 13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/*!***************************************************!*\
  !*** /install/~/core-js/library/modules/$.has.js ***!
  \***************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iterators.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 29 */
/*!***********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iter-create.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(/*! ./$ */ 24)
	  , descriptor     = __webpack_require__(/*! ./$.property-desc */ 25)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./$.hide */ 23)(IteratorPrototype, __webpack_require__(/*! ./$.wks */ 31)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 30 */
/*!*****************************************************************!*\
  !*** /install/~/core-js/library/modules/$.set-to-string-tag.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./$ */ 24).setDesc
	  , has = __webpack_require__(/*! ./$.has */ 27)
	  , TAG = __webpack_require__(/*! ./$.wks */ 31)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/*!***************************************************!*\
  !*** /install/~/core-js/library/modules/$.wks.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(/*! ./$.shared */ 32)('wks')
	  , uid    = __webpack_require__(/*! ./$.uid */ 33)
	  , Symbol = __webpack_require__(/*! ./$.global */ 9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 32 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/modules/$.shared.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./$.global */ 9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/*!***************************************************!*\
  !*** /install/~/core-js/library/modules/$.uid.js ***!
  \***************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/*!**************************************************************!*\
  !*** /install/~/core-js/library/modules/web.dom.iterable.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 35);
	var Iterators = __webpack_require__(/*! ./$.iterators */ 28);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 35 */
/*!****************************************************************!*\
  !*** /install/~/core-js/library/modules/es6.array.iterator.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./$.add-to-unscopables */ 36)
	  , step             = __webpack_require__(/*! ./$.iter-step */ 37)
	  , Iterators        = __webpack_require__(/*! ./$.iterators */ 28)
	  , toIObject        = __webpack_require__(/*! ./$.to-iobject */ 38);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./$.iter-define */ 20)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 36 */
/*!******************************************************************!*\
  !*** /install/~/core-js/library/modules/$.add-to-unscopables.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 37 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iter-step.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 38 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.to-iobject.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./$.iobject */ 39)
	  , defined = __webpack_require__(/*! ./$.defined */ 6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 39 */
/*!*******************************************************!*\
  !*** /install/~/core-js/library/modules/$.iobject.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./$.cof */ 40);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 40 */
/*!***************************************************!*\
  !*** /install/~/core-js/library/modules/$.cof.js ***!
  \***************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 41 */
/*!**************************************************!*\
  !*** /install/~/babel-runtime/core-js/symbol.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 42), __esModule: true };

/***/ },
/* 42 */
/*!*****************************************************!*\
  !*** /install/~/core-js/library/fn/symbol/index.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 43);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 50);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 10).Symbol;

/***/ },
/* 43 */
/*!********************************************************!*\
  !*** /install/~/core-js/library/modules/es6.symbol.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(/*! ./$ */ 24)
	  , global         = __webpack_require__(/*! ./$.global */ 9)
	  , has            = __webpack_require__(/*! ./$.has */ 27)
	  , DESCRIPTORS    = __webpack_require__(/*! ./$.descriptors */ 26)
	  , $export        = __webpack_require__(/*! ./$.export */ 8)
	  , redefine       = __webpack_require__(/*! ./$.redefine */ 22)
	  , $fails         = __webpack_require__(/*! ./$.fails */ 13)
	  , shared         = __webpack_require__(/*! ./$.shared */ 32)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 30)
	  , uid            = __webpack_require__(/*! ./$.uid */ 33)
	  , wks            = __webpack_require__(/*! ./$.wks */ 31)
	  , keyOf          = __webpack_require__(/*! ./$.keyof */ 44)
	  , $names         = __webpack_require__(/*! ./$.get-names */ 45)
	  , enumKeys       = __webpack_require__(/*! ./$.enum-keys */ 46)
	  , isArray        = __webpack_require__(/*! ./$.is-array */ 47)
	  , anObject       = __webpack_require__(/*! ./$.an-object */ 48)
	  , toIObject      = __webpack_require__(/*! ./$.to-iobject */ 38)
	  , createDesc     = __webpack_require__(/*! ./$.property-desc */ 25)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./$.library */ 21)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 44 */
/*!*****************************************************!*\
  !*** /install/~/core-js/library/modules/$.keyof.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(/*! ./$ */ 24)
	  , toIObject = __webpack_require__(/*! ./$.to-iobject */ 38);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 45 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.get-names.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./$.to-iobject */ 38)
	  , getNames  = __webpack_require__(/*! ./$ */ 24).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 46 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.enum-keys.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(/*! ./$ */ 24);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 47 */
/*!********************************************************!*\
  !*** /install/~/core-js/library/modules/$.is-array.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./$.cof */ 40);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 48 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.an-object.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./$.is-object */ 49);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 49 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.is-object.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 50 */
/*!******************************************************************!*\
  !*** /install/~/core-js/library/modules/es6.object.to-string.js ***!
  \******************************************************************/
/***/ function(module, exports) {



/***/ },
/* 51 */
/*!**********************************!*\
  !*** ./core/mediator/channel.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 52);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _logger = __webpack_require__(/*! ../logger/logger */ 1);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var subscriptions = {},
	    channel = {
	  subscribe: subscribe,
	  unsubscribe: unsubscribe,
	  request: request
	};
	
	function subscribe(options) {
	  _logger2.default.log({ message: '[Mediator.subscribe] Trying to subscribe.', level: 'ALL' });
	  if (typeof subscriptions[options.topic] !== 'undefined') {
	    _logger2.default.log({ message: '[Mediator.subscribe] Topic already exists.', level: 'FATAL' });
	    throw new Error('Topic already exist, exiting.');
	  }
	
	  _logger2.default.log({ message: '[Mediator.subscribe] Subscribed.', level: 'ALL' });
	  subscriptions[options.topic] = options.callback;
	}
	
	function unsubscribe(subscription) {
	  _logger2.default.log({ message: '[Mediator.unsubscribe] Trying to unsubscribe.', level: 'ALL' });
	  if (typeof subscriptions[subscription.topic] === 'undefined') {
	    _logger2.default.log({ message: '[Mediator.unsubscribe] Topic doesn\'t exist.', level: 'WARN' });
	    return false;
	  }
	
	  delete subscriptions[subscription.topic];
	  _logger2.default.log({ message: '[Mediator.unsubscribe] Topic unsubscribed.', level: 'ALL' });
	}
	
	function request(envelope) {
	  _logger2.default.log({ message: '[Mediator.request] Trying to request callback with ' + envelope.data + '.', level: 'ALL' });
	  if (typeof subscriptions[envelope.topic] === 'undefined') {
	    _logger2.default.log({ message: '[Mediator.request] Topic does not exists.', level: 'ERROR' });
	    throw new Error('Topic does not exist, exiting.');
	  }
	
	  _logger2.default.log({ message: '[Mediator.request] Requested, returning Promise.', level: 'ALL' });
	  return new _promise2.default(function (resolve, reject) {
	    try {
	      _logger2.default.log({ message: '[Mediator.request] Promise resolved', level: 'ALL' });
	      resolve(subscriptions[envelope.topic](envelope.data));
	    } catch (e) {
	      _logger2.default.log({ message: '[Mediator.request] Promise rejected ' + e, level: 'ERROR' });
	      reject(e);
	    }
	  });
	}
	
	exports.default = channel;
	module.exports = exports['default'];

/***/ },
/* 52 */
/*!***************************************************!*\
  !*** /install/~/babel-runtime/core-js/promise.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ 53), __esModule: true };

/***/ },
/* 53 */
/*!************************************************!*\
  !*** /install/~/core-js/library/fn/promise.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 50);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 17);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 34);
	__webpack_require__(/*! ../modules/es6.promise */ 54);
	module.exports = __webpack_require__(/*! ../modules/$.core */ 10).Promise;

/***/ },
/* 54 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/es6.promise.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(/*! ./$ */ 24)
	  , LIBRARY    = __webpack_require__(/*! ./$.library */ 21)
	  , global     = __webpack_require__(/*! ./$.global */ 9)
	  , ctx        = __webpack_require__(/*! ./$.ctx */ 11)
	  , classof    = __webpack_require__(/*! ./$.classof */ 55)
	  , $export    = __webpack_require__(/*! ./$.export */ 8)
	  , isObject   = __webpack_require__(/*! ./$.is-object */ 49)
	  , anObject   = __webpack_require__(/*! ./$.an-object */ 48)
	  , aFunction  = __webpack_require__(/*! ./$.a-function */ 12)
	  , strictNew  = __webpack_require__(/*! ./$.strict-new */ 56)
	  , forOf      = __webpack_require__(/*! ./$.for-of */ 57)
	  , setProto   = __webpack_require__(/*! ./$.set-proto */ 62).set
	  , same       = __webpack_require__(/*! ./$.same-value */ 63)
	  , SPECIES    = __webpack_require__(/*! ./$.wks */ 31)('species')
	  , speciesConstructor = __webpack_require__(/*! ./$.species-constructor */ 64)
	  , asap       = __webpack_require__(/*! ./$.microtask */ 65)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(/*! ./$.descriptors */ 26)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(/*! ./$.redefine-all */ 70)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(/*! ./$.set-to-string-tag */ 30)(P, PROMISE);
	__webpack_require__(/*! ./$.set-species */ 71)(PROMISE);
	Wrapper = __webpack_require__(/*! ./$.core */ 10)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./$.iter-detect */ 72)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 55 */
/*!*******************************************************!*\
  !*** /install/~/core-js/library/modules/$.classof.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./$.cof */ 40)
	  , TAG = __webpack_require__(/*! ./$.wks */ 31)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.strict-new.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 57 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/modules/$.for-of.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(/*! ./$.ctx */ 11)
	  , call        = __webpack_require__(/*! ./$.iter-call */ 58)
	  , isArrayIter = __webpack_require__(/*! ./$.is-array-iter */ 59)
	  , anObject    = __webpack_require__(/*! ./$.an-object */ 48)
	  , toLength    = __webpack_require__(/*! ./$.to-length */ 60)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 61);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 58 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iter-call.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./$.an-object */ 48);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 59 */
/*!*************************************************************!*\
  !*** /install/~/core-js/library/modules/$.is-array-iter.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./$.iterators */ 28)
	  , ITERATOR   = __webpack_require__(/*! ./$.wks */ 31)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 60 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.to-length.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./$.to-integer */ 19)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 61 */
/*!**********************************************************************!*\
  !*** /install/~/core-js/library/modules/core.get-iterator-method.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./$.classof */ 55)
	  , ITERATOR  = __webpack_require__(/*! ./$.wks */ 31)('iterator')
	  , Iterators = __webpack_require__(/*! ./$.iterators */ 28);
	module.exports = __webpack_require__(/*! ./$.core */ 10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 62 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.set-proto.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(/*! ./$ */ 24).getDesc
	  , isObject = __webpack_require__(/*! ./$.is-object */ 49)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 48);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./$.ctx */ 11)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 63 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.same-value.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 64 */
/*!*******************************************************************!*\
  !*** /install/~/core-js/library/modules/$.species-constructor.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(/*! ./$.an-object */ 48)
	  , aFunction = __webpack_require__(/*! ./$.a-function */ 12)
	  , SPECIES   = __webpack_require__(/*! ./$.wks */ 31)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 65 */
/*!*********************************************************!*\
  !*** /install/~/core-js/library/modules/$.microtask.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./$.global */ 9)
	  , macrotask = __webpack_require__(/*! ./$.task */ 66).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(/*! ./$.cof */ 40)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 66 */
/*!****************************************************!*\
  !*** /install/~/core-js/library/modules/$.task.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(/*! ./$.ctx */ 11)
	  , invoke             = __webpack_require__(/*! ./$.invoke */ 67)
	  , html               = __webpack_require__(/*! ./$.html */ 68)
	  , cel                = __webpack_require__(/*! ./$.dom-create */ 69)
	  , global             = __webpack_require__(/*! ./$.global */ 9)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(/*! ./$.cof */ 40)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 67 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/modules/$.invoke.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 68 */
/*!****************************************************!*\
  !*** /install/~/core-js/library/modules/$.html.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./$.global */ 9).document && document.documentElement;

/***/ },
/* 69 */
/*!**********************************************************!*\
  !*** /install/~/core-js/library/modules/$.dom-create.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./$.is-object */ 49)
	  , document = __webpack_require__(/*! ./$.global */ 9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 70 */
/*!************************************************************!*\
  !*** /install/~/core-js/library/modules/$.redefine-all.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(/*! ./$.redefine */ 22);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 71 */
/*!***********************************************************!*\
  !*** /install/~/core-js/library/modules/$.set-species.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(/*! ./$.core */ 10)
	  , $           = __webpack_require__(/*! ./$ */ 24)
	  , DESCRIPTORS = __webpack_require__(/*! ./$.descriptors */ 26)
	  , SPECIES     = __webpack_require__(/*! ./$.wks */ 31)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 72 */
/*!***********************************************************!*\
  !*** /install/~/core-js/library/modules/$.iter-detect.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./$.wks */ 31)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 73 */
/*!******************************************!*\
  !*** ./core/factories/module.factory.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 41);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 74);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _channel = __webpack_require__(/*! ../mediator/channel */ 51);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _logger = __webpack_require__(/*! ../logger/logger */ 1);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createModule() {
	  var instance = (0, _assign2.default)({}, this);
	
	  instance.actions = actionsCreator(this.actions);
	
	  for (var action in instance.actions) {
	    _logger2.default.log({ message: '[Module.createModule] Assigning method ' + instance.actions[action].toString() + '() to object.', level: 'ALL' });
	    if (instance[action] instanceof Function) {
	      instance[instance.actions[action]] = instance[action].bind(instance);
	    } else {
	      _logger2.default.log('[Module.createModule] ' + action + ' doesn\'t have a function callback.', 'ERROR');
	      throw Error('Method not found for action \'' + action + '\'');
	    }
	    delete instance[action];
	  }
	
	  registerActions(instance.actions, instance);
	
	  return instance;
	}
	
	function actionsCreator(actions) {
	  var symbolActions = {};
	
	  _logger2.default.log({ message: '[Module.actionsCreator] Trying to create actions.', level: 'ALL' });
	
	  for (var action in actions) {
	    _logger2.default.log({ message: '[Module.actionsCreator] Creating action ' + action + '.', level: 'ALL' });
	    symbolActions[action] = (0, _symbol2.default)(action);
	  }
	
	  return symbolActions;
	}
	
	function registerActions(actions, instance) {
	  _logger2.default.log({ message: '[Module.registerActions] Trying to register actions', level: 'ALL' });
	
	  var _loop = function _loop(action) {
	    _logger2.default.log('[Module.registerActions] Subscribing to ' + action + ' action.', 'ALL');
	    _channel2.default.subscribe({
	      topic: actions[action],
	      callback: function callback(data) {
	        var response = void 0;
	
	        _logger2.default.log('[Module.callback] Action ' + action + ' callback called with ' + data, 'ALL');
	
	        try {
	          _logger2.default.log('[Module.callback] ' + action + ' Promise resolved', 'ALL');
	          response = instance[actions[action]](data);
	        } catch (e) {
	          _logger2.default.log('[Module.callback] ' + action + ' Promise rejected ' + e, 'ERROR');
	          response = e;
	        }
	
	        return response;
	      }
	    });
	  };
	
	  for (var action in actions) {
	    _loop(action);
	  }
	}
	
	exports.default = createModule;
	module.exports = exports['default'];

/***/ },
/* 74 */
/*!*********************************************************!*\
  !*** /install/~/babel-runtime/core-js/object/assign.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 75), __esModule: true };

/***/ },
/* 75 */
/*!******************************************************!*\
  !*** /install/~/core-js/library/fn/object/assign.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.assign */ 76);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 10).Object.assign;

/***/ },
/* 76 */
/*!***************************************************************!*\
  !*** /install/~/core-js/library/modules/es6.object.assign.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./$.export */ 8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./$.object-assign */ 77)});

/***/ },
/* 77 */
/*!*************************************************************!*\
  !*** /install/~/core-js/library/modules/$.object-assign.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(/*! ./$ */ 24)
	  , toObject = __webpack_require__(/*! ./$.to-object */ 5)
	  , IObject  = __webpack_require__(/*! ./$.iobject */ 39);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(/*! ./$.fails */ 13)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 78 */
/*!*****************************************!*\
  !*** ./core/factories/proxy.factory.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 52);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 74);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 79);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _logger = __webpack_require__(/*! ../logger/logger */ 1);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _channel = __webpack_require__(/*! ../mediator/channel */ 51);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createProxy(modules) {
	  var instance = this;
	
	  instance.Proxy = {};
	  instance.Proxy.actions = {};
	  instance.Proxy.doAction = doAction.bind(instance);
	  instance.addMiddleware = addMiddleware.bind(instance);
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _getIterator3.default)(modules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var module = _step.value;
	
	      instance.Proxy.actions = (0, _assign2.default)(instance.Proxy.actions, module.actions);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return instance;
	}
	
	function addMiddleware(serviceMiddleware) {
	  var action = serviceMiddleware.action;
	
	  this[action] = {};
	  this[action].before = serviceMiddleware.before;
	  this[action].after = serviceMiddleware.after;
	
	  _logger2.default.log({ message: '[Proxy.addMiddleware] Added serviceMiddleware ' + serviceMiddleware, level: 'ALL' });
	}
	
	function doAction(action, params) {
	  var _this = this;
	
	  var promise = void 0,
	      beforeResponse = void 0;
	
	  _logger2.default.log({ message: '[Proxy.doAction] Calling action ' + action.toString() + ' with ' + params, level: 'ALL' });
	
	  promise = new _promise2.default(function (resolve, reject) {
	    try {
	      beforeResponse = executeBeforeCallback(action, params, _this);
	      _logger2.default.log({ message: '[Proxy.doAction] Promise ' + action.toString() + ' resolved.', level: 'ALL' });
	      resolve(handleBeforeResponseAndMakeRequest(action, beforeResponse, _this));
	    } catch (e) {
	      _logger2.default.log({ message: '[Proxy.doAction] Promise ' + action.toString() + ' rejected ' + e, level: 'ERROR' });
	      reject(e);
	    }
	  });
	
	  return promise;
	}
	
	function executeBeforeCallback(action, params, instance) {
	  if (middlewareActionFunctionExists(action, instance, 'before')) {
	    _logger2.default.log({ message: '[Proxy.executeBeforeCallback] Executing before middleware', level: 'ALL' });
	    params = instance[action].before(params);
	  } else {
	    _logger2.default.log({ message: '[Proxy.executeBeforeCallback] No before middleware to execute', level: 'ALL' });
	  }
	
	  return params;
	}
	
	function handleBeforeResponseAndMakeRequest(action, response, instance) {
	  var promise = void 0;
	
	  if (isPromise(response)) {
	    _logger2.default.log({ message: '[Proxy.handleBeforeResponseAndMakeRequest] Before middleware is a Promise, waiting..', level: 'ALL' });
	    promise = response.then(function (data) {
	      return requestApplication(action, data, instance);
	    });
	  } else {
	    promise = requestApplication(action, response, instance);
	  }
	
	  return promise;
	}
	
	function middlewareActionFunctionExists(action, instance, type) {
	  return typeof instance[action] !== 'undefined' && typeof instance[action][type] !== 'undefined' && typeof instance[action][type] === 'function';
	}
	
	function isPromise(data) {
	  return typeof data !== 'undefined' && typeof data.then !== 'undefined' && typeof data.then === 'function';
	}
	
	function requestApplication(action, params, instance) {
	  _logger2.default.log({ message: '[Proxy.requestApplication] Actually requesting application for ' + action.toString(0) + ' with ' + params, level: 'ALL' });
	  return _channel2.default.request({ topic: action, data: params }).then(function (data) {
	    return extractProperDataFromRequest(action, data, instance);
	  });
	}
	
	function extractProperDataFromRequest(action, data, instance) {
	  if (middlewareActionFunctionExists(action, instance, 'after')) {
	    _logger2.default.log({ message: '[Proxy.handleBeforeResponseAndMakeRequest] Executing after middleware', level: 'ALL' });
	    data = instance[action].after(data);
	  } else {
	    _logger2.default.log({ message: '[Proxy.handleBeforeResponseAndMakeRequest] No after middleware to execute', level: 'ALL' });
	  }
	
	  return data;
	}
	
	exports.default = createProxy;
	module.exports = exports['default'];

/***/ },
/* 79 */
/*!********************************************************!*\
  !*** /install/~/babel-runtime/core-js/get-iterator.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 80), __esModule: true };

/***/ },
/* 80 */
/*!*****************************************************!*\
  !*** /install/~/core-js/library/fn/get-iterator.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 34);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 17);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 81);

/***/ },
/* 81 */
/*!***************************************************************!*\
  !*** /install/~/core-js/library/modules/core.get-iterator.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./$.an-object */ 48)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 61);
	module.exports = __webpack_require__(/*! ./$.core */ 10).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 82 */
/*!*********************************************!*\
  !*** ./core/factories/activator.factory.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 79);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _logger = __webpack_require__(/*! ../logger/logger */ 1);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _proxy = __webpack_require__(/*! ./proxy.factory */ 78);
	
	var _proxy2 = _interopRequireDefault(_proxy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createActivator(objects) {
	  var instance = this;
	
	  instance.request = {};
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _getIterator3.default)(objects), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var object = _step.value;
	
	      if (typeof object.Proxy !== 'undefined') objectIsProxy(object, instance);
	      if (typeof object.actions !== 'undefined') objectIsModule(object, instance);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  delete instance.actions;
	
	  return instance;
	}
	
	function objectIsProxy(object, instance) {
	  var proxy = object.Proxy;
	
	  createActionsMethods(proxy.actions, object, instance);
	}
	
	function objectIsModule(object, instance) {
	  var proxy = void 0;
	
	  _logger2.default.log({ message: '[Activator.createActivator] Extending Proxy.', level: 'ALL' });
	
	  proxy = _proxy2.default.call({}, [object]);
	  instance.addMiddleware = proxy.addMiddleware;
	
	  _logger2.default.log({ message: '[Activator.createActivator] Extending Activator.', level: 'ALL' });
	
	  createActionsMethods(proxy.Proxy.actions, proxy, instance);
	}
	
	function createActionsMethods(actions, proxy, instance) {
	  var _loop = function _loop(action) {
	    instance.request[actions[action]] = function (params) {
	      return proxy.Proxy.doAction(actions[action], params);
	    };
	    _logger2.default.log({ message: '[Activator.createActionsMethods] Created action method for ' + actions[action].toString() + ' - ' + proxy, level: 'ALL' });
	  };
	
	  for (var action in actions) {
	    _loop(action);
	  }
	}
	
	exports.default = createActivator;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lunar.js.map