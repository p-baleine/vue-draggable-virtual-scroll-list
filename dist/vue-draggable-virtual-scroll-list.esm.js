import Vue from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Sortable = createCommonjsModule(function (module, exports) {
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
(function (global, factory) {
   module.exports = factory() ;
})(commonjsGlobal, function () {

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var version = "1.10.2";

  function userAgent(pattern) {
    if (typeof window !== 'undefined' && window.navigator) {
      return !! /*@__PURE__*/navigator.userAgent.match(pattern);
    }
  }

  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };

  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function matches(
  /**HTMLElement*/
  el,
  /**String*/
  selector) {
    if (!selector) return;
    selector[0] === '>' && (selector = selector.substring(1));

    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }

    return false;
  }

  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }

  function closest(
  /**HTMLElement*/
  el,
  /**String*/
  selector,
  /**HTMLElement*/
  ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;

      do {
        if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }

        if (el === ctx) break;
        /* jshint boss:true */
      } while (el = getParentOrHost(el));
    }

    return null;
  }

  var R_SPACE = /\s+/g;

  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? 'add' : 'remove'](name);
      } else {
        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
      }
    }
  }

  function css(el, prop, val) {
    var style = el && el.style;

    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf('webkit') === -1) {
          prop = '-webkit-' + prop;
        }

        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }

  function matrix(el, selfOnly) {
    var appliedTransforms = '';

    if (typeof el === 'string') {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, 'transform');

        if (transform && transform !== 'none') {
          appliedTransforms = transform + ' ' + appliedTransforms;
        }
        /* jshint boss:true */

      } while (!selfOnly && (el = el.parentNode));
    }

    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    /*jshint -W056 */

    return matrixFn && new matrixFn(appliedTransforms);
  }

  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
          i = 0,
          n = list.length;

      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }

      return list;
    }

    return [];
  }

  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;

    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */


  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;

    if (el !== window && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }

    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      // Adjust for translate()
      container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
      // Not needed on <= IE11

      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
            var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

            top -= containerRect.top + parseInt(css(container, 'border-top-width'));
            left -= containerRect.left + parseInt(css(container, 'border-left-width'));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
          /* jshint boss:true */

        } while (container = container.parentNode);
      }
    }

    if (undoScale && el !== window) {
      // Adjust for scale()
      var elMatrix = matrix(container || el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d;

      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }

    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width: width,
      height: height
    };
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */


  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true),
        elSideVal = getRect(el)[elSide];
    /* jshint boss:true */

    while (parent) {
      var parentSideVal = getRect(parent)[parentSide],
          visible = void 0;

      if (parentSide === 'top' || parentSide === 'left') {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }

      if (!visible) return parent;
      if (parent === getWindowScrollingElement()) break;
      parent = getParentAutoScrollElement(parent, false);
    }

    return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */


  function getChild(el, childNum, options) {
    var currentChild = 0,
        i = 0,
        children = el.children;

    while (i < children.length) {
      if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }

        currentChild++;
      }

      i++;
    }

    return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */


  function lastChild(el, selector) {
    var last = el.lastElementChild;

    while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }

    return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */


  function index(el, selector) {
    var index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }
    /* jshint boss:true */


    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index++;
      }
    }

    return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */


  function getRelativeScrollOffset(el) {
    var offsetLeft = 0,
        offsetTop = 0,
        winScroller = getWindowScrollingElement();

    if (el) {
      do {
        var elMatrix = matrix(el),
            scaleX = elMatrix.a,
            scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }

    return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */


  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i)) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
      }
    }

    return -1;
  }

  function getParentAutoScrollElement(el, includeSelf) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;

    do {
      // we don't need to get elem css if it isn't even overflowing in the first place (performance)
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);

        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
          if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
          if (gotSelf || includeSelf) return elem;
          gotSelf = true;
        }
      }
      /* jshint boss:true */

    } while (elem = elem.parentNode);

    return getWindowScrollingElement();
  }

  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }

    return dst;
  }

  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }

  var _throttleTimeout;

  function throttle(callback, ms) {
    return function () {
      if (!_throttleTimeout) {
        var args = arguments,
            _this = this;

        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        _throttleTimeout = setTimeout(function () {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }

  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }

  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }

  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;

    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }

  function setRect(el, rect) {
    css(el, 'position', 'absolute');
    css(el, 'top', rect.top);
    css(el, 'left', rect.left);
    css(el, 'width', rect.width);
    css(el, 'height', rect.height);
  }

  function unsetRect(el) {
    css(el, 'position', '');
    css(el, 'top', '');
    css(el, 'left', '');
    css(el, 'width', '');
    css(el, 'height', '');
  }

  var expando = 'Sortable' + new Date().getTime();

  function AnimationStateManager() {
    var animationStates = [],
        animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation) return;
        var children = [].slice.call(this.el.children);
        children.forEach(function (child) {
          if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });

          var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);

            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }

          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target: target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;

        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === 'function') callback();
          return;
        }

        var animating = false,
            animationTime = 0;
        animationStates.forEach(function (state) {
          var time = 0,
              target = state.target,
              fromRect = target.fromRect,
              toRect = getRect(target),
              prevFromRect = target.prevFromRect,
              prevToRect = target.prevToRect,
              animatingRect = state.rect,
              targetMatrix = matrix(target, true);

          if (targetMatrix) {
            // Compensate for current animation
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }

          target.toRect = toRect;

          if (target.thisAnimationDuration) {
            // Could also check if animatingRect is between fromRect and toRect
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              // If returning to same place as started from animation and on same axis
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          } // if fromRect != toRect: animate


          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;

            if (!time) {
              time = _this.options.animation;
            }

            _this.animate(target, animatingRect, toRect, time);
          }

          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function () {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);

        if (!animating) {
          if (typeof callback === 'function') callback();
        } else {
          animationCallbackId = setTimeout(function () {
            if (typeof callback === 'function') callback();
          }, animationTime);
        }

        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, 'transition', '');
          css(target, 'transform', '');
          var elMatrix = matrix(this.el),
              scaleX = elMatrix && elMatrix.a,
              scaleY = elMatrix && elMatrix.d,
              translateX = (currentRect.left - toRect.left) / (scaleX || 1),
              translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
          repaint(target); // repaint

          css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
          css(target, 'transform', 'translate3d(0,0,0)');
          typeof target.animated === 'number' && clearTimeout(target.animated);
          target.animated = setTimeout(function () {
            css(target, 'transition', '');
            css(target, 'transform', '');
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }

  function repaint(target) {
    return target.offsetWidth;
  }

  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }

  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      // Set default static properties
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }

      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;

      this.eventCanceled = false;

      evt.cancel = function () {
        _this.eventCanceled = true;
      };

      var eventNameGlobal = eventName + 'Global';
      plugins.forEach(function (plugin) {
        if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
            sortable: sortable
          }, evt));
        } // Only fire plugin event if plugin is enabled in this sortable,
        // and plugin has event defined


        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread({
            sortable: sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults, options) {
      plugins.forEach(function (plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized; // Add default options from plugin

        _extends(defaults, initialized.defaults);
      });

      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option)) continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);

        if (typeof modified !== 'undefined') {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function (plugin) {
        if (typeof plugin.eventProperties !== 'function') return;

        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function (plugin) {
        // Plugin must exist on the Sortable
        if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

        if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };

  function dispatchEvent(_ref) {
    var sortable = _ref.sortable,
        rootEl = _ref.rootEl,
        name = _ref.name,
        targetEl = _ref.targetEl,
        cloneEl = _ref.cloneEl,
        toEl = _ref.toEl,
        fromEl = _ref.fromEl,
        oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex,
        oldDraggableIndex = _ref.oldDraggableIndex,
        newDraggableIndex = _ref.newDraggableIndex,
        originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl && rootEl[expando];
    if (!sortable) return;
    var evt,
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent(name, true, true);
    }

    evt.to = toEl || rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;
    evt.oldIndex = oldIndex;
    evt.newIndex = newIndex;
    evt.oldDraggableIndex = oldDraggableIndex;
    evt.newDraggableIndex = newDraggableIndex;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

    var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }

    if (rootEl) {
      rootEl.dispatchEvent(evt);
    }

    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }

  var pluginEvent = function pluginEvent(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        originalEvent = _ref.evt,
        data = _objectWithoutProperties(_ref, ["evt"]);

    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
      dragEl: dragEl,
      parentEl: parentEl,
      ghostEl: ghostEl,
      rootEl: rootEl,
      nextEl: nextEl,
      lastDownEl: lastDownEl,
      cloneEl: cloneEl,
      cloneHidden: cloneHidden,
      dragStarted: moved,
      putSortable: putSortable,
      activeSortable: Sortable.active,
      originalEvent: originalEvent,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable: sortable,
          name: name,
          originalEvent: originalEvent
        });
      }
    }, data));
  };

  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread({
      putSortable: putSortable,
      cloneEl: cloneEl,
      targetEl: dragEl,
      rootEl: rootEl,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex
    }, info));
  }

  var dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      oldIndex,
      newIndex,
      oldDraggableIndex,
      newDraggableIndex,
      activeGroup,
      putSortable,
      awaitingDragStarted = false,
      ignoreNextClick = false,
      sortables = [],
      tapEvt,
      touchEvt,
      lastDx,
      lastDy,
      tapDistanceLeft,
      tapDistanceTop,
      moved,
      lastTarget,
      lastDirection,
      pastFirstInvertThresh = false,
      isCircumstantialInvert = false,
      targetMoveDistance,
      // For positioning ghost absolutely
  ghostRelativeParent,
      ghostRelativeParentInitialScroll = [],
      // (left, top)
  _silent = false,
      savedInputChecked = [];
  /** @const */

  var documentExists = typeof document !== 'undefined',
      PositionGhostAbsolutely = IOS,
      CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
      // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
      supportCssPointerEvents = function () {
    if (!documentExists) return; // false when <= IE11

    if (IE11OrLess) {
      return false;
    }

    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
      _detectDirection = function _detectDirection(el, options) {
    var elCSS = css(el),
        elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
        child1 = getChild(el, 0, options),
        child2 = getChild(el, 1, options),
        firstChildCSS = child1 && css(child1),
        secondChildCSS = child2 && css(child2),
        firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
        secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }

    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }

    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }

    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
      _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
        dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
        dragElOppLength = vertical ? dragRect.width : dragRect.height,
        targetS1Opp = vertical ? targetRect.left : targetRect.top,
        targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
        targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },

  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      if (lastChild(sortable)) return;
      var rect = getRect(sortable),
          threshold = sortable[expando].options.emptyInsertThreshold,
          insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
          insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

      if (threshold && insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
      _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }

    var group = {};
    var originalGroup = options.group;

    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }

    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
      _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', 'none');
    }
  },
      _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', '');
    }
  }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


  if (documentExists) {
    document.addEventListener('click', function (evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }

  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;

      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

      if (nearest) {
        // Create imitation event
        var event = {};

        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }

        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;

        nearest[expando]._onDragOver(event);
      }
    }
  };

  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */


  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }

    this.el = el; // root element

    this.options = options = _extends({}, options); // Export instance

    el[expando] = this;
    var defaults = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: 'data-id',
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults); // Set default options

    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }

    _prepareGroup(options); // Bind all private methods


    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    } // Setup drag mode


    this.nativeDraggable = options.forceFallback ? false : supportDraggable;

    if (this.nativeDraggable) {
      // Touch start threshold cannot be greater than the native dragstart threshold
      this.options.touchStartThreshold = 1;
    } // Bind events


    if (options.supportPointer) {
      on(el, 'pointerdown', this._onTapStart);
    } else {
      on(el, 'mousedown', this._onTapStart);
      on(el, 'touchstart', this._onTapStart);
    }

    if (this.nativeDraggable) {
      on(el, 'dragover', this);
      on(el, 'dragenter', this);
    }

    sortables.push(this.el); // Restore sorting

    options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

    _extends(this, AnimationStateManager());
  }

  Sortable.prototype =
  /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(
    /** Event|TouchEvent */
    evt) {
      if (!evt.cancelable) return;

      var _this = this,
          el = this.el,
          options = this.options,
          preventOnFilter = options.preventOnFilter,
          type = evt.type,
          touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
          target = (touch || evt).target,
          originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
          filter = options.filter;

      _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


      if (dragEl) {
        return;
      }

      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return; // only left button and enabled
      } // cancel dnd if original target is content editable


      if (originalTarget.isContentEditable) {
        return;
      }

      target = closest(target, options.draggable, el, false);

      if (target && target.animated) {
        return;
      }

      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      } // Get the index of the dragged element within its parent


      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable); // Check filter

      if (typeof filter === 'function') {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: 'filter',
            targetEl: target,
            toEl: el,
            fromEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(',').some(function (criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);

          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: 'filter',
              targetEl: target,
              fromEl: el,
              toEl: el
            });

            pluginEvent('filter', _this, {
              evt: evt
            });
            return true;
          }
        });

        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      }

      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      } // Prepare `dragstart`


      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(
    /** Event */
    evt,
    /** Touch */
    touch,
    /** HTMLElement */
    target) {
      var _this = this,
          el = _this.el,
          options = _this.options,
          ownerDocument = el.ownerDocument,
          dragStartFn;

      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style['will-change'] = 'all';

        dragStartFn = function dragStartFn() {
          pluginEvent('delayEnded', _this, {
            evt: evt
          });

          if (Sortable.eventCanceled) {
            _this._onDrop();

            return;
          } // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove


          _this._disableDelayedDragEvents();

          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          } // Bind the events: dragstart/dragend


          _this._triggerDragStart(evt, touch); // Drag start event


          _dispatchEvent({
            sortable: _this,
            name: 'choose',
            originalEvent: evt
          }); // Chosen item


          toggleClass(dragEl, options.chosenClass, true);
        }; // Disable "draggable"


        options.ignore.split(',').forEach(function (criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mouseup', _this._onDrop);
        on(ownerDocument, 'touchend', _this._onDrop);
        on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }

        pluginEvent('delayStart', this, {
          evt: evt
        }); // Delay is impossible for native DnD in Edge or IE

        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();

            return;
          } // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag


          on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
          on(ownerDocument, 'touchend', _this._disableDelayedDrag);
          on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
          on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
          on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
    /** TouchEvent|PointerEvent **/
    e) {
      var touch = e.touches ? e.touches[0] : e;

      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);

      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._disableDelayedDrag);
      off(ownerDocument, 'touchend', this._disableDelayedDrag);
      off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
      off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(
    /** Event */
    evt,
    /** Touch */
    touch) {
      touch = touch || evt.pointerType == 'touch' && evt;

      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._onTouchMove);
        } else if (touch) {
          on(document, 'touchmove', this._onTouchMove);
        } else {
          on(document, 'mousemove', this._onTouchMove);
        }
      } else {
        on(dragEl, 'dragend', this);
        on(rootEl, 'dragstart', this._onDragStart);
      }

      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          _nextTick(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;

      if (rootEl && dragEl) {
        pluginEvent('dragStarted', this, {
          evt: evt
        });

        if (this.nativeDraggable) {
          on(document, 'dragover', _checkOutsideTargetEl);
        }

        var options = this.options; // Apply effect

        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event

        _dispatchEvent({
          sortable: this,
          name: 'start',
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;

        _hideGhostForTarget();

        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;

        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent) break;
          parent = target;
        }

        dragEl.parentNode[expando]._isOutsideThisEl(target);

        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target: target,
                rootEl: parent
              });

              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }

            target = parent; // store last element
          }
          /* jshint boss:true */
          while (parent = parent.parentNode);
        }

        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(
    /**TouchEvent*/
    evt) {
      if (tapEvt) {
        var options = this.options,
            fallbackTolerance = options.fallbackTolerance,
            fallbackOffset = options.fallbackOffset,
            touch = evt.touches ? evt.touches[0] : evt,
            ghostMatrix = ghostEl && matrix(ghostEl, true),
            scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
            scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
            relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
            dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
            dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }

          this._onDragStart(evt, true);
        }

        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }

          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, 'webkitTransform', cssMatrix);
          css(ghostEl, 'mozTransform', cssMatrix);
          css(ghostEl, 'msTransform', cssMatrix);
          css(ghostEl, 'transform', cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }

        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      // Bug if using scale(): https://stackoverflow.com/questions/2637058
      // Not being adjusted for
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl,
            rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
            options = this.options; // Position absolutely

        if (PositionGhostAbsolutely) {
          // Get relatively positioned parent
          ghostRelativeParent = container;

          while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }

          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }

          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }

        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, 'transition', '');
        css(ghostEl, 'transform', '');
        css(ghostEl, 'box-sizing', 'border-box');
        css(ghostEl, 'margin', 0);
        css(ghostEl, 'top', rect.top);
        css(ghostEl, 'left', rect.left);
        css(ghostEl, 'width', rect.width);
        css(ghostEl, 'height', rect.height);
        css(ghostEl, 'opacity', '0.8');
        css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
        css(ghostEl, 'zIndex', '100000');
        css(ghostEl, 'pointerEvents', 'none');
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl); // Set transform-origin

        css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
      }
    },
    _onDragStart: function _onDragStart(
    /**Event*/
    evt,
    /**boolean*/
    fallback) {
      var _this = this;

      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent('dragStart', this, {
        evt: evt
      });

      if (Sortable.eventCanceled) {
        this._onDrop();

        return;
      }

      pluginEvent('setupClone', this);

      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style['will-change'] = '';

        this._hideClone();

        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      } // #1143: IFrame support workaround


      _this.cloneId = _nextTick(function () {
        pluginEvent('clone', _this);
        if (Sortable.eventCanceled) return;

        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }

        _this._hideClone();

        _dispatchEvent({
          sortable: _this,
          name: 'clone'
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        // Undo what was set in _prepareDragStart before drag started
        off(document, 'mouseup', _this._onDrop);
        off(document, 'touchend', _this._onDrop);
        off(document, 'touchcancel', _this._onDrop);

        if (dataTransfer) {
          dataTransfer.effectAllowed = 'move';
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }

        on(document, 'drop', _this); // #1276 fix:

        css(dragEl, 'transform', 'translateZ(0)');
      }

      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, 'selectstart', _this);
      moved = true;

      if (Safari) {
        css(document.body, 'user-select', 'none');
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(
    /**Event*/
    evt) {
      var el = this.el,
          target = evt.target,
          dragRect,
          targetRect,
          revert,
          options = this.options,
          group = options.group,
          activeSortable = Sortable.active,
          isOwner = activeGroup === group,
          canSort = options.sort,
          fromSortable = putSortable || activeSortable,
          vertical,
          _this = this,
          completedFired = false;

      if (_silent) return;

      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread({
          evt: evt,
          isOwner: isOwner,
          axis: vertical ? 'vertical' : 'horizontal',
          revert: revert,
          dragRect: dragRect,
          targetRect: targetRect,
          canSort: canSort,
          fromSortable: fromSortable,
          target: target,
          completed: completed,
          onMove: function onMove(target, after) {
            return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
          },
          changed: changed
        }, extra));
      } // Capture animation state


      function capture() {
        dragOverEvent('dragOverAnimationCapture');

        _this.captureAnimationState();

        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      } // Return invocation when dragEl is inserted (or completed)


      function completed(insertion) {
        dragOverEvent('dragOverCompleted', {
          insertion: insertion
        });

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }

          if (_this !== fromSortable) {
            // Set ghost class to new sortable's ghost class
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }

          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          } // Animation


          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }

          _this.animateAll(function () {
            dragOverEvent('dragOverAnimationComplete');
            _this._ignoreWhileAnimating = null;
          });

          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        } // Null lastTarget if it is not inside a previously swapped element


        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        } // no bubbling and not fallback


        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


          !insertion && nearestEmptyInsertDetectEvent(evt);
        }

        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      } // Call when dragEl has been inserted


      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);

        _dispatchEvent({
          sortable: _this,
          name: 'change',
          toEl: el,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          originalEvent: evt
        });
      }

      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }

      target = closest(target, options.draggable, el, true);
      dragOverEvent('dragOver');
      if (Sortable.eventCanceled) return completedFired;

      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }

      ignoreNextClick = false;

      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
      : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === 'vertical';
        dragRect = getRect(dragEl);
        dragOverEvent('dragOverValid');
        if (Sortable.eventCanceled) return completedFired;

        if (revert) {
          parentEl = rootEl; // actualization

          capture();

          this._hideClone();

          dragOverEvent('revert');

          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }

          return completed(true);
        }

        var elLastChild = lastChild(el, options.draggable);

        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          // If already at end of list: Do not insert
          if (elLastChild === dragEl) {
            return completed(false);
          } // assign target only if condition is true


          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }

          if (target) {
            targetRect = getRect(target);
          }

          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el; // actualization

            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0,
              targetBeforeFirstSwap,
              differentLevel = dragEl.parentNode !== el,
              differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
              side1 = vertical ? 'top' : 'left',
              scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
              scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }

          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;

          if (direction !== 0) {
            // Check if target is beside dragEl in respective direction (ignoring hidden elements)
            var dragIndex = index(dragEl);

            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
          } // If dragEl is already beside target: Do not insert


          if (direction === 0 || sibling === target) {
            return completed(false);
          }

          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling,
              after = false;
          after = direction === 1;

          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }

            _silent = true;
            setTimeout(_unsilent, 30);
            capture();

            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            } // Undo chrome's scroll adjustment (has no effect on other browsers)


            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }

            parentEl = dragEl.parentNode; // actualization
            // must be done before animation

            if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }

            changed();
            return completed(true);
          }
        }

        if (el.contains(dragEl)) {
          return completed(false);
        }
      }

      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, 'mousemove', this._onTouchMove);
      off(document, 'touchmove', this._onTouchMove);
      off(document, 'pointermove', this._onTouchMove);
      off(document, 'dragover', nearestEmptyInsertDetectEvent);
      off(document, 'mousemove', nearestEmptyInsertDetectEvent);
      off(document, 'touchmove', nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._onDrop);
      off(ownerDocument, 'touchend', this._onDrop);
      off(ownerDocument, 'pointerup', this._onDrop);
      off(ownerDocument, 'touchcancel', this._onDrop);
      off(document, 'selectstart', this);
    },
    _onDrop: function _onDrop(
    /**Event*/
    evt) {
      var el = this.el,
          options = this.options; // Get the index of the dragged element within its parent

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent('drop', this, {
        evt: evt
      });
      parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      if (Sortable.eventCanceled) {
        this._nulling();

        return;
      }

      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);

      _cancelNextTick(this.cloneId);

      _cancelNextTick(this._dragStartId); // Unbind events


      if (this.nativeDraggable) {
        off(document, 'drop', this);
        off(el, 'dragstart', this._onDragStart);
      }

      this._offMoveEvents();

      this._offUpEvents();

      if (Safari) {
        css(document.body, 'user-select', '');
      }

      css(dragEl, 'transform', '');

      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }

        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          // Remove clone(s)
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }

        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, 'dragend', this);
          }

          _disableDraggable(dragEl);

          dragEl.style['will-change'] = ''; // Remove classes
          // ghostClass is added in dragStarted

          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }

          toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

          _dispatchEvent({
            sortable: this,
            name: 'unchoose',
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });

          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              // Add event
              _dispatchEvent({
                rootEl: parentEl,
                name: 'add',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              }); // Remove event


              _dispatchEvent({
                sortable: this,
                name: 'remove',
                toEl: parentEl,
                originalEvent: evt
              }); // drag from one list and drop into another


              _dispatchEvent({
                rootEl: parentEl,
                name: 'sort',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }

            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent({
                  sortable: this,
                  name: 'update',
                  toEl: parentEl,
                  originalEvent: evt
                });

                _dispatchEvent({
                  sortable: this,
                  name: 'sort',
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }

          if (Sortable.active) {
            /* jshint eqnull:true */
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }

            _dispatchEvent({
              sortable: this,
              name: 'end',
              toEl: parentEl,
              originalEvent: evt
            }); // Save sorting


            this.save();
          }
        }
      }

      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent('nulling', this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(
    /**Event*/
    evt) {
      switch (evt.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(evt);

          break;

        case 'dragenter':
        case 'dragover':
          if (dragEl) {
            this._onDragOver(evt);

            _globalDragOver(evt);
          }

          break;

        case 'selectstart':
          evt.preventDefault();
          break;
      }
    },

    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [],
          el,
          children = this.el.children,
          i = 0,
          n = children.length,
          options = this.options;

      for (; i < n; i++) {
        el = children[i];

        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }

      return order;
    },

    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order) {
      var items = {},
          rootEl = this.el;
      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];

        if (closest(el, this.options.draggable, rootEl, false)) {
          items[id] = el;
        }
      }, this);
      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
    },

    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },

    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;

      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);

        if (typeof modifiedValue !== 'undefined') {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }

        if (name === 'group') {
          _prepareGroup(options);
        }
      }
    },

    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent('destroy', this);
      var el = this.el;
      el[expando] = null;
      off(el, 'mousedown', this._onTapStart);
      off(el, 'touchstart', this._onTapStart);
      off(el, 'pointerdown', this._onTapStart);

      if (this.nativeDraggable) {
        off(el, 'dragover', this);
        off(el, 'dragenter', this);
      } // Remove draggable attributes


      Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
        el.removeAttribute('draggable');
      });

      this._onDrop();

      this._disableDelayedDragEvents();

      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent('hideClone', this);
        if (Sortable.eventCanceled) return;
        css(cloneEl, 'display', 'none');

        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }

        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable) {
      if (putSortable.lastPutMode !== 'clone') {
        this._hideClone();

        return;
      }

      if (cloneHidden) {
        pluginEvent('showClone', this);
        if (Sortable.eventCanceled) return; // show clone at dragEl or original position

        if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }

        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }

        css(cloneEl, 'display', '');
        cloneHidden = false;
      }
    }
  };

  function _globalDragOver(
  /**Event*/
  evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
    }

    evt.cancelable && evt.preventDefault();
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt,
        sortable = fromEl[expando],
        onMoveFn = sortable.options.onMove,
        retVal; // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent('move', {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent('move', true, true);
    }

    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);

    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }

    return retVal;
  }

  function _disableDraggable(el) {
    el.draggable = false;
  }

  function _unsilent() {
    _silent = false;
  }

  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }

  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
        targetLength = vertical ? targetRect.height : targetRect.width,
        targetS1 = vertical ? targetRect.top : targetRect.left,
        targetS2 = vertical ? targetRect.bottom : targetRect.right,
        invert = false;

    if (!invertSwap) {
      // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
        // check if past first invert threshold on side opposite of lastDirection
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          // past first invert threshold, do not restrict inverted threshold to dragEl shadow
          pastFirstInvertThresh = true;
        }

        if (!pastFirstInvertThresh) {
          // dragEl shadow (target move distance shadow)
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
          : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        // Regular
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }

    invert = invert || invertSwap;

    if (invert) {
      // Invert of regular
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }

    return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */


  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */


  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
        i = str.length,
        sum = 0;

    while (i--) {
      sum += str.charCodeAt(i);
    }

    return sum.toString(36);
  }

  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName('input');
    var idx = inputs.length;

    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }

  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }

  function _cancelNextTick(id) {
    return clearTimeout(id);
  } // Fixed #973:


  if (documentExists) {
    on(document, 'touchmove', function (evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  } // Export utils


  Sortable.utils = {
    on: on,
    off: off,
    css: css,
    find: find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend: extend,
    throttle: throttle,
    closest: closest,
    toggleClass: toggleClass,
    clone: clone,
    index: index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild: getChild
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */

  Sortable.get = function (element) {
    return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */


  Sortable.mount = function () {
    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    if (plugins[0].constructor === Array) plugins = plugins[0];
    plugins.forEach(function (plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }

      if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */


  Sortable.create = function (el, options) {
    return new Sortable(el, options);
  }; // Export


  Sortable.version = version;
  var autoScrolls = [],
      scrollEl,
      scrollRootEl,
      scrolling = false,
      lastAutoScrollX,
      lastAutoScrollY,
      touchEvt$1,
      pointerElemChangedInterval;

  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      }; // Bind all private methods

      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }
    }

    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;

        if (this.sortable.nativeDraggable) {
          on(document, 'dragover', this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, 'pointermove', this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, 'touchmove', this._handleFallbackAutoScroll);
          } else {
            on(document, 'mousemove', this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent; // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)

        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop() {
        if (this.sortable.nativeDraggable) {
          off(document, 'dragover', this._handleAutoScroll);
        } else {
          off(document, 'pointermove', this._handleFallbackAutoScroll);
          off(document, 'touchmove', this._handleFallbackAutoScroll);
          off(document, 'mousemove', this._handleFallbackAutoScroll);
        }

        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;

        var x = (evt.touches ? evt.touches[0] : evt).clientX,
            y = (evt.touches ? evt.touches[0] : evt).clientY,
            elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt; // IE does not seem to have native autoscroll,
        // Edge's autoscroll seems too conditional,
        // MACOS Safari does not have autoscroll,
        // Firefox and Chrome are good

        if (fallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

          var ogElemScroller = getParentAutoScrollElement(elem, true);

          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

            pointerElemChangedInterval = setInterval(function () {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }

              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }

          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: 'scroll',
      initializeByDefault: true
    });
  }

  function clearAutoScrolls() {
    autoScrolls.forEach(function (autoScroll) {
      clearInterval(autoScroll.pid);
    });
    autoScrolls = [];
  }

  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }

  var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
    if (!options.scroll) return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        sens = options.scrollSensitivity,
        speed = options.scrollSpeed,
        winScroller = getWindowScrollingElement();
    var scrollThisInstance = false,
        scrollCustomFn; // New scroll root, set scrollEl

    if (scrollRootEl !== rootEl) {
      scrollRootEl = rootEl;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;

      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl, true);
      }
    }

    var layersOut = 0;
    var currentParent = scrollEl;

    do {
      var el = currentParent,
          rect = getRect(el),
          top = rect.top,
          bottom = rect.bottom,
          left = rect.left,
          right = rect.right,
          width = rect.width,
          height = rect.height,
          canScrollX = void 0,
          canScrollY = void 0,
          scrollWidth = el.scrollWidth,
          scrollHeight = el.scrollHeight,
          elCSS = css(el),
          scrollPosX = el.scrollLeft,
          scrollPosY = el.scrollTop;

      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
      }

      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }

      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);

        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          /* jshint loopfunc:true */

          autoScrolls[layersOut].pid = setInterval(function () {
            // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

            }

            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

            if (typeof scrollCustomFn === 'function') {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
                return;
              }
            }

            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }

      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

    scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
  }, 30);

  var drop = function drop(_ref) {
    var originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        dragEl = _ref.dragEl,
        activeSortable = _ref.activeSortable,
        dispatchSortableEvent = _ref.dispatchSortableEvent,
        hideGhostForTarget = _ref.hideGhostForTarget,
        unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent) return;
    var toSortable = putSortable || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();

    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent('spill');
      this.onSpill({
        dragEl: dragEl,
        putSortable: putSortable
      });
    }
  };

  function Revert() {}

  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl = _ref3.dragEl,
          putSortable = _ref3.putSortable;
      this.sortable.captureAnimationState();

      if (putSortable) {
        putSortable.captureAnimationState();
      }

      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl);
      }

      this.sortable.animateAll();

      if (putSortable) {
        putSortable.animateAll();
      }
    },
    drop: drop
  };

  _extends(Revert, {
    pluginName: 'revertOnSpill'
  });

  function Remove() {}

  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl = _ref4.dragEl,
          putSortable = _ref4.putSortable;
      var parentSortable = putSortable || this.sortable;
      parentSortable.captureAnimationState();
      dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
      parentSortable.animateAll();
    },
    drop: drop
  };

  _extends(Remove, {
    pluginName: 'removeOnSpill'
  });

  var lastSwapEl;

  function SwapPlugin() {
    function Swap() {
      this.defaults = {
        swapClass: 'sortable-swap-highlight'
      };
    }

    Swap.prototype = {
      dragStart: function dragStart(_ref) {
        var dragEl = _ref.dragEl;
        lastSwapEl = dragEl;
      },
      dragOverValid: function dragOverValid(_ref2) {
        var completed = _ref2.completed,
            target = _ref2.target,
            onMove = _ref2.onMove,
            activeSortable = _ref2.activeSortable,
            changed = _ref2.changed,
            cancel = _ref2.cancel;
        if (!activeSortable.options.swap) return;
        var el = this.sortable.el,
            options = this.options;

        if (target && target !== el) {
          var prevSwapEl = lastSwapEl;

          if (onMove(target) !== false) {
            toggleClass(target, options.swapClass, true);
            lastSwapEl = target;
          } else {
            lastSwapEl = null;
          }

          if (prevSwapEl && prevSwapEl !== lastSwapEl) {
            toggleClass(prevSwapEl, options.swapClass, false);
          }
        }

        changed();
        completed(true);
        cancel();
      },
      drop: function drop(_ref3) {
        var activeSortable = _ref3.activeSortable,
            putSortable = _ref3.putSortable,
            dragEl = _ref3.dragEl;
        var toSortable = putSortable || this.sortable;
        var options = this.options;
        lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

        if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
          if (dragEl !== lastSwapEl) {
            toSortable.captureAnimationState();
            if (toSortable !== activeSortable) activeSortable.captureAnimationState();
            swapNodes(dragEl, lastSwapEl);
            toSortable.animateAll();
            if (toSortable !== activeSortable) activeSortable.animateAll();
          }
        }
      },
      nulling: function nulling() {
        lastSwapEl = null;
      }
    };
    return _extends(Swap, {
      pluginName: 'swap',
      eventProperties: function eventProperties() {
        return {
          swapItem: lastSwapEl
        };
      }
    });
  }

  function swapNodes(n1, n2) {
    var p1 = n1.parentNode,
        p2 = n2.parentNode,
        i1,
        i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
    i1 = index(n1);
    i2 = index(n2);

    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }

    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  }

  var multiDragElements = [],
      multiDragClones = [],
      lastMultiDragSelect,
      // for selection with modifier key down (SHIFT)
  multiDragSortable,
      initialFolding = false,
      // Initial multi-drag fold when drag started
  folding = false,
      // Folding any other time
  dragStarted = false,
      dragEl$1,
      clonesFromRect,
      clonesHidden;

  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      // Bind all private methods
      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }

      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }

      on(document, 'keydown', this._checkKeyDown);
      on(document, 'keyup', this._checkKeyUp);
      this.defaults = {
        selectedClass: 'sortable-selected',
        multiDragKey: null,
        setData: function setData(dataTransfer, dragEl) {
          var data = '';

          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function (multiDragElement, i) {
              data += (!i ? '' : ', ') + multiDragElement.textContent;
            });
          } else {
            data = dragEl.textContent;
          }

          dataTransfer.setData('Text', data);
        }
      };
    }

    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable,
            cancel = _ref2.cancel;
        if (!this.isMultiDrag) return;

        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style['will-change'] = '';
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }

        sortable._hideClone();

        cancel();
      },
      clone: function clone(_ref3) {
        var sortable = _ref3.sortable,
            rootEl = _ref3.rootEl,
            dispatchSortableEvent = _ref3.dispatchSortableEvent,
            cancel = _ref3.cancel;
        if (!this.isMultiDrag) return;

        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl);
            dispatchSortableEvent('clone');
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown,
            rootEl = _ref4.rootEl,
            cancel = _ref4.cancel;
        if (!this.isMultiDrag) return;
        insertMultiDragClones(false, rootEl);
        multiDragClones.forEach(function (clone) {
          css(clone, 'display', '');
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;

        var sortable = _ref5.sortable,
            cloneNowHidden = _ref5.cloneNowHidden,
            cancel = _ref5.cancel;
        if (!this.isMultiDrag) return;
        multiDragClones.forEach(function (clone) {
          css(clone, 'display', 'none');

          if (_this.options.removeCloneOnHide && clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        var sortable = _ref6.sortable;

        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }

        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        }); // Sort multi-drag elements

        multiDragElements = multiDragElements.sort(function (a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted(_ref7) {
        var _this2 = this;

        var sortable = _ref7.sortable;
        if (!this.isMultiDrag) return;

        if (this.options.sort) {
          // Capture rects,
          // hide multi drag elements (by positioning them absolute),
          // set multi drag elements rects to dragRect,
          // show multi drag elements,
          // animate to rects,
          // unset rects & remove from DOM
          sortable.captureAnimationState();

          if (this.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              css(multiDragElement, 'position', 'absolute');
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }

        sortable.animateAll(function () {
          folding = false;
          initialFolding = false;

          if (_this2.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
          } // Remove all auxiliary multidrag items from el, if sorting enabled


          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target,
            completed = _ref8.completed,
            cancel = _ref8.cancel;

        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable,
            rootEl = _ref9.rootEl,
            sortable = _ref9.sortable,
            dragRect = _ref9.dragRect;

        if (multiDragElements.length > 1) {
          // Setup unfold animation
          multiDragElements.forEach(function (multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable,
            isOwner = _ref10.isOwner,
            insertion = _ref10.insertion,
            activeSortable = _ref10.activeSortable,
            parentEl = _ref10.parentEl,
            putSortable = _ref10.putSortable;
        var options = this.options;

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          }

          initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
            // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
              // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

              parentEl.appendChild(multiDragElement);
            });
            folding = true;
          } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


          if (!isOwner) {
            // Only remove if not folding (folding will remove them anyways)
            if (!folding) {
              removeMultiDragElements();
            }

            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;

              activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function (clone) {
                  activeSortable.addAnimationState({
                    target: clone,
                    rect: clonesFromRect
                  });
                  clone.fromRect = clonesFromRect;
                  clone.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect,
            isOwner = _ref11.isOwner,
            activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });

        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop(_ref12) {
        var evt = _ref12.originalEvent,
            rootEl = _ref12.rootEl,
            parentEl = _ref12.parentEl,
            sortable = _ref12.sortable,
            dispatchSortableEvent = _ref12.dispatchSortableEvent,
            oldIndex = _ref12.oldIndex,
            putSortable = _ref12.putSortable;
        var toSortable = putSortable || this.sortable;
        if (!evt) return;
        var options = this.options,
            children = parentEl.children; // Multi-drag selection

        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }

          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'select',
              targetEl: dragEl$1,
              originalEvt: evt
            }); // Modifier activated, select from last to dragEl

            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect),
                  currentIndex = index(dragEl$1);

              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                // Must include lastMultiDragSelect (select it), in case modified selection from no selection
                // (but previous selection existed)
                var n, i;

                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }

                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i])) continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable: sortable,
                    rootEl: rootEl,
                    name: 'select',
                    targetEl: children[i],
                    originalEvt: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }

            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'deselect',
              targetEl: dragEl$1,
              originalEvt: evt
            });
          }
        } // Multi-drag drop


        if (dragStarted && this.isMultiDrag) {
          // Do not "unfold" after around dragEl if reverted
          if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1),
                multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
            if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();

            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function (multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;

                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect; // Prepare unfold animation

                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect: rect
                    });
                  }
                });
              } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
              // properly they must all be removed


              removeMultiDragElements();
              multiDragElements.forEach(function (multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl.appendChild(multiDragElement);
                }

                multiDragIndex++;
              }); // If initial folding is done, the elements may have changed position because they are now
              // unfolding around dragEl, even though dragEl may not have his index changed, so update event
              // must be fired here as Sortable will not.

              if (oldIndex === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });

                if (update) {
                  dispatchSortableEvent('update');
                }
              }
            } // Must be done after capturing individual rects (scroll bar)


            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }

          multiDragSortable = toSortable;
        } // Remove clones if necessary


        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          multiDragClones.forEach(function (clone) {
            clone.parentNode && clone.parentNode.removeChild(clone);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();

        off(document, 'pointerup', this._deselectMultiDrag);
        off(document, 'mouseup', this._deselectMultiDrag);
        off(document, 'touchend', this._deselectMultiDrag);
        off(document, 'keydown', this._checkKeyDown);
        off(document, 'keyup', this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

        if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

        if (evt && evt.button !== 0) return;

        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: 'deselect',
            targetEl: el,
            originalEvt: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      // Static methods & properties
      pluginName: 'multiDrag',
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();

            multiDragSortable = sortable;
          }

          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },

        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando],
              index = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index) return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;

        var oldIndicies = [],
            newIndicies = [];
        multiDragElements.forEach(function (multiDragElement) {
          oldIndicies.push({
            multiDragElement: multiDragElement,
            index: multiDragElement.sortableIndex
          }); // multiDragElements will already be sorted if folding

          var newIndex;

          if (folding && multiDragElement !== dragEl$1) {
            newIndex = -1;
          } else if (folding) {
            newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
          } else {
            newIndex = index(multiDragElement);
          }

          newIndicies.push({
            multiDragElement: multiDragElement,
            index: newIndex
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies: oldIndicies,
          newIndicies: newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();

          if (key === 'ctrl') {
            key = 'Control';
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }

          return key;
        }
      }
    });
  }

  function insertMultiDragElements(clonesInserted, rootEl) {
    multiDragElements.forEach(function (multiDragElement, i) {
      var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(multiDragElement, target);
      } else {
        rootEl.appendChild(multiDragElement);
      }
    });
  }
  /**
   * Insert multi-drag clones
   * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
   * @param  {HTMLElement} rootEl
   */


  function insertMultiDragClones(elementsInserted, rootEl) {
    multiDragClones.forEach(function (clone, i) {
      var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(clone, target);
      } else {
        rootEl.appendChild(clone);
      }
    });
  }

  function removeMultiDragElements() {
    multiDragElements.forEach(function (multiDragElement) {
      if (multiDragElement === dragEl$1) return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }

  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  Sortable.mount(new SwapPlugin());
  Sortable.mount(new MultiDragPlugin());
  return Sortable;
});
});

