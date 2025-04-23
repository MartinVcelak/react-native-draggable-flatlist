Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DraggableFlatListProvider;
exports.useDraggableFlatListContext = useDraggableFlatListContext;
var _react = _interopRequireWildcard(require("react"));
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/context/draggableFlatListContext.tsx";
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
var DraggableFlatListContext = _react.default.createContext(undefined);
function DraggableFlatListProvider(_ref) {
  var activeKey = _ref.activeKey,
    keyExtractor = _ref.keyExtractor,
    horizontal = _ref.horizontal,
    layoutAnimationDisabled = _ref.layoutAnimationDisabled,
    children = _ref.children;
  var value = (0, _react.useMemo)(
    function () {
      return {
        activeKey: activeKey,
        keyExtractor: keyExtractor,
        horizontal: horizontal,
        layoutAnimationDisabled: layoutAnimationDisabled,
      };
    },
    [activeKey, keyExtractor, horizontal, layoutAnimationDisabled]
  );
  return _react.default.createElement(
    DraggableFlatListContext.Provider,
    {
      value: value,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 35, columnNumber: 5 },
    },
    children
  );
}
function useDraggableFlatListContext() {
  var value = (0, _react.useContext)(DraggableFlatListContext);
  if (!value) {
    throw new Error(
      "useDraggableFlatListContext must be called within DraggableFlatListProvider"
    );
  }
  return value;
}
//# sourceMappingURL=draggableFlatListContext.js.map
