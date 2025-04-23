Object.defineProperty(exports, "__esModule", { value: true });
exports.CellProvider = CellProvider;
exports.default = void 0;
exports.useIsActive = useIsActive;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/context/cellContext.tsx";
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
var CellContext = _react.default.createContext(undefined);
function CellProvider(_ref) {
  var isActive = _ref.isActive,
    children = _ref.children;
  var value = (0, _react.useMemo)(
    function () {
      return { isActive: isActive };
    },
    [isActive]
  );
  return _react.default.createElement(
    CellContext.Provider,
    {
      value: value,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 24, columnNumber: 10 },
    },
    children
  );
}
var _default = (exports.default = (0, _utils.typedMemo)(CellProvider));
function useIsActive() {
  var value = (0, _react.useContext)(CellContext);
  if (!value) {
    throw new Error("useIsActive must be called from within CellProvider!");
  }
  return value.isActive;
}
//# sourceMappingURL=cellContext.js.map