var vuedraggable_umd_min = createCommonjsModule(function (module, exports) {
(function (t, n) {
   module.exports = n(Sortable) ;
})("undefined" !== typeof self ? self : commonjsGlobal, function (t) {
  return function (t) {
    var n = {};

    function e(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }

    return e.m = t, e.c = n, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: r
      });
    }, e.r = function (t) {
      "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, e.t = function (t, n) {
      if (1 & n && (t = e(t)), 8 & n) return t;
      if (4 & n && "object" === typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (e.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var o in t) e.d(r, o, function (n) {
        return t[n];
      }.bind(null, o));
      return r;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t["default"];
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "", e(e.s = "fb15");
  }({
    "02f4": function (t, n, e) {
      var r = e("4588"),
          o = e("be13");

      t.exports = function (t) {
        return function (n, e) {
          var i,
              u,
              c = String(o(n)),
              a = r(e),
              f = c.length;
          return a < 0 || a >= f ? t ? "" : void 0 : (i = c.charCodeAt(a), i < 55296 || i > 56319 || a + 1 === f || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : i : t ? c.slice(a, a + 2) : u - 56320 + (i - 55296 << 10) + 65536);
        };
      };
    },
    "0390": function (t, n, e) {

      var r = e("02f4")(!0);

      t.exports = function (t, n, e) {
        return n + (e ? r(t, n).length : 1);
      };
    },
    "07e3": function (t, n) {
      var e = {}.hasOwnProperty;

      t.exports = function (t, n) {
        return e.call(t, n);
      };
    },
    "0bfb": function (t, n, e) {

      var r = e("cb7c");

      t.exports = function () {
        var t = r(this),
            n = "";
        return t.global && (n += "g"), t.ignoreCase && (n += "i"), t.multiline && (n += "m"), t.unicode && (n += "u"), t.sticky && (n += "y"), n;
      };
    },
    "0fc9": function (t, n, e) {
      var r = e("3a38"),
          o = Math.max,
          i = Math.min;

      t.exports = function (t, n) {
        return t = r(t), t < 0 ? o(t + n, 0) : i(t, n);
      };
    },
    1654: function (t, n, e) {

      var r = e("71c1")(!0);
      e("30f1")(String, "String", function (t) {
        this._t = String(t), this._i = 0;
      }, function () {
        var t,
            n = this._t,
            e = this._i;
        return e >= n.length ? {
          value: void 0,
          done: !0
        } : (t = r(n, e), this._i += t.length, {
          value: t,
          done: !1
        });
      });
    },
    1691: function (t, n) {
      t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    },
    "1af6": function (t, n, e) {
      var r = e("63b6");
      r(r.S, "Array", {
        isArray: e("9003")
      });
    },
    "1bc3": function (t, n, e) {
      var r = e("f772");

      t.exports = function (t, n) {
        if (!r(t)) return t;
        var e, o;
        if (n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
        if ("function" == typeof (e = t.valueOf) && !r(o = e.call(t))) return o;
        if (!n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    "1ec9": function (t, n, e) {
      var r = e("f772"),
          o = e("e53d").document,
          i = r(o) && r(o.createElement);

      t.exports = function (t) {
        return i ? o.createElement(t) : {};
      };
    },
    "20fd": function (t, n, e) {

      var r = e("d9f6"),
          o = e("aebd");

      t.exports = function (t, n, e) {
        n in t ? r.f(t, n, o(0, e)) : t[n] = e;
      };
    },
    "214f": function (t, n, e) {

      e("b0c5");

      var r = e("2aba"),
          o = e("32e9"),
          i = e("79e5"),
          u = e("be13"),
          c = e("2b4c"),
          a = e("520a"),
          f = c("species"),
          s = !i(function () {
        var t = /./;
        return t.exec = function () {
          var t = [];
          return t.groups = {
            a: "7"
          }, t;
        }, "7" !== "".replace(t, "$<a>");
      }),
          l = function () {
        var t = /(?:)/,
            n = t.exec;

        t.exec = function () {
          return n.apply(this, arguments);
        };

        var e = "ab".split(t);
        return 2 === e.length && "a" === e[0] && "b" === e[1];
      }();

      t.exports = function (t, n, e) {
        var p = c(t),
            d = !i(function () {
          var n = {};
          return n[p] = function () {
            return 7;
          }, 7 != ""[t](n);
        }),
            v = d ? !i(function () {
          var n = !1,
              e = /a/;
          return e.exec = function () {
            return n = !0, null;
          }, "split" === t && (e.constructor = {}, e.constructor[f] = function () {
            return e;
          }), e[p](""), !n;
        }) : void 0;

        if (!d || !v || "replace" === t && !s || "split" === t && !l) {
          var h = /./[p],
              b = e(u, p, ""[t], function (t, n, e, r, o) {
            return n.exec === a ? d && !o ? {
              done: !0,
              value: h.call(n, e, r)
            } : {
              done: !0,
              value: t.call(e, n, r)
            } : {
              done: !1
            };
          }),
              g = b[0],
              y = b[1];
          r(String.prototype, t, g), o(RegExp.prototype, p, 2 == n ? function (t, n) {
            return y.call(t, this, n);
          } : function (t) {
            return y.call(t, this);
          });
        }
      };
    },
    "230e": function (t, n, e) {
      var r = e("d3f4"),
          o = e("7726").document,
          i = r(o) && r(o.createElement);

      t.exports = function (t) {
        return i ? o.createElement(t) : {};
      };
    },
    "23c6": function (t, n, e) {
      var r = e("2d95"),
          o = e("2b4c")("toStringTag"),
          i = "Arguments" == r(function () {
        return arguments;
      }()),
          u = function (t, n) {
        try {
          return t[n];
        } catch (e) {}
      };

      t.exports = function (t) {
        var n, e, c;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = u(n = Object(t), o)) ? e : i ? r(n) : "Object" == (c = r(n)) && "function" == typeof n.callee ? "Arguments" : c;
      };
    },
    "241e": function (t, n, e) {
      var r = e("25eb");

      t.exports = function (t) {
        return Object(r(t));
      };
    },
    "25eb": function (t, n) {
      t.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    },
    "294c": function (t, n) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (n) {
          return !0;
        }
      };
    },
    "2aba": function (t, n, e) {
      var r = e("7726"),
          o = e("32e9"),
          i = e("69a8"),
          u = e("ca5a")("src"),
          c = e("fa5b"),
          a = "toString",
          f = ("" + c).split(a);
      e("8378").inspectSource = function (t) {
        return c.call(t);
      }, (t.exports = function (t, n, e, c) {
        var a = "function" == typeof e;
        a && (i(e, "name") || o(e, "name", n)), t[n] !== e && (a && (i(e, u) || o(e, u, t[n] ? "" + t[n] : f.join(String(n)))), t === r ? t[n] = e : c ? t[n] ? t[n] = e : o(t, n, e) : (delete t[n], o(t, n, e)));
      })(Function.prototype, a, function () {
        return "function" == typeof this && this[u] || c.call(this);
      });
    },
    "2b4c": function (t, n, e) {
      var r = e("5537")("wks"),
          o = e("ca5a"),
          i = e("7726").Symbol,
          u = "function" == typeof i,
          c = t.exports = function (t) {
        return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t));
      };

      c.store = r;
    },
    "2d00": function (t, n) {
      t.exports = !1;
    },
    "2d95": function (t, n) {
      var e = {}.toString;

      t.exports = function (t) {
        return e.call(t).slice(8, -1);
      };
    },
    "2fdb": function (t, n, e) {

      var r = e("5ca1"),
          o = e("d2c8"),
          i = "includes";
      r(r.P + r.F * e("5147")(i), "String", {
        includes: function (t) {
          return !!~o(this, t, i).indexOf(t, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
    },
    "30f1": function (t, n, e) {

      var r = e("b8e3"),
          o = e("63b6"),
          i = e("9138"),
          u = e("35e8"),
          c = e("481b"),
          a = e("8f60"),
          f = e("45f2"),
          s = e("53e2"),
          l = e("5168")("iterator"),
          p = !([].keys && "next" in [].keys()),
          d = "@@iterator",
          v = "keys",
          h = "values",
          b = function () {
        return this;
      };

      t.exports = function (t, n, e, g, y, x, m) {
        a(e, n, g);

        var w,
            O,
            S,
            j = function (t) {
          if (!p && t in E) return E[t];

          switch (t) {
            case v:
              return function () {
                return new e(this, t);
              };

            case h:
              return function () {
                return new e(this, t);
              };
          }

          return function () {
            return new e(this, t);
          };
        },
            _ = n + " Iterator",
            M = y == h,
            T = !1,
            E = t.prototype,
            A = E[l] || E[d] || y && E[y],
            C = A || j(y),
            P = y ? M ? j("entries") : C : void 0,
            I = "Array" == n && E.entries || A;

        if (I && (S = s(I.call(new t())), S !== Object.prototype && S.next && (f(S, _, !0), r || "function" == typeof S[l] || u(S, l, b))), M && A && A.name !== h && (T = !0, C = function () {
          return A.call(this);
        }), r && !m || !p && !T && E[l] || u(E, l, C), c[n] = C, c[_] = b, y) if (w = {
          values: M ? C : j(h),
          keys: x ? C : j(v),
          entries: P
        }, m) for (O in w) O in E || i(E, O, w[O]);else o(o.P + o.F * (p || T), n, w);
        return w;
      };
    },
    "32a6": function (t, n, e) {
      var r = e("241e"),
          o = e("c3a1");
      e("ce7e")("keys", function () {
        return function (t) {
          return o(r(t));
        };
      });
    },
    "32e9": function (t, n, e) {
      var r = e("86cc"),
          o = e("4630");
      t.exports = e("9e1e") ? function (t, n, e) {
        return r.f(t, n, o(1, e));
      } : function (t, n, e) {
        return t[n] = e, t;
      };
    },
    "32fc": function (t, n, e) {
      var r = e("e53d").document;
      t.exports = r && r.documentElement;
    },
    "335c": function (t, n, e) {
      var r = e("6b4c");
      t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
        return "String" == r(t) ? t.split("") : Object(t);
      };
    },
    "355d": function (t, n) {
      n.f = {}.propertyIsEnumerable;
    },
    "35e8": function (t, n, e) {
      var r = e("d9f6"),
          o = e("aebd");
      t.exports = e("8e60") ? function (t, n, e) {
        return r.f(t, n, o(1, e));
      } : function (t, n, e) {
        return t[n] = e, t;
      };
    },
    "36c3": function (t, n, e) {
      var r = e("335c"),
          o = e("25eb");

      t.exports = function (t) {
        return r(o(t));
      };
    },
    3702: function (t, n, e) {
      var r = e("481b"),
          o = e("5168")("iterator"),
          i = Array.prototype;

      t.exports = function (t) {
        return void 0 !== t && (r.Array === t || i[o] === t);
      };
    },
    "3a38": function (t, n) {
      var e = Math.ceil,
          r = Math.floor;

      t.exports = function (t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t);
      };
    },
    "40c3": function (t, n, e) {
      var r = e("6b4c"),
          o = e("5168")("toStringTag"),
          i = "Arguments" == r(function () {
        return arguments;
      }()),
          u = function (t, n) {
        try {
          return t[n];
        } catch (e) {}
      };

      t.exports = function (t) {
        var n, e, c;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = u(n = Object(t), o)) ? e : i ? r(n) : "Object" == (c = r(n)) && "function" == typeof n.callee ? "Arguments" : c;
      };
    },
    4588: function (t, n) {
      var e = Math.ceil,
          r = Math.floor;

      t.exports = function (t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t);
      };
    },
    "45f2": function (t, n, e) {
      var r = e("d9f6").f,
          o = e("07e3"),
          i = e("5168")("toStringTag");

      t.exports = function (t, n, e) {
        t && !o(t = e ? t : t.prototype, i) && r(t, i, {
          configurable: !0,
          value: n
        });
      };
    },
    4630: function (t, n) {
      t.exports = function (t, n) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: n
        };
      };
    },
    "469f": function (t, n, e) {
      e("6c1c"), e("1654"), t.exports = e("7d7b");
    },
    "481b": function (t, n) {
      t.exports = {};
    },
    "4aa6": function (t, n, e) {
      t.exports = e("dc62");
    },
    "4bf8": function (t, n, e) {
      var r = e("be13");

      t.exports = function (t) {
        return Object(r(t));
      };
    },
    "4ee1": function (t, n, e) {
      var r = e("5168")("iterator"),
          o = !1;

      try {
        var i = [7][r]();
        i["return"] = function () {
          o = !0;
        }, Array.from(i, function () {
          throw 2;
        });
      } catch (u) {}

      t.exports = function (t, n) {
        if (!n && !o) return !1;
        var e = !1;

        try {
          var i = [7],
              c = i[r]();
          c.next = function () {
            return {
              done: e = !0
            };
          }, i[r] = function () {
            return c;
          }, t(i);
        } catch (u) {}

        return e;
      };
    },
    "50ed": function (t, n) {
      t.exports = function (t, n) {
        return {
          value: n,
          done: !!t
        };
      };
    },
    5147: function (t, n, e) {
      var r = e("2b4c")("match");

      t.exports = function (t) {
        var n = /./;

        try {
          "/./"[t](n);
        } catch (e) {
          try {
            return n[r] = !1, !"/./"[t](n);
          } catch (o) {}
        }

        return !0;
      };
    },
    5168: function (t, n, e) {
      var r = e("dbdb")("wks"),
          o = e("62a0"),
          i = e("e53d").Symbol,
          u = "function" == typeof i,
          c = t.exports = function (t) {
        return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t));
      };

      c.store = r;
    },
    5176: function (t, n, e) {
      t.exports = e("51b6");
    },
    "51b6": function (t, n, e) {
      e("a3c3"), t.exports = e("584a").Object.assign;
    },
    "520a": function (t, n, e) {

      var r = e("0bfb"),
          o = RegExp.prototype.exec,
          i = String.prototype.replace,
          u = o,
          c = "lastIndex",
          a = function () {
        var t = /a/,
            n = /b*/g;
        return o.call(t, "a"), o.call(n, "a"), 0 !== t[c] || 0 !== n[c];
      }(),
          f = void 0 !== /()??/.exec("")[1],
          s = a || f;

      s && (u = function (t) {
        var n,
            e,
            u,
            s,
            l = this;
        return f && (e = new RegExp("^" + l.source + "$(?!\\s)", r.call(l))), a && (n = l[c]), u = o.call(l, t), a && u && (l[c] = l.global ? u.index + u[0].length : n), f && u && u.length > 1 && i.call(u[0], e, function () {
          for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (u[s] = void 0);
        }), u;
      }), t.exports = u;
    },
    "53e2": function (t, n, e) {
      var r = e("07e3"),
          o = e("241e"),
          i = e("5559")("IE_PROTO"),
          u = Object.prototype;

      t.exports = Object.getPrototypeOf || function (t) {
        return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
      };
    },
    "549b": function (t, n, e) {

      var r = e("d864"),
          o = e("63b6"),
          i = e("241e"),
          u = e("b0dc"),
          c = e("3702"),
          a = e("b447"),
          f = e("20fd"),
          s = e("7cd6");
      o(o.S + o.F * !e("4ee1")(function (t) {
      }), "Array", {
        from: function (t) {
          var n,
              e,
              o,
              l,
              p = i(t),
              d = "function" == typeof this ? this : Array,
              v = arguments.length,
              h = v > 1 ? arguments[1] : void 0,
              b = void 0 !== h,
              g = 0,
              y = s(p);
          if (b && (h = r(h, v > 2 ? arguments[2] : void 0, 2)), void 0 == y || d == Array && c(y)) for (n = a(p.length), e = new d(n); n > g; g++) f(e, g, b ? h(p[g], g) : p[g]);else for (l = y.call(p), e = new d(); !(o = l.next()).done; g++) f(e, g, b ? u(l, h, [o.value, g], !0) : o.value);
          return e.length = g, e;
        }
      });
    },
    "54a1": function (t, n, e) {
      e("6c1c"), e("1654"), t.exports = e("95d5");
    },
    5537: function (t, n, e) {
      var r = e("8378"),
          o = e("7726"),
          i = "__core-js_shared__",
          u = o[i] || (o[i] = {});
      (t.exports = function (t, n) {
        return u[t] || (u[t] = void 0 !== n ? n : {});
      })("versions", []).push({
        version: r.version,
        mode: e("2d00") ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
      });
    },
    5559: function (t, n, e) {
      var r = e("dbdb")("keys"),
          o = e("62a0");

      t.exports = function (t) {
        return r[t] || (r[t] = o(t));
      };
    },
    "584a": function (t, n) {
      var e = t.exports = {
        version: "2.6.5"
      };
      "number" == typeof __e && (__e = e);
    },
    "5b4e": function (t, n, e) {
      var r = e("36c3"),
          o = e("b447"),
          i = e("0fc9");

      t.exports = function (t) {
        return function (n, e, u) {
          var c,
              a = r(n),
              f = o(a.length),
              s = i(u, f);

          if (t && e != e) {
            while (f > s) if (c = a[s++], c != c) return !0;
          } else for (; f > s; s++) if ((t || s in a) && a[s] === e) return t || s || 0;

          return !t && -1;
        };
      };
    },
    "5ca1": function (t, n, e) {
      var r = e("7726"),
          o = e("8378"),
          i = e("32e9"),
          u = e("2aba"),
          c = e("9b43"),
          a = "prototype",
          f = function (t, n, e) {
        var s,
            l,
            p,
            d,
            v = t & f.F,
            h = t & f.G,
            b = t & f.S,
            g = t & f.P,
            y = t & f.B,
            x = h ? r : b ? r[n] || (r[n] = {}) : (r[n] || {})[a],
            m = h ? o : o[n] || (o[n] = {}),
            w = m[a] || (m[a] = {});

        for (s in h && (e = n), e) l = !v && x && void 0 !== x[s], p = (l ? x : e)[s], d = y && l ? c(p, r) : g && "function" == typeof p ? c(Function.call, p) : p, x && u(x, s, p, t & f.U), m[s] != p && i(m, s, d), g && w[s] != p && (w[s] = p);
      };

      r.core = o, f.F = 1, f.G = 2, f.S = 4, f.P = 8, f.B = 16, f.W = 32, f.U = 64, f.R = 128, t.exports = f;
    },
    "5d73": function (t, n, e) {
      t.exports = e("469f");
    },
    "5f1b": function (t, n, e) {

      var r = e("23c6"),
          o = RegExp.prototype.exec;

      t.exports = function (t, n) {
        var e = t.exec;

        if ("function" === typeof e) {
          var i = e.call(t, n);
          if ("object" !== typeof i) throw new TypeError("RegExp exec method returned something other than an Object or null");
          return i;
        }

        if ("RegExp" !== r(t)) throw new TypeError("RegExp#exec called on incompatible receiver");
        return o.call(t, n);
      };
    },
    "626a": function (t, n, e) {
      var r = e("2d95");
      t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
        return "String" == r(t) ? t.split("") : Object(t);
      };
    },
    "62a0": function (t, n) {
      var e = 0,
          r = Math.random();

      t.exports = function (t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36));
      };
    },
    "63b6": function (t, n, e) {
      var r = e("e53d"),
          o = e("584a"),
          i = e("d864"),
          u = e("35e8"),
          c = e("07e3"),
          a = "prototype",
          f = function (t, n, e) {
        var s,
            l,
            p,
            d = t & f.F,
            v = t & f.G,
            h = t & f.S,
            b = t & f.P,
            g = t & f.B,
            y = t & f.W,
            x = v ? o : o[n] || (o[n] = {}),
            m = x[a],
            w = v ? r : h ? r[n] : (r[n] || {})[a];

        for (s in v && (e = n), e) l = !d && w && void 0 !== w[s], l && c(x, s) || (p = l ? w[s] : e[s], x[s] = v && "function" != typeof w[s] ? e[s] : g && l ? i(p, r) : y && w[s] == p ? function (t) {
          var n = function (n, e, r) {
            if (this instanceof t) {
              switch (arguments.length) {
                case 0:
                  return new t();

                case 1:
                  return new t(n);

                case 2:
                  return new t(n, e);
              }

              return new t(n, e, r);
            }

            return t.apply(this, arguments);
          };

          return n[a] = t[a], n;
        }(p) : b && "function" == typeof p ? i(Function.call, p) : p, b && ((x.virtual || (x.virtual = {}))[s] = p, t & f.R && m && !m[s] && u(m, s, p)));
      };

      f.F = 1, f.G = 2, f.S = 4, f.P = 8, f.B = 16, f.W = 32, f.U = 64, f.R = 128, t.exports = f;
    },
    6762: function (t, n, e) {

      var r = e("5ca1"),
          o = e("c366")(!0);
      r(r.P, "Array", {
        includes: function (t) {
          return o(this, t, arguments.length > 1 ? arguments[1] : void 0);
        }
      }), e("9c6c")("includes");
    },
    6821: function (t, n, e) {
      var r = e("626a"),
          o = e("be13");

      t.exports = function (t) {
        return r(o(t));
      };
    },
    "69a8": function (t, n) {
      var e = {}.hasOwnProperty;

      t.exports = function (t, n) {
        return e.call(t, n);
      };
    },
    "6a99": function (t, n, e) {
      var r = e("d3f4");

      t.exports = function (t, n) {
        if (!r(t)) return t;
        var e, o;
        if (n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
        if ("function" == typeof (e = t.valueOf) && !r(o = e.call(t))) return o;
        if (!n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    "6b4c": function (t, n) {
      var e = {}.toString;

      t.exports = function (t) {
        return e.call(t).slice(8, -1);
      };
    },
    "6c1c": function (t, n, e) {
      e("c367");

      for (var r = e("e53d"), o = e("35e8"), i = e("481b"), u = e("5168")("toStringTag"), c = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), a = 0; a < c.length; a++) {
        var f = c[a],
            s = r[f],
            l = s && s.prototype;
        l && !l[u] && o(l, u, f), i[f] = i.Array;
      }
    },
    "71c1": function (t, n, e) {
      var r = e("3a38"),
          o = e("25eb");

      t.exports = function (t) {
        return function (n, e) {
          var i,
              u,
              c = String(o(n)),
              a = r(e),
              f = c.length;
          return a < 0 || a >= f ? t ? "" : void 0 : (i = c.charCodeAt(a), i < 55296 || i > 56319 || a + 1 === f || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : i : t ? c.slice(a, a + 2) : u - 56320 + (i - 55296 << 10) + 65536);
        };
      };
    },
    7726: function (t, n) {
      var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = e);
    },
    "774e": function (t, n, e) {
      t.exports = e("d2d5");
    },
    "77f1": function (t, n, e) {
      var r = e("4588"),
          o = Math.max,
          i = Math.min;

      t.exports = function (t, n) {
        return t = r(t), t < 0 ? o(t + n, 0) : i(t, n);
      };
    },
    "794b": function (t, n, e) {
      t.exports = !e("8e60") && !e("294c")(function () {
        return 7 != Object.defineProperty(e("1ec9")("div"), "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    },
    "79aa": function (t, n) {
      t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
      };
    },
    "79e5": function (t, n) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (n) {
          return !0;
        }
      };
    },
    "7cd6": function (t, n, e) {
      var r = e("40c3"),
          o = e("5168")("iterator"),
          i = e("481b");

      t.exports = e("584a").getIteratorMethod = function (t) {
        if (void 0 != t) return t[o] || t["@@iterator"] || i[r(t)];
      };
    },
    "7d7b": function (t, n, e) {
      var r = e("e4ae"),
          o = e("7cd6");

      t.exports = e("584a").getIterator = function (t) {
        var n = o(t);
        if ("function" != typeof n) throw TypeError(t + " is not iterable!");
        return r(n.call(t));
      };
    },
    "7e90": function (t, n, e) {
      var r = e("d9f6"),
          o = e("e4ae"),
          i = e("c3a1");
      t.exports = e("8e60") ? Object.defineProperties : function (t, n) {
        o(t);
        var e,
            u = i(n),
            c = u.length,
            a = 0;

        while (c > a) r.f(t, e = u[a++], n[e]);

        return t;
      };
    },
    8378: function (t, n) {
      var e = t.exports = {
        version: "2.6.5"
      };
      "number" == typeof __e && (__e = e);
    },
    8436: function (t, n) {
      t.exports = function () {};
    },
    "86cc": function (t, n, e) {
      var r = e("cb7c"),
          o = e("c69a"),
          i = e("6a99"),
          u = Object.defineProperty;
      n.f = e("9e1e") ? Object.defineProperty : function (t, n, e) {
        if (r(t), n = i(n, !0), r(e), o) try {
          return u(t, n, e);
        } catch (c) {}
        if ("get" in e || "set" in e) throw TypeError("Accessors not supported!");
        return "value" in e && (t[n] = e.value), t;
      };
    },
    "8aae": function (t, n, e) {
      e("32a6"), t.exports = e("584a").Object.keys;
    },
    "8e60": function (t, n, e) {
      t.exports = !e("294c")(function () {
        return 7 != Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    },
    "8f60": function (t, n, e) {

      var r = e("a159"),
          o = e("aebd"),
          i = e("45f2"),
          u = {};
      e("35e8")(u, e("5168")("iterator"), function () {
        return this;
      }), t.exports = function (t, n, e) {
        t.prototype = r(u, {
          next: o(1, e)
        }), i(t, n + " Iterator");
      };
    },
    9003: function (t, n, e) {
      var r = e("6b4c");

      t.exports = Array.isArray || function (t) {
        return "Array" == r(t);
      };
    },
    9138: function (t, n, e) {
      t.exports = e("35e8");
    },
    9306: function (t, n, e) {

      var r = e("c3a1"),
          o = e("9aa9"),
          i = e("355d"),
          u = e("241e"),
          c = e("335c"),
          a = Object.assign;
      t.exports = !a || e("294c")(function () {
        var t = {},
            n = {},
            e = Symbol(),
            r = "abcdefghijklmnopqrst";
        return t[e] = 7, r.split("").forEach(function (t) {
          n[t] = t;
        }), 7 != a({}, t)[e] || Object.keys(a({}, n)).join("") != r;
      }) ? function (t, n) {
        var e = u(t),
            a = arguments.length,
            f = 1,
            s = o.f,
            l = i.f;

        while (a > f) {
          var p,
              d = c(arguments[f++]),
              v = s ? r(d).concat(s(d)) : r(d),
              h = v.length,
              b = 0;

          while (h > b) l.call(d, p = v[b++]) && (e[p] = d[p]);
        }

        return e;
      } : a;
    },
    9427: function (t, n, e) {
      var r = e("63b6");
      r(r.S, "Object", {
        create: e("a159")
      });
    },
    "95d5": function (t, n, e) {
      var r = e("40c3"),
          o = e("5168")("iterator"),
          i = e("481b");

      t.exports = e("584a").isIterable = function (t) {
        var n = Object(t);
        return void 0 !== n[o] || "@@iterator" in n || i.hasOwnProperty(r(n));
      };
    },
    "9aa9": function (t, n) {
      n.f = Object.getOwnPropertySymbols;
    },
    "9b43": function (t, n, e) {
      var r = e("d8e8");

      t.exports = function (t, n, e) {
        if (r(t), void 0 === n) return t;

        switch (e) {
          case 1:
            return function (e) {
              return t.call(n, e);
            };

          case 2:
            return function (e, r) {
              return t.call(n, e, r);
            };

          case 3:
            return function (e, r, o) {
              return t.call(n, e, r, o);
            };
        }

        return function () {
          return t.apply(n, arguments);
        };
      };
    },
    "9c6c": function (t, n, e) {
      var r = e("2b4c")("unscopables"),
          o = Array.prototype;
      void 0 == o[r] && e("32e9")(o, r, {}), t.exports = function (t) {
        o[r][t] = !0;
      };
    },
    "9def": function (t, n, e) {
      var r = e("4588"),
          o = Math.min;

      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    "9e1e": function (t, n, e) {
      t.exports = !e("79e5")(function () {
        return 7 != Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    },
    a159: function (t, n, e) {
      var r = e("e4ae"),
          o = e("7e90"),
          i = e("1691"),
          u = e("5559")("IE_PROTO"),
          c = function () {},
          a = "prototype",
          f = function () {
        var t,
            n = e("1ec9")("iframe"),
            r = i.length,
            o = "<",
            u = ">";
        n.style.display = "none", e("32fc").appendChild(n), n.src = "javascript:", t = n.contentWindow.document, t.open(), t.write(o + "script" + u + "document.F=Object" + o + "/script" + u), t.close(), f = t.F;

        while (r--) delete f[a][i[r]];

        return f();
      };

      t.exports = Object.create || function (t, n) {
        var e;
        return null !== t ? (c[a] = r(t), e = new c(), c[a] = null, e[u] = t) : e = f(), void 0 === n ? e : o(e, n);
      };
    },
    a352: function (n, e) {
      n.exports = t;
    },
    a3c3: function (t, n, e) {
      var r = e("63b6");
      r(r.S + r.F, "Object", {
        assign: e("9306")
      });
    },
    a481: function (t, n, e) {

      var r = e("cb7c"),
          o = e("4bf8"),
          i = e("9def"),
          u = e("4588"),
          c = e("0390"),
          a = e("5f1b"),
          f = Math.max,
          s = Math.min,
          l = Math.floor,
          p = /\$([$&`']|\d\d?|<[^>]*>)/g,
          d = /\$([$&`']|\d\d?)/g,
          v = function (t) {
        return void 0 === t ? t : String(t);
      };

      e("214f")("replace", 2, function (t, n, e, h) {
        return [function (r, o) {
          var i = t(this),
              u = void 0 == r ? void 0 : r[n];
          return void 0 !== u ? u.call(r, i, o) : e.call(String(i), r, o);
        }, function (t, n) {
          var o = h(e, t, this, n);
          if (o.done) return o.value;
          var l = r(t),
              p = String(this),
              d = "function" === typeof n;
          d || (n = String(n));
          var g = l.global;

          if (g) {
            var y = l.unicode;
            l.lastIndex = 0;
          }

          var x = [];

          while (1) {
            var m = a(l, p);
            if (null === m) break;
            if (x.push(m), !g) break;
            var w = String(m[0]);
            "" === w && (l.lastIndex = c(p, i(l.lastIndex), y));
          }

          for (var O = "", S = 0, j = 0; j < x.length; j++) {
            m = x[j];

            for (var _ = String(m[0]), M = f(s(u(m.index), p.length), 0), T = [], E = 1; E < m.length; E++) T.push(v(m[E]));

            var A = m.groups;

            if (d) {
              var C = [_].concat(T, M, p);
              void 0 !== A && C.push(A);
              var P = String(n.apply(void 0, C));
            } else P = b(_, p, M, T, A, n);

            M >= S && (O += p.slice(S, M) + P, S = M + _.length);
          }

          return O + p.slice(S);
        }];

        function b(t, n, r, i, u, c) {
          var a = r + t.length,
              f = i.length,
              s = d;
          return void 0 !== u && (u = o(u), s = p), e.call(c, s, function (e, o) {
            var c;

            switch (o.charAt(0)) {
              case "$":
                return "$";

              case "&":
                return t;

              case "`":
                return n.slice(0, r);

              case "'":
                return n.slice(a);

              case "<":
                c = u[o.slice(1, -1)];
                break;

              default:
                var s = +o;
                if (0 === s) return e;

                if (s > f) {
                  var p = l(s / 10);
                  return 0 === p ? e : p <= f ? void 0 === i[p - 1] ? o.charAt(1) : i[p - 1] + o.charAt(1) : e;
                }

                c = i[s - 1];
            }

            return void 0 === c ? "" : c;
          });
        }
      });
    },
    a4bb: function (t, n, e) {
      t.exports = e("8aae");
    },
    a745: function (t, n, e) {
      t.exports = e("f410");
    },
    aae3: function (t, n, e) {
      var r = e("d3f4"),
          o = e("2d95"),
          i = e("2b4c")("match");

      t.exports = function (t) {
        var n;
        return r(t) && (void 0 !== (n = t[i]) ? !!n : "RegExp" == o(t));
      };
    },
    aebd: function (t, n) {
      t.exports = function (t, n) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: n
        };
      };
    },
    b0c5: function (t, n, e) {

      var r = e("520a");
      e("5ca1")({
        target: "RegExp",
        proto: !0,
        forced: r !== /./.exec
      }, {
        exec: r
      });
    },
    b0dc: function (t, n, e) {
      var r = e("e4ae");

      t.exports = function (t, n, e, o) {
        try {
          return o ? n(r(e)[0], e[1]) : n(e);
        } catch (u) {
          var i = t["return"];
          throw void 0 !== i && r(i.call(t)), u;
        }
      };
    },
    b447: function (t, n, e) {
      var r = e("3a38"),
          o = Math.min;

      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    b8e3: function (t, n) {
      t.exports = !0;
    },
    be13: function (t, n) {
      t.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    },
    c366: function (t, n, e) {
      var r = e("6821"),
          o = e("9def"),
          i = e("77f1");

      t.exports = function (t) {
        return function (n, e, u) {
          var c,
              a = r(n),
              f = o(a.length),
              s = i(u, f);

          if (t && e != e) {
            while (f > s) if (c = a[s++], c != c) return !0;
          } else for (; f > s; s++) if ((t || s in a) && a[s] === e) return t || s || 0;

          return !t && -1;
        };
      };
    },
    c367: function (t, n, e) {

      var r = e("8436"),
          o = e("50ed"),
          i = e("481b"),
          u = e("36c3");
      t.exports = e("30f1")(Array, "Array", function (t, n) {
        this._t = u(t), this._i = 0, this._k = n;
      }, function () {
        var t = this._t,
            n = this._k,
            e = this._i++;
        return !t || e >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == n ? e : "values" == n ? t[e] : [e, t[e]]);
      }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
    },
    c3a1: function (t, n, e) {
      var r = e("e6f3"),
          o = e("1691");

      t.exports = Object.keys || function (t) {
        return r(t, o);
      };
    },
    c649: function (t, n, e) {

      (function (t) {
        e.d(n, "c", function () {
          return l;
        }), e.d(n, "a", function () {
          return f;
        }), e.d(n, "b", function () {
          return u;
        }), e.d(n, "d", function () {
          return s;
        });
        e("a481");
        var r = e("4aa6"),
            o = e.n(r);

        function i() {
          return "undefined" !== typeof window ? window.console : t.console;
        }

        var u = i();

        function c(t) {
          var n = o()(null);
          return function (e) {
            var r = n[e];
            return r || (n[e] = t(e));
          };
        }

        var a = /-(\w)/g,
            f = c(function (t) {
          return t.replace(a, function (t, n) {
            return n ? n.toUpperCase() : "";
          });
        });

        function s(t) {
          null !== t.parentElement && t.parentElement.removeChild(t);
        }

        function l(t, n, e) {
          var r = 0 === e ? t.children[0] : t.children[e - 1].nextSibling;
          t.insertBefore(n, r);
        }
      }).call(this, e("c8ba"));
    },
    c69a: function (t, n, e) {
      t.exports = !e("9e1e") && !e("79e5")(function () {
        return 7 != Object.defineProperty(e("230e")("div"), "a", {
          get: function () {
            return 7;
          }
        }).a;
      });
    },
    c8ba: function (t, n) {
      var e;

      e = function () {
        return this;
      }();

      try {
        e = e || new Function("return this")();
      } catch (r) {
        "object" === typeof window && (e = window);
      }

      t.exports = e;
    },
    c8bb: function (t, n, e) {
      t.exports = e("54a1");
    },
    ca5a: function (t, n) {
      var e = 0,
          r = Math.random();

      t.exports = function (t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36));
      };
    },
    cb7c: function (t, n, e) {
      var r = e("d3f4");

      t.exports = function (t) {
        if (!r(t)) throw TypeError(t + " is not an object!");
        return t;
      };
    },
    ce7e: function (t, n, e) {
      var r = e("63b6"),
          o = e("584a"),
          i = e("294c");

      t.exports = function (t, n) {
        var e = (o.Object || {})[t] || Object[t],
            u = {};
        u[t] = n(e), r(r.S + r.F * i(function () {
          e(1);
        }), "Object", u);
      };
    },
    d2c8: function (t, n, e) {
      var r = e("aae3"),
          o = e("be13");

      t.exports = function (t, n, e) {
        if (r(n)) throw TypeError("String#" + e + " doesn't accept regex!");
        return String(o(t));
      };
    },
    d2d5: function (t, n, e) {
      e("1654"), e("549b"), t.exports = e("584a").Array.from;
    },
    d3f4: function (t, n) {
      t.exports = function (t) {
        return "object" === typeof t ? null !== t : "function" === typeof t;
      };
    },
    d864: function (t, n, e) {
      var r = e("79aa");

      t.exports = function (t, n, e) {
        if (r(t), void 0 === n) return t;

        switch (e) {
          case 1:
            return function (e) {
              return t.call(n, e);
            };

          case 2:
            return function (e, r) {
              return t.call(n, e, r);
            };

          case 3:
            return function (e, r, o) {
              return t.call(n, e, r, o);
            };
        }

        return function () {
          return t.apply(n, arguments);
        };
      };
    },
    d8e8: function (t, n) {
      t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
      };
    },
    d9f6: function (t, n, e) {
      var r = e("e4ae"),
          o = e("794b"),
          i = e("1bc3"),
          u = Object.defineProperty;
      n.f = e("8e60") ? Object.defineProperty : function (t, n, e) {
        if (r(t), n = i(n, !0), r(e), o) try {
          return u(t, n, e);
        } catch (c) {}
        if ("get" in e || "set" in e) throw TypeError("Accessors not supported!");
        return "value" in e && (t[n] = e.value), t;
      };
    },
    dbdb: function (t, n, e) {
      var r = e("584a"),
          o = e("e53d"),
          i = "__core-js_shared__",
          u = o[i] || (o[i] = {});
      (t.exports = function (t, n) {
        return u[t] || (u[t] = void 0 !== n ? n : {});
      })("versions", []).push({
        version: r.version,
        mode: e("b8e3") ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
      });
    },
    dc62: function (t, n, e) {
      e("9427");
      var r = e("584a").Object;

      t.exports = function (t, n) {
        return r.create(t, n);
      };
    },
    e4ae: function (t, n, e) {
      var r = e("f772");

      t.exports = function (t) {
        if (!r(t)) throw TypeError(t + " is not an object!");
        return t;
      };
    },
    e53d: function (t, n) {
      var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = e);
    },
    e6f3: function (t, n, e) {
      var r = e("07e3"),
          o = e("36c3"),
          i = e("5b4e")(!1),
          u = e("5559")("IE_PROTO");

      t.exports = function (t, n) {
        var e,
            c = o(t),
            a = 0,
            f = [];

        for (e in c) e != u && r(c, e) && f.push(e);

        while (n.length > a) r(c, e = n[a++]) && (~i(f, e) || f.push(e));

        return f;
      };
    },
    f410: function (t, n, e) {
      e("1af6"), t.exports = e("584a").Array.isArray;
    },
    f559: function (t, n, e) {

      var r = e("5ca1"),
          o = e("9def"),
          i = e("d2c8"),
          u = "startsWith",
          c = ""[u];
      r(r.P + r.F * e("5147")(u), "String", {
        startsWith: function (t) {
          var n = i(this, t, u),
              e = o(Math.min(arguments.length > 1 ? arguments[1] : void 0, n.length)),
              r = String(t);
          return c ? c.call(n, r, e) : n.slice(e, e + r.length) === r;
        }
      });
    },
    f772: function (t, n) {
      t.exports = function (t) {
        return "object" === typeof t ? null !== t : "function" === typeof t;
      };
    },
    fa5b: function (t, n, e) {
      t.exports = e("5537")("native-function-to-string", Function.toString);
    },
    fb15: function (t, n, e) {

      var r;
      (e.r(n), "undefined" !== typeof window) && (r = window.document.currentScript) && (r = r.src.match(/(.+\/)[^\/]+\.js(\?.*)?$/)) && (e.p = r[1]);
      var o = e("5176"),
          i = e.n(o),
          u = (e("f559"), e("a4bb")),
          c = e.n(u),
          a = e("a745"),
          f = e.n(a);

      function s(t) {
        if (f()(t)) return t;
      }

      var l = e("5d73"),
          p = e.n(l);

      function d(t, n) {
        var e = [],
            r = !0,
            o = !1,
            i = void 0;

        try {
          for (var u, c = p()(t); !(r = (u = c.next()).done); r = !0) if (e.push(u.value), n && e.length === n) break;
        } catch (a) {
          o = !0, i = a;
        } finally {
          try {
            r || null == c["return"] || c["return"]();
          } finally {
            if (o) throw i;
          }
        }

        return e;
      }

      function v() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }

      function h(t, n) {
        return s(t) || d(t, n) || v();
      }

      e("6762"), e("2fdb");

      function b(t) {
        if (f()(t)) {
          for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];

          return e;
        }
      }

      var g = e("774e"),
          y = e.n(g),
          x = e("c8bb"),
          m = e.n(x);

      function w(t) {
        if (m()(Object(t)) || "[object Arguments]" === Object.prototype.toString.call(t)) return y()(t);
      }

      function O() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }

      function S(t) {
        return b(t) || w(t) || O();
      }

      var j = e("a352"),
          _ = e.n(j),
          M = e("c649");

      function T(t, n, e) {
        return void 0 === e ? t : (t = t || {}, t[n] = e, t);
      }

      function E(t, n) {
        return t.map(function (t) {
          return t.elm;
        }).indexOf(n);
      }

      function A(t, n, e, r) {
        if (!t) return [];
        var o = t.map(function (t) {
          return t.elm;
        }),
            i = n.length - r,
            u = S(n).map(function (t, n) {
          return n >= i ? o.length : o.indexOf(t);
        });
        return e ? u.filter(function (t) {
          return -1 !== t;
        }) : u;
      }

      function C(t, n) {
        var e = this;
        this.$nextTick(function () {
          return e.$emit(t.toLowerCase(), n);
        });
      }

      function P(t) {
        var n = this;
        return function (e) {
          null !== n.realList && n["onDrag" + t](e), C.call(n, t, e);
        };
      }

      function I(t) {
        return ["transition-group", "TransitionGroup"].includes(t);
      }

      function L(t) {
        if (!t || 1 !== t.length) return !1;
        var n = h(t, 1),
            e = n[0].componentOptions;
        return !!e && I(e.tag);
      }

      function $(t, n, e) {
        return t[e] || (n[e] ? n[e]() : void 0);
      }

      function F(t, n, e) {
        var r = 0,
            o = 0,
            i = $(n, e, "header");
        i && (r = i.length, t = t ? [].concat(S(i), S(t)) : S(i));
        var u = $(n, e, "footer");
        return u && (o = u.length, t = t ? [].concat(S(t), S(u)) : S(u)), {
          children: t,
          headerOffset: r,
          footerOffset: o
        };
      }

      function k(t, n) {
        var e = null,
            r = function (t, n) {
          e = T(e, t, n);
        },
            o = c()(t).filter(function (t) {
          return "id" === t || t.startsWith("data-");
        }).reduce(function (n, e) {
          return n[e] = t[e], n;
        }, {});

        if (r("attrs", o), !n) return e;
        var u = n.on,
            a = n.props,
            f = n.attrs;
        return r("on", u), r("props", a), i()(e.attrs, f), e;
      }

      var D = ["Start", "Add", "Remove", "Update", "End"],
          R = ["Choose", "Unchoose", "Sort", "Filter", "Clone"],
          V = ["Move"].concat(D, R).map(function (t) {
        return "on" + t;
      }),
          N = null,
          U = {
        options: Object,
        list: {
          type: Array,
          required: !1,
          default: null
        },
        value: {
          type: Array,
          required: !1,
          default: null
        },
        noTransitionOnDrag: {
          type: Boolean,
          default: !1
        },
        clone: {
          type: Function,
          default: function (t) {
            return t;
          }
        },
        element: {
          type: String,
          default: "div"
        },
        tag: {
          type: String,
          default: null
        },
        move: {
          type: Function,
          default: null
        },
        componentData: {
          type: Object,
          required: !1,
          default: null
        }
      },
          G = {
        name: "draggable",
        inheritAttrs: !1,
        props: U,
        data: function () {
          return {
            transitionMode: !1,
            noneFunctionalComponentMode: !1
          };
        },
        render: function (t) {
          var n = this.$slots.default;
          this.transitionMode = L(n);
          var e = F(n, this.$slots, this.$scopedSlots),
              r = e.children,
              o = e.headerOffset,
              i = e.footerOffset;
          this.headerOffset = o, this.footerOffset = i;
          var u = k(this.$attrs, this.componentData);
          return t(this.getTag(), u, r);
        },
        created: function () {
          null !== this.list && null !== this.value && M["b"].error("Value and list props are mutually exclusive! Please set one or another."), "div" !== this.element && M["b"].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props"), void 0 !== this.options && M["b"].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
        },
        mounted: function () {
          var t = this;
          if (this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional(), this.noneFunctionalComponentMode && this.transitionMode) throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
          var n = {};
          D.forEach(function (e) {
            n["on" + e] = P.call(t, e);
          }), R.forEach(function (e) {
            n["on" + e] = C.bind(t, e);
          });
          var e = c()(this.$attrs).reduce(function (n, e) {
            return n[Object(M["a"])(e)] = t.$attrs[e], n;
          }, {}),
              r = i()({}, this.options, e, n, {
            onMove: function (n, e) {
              return t.onDragMove(n, e);
            }
          });
          !("draggable" in r) && (r.draggable = ">*"), this._sortable = new _.a(this.rootContainer, r), this.computeIndexes();
        },
        beforeDestroy: function () {
          void 0 !== this._sortable && this._sortable.destroy();
        },
        computed: {
          rootContainer: function () {
            return this.transitionMode ? this.$el.children[0] : this.$el;
          },
          realList: function () {
            return this.list ? this.list : this.value;
          }
        },
        watch: {
          options: {
            handler: function (t) {
              this.updateOptions(t);
            },
            deep: !0
          },
          $attrs: {
            handler: function (t) {
              this.updateOptions(t);
            },
            deep: !0
          },
          realList: function () {
            this.computeIndexes();
          }
        },
        methods: {
          getIsFunctional: function () {
            var t = this._vnode.fnOptions;
            return t && t.functional;
          },
          getTag: function () {
            return this.tag || this.element;
          },
          updateOptions: function (t) {
            for (var n in t) {
              var e = Object(M["a"])(n);
              -1 === V.indexOf(e) && this._sortable.option(e, t[n]);
            }
          },
          getChildrenNodes: function () {
            if (this.noneFunctionalComponentMode) return this.$children[0].$slots.default;
            var t = this.$slots.default;
            return this.transitionMode ? t[0].child.$slots.default : t;
          },
          computeIndexes: function () {
            var t = this;
            this.$nextTick(function () {
              t.visibleIndexes = A(t.getChildrenNodes(), t.rootContainer.children, t.transitionMode, t.footerOffset);
            });
          },
          getUnderlyingVm: function (t) {
            var n = E(this.getChildrenNodes() || [], t);
            if (-1 === n) return null;
            var e = this.realList[n];
            return {
              index: n,
              element: e
            };
          },
          getUnderlyingPotencialDraggableComponent: function (t) {
            var n = t.__vue__;
            return n && n.$options && I(n.$options._componentTag) ? n.$parent : !("realList" in n) && 1 === n.$children.length && "realList" in n.$children[0] ? n.$children[0] : n;
          },
          emitChanges: function (t) {
            var n = this;
            this.$nextTick(function () {
              n.$emit("change", t);
            });
          },
          alterList: function (t) {
            if (this.list) t(this.list);else {
              var n = S(this.value);
              t(n), this.$emit("input", n);
            }
          },
          spliceList: function () {
            var t = arguments,
                n = function (n) {
              return n.splice.apply(n, S(t));
            };

            this.alterList(n);
          },
          updatePosition: function (t, n) {
            var e = function (e) {
              return e.splice(n, 0, e.splice(t, 1)[0]);
            };

            this.alterList(e);
          },
          getRelatedContextFromMoveEvent: function (t) {
            var n = t.to,
                e = t.related,
                r = this.getUnderlyingPotencialDraggableComponent(n);
            if (!r) return {
              component: r
            };
            var o = r.realList,
                u = {
              list: o,
              component: r
            };

            if (n !== e && o && r.getUnderlyingVm) {
              var c = r.getUnderlyingVm(e);
              if (c) return i()(c, u);
            }

            return u;
          },
          getVmIndex: function (t) {
            var n = this.visibleIndexes,
                e = n.length;
            return t > e - 1 ? e : n[t];
          },
          getComponent: function () {
            return this.$slots.default[0].componentInstance;
          },
          resetTransitionData: function (t) {
            if (this.noTransitionOnDrag && this.transitionMode) {
              var n = this.getChildrenNodes();
              n[t].data = null;
              var e = this.getComponent();
              e.children = [], e.kept = void 0;
            }
          },
          onDragStart: function (t) {
            this.context = this.getUnderlyingVm(t.item), t.item._underlying_vm_ = this.clone(this.context.element), N = t.item;
          },
          onDragAdd: function (t) {
            var n = t.item._underlying_vm_;

            if (void 0 !== n) {
              Object(M["d"])(t.item);
              var e = this.getVmIndex(t.newIndex);
              this.spliceList(e, 0, n), this.computeIndexes();
              var r = {
                element: n,
                newIndex: e
              };
              this.emitChanges({
                added: r
              });
            }
          },
          onDragRemove: function (t) {
            if (Object(M["c"])(this.rootContainer, t.item, t.oldIndex), "clone" !== t.pullMode) {
              var n = this.context.index;
              this.spliceList(n, 1);
              var e = {
                element: this.context.element,
                oldIndex: n
              };
              this.resetTransitionData(n), this.emitChanges({
                removed: e
              });
            } else Object(M["d"])(t.clone);
          },
          onDragUpdate: function (t) {
            Object(M["d"])(t.item), Object(M["c"])(t.from, t.item, t.oldIndex);
            var n = this.context.index,
                e = this.getVmIndex(t.newIndex);
            this.updatePosition(n, e);
            var r = {
              element: this.context.element,
              oldIndex: n,
              newIndex: e
            };
            this.emitChanges({
              moved: r
            });
          },
          updateProperty: function (t, n) {
            t.hasOwnProperty(n) && (t[n] += this.headerOffset);
          },
          computeFutureIndex: function (t, n) {
            if (!t.element) return 0;
            var e = S(n.to.children).filter(function (t) {
              return "none" !== t.style["display"];
            }),
                r = e.indexOf(n.related),
                o = t.component.getVmIndex(r),
                i = -1 !== e.indexOf(N);
            return i || !n.willInsertAfter ? o : o + 1;
          },
          onDragMove: function (t, n) {
            var e = this.move;
            if (!e || !this.realList) return !0;
            var r = this.getRelatedContextFromMoveEvent(t),
                o = this.context,
                u = this.computeFutureIndex(r, t);
            i()(o, {
              futureIndex: u
            });
            var c = i()({}, t, {
              relatedContext: r,
              draggedContext: o
            });
            return e(c, n);
          },
          onDragEnd: function () {
            this.computeIndexes(), N = null;
          }
        }
      };
      "undefined" !== typeof window && "Vue" in window && window.Vue.component("draggable", G);
      var q = G;
      n["default"] = q;
    }
  })["default"];
});
});

