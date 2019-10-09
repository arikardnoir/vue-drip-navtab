/*!
 * @arikardnoir/vue-drip-navtab v1.0.0
 * (c) Aristoteles Lopes
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    data: {}
  },
  data: function data() {
    return {
      tabs: [],
      currentPage: 1,
      pageCount: 0,
      elementsPerPage: 5,
      totalElements: this.data.length,
      showingElements: 0
    };
  },
  created: function created() {
    this.tabs = this.$children;
  },
  methods: {
    num_pages: function num_pages() {
      return Math.ceil(this.data.length / this.elementsPerPage);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    },
    selectTab: function selectTab(selectedTab) {
      this.tabs.forEach(function (tab) {
        tab.isActive = tab.name === selectedTab.name;
      });
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "tabs"
  }, [_c('ul', _vm._l(_vm.tabs, function (tab, i) {
    return _c('li', {
      key: i,
      "class": {
        'is-active': tab.isActive
      }
    }, [_c('a', {
      staticClass: "button-tab",
      attrs: {
        "href": tab.href
      },
      on: {
        "click": function click($event) {
          return _vm.selectTab(tab);
        }
      }
    }, [_vm._v(_vm._s(tab.name))])]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "tabs-details"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "pagination"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._l(_vm.num_pages(), function (i, idx) {
    return _c('div', {
      key: idx,
      staticClass: "number middle",
      "class": [i == _vm.currentPage ? 'active' : ''],
      on: {
        "click": function click($event) {
          return _vm.change_page(i);
        }
      }
    }, [_vm._v(_vm._s(i))]);
  }), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "pagination-right"
  }, [_c('div', {
    staticClass: "label-maker"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.elementsPerPage,
      expression: "elementsPerPage"
    }],
    staticClass: "budget",
    attrs: {
      "id": "p-name"
    },
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.elementsPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("10")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "15"
    }
  }, [_vm._v("20")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "20"
    }
  }, [_vm._v("70")])]), _vm._v(" "), _c('label', {
    attrs: {
      "for": "p-name"
    }
  }, [_vm._v("Showing " + _vm._s(_vm.showingElements) + " - " + _vm._s(_vm.elementsPerPage) + " of " + _vm._s(_vm.totalElements))])])])], 2)]);
};

var __vue_staticRenderFns__ = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "number double-left"
  }, [_c('i', {
    staticClass: "nextbss-double-left"
  })]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "number left"
  }, [_c('i', {
    staticClass: "nextbss-left"
  })]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "number right"
  }, [_c('i', {
    staticClass: "nextbss-right"
  })]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "number double-right"
  }, [_c('i', {
    staticClass: "nextbss-double-right"
  })]);
}];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-fe16dd38_0", {
    source: ".tabs ul{display:flex;padding-left:30px;padding-bottom:0}.tabs ul li{width:13%;height:50px;border-bottom:1px solid #969eb8;border-radius:2px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;list-style-type:none}.tabs ul li.is-active{border:1px solid #969eb8;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom:1px solid #343a4e}.tabs ul li .button-tab{width:100%;height:100%;color:#fff;font-size:17px;text-align:center;padding-top:15px;font-weight:400;margin-right:12px;display:inline-block;text-decoration:none;font-size:13px;font-family:\"Montserrat Medium\";min-width:120px}.tabs-details{margin-left:30px;margin-top:-17px;margin-bottom:10px;padding-left:30px;padding-top:30px;padding-bottom:30px;border:1px solid #969eb8;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px}.pagination{font-family:\"Montserrat Medium\";font-size:12px;text-align:left;width:100%;padding-top:15px;padding-right:8px;padding-bottom:8px;padding-left:25px}.pagination-right{float:right;margin-top:-16px;width:15%}.pagination-right .label-maker select{width:28%}.number{display:inline-block;padding:8px 12px;color:#fff;border-radius:4px;background:#343a4e;margin:0 5px;cursor:pointer;font-family:\"Montserrat Medium\";font-size:12px}.number.active{background:#d05d1c;font-family:\"Montserrat Bold\"}.number:hover{background:#8c93a8}.number.left{background:#52596f;padding:5px 11.5px;width:30px;height:30px}.number.left.active{background:#d05d1c}.number.left:hover{background:#8c93a8}.number.double-left{background:#52596f;padding:5px 11.5px;width:30px;height:30px;margin-top:5px;margin-right:5px;margin-bottom:0;margin-left:5px}.number.double-left.active{background:#d05d1c}.number.double-left:hover{background:#8c93a8}.number.right{background:#52596f;padding:5px 11.5px;width:30px;height:30px}.number.right.active{background:#d05d1c}.number.right:hover{background:#8c93a8}.number.double-right{background:#52596f;padding:5px 11.5px;width:30px;height:30px}.number.double-right.active{background:#d05d1c}.number.double-right:hover{background:#8c93a8}td a{cursor:pointer}.loadingContainer{display:block;top:50%;margin-left:10%}.loadingContainer span{width:.2em;height:.2em;background-color:#fff;border-radius:50%;display:inline-block;margin-right:.25em}.label-maker{font-family:\"Montserrat Regular\"}.label-maker label{padding-left:20px;padding-right:8px;color:#dbdee6;font-size:12px}.label-maker select{border:1px solid #abb3c9;border-radius:4px;margin-top:.9em;padding-top:.5em;padding-right:.6em;padding-bottom:.6em;padding-left:.6em;display:inline-block;color:#fff;font-family:\"Montserrat Medium\";font-size:12px;letter-spacing:0;background-color:#343a4e;width:128px;height:35px}.label-maker select:focus{border:none}.pagination-right .label-maker{display:flex}.pagination-right .label-maker label{font-size:12px;margin-top:20px}@media (min-width:1920px){.pagination-right{float:right;margin-top:-16px;width:13%}.wrapper.toggled .pagination-right{float:right;margin-top:-16px;width:13%}.pagination-right .label-maker select{width:35%}.wrapper.toggled .pagination-right select{width:35%!important}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var component = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

var index = {
  install: function install(Vue) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component('vue-drip-navtab', component);
  }
};

module.exports = index;
