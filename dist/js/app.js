/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/caozuo.js":
/*!***********************************!*\
  !*** ./src/controllers/caozuo.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  jingxuan: function jingxuan() {\n    var xuan = $(\"#jingxuan\"); // 这里点击事件和jquey的用法差不多\n\n    xuan.on(\"click\", function () {\n      console.log(\"好了\");\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/controllers/caozuo.js?");

/***/ }),

/***/ "./src/controllers/position.js":
/*!*************************************!*\
  !*** ./src/controllers/position.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 这里引进来要插入的摸板\nvar indexTpl = __webpack_require__(/*! ./../views/index.html */ \"./src/views/index.html\");\n\nvar count = 1;\nvar arr = [];\nmodule.exports = {\n  list: function list() {\n    $.ajax({\n      url: \"/api/index.php?r=index/ajaxnew&page=1\",\n      //从网站获取数据\n      success: function success(data) {\n        var result = JSON.parse(data);\n        result = result.data.data;\n        arr = result;\n        var rendpositionTpl = template.render(indexTpl, {\n          result: result\n        }); // 进行图片的布局\n\n        $(\"#temp\").html(rendpositionTpl); // 添加一个区域滚动效果，使得页面在到最底部的时候就会有弹的效果\n\n        var bscroll = new BScroll(\"main\", {\n          probeType: 2,\n          click: true\n        });\n        var foot = $('.foot img'),\n            bottomImgHasClass = foot.hasClass('down');\n        bscroll.on('scroll', function () {\n          var y = this.y;\n          var maxY = this.maxScrollY - y;\n          console.log(maxY); // 上拉，当滚动到最底部时候触发\n\n          if (maxY >= 0) {\n            !bottomImgHasClass && foot.addClass('down');\n            return;\n          }\n        });\n        bscroll.on(\"scrollEnd\", function () {\n          // 下拉加载处理\n          var maxY = this.maxScrollY - this.y;\n\n          if (maxY >= 0) {\n            foot.attr('src', '/images/ajax-loader.gif'); // 上拉加载更多\n\n            $.ajax({\n              url: \"/api/index.php?r=index/ajaxnew&page=\".concat(++count, \"&cac_id=cXVlcnlUaGVuRmV0Y2g7NjsxMzY0MDAxMjY6NFIxVmgxc2FTelNmNXN1SjlCVXFrZzsxMzYzODAyMDI6dWlMcXBzX0RSVzZVVm9CYWx5VTlBdzsxMzY0MDAxMjc6NFIxVmgxc2FTelNmNXN1SjlCVXFrZzs2ODUwMjAzMTo2V0thWlU0dVFUSy1ibGJaR255T0dnOzY4NjgxNzk4OjFJSGNjLV9lUTF5bzNTOFRMaEY2QVE7MTM2MzgwMTk0OnVpTHFwc19EUlc2VVZvQmFseVU5QXc7MDs%3D\"),\n              //从网站获取数据\n              success: function success(data) {\n                var result = JSON.parse(data);\n                result = result.data.data;\n                result = arr.concat(result);\n                arr = result;\n                console.log(arr); // 在这里进行渲染页面\n\n                var renderedindexTpl = template.render(indexTpl, {\n                  result: result\n                }); // 进行图片的布局\n\n                $(\"#temp\").html(renderedindexTpl);\n                bscroll.refresh(); // 数据加载完成之后要向上滚动多少距离\n\n                bscroll.scrollTo(0, bscroll.maxScrollY + 1800);\n                foot.removeClass('down');\n                foot.attr('src', './../images/arrow.png');\n              }\n            });\n          }\n        });\n        var swiper = new Swiper(\"#swiper\", {\n          // 切换画面做的事情\n          on: {\n            slideChangeTransitionStart: function slideChangeTransitionStart() {\n              $(\"nav li\").eq(this.activeIndex).addClass(\"active\").siblings().removeClass(\"active\");\n            }\n          }\n        });\n      }\n    });\n  },\n  SW: function SW() {\n    // 使用swiper切换画面\n    var swiper = new Swiper(\"#swiper\", {// on:{\n      //     slideChangeTransitionStart:function(){\n      //         // $(\"nav li\").eq(this.activeIndex).addClass(\"active\").siblings().removeClass(\"active\");\n      //     }\n      // }\n    });\n    var mySwiper = new Swiper('#swiper1', {\n      slidesPerView: 4\n    });\n    var mySwiper = new Swiper('#swiper2', {\n      autoplay: true,\n      pagination: {\n        el: '.swiper-pagination'\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/controllers/position.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var caozuo = __webpack_require__(/*! ../controllers/caozuo */ \"./src/controllers/caozuo.js\");\n\nvar _require = __webpack_require__(/*! ./../controllers/position */ \"./src/controllers/position.js\"),\n    SW = _require.SW,\n    list = _require.list; // 加载swiper函数\n\n\nSW(); // 向页面插入数据\n\nlist(); // 给页面添加事件\n\ncaozuo.jingxuan();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/views/index.html":
/*!******************************!*\
  !*** ./src/views/index.html ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"{{each result}}<div><div>        <img src=\\\"{{$value.pic}}\\\" alt=\\\"\\\"></div>    <div>        <div>            <div>{{$value.d_title}}</div>        </div>        <div>            <div>天猫价&nbsp;<span>¥{{$value.yuanjia}}</span></div>            <div>已售<span>27.6万</span>件</div>        </div>        <div>            <div>券后价&nbsp;<i>¥</i><span>{{$value.jiage}}</span></div>        </div></div></div>{{/each}}\"\n\n//# sourceURL=webpack:///./src/views/index.html?");

/***/ })

/******/ });