var Draggable = unwrapExports(vuedraggable_umd_min);

var dist = createCommonjsModule(function (module, exports) {
/*!
 * vue-virtual-scroll-list v2.0.2
 * open source under the MIT license
 * https://github.com/tangbc/vue-virtual-scroll-list#readme
 */
(function (global, factory) {
   module.exports = factory(Vue) ;
})(commonjsGlobal, function (Vue) {

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }
  /**
   * virtual list core calculating center.
   */


  var DIRECTION_TYPE = {
    FRONT: 'FRONT',
    // scroll up or left.
    BEHIND: 'BEHIND' // scroll down or right.

  };
  var CALC_TYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var LEADING_BUFFER = 2;

  var Virtual = /*#__PURE__*/function () {
    function Virtual(param, updateHook) {
      _classCallCheck(this, Virtual);

      this.init(param, updateHook);
    }

    _createClass(Virtual, [{
      key: "init",
      value: function init(param, updateHook) {
        // param data.
        this.param = param;
        this.updateHook = updateHook; // size data.

        this.sizes = new Map();
        this.firstRangeTotalSize = 0;
        this.firstRangeAverageSize = 0;
        this.lastCalcIndex = 0;
        this.fixedSizeValue = 0;
        this.calcType = CALC_TYPE.INIT; // scroll data.

        this.offset = 0;
        this.direction = ''; // range data.

        this.range = Object.create(null);

        if (this.param) {
          this.checkRange(0, param.keeps - 1);
        } // benchmark test data.
        // this.__bsearchCalls = 0
        // this.__getIndexOffsetCalls = 0

      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.init(null, null);
      } // return actually render range.

    }, {
      key: "getRange",
      value: function getRange() {
        var range = Object.create(null);
        range.start = this.range.start;
        range.end = this.range.end;
        range.padFront = this.range.padFront;
        range.padBehind = this.range.padBehind;
        return range;
      }
    }, {
      key: "isBehind",
      value: function isBehind() {
        return this.direction === DIRECTION_TYPE.BEHIND;
      }
    }, {
      key: "isFront",
      value: function isFront() {
        return this.direction === DIRECTION_TYPE.FRONT;
      } // return start index offset.

    }, {
      key: "getOffset",
      value: function getOffset(start) {
        return this.getIndexOffset(start);
      }
    }, {
      key: "updateParam",
      value: function updateParam(key, value) {
        if (this.param && key in this.param) {
          this.param[key] = value;
        }
      } // save each size map by id.

    }, {
      key: "saveSize",
      value: function saveSize(id, size) {
        this.sizes.set(id, size); // we assume size type is fixed at the beginning and remember first size value
        // if there is no size value different from this at next comming saving
        // we think it's a fixed size list, otherwise is dynamic size list.

        if (this.calcType === CALC_TYPE.INIT) {
          this.fixedSizeValue = size;
          this.calcType = CALC_TYPE.FIXED;
        } else if (this.calcType === CALC_TYPE.FIXED && this.fixedSizeValue !== size) {
          this.calcType = CALC_TYPE.DYNAMIC; // it's no use at all.

          delete this.fixedSizeValue;
        } // calculate the average size only in the first range.


        if (this.sizes.size <= this.param.keeps) {
          this.firstRangeTotalSize = this.firstRangeTotalSize + size;
          this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize / this.sizes.size);
        } else {
          // it's done using.
          delete this.firstRangeTotalSize;
        }
      } // in some special situation (e.g. length change) we need to update in a row
      // try goiong to render next range by a leading buffer according to current direction.

    }, {
      key: "handleDataSourcesChange",
      value: function handleDataSourcesChange() {
        var start = this.range.start;

        if (this.isFront()) {
          start = start - LEADING_BUFFER;
        } else if (this.isBehind()) {
          start = start + LEADING_BUFFER;
        }

        start = Math.max(start, 0);
        this.updateRange(this.range.start, this.getEndByStart(start));
      } // when slot size change, we also need force update.

    }, {
      key: "handleSlotSizeChange",
      value: function handleSlotSizeChange() {
        this.handleDataSourcesChange();
      } // calculating range on scroll.

    }, {
      key: "handleScroll",
      value: function handleScroll(offset) {
        this.direction = offset < this.offset ? DIRECTION_TYPE.FRONT : DIRECTION_TYPE.BEHIND;
        this.offset = offset;

        if (this.direction === DIRECTION_TYPE.FRONT) {
          this.handleFront();
        } else if (this.direction === DIRECTION_TYPE.BEHIND) {
          this.handleBehind();
        }
      } // ----------- public method end. -----------

    }, {
      key: "handleFront",
      value: function handleFront() {
        var overs = this.getScrollOvers(); // should not change range if start doesn't exceed overs.

        if (overs > this.range.start) {
          return;
        } // move up start by a buffer length, and make sure its safety.


        var start = Math.max(overs - this.param.buffer, 0);
        this.checkRange(start, this.getEndByStart(start));
      }
    }, {
      key: "handleBehind",
      value: function handleBehind() {
        var overs = this.getScrollOvers(); // range should not change if scroll overs within buffer.

        if (overs < this.range.start + this.param.buffer) {
          return;
        }

        this.checkRange(overs, this.getEndByStart(overs));
      } // return the pass over numbers at current scroll offset.

    }, {
      key: "getScrollOvers",
      value: function getScrollOvers() {
        // if slot header exist, we need subtract its size.
        var offset = this.offset - this.param.slotHeaderSize;

        if (offset <= 0) {
          return 0;
        } // if this list is fixed size, that can be easily.


        if (this.isFixedType()) {
          return Math.floor(offset / this.fixedSizeValue);
        }

        var low = 0;
        var middle = 0;
        var middleOffset = 0;
        var high = this.param.uniqueIds.length;

        while (low <= high) {
          // this.__bsearchCalls++
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getIndexOffset(middle);

          if (middleOffset === offset) {
            return middle;
          } else if (middleOffset < offset) {
            low = middle + 1;
          } else if (middleOffset > offset) {
            high = middle - 1;
          }
        }

        return low > 0 ? --low : 0;
      } // return a scroll offset from given index, can efficiency be improved more here?
      // although the call frequency is very high, its only a superposition of numbers.

    }, {
      key: "getIndexOffset",
      value: function getIndexOffset(givenIndex) {
        // we know this.
        if (!givenIndex) {
          return 0;
        }

        var offset = 0;
        var indexSize = 0;

        for (var index = 0; index < givenIndex; index++) {
          // this.__getIndexOffsetCalls++
          indexSize = this.sizes.get(this.param.uniqueIds[index]);
          offset = offset + (indexSize || this.getEstimateSize());
        } // remember last calculate index.


        this.lastCalcIndex = Math.max(this.lastCalcIndex, givenIndex - 1);
        this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex());
        return offset;
      }
    }, {
      key: "isFixedType",
      value: function isFixedType() {
        return this.calcType === CALC_TYPE.FIXED;
      } // return the real last index.

    }, {
      key: "getLastIndex",
      value: function getLastIndex() {
        return this.param.uniqueIds.length - 1;
      } // in some conditions range will break, we need check and correct it
      // and then decide whether need update to next range.

    }, {
      key: "checkRange",
      value: function checkRange(start, end) {
        var keeps = this.param.keeps;
        var total = this.param.uniqueIds.length; // datas less than keeps, render all.

        if (total <= keeps) {
          start = 0;
          end = this.getLastIndex();
        } else if (end - start < keeps - 1) {
          // if range length is less than keeps, corrent it base on end.
          start = end - keeps + 1;
        }

        if (this.range.start !== start) {
          this.updateRange(start, end);
        }
      } // call updating to a new range and rerender.

    }, {
      key: "updateRange",
      value: function updateRange(start, end) {
        this.range.start = start;
        this.range.end = end;
        this.range.padFront = this.getPadFront();
        this.range.padBehind = this.getPadBehind();
        this.updateHook(this.getRange());
      } // return end base on start when going to a new range.

    }, {
      key: "getEndByStart",
      value: function getEndByStart(start) {
        var theoryEnd = start + this.param.keeps - 1;
        var truelyEnd = Math.min(theoryEnd, this.getLastIndex());
        return truelyEnd;
      } // return total front offset.

    }, {
      key: "getPadFront",
      value: function getPadFront() {
        if (this.isFixedType()) {
          return this.fixedSizeValue * this.range.start;
        } else {
          return this.getIndexOffset(this.range.start);
        }
      } // return total behind offset.
      // for better performance, use estimated value if a not calculated.

    }, {
      key: "getPadBehind",
      value: function getPadBehind() {
        var end = this.range.end;
        var lastIndex = this.getLastIndex();

        if (this.isFixedType()) {
          return (lastIndex - end) * this.fixedSizeValue;
        } // if calculated all already, return the exactly offset.


        if (this.lastCalcIndex === lastIndex) {
          return this.getIndexOffset(lastIndex) - this.getIndexOffset(end);
        } else {
          // if not, return a estimate offset.
          return (lastIndex - end) * this.getEstimateSize();
        }
      } // get estimate size for one item, get from param.size at first range.

    }, {
      key: "getEstimateSize",
      value: function getEstimateSize() {
        return this.firstRangeAverageSize || this.param.size;
      }
    }]);

    return Virtual;
  }();
  /**
   * props declaration for default, item and slot component.
   */


  var VirtualProps = {
    size: {
      type: Number
    },
    keeps: {
      type: Number,
      require: true
    },
    dataKey: {
      type: String,
      require: true
    },
    dataSources: {
      type: Array,
      require: true
    },
    dataComponent: {
      type: Object,
      require: true
    },
    extraProps: {
      type: Object
    },
    rootTag: {
      type: String,
      "default": 'div'
    },
    wrapTag: {
      type: String,
      "default": 'div'
    },
    wrapClass: {
      type: String,
      "default": ''
    },
    direction: {
      type: String,
      "default": 'vertical' // the other value is horizontal.

    },
    upperThreshold: {
      type: Number,
      "default": 0
    },
    lowerThreshold: {
      type: Number,
      "default": 0
    },
    start: {
      type: Number,
      "default": 0
    },
    offset: {
      type: Number,
      "default": 0
    },
    itemTag: {
      type: String,
      "default": 'div'
    },
    itemClass: {
      type: String,
      "default": ''
    },
    headerTag: {
      type: String,
      "default": 'div'
    },
    headerClass: {
      type: String,
      "default": ''
    },
    footerTag: {
      type: String,
      "default": 'div'
    },
    footerClass: {
      type: String,
      "default": ''
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  };
  var ItemProps = {
    event: {
      type: String
    },
    tag: {
      type: String
    },
    horizontal: {
      type: Boolean
    },
    source: {
      type: Object
    },
    component: {
      type: Object
    },
    uniqueKey: {
      type: String
    },
    extraProps: {
      type: Object
    }
  };
  var SlotProps = {
    event: {
      type: String
    },
    uniqueKey: {
      type: String
    },
    tag: {
      type: String
    },
    horizontal: {
      type: Boolean
    }
  };
  var Wrapper = {
    created: function created() {
      this.hasInitial = false;
      this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight';
    },
    mounted: function mounted() {
      var _this = this; // dispatch once at initial.


      this.dispatchSizeChange();

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(function () {
          // dispatch when size changed.
          if (_this.hasInitial) {
            _this.dispatchSizeChange();
          } else {
            _this.hasInitial = true;
          }
        });
        this.resizeObserver.observe(this.$el);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },
    methods: {
      getCurrentSize: function getCurrentSize() {
        return this.$el ? this.$el[this.shapeKey] : 0;
      },
      // tell parent current size identify by unqiue key.
      dispatchSizeChange: function dispatchSizeChange() {
        this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
      }
    }
  }; // wrapping for item.

  var Item = Vue.component('virtual-list-item', {
    mixins: [Wrapper],
    props: ItemProps,
    render: function render(h) {
      return h(this.tag, {
        role: 'item'
      }, [h(this.component, {
        props: _objectSpread2({}, this.extraProps, {
          source: this.source
        })
      })]);
    }
  }); // wrapping for slot.

  var Slot = Vue.component('virtual-list-slot', {
    mixins: [Wrapper],
    props: SlotProps,
    render: function render(h) {
      return h(this.tag, {
        attrs: {
          role: this.uniqueKey
        }
      }, this.$slots["default"]);
    }
  });
  /**
   * virtual list default component.
   */

  var EVENT_TYPE = {
    ITEM: 'item_resize',
    SLOT: 'slot_resize'
  };
  var SLOT_TYPE = {
    HEADER: 'header',
    // string value also use for aria role attribute.
    FOOTER: 'footer'
  };
  var NAME = 'virtual-list';
  var VirtualList = Vue.component(NAME, {
    props: VirtualProps,
    data: function data() {
      return {
        range: null
      };
    },
    watch: {
      dataSources: function dataSources(newValue, oldValue) {
        if (newValue.length !== oldValue.length) {
          this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources());
          this.virtual.handleDataSourcesChange();
        }
      }
    },
    created: function created() {
      this.isHorizontal = this.direction === 'horizontal';
      this.directionKey = this.isHorizontal ? 'scrollLeft' : 'scrollTop';
      this.virtual = new Virtual({
        size: this.size,
        // also could be a estimate value.
        slotHeaderSize: 0,
        slotFooterSize: 0,
        keeps: this.keeps,
        buffer: Math.round(this.keeps / 3),
        // recommend for a third of keeps.
        uniqueIds: this.getUniqueIdFromDataSources()
      }, this.onRangeChanged); // just for debug
      // window.virtual = this.virtual
      // also need sync initial range first.

      this.range = this.virtual.getRange(); // listen item size changing.

      this.$on(EVENT_TYPE.ITEM, this.onItemResized); // listen slot size changing.

      if (this.$slots.header || this.$slots.footer) {
        this.$on(EVENT_TYPE.SLOT, this.onSlotResized);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.virtual.destroy();
    },
    mounted: function mounted() {
      // set position.
      if (this.start) {
        this.setScrollOffset(this.virtual.getOffset(this.start));
      } else if (this.offset) {
        this.setScrollOffset(this.offset);
      }
    },
    methods: {
      // event called when every item mounted or size changed.
      onItemResized: function onItemResized(id, size) {
        this.virtual.saveSize(id, size);
      },
      // event called when slot mounted or size changed.
      onSlotResized: function onSlotResized(type, size, hasInit) {
        if (type === SLOT_TYPE.HEADER) {
          this.virtual.updateParam('slotHeaderSize', size);
        } else if (type === SLOT_TYPE.FOOTER) {
          this.virtual.updateParam('slotFooterSize', size);
        }

        if (hasInit) {
          this.virtual.handleSlotSizeChange();
        }
      },
      // here is the rerendering entry.
      onRangeChanged: function onRangeChanged(range) {
        this.range = range;
      },
      onScroll: function onScroll(evt) {
        var root = this.$refs.root;

        if (!root) {
          return;
        }

        var offset = root[this.directionKey];
        this.virtual.handleScroll(offset);
        this.emitEvent(offset, evt);
      },
      getUniqueIdFromDataSources: function getUniqueIdFromDataSources() {
        var _this = this;

        return this.dataSources.map(function (dataSource) {
          return dataSource[_this.dataKey];
        });
      },
      // set current scroll position to a expectant offset.
      setScrollOffset: function setScrollOffset(offset) {
        var root = this.$refs.root;

        if (root) {
          root[this.directionKey] = offset || 0;
        }
      },
      // emit event in special position.
      emitEvent: function emitEvent(offset, evt) {
        // ref element is definitely available here.
        var root = this.$refs.root;
        var range = this.virtual.getRange();
        var isFront = this.virtual.isFront();
        var isBehind = this.virtual.isBehind();
        var offsetShape = root[this.isHorizontal ? 'clientWidth' : 'clientHeight'];
        var scrollShape = root[this.isHorizontal ? 'scrollWidth' : 'scrollHeight'];

        if (isFront && !!this.dataSources.length && offset - this.upperThreshold <= 0) {
          this.$emit('totop', evt, range);
        } else if (isBehind && offset + offsetShape + this.lowerThreshold >= scrollShape) {
          this.$emit('tobottom', evt, range);
        } else {
          this.$emit('scroll', evt, range);
        }
      },
      // get the real render slots based on range data.
      getRenderSlots: function getRenderSlots(h) {
        var slots = [];
        var start = this.disabled ? 0 : this.range.start;
        var end = this.disabled ? this.dataSources.length - 1 : this.range.end;

        for (var index = start; index <= end; index++) {
          var dataSource = this.dataSources[index];

          if (dataSource) {
            slots.push(h(Item, {
              "class": this.itemClass,
              props: {
                tag: this.itemTag,
                event: EVENT_TYPE.ITEM,
                horizontal: this.isHorizontal,
                uniqueKey: dataSource[this.dataKey],
                source: dataSource,
                extraProps: this.extraProps,
                component: this.dataComponent
              }
            }));
          } else {
            console.warn("[".concat(NAME, "]: cannot get the index ").concat(index, " from data-sources."));
          }
        }

        return slots;
      }
    },
    // render function, a closer-to-the-compiler alternative to templates.
    // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
    render: function render(h) {
      var _this$$slots = this.$slots,
          header = _this$$slots.header,
          footer = _this$$slots.footer;
      var padding = this.disabled ? 0 : this.isHorizontal ? "0px ".concat(this.range.padBehind, "px 0px ").concat(this.range.padFront, "px") : "".concat(this.range.padFront, "px 0px ").concat(this.range.padBehind, "px");
      return h(this.rootTag, {
        ref: 'root',
        on: {
          '&scroll': this.onScroll
        }
      }, [// header slot.
      header ? h(Slot, {
        "class": this.headerClass,
        props: {
          tag: this.headerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.HEADER
        }
      }, header) : null, // main list.
      h(this.wrapTag, {
        "class": this.wrapClass,
        attrs: {
          role: 'group'
        },
        style: {
          padding: padding
        }
      }, this.getRenderSlots(h)), // footer slot.
      footer ? h(Slot, {
        "class": this.footerClass,
        props: {
          tag: this.footerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.FOOTER
        }
      }, footer) : null]);
    }
  });
  return VirtualList;
});
});

