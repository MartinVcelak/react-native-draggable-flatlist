Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RefProvider;
exports.useRefs = useRefs;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _constants = require("../constants");
var _propsContext = require("./propsContext");
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/context/refContext.tsx";
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ("object" != typeof e && "function" != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) {
    if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  }
  return (n.default = e), t && t.set(e, n), n;
}
var RefContext = _react.default.createContext(undefined);
function RefProvider(_ref) {
  var children = _ref.children,
    flatListRef = _ref.flatListRef;
  var value = useSetupRefs({ flatListRef: flatListRef });
  return _react.default.createElement(
    RefContext.Provider,
    {
      value: value,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 30, columnNumber: 10 },
    },
    children
  );
}
function useRefs() {
  var value = (0, _react.useContext)(RefContext);
  if (!value) {
    throw new Error(
      "useRefs must be called from within a RefContext.Provider!"
    );
  }
  return value;
}
function useSetupRefs(_ref2) {
  var flatListRefProp = _ref2.flatListRef;
  var props = (0, _propsContext.useProps)();
  var _props$animationConfi = props.animationConfig,
    animationConfig =
      _props$animationConfi === void 0
        ? _constants.DEFAULT_PROPS.animationConfig
        : _props$animationConfi;
  var propsRef = (0, _react.useRef)(props);
  propsRef.current = props;
  var animConfig = (0, _react.useMemo)(
    function () {
      return Object.assign(
        {},
        _constants.DEFAULT_PROPS.animationConfig,
        animationConfig
      );
    },
    [animationConfig]
  );
  var animationConfigRef = (0, _reactNativeReanimated.useSharedValue)(
    animConfig
  );
  (0, _react.useEffect)(
    function () {
      animationConfigRef.value = animConfig;
    },
    [animConfig]
  );
  var cellDataRef = (0, _react.useRef)(new Map());
  var keyToIndexRef = (0, _react.useRef)(new Map());
  var containerRef = (0, _react.useRef)(null);
  var flatlistRefInternal = (0, _react.useRef)(null);
  var flatlistRef = flatListRefProp || flatlistRefInternal;
  var scrollViewRef = (0, _react.useRef)(null);
  var refs = (0, _react.useMemo)(function () {
    return {
      animationConfigRef: animationConfigRef,
      cellDataRef: cellDataRef,
      containerRef: containerRef,
      flatlistRef: flatlistRef,
      keyToIndexRef: keyToIndexRef,
      propsRef: propsRef,
      scrollViewRef: scrollViewRef,
    };
  }, []);
  return refs;
}
//# sourceMappingURL=refContext.js.map
