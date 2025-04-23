var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PropsProvider;
exports.useProps = useProps;
var _objectWithoutProperties2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);
var _react = _interopRequireWildcard(require("react"));
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/context/propsContext.tsx";
var _excluded = ["children"];
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
var PropsContext = _react.default.createContext(undefined);
function PropsProvider(_ref) {
  var children = _ref.children,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return _react.default.createElement(
    PropsContext.Provider,
    {
      value: props,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 12, columnNumber: 5 },
    },
    children
  );
}
function useProps() {
  var value = (0, _react.useContext)(PropsContext);
  if (!value) {
    throw new Error("useProps must be called from within PropsProvider!");
  }
  return value;
}
//# sourceMappingURL=propsContext.js.map