/**
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
} // The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.


function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}

function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;

function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}

function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this; // proxy to actual vm


    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];

function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/** vue-property-decorator verson 8.4.1 MIT LICENSE copyright 2019 kaorun343 */
/** Used for keying reactive provide/inject properties */

var reactiveInjectKey = '__reactiveInject__';
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */

function Inject(options) {
  return createDecorator(function (componentOptions, key) {
    if (typeof componentOptions.inject === 'undefined') {
      componentOptions.inject = {};
    }

    if (!Array.isArray(componentOptions.inject)) {
      componentOptions.inject[key] = options || key;
    }
  });
}

function produceProvide(original) {
  var provide = function () {
    var _this = this;

    var rv = typeof original === 'function' ? original.call(this) : original;
    rv = Object.create(rv || null); // set reactive services (propagates previous services if necessary)

    rv[reactiveInjectKey] = this[reactiveInjectKey] || {};

    for (var i in provide.managed) {
      rv[provide.managed[i]] = this[i];
    }

    var _loop_1 = function (i) {
      rv[provide.managedReactive[i]] = this_1[i]; // Duplicates the behavior of `@Provide`

      if (!rv[reactiveInjectKey].hasOwnProperty(provide.managedReactive[i])) {
        Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i], {
          enumerable: true,
          get: function () {
            return _this[i];
          }
        });
      }
    };

    var this_1 = this;

    for (var i in provide.managedReactive) {
      _loop_1(i);
    }

    return rv;
  };

  provide.managed = {};
  provide.managedReactive = {};
  return provide;
}

