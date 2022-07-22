var script = {
  data() {
    return {
      search: {
        show: false,
        x: 0,
        y: 0
      },
      searchBox: {
        show: false,
        x: 0,
        y: 0,
        keyword: "",
        scrolling: false
      },
      searchData: []
    };
  },
  methods: {
    showSearchIcon(evt) {
      if (this.searchBox.show === false) {
        this.search.show = true;
      }
    },
    hideSearchIcon(evt) {
      this.search.show = false;
    },
    moveSearchIconAction(x, y) {
      let elm = this.$refs.searchIcon;
      let searchHalfSize = elm.clientWidth / 2;
      
      this.search.x = x - searchHalfSize;
      this.search.y = y - searchHalfSize;
    },
    moveSearchIcon(evt) {
      if (this.search.show === true) {
        this.moveSearchIconAction(
          evt.clientX, evt.clientY);
      }
    },
    moveTouchSearchIcon(evt) {
      evt.preventDefault();
      
      if (this.search.show === true) {
        this.moveSearchIconAction(
          evt.touches[0].clientX, evt.touches[0].clientY);
      }
    },
    showSearchBar(evt) {
      if (this.searchBox.show === false) {
        this.searchBox.show = true;
        this.search.show = false;
        
        this.searchBox.x = evt.clientX;
        this.searchBox.y = evt.clientY;
      }
    },
    hideSearchBar() {
      this.searchBox.show = false;
      this.searchBox.keyword = "";
      this.searchBox.scrolling = false;
    },
    searchWindowScroll(evt) {
      this.searchBox.scrolling = evt.target.scrollTop > 0;
    },
    searchWindowAnimationEnd() {
      this.searchBox.x = null;
      this.searchBox.y = null;
    }
  },
  mounted() {
    let self = this;
    
    fetch("https://assets.codepen.io/430361/animal_information.json", {
      cache: "no-cache"
    })
    .then(response => response.json())
    .then(function(data) {
      self.searchData = data;
    });
  },
  updated() {
    if (this.searchBox.show === true) {
      this.$refs.searchKeyword.focus();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c(
        "div",
        {
          staticClass: "error-container",
          on: {
            click: _vm.showSearchBar,
            mouseenter: _vm.showSearchIcon,
            mouseleave: _vm.hideSearchIcon,
            mousemove: _vm.moveSearchIcon,
            touchstart: _vm.showSearchIcon,
            touchend: _vm.showSearchBar,
            touchmove: _vm.moveTouchSearchIcon,
            touchcancel: _vm.hideSearchIcon
          }
        },
        [
          _vm._m(0),
          _c("div", { staticClass: "error-title" }, [_vm._v("ERROR")]),
          _c("div", { staticClass: "error-message" }, [
            _vm._v("PAGE NOT FOUND")
          ]),
          _c("div", { staticClass: "error-message" }, [
            _vm._v("I think you just went to a page non-existing page.")
          ]),
          _c("div", { staticClass: "error-message" }, [
            _vm._v(
              "Click anywhere on the screen if you want to search for something."
            )
          ]),
          _c("transition", { attrs: { name: "search-icon-transition" } }, [
            _vm.search.show === true
              ? _c("div", {
                  ref: "searchIcon",
                  staticClass: "search-icon",
                  style: { top: _vm.search.y + "px", left: _vm.search.x + "px" }
                })
              : _vm._e()
          ])
        ],
        1
      ),
      _c("transition", { attrs: { name: "search-window-transition" } }, [
        _vm.searchBox.show === true
          ? _c(
              "div",
              {
                ref: "searchWindow",
                staticClass: "search-window",
                style: {
                  top: _vm.searchBox.y !== null ? _vm.searchBox.y + "px" : "",
                  left: _vm.searchBox.x !== null ? _vm.searchBox.x + "px" : ""
                },
                on: { animationend: _vm.searchWindowAnimationEnd }
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "search-window-search",
                    class: { "search-scrolling": _vm.searchBox.scrolling }
                  },
                  [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.searchBox.keyword,
                          expression: "searchBox.keyword"
                        }
                      ],
                      ref: "searchKeyword",
                      attrs: {
                        type: "text",
                        placeholder: "Enter your keyword here..."
                      },
                      domProps: { value: _vm.searchBox.keyword },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.searchBox,
                            "keyword",
                            $event.target.value
                          );
                        }
                      }
                    }),
                    _c(
                      "button",
                      {
                        attrs: { type: "button" },
                        on: { click: _vm.hideSearchBar }
                      },
                      [_c("span", [_c("span"), _c("span")])]
                    )
                  ]
                ),
                _c(
                  "div",
                  {
                    staticClass: "search-window-section",
                    on: { scroll: _vm.searchWindowScroll }
                  },
                  [
                    _c(
                      "transition-group",
                      {
                        attrs: {
                          name: "search-window-container-transition",
                          tag: "div"
                        }
                      },
                      _vm._l(_vm.searchData, function(data, index) {
                        return data.Name.toLowerCase().indexOf(
                          _vm.searchBox.keyword.toLowerCase()
                        ) >= 0 ||
                          data.Description.toLowerCase().indexOf(
                            _vm.searchBox.keyword.toLowerCase()
                          ) >= 0
                          ? _c(
                              "div",
                              {
                                key: index,
                                staticClass: "search-window-container"
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "search-window-title" },
                                  [
                                    _c(
                                      "a",
                                      {
                                        attrs: { href: "#" },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault();
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(data.Name))]
                                    )
                                  ]
                                ),
                                _c(
                                  "div",
                                  { staticClass: "search-window-content" },
                                  [_vm._v(_vm._s(data.Description))]
                                )
                              ]
                            )
                          : _vm._e()
                      }),
                      0
                    )
                  ],
                  1
                )
              ]
            )
          : _vm._e()
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "error-code" }, [
      _c("span", [_vm._v("4")]),
      _c("span", [_vm._v("0")]),
      _c("span", [_vm._v("4")])
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1595ef44_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700\");\n@import url(\"https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap\");\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-size: 16px;\n}\n#app {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.error-container {\n  background-image: linear-gradient(to bottom right, #6200c4, #ed6f00);\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: absolute;\n  top: 0;\n  left: 0;\n  cursor: none;\n}\n.error-container:after {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n.error-code {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 24vmin;\n  text-align: center;\n  text-shadow: 1.6vmin 1.6vmin rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 5vmin;\n  display: flex;\n}\n.error-code span {\n  font-weight: bold;\n  display: block;\n}\n.error-code span:nth-child(1) {\n  animation: error-code-1 600ms linear infinite;\n}\n.error-code span:nth-child(2) {\n  animation: error-code-2 600ms linear infinite;\n}\n.error-code span:nth-child(3) {\n  animation: error-code-3 600ms linear infinite;\n}\n@keyframes error-code-1 {\n0% {\n    transform: translateY(0vmin);\n}\n25% {\n    transform: translateY(-1vmin);\n}\n50% {\n    transform: translateY(0vmin);\n}\n75% {\n    transform: translateY(1vmin);\n}\n100% {\n    transform: translateY(0vmin);\n}\n}\n@keyframes error-code-2 {\n0% {\n    transform: translateY(-1vmin);\n}\n25% {\n    transform: translateY(0vmin);\n}\n50% {\n    transform: translateY(1vmin);\n}\n75% {\n    transform: translateY(0vmin);\n}\n100% {\n    transform: translateY(-1vmin);\n}\n}\n@keyframes error-code-3 {\n0% {\n    transform: translateY(0vmin);\n}\n25% {\n    transform: translateY(1vmin);\n}\n50% {\n    transform: translateY(0vmin);\n}\n75% {\n    transform: translateY(-1vmin);\n}\n100% {\n    transform: translateY(0vmin);\n}\n}\n.error-title {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 2.8rem;\n  text-align: center;\n  text-shadow: 0.1866666667rem 0.1866666667rem rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 10vmin;\n}\n.error-message {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 1.2rem;\n  text-align: center;\n  text-shadow: 0.08rem 0.08rem rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 30vmin;\n}\n.search-icon {\n  background-color: rgba(105, 205, 255, 0.5);\n  width: 2.8rem;\n  height: 2.8rem;\n  border: solid 0.32rem #fffb8c;\n  box-sizing: border-box;\n  border-radius: 50%;\n  position: absolute;\n  transform: rotate(-38deg);\n  box-shadow: -0.32rem 0.32rem 0.64rem rgba(31, 31, 31, 0.8);\n  pointer-events: none;\n  transition: top 32ms cubic-bezier(0.22, 0.61, 0.36, 1), left 32ms cubic-bezier(0.22, 0.61, 0.36, 1);\n}\n.search-icon.search-icon-transition-enter-active {\n  animation: show-search-icon 375ms linear forwards;\n}\n.search-icon.search-icon-transition-enter-active, .search-icon.search-icon-transition-leave-active {\n  transition: opacity 256ms ease-out;\n}\n.search-icon.search-icon-transition-enter, .search-icon.search-icon-transition-leave-to {\n  opacity: 0;\n}\n.search-icon:after {\n  content: \"\";\n  background-color: #30b3ff;\n  width: 0.45rem;\n  height: 1.4rem;\n  position: absolute;\n  bottom: -1.72rem;\n  left: calc(50% - 0.225rem);\n  border-radius: 0.225rem;\n}\n.search-icon:after {\n  box-shadow: -0.32rem 0.32rem 0.64rem rgba(31, 31, 31, 0.8);\n}\n@keyframes show-search-icon {\n0% {\n    transform: rotate(-38deg) scale(0);\n}\n40% {\n    transform: rotate(-38deg) scale(1.15);\n}\n60% {\n    transform: rotate(-38deg) scale(0.9);\n}\n80% {\n    transform: rotate(-38deg) scale(1.05);\n}\n100% {\n    transform: rotate(-38deg) scale(1);\n}\n}\n.search-window {\n  font-family: \"Open Sans\", sans-serif;\n  background-color: rgba(255, 255, 255, 0.7);\n  width: calc(100vw - 4rem);\n  height: calc(100vh - 4rem);\n  border-radius: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0.5rem 1.2rem 2rem rgba(0, 0, 0, 0.7);\n  box-sizing: border-box;\n  position: absolute;\n  top: 2rem;\n  left: 2rem;\n  overflow: hidden;\n  backdrop-filter: blur(15px);\n  animation: search-window-show 512ms ease-out;\n}\n.search-window.search-window-transition-leave-active {\n  transition: opacity 256ms ease-out;\n}\n.search-window.search-window-transition-enter, .search-window.search-window-transition-leave-to {\n  opacity: 0;\n}\n.search-window-label {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 24px;\n  text-align: center;\n  background-image: linear-gradient(to right, #1f7ced, #70ffea);\n  width: 100%;\n  height: 2.8rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n.search-window-search {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  box-shadow: 0 0 0 #8f8f8f;\n  transform: translateZ(1px);\n  transition: box-shadow 120ms ease-out;\n}\n.search-window-search.search-scrolling {\n  box-shadow: 0 0.2rem 0.65rem #8f8f8f;\n}\n.search-window-search input[type=text] {\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0 1rem;\n  border: 0;\n  outline: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: transparent;\n  width: 100%;\n  flex-grow: 1;\n}\n.search-window-search button[type=button] {\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: transparent;\n  width: 2.8rem;\n  height: 2.8rem;\n  flex-shrink: 0;\n  overflow: hidden;\n  position: relative;\n  border-radius: 0;\n}\n.search-window-search button[type=button] > span {\n  width: 100%;\n  height: 100%;\n  display: block;\n  transition: transform 250ms cubic-bezier(0.18, 0.89, 0.32, 2.28);\n}\n.search-window-search button[type=button] > span > span {\n  content: \"\";\n  background-color: #000000;\n  width: 1.6rem;\n  height: 0.3rem;\n  opacity: 0;\n  position: absolute;\n  top: calc(50% - 0.15rem);\n  left: calc(50% - 0.8rem);\n  border-radius: 0.1rem;\n  transform-origin: center center;\n}\n.search-window-search button[type=button] > span > span:nth-child(1) {\n  animation: close-icon-show-1 500ms ease-out 512ms forwards;\n}\n.search-window-search button[type=button] > span > span:nth-child(2) {\n  animation: close-icon-show-2 500ms ease-out 512ms forwards;\n}\n.search-window-search button[type=button] > span:hover {\n  transform: scale(1.2);\n}\n@keyframes search-window-show {\n0% {\n    width: 0;\n    height: 0;\n}\n30%, 35% {\n    width: 2.8rem;\n    height: 2.8rem;\n    top: 2rem;\n    left: 2rem;\n}\n65%, 75% {\n    width: calc(100vw - 4rem);\n    height: 2.8rem;\n    top: 2rem;\n    left: 2rem;\n}\n100% {\n    width: calc(100vw - 4rem);\n    height: calc(100vh - 4rem);\n    top: 2rem;\n    left: 2rem;\n}\n}\n@keyframes close-icon-show-1 {\n0% {\n    opacity: 0;\n    transform: rotate(45deg) translateX(1rem);\n}\n100% {\n    opacity: 1;\n    transform: rotate(45deg) translateX(0rem);\n}\n}\n@keyframes close-icon-show-2 {\n0% {\n    opacity: 0;\n    transform: rotate(-45deg) translateX(1rem);\n}\n100% {\n    opacity: 1;\n    transform: rotate(-45deg) translateX(0rem);\n}\n}\n.search-window-section {\n  height: 100%;\n  flex-shrink: 1;\n  flex-grow: 1;\n  overflow: auto;\n}\n.search-window-section .search-window-container {\n  padding: 0.8rem 0.8rem;\n  transition: background-color 150ms ease-out;\n}\n.search-window-section .search-window-container.search-window-container-transition-enter-active, .search-window-section .search-window-container.search-window-container-transition-leave-active {\n  transition: opacity 150ms ease-out;\n}\n.search-window-section .search-window-container.search-window-container-transition-enter, .search-window-section .search-window-container.search-window-container-transition-leave-to {\n  opacity: 0;\n}\n.search-window-section .search-window-container:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.search-window-section .search-window-title {\n  padding: 0.4rem 0.8rem;\n}\n.search-window-section .search-window-title a {\n  color: inherit;\n  font-size: 110%;\n  font-weight: bold;\n  text-decoration: none;\n  display: inline-block;\n}\n.search-window-section .search-window-title a:hover {\n  text-decoration: underline;\n}\n.search-window-section .search-window-content {\n  padding: 0.4rem 0.8rem;\n}\n\n/*# sourceMappingURL=pen.vue.map */", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue","pen.vue"],"names":[],"mappings":"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","file":"pen.vue","sourcesContent":["<!--TODO: transition-group-->\n<template lang=\"pug\">\n  #app\n    .error-container(\n      @click=\"showSearchBar\"\n      @mouseenter=\"showSearchIcon\"\n      @mouseleave=\"hideSearchIcon\"\n      @mousemove=\"moveSearchIcon\"\n      @touchstart=\"showSearchIcon\"\n      @touchend=\"showSearchBar\"\n      @touchmove=\"moveTouchSearchIcon\"\n      @touchcancel=\"hideSearchIcon\"\n    )\n      .error-code\n        span 4\n        span 0\n        span 4\n      .error-title ERROR\n      .error-message PAGE NOT FOUND\n      .error-message I think you just went to a page non-existing page.\n      .error-message Click anywhere on the screen if you want to search for something.\n      transition(name=\"search-icon-transition\")\n        .search-icon(\n          ref=\"searchIcon\"\n          :style=\"{ top: search.y + 'px', left: search.x + 'px' }\"\n          v-if=\"search.show === true\"\n        )\n    transition(name=\"search-window-transition\")\n      .search-window(\n        ref=\"searchWindow\"\n        v-on:animationend=\"searchWindowAnimationEnd\"\n        v-bind:style=\"{ top: (searchBox.y !== null) ? searchBox.y + 'px' : '',\" +\n                     \" left: (searchBox.x !== null) ? searchBox.x + 'px' : '' }\"\n        v-if=\"searchBox.show === true\"\n      )\n        //- .search-window-label Search\n        .search-window-search(:class=\"{'search-scrolling': searchBox.scrolling}\")\n          input(\n            type=\"text\"\n            placeholder=\"Enter your keyword here...\"\n            ref=\"searchKeyword\"\n            v-model=\"searchBox.keyword\"\n          )\n          button(type=\"button\" @click=\"hideSearchBar\")\n            span\n              span\n              span\n        .search-window-section(@scroll=\"searchWindowScroll\")\n          transition-group(name=\"search-window-container-transition\" tag=\"div\")\n            .search-window-container(\n              v-for=\"data, index in searchData\"\n              v-if=\"data.Name.toLowerCase().indexOf(searchBox.keyword.toLowerCase()) >= 0 ||\" +\n                   \"data.Description.toLowerCase().indexOf(searchBox.keyword.toLowerCase()) >= 0\"\n              :key=\"index\"\n            )\n              .search-window-title\n                a(href=\"#\" @click.prevent=\"\") {{ data.Name }}\n              .search-window-content {{ data.Description }}\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      search: {\n        show: false,\n        x: 0,\n        y: 0\n      },\n      searchBox: {\n        show: false,\n        x: 0,\n        y: 0,\n        keyword: \"\",\n        scrolling: false\n      },\n      searchData: []\n    };\n  },\n  methods: {\n    showSearchIcon(evt) {\n      if (this.searchBox.show === false) {\n        this.search.show = true;\n      }\n    },\n    hideSearchIcon(evt) {\n      this.search.show = false;\n    },\n    moveSearchIconAction(x, y) {\n      let elm = this.$refs.searchIcon;\n      let searchHalfSize = elm.clientWidth / 2;\n      \n      this.search.x = x - searchHalfSize;\n      this.search.y = y - searchHalfSize;\n    },\n    moveSearchIcon(evt) {\n      if (this.search.show === true) {\n        this.moveSearchIconAction(\n          evt.clientX, evt.clientY);\n      }\n    },\n    moveTouchSearchIcon(evt) {\n      evt.preventDefault();\n      \n      if (this.search.show === true) {\n        this.moveSearchIconAction(\n          evt.touches[0].clientX, evt.touches[0].clientY);\n      }\n    },\n    showSearchBar(evt) {\n      if (this.searchBox.show === false) {\n        this.searchBox.show = true;\n        this.search.show = false;\n        \n        this.searchBox.x = evt.clientX;\n        this.searchBox.y = evt.clientY;\n      }\n    },\n    hideSearchBar() {\n      this.searchBox.show = false;\n      this.searchBox.keyword = \"\";\n      this.searchBox.scrolling = false;\n    },\n    searchWindowScroll(evt) {\n      this.searchBox.scrolling = evt.target.scrollTop > 0;\n    },\n    searchWindowAnimationEnd() {\n      this.searchBox.x = null;\n      this.searchBox.y = null;\n    }\n  },\n  mounted() {\n    let self = this;\n    \n    fetch(\"https://assets.codepen.io/430361/animal_information.json\", {\n      cache: \"no-cache\"\n    })\n    .then(response => response.json())\n    .then(function(data) {\n      self.searchData = data;\n    });\n  },\n  updated() {\n    if (this.searchBox.show === true) {\n      this.$refs.searchKeyword.focus();\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\">\n  $wave-time: 600ms;\n  $wave-size: 1vmin;\n  $wave-seq-list: 0vmin, -$wave-size, 0vmin, $wave-size, 0vmin, -$wave-size, 0vmin;\n\n  $search-size: 2.8rem;\n  \n  $search-icon-rotate: -38deg;\n\n  $search-show-time: 375ms;\n  $search-fade-time: 256ms;\n  $search-move-time: 32ms;\n\n  $search-box-size: $search-size;\n  \n  $search-window-shown-width: calc(100vw - 4rem);\n  $search-window-shown-height: calc(100vh - 4rem);\n  $search-window-shown-top: 2rem;\n  $search-window-shown-left: 2rem;\n  $search-window-show-time: 512ms;\n\n  @mixin input-field($padding) {\n    font-family: inherit;\n    font-size: inherit;\n    padding: $padding;\n    border: 0;\n    outline: 0;\n    margin: 0;\n    box-sizing: border-box;\n  }\n\n  @mixin screen-text($font-size) {\n    color: #ffffff;\n    font-family: \"Fredoka One\", cursive;\n    font-size: $font-size;\n    text-align: center;\n    text-shadow: ($font-size / 15) ($font-size / 15) rgba(#303030, 0.5);\n    user-select: none;\n  }\n\n  @import url(\"https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700\");\n  @import url(\"https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap\");\n\n  body {\n    width: 100vw;\n    height: 100vh;\n    font-size: 16px;\n  }\n  \n  #app {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    overflow: hidden;\n  }\n\n  .error-container {\n    background-image: linear-gradient(to bottom right, #6200c4, #ed6f00);\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    position: absolute;\n    top: 0;\n    left: 0;\n    cursor: none;\n    &:after {\n      content: \"\";\n      width: 100%;\n      height: 100%;\n      position: absolute;\n    }\n  }\n\n  .error-code {\n    @include screen-text(24vmin);\n    padding: 1.5vmin 5vmin;\n    display: flex;\n    span {\n      font-weight: bold;\n      display: block;\n    }\n    @for $i from 1 through 3 {\n      span:nth-child(#{$i}) {\n        animation: error-code-#{$i} $wave-time linear infinite;\n      }\n    }\n  }\n\n  @for $i from 1 through 3 {\n    @keyframes error-code-#{$i} {\n      @for $j from 1 through 5 {\n        #{($j - 1) * 25}% {\n          transform: translateY(nth($wave-seq-list, $j + ($i - 1)));\n        }\n      }\n    }\n  }\n\n  .error-title {\n    @include screen-text(2.8rem);\n    padding: 1.5vmin 10vmin;\n  }\n\n  .error-message {\n    @include screen-text(1.2rem);\n    padding: 1.5vmin 30vmin;\n  }\n\n  .search-icon {\n    $icon-width: 0.32rem;\n    $box-shadow: -$icon-width $icon-width #{$icon-width * 2} rgba(#1f1f1f, 0.8);\n    background-color: rgba(#69cdff, 0.5);\n    width: $search-size;\n    height: $search-size;\n    border: solid $icon-width #fffb8c;\n    box-sizing: border-box;\n    border-radius: 50%;\n    position: absolute;\n    transform: rotate($search-icon-rotate);\n    box-shadow: $box-shadow;\n    pointer-events: none;\n    transition: top $search-move-time cubic-bezier(0.22, 0.61, 0.36, 1),\n      left $search-move-time cubic-bezier(0.22, 0.61, 0.36, 1);\n    &.search-icon-transition-enter-active {\n      animation: show-search-icon $search-show-time linear forwards;\n    }\n    &.search-icon-transition-enter-active,\n    &.search-icon-transition-leave-active {\n      transition: opacity $search-fade-time ease-out;\n    }\n    &.search-icon-transition-enter,\n    &.search-icon-transition-leave-to {\n      opacity: 0;\n    }\n    &:after {\n      $width: 0.45rem;\n      $height: 1.4rem;\n      content: '';\n      background-color: #30b3ff;\n      width: $width;\n      height: $height;\n      position: absolute;\n      bottom: -#{$height + $icon-width};\n      left: calc(50% - #{$width / 2});\n      border-radius: $width / 2;\n    }\n    &:after {\n      box-shadow: $box-shadow;\n    }\n  }\n\n  @keyframes show-search-icon {\n    0% {\n      transform: rotate($search-icon-rotate) scale(0);\n    }\n    40% {\n      transform: rotate($search-icon-rotate) scale(1.15);\n    }\n    60% {\n      transform: rotate($search-icon-rotate) scale(0.9);\n    }\n    80% {\n      transform: rotate($search-icon-rotate) scale(1.05);\n    }\n    100% {\n      transform: rotate($search-icon-rotate) scale(1);\n    }\n  }\n\n  .search-window {\n    font-family: \"Open Sans\", sans-serif;\n    background-color: rgba(#ffffff, 0.7);\n    width: $search-window-shown-width;\n    height: $search-window-shown-height;\n    border-radius: 1.25rem;\n    display: flex;\n    flex-direction: column;\n    box-shadow: 0.5rem 1.2rem 2rem rgba(#000000, 0.7);\n    box-sizing: border-box;\n    position: absolute;\n    top: $search-window-shown-top;\n    left: $search-window-shown-left;\n    overflow: hidden;\n    backdrop-filter: blur(15px);\n    animation: search-window-show $search-window-show-time ease-out;\n    &.search-window-transition-leave-active {\n      transition: opacity $search-fade-time ease-out;\n    }\n    &.search-window-transition-enter,\n    &.search-window-transition-leave-to {\n      opacity: 0;\n    }\n  }\n  \n  .search-window-label {\n    color: #ffffff;\n    font-family: \"Fredoka One\", cursive;\n    font-size: 24px;\n    text-align: center;\n    background-image: linear-gradient(to right, #1f7ced, #70ffea);\n    width: 100%;\n    height: 2.8rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-shrink: 0;\n    flex-grow: 0;\n  }\n  \n  .search-window-search {\n    display: flex;\n    flex-shrink: 0;\n    flex-grow: 0;\n    box-shadow: 0 0 0 #8f8f8f;\n    transform: translateZ(1px);\n    transition: box-shadow 120ms ease-out;\n    &.search-scrolling {\n      box-shadow: 0 0.2rem 0.65rem #8f8f8f;\n    }\n    input[type=\"text\"] {\n      @include input-field(0 1rem);\n      background-color: transparent;\n      width: 100%;\n      flex-grow: 1;\n    }\n    button[type=\"button\"] {\n      $background-color: transparent;\n      @include input-field(0);\n      background-color: $background-color;\n      width: $search-box-size;\n      height: $search-box-size;\n      flex-shrink: 0;\n      overflow: hidden;\n      position: relative;\n      border-radius: 0;\n      & > span {\n        $animation-time: 500ms;\n        $animation-delay: $search-window-show-time;\n        width: 100%;\n        height: 100%;\n        display: block;\n        transition: transform 250ms cubic-bezier(0.18, 0.89, 0.32, 2.28);\n        & > span {\n          $width: 1.6rem;\n          $height: 0.3rem;\n          content: \"\";\n          background-color: #000000;\n          width: $width;\n          height: $height;\n          opacity: 0;\n          position: absolute;\n          top: calc(50% - #{$height / 2});\n          left: calc(50% - #{$width / 2});\n          border-radius: 0.1rem;\n          transform-origin: center center;\n        }\n        & > span:nth-child(1) {\n          animation: close-icon-show-1 $animation-time ease-out $animation-delay forwards;\n        }\n        & > span:nth-child(2) {\n          animation: close-icon-show-2 $animation-time ease-out $animation-delay forwards;\n        }\n        &:hover {\n          transform: scale(1.2);\n        }\n      }\n    }\n  }\n\n  @keyframes search-window-show {\n    0% {\n      width: 0;\n      height: 0;\n    }\n    30%,\n    35% {\n      width: $search-box-size;\n      height: $search-box-size;\n      top: $search-window-shown-top;\n      left: $search-window-shown-left;\n    }\n    65%,\n    75% {\n      width: $search-window-shown-width;\n      height: $search-box-size;\n      top: $search-window-shown-top;\n      left: $search-window-shown-left;\n    }\n    100% {\n      width: $search-window-shown-width;\n      height: $search-window-shown-height;\n      top: $search-window-shown-top;\n      left: $search-window-shown-left;\n    }\n  }\n  \n  @keyframes close-icon-show-1 {\n    0% {\n      opacity: 0;\n      transform: rotate(45deg) translateX(1rem);\n    }\n    100% {\n      opacity: 1;\n      transform: rotate(45deg) translateX(0rem);\n    }\n  }\n  \n  @keyframes close-icon-show-2 {\n    0% {\n      opacity: 0;\n      transform: rotate(-45deg) translateX(1rem);\n    }\n    100% {\n      opacity: 1;\n      transform: rotate(-45deg) translateX(0rem);\n    }\n  }\n  \n  .search-window-section {\n    $padding: 0.4rem;\n    height: 100%;\n    flex-shrink: 1;\n    flex-grow: 1;\n    overflow: auto;\n    .search-window-container {\n      padding: #{$padding * 2} #{$padding * 2};\n      transition: background-color 150ms ease-out;\n      &.search-window-container-transition-enter-active,\n      &.search-window-container-transition-leave-active {\n        transition: opacity 150ms ease-out;\n      }\n      &.search-window-container-transition-enter,\n      &.search-window-container-transition-leave-to {\n        opacity: 0;\n      }\n      &:hover {\n        background-color: rgba(#000000, 0.1);\n      }\n    }\n    .search-window-title {\n      padding: $padding #{$padding * 2};\n      a {\n        color: inherit;\n        font-size: 110%;\n        font-weight: bold;\n        text-decoration: none;\n        display: inline-block;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n    .search-window-content {\n      padding: $padding #{$padding * 2};\n    }\n  }\n</style>\n","@import url(\"https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700\");\n@import url(\"https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap\");\nbody {\n  width: 100vw;\n  height: 100vh;\n  font-size: 16px;\n}\n\n#app {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n\n.error-container {\n  background-image: linear-gradient(to bottom right, #6200c4, #ed6f00);\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: absolute;\n  top: 0;\n  left: 0;\n  cursor: none;\n}\n.error-container:after {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n\n.error-code {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 24vmin;\n  text-align: center;\n  text-shadow: 1.6vmin 1.6vmin rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 5vmin;\n  display: flex;\n}\n.error-code span {\n  font-weight: bold;\n  display: block;\n}\n.error-code span:nth-child(1) {\n  animation: error-code-1 600ms linear infinite;\n}\n.error-code span:nth-child(2) {\n  animation: error-code-2 600ms linear infinite;\n}\n.error-code span:nth-child(3) {\n  animation: error-code-3 600ms linear infinite;\n}\n\n@keyframes error-code-1 {\n  0% {\n    transform: translateY(0vmin);\n  }\n  25% {\n    transform: translateY(-1vmin);\n  }\n  50% {\n    transform: translateY(0vmin);\n  }\n  75% {\n    transform: translateY(1vmin);\n  }\n  100% {\n    transform: translateY(0vmin);\n  }\n}\n@keyframes error-code-2 {\n  0% {\n    transform: translateY(-1vmin);\n  }\n  25% {\n    transform: translateY(0vmin);\n  }\n  50% {\n    transform: translateY(1vmin);\n  }\n  75% {\n    transform: translateY(0vmin);\n  }\n  100% {\n    transform: translateY(-1vmin);\n  }\n}\n@keyframes error-code-3 {\n  0% {\n    transform: translateY(0vmin);\n  }\n  25% {\n    transform: translateY(1vmin);\n  }\n  50% {\n    transform: translateY(0vmin);\n  }\n  75% {\n    transform: translateY(-1vmin);\n  }\n  100% {\n    transform: translateY(0vmin);\n  }\n}\n.error-title {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 2.8rem;\n  text-align: center;\n  text-shadow: 0.1866666667rem 0.1866666667rem rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 10vmin;\n}\n\n.error-message {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 1.2rem;\n  text-align: center;\n  text-shadow: 0.08rem 0.08rem rgba(48, 48, 48, 0.5);\n  user-select: none;\n  padding: 1.5vmin 30vmin;\n}\n\n.search-icon {\n  background-color: rgba(105, 205, 255, 0.5);\n  width: 2.8rem;\n  height: 2.8rem;\n  border: solid 0.32rem #fffb8c;\n  box-sizing: border-box;\n  border-radius: 50%;\n  position: absolute;\n  transform: rotate(-38deg);\n  box-shadow: -0.32rem 0.32rem 0.64rem rgba(31, 31, 31, 0.8);\n  pointer-events: none;\n  transition: top 32ms cubic-bezier(0.22, 0.61, 0.36, 1), left 32ms cubic-bezier(0.22, 0.61, 0.36, 1);\n}\n.search-icon.search-icon-transition-enter-active {\n  animation: show-search-icon 375ms linear forwards;\n}\n.search-icon.search-icon-transition-enter-active, .search-icon.search-icon-transition-leave-active {\n  transition: opacity 256ms ease-out;\n}\n.search-icon.search-icon-transition-enter, .search-icon.search-icon-transition-leave-to {\n  opacity: 0;\n}\n.search-icon:after {\n  content: \"\";\n  background-color: #30b3ff;\n  width: 0.45rem;\n  height: 1.4rem;\n  position: absolute;\n  bottom: -1.72rem;\n  left: calc(50% - 0.225rem);\n  border-radius: 0.225rem;\n}\n.search-icon:after {\n  box-shadow: -0.32rem 0.32rem 0.64rem rgba(31, 31, 31, 0.8);\n}\n\n@keyframes show-search-icon {\n  0% {\n    transform: rotate(-38deg) scale(0);\n  }\n  40% {\n    transform: rotate(-38deg) scale(1.15);\n  }\n  60% {\n    transform: rotate(-38deg) scale(0.9);\n  }\n  80% {\n    transform: rotate(-38deg) scale(1.05);\n  }\n  100% {\n    transform: rotate(-38deg) scale(1);\n  }\n}\n.search-window {\n  font-family: \"Open Sans\", sans-serif;\n  background-color: rgba(255, 255, 255, 0.7);\n  width: calc(100vw - 4rem);\n  height: calc(100vh - 4rem);\n  border-radius: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0.5rem 1.2rem 2rem rgba(0, 0, 0, 0.7);\n  box-sizing: border-box;\n  position: absolute;\n  top: 2rem;\n  left: 2rem;\n  overflow: hidden;\n  backdrop-filter: blur(15px);\n  animation: search-window-show 512ms ease-out;\n}\n.search-window.search-window-transition-leave-active {\n  transition: opacity 256ms ease-out;\n}\n.search-window.search-window-transition-enter, .search-window.search-window-transition-leave-to {\n  opacity: 0;\n}\n\n.search-window-label {\n  color: #ffffff;\n  font-family: \"Fredoka One\", cursive;\n  font-size: 24px;\n  text-align: center;\n  background-image: linear-gradient(to right, #1f7ced, #70ffea);\n  width: 100%;\n  height: 2.8rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  flex-grow: 0;\n}\n\n.search-window-search {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  box-shadow: 0 0 0 #8f8f8f;\n  transform: translateZ(1px);\n  transition: box-shadow 120ms ease-out;\n}\n.search-window-search.search-scrolling {\n  box-shadow: 0 0.2rem 0.65rem #8f8f8f;\n}\n.search-window-search input[type=text] {\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0 1rem;\n  border: 0;\n  outline: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: transparent;\n  width: 100%;\n  flex-grow: 1;\n}\n.search-window-search button[type=button] {\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: transparent;\n  width: 2.8rem;\n  height: 2.8rem;\n  flex-shrink: 0;\n  overflow: hidden;\n  position: relative;\n  border-radius: 0;\n}\n.search-window-search button[type=button] > span {\n  width: 100%;\n  height: 100%;\n  display: block;\n  transition: transform 250ms cubic-bezier(0.18, 0.89, 0.32, 2.28);\n}\n.search-window-search button[type=button] > span > span {\n  content: \"\";\n  background-color: #000000;\n  width: 1.6rem;\n  height: 0.3rem;\n  opacity: 0;\n  position: absolute;\n  top: calc(50% - 0.15rem);\n  left: calc(50% - 0.8rem);\n  border-radius: 0.1rem;\n  transform-origin: center center;\n}\n.search-window-search button[type=button] > span > span:nth-child(1) {\n  animation: close-icon-show-1 500ms ease-out 512ms forwards;\n}\n.search-window-search button[type=button] > span > span:nth-child(2) {\n  animation: close-icon-show-2 500ms ease-out 512ms forwards;\n}\n.search-window-search button[type=button] > span:hover {\n  transform: scale(1.2);\n}\n\n@keyframes search-window-show {\n  0% {\n    width: 0;\n    height: 0;\n  }\n  30%, 35% {\n    width: 2.8rem;\n    height: 2.8rem;\n    top: 2rem;\n    left: 2rem;\n  }\n  65%, 75% {\n    width: calc(100vw - 4rem);\n    height: 2.8rem;\n    top: 2rem;\n    left: 2rem;\n  }\n  100% {\n    width: calc(100vw - 4rem);\n    height: calc(100vh - 4rem);\n    top: 2rem;\n    left: 2rem;\n  }\n}\n@keyframes close-icon-show-1 {\n  0% {\n    opacity: 0;\n    transform: rotate(45deg) translateX(1rem);\n  }\n  100% {\n    opacity: 1;\n    transform: rotate(45deg) translateX(0rem);\n  }\n}\n@keyframes close-icon-show-2 {\n  0% {\n    opacity: 0;\n    transform: rotate(-45deg) translateX(1rem);\n  }\n  100% {\n    opacity: 1;\n    transform: rotate(-45deg) translateX(0rem);\n  }\n}\n.search-window-section {\n  height: 100%;\n  flex-shrink: 1;\n  flex-grow: 1;\n  overflow: auto;\n}\n.search-window-section .search-window-container {\n  padding: 0.8rem 0.8rem;\n  transition: background-color 150ms ease-out;\n}\n.search-window-section .search-window-container.search-window-container-transition-enter-active, .search-window-section .search-window-container.search-window-container-transition-leave-active {\n  transition: opacity 150ms ease-out;\n}\n.search-window-section .search-window-container.search-window-container-transition-enter, .search-window-section .search-window-container.search-window-container-transition-leave-to {\n  opacity: 0;\n}\n.search-window-section .search-window-container:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.search-window-section .search-window-title {\n  padding: 0.4rem 0.8rem;\n}\n.search-window-section .search-window-title a {\n  color: inherit;\n  font-size: 110%;\n  font-weight: bold;\n  text-decoration: none;\n  display: inline-block;\n}\n.search-window-section .search-window-title a:hover {\n  text-decoration: underline;\n}\n.search-window-section .search-window-content {\n  padding: 0.4rem 0.8rem;\n}\n\n/*# sourceMappingURL=pen.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;