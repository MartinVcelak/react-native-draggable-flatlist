var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);
var _react = _interopRequireWildcard(require("react"));
var _draggableFlatListContext = require("../context/draggableFlatListContext");
var _refContext = require("../context/refContext");
var _useStableCallback = require("../hooks/useStableCallback");
var _utils = require("../utils");
var _excluded = ["renderItem", "extraData"];
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/RowItem.tsx";
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
function RowItem(props) {
  var propsRef = (0, _react.useRef)(props);
  propsRef.current = props;
  var _useDraggableFlatList = (0,
    _draggableFlatListContext.useDraggableFlatListContext)(),
    activeKey = _useDraggableFlatList.activeKey;
  var activeKeyRef = (0, _react.useRef)(activeKey);
  activeKeyRef.current = activeKey;
  var _useRefs = (0, _refContext.useRefs)(),
    keyToIndexRef = _useRefs.keyToIndexRef;
  var drag = (0, _useStableCallback.useStableCallback)(function () {
    var _propsRef$current = propsRef.current,
      drag = _propsRef$current.drag,
      itemKey = _propsRef$current.itemKey,
      debug = _propsRef$current.debug;
    if (activeKeyRef.current) {
      if (debug)
        console.log(
          "## attempt to drag item while another item is already active, noop"
        );
    }
    drag(itemKey);
  });
  var renderItem = props.renderItem,
    item = props.item,
    itemKey = props.itemKey,
    extraData = props.extraData;
  var getIndex = (0, _useStableCallback.useStableCallback)(function () {
    return keyToIndexRef.current.get(itemKey);
  });
  return _react.default.createElement(MemoizedInner, {
    isActive: activeKey === itemKey,
    drag: drag,
    renderItem: renderItem,
    item: item,
    getIndex: getIndex,
    extraData: extraData,
    __self: this,
    __source: { fileName: _jsxFileName, lineNumber: 45, columnNumber: 5 },
  });
}
var _default = (exports.default = (0, _utils.typedMemo)(RowItem));
function Inner(_ref) {
  var renderItem = _ref.renderItem,
    extraData = _ref.extraData,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return renderItem(Object.assign({}, rest));
}
var MemoizedInner = (0, _utils.typedMemo)(Inner);
//# sourceMappingURL=RowItem.js.map