function needToProduceProvide(original) {
  return typeof original !== 'function' || !original.managed && !original.managedReactive;
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */


function Provide(key) {
  return createDecorator(function (componentOptions, k) {
    var provide = componentOptions.provide;

    if (needToProduceProvide(provide)) {
      provide = componentOptions.provide = produceProvide(provide);
    }

    provide.managed[k] = key || k;
  });
}
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */

var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';

function applyMetadata(options, target, key) {
  if (reflectMetadataIsSupported) {
    if (!Array.isArray(options) && typeof options !== 'function' && typeof options.type === 'undefined') {
      var type = Reflect.getMetadata('design:type', target, key);

      if (type !== Object) {
        options.type = type;
      }
    }
  }
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */

function Prop(options) {
  if (options === void 0) {
    options = {};
  }

  return function (target, key) {
    applyMetadata(options, target, key);
    createDecorator(function (componentOptions, k) {
      (componentOptions.props || (componentOptions.props = {}))[k] = options;
    })(target, key);
  };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */

function Watch(path, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.deep,
      deep = _a === void 0 ? false : _a,
      _b = options.immediate,
      immediate = _b === void 0 ? false : _b;
  return createDecorator(function (componentOptions, handler) {
    if (typeof componentOptions.watch !== 'object') {
      componentOptions.watch = Object.create(null);
    }

    var watch = componentOptions.watch;

    if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]];
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = [];
    }

    watch[path].push({
      handler: handler,
      deep: deep,
      immediate: immediate
    });
  });
} // Code copied from Vue/src/shared/util.js

