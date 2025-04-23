var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestableScrollContainerProvider = NestableScrollContainerProvider;
exports.useNestableScrollContainerContext = useNestableScrollContainerContext;
exports.useSafeNestableScrollContainerContext = useSafeNestableScrollContainerContext;
var _slicedToArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/slicedToArray")
);
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/context/nestableScrollContainerContext.tsx";
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
var NestableScrollContainerContext = _react.default.createContext(undefined);
function useSetupNestableScrollContextValue(_ref) {
  var forwardedRef = _ref.forwardedRef;
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    outerScrollEnabled = _useState2[0],
    setOuterScrollEnabled = _useState2[1];
  var scrollViewSize = (0, _reactNativeReanimated.useSharedValue)(0);
  var scrollableRefInner = (0, _react.useRef)(null);
  var scrollableRef = forwardedRef || scrollableRefInner;
  var outerScrollOffset = (0, _reactNativeReanimated.useSharedValue)(0);
  var containerSize = (0, _reactNativeReanimated.useSharedValue)(0);
  var contextVal = (0, _react.useMemo)(
    function () {
      return {
        outerScrollEnabled: outerScrollEnabled,
        setOuterScrollEnabled: setOuterScrollEnabled,
        outerScrollOffset: outerScrollOffset,
        scrollViewSize: scrollViewSize,
        scrollableRef: scrollableRef,
        containerSize: containerSize,
      };
    },
    [outerScrollEnabled]
  );
  return contextVal;
}
function NestableScrollContainerProvider(_ref2) {
  var children = _ref2.children,
    forwardedRef = _ref2.forwardedRef;
  var contextVal = useSetupNestableScrollContextValue({
    forwardedRef: forwardedRef,
  });
  return _react.default.createElement(
    NestableScrollContainerContext.Provider,
    {
      value: contextVal,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 48, columnNumber: 5 },
    },
    children
  );
}
function useNestableScrollContainerContext() {
  var value = (0, _react.useContext)(NestableScrollContainerContext);
  return value;
}
function useSafeNestableScrollContainerContext() {
  var value = useNestableScrollContainerContext();
  if (!value) {
    throw new Error(
      "useSafeNestableScrollContainerContext must be called within a NestableScrollContainerContext.Provider"
    );
  }
  return value;
}
//# sourceMappingURL=nestableScrollContainerContext.js.map