/**
 * props declaration for default, item and slot component.
 */
const ItemProps = {
    event: {
        type: String,
    },
    tag: {
        type: String,
    },
    horizontal: {
        type: Boolean,
    },
    source: {
        type: Object,
    },
    component: {
        type: Object,
    },
    uniqueKey: {
        type: String,
    },
    extraProps: {
        type: Object,
    },
};
const SlotProps = {
    event: {
        type: String,
    },
    uniqueKey: {
        type: String,
    },
    tag: {
        type: String,
    },
    horizontal: {
        type: Boolean,
    },
};

//@ts-nocheck
const Wrapper = {
    created() {
        this.hasInitial = false;
        this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight';
    },
    mounted() {
        // dispatch once at initial.
        this.dispatchSizeChange();
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                // dispatch when size changed.
                if (this.hasInitial) {
                    this.dispatchSizeChange();
                }
                else {
                    this.hasInitial = true;
                }
            });
            this.resizeObserver.observe(this.$el);
        }
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    },
    methods: {
        getCurrentSize() {
            return this.$el ? this.$el[this.shapeKey] : 0;
        },
        // tell parent current size identify by unqiue key.
        dispatchSizeChange() {
            this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
        },
    },
};
// wrapping for item.
const Item = Vue.component('virtual-list-item', {
    mixins: [Wrapper],
    props: ItemProps,
    render(h) {
        return h(this.tag, {
            role: 'item',
        }, [
            h(this.component, {
                props: {
                    ...this.extraProps,
                    source: this.source,
                },
            }),
        ]);
    },
});
// wrapping for slot.
const Slot = Vue.component('virtual-list-slot', {
    mixins: [Wrapper],
    props: SlotProps,
    render(h) {
        return h(this.tag, {
            attrs: {
                role: this.uniqueKey,
            },
        }, this.$slots.default);
    },
});

var Level;
(function (Level) {
    Level[Level["DEBUG"] = 10] = "DEBUG";
    Level[Level["INFO"] = 20] = "INFO";
    Level[Level["WARNING"] = 30] = "WARNING";
    Level[Level["ERROR"] = 40] = "ERROR";
    Level[Level["CRITICAL"] = 50] = "CRITICAL";
})(Level || (Level = {}));
const NAME = 'vdvsl';
class Logger {
    constructor({ out, level }) {
        this.out = window.console;
        this.level = Level.DEBUG;
        this.out = out;
        this.level = level;
    }
    debug(...args) {
        if (Level.DEBUG < this.level) {
            return;
        }
        this.out.log.apply(this.out, this.withPrefix(args));
    }
    info(...args) {
        if (Level.INFO < this.level) {
            return;
        }
        this.out.log.apply(this.out, this.withPrefix(args));
    }
    warning(...args) {
        if (Level.WARNING < this.level) {
            return;
        }
        this.out.warn.apply(this.out, this.withPrefix(args));
    }
    error(...args) {
        if (Level.ERROR < this.level) {
            return;
        }
        this.out.error.apply(this.out, this.withPrefix(args));
    }
    critical(...args) {
        if (Level.CRITICAL < this.level) {
            return;
        }
        this.out.error.apply(this.out, this.withPrefix(args));
    }
    withPrefix(args) {
        return [`[${NAME}] `].concat(args);
    }
}
var logger = new Logger({
    out: window.console,
    level: 
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    process && process.env && "production" === 'development'
        ? Level.DEBUG
        : Level.ERROR,
});

const instructionNames = ['moved', 'added', 'removed'];
// This class is responsible for ensuring Draggable policies.
class DraggablePolicy {
    constructor(dataKey, dataSources, visibleRange) {
        this.dataKey = dataKey;
        this.dataSources = dataSources;
        this.visibleRange = visibleRange;
    }
    // Find the real item from item.
    findRealItem(item) {
        const idx = this.dataSources.findIndex((x) => x[this.dataKey] === item[this.dataKey]);
        return this.dataSources[this.visibleRange.start + idx];
    }
    // Returns a new list which is created based on
    // the update `instruction`.
    updatedSources(instruction, draggingRealIndex) {
        const newList = [...this.dataSources];
        if ('moved' in instruction) {
            const { newIndex } = instruction.moved;
            const start = this.visibleRange.start + newIndex;
            const deleteCount = 0;
            const item = newList.splice(draggingRealIndex, 1)[0];
            logger.debug(`Move by splicing start: ${start},` +
                ` deleteCount: ${deleteCount}, item:`, item);
            newList.splice(start, deleteCount, item);
        }
        else if ('added' in instruction) {
            const { newIndex, element } = instruction.added;
            const start = this.visibleRange.start + newIndex;
            const deleteCount = 0;
            const item = element;
            logger.debug(`Add by splicing start: ${start},` +
                ` deleteCount: ${deleteCount}, item:`, item);
            newList.splice(start, deleteCount, item);
        }
        else if ('removed' in instruction) {
            const { oldIndex } = instruction.removed;
            const start = this.visibleRange.start + oldIndex;
            const deleteCount = 1;
            logger.debug(`Remove by splicing start: ${start},` + ` deleteCount: ${deleteCount}`);
            newList.splice(start, deleteCount);
        }
        return newList;
    }
}

class VirtualScrollListPolicy {
    constructor() {
        this._draggingVNode = null;
    }
    get draggingVNode() {
        return this._draggingVNode;
    }
    get draggingIndex() {
        return this._draggingIndex;
    }
    get draggingRealIndex() {
        return this._draggingRealIndex;
    }
    onDragStart(e, range, slots) {
        this._draggingIndex = e.oldIndex;
        this._draggingRealIndex = range.start + e.oldIndex;
        this._draggingVNode = slots[e.oldIndex];
    }
    onDragEnd() {
        this._draggingVNode = null;
    }
}

var SortableEvents;
(function (SortableEvents) {
    SortableEvents[SortableEvents["start"] = 0] = "start";
    SortableEvents[SortableEvents["add"] = 1] = "add";
    SortableEvents[SortableEvents["remove"] = 2] = "remove";
    SortableEvents[SortableEvents["update"] = 3] = "update";
    SortableEvents[SortableEvents["end"] = 4] = "end";
    SortableEvents[SortableEvents["choose"] = 5] = "choose";
    SortableEvents[SortableEvents["unchoose"] = 6] = "unchoose";
    SortableEvents[SortableEvents["sort"] = 7] = "sort";
    SortableEvents[SortableEvents["filter"] = 8] = "filter";
    SortableEvents[SortableEvents["clone"] = 9] = "clone";
})(SortableEvents || (SortableEvents = {}));
const sortableEvents = Object.values(SortableEvents).filter((x) => typeof x === 'string');
function sortableEventHandlers(context) {
    return sortableEvents.reduce((acc, eventName) => ({
        ...acc,
        [eventName]: context.$emit.bind(context, eventName),
    }), {});
}
const EVENT_TYPE = {
    ITEM: 'item_resize',
    SLOT: 'slot_resize',
};
const SLOT_TYPE = {
    HEADER: 'header',
    FOOTER: 'footer',
};
// A fuctory function which will return DraggableVirtualList constructor.
function createBroker(VirtualList) {
    let Broker = class Broker extends VirtualList {
        constructor() {
            super(...arguments);
            this.vlsPolicy = new VirtualScrollListPolicy();
        }
        onDataSourcesChanged(newValue, oldValue) {
            if (newValue.length !== oldValue.length) {
                this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources());
                this.virtual.handleDataSourcesChange();
            }
        }
        _dataAdaptCondition(dataSource) {
            if (!this.itemHidden)
                return true;
            return !this.itemHidden(dataSource);
        }
        _getRenderSlots(h) {
            const slots = [];
            const start = this.disabled ? 0 : this.range.start;
            const end = this.disabled || this.range.end > this.dataSources.length
                ? this.dataSources.length - 1
                : this.range.end;
            const sliceCount = end - start + 1;
            let index = start;
            let activeSlotCount = 0;
            while (index <= this.dataSources.length - 1 &&
                activeSlotCount < sliceCount) {
                const dataSource = this.dataSources[index];
                if (dataSource) {
                    if (this._dataAdaptCondition(dataSource))
                        activeSlotCount++;
                    slots.push(h(Item, {
                        class: typeof this.itemClass === 'function'
                            ? this.itemClass(dataSource)
                            : this.itemClass,
                        props: {
                            tag: this.itemTag,
                            event: EVENT_TYPE.ITEM,
                            horizontal: this.isHorizontal,
                            uniqueKey: dataSource[this.dataKey],
                            source: dataSource,
                            extraProps: this.extraProps,
                            component: this.dataComponent,
                        },
                    }));
                }
                index++;
            }
            return slots;
        }
        getRenderSlots(h) {
            const { Draggable, DraggablePolicy } = this;
            const slots = this._getRenderSlots(h);
            const draggablePolicy = new DraggablePolicy(this.dataKey, this.dataSources, this.range);
            if (this.vlsPolicy.draggingVNode) {
                // ドラッグ中の要素を vls に差し込む
                slots.splice(this.vlsPolicy.draggingIndex, 1, this.vlsPolicy.draggingVNode);
            }
            return [
                h(Draggable, {
                    props: {
                        value: this.dataSources,
                        // policy will find the real item from x.
                        clone: (x) => draggablePolicy.findRealItem(x),
                    },
                    on: {
                        // Convert Draggable's change events to input events.
                        change: (e) => {
                            if (instructionNames.some((n) => n in e)) {
                                this.$emit('input', draggablePolicy.updatedSources(e, this.vlsPolicy.draggingRealIndex));
                            }
                        },
                        // Propagate Sortable events.
                        ...sortableEventHandlers(this),
                        start: (e) => {
                            this.vlsPolicy.onDragStart(e, this.range, slots);
                            this.$emit('start', e);
                        },
                        end: (e) => {
                            this.vlsPolicy.onDragEnd();
                            this.$emit('end', e);
                        },
                    },
                    attrs: this.$attrs,
                }, slots),
            ];
        }
        _calcPadding() {
            if (this.disabled)
                return 0;
            if (this.isHorizontal)
                return `0px ${this.range.padBehind}px 0px ${this.range.padFront}px`;
            if (this.disableComputeMargin)
                return 0;
            return `${this.range.padFront}px 0px ${this.range.padBehind}px`;
        }
        render(h) {
            const { header, footer } = this.$slots;
            const padding = this._calcPadding();
            return h(this.rootTag, {
                ref: 'root',
                on: {
                    '&scroll': this.onScroll,
                },
            }, [
                // header slot.
                header
                    ? h(Slot, {
                        class: this.headerClass,
                        props: {
                            tag: this.headerTag,
                            event: EVENT_TYPE.SLOT,
                            uniqueKey: SLOT_TYPE.HEADER,
                        },
                    }, header)
                    : null,
                // main list.
                h(this.wrapTag, {
                    class: this.wrapClass,
                    attrs: {
                        role: 'group',
                    },
                    style: {
                        padding: padding,
                    },
                }, this.getRenderSlots(h)),
                // footer slot.
                footer
                    ? h(Slot, {
                        class: this.footerClass,
                        props: {
                            tag: this.footerTag,
                            event: EVENT_TYPE.SLOT,
                            uniqueKey: SLOT_TYPE.FOOTER,
                        },
                    }, footer)
                    : null,
            ]);
        }
    };
    __decorate([
        Prop()
    ], Broker.prototype, "size", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "keeps", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "dataKey", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "dataSources", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "dataComponent", void 0);
    __decorate([
        Prop({ default: '' })
    ], Broker.prototype, "itemClass", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "disabled", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "itemHidden", void 0);
    __decorate([
        Prop({ default: 'div' })
    ], Broker.prototype, "itemTag", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "extraProps", void 0);
    __decorate([
        Prop()
    ], Broker.prototype, "disableComputeMargin", void 0);
    __decorate([
        Inject()
    ], Broker.prototype, "Draggable", void 0);
    __decorate([
        Inject()
    ], Broker.prototype, "DraggablePolicy", void 0);
    __decorate([
        Watch('dataSources')
    ], Broker.prototype, "onDataSourcesChanged", null);
    Broker = __decorate([
        Component
    ], Broker);
    return Broker;
}
// Returns handlers which propagate sortable's events.

const Broker = createBroker(dist);
// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
let DraggableVirtualList = class DraggableVirtualList extends Vue {
    constructor() {
        super(...arguments);
        this.Draggable = Draggable;
        this.DraggablePolicy = DraggablePolicy;
    }
    render(h) {
        return h(Broker, {
            props: this.$props,
            attrs: this.$attrs,
            on: {
                // Propagate VirtualList's input event.
                input: this.$emit.bind(this, 'input'),
                // Propagate draggable.sortable's events.
                ...sortableEventHandlers(this),
            },
        });
    }
};
__decorate([
    Prop()
], DraggableVirtualList.prototype, "value", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "size", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "keeps", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "dataKey", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "dataSources", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "dataComponent", void 0);
__decorate([
    Prop({ default: '' })
], DraggableVirtualList.prototype, "itemClass", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "disabled", void 0);
__decorate([
    Provide()
], DraggableVirtualList.prototype, "Draggable", void 0);
__decorate([
    Provide()
], DraggableVirtualList.prototype, "DraggablePolicy", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "itemHidden", void 0);
__decorate([
    Prop({ default: 'div' })
], DraggableVirtualList.prototype, "itemTag", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "extraProps", void 0);
__decorate([
    Prop()
], DraggableVirtualList.prototype, "disableComputeMargin", void 0);
DraggableVirtualList = __decorate([
    Component
], DraggableVirtualList);
var DraggableVirtualList$1 = DraggableVirtualList;

export default DraggableVirtualList$1;